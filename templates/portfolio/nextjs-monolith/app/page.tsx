export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-bold tracking-tight">
        Welcome to <span className="text-blue-600">{{projectName}}</span>
      </h1>
      <p className="mt-4 text-xl text-gray-600 max-w-2xl">
        A <strong>{{variant}}</strong> portfolio, scaffolded by Opusify CLI.
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="#projects"
          className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="rounded-lg border border-gray-300 px-6 py-3 font-medium hover:bg-gray-50 transition"
        >
          Contact Me
        </a>
      </div>
    </main>
  );
}
