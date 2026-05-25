export function addAuth(cwd, config) {
  const isNextjs = config.architecture === 'nextjs-monolith' || config.architecture === 'nextjs-turborepo';

  if (!isNextjs) {
    console.log('  ⚠️  Auth plugin currently supports Next.js projects only.');
    console.log('     For Vite projects, consider using a custom auth solution.');
    return { files: {}, dependencies: {}, devDependencies: {} };
  }

  const files = {};

  // lib/auth.ts — NextAuth configuration
  files['lib/auth.ts'] = `import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // TODO: Replace with your actual authentication logic
        // This is a placeholder — connect to your database here
        if (credentials?.email === 'admin@example.com' && credentials?.password === 'password') {
          return { id: '1', name: 'Admin', email: 'admin@example.com' };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
`;

  // app/api/auth/[...nextauth]/route.ts — API route handler
  files['app/api/auth/[...nextauth]/route.ts'] = `import { handlers } from '@/lib/auth';

export const { GET, POST } = handlers;
`;

  // app/login/page.tsx — Login page
  files['app/login/page.tsx'] = `'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/callback/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError('Invalid email or password');
      } else {
        window.location.href = '/';
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md border border-border rounded-theme p-8 bg-card">
        <h1 className="text-2xl font-bold text-foreground text-center mb-2">
          Sign in to ${config.projectName}
        </h1>
        <p className="text-text-secondary text-center mb-8">
          Enter your credentials to access your account
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-theme bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-theme border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-theme border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-theme bg-primary text-white font-medium hover:bg-primary-hover transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-text-secondary">
          Demo credentials: admin@example.com / password
        </p>
      </div>
    </div>
  );
}
`;

  // middleware.ts — Route protection
  files['middleware.ts'] = `import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnLoginPage = req.nextUrl.pathname === '/login';

  if (!isLoggedIn && !isOnLoginPage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (isLoggedIn && isOnLoginPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
`;

  const dependencies = {
    'next-auth': '^5.0.0-beta.19',
  };

  return { files, dependencies, devDependencies: {} };
}
