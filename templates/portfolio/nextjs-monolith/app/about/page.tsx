import Link from 'next/link';

export const metadata = {
  title: 'About | {{projectName}}',
  description: 'Learn more about {{projectName}}',
};

export default function About() {
  return (
    <div className="py-20 px-6 sm:px-12 selection:bg-white selection:text-black">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)]">
            About Me.
          </h1>
          <div className="w-12 h-1 bg-[var(--foreground)]"></div>
        </div>

        {/* Content */}
        <div className="space-y-6 text-lg text-[var(--muted)] leading-relaxed animate-fade-in delay-100">
          <p>
            I am a passionate builder and creator focusing on delivering high-quality digital experiences. 
            With a strong foundation in modern web technologies, I specialize in crafting fast, scalable, 
            and visually striking applications.
          </p>
          <p>
            My approach is rooted in simplicity and performance. I believe that the best design is invisible, 
            allowing the content and functionality to take center stage.
          </p>
        </div>

        {/* Skills / Stack */}
        <div className="pt-8 animate-fade-in delay-200">
          <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-6">Core Stack</h2>
          <div className="flex flex-wrap gap-3">
            {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'].map((skill) => (
              <span 
                key={skill} 
                className="px-4 py-2 text-sm font-medium border border-[var(--border)] rounded-full text-[var(--foreground)] bg-[var(--background)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}