"use client";

type BlogCardProps = {
  title?: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  authorName?: string;
  authorAvatar?: string;
  date?: string;
  href?: string;
};

export default function BlogCard({
  title = "Designing the Future of Web Interfaces",
  description = "Explore the fundamental shifts in UI design patterns that are shaping the next generation of web applications.",
  imageUrl = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
  category = "Design Trends",
  authorName = "Elena Rodriguez",
  authorAvatar = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&q=80",
  date = "Oct 12, 2026",
  href = "#",
}: BlogCardProps) {
  return (
    <a href={href} className="group flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-white/12 bg-white/[0.03] shadow-2xl transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
          {category}
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-xl font-semibold leading-tight text-white transition group-hover:text-cyan-300">{title}</h3>
        <p className="mb-6 line-clamp-2 text-sm text-white/60">{description}</p>
        
        <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-4">
          <img src={authorAvatar} alt={authorName} className="h-8 w-8 rounded-full object-cover" />
          <div className="flex flex-col">
            <span className="text-xs font-medium text-white/90">{authorName}</span>
            <span className="text-xs text-white/50">{date}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
