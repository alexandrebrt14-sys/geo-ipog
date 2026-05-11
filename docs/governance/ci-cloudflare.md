# CI Cloudflare — operação automatizada do domínio posgraduacaopsicologia.com

Este documento descreve como o GitHub Actions opera, em segurança, a zona Cloudflare do domínio `posgraduacaopsicologia.com` via API. Credenciais ficam apenas como GitHub Secrets do repositório — nunca em arquivo versionado.

## Secrets do repositório

Configurados em `Settings > Secrets and variables > Actions` do repositório `alexandrebrt14-sys/geo-ipog`.

| Nome | Valor | Última rotação |
| --- | --- | --- |
| `CLOUDFLARE_API_TOKEN` | Token API escopado (ver "Token API" abaixo) | 2026-05-11 |
| `CLOUDFLARE_ACCOUNT_ID` | `792448bf922857a2a0c2230bc5088dee` | 2026-05-11 |
| `CLOUDFLARE_ZONE_ID` | `295d38861119987bd89bf8b343a2d2cc` | 2026-05-11 |

Os valores podem ser substituídos via `gh secret set NAME -R alexandrebrt14-sys/geo-ipog --body "<valor>"` ou pelo painel do GitHub. Use `gh secret list -R alexandrebrt14-sys/geo-ipog` para conferir nomes (o painel nunca mostra valores).

## Token API

| Atributo | Valor |
| --- | --- |
| Nome amigável | `geo-ipog CI - posgraduacaopsicologia.com` |
| Token ID | `0979089e7e876a8aca1a373a73e5094c` |
| Status atual | `active` |
| Conta proprietária | `Bbrasilgeo@gmail.com's Account` (`792448bf922857a2a0c2230bc5088dee`) |
| TTL | sem data fim (até revogação) |
| Filtro de IP | nenhum (qualquer IP autorizado) |
| Criado em | 2026-05-11 |
| Cofre local | `~/.cloudflare/geo-ipog-api-token.txt` (chmod 600) no ambiente do Alexandre |

### Permissões concedidas

Token estruturado com seis policies:

| Escopo | Recurso | Permissão | Para quê |
| --- | --- | --- | --- |
| Zona | DNS | Editar | Criar, alterar e excluir registros A, CNAME, MX, TXT, etc. |
| Zona | Limpeza do cache | Limpar | Disparar `purge_cache` (todo ou por URL) |
| Zona | Configurações de zona | Editar | Ajustar SSL, minify, sempre online, page rules globais |
| Conta | Scripts do Workers | Editar | Deploy de Workers que servem o site |
| Conta | Cloudflare Pages | Editar | Publicar/atualizar projetos Pages |
| Conta | Configurações da conta | Lido | Listar zonas, billing summary e settings (read-only) |

Recursos: aplica-se a "Todas as contas" e "Todas as zonas" desta conta — como a conta Cloudflare só tem três zonas (`posgraduacaopsicologia.com`, `brasilgeo.ai`, `sourcerank.io`) e o token é específico do projeto `geo-ipog`, o CI **só deve operar a zona do programa**. Se o repositório precisar de operações em outras zonas, considerar estreitar para "Zona específica" via painel Cloudflare.

### Verificação rápida

```bash
curl -sS https://api.cloudflare.com/client/v4/user/tokens/verify \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
# Esperado: { "success": true, "result": { "status": "active" }, ... }
```

## Workflow GitHub Actions

`.github/workflows/cloudflare-zone-ops.yml` expõe três operações via `workflow_dispatch`:

- `verify-token` — checa saúde do token (default em push)
- `list-dns` — imprime os registros DNS atuais da zona como JSON
- `purge-cache` — invalida o cache da zona inteira

Para executar manualmente: `Actions > Cloudflare zone ops > Run workflow > Choose action`.

## Rotação e revogação

1. Revogar token no painel: `Meu perfil > Tokens de API > geo-ipog CI - posgraduacaopsicologia.com > Excluir`.
2. Recriar com mesmas permissões usando a mesma convenção de nome.
3. Atualizar GH Secret: `gh secret set CLOUDFLARE_API_TOKEN -R alexandrebrt14-sys/geo-ipog --body "<novo-token>"`.
4. Substituir o cofre local: `printf '<novo-token>\n' > ~/.cloudflare/geo-ipog-api-token.txt && chmod 600 ~/.cloudflare/geo-ipog-api-token.txt`.
5. Documentar a rotação na tabela de "Secrets do repositório" acima (campo "Última rotação").

### Quando rotacionar

- Imediatamente em caso de suspeita de vazamento.
- Quando o workflow ou colaborador com acesso à conta Cloudflare sair do escopo do projeto.
- Em ciclo planejado a cada 12 meses, mesmo sem incidente.

## Princípios de segurança

- O token **nunca** entra no repositório nem em logs (o workflow usa `${{ secrets.* }}` e nunca imprime o valor bruto).
- Secrets do repositório só são lidos por workflows executados a partir de branches confiáveis; pull requests de forks não recebem os secrets.
- Falhas no `verify-token` indicam token revogado ou rotacionado sem atualizar o secret — investigar antes de seguir.
- Para operações sensíveis, restringir o trigger do workflow a `workflow_dispatch` (clique manual de admin) em vez de `push`.

## Operação por linha de comando local

Em desenvolvimento local, ler o token do cofre seguro e exportar como variável de ambiente:

```bash
export CLOUDFLARE_API_TOKEN="$(cat ~/.cloudflare/geo-ipog-api-token.txt)"
export CLOUDFLARE_ACCOUNT_ID="792448bf922857a2a0c2230bc5088dee"
export CLOUDFLARE_ZONE_ID="295d38861119987bd89bf8b343a2d2cc"
```

Usar com `wrangler`, `curl` ou qualquer cliente Cloudflare. Nunca exportar este token em terminais compartilhados ou anexar a tickets de suporte.
