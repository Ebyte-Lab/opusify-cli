import { Link, Outlet } from 'react-router-dom';
import { navLinks } from '../lib/nav';

function Navbar() {
  return (
    <header className="border-b border-border bg-card">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary">
          {{projectName}}
        </Link>
        <ul className="flex gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
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
      <Link to="/" className="text-xl font-bold text-primary block mb-8">
        {{projectName}}
      </Link>
      <nav>
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
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
