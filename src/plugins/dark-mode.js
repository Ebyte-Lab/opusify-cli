export function addDarkMode(cwd, config) {
  const isNextjs = config.architecture === 'nextjs-monolith' || config.architecture === 'nextjs-turborepo';
  const isVite = config.architecture === 'vite-react';

  const files = {};

  if (isNextjs) {
    // Client component for theme toggling
    files['components/ThemeToggle.tsx'] = `'use client';

import { useEffect, useState } from 'react';

const THEMES = ['Minimal Clean', 'Dark Terminal', 'Glassmorphism'] as const;
type Theme = (typeof THEMES)[number];

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('${config.design}');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('opusify-theme') as Theme | null;
    if (saved && THEMES.includes(saved)) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  function handleChange(newTheme: Theme) {
    setTheme(newTheme);
    localStorage.setItem('opusify-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-text-secondary font-medium">Theme:</label>
      <select
        value={theme}
        onChange={(e) => handleChange(e.target.value as Theme)}
        className="px-2 py-1 text-xs rounded-theme border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {THEMES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}
`;

    // Theme provider that hydrates from localStorage
    files['components/ThemeProvider.tsx'] = `'use client';

import { useEffect } from 'react';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const saved = localStorage.getItem('opusify-theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  return <>{children}</>;
}
`;
  } else if (isVite) {
    files['src/components/ThemeToggle.tsx'] = `import { useEffect, useState } from 'react';

const THEMES = ['Minimal Clean', 'Dark Terminal', 'Glassmorphism'] as const;
type Theme = (typeof THEMES)[number];

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('${config.design}');

  useEffect(() => {
    const saved = localStorage.getItem('opusify-theme') as Theme | null;
    if (saved && THEMES.includes(saved)) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  function handleChange(newTheme: Theme) {
    setTheme(newTheme);
    localStorage.setItem('opusify-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-text-secondary font-medium">Theme:</label>
      <select
        value={theme}
        onChange={(e) => handleChange(e.target.value as Theme)}
        className="px-2 py-1 text-xs rounded-theme border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {THEMES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}
`;
  }

  return { files, dependencies: {}, devDependencies: {} };
}
