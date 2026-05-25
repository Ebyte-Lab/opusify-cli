export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-background text-foreground">
      <h1 className="text-5xl font-bold tracking-tight">
        Welcome to <span className="text-primary">{{projectName}}</span>
      </h1>
      <p className="mt-4 text-xl text-text-secondary max-w-2xl">
        A <strong>{{variant}}</strong> portfolio, scaffolded by Opusify CLI.
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="#projects"
          className="rounded-theme bg-primary px-6 py-3 text-white font-medium hover:bg-primary-hover transition"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="rounded-theme border border-border px-6 py-3 font-medium hover:bg-bg-secondary transition"
        >
          Contact Me
        </a>
      </div>
    </main>
  );
}
