{{#if (eq design "Glassmorphism")}}
'use client';

import { AnimatePresence, motion } from 'framer-motion';

export default function AnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial=\{{ opacity: 0, y: 20 }}
        animate=\{{ opacity: 1, y: 0 }}
        exit=\{{ opacity: 0, y: -20 }}
        transition=\{{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
{{else}}
export default function AnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
{{/if}}
