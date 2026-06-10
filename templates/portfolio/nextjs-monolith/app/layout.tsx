import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { navLinks } from '../lib/nav';
import AnimationProvider from '../components/AnimationProvider';
{{#if (eq design "Dark Terminal")}}
import { Terminal } from 'lucide-react';
{{/if}}

export const metadata: Metadata = {
  title: '{{projectName}} - Portfolio',
  description: 'A {{variant}} portfolio built with Opusify CLI.',
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
      </nav>
    </header>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="{{design}}">
      <body>
        <Navbar />
        <AnimationProvider>
          {children}
        </AnimationProvider>
      </body>
    </html>
  );
}
