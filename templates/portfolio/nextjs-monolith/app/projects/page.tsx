import Link from 'next/link';

export const metadata = {
  title: 'Projects | {{projectName}}',
  description: 'Recent work and projects by {{projectName}}',
};

const PROJECTS = [
  {
    title: 'Project Alpha',
    description: 'A high-performance web application built with Next.js and Tailwind CSS. Focuses on seamless user interactions.',
    year: '2026'
  },
  {
    title: 'Digital Platform',
    description: 'An end-to-end e-commerce solution featuring real-time inventory management and secure payment processing.',
    year: '2025'
  },
  {
    title: 'Open Source CLI',
    description: 'A command-line interface tool designed to automate scaffolding and improve developer productivity.',
    year: '2025'
  }
];

export default function Projects() {
  return (
    <div className="py-20 px-6 sm:px-12 selection:bg-white selection:text-black">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)]">
            Selected Work.
          </h1>
          <p className="text-xl text-[var(--muted)]">A collection of recent projects and experiments.</p>
          <div className="w-12 h-1 bg-[var(--foreground)] mt-6"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-12 sm:grid-cols-2 animate-fade-in delay-100">
          {PROJECTS.map((project, idx) => (
            <div 
              key={idx} 
              className="group space-y-4 border border-[var(--border)] p-6 rounded-2xl hover:border-[var(--muted)] transition-colors"
            >
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  {project.title}
                </h2>
                <span className="text-sm font-mono text-[var(--muted)]">{project.year}</span>
              </div>
              <p className="text-[var(--muted)] leading-relaxed">
                {project.description}
              </p>
              <div className="pt-4">
                <span className="text-sm font-medium text-[var(--foreground)] pb-1 border-b border-transparent group-hover:border-[var(--foreground)] transition-all cursor-pointer">
                  View Case Study →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}