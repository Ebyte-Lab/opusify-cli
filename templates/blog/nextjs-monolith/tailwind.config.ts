import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-color)',
        'bg-secondary': 'var(--bg-secondary)',
        foreground: 'var(--text-color)',
        'text-secondary': 'var(--text-secondary)',
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        border: 'var(--border-color)',
        card: 'var(--card-bg)',
      },
      borderRadius: {
        theme: 'var(--radius)',
      },
      fontFamily: {
        theme: 'var(--font-family)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--text-color)',
            a: { color: 'var(--primary)' },
            h1: { color: 'var(--text-color)' },
            h2: { color: 'var(--text-color)' },
            h3: { color: 'var(--text-color)' },
            strong: { color: 'var(--text-color)' },
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
