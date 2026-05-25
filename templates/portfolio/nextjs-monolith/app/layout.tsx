import type { Metadata } from 'next';
import './globals.css';
import AnimationProvider from '../components/AnimationProvider';
{{#if (eq design "Dark Terminal")}}
import { Terminal } from 'lucide-react';
{{/if}}

export const metadata: Metadata = {
  title: '{{projectName}} - Portfolio',
  description: 'A {{variant}} portfolio built with Opusify CLI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="{{design}}">
      <body>
        {{#if (eq design "Dark Terminal")}}
        <header className="border-b border-border bg-card px-6 py-3 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-primary" />
          <span className="font-mono text-sm text-primary">{{projectName}}</span>
        </header>
        {{/if}}
        <AnimationProvider>
          {children}
        </AnimationProvider>
      </body>
    </html>
  );
}
