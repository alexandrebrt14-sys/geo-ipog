/**
 * Injeta um bloco de dados estruturados JSON-LD no HTML da página.
 *
 * Renderiza no servidor, então o script já sai no HTML entregue ao crawler,
 * sem depender de execução de JavaScript no cliente.
 */

type JsonLdProps = {
  /** Objeto Schema.org, normalmente vindo de `@/lib/jsonld`. */
  schema: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // O conteúdo é gerado internamente a partir de dados tipados, nunca de
      // entrada do usuário. Escapamos `<` para evitar fechamento precoce da tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
