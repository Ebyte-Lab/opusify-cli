import Link from 'next/link';
import Footer from '../../components/Footer';

const filters = ['All', 'Web App', 'Mobile', 'Design', 'Open Source'];

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory management, payment processing via Stripe, and a comprehensive admin dashboard for store owners.',
    tags: ['React', 'Node.js', 'Stripe'],
    color: '#6366f1',
    category: 'Web App',
  },
  {
    title: 'Task Management App',
    description: 'Collaborative project management tool featuring drag-and-drop Kanban boards, real-time updates with WebSockets, and team workspace management.',
    tags: ['Next.js', 'Prisma', 'PostgreSQL'],
    color: '#8b5cf6',
    category: 'Web App',
  },
  {
    title: 'Weather Dashboard',
    description: 'Beautiful weather visualization application with interactive charts, geolocation-based search, and detailed 7-day forecasts with hourly breakdowns.',
    tags: ['TypeScript', 'API', 'Chart.js'],
    color: '#06b6d4',
    category: 'Web App',
  },
  {
    title: 'Social Media Clone',
    description: 'A cross-platform mobile application replicating core social media features including feeds, stories, real-time messaging, and push notifications.',
    tags: ['React Native', 'Firebase', 'Expo'],
    color: '#f43f5e',
    category: 'Mobile',
  },
  {
    title: 'Design System',
    description: 'A comprehensive component library and design system with tokens, accessibility guidelines, and interactive documentation powered by Storybook.',
    tags: ['Figma', 'Storybook', 'CSS'],
    color: '#f59e0b',
    category: 'Design',
  },
  {
    title: 'CLI Tool',
    description: 'A developer-focused command-line interface for scaffolding projects, managing configurations, and automating repetitive development workflows.',
    tags: ['Node.js', 'TypeScript', 'Commander'],
    color: '#10b981',
    category: 'Open Source',
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="max-w-5xl mx-auto px-6 py-16">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">All Projects</h1>
          <p className="mt-3 text-text-secondary">
            A collection of projects I&apos;ve built — from web apps to open source tools.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((filter, index) => (
            <button
              key={filter}
              className={`px-4 py-2 text-sm font-medium rounded-theme transition ${
                index === 0
                  ? 'bg-primary text-white'
                  : 'bg-card border border-border text-text-secondary hover:text-foreground hover:border-primary'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group border border-border rounded-theme bg-card overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              {/* Image Placeholder */}
              <div
                className="aspect-video w-full"
                style=\{{ backgroundColor: project.color }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white/70 text-sm font-medium">Project Preview</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-bg-secondary text-text-secondary border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <Link
                  href="#"
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  View Project
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
