import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  color: string;
  link: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  color,
  link,
}: ProjectCardProps) {
  return (
    <div className="group border border-border rounded-theme bg-card overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
      {/* Image Placeholder */}
      <div
        className="aspect-video w-full"
        style=\{{ backgroundColor: color }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-white/70 text-sm font-medium">Project Preview</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition">
          {title}
        </h3>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
          {description}
        </p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-bg-secondary text-text-secondary border border-border"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link */}
        <Link
          href={link}
          className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          View Project
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
