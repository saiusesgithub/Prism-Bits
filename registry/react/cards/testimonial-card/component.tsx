"use client";

type TestimonialCardProps = {
  name?: string;
  role?: string;
  company?: string;
  avatarUrl?: string;
  rating?: number;
  review?: string;
};

export default function TestimonialCard({
  name = "Sarah Jenkins",
  role = "CTO",
  company = "TechNova",
  avatarUrl = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=128&q=80",
  rating = 5,
  review = "This component library completely transformed our workflow. The attention to detail in the dark mode aesthetics and the seamless copy-paste experience saved us weeks of development time. Highly recommended for any serious team.",
}: TestimonialCardProps) {
  return (
    <div className="group relative w-full max-w-sm rounded-2xl border border-white/12 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 shadow-2xl transition duration-300 hover:border-white/20">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="absolute right-6 top-6 text-white/5">
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
      </svg>
      
      <div className="mb-6 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={i < Math.floor(rating) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={i < Math.floor(rating) ? "text-yellow-400" : "text-white/20"}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
      
      <p className="mb-8 text-base leading-relaxed text-white/80 italic">&quot;{review}&quot;</p>
      
      <div className="flex items-center gap-4">
        <img src={avatarUrl} alt={name} className="h-12 w-12 rounded-full border border-white/10 object-cover" />
        <div>
          <h4 className="font-semibold text-white">{name}</h4>
          <p className="text-xs text-white/50">{role}, {company}</p>
        </div>
      </div>
    </div>
  );
}
