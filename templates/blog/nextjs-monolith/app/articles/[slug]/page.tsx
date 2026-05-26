import Link from 'next/link';
import TableOfContents from '../../../components/TableOfContents';
import AuthorCard from '../../../components/AuthorCard';
import ShareButtons from '../../../components/ShareButtons';

interface ArticlePageProps {
  params: { slug: string };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const title = params.slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const headings = [
    { id: 'getting-started', text: 'Getting Started', level: 2 },
    { id: 'key-concepts', text: 'Key Concepts', level: 2 },
    { id: 'implementation', text: 'Implementation', level: 2 },
    { id: 'best-practices', text: 'Best Practices', level: 2 },
    { id: 'conclusion', text: 'Conclusion', level: 2 },
  ];

  const relatedArticles = [
    {
      slug: 'tailwind-css-best-practices',
      title: 'Tailwind CSS Best Practices for Large Projects',
      excerpt: 'Discover patterns and strategies for maintaining clean Tailwind CSS in enterprise applications.',
      author: 'Alex Chen',
      date: 'Jun 12, 2024',
      category: 'CSS',
    },
    {
      slug: 'typescript-generics-explained',
      title: 'TypeScript Generics Explained Simply',
      excerpt: 'A practical guide to understanding and using TypeScript generics in your everyday code.',
      author: 'Maria Garcia',
      date: 'Jun 10, 2024',
      category: 'TypeScript',
    },
    {
      slug: 'react-server-components',
      title: 'Understanding React Server Components',
      excerpt: 'Deep dive into how React Server Components work and when to use them.',
      author: 'David Park',
      date: 'Jun 8, 2024',
      category: 'React',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex gap-12">
          {/* Main Content */}
          <article className="flex-1 min-w-0 max-w-3xl">
            {/* Article Header */}
            <header className="mb-10">
              <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-primary text-white mb-4">
                Tutorial
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                {title}
              </h1>
              <div className="mt-4 flex items-center gap-4 text-sm text-text-secondary">
                <span className="font-medium text-foreground">Jane Smith</span>
                <span>&middot;</span>
                <span>Jun 15, 2024</span>
                <span>&middot;</span>
                <span>8 min read</span>
              </div>
              {/* Featured Image Placeholder */}
              <div className="mt-8 w-full aspect-video rounded-theme bg-gradient-to-br from-primary/20 to-primary/5 border border-border flex items-center justify-center">
                <span className="text-text-secondary text-sm">Featured Image</span>
              </div>
            </header>

            {/* Article Body */}
            <div className="article-content">
              <p className="text-foreground leading-relaxed mb-6">
                Building modern web applications requires a solid understanding of the tools and
                frameworks available today. In this comprehensive guide, we will explore the key
                concepts, patterns, and best practices that will help you build production-ready
                applications with confidence.
              </p>

              <h2
                id="getting-started"
                className="text-2xl font-bold text-foreground mt-12 mb-4"
              >
                Getting Started
              </h2>
              <p className="text-foreground leading-relaxed mb-6">
                Before diving into the implementation details, let&apos;s set up our development
                environment and understand the project structure. The foundation of any great
                application starts with a well-organized codebase and clear conventions that
                your team can follow consistently.
              </p>
              <p className="text-foreground leading-relaxed mb-6">
                We&apos;ll be using Next.js 14 with the App Router, which provides a powerful
                file-system based routing mechanism, built-in optimizations, and first-class
                support for React Server Components. This combination gives us the best of both
                worlds: excellent developer experience and outstanding performance.
              </p>

              {/* Code Block */}
              <pre className="bg-bg-secondary border border-border rounded-theme p-4 overflow-x-auto mb-6 font-mono text-sm">
                <code className="text-foreground">{`// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'My Application',
  description: 'Built with Next.js 14',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`}</code>
              </pre>

              <h2
                id="key-concepts"
                className="text-2xl font-bold text-foreground mt-12 mb-4"
              >
                Key Concepts
              </h2>
              <p className="text-foreground leading-relaxed mb-6">
                Understanding the core concepts is essential before moving to implementation.
                These principles will guide your architectural decisions and help you write
                maintainable, scalable code that stands the test of time.
              </p>
              <ul className="space-y-2 mb-6 ml-6 list-disc">
                <li className="text-foreground leading-relaxed">
                  <strong>Server Components</strong> — Render on the server by default, reducing
                  client-side JavaScript and improving initial page load performance.
                </li>
                <li className="text-foreground leading-relaxed">
                  <strong>Streaming</strong> — Progressively render UI from the server, showing
                  content as it becomes available without blocking the entire page.
                </li>
                <li className="text-foreground leading-relaxed">
                  <strong>Data Fetching</strong> — Fetch data directly in components using async/await,
                  with automatic request deduplication and caching built in.
                </li>
                <li className="text-foreground leading-relaxed">
                  <strong>Route Handlers</strong> — Build API endpoints using the Web Request and
                  Response APIs with full TypeScript support.
                </li>
              </ul>

              <blockquote className="border-l-4 border-primary pl-4 italic text-text-secondary my-6">
                &ldquo;The best code is the code that doesn&apos;t need to exist on the client.
                Server Components let us move complexity to where it belongs — the server.&rdquo;
                <span className="block mt-2 text-sm not-italic text-text-secondary">
                  — React Core Team
                </span>
              </blockquote>

              <h2
                id="implementation"
                className="text-2xl font-bold text-foreground mt-12 mb-4"
              >
                Implementation
              </h2>
              <p className="text-foreground leading-relaxed mb-6">
                Now that we understand the fundamentals, let&apos;s build a real component that
                demonstrates these concepts in action. We&apos;ll create a data-fetching component
                that leverages Server Components for optimal performance while maintaining a
                clean, reusable API.
              </p>

              {/* Code Block */}
              <pre className="bg-bg-secondary border border-border rounded-theme p-4 overflow-x-auto mb-6 font-mono text-sm">
                <code className="text-foreground">{`// components/ArticleList.tsx
interface Article {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
}

async function getArticles(): Promise<Article[]> {
  const res = await fetch('https://api.example.com/articles', {
    next: { revalidate: 3600 },
  });
  return res.json();
}

export default async function ArticleList() {
  const articles = await getArticles();

  return (
    <section className="grid gap-6">
      {articles.map((article) => (
        <article key={article.id} className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold">{article.title}</h3>
          <p className="mt-2 text-gray-600">{article.excerpt}</p>
          <time className="mt-4 text-sm text-gray-400">
            {article.publishedAt}
          </time>
        </article>
      ))}
    </section>
  );
}`}</code>
              </pre>

              <h2
                id="best-practices"
                className="text-2xl font-bold text-foreground mt-12 mb-4"
              >
                Best Practices
              </h2>
              <ol className="space-y-2 mb-6 ml-6 list-decimal">
                <li className="text-foreground leading-relaxed">
                  <strong>Keep components focused</strong> — Each component should have a single
                  responsibility. Split large components into smaller, composable pieces.
                </li>
                <li className="text-foreground leading-relaxed">
                  <strong>Use TypeScript strictly</strong> — Enable strict mode and define proper
                  interfaces for all props, API responses, and shared types.
                </li>
                <li className="text-foreground leading-relaxed">
                  <strong>Optimize data fetching</strong> — Colocate data fetching with the
                  components that need it, and use proper caching strategies.
                </li>
                <li className="text-foreground leading-relaxed">
                  <strong>Handle errors gracefully</strong> — Implement error boundaries and
                  loading states to provide a smooth user experience.
                </li>
                <li className="text-foreground leading-relaxed">
                  <strong>Write tests early</strong> — Test critical paths and edge cases from
                  the start. Use integration tests for data flows and unit tests for utilities.
                </li>
              </ol>

              <h2
                id="conclusion"
                className="text-2xl font-bold text-foreground mt-12 mb-4"
              >
                Conclusion
              </h2>
              <p className="text-foreground leading-relaxed mb-6">
                Building modern web applications is an evolving discipline, but the fundamentals
                remain constant: write clean code, think about your users, and leverage the
                platform. With the tools and patterns we&apos;ve covered in this guide, you&apos;re
                well-equipped to build applications that are fast, accessible, and maintainable.
                Keep experimenting, keep learning, and most importantly — keep shipping.
              </p>
            </div>

            {/* Share Buttons */}
            <ShareButtons title={title} slug={params.slug} />

            {/* Author Card */}
            <AuthorCard
              name="Jane Smith"
              role="Senior Frontend Engineer"
              bio="Passionate about React, accessibility, and building great developer experiences. Writing about web development since 2019."
              avatar="JS"
            />

            {/* Related Articles */}
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    className="border border-border rounded-theme p-5 bg-card hover:shadow-md transition group"
                  >
                    <span className="inline-flex px-2 py-1 text-xs rounded-full bg-bg-secondary text-text-secondary mb-3">
                      {article.category}
                    </span>
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-secondary line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-text-secondary">
                      <span className="font-medium text-foreground">{article.author}</span>
                      <span>&middot;</span>
                      <span>{article.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </article>

          {/* Table of Contents Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </div>
    </div>
  );
}
