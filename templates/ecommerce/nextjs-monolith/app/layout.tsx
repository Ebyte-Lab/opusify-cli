import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: '{{projectName}} - Store',
  description: 'A {{variant}} e-commerce store built with Opusify CLI.',
};

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Cart', href: '/cart' },
  { label: 'Account', href: '/account' },
];

function Navbar() {
  return (
    <header className="border-b border-border bg-card">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
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

function Sidebar() {
  return (
    <aside className="w-64 border-r border-border bg-card min-h-screen p-6">
      <Link href="/" className="text-xl font-bold text-primary block mb-8">
        {{projectName}}
      </Link>
      <nav>
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
    </aside>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const useSidebar = '{{includeSidebar}}' === 'true';

  return (
    <html lang="en" data-theme="{{design}}">
      <body>
        {useSidebar ? (
          <div className="flex">
            <Sidebar />
            <main className="flex-1">{children}</main>
          </div>
        ) : (
          <>
            <Navbar />
            <main>{children}</main>
          </>
        )}
      </body>
    </html>
  );
}
