import { IntroForm } from "@/components/intro-form";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#1b1324_0%,_#120f16_52%,_#08070b_100%)] px-4 py-10">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-sm flex-col justify-center">
        <h1 className="mt-6 text-5xl font-semibold leading-tight text-white">
          PsyMatch
        </h1>
        <p
          className="mt-2 text-[0.94rem] leading-6 font-medium text-white"
          style={{ fontFamily: "var(--font-title), var(--font-body), system-ui, sans-serif" }}
        >
          Já imaginou como seriam os principais psicólogos em um app de namoro? Aqui você vai descobrir!
        </p>

        <IntroForm />
      </section>
    </main>
  );
}
