import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
