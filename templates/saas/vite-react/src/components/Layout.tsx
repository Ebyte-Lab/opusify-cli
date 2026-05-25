import { Link, Outlet } from 'react-router-dom';

const navLinks = [
  { label: 'Dashboard', href: '/' },
  { label: 'Analytics', href: '/analytics' },
  { label: 'Users', href: '/users' },
  { label: 'Billing', href: '/billing' },
  { label: 'Settings', href: '/settings' },
];

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
              <Link
                to={link.href}
                className="text-text-secondary hover:text-foreground transition"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium">
          A
        </div>
      </nav>
    </header>
  );
}

function Sidebar() {
  return (
    <aside className="w-64 border-r border-border bg-card min-h-screen p-6 flex flex-col justify-between">
      <div>
        <Link to="/" className="text-xl font-bold text-primary block mb-8">
          {{projectName}}
        </Link>
        <nav>
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="block px-4 py-2.5 rounded-theme text-text-secondary hover:bg-bg-secondary hover:text-foreground transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-border pt-4">
        <div className="flex items-center gap-3 px-4">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium">
            A
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Admin User</p>
            <p className="text-xs text-text-secondary">admin@company.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function Layout() {
  const useSidebar = '{{includeSidebar}}' === 'true';

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
