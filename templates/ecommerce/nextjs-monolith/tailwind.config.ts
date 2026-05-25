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
    },
  },
  plugins: [],
};

export default config;
