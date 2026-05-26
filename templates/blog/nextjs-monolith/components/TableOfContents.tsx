interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  return (
    <nav className="sticky top-6 hidden lg:block">
      <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
        On This Page
      </h4>
      <ul className="space-y-2 border-l border-border pl-4">
        {headings.map((heading, index) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`block text-sm transition-colors scroll-smooth ${
                heading.level === 3 ? 'pl-4' : ''
              } ${
                index === 0
                  ? 'text-primary font-medium'
                  : 'text-text-secondary hover:text-foreground'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
