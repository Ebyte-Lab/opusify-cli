import { Link } from 'react-router-dom';

export default function Projects() {
  const filters = ['All', 'Web App', 'Mobile', 'Design', 'Open Source'];

  const projects = [
    { title: 'E-Commerce Platform', description: 'Full-stack e-commerce with real-time inventory, Stripe payments, and admin dashboard.', tags: ['React', 'Node.js', 'Stripe'], color: '#6366f1' },
    { title: 'Task Management App', description: 'Collaborative Kanban boards with drag-and-drop, real-time updates, and team workspaces.', tags: ['Next.js', 'Prisma', 'PostgreSQL'], color: '#8b5cf6' },
    { title: 'Weather Dashboard', description: 'Interactive weather visualization with charts, geolocation search, and 7-day forecasts.', tags: ['TypeScript', 'API', 'Chart.js'], color: '#06b6d4' },
    { title: 'Social Media Clone', description: 'Cross-platform mobile app with feeds, stories, real-time messaging, and push notifications.', tags: ['React Native', 'Firebase', 'Expo'], color: '#f43f5e' },
    { title: 'Design System', description: 'Component library with tokens, accessibility guidelines, and Storybook documentation.', tags: ['Figma', 'Storybook', 'CSS'], color: '#f59e0b' },
    { title: 'CLI Tool', description: 'Developer CLI for scaffolding projects, managing configs, and automating workflows.', tags: ['Node.js', 'TypeScript', 'Commander'], color: '#10b981' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">All Projects</h1>
          <p className="mt-3 text-text-secondary">A collection of projects I&apos;ve built — from web apps to open source tools.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((filter, i) => (
            <button
              key={filter}
              className={`px-4 py-2 text-sm font-medium rounded-theme transition ${
                i === 0 ? 'bg-primary text-white' : 'bg-card border border-border text-text-secondary hover:text-foreground hover:border-primary'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.title} className="group border border-border rounded-theme bg-card overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
              <div className="aspect-video w-full" style=\{{ backgroundColor: project.color }}>
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white/70 text-sm font-medium">Project Preview</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition">{project.title}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-full bg-bg-secondary text-text-secondary border border-border">{tag}</span>
                  ))}
                </div>
                <Link to="#" className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline">
                  View Project &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
