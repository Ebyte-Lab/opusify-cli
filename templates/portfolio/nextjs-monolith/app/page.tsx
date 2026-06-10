import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-12 selection:bg-white selection:text-black">
      <main className="max-w-3xl w-full space-y-8">
        
        {/* Header Section with staggered fade-in animations */}
        <div className="space-y-4">
          <p className="text-[var(--muted)] font-mono text-sm tracking-widest uppercase animate-fade-in">
            Welcome to the portfolio of
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-[var(--foreground)] animate-fade-in delay-100">
            {{projectName}}
          </h1>
          <p className="text-xl sm:text-2xl text-[var(--muted)] leading-relaxed animate-fade-in delay-200 max-w-2xl">
            A modern <span className="text-[var(--accent)] font-medium">{{variant}}</span> focused on clean design, performance, and seamless user experiences.
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8 animate-fade-in delay-300">
          <Link 
            href="/projects" 
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[var(--foreground)] text-[var(--background)] font-medium hover:opacity-90 transition-opacity"
          >
            View Projects
          </Link>
          <Link 
            href="/about" 
            className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--border)] hover:text-[var(--foreground)] transition-colors"
          >
            About Me
          </Link>
        </div>

      </main>
    </div>
  );
}