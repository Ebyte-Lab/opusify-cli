export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="mb-4 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200">
          {{variant}} Portfolio
        </p>
        <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl">
          Welcome to {{projectName}}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          This Next.js 14 portfolio blueprint is ready for your {{variant}}
          story, powered by Tailwind CSS, TypeScript, and the App Router.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#work"
            className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Contact Me
          </a>
        </div>
      </section>
    </main>
  );
}
