/**
 * Derivação de tom de texto acessível a partir de uma cor da marca.
 *
 * O problema que isto resolve: a etiqueta de área usava a cor da área como cor
 * do texto, sobre um fundo que é a mesma cor a 8% de opacidade. Para as cores
 * claras da paleta o resultado ficava ilegível e abaixo do mínimo da WCAG 2.2
 * AA, que exige 4,5:1 para texto normal. Medido antes da correção:
 *
 * | Área                     | Cor       | Contraste |
 * |--------------------------|-----------|-----------|
 * | Gestão e Negócios        | `#f3ad39` | 1,83:1    |
 * | Comunicação              | `#e8871a` | 2,46:1    |
 * | Tecnologia da Informação | `#05a48c` | 2,88:1    |
 * | Cinza Conexão (etiquetas)| `#7f7f7f` | 3,67:1    |
 *
 * A saída **não** é trocar a cor da marca. O Guia de Expressão da Marca 2025
 * define esses tons, e `globals.css` já usa a mesma solução para o Cinza
 * Conexão: o tom oficial fica no papel decorativo, em borda e preenchimento, e
 * o texto usa uma variação mais escura do mesmo matiz. Aqui isso vira regra
 * aplicada em um ponto só, em vez de uma tabela de exceções mantida à mão.
 *
 * A conta roda no build, porque o portal é exportado como HTML estático, então
 * não há custo em tempo de execução.
 */

/** Canal sRGB linearizado, conforme a definição de luminância da WCAG. */
function canalLinear(valor: number): number {
  const c = valor / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

type Rgb = { r: number; g: number; b: number };

/** Lê `#rrggbb` ou `#rgb`. Devolve `null` para qualquer outra coisa. */
function lerHex(hex: string): Rgb | null {
  const limpo = hex.trim().replace(/^#/, "");

  const expandido =
    limpo.length === 3
      ? limpo
          .split("")
          .map((c) => c + c)
          .join("")
      : limpo;

  if (!/^[0-9a-f]{6}$/i.test(expandido)) return null;

  return {
    r: parseInt(expandido.slice(0, 2), 16),
    g: parseInt(expandido.slice(2, 4), 16),
    b: parseInt(expandido.slice(4, 6), 16),
  };
}

const paraHex = ({ r, g, b }: Rgb): string =>
  "#" +
  [r, g, b]
    .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0"))
    .join("");

/** Luminância relativa, entre 0 (preto) e 1 (branco). */
export function luminancia(hex: string): number {
  const rgb = lerHex(hex);
  if (!rgb) return 0;
  return (
    0.2126 * canalLinear(rgb.r) +
    0.7152 * canalLinear(rgb.g) +
    0.0722 * canalLinear(rgb.b)
  );
}

/** Razão de contraste entre duas cores, de 1:1 a 21:1. */
export function contraste(corA: string, corB: string): number {
  const a = luminancia(corA);
  const b = luminancia(corB);
  const [maior, menor] = a > b ? [a, b] : [b, a];
  return (maior + 0.05) / (menor + 0.05);
}

/** Compõe uma cor com opacidade sobre um fundo opaco. */
export function sobrepor(hex: string, opacidade: number, fundo: string): string {
  const frente = lerHex(hex);
  const atras = lerHex(fundo);
  if (!frente || !atras) return fundo;

  return paraHex({
    r: frente.r * opacidade + atras.r * (1 - opacidade),
    g: frente.g * opacidade + atras.g * (1 - opacidade),
    b: frente.b * opacidade + atras.b * (1 - opacidade),
  });
}

/** Mínimo da WCAG 2.2 AA para texto normal. */
export const CONTRASTE_MINIMO_AA = 4.5;

/**
 * Escurece a cor da marca o mínimo necessário para alcançar `alvo` sobre
 * `fundo`, preservando o matiz.
 *
 * A escala é multiplicativa sobre os três canais, o que mantém a proporção
 * entre eles e, portanto, o matiz: o tom fica mais escuro, não mais cinza nem
 * deslocado para outra cor. O passo de 2% é fino o bastante para parar no
 * primeiro tom que passa, em vez de escurecer além do necessário e descolar da
 * identidade.
 *
 * Se nem o preto puro alcançar o alvo, devolve preto: é o melhor disponível, e
 * o caso não ocorre com nenhuma cor da paleta atual.
 */
export function corDeTextoAcessivel(
  corDaMarca: string,
  fundo: string,
  alvo: number = CONTRASTE_MINIMO_AA,
): string {
  if (!lerHex(corDaMarca)) return "inherit";
  if (contraste(corDaMarca, fundo) >= alvo) return corDaMarca;

  const base = lerHex(corDaMarca)!;

  for (let fator = 0.98; fator > 0; fator -= 0.02) {
    const candidato = paraHex({
      r: base.r * fator,
      g: base.g * fator,
      b: base.b * fator,
    });
    if (contraste(candidato, fundo) >= alvo) return candidato;
  }

  return "#000000";
}
