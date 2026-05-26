import { Link, Outlet } from 'react-router-dom';
import { navLinks } from '../lib/nav';

function Navbar() {
  return (
    <header className="border-b border-border bg-card">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary">
          {{projectName}}
        </Link>
        <ul className="flex gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link to={link.href} className="text-text-secondary hover:text-foreground transition">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/cart" className="relative text-text-secondary hover:text-foreground transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">3</span>
        </Link>
      </nav>
    </header>
  );
}

function Sidebar() {
  return (
    <aside className="w-64 border-r border-border bg-card min-h-screen p-6">
      <Link to="/" className="text-xl font-bold text-primary block mb-8">
        {{projectName}}
      </Link>
      <nav>
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link to={link.href} className="block px-4 py-2 rounded-theme text-text-secondary hover:bg-bg-secondary hover:text-foreground transition">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default function Layout() {
  const useSidebar = ('{{includeSidebar}}' as string) === 'true';

  if (useSidebar) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
