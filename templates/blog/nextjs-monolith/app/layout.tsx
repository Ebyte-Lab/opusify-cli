import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { navLinks } from '../lib/nav';
import AnimationProvider from '../components/AnimationProvider';
{{#if (eq design "Dark Terminal")}}
import { Terminal } from 'lucide-react';
{{/if}}

export const metadata: Metadata = {
  title: '{{projectName}} - Blog',
  description: 'A {{variant}} blog built with Opusify CLI.',
};

function Navbar() {
  return (
    <header className="border-b border-border bg-card">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary flex items-center gap-2">
          {{#if (eq design "Dark Terminal")}}
          <Terminal className="w-5 h-5" />
          {{/if}}
          {{projectName}}
        </Link>
        <ul className="flex gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-text-secondary hover:text-foreground transition"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <button className="px-4 py-2 rounded-theme bg-primary text-white text-sm font-medium hover:bg-primary-hover transition">
          Subscribe
        </button>
      </nav>
    </header>
  );
}

function Sidebar() {
  return (
    <aside className="w-64 border-r border-border bg-card min-h-screen p-6">
      <Link href="/" className="text-xl font-bold text-primary flex items-center gap-2 mb-8">
        {{#if (eq design "Dark Terminal")}}
        <Terminal className="w-5 h-5" />
        {{/if}}
        {{projectName}}
      </Link>
      <nav className="mb-8">
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block px-4 py-2 rounded-theme text-text-secondary hover:bg-bg-secondary hover:text-foreground transition"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-border pt-6">
        <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {['React', 'Next.js', 'TypeScript', 'CSS', 'Node.js', 'Design'].map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs rounded-theme bg-bg-secondary text-text-secondary">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const useSidebar = ('{{includeSidebar}}' as string) === 'true';

  return (
    <html lang="en" data-theme="{{design}}">
      <body>
        {useSidebar ? (
          <div className="flex">
            <Sidebar />
            <main className="flex-1">
              <AnimationProvider>
                {children}
              </AnimationProvider>
            </main>
          </div>
        ) : (
          <>
            <Navbar />
            <main>
              <AnimationProvider>
                {children}
              </AnimationProvider>
            </main>
          </>
        )}
      </body>
    </html>
  );
}
