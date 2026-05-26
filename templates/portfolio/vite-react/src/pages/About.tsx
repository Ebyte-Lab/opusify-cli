export default function About() {
  const timeline = [
    { period: '2023 — Present', title: 'Senior Frontend Engineer', company: 'TechCorp', description: 'Leading frontend architecture for a SaaS platform serving 100k+ users.' },
    { period: '2021 — 2023', title: 'Frontend Developer', company: 'StartupXYZ', description: 'Built and shipped multiple customer-facing features. Introduced TypeScript and improved test coverage by 60%.' },
    { period: '2019 — 2021', title: 'Junior Developer', company: 'AgencyName', description: 'Developed responsive websites for clients across e-commerce, healthcare, and education.' },
    { period: '2018', title: 'Computer Science Degree', company: 'State University', description: 'Graduated with honors. Focused on algorithms, data structures, and human-computer interaction.' },
  ];

  const skills = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Git', 'Figma'];

  return (
    <div className="min-h-screen bg-background">
      <section className="max-w-5xl mx-auto px-6 py-16">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">About Me</h1>
            <div className="mt-6 space-y-4 text-text-secondary leading-relaxed">
              <p>
                Hi there! I&apos;m Alex Chen, a full-stack developer based in San Francisco with over 5 years of experience building web applications. I&apos;m passionate about creating intuitive, performant digital experiences.
              </p>
              <p>
                My journey into software development started with a curiosity about how things work on the internet. That curiosity turned into a career where I get to solve complex problems every day.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me contributing to open source, writing technical blog posts, or hiking trails around the Bay Area.
              </p>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="w-72 h-80 rounded-theme bg-bg-secondary border border-border flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 mx-auto flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">AC</span>
                </div>
                <p className="mt-3 text-sm text-text-secondary">Profile Photo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-10">Experience</h2>
          <div className="space-y-8">
            {timeline.map((entry, i) => (
              <div key={i} className="relative pl-8 border-l-2 border-border">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                <span className="text-xs font-medium text-primary uppercase tracking-wide">{entry.period}</span>
                <h3 className="mt-1 text-lg font-semibold text-foreground">{entry.title}</h3>
                <p className="text-sm text-text-secondary font-medium">{entry.company}</p>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{entry.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-10 text-center">Tech Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div key={skill} className="flex items-center justify-center gap-2 p-4 rounded-theme border border-border bg-card hover:border-primary hover:shadow-sm transition">
                <div className="w-6 h-6 rounded bg-bg-secondary flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{skill.charAt(0)}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
