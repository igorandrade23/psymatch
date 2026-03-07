import { IntroForm } from "@/components/intro-form";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#1b1324_0%,_#120f16_52%,_#08070b_100%)] px-4 py-10">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-sm flex-col justify-center">
        <p className="text-sm uppercase tracking-[0.45em] text-fuchsia-200">
          Tinder pedagogico
        </p>
        <h1 className="mt-6 text-5xl font-semibold leading-tight text-white">
          PsyMatch
        </h1>
        <p className="mt-4 text-lg leading-8 text-white/75">
          Descubra autores da psicologia comportamental em ordem cronologica.
          Sem login, sem complexidade, só perfis, humor e matches.
        </p>

        <IntroForm />
      </section>
    </main>
  );
}
