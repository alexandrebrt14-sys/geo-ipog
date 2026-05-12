# posgraduacaopsicologia.com — registro canônico

> Fonte da verdade do domínio. Toda alteração de WHOIS, DNS, nameservers ou titularidade deve ser refletida aqui imediatamente após executada no registrador.

## Identificação

| Campo | Valor |
| --- | --- |
| Domínio | `posgraduacaopsicologia.com` |
| Finalidade | Hub de conteúdo informacional e educacional para Generative Engine Optimization (GEO) do portfólio amplo de pós-graduação em Psicologia do IPOG, nas 5 modalidades canônicas: Especialização Lato Sensu (formato dominante), MBA correlato à Psicologia, Mestrado Profissional, Especialização Clínica certificada por Conselhos (CFP/ABRAP/FBT) e Formações híbridas/residências (reframe canônico 12-05-2026 — `dashboards/METRICAS-CANONICAS.md` Cláusula 0) |
| Projeto | `geo-ipog` (repositório atual) |
| Tipo | gTLD `.com` |
| Status ICANN | `ok` + `addperiod` |
| DNSSEC | unsigned (avaliar ativação após apontar nameservers) |

## Linha do tempo

| Evento | Data (UTC) | Observação |
| --- | --- | --- |
| Criação no registry | 2026-05-11T17:36:25Z | Registro inicial |
| Última atualização WHOIS | 2026-05-11T17:36:25Z | Igual à criação |
| Expiração programada | 2029-05-11T17:36:25Z | 3 anos contratados; renovação automática ativa |
| Próxima janela de renovação | a partir de 2029-04-11 | 30 dias antes do vencimento |

## Registrador

| Campo | Valor |
| --- | --- |
| Registrar | Cloudflare, Inc. |
| Registrar IANA ID | 1910 |
| Registrar WHOIS Server | `whois.cloudflare.com` |
| Registrar URL | https://www.cloudflare.com/ |
| Registrar Abuse Contact | registrar-abuse@cloudflare.com — +1-650-319-8936 |
| Conta Cloudflare | `Bbrasilgeo@gmail.com's Account` |
| Account ID | `792448bf922857a2a0c2230bc5088dee` |
| Login operacional | `ti@brasilgeo.ai` (autenticação via Workspace) |

Detalhes operacionais da conta no registrador estão em [`../registrador-cloudflare.md`](../registrador-cloudflare.md).

## Custo e plano

| Item | Valor |
| --- | --- |
| Período contratado | 3 anos |
| Total pago | US$ 31,38 |
| Renovação anual | US$ 10,46 |
| Renovação automática | habilitada (Cloudflare cobra automaticamente 30 dias antes do vencimento) |
| Forma de pagamento | cartão Mastercard final 2519 (validade 05/2034) cadastrado na conta Cloudflare |

## Titularidade (Registrant / Admin / Tech — iguais)

Os três contatos WHOIS são unificados na pessoa jurídica BRGEO LTDA representada por Alexandre Caramaschi. Cloudflare oculta os dados pessoais no WHOIS público por padrão.

| Campo | Valor |
| --- | --- |
| Organização | BRGEO LTDA |
| Nome | Alexandre |
| Sobrenome | Caramaschi |
| Email | bbrasilgeo@gmail.com |
| Telefone | +55.62998141505 |
| Endereço | Rua do Parque, 361, Qd 145, Lt Área 3 |
| Cidade | Goiânia |
| Estado | GO |
| CEP | 74343-245 |
| País | BR |

Dados cadastrais oficiais da pessoa jurídica titular conferem com o Cartão CNPJ emitido pela Receita Federal em 02/04/2026:

- **Razão social:** BRGEO LTDA
- **Nome fantasia:** BRASIL GEO
- **CNPJ:** 66.051.295/0001-33 (matriz)
- **Data de abertura:** 31/03/2026
- **Natureza jurídica:** 206-2 — Sociedade Empresária Limitada
- **Porte:** ME
- **CNAE principal:** 62.01-5-01
- **CNAE secundário:** 62.03-1-00
- **Sócio-administrador:** Alexandre Caramaschi
- **Endereço da sede:** Rua do Parque, 361, Quadra 145, Lote Área 3, Jardim Atlântico, Goiânia/GO, CEP 74.343-245 (Hub Cerrado coworking)

## DNS

### Nameservers (controlados pela Cloudflare por exigência do registrar)

```
AURORA.NS.CLOUDFLARE.COM
WEST.NS.CLOUDFLARE.COM
```

> O Registrar da Cloudflare não permite alterar os nameservers do domínio. Para usar outro provedor de DNS seria necessário transferir o registro para outro registrar (depois do período de 60 dias de bloqueio pós-criação).

