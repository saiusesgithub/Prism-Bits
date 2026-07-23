'use client';

type ProjectCardProps = {
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
};

export default function ProjectCard({
  title = 'Nexus Analytics Dashboard',
  description = 'A real-time analytics platform providing comprehensive insights and data visualization for enterprise metrics.',
  thumbnailUrl = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
  technologies = ['React', 'TypeScript', 'Tailwind', 'D3.js'],
  githubUrl = '#',
  liveUrl = '#',
}: ProjectCardProps) {
  return (
    <div className="group flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] shadow-2xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]">
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
        <img
          src={thumbnailUrl}
          alt={title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:rotate-1"
        />
        <div className="absolute bottom-4 left-4 right-4 z-20 flex gap-2">
          {technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-white/20 backdrop-blur-md px-2 py-1 text-[10px] font-semibold tracking-wider text-white uppercase shadow-sm"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 3 && (
            <span className="rounded-md bg-white/20 backdrop-blur-md px-2 py-1 text-[10px] font-semibold text-white shadow-sm">
              +{technologies.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="mb-6 flex-1 text-sm text-white/60 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center gap-3">
          <a
            href={githubUrl}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            Code
          </a>
          <a
            href={liveUrl}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-600/20 border border-cyan-500/30 px-4 py-2.5 text-sm font-medium text-cyan-100 transition hover:bg-cyan-600/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}
