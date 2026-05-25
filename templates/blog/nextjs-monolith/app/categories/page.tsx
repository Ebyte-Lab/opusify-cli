import Link from 'next/link';

export default function CategoriesPage() {
  const categories = [
    { name: 'React', slug: 'react', count: 24, description: 'Components, hooks, patterns, and best practices for React development.' },
    { name: 'TypeScript', slug: 'typescript', count: 18, description: 'Type safety, generics, utility types, and advanced TypeScript patterns.' },
    { name: 'Next.js', slug: 'nextjs', count: 15, description: 'App Router, Server Components, API routes, and deployment strategies.' },
    { name: 'CSS & Design', slug: 'css-design', count: 12, description: 'Tailwind CSS, animations, responsive design, and design systems.' },
    { name: 'Backend', slug: 'backend', count: 10, description: 'APIs, databases, authentication, and server-side architecture.' },
    { name: 'DevOps', slug: 'devops', count: 8, description: 'CI/CD, Docker, deployment, monitoring, and infrastructure.' },
    { name: 'Performance', slug: 'performance', count: 7, description: 'Core Web Vitals, optimization techniques, and benchmarking.' },
    { name: 'Career', slug: 'career', count: 5, description: 'Job hunting, interviews, growth, and developer life.' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Categories</h1>
          <p className="mt-2 text-text-secondary">Browse articles by topic</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="border border-border rounded-theme p-6 bg-card hover:shadow-md transition group"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition">
                  {category.name}
                </h2>
                <span className="px-2 py-1 text-xs rounded-full bg-bg-secondary text-text-secondary">
                  {category.count} articles
                </span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
