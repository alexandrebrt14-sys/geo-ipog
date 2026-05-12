# Domínios do projeto geo-ipog

Inventário dos domínios contratados ou operados pelo programa GEO para IPOG. Cada domínio tem um arquivo próprio no formato `<dominio>.md` que é a fonte da verdade para WHOIS, DNS, custos e governança.

Os snapshots brutos de WHOIS são salvos lado a lado no formato `whois-<dominio>-YYYY-MM-DD.txt` sempre que houver registro, transferência ou renovação.

## Domínios ativos

| Domínio | Finalidade | Titular | Registrador | Criação | Expiração | Registro |
| --- | --- | --- | --- | --- | --- | --- |
| `posgraduacaopsicologia.com` | Hub editorial GEO para o portfólio amplo de pós-graduação em Psicologia do IPOG (5 modalidades canônicas — Especialização Lato Sensu, MBA correlato, Mestrado Profissional, Especialização Clínica certificada CFP/ABRAP/FBT, Formações híbridas/residências) | BRGEO LTDA | Cloudflare, Inc. | 2026-05-11 | 2029-05-11 | [`posgraduacaopsicologia.com.md`](posgraduacaopsicologia.com.md) |

## Princípios de governança

1. **Fonte da verdade.** Sempre que o WHOIS, o registrador, os nameservers, o cartão de cobrança ou a renovação automática mudarem, refletir aqui no mesmo dia.
2. **Snapshot bruto.** Toda criação, transferência ou renovação gera um arquivo `whois-<dominio>-YYYY-MM-DD.txt` com o conteúdo bruto retornado pelo registrar WHOIS, sem reformatar.
3. **Titularidade canônica.** Domínios deste projeto são registrados em nome de **BRGEO LTDA** (CNPJ 66.051.295/0001-33). Domínios pessoais ou de outros projetos do Alexandre não entram neste inventário.
4. **Renovação automática.** Sempre habilitada e validada pelo menos uma vez por trimestre no painel do registrador.
5. **DNSSEC.** Habilitar assim que a zona DNS estiver em produção.
6. **Transfer lock.** Mantido perpetuamente, removido apenas durante uma migração planejada de registrar.
7. **Alertas de expiração.** O email de contato WHOIS recebe alertas 60, 30 e 7 dias antes do vencimento; auditar caixa `bbrasilgeo@gmail.com` mensalmente.

## Próximos domínios sob avaliação

Adicionar à lista aqui caso o projeto decida adquirir domínios complementares (`.com.br`, variantes de marca, redirects, etc.). Aprovação pela governança do programa antes de comprar.