### Registros DNS planejados (a configurar nas próximas ondas)

| Tipo | Nome | Valor | Propósito | Status |
| --- | --- | --- | --- | --- |
| A / CNAME | `@` (apex) | a definir | Landing page principal | pendente |
| A / CNAME | `www` | redirect 301 → apex | Compatibilidade | pendente |
| TXT | `@` | `v=spf1 ...` | SPF se houver envio de email | a avaliar |
| TXT | `_dmarc` | `v=DMARC1; p=reject; ...` | Política antiphishing | a avaliar |
| MX | `@` | a definir | Caixa postal corporativa (opcional) | a avaliar |
| TXT | `@` | `google-site-verification=...` | Validação Search Console | pendente |
| TXT | `@` | `cf-verify=...` (se aplicável) | Validações de plataformas | pendente |

## Estratégia GEO

| Aspecto | Decisão |
| --- | --- |
| Tipo de site | Hub editorial informacional + materiais educacionais para captura de citações em LLMs (Generative Engine Optimization) |
| Foco temático | Pós-graduação em Psicologia em 5 modalidades canônicas (Especialização Lato Sensu, MBA correlato, Mestrado Profissional, Especialização Clínica certificada CFP/ABRAP/FBT, Formações híbridas/residências) e áreas correlatas |
| Cliente sponsor | IPOG — Instituto de Pós-Graduação |
| Naming canônico do programa | "Pós-Graduações em Psicologia do IPOG" (agregado) — naming por modalidade conforme `dashboards/METRICAS-CANONICAS.md` Cláusula 0 |
| Stack provável | Cloudflare Workers / Pages + conteúdo Markdown + schema.org rico (Course, EducationalOccupationalProgram com `programType` variando entre `"Specialization"`/`"MBA"`/`"MastersProgram"`/`"ClinicalCertification"`, FAQPage) |
| Idioma | Português do Brasil com acentuação completa |
| Pipeline editorial | a definir em `docs/engineering/` |

## Riscos e mitigações

| Risco | Mitigação |
| --- | --- |
| Domínio expirar por falha de cobrança | Renovação automática ativa + cartão com validade 05/2034 + alerta WHOIS por email; monitorar em dashboard Cloudflare Billing |
| Perda da conta Cloudflare `Bbrasilgeo@gmail.com` | Habilitar 2FA forte + chave de recuperação salva no cofre de credenciais; documentar fluxo de transferência de titularidade |
| Mudança de razão social / CNPJ da BRGEO LTDA | Atualizar WHOIS via Cloudflare Registrar e refletir aqui no mesmo dia |
| DNSSEC desligado | Habilitar DNSSEC quando a zona for ativada com conteúdo de produção |
| Transferência indevida do domínio | Cloudflare aplica transfer-lock por padrão nos primeiros 60 dias; manter lock perpetuamente exceto durante migração planejada |

## Pendências imediatas

1. Vincular o domínio à zona Cloudflare correspondente para configuração de DNS (a partir do dashboard `Domínios > Visão geral > posgraduacaopsicologia.com`)
2. Habilitar DNSSEC após a zona estar ativa
3. Configurar Search Console (URL-prefix e Domain property) na conta `alexandre.brt14@gmail.com` ou `caramaschiai@caramaschiai.io`
4. Definir e versionar o stack de hospedagem em `docs/tech-stack/`
5. Cadastrar o domínio nas propriedades GA4 e PostHog quando houver tráfego
6. Criar o primeiro robots.txt + sitemap.xml + llms.txt conforme padrões já versionados em `audits/`

## Referências cruzadas

- WHOIS público fornecido pela Cloudflare em 2026-05-11T17:36:30Z (preservado em [`whois-posgraduacaopsicologia.com-2026-05-11.txt`](whois-posgraduacaopsicologia.com-2026-05-11.txt))
- Sucesso de compra registrado em https://dash.cloudflare.com/792448bf922857a2a0c2230bc5088dee/domains/registrations/success
- Documento da titular: `BRasilgeo Cartao CNPJ.pdf` (em arquivo seguro fora deste repositório)
- Contexto do programa: [`docs/02-contexto-mba-online-psicologia.md`](../../02-contexto-mba-online-psicologia.md)
- Risk register do projeto: [`docs/05-risk-register.md`](../../05-risk-register.md)

## Histórico de alterações

| Data | Mudança | Responsável |
| --- | --- | --- |
| 2026-05-11 | Registro inicial do domínio por 3 anos (US$ 31,38), criação deste documento | Alexandre Caramaschi |
