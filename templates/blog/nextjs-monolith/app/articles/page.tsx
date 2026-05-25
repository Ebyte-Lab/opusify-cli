import Link from 'next/link';

export default function ArticlesPage() {
  const articles = [
    { slug: 'getting-started-with-nextjs-14', title: 'Getting Started with Next.js 14: A Complete Guide', excerpt: 'Learn how to build modern web applications with Next.js 14 App Router and Server Components.', author: 'Jane Smith', date: 'Jun 15, 2024', readTime: '8 min', category: 'Tutorial' },
    { slug: 'tailwind-css-best-practices', title: 'Tailwind CSS Best Practices for Large Projects', excerpt: 'Discover patterns and strategies for maintaining clean Tailwind CSS in enterprise applications.', author: 'Alex Chen', date: 'Jun 12, 2024', readTime: '6 min', category: 'CSS' },
    { slug: 'typescript-generics-explained', title: 'TypeScript Generics Explained Simply', excerpt: 'A practical guide to understanding and using TypeScript generics in your everyday code.', author: 'Maria Garcia', date: 'Jun 10, 2024', readTime: '10 min', category: 'TypeScript' },
    { slug: 'react-server-components', title: 'Understanding React Server Components', excerpt: 'Deep dive into how React Server Components work and when to use them.', author: 'David Park', date: 'Jun 8, 2024', readTime: '7 min', category: 'React' },
    { slug: 'building-design-systems', title: 'Building a Design System from Scratch', excerpt: 'Step-by-step guide to creating a cohesive design system for your team.', author: 'Sarah Johnson', date: 'Jun 5, 2024', readTime: '12 min', category: 'Design' },
    { slug: 'api-design-patterns', title: 'REST API Design Patterns You Should Know', excerpt: 'Essential patterns for building robust and scalable REST APIs.', author: 'James Wilson', date: 'Jun 3, 2024', readTime: '9 min', category: 'Backend' },
    { slug: 'state-management-2024', title: 'State Management in 2024: What to Use', excerpt: 'Comparing Zustand, Jotai, Redux Toolkit, and React Context for modern apps.', author: 'Emily Rodriguez', date: 'Jun 1, 2024', readTime: '11 min', category: 'React' },
    { slug: 'web-performance-optimization', title: 'Web Performance Optimization Checklist', excerpt: 'A comprehensive checklist for making your web applications blazing fast.', author: 'Tom Anderson', date: 'May 28, 2024', readTime: '14 min', category: 'Performance' },
  ];

  const categories = ['All', 'Tutorial', 'React', 'TypeScript', 'CSS', 'Design', 'Backend', 'Performance'];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">All Articles</h1>
          <p className="mt-2 text-text-secondary">Browse our collection of tutorials, guides, and insights</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-2 text-sm rounded-theme transition ${
                i === 0
                  ? 'bg-primary text-white'
                  : 'bg-bg-secondary text-text-secondary hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="block border border-border rounded-theme p-6 bg-card hover:shadow-md transition group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2 py-1 text-xs rounded-full bg-bg-secondary text-text-secondary">
                  {article.category}
                </span>
                <span className="text-xs text-text-secondary">{article.readTime} read</span>
              </div>
              <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition">
                {article.title}
              </h2>
              <p className="mt-2 text-text-secondary leading-relaxed">
                {article.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-text-secondary">
                <span className="font-medium text-foreground">{article.author}</span>
                <span>&middot;</span>
                <span>{article.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
