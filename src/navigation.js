import fs from 'fs';
import path from 'path';

// Page pools for each template — ordered by priority
const PAGE_POOLS = {
  portfolio: [
    { label: 'Home', href: '/', slug: null },
    { label: 'About', href: '/about', slug: 'about' },
    { label: 'Projects', href: '/projects', slug: 'projects' },
    { label: 'Skills', href: '/skills', slug: 'skills' },
    { label: 'Contact', href: '/contact', slug: 'contact' },
    { label: 'Blog', href: '/blog', slug: 'blog' },
    { label: 'Testimonials', href: '/testimonials', slug: 'testimonials' },
    { label: 'Resume', href: '/resume', slug: 'resume' },
    { label: 'Services', href: '/services', slug: 'services' },
  ],
  ecommerce: [
    { label: 'Home', href: '/', slug: null },
    { label: 'Products', href: '/products', slug: 'products' },
    { label: 'Cart', href: '/cart', slug: 'cart' },
    { label: 'Account', href: '/account', slug: 'account' },
    { label: 'Wishlist', href: '/wishlist', slug: 'wishlist' },
    { label: 'Orders', href: '/orders', slug: 'orders' },
    { label: 'Categories', href: '/categories', slug: 'categories' },
    { label: 'Search', href: '/search', slug: 'search' },
    { label: 'Support', href: '/support', slug: 'support' },
  ],
  school: [
    { label: 'Dashboard', href: '/', slug: null },
    { label: 'Students', href: '/students', slug: 'students' },
    { label: 'Courses', href: '/courses', slug: 'courses' },
    { label: 'Grades', href: '/grades', slug: 'grades' },
    { label: 'Attendance', href: '/attendance', slug: 'attendance' },
    { label: 'Schedule', href: '/schedule', slug: 'schedule' },
    { label: 'Payments', href: '/payments', slug: 'payments' },
    { label: 'Reports', href: '/reports', slug: 'reports' },
    { label: 'Staff', href: '/staff', slug: 'staff' },
  ],
  saas: [
    { label: 'Dashboard', href: '/', slug: null },
    { label: 'Analytics', href: '/analytics', slug: 'analytics' },
    { label: 'Users', href: '/users', slug: 'users' },
    { label: 'Billing', href: '/billing', slug: 'billing' },
    { label: 'Settings', href: '/settings', slug: 'settings' },
    { label: 'Reports', href: '/reports', slug: 'reports' },
    { label: 'Integrations', href: '/integrations', slug: 'integrations' },
    { label: 'Team', href: '/team', slug: 'team' },
    { label: 'Support', href: '/support', slug: 'support' },
  ],
  blog: [
    { label: 'Home', href: '/', slug: null },
    { label: 'Articles', href: '/articles', slug: 'articles' },
    { label: 'Categories', href: '/categories', slug: 'categories' },
    { label: 'Authors', href: '/authors', slug: 'authors' },
    { label: 'Newsletter', href: '/newsletter', slug: 'newsletter' },
    { label: 'About', href: '/about', slug: 'about' },
    { label: 'Tags', href: '/tags', slug: 'tags' },
    { label: 'Archive', href: '/archive', slug: 'archive' },
    { label: 'Contact', href: '/contact', slug: 'contact' },
  ],
};

function generateNavTs(selectedPages) {
  return `export interface NavItem {
  label: string;
  href: string;
}

export const navLinks: NavItem[] = [
${selectedPages.map((p) => `  { label: '${p.label}', href: '${p.href}' },`).join('\n')}
];
`;
}

function generatePageComponent(page, config) {
  return `export default function ${page.label.replace(/\s+/g, '')}Page() {
  return (
    <div className="min-h-screen bg-background p-6 lg:p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-4">${page.label}</h1>
        <p className="text-text-secondary text-lg">
          This is the ${page.label} page for ${config.projectName}.
        </p>
        <div className="mt-8 border border-border rounded-theme p-8 bg-card">
          <p className="text-text-secondary">
            Content for this page will be added here. This placeholder was generated
            by Opusify CLI based on your navigation configuration.
          </p>
        </div>
      </div>
    </div>
  );
}
`;
}

function generateVitePageComponent(page, config) {
  return `export default function ${page.label.replace(/\s+/g, '')}() {
  return (
    <div className="min-h-screen bg-background p-6 lg:p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-4">${page.label}</h1>
        <p className="text-text-secondary text-lg">
          This is the ${page.label} page for ${config.projectName}.
        </p>
        <div className="mt-8 border border-border rounded-theme p-8 bg-card">
          <p className="text-text-secondary">
            Content for this page will be added here. This placeholder was generated
            by Opusify CLI based on your navigation configuration.
          </p>
        </div>
      </div>
    </div>
  );
}
`;
}

