export const metadata = {
  title: 'Skills | {{projectName}}',
  description: 'Technical skills and expertise',
};

const SKILL_CATEGORIES = [
  {
    title: 'Frontend Development',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend & Database',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Neon', 'Drizzle ORM'],
  },
  {
    title: 'Tools & Infrastructure',
    skills: ['Git', 'Docker', 'Linux / Ubuntu', 'GitHub Actions', 'Vercel'],
  },
];

export default function Skills() {
  return (
    <div className="py-20 px-6 sm:px-12 selection:bg-white selection:text-black">
      <div className="max-w-3xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)]">
            Technical Arsenal.
          </h1>
          <p className="text-xl text-[var(--muted)]">Tools and technologies I use to build digital products.</p>
          <div className="w-12 h-1 bg-[var(--foreground)] mt-6"></div>
        </div>

        {/* Skills List */}
        <div className="space-y-12 animate-fade-in delay-100">
          {SKILL_CATEGORIES.map((category, idx) => (
            <div key={idx} className="space-y-6">
              <h2 className="text-2xl font-semibold text-[var(--foreground)] border-b border-[var(--border)] pb-2">
                {category.title}
              </h2>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-4 py-2 text-sm font-medium border border-[var(--border)] rounded-lg text-[var(--foreground)] bg-[var(--background)] hover:border-[var(--muted)] transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}