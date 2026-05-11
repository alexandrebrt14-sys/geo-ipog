# Registrador Cloudflare — conta operacional do projeto

Documento de governança da conta Cloudflare usada para registrar os domínios do programa GEO para IPOG. Lista contas, escopos, responsabilidades e regras de operação. Credenciais ficam fora do repositório.

## Conta Cloudflare

| Campo | Valor |
| --- | --- |
| Nome exibido | `Bbrasilgeo@gmail.com's Account` |
| Account ID | `792448bf922857a2a0c2230bc5088dee` |
| Plano atual | Free + Cloudflare Registrar a preço de custo |
| Email de cobrança | `bbrasilgeo@gmail.com` |
| Login operacional | `ti@brasilgeo.ai` (Google Workspace caramaschiai.io) |
| Forma de pagamento padrão | cartão Mastercard final 2519 (validade 05/2034) |
| URL do painel | https://dash.cloudflare.com/792448bf922857a2a0c2230bc5088dee/home/overview |

> Existem outras contas Cloudflare na operação do Alexandre. Esta é exclusivamente a conta `brasilgeo` (experimentos e ativos do Brasil GEO). A conta operacional da Herreira Semijoias é separada e tem token, zonas e produção próprios.

## Domínios sob esta conta

Atualizado em conjunto com [`dominios/README.md`](dominios/README.md).

| Domínio | Tipo | Função neste projeto |
| --- | --- | --- |
| `posgraduacaopsicologia.com` | Cloudflare Registrar | Hub editorial GEO para o MBA Online de Psicologia do IPOG |
| `brasilgeo.ai` | Zona Cloudflare | Não pertence ao projeto geo-ipog, mantida para referência cruzada |
| `sourcerank.io` | Zona Cloudflare | Não pertence ao projeto geo-ipog |

## Permissões e papéis

| Papel | Pessoa | Escopo |
| --- | --- | --- |
| Super Administrator | Alexandre Caramaschi | acesso total à conta |
| Operador via API | token de API armazenado em `~/.cloudflare/brasilgeo-api-token.txt` no ambiente do Alexandre | Edit Workers + 11 escopos de Edit em contas/zonas |

Tokens, chaves de API e cookies de sessão **nunca** entram neste repositório. Eles vivem fora do diretório do projeto, em diretórios `~/.cloudflare/` com permissão `0600`.

## Regras de operação

1. Toda criação de domínio é precedida de revisão do nome no Voice Guard de naming canônico do programa.
2. Renovação automática sempre habilitada.
3. Transfer lock sempre habilitado.
4. WHOIS Privacy (oculta dados pessoais) sempre habilitada — padrão do Cloudflare Registrar.
5. Mudanças de DNS produtivo só com PR aprovado em `docs/engineering/` e snapshot pré-mudança da zona.
6. 2FA forte obrigatório em ambas as identidades (`bbrasilgeo@gmail.com` e `ti@brasilgeo.ai`); guardar chaves de recuperação em cofre offline.
7. Alertas de billing e expiração de domínio são auditados mensalmente.

## Continuidade

Caso o sócio-administrador da BRGEO LTDA fique indisponível, o procedimento para reassumir o controle da conta é:

1. Solicitar reset por email à Cloudflare a partir do endereço cadastrado (`bbrasilgeo@gmail.com`).
2. Validar identidade da pessoa jurídica titular usando o Cartão CNPJ da BRGEO LTDA (`66.051.295/0001-33`) e o contrato social vigente.
3. Atualizar os contatos WHOIS dos domínios listados acima logo após reassumir a conta.

## Histórico de alterações

| Data | Mudança | Responsável |
| --- | --- | --- |
| 2026-05-11 | Criação deste documento como parte do registro do primeiro domínio do projeto (`posgraduacaopsicologia.com`) | Alexandre Caramaschi |