// Icon mapping for sidebar nav items (Lucide icon names)
const ICON_MAP = {
  Home: 'Home', Dashboard: 'LayoutDashboard', Products: 'ShoppingBag',
  Cart: 'ShoppingCart', Account: 'User', Wishlist: 'Heart',
  Orders: 'Package', Categories: 'Grid3X3', Search: 'Search',
  Support: 'HelpCircle', Students: 'Users', Courses: 'BookOpen',
  Grades: 'Award', Attendance: 'ClipboardCheck', Schedule: 'Calendar',
  Payments: 'CreditCard', Reports: 'BarChart3', Staff: 'Briefcase',
  Analytics: 'TrendingUp', Users: 'Users', Billing: 'Receipt',
  Settings: 'Settings', Integrations: 'Puzzle', Team: 'UserPlus',
  Articles: 'FileText', Authors: 'Pen', Newsletter: 'Mail',
  About: 'Info', Tags: 'Tag', Archive: 'Archive', Contact: 'MessageSquare',
  Projects: 'FolderKanban', Skills: 'Zap', Blog: 'BookOpen',
  Testimonials: 'Quote', Resume: 'FileUser', Services: 'Wrench',
};

// Templates that support sidebar
const SIDEBAR_TEMPLATES = ['ecommerce', 'school', 'saas', 'blog'];

function generateSidebarComponent(selectedPages, config, isVite) {
  const iconImports = selectedPages
    .map((p) => ICON_MAP[p.label] || 'Circle')
    .filter((v, i, a) => a.indexOf(v) === i); // deduplicate
  // Always include Circle as the fallback icon
  if (!iconImports.includes('Circle')) iconImports.push('Circle');

  const linkComponent = isVite ? 'Link' : 'Link';
  const linkProp = isVite ? 'to' : 'href';
  const linkImport = isVite
    ? "import { Link, useLocation } from 'react-router-dom';"
    : "import Link from 'next/link';";
  const navImport = isVite
    ? "import { navLinks } from '../lib/nav';"
    : "import { navLinks } from '../lib/nav';";

  const activeLogic = isVite
    ? `  const location = useLocation();
  const isActive = (href: string) => location.pathname === href;`
    : `  const isActive = (href: string) => false; // Replace with usePathname() for active state`;

  const iconEntries = selectedPages.map((p) => {
    const icon = ICON_MAP[p.label] || 'Circle';
    return `  '${p.label}': ${icon},`;
  }).join('\n');

  return `'use client';

${linkImport}
import { ${iconImports.join(', ')} } from 'lucide-react';
${navImport}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
${iconEntries}
};

export default function Sidebar() {
${activeLogic}

  return (
    <aside className="w-64 border-r border-border bg-card min-h-screen flex flex-col">
      {/* Brand */}
      <div className="p-6 border-b border-border">
        <${linkComponent} ${linkProp}="/" className="text-xl font-bold text-primary">
          ${config.projectName}
        </${linkComponent}>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navLinks.map((link) => {
            const Icon = iconMap[link.label] || Circle;
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <${linkComponent}
                  ${linkProp}={link.href}
                  className={\`flex items-center gap-3 px-4 py-2.5 rounded-theme text-sm transition \${
                    active
                      ? 'bg-primary text-white font-medium'
                      : 'text-text-secondary hover:bg-bg-secondary hover:text-foreground'
                  }\`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </${linkComponent}>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-medium">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">User</p>
            <p className="text-xs text-text-secondary truncate">user@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
`;
}

export function generateNavigation(projectPath, config) {
  const pool = PAGE_POOLS[config.template];
  if (!pool) return;

  const navCount = Math.min(Math.max(config.navCount || 5, 3), 9);
  const selectedPages = pool.slice(0, navCount);
  const isVite = config.architecture === 'vite-react';

  // 1. Generate lib/nav.ts (or src/lib/nav.ts for Vite)
  const navDir = isVite
    ? path.join(projectPath, 'src', 'lib')
    : path.join(projectPath, 'lib');

  if (!fs.existsSync(navDir)) fs.mkdirSync(navDir, { recursive: true });
  fs.writeFileSync(path.join(navDir, 'nav.ts'), generateNavTs(selectedPages));

  // 2. Generate route/page files for pages that don't already exist
  for (const page of selectedPages) {
    if (!page.slug) continue; // Skip home page — already exists as page.tsx

    if (isVite) {
      const pagePath = path.join(projectPath, 'src', 'pages', `${page.label.replace(/\s+/g, '')}.tsx`);
      if (!fs.existsSync(pagePath)) {
        const dir = path.dirname(pagePath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(pagePath, generateVitePageComponent(page, config));
      }
    } else {
      const routeDir = path.join(projectPath, 'app', page.slug);
      const routeFile = path.join(routeDir, 'page.tsx');
      if (!fs.existsSync(routeFile)) {
        if (!fs.existsSync(routeDir)) fs.mkdirSync(routeDir, { recursive: true });
        fs.writeFileSync(routeFile, generatePageComponent(page, config));
      }
    }
  }

  // 3. Generate Sidebar.tsx if template supports it and user selected sidebar
  if (config.includeSidebar && SIDEBAR_TEMPLATES.includes(config.template)) {
    const sidebarDir = isVite
      ? path.join(projectPath, 'src', 'components')
      : path.join(projectPath, 'components');

    if (!fs.existsSync(sidebarDir)) fs.mkdirSync(sidebarDir, { recursive: true });

    const sidebarPath = path.join(sidebarDir, 'Sidebar.tsx');
    fs.writeFileSync(sidebarPath, generateSidebarComponent(selectedPages, config, isVite));
  }

  return selectedPages;
}
