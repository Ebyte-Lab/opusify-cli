export default function Skills() {
  const categories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 95 },
        { name: 'Next.js', level: 90 },
        { name: 'TypeScript', level: 92 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'HTML/CSS', level: 98 },
        { name: 'Vue.js', level: 70 },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 88 },
        { name: 'PostgreSQL', level: 82 },
        { name: 'REST APIs', level: 90 },
        { name: 'GraphQL', level: 75 },
        { name: 'Prisma', level: 85 },
        { name: 'Redis', level: 70 },
      ],
    },
    {
      title: 'Tools & DevOps',
      skills: [
        { name: 'Git', level: 92 },
        { name: 'Docker', level: 78 },
        { name: 'CI/CD', level: 80 },
        { name: 'Vercel', level: 90 },
        { name: 'AWS', level: 72 },
        { name: 'Linux', level: 75 },
      ],
    },
    {
      title: 'Design & Other',
      skills: [
        { name: 'Figma', level: 85 },
        { name: 'UI/UX Design', level: 78 },
        { name: 'Accessibility', level: 82 },
        { name: 'Performance', level: 88 },
        { name: 'Testing', level: 80 },
        { name: 'Agile/Scrum', level: 85 },
      ],
    },
  ];

  const certifications = [
    { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: '2023' },
    { name: 'Meta Frontend Developer Certificate', issuer: 'Meta / Coursera', year: '2022' },
    { name: 'Google UX Design Certificate', issuer: 'Google / Coursera', year: '2021' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Skills & Expertise</h1>
          <p className="mt-3 text-text-secondary text-lg">
            A breakdown of my technical skills, tools, and proficiency levels built over 5+ years of professional development.
          </p>
        </div>

        {/* Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {categories.map((category) => (
            <div key={category.title} className="border border-border rounded-theme p-6 bg-card">
              <h2 className="text-xl font-bold text-foreground mb-6">{category.title}</h2>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className="text-text-secondary">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style=\{{ width: `${skill.level}%`, backgroundColor: 'var(--primary)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div key={cert.name} className="border border-border rounded-theme p-5 bg-card text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground text-sm">{cert.name}</h3>
                <p className="text-xs text-text-secondary mt-1">{cert.issuer}</p>
                <p className="text-xs text-primary mt-1">{cert.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
