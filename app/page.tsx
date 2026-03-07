import { IntroForm } from "@/components/intro-form";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden px-6 py-10 md:px-10">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blush/35 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.45em] text-ember">
            Tinder pedagogico
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-tight md:text-7xl">
            PsyMatch conecta voce com os grandes nomes do behaviorismo.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/75">
            Em vez de conversar com desconhecidos, voce percorre a linha do
            tempo da psicologia comportamental e descobre autores com humor,
            contexto historico e matches pre-prontos.
          </p>
        </div>

        <IntroForm />
      </section>
    </main>
  );
}

