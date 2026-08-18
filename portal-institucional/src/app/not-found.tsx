import Link from "next/link";
import type { Metadata } from "next";
import { navigation } from "@/lib/site";
import { Container } from "@/components/Layout";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description:
    "A página solicitada não existe no Portal GEO IPOG. Use a navegação para chegar às áreas de conhecimento, ao Método IPOG ou às perguntas frequentes.",
  robots: { index: false, follow: true },
};

export default function NaoEncontrada() {
  return (
    <div className="bg-digital-950 text-white">
      <Container className="py-20 sm:py-28">
        <p className="font-display text-fluid-4xl font-bold text-protagonismo-500">
          404
        </p>
        <h1 className="mt-4 max-w-2xl text-fluid-3xl font-bold uppercase text-white">
          Página não encontrada
        </h1>
        <p className="mt-5 max-w-2xl text-fluid-lg leading-relaxed text-digital-200">
          O endereço acessado não existe neste portal. Escolha abaixo por onde
          continuar.
        </p>

        <nav aria-label="Rotas do portal" className="mt-10">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block h-full rounded-card border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-white/25 hover:bg-white/[0.08]"
                >
                  <span className="block font-display text-fluid-lg font-bold uppercase text-white">
                    {item.label}
                  </span>
                  <span className="mt-2 block text-fluid-sm text-digital-300">
                    {item.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </div>
  );
}
