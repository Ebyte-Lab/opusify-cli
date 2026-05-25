import Link from 'next/link';

export default function Home() {
  const featuredPost = {
    slug: 'getting-started-with-nextjs-14',
    title: 'Getting Started with Next.js 14: A Complete Guide',
    excerpt: 'Learn how to build modern web applications with Next.js 14 App Router, Server Components, and the latest React features.',
    author: 'Jane Smith',
    date: 'Jun 15, 2024',
    readTime: '8 min read',
    category: 'Tutorial',
  };

  const recentPosts = [
    { slug: 'tailwind-css-best-practices', title: 'Tailwind CSS Best Practices for Large Projects', author: 'Alex Chen', date: 'Jun 12, 2024', readTime: '6 min', category: 'CSS' },
    { slug: 'typescript-generics-explained', title: 'TypeScript Generics Explained Simply', author: 'Maria Garcia', date: 'Jun 10, 2024', readTime: '10 min', category: 'TypeScript' },
    { slug: 'react-server-components', title: 'Understanding React Server Components', author: 'David Park', date: 'Jun 8, 2024', readTime: '7 min', category: 'React' },
    { slug: 'building-design-systems', title: 'Building a Design System from Scratch', author: 'Sarah Johnson', date: 'Jun 5, 2024', readTime: '12 min', category: 'Design' },
    { slug: 'api-design-patterns', title: 'REST API Design Patterns You Should Know', author: 'James Wilson', date: 'Jun 3, 2024', readTime: '9 min', category: 'Backend' },
    { slug: 'state-management-2024', title: 'State Management in 2024: What to Use', author: 'Emily Rodriguez', date: 'Jun 1, 2024', readTime: '11 min', category: 'React' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
          Welcome to <span className="text-primary">{{projectName}}</span>
        </h1>
        <p className="mt-4 text-xl text-text-secondary max-w-2xl mx-auto">
          A <strong>{{variant}}</strong> publication — stories, tutorials, and insights for developers.
        </p>
      </section>

      {/* Featured Post */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <Link href={`/articles/${featuredPost.slug}`} className="block border border-border rounded-theme p-8 bg-card hover:shadow-lg transition group">
          <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-primary text-white mb-4">
            Featured
          </span>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-primary transition">
            {featuredPost.title}
          </h2>
          <p className="mt-3 text-text-secondary text-lg leading-relaxed">
            {featuredPost.excerpt}
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-text-secondary">
            <span className="font-medium text-foreground">{featuredPost.author}</span>
            <span>&middot;</span>
            <span>{featuredPost.date}</span>
            <span>&middot;</span>
            <span>{featuredPost.readTime}</span>
          </div>
        </Link>
      </section>

      {/* Recent Posts */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-foreground mb-8">Recent Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/articles/${post.slug}`}
              className="border border-border rounded-theme p-6 bg-card hover:shadow-md transition group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 text-xs rounded-full bg-bg-secondary text-text-secondary">
                  {post.category}
                </span>
                <span className="text-xs text-text-secondary">{post.readTime}</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition">
                {post.title}
              </h3>
              <div className="mt-4 flex items-center gap-2 text-sm text-text-secondary">
                <span className="font-medium text-foreground">{post.author}</span>
                <span>&middot;</span>
                <span>{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border bg-bg-secondary">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-foreground">Subscribe to our newsletter</h2>
          <p className="mt-2 text-text-secondary">Get the latest articles delivered straight to your inbox.</p>
          <div className="mt-6 flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2 rounded-theme border border-border bg-card text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="px-6 py-2 rounded-theme bg-primary text-white font-medium hover:bg-primary-hover transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
