# Revisão editorial de 50 páginas — 6 de outubro de 2026

Foram revisadas 50 páginas do núcleo antigo do portal posgraduacaopsicologia.com, em cinco ondas de dez, com três agentes especialistas e integração por um orquestrador. A seleção combina antiguidade, risco de informação incorreta e falta de aplicação prática. As publicações originais são de maio de 2026; alterações técnicas posteriores não foram tratadas como revisão de conteúdo.

## Entrega

| Onda | Foco | Páginas |
| --- | --- | ---: |
| 1 | Regulamentação, clínica, avaliação, trabalho e NR-1 | 10 |
| 2 | IA, dados, trabalho digital, psicologia positiva e burnout | 10 |
| 3 | Neuropsicologia, desenvolvimento, educação e esporte | 10 |
| 4 | Abordagens terapêuticas, evidências, hospital, saúde e SUS | 10 |
| 5 | Saúde mental no trabalho, inclusão, avaliação com IA e perícia | 10 |

Todas as páginas têm revisão editorial identificada, fontes, perguntas frequentes e uma ficha específica com campos, conferências, cópia, download em texto e limpeza. As fichas não enviam nem salvam automaticamente o preenchimento; orientam o uso de dados públicos ou fictícios e não produzem diagnóstico ou certificado.

Também foram corrigidas a página inicial, a comparação de tipos de formação, a regulamentação e componentes compartilhados. MBA foi situado dentro da pós-graduação lato sensu; certificado acadêmico e registro profissional de especialista foram diferenciados. Não houve atribuição automática de revisão clínica pessoal.

## Fontes e crosslinks

Os 50 textos incluem recursos pertinentes do [portal educacional de Alexandre Caramaschi](https://alexandrecaramaschi.com/educacao), distribuídos por sete destinos. Esses recursos aparecem como formação complementar, sem equivalência automática a pós-graduação ou habilitação clínica.

Oito páginas incluem crosslinks contextuais para quatro destinos do portal de Larissa Caramaschi:

- [Supervisão clínica](https://larissacaramaschi.com/profissionais/supervisao-clinica).
- [Orientação diagnóstica de adultos](https://larissacaramaschi.com/trilhas/suspeita-tea-adultos/orientacao-diagnostica).
- [Clareza de objetivos clínicos](https://larissacaramaschi.com/trilhas/terapia-individual-adaptada/clareza-de-objetivos).
- [Burnout autista](https://larissacaramaschi.com/conceitos/burnout-autista).

A auditoria cobriu 93 destinos: 70 acessíveis por GET e 23 identificados em fontes primárias apesar de restrição HTTP ou falha de transporte. Nenhum 404/410 permaneceu. Todos os 11 destinos de Alexandre e Larissa responderam HTTP 200. Um endereço da nota sobre eMulti foi substituído pelo texto vigente da Portaria GM/MS nº 9.584/2025 na BVS do Ministério da Saúde.

As correções incluem CFP 9/2024 para TDIC, CFP 31/2022 para avaliação, CFP 6/2019 para documentos e CFP 23/2022 com alteração 17/2025 para registro de especialista. A nova redação do capítulo 1.5 da NR-1 foi situada em 26/05/2026. Valores salariais, promessas de retorno financeiro, estatísticas e resultados clínicos sem comprovação foram retirados. Estudos mantidos apresentam população, duração e limites de generalização.

## Validação

- 50/50 páginas aprovadas: URL canônica, H1 e main únicos, ficha, recurso educacional, data de revisão, publicação original preservada e data de modificação correta.
- 50 pares de sentinelas: frase nova presente, frase antiga ausente e frase antiga comprovada na captura anterior.
- Build Astro: 426 páginas; validação de sitemap, dados estruturados, datas e paridade das perguntas frequentes aprovada.
- Artefato consolidado com portal institucional e painel: 453 páginas, 77.052 links internos e 6.546 recursos locais, sem referências ausentes ou IDs inválidos.
- Checagem de tipos: zero erros e zero avisos; 2.308 scripts inline sem erro de sintaxe.
- Testes de busca, cache, navegação, melhoria progressiva e consulta de identificadores externos aprovados.
- Ficha testada no navegador: copiar, baixar e limpar aprovados; sem erro de JavaScript ou rolagem lateral no celular.
- Portal institucional preservado: build, tipos, GEO, tamanho de parágrafos, contraste e 50 endereços externos aprovados.

A revisão independente por agentes verifica consistência editorial e fontes. Ela não representa assinatura ou revisão clínica pessoal por um profissional de saúde.

## Rastreabilidade

- `selecionadas.json`: lista exata das 50 rotas e sua onda.
- `baseline.json`: commit de referência, datas originais e situação HTTP anterior.
- `onda-1.json` a `onda-5.json`: correções, fontes e pares de sentinelas de cada página.
- `links-externos.json`: cobertura dos arquivos, respostas HTTP e verificação documental.
- `verificacao-build.json`: resultado individual das 50 páginas no artefato final.
- `qa-ficha.json`: teste funcional da ferramenta compartilhada.

Após publicar, executar `py -3 scripts/verify-editorial-refresh.py --live`. O resultado fica em `tmp/verificacao-publicada.json`, fora do versionamento. A publicação só fica comprovada quando as 50 páginas servidas passam novamente nas verificações; merge e build, isoladamente, não comprovam conteúdo no ar.

## Recursos

Não foram adicionadas dependências, imagens, áudio ou vídeo. Os 50 arquivos Astro somam aproximadamente 626 KB e o componente de ficha, 6,4 KB de código-fonte. A ferramenta funciona no navegador e não faz chamadas a APIs de IA. A publicação utiliza o pipeline já existente do Cloudflare Pages; não há novo serviço mensal contratado por esta alteração.
