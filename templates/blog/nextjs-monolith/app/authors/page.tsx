import Link from 'next/link';

export default function AuthorsPage() {
  const authors = [
    { slug: 'jane-smith', name: 'Jane Smith', role: 'Senior Frontend Engineer', articles: 12, bio: 'Passionate about React, accessibility, and building great developer experiences.' },
    { slug: 'alex-chen', name: 'Alex Chen', role: 'Design Engineer', articles: 9, bio: 'Bridging the gap between design and engineering with CSS and design systems.' },
    { slug: 'maria-garcia', name: 'Maria Garcia', role: 'TypeScript Advocate', articles: 8, bio: 'Making TypeScript approachable for developers of all skill levels.' },
    { slug: 'david-park', name: 'David Park', role: 'Full-Stack Developer', articles: 7, bio: 'Building scalable applications with Next.js and modern backend technologies.' },
    { slug: 'sarah-johnson', name: 'Sarah Johnson', role: 'UI/UX Designer', articles: 6, bio: 'Creating beautiful, functional interfaces that users love.' },
    { slug: 'james-wilson', name: 'James Wilson', role: 'Backend Architect', articles: 5, bio: 'Designing robust APIs and distributed systems at scale.' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Authors</h1>
          <p className="mt-2 text-text-secondary">Meet the people behind the articles</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <Link
              key={author.slug}
              href={`/authors/${author.slug}`}
              className="border border-border rounded-theme p-6 bg-card hover:shadow-md transition group text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary mx-auto flex items-center justify-center text-white text-xl font-bold mb-4">
                {author.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition">
                {author.name}
              </h2>
              <p className="text-sm text-primary mt-1">{author.role}</p>
              <p className="text-sm text-text-secondary mt-3 leading-relaxed">{author.bio}</p>
              <p className="text-xs text-text-secondary mt-4">{author.articles} articles published</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
