export function addAnalytics(cwd, config) {
  const isNextjs = config.architecture === 'nextjs-monolith' || config.architecture === 'nextjs-turborepo';
  const isVite = config.architecture === 'vite-react';

  const files = {};
  const dependencies = {};

  if (isNextjs) {
    // Vercel Analytics component
    files['components/Analytics.tsx'] = `'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function AnalyticsProvider() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
`;

    // Instructions file
    files['ANALYTICS.md'] = `# Analytics Setup

Vercel Analytics and Speed Insights have been added to your project.

## Usage

Import the \`AnalyticsProvider\` component in your root layout:

\`\`\`tsx
// app/layout.tsx
import AnalyticsProvider from '@/components/Analytics';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <AnalyticsProvider />
      </body>
    </html>
  );
}
\`\`\`

## Deployment

Analytics data will automatically appear in your Vercel dashboard once deployed.
For local development, analytics events are logged to the console.

## Alternative: Plausible Analytics

If you prefer Plausible (privacy-focused, self-hostable), replace the Analytics component with:

\`\`\`tsx
// components/Analytics.tsx
import Script from 'next/script';

export default function AnalyticsProvider() {
  return (
    <Script
      defer
      data-domain="yourdomain.com"
      src="https://plausible.io/js/script.js"
    />
  );
}
\`\`\`
`;

    dependencies['@vercel/analytics'] = '^1.3.1';
    dependencies['@vercel/speed-insights'] = '^1.0.12';

  } else if (isVite) {
    // For Vite, use a simple Plausible/GA script approach
    files['src/components/Analytics.tsx'] = `import { useEffect } from 'react';

/**
 * Analytics component for Vite SPA.
 * Replace the placeholder domain with your actual domain.
 *
 * For Plausible: Set VITE_PLAUSIBLE_DOMAIN in your .env
 * For Google Analytics: Set VITE_GA_ID in your .env
 */
export default function Analytics() {
  useEffect(() => {
    // Track page views on route change
    const trackPageView = () => {
      if (typeof window !== 'undefined' && (window as any).plausible) {
        (window as any).plausible('pageview');
      }
    };

    trackPageView();
    window.addEventListener('popstate', trackPageView);
    return () => window.removeEventListener('popstate', trackPageView);
  }, []);

  return null;
}
`;

    files['ANALYTICS.md'] = `# Analytics Setup

A lightweight analytics component has been added to your Vite project.

## Option 1: Plausible Analytics

Add this script tag to your \`index.html\` \`<head>\`:

\`\`\`html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
\`\`\`

## Option 2: Google Analytics

Add your GA4 measurement ID to \`.env\`:

\`\`\`
VITE_GA_ID=G-XXXXXXXXXX
\`\`\`

Then add the GA script to \`index.html\`:

\`\`\`html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
\`\`\`

## Usage

Import the Analytics component in your App.tsx:

\`\`\`tsx
import Analytics from './components/Analytics';

function App() {
  return (
    <>
      <Analytics />
      {/* rest of your app */}
    </>
  );
}
\`\`\`
`;
  }

  return { files, dependencies, devDependencies: {} };
}
