"use client";

type CourseCardProps = {
  title?: string;
  instructor?: string;
  thumbnailUrl?: string;
  progress?: number;
  totalLessons?: number;
  completedLessons?: number;
  onContinue?: () => void;
};

export default function CourseCard({
  title = "Advanced React Patterns & Performance",
  instructor = "Sarah Drasner",
  thumbnailUrl = "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80",
  progress = 65,
  totalLessons = 24,
  completedLessons = 16,
  onContinue,
}: CourseCardProps) {
  return (
    <div className="group flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] shadow-2xl transition hover:border-white/20">
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-white backdrop-blur-md">
          {progress}% Complete
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-1 text-xs font-medium text-cyan-400">{instructor}</p>
        <h3 className="mb-4 text-lg font-bold leading-tight text-white line-clamp-2">{title}</h3>
        
        <div className="mt-auto">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-white/60">{completedLessons} of {totalLessons} lessons</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-1000 ease-out" 
              style={{ width: progress + "%" }}
            ></div>
          </div>
          
          <button
            onClick={onContinue}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            Continue Learning
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
