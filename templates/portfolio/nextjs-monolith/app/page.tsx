import Link from 'next/link';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';

export default function Home() {
  const featuredProjects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with real-time inventory management, payment processing, and an admin dashboard.',
      tags: ['React', 'Node.js', 'Stripe'],
      color: '#6366f1',
      link: '/projects',
    },
    {
      title: 'Task Management App',
      description: 'Collaborative project management tool with drag-and-drop boards, real-time updates, and team workspaces.',
      tags: ['Next.js', 'Prisma', 'PostgreSQL'],
      color: '#8b5cf6',
      link: '/projects',
    },
    {
      title: 'Weather Dashboard',
      description: 'Beautiful weather visualization app with interactive charts, location search, and 7-day forecasts.',
      tags: ['TypeScript', 'API', 'Chart.js'],
      color: '#06b6d4',
      link: '/projects',
    },
  ];

  const skills = [
    'React', 'Next.js', 'TypeScript', 'Tailwind CSS',
    'Node.js', 'PostgreSQL', 'Git', 'Figma',
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative max-w-5xl mx-auto px-6 py-24 lg:py-32 text-center overflow-hidden">
        {/* Decorative gradient blob */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style=\{{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)', opacity: 0.12 }}
        />

        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Hi, I&apos;m <span className="text-primary">Alex Chen</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
            A full-stack developer building modern web experiences with the{' '}
            <strong className="text-foreground">{{variant}}</strong> aesthetic.
            Welcome to <span className="text-primary font-semibold">{{projectName}}</span>.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="rounded-theme bg-primary px-7 py-3 text-white font-medium hover:bg-primary-hover transition"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="rounded-theme border border-border px-7 py-3 font-medium text-foreground hover:bg-bg-secondary transition"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">About Me</h2>
          <p className="mt-3 text-text-secondary max-w-xl mx-auto">
            I specialize in building performant, accessible web applications
            that delight users and solve real problems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-theme border border-border bg-card">
            <p className="text-3xl font-bold text-primary">5+</p>
            <p className="mt-1 text-sm text-text-secondary">Years Experience</p>
          </div>
          <div className="text-center p-6 rounded-theme border border-border bg-card">
            <p className="text-3xl font-bold text-primary">50+</p>
            <p className="mt-1 text-sm text-text-secondary">Projects Completed</p>
          </div>
          <div className="text-center p-6 rounded-theme border border-border bg-card">
            <p className="text-3xl font-bold text-primary">30+</p>
            <p className="mt-1 text-sm text-text-secondary">Happy Clients</p>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Featured Projects</h2>
          <Link
            href="/projects"
            className="text-sm font-medium text-primary hover:underline hidden sm:inline-flex items-center"
          >
            View All Projects
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/projects" className="text-sm font-medium text-primary hover:underline">
            View All Projects &rarr;
          </Link>
        </div>
      </section>

      {/* Skills / Tech Stack Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Tech Stack</h2>
          <p className="mt-3 text-text-secondary">Technologies I work with daily</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {skills.map((skill) => (
            <div
              key={skill}
              className="flex items-center justify-center gap-2 p-4 rounded-theme border border-border bg-card hover:border-primary hover:shadow-sm transition"
            >
              <div className="w-6 h-6 rounded bg-bg-secondary flex items-center justify-center">
                <span className="text-xs font-bold text-primary">
                  {skill.charAt(0)}
                </span>
              </div>
              <span className="text-sm font-medium text-foreground">{skill}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="bg-bg-secondary border-t border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Let&apos;s Work Together
          </h2>
          <p className="mt-3 text-text-secondary max-w-lg mx-auto">
            Have a project in mind or want to collaborate? I&apos;m always open to
            discussing new opportunities and creative ideas.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-theme bg-primary px-8 py-3 text-white font-medium hover:bg-primary-hover transition"
          >
            Get In Touch
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
