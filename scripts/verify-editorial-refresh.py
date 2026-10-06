"""Confere cobertura editorial, fichas, links e sentinelas das cinco ondas."""
import argparse
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
AUDIT = ROOT / 'audits/revisao-50-20261006'
ORIGIN = 'https://posgraduacaopsicologia.com'

class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.hidden = 0
        self.text = []
        self.links = []
        self.h1 = 0
        self.main = 0
        self.metadata = {}
        self.worksheets = 0
        self.canonical = []
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ('script', 'style'): self.hidden += 1
        if tag == 'h1': self.h1 += 1
        if tag == 'main': self.main += 1
        if tag == 'meta': self.metadata[attrs.get('property', attrs.get('name', ''))] = attrs.get('content', '')
        if tag == 'a': self.links.append(attrs.get('href', ''))
        if 'data-study-worksheet' in attrs: self.worksheets += 1
        if tag == 'link' and attrs.get('rel') == 'canonical': self.canonical.append(attrs.get('href'))

    def handle_endtag(self, tag):
        if tag in ('script', 'style'): self.hidden = max(0, self.hidden - 1)

    def handle_data(self, data):
        if not self.hidden: self.text.append(data)

    @property
    def visible(self): return normalize(' '.join(self.text))

def normalize(text): return re.sub(r'\s+', ' ', text).strip()

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--live', action='store_true')
    args = parser.parse_args()
    selection = json.loads((AUDIT / 'selecionadas.json').read_text(encoding='utf-8'))
    baseline = json.loads((AUDIT / 'baseline.json').read_text(encoding='utf-8'))
    previous = {row['route']: row for row in baseline['pages']}
    expected = [route for wave in selection for route in wave['routes']]
    assert len(expected) == len(set(expected)) == 50
    reports = []
    for wave in range(1, 6):
        rows = json.loads((AUDIT / f'onda-{wave}.json').read_text(encoding='utf-8'))
        if isinstance(rows, dict): rows = rows.get('pages', rows.get('paginas', []))
        assert len(rows) == 10, f'Onda {wave}: esperado dez páginas'
        assert {r['route'] for r in rows} == set(selection[wave-1]['routes'])
        reports.extend(rows)

    def check(row):
        route = row['route']
        failures = []
        status = 200
        if args.live:
            request = urllib.request.Request(ORIGIN + route, headers={'User-Agent': 'BrasilGEO-EditorialQA/1.0'})
            with urllib.request.urlopen(request, timeout=35) as response:
                status = response.status
                html = response.read().decode('utf-8')
        else:
            html = (ROOT / 'site/dist' / route.strip('/') / 'index.html').read_text(encoding='utf-8')
        page = Page(html)
        checks = {
            'http200': status == 200,
            'h1Unico': page.h1 == 1,
            'mainUnico': page.main == 1,
            'publicacaoOriginalPreservada': page.metadata.get('article:published_time', '')[:10] == previous[route]['published'],
            'modificacaoCorreta': page.metadata.get('article:modified_time', '')[:10] == '2026-10-06',
            'canonical': page.canonical == [ORIGIN + route],
            'fichaPratica': page.worksheets == 1,
            'portalEducacional': any(link.startswith('https://alexandrecaramaschi.com/educacao/') for link in page.links),
            'sentinelaNova': normalize(row['newSentinel']) in page.visible,
            'sentinelaAntigaAusente': normalize(row['oldSentinel']) not in page.visible,
            'revisaoEditorial': any(date in page.visible for date in ('06/10/2026', '6 de outubro de 2026')),
            'semMarcadorPendente': not re.search(r'\[(?:a confirmar|VERIFICAR|FALTA EVIDÊNCIA|PREENCHER-HUMANO)', page.visible, re.I),
        }
        old_file = ROOT / previous[route]['beforeFile']
        if old_file.exists(): checks['sentinelaAntigaComprovada'] = normalize(row['oldSentinel']) in Page(old_file.read_text(encoding='utf-8')).visible
        failures = [key for key, value in checks.items() if not value]
        larissa = sorted({url for url in page.links if url.startswith('https://larissacaramaschi.com/')})
        return {'route':route,'ok':not failures,'checks':checks,'failures':failures,'larissaLinks':larissa}

    results = []
    with ThreadPoolExecutor(max_workers=4) as pool:
        for row, result in zip(reports, pool.map(check, reports)):
            results.append(result)
    links = sorted({url for row in results for url in row['larissaLinks']})
    output = {'date':'2026-10-06','mode':'publicado' if args.live else 'build','pages':len(results),'passed':sum(r['ok'] for r in results),'larissaDestinations':links,'results':results}
    output_path = ROOT / 'tmp/verificacao-publicada.json' if args.live else AUDIT / 'verificacao-build.json'
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(f"Verificação {'pública' if args.live else 'local'}: {output['passed']}/{len(results)} páginas; {len(links)} destinos de Larissa.")
    for row in results:
        if not row['ok']: print(row['route'] + ': ' + ', '.join(row['failures']))
    if output['passed'] != 50 or not links: raise SystemExit(1)

if __name__ == '__main__': main()
