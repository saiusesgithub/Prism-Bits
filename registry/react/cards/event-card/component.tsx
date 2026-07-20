"use client";

type EventCardProps = {
  title?: string;

  month?: string;
  day?: string;
  time?: string;
  location?: string;
  onRegister?: () => void;
};

export default function EventCard({
  title = "Prism Bits Developer Conference 2026",

  month = "Oct",
  day = "24",
  time = "9:00 AM - 5:00 PM PST",
  location = "Moscone Center, San Francisco",
  onRegister,
}: EventCardProps) {
  return (
    <div className="group flex w-full max-w-md flex-row items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.05] p-4 shadow-xl transition duration-300 hover:border-white/20 hover:bg-white/[0.08]">
      <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] p-3 min-w-[72px]">
        <span className="text-xs font-bold uppercase text-cyan-400">{month}</span>
        <span className="text-2xl font-black text-white">{day}</span>
      </div>
      
      <div className="flex flex-1 flex-col">
        <h3 className="text-base font-semibold text-white line-clamp-1">{title}</h3>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-white/60">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {time}
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-white/60 line-clamp-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {location}
        </div>
      </div>
      
      <button
        onClick={onRegister}
        className="hidden sm:inline-flex items-center justify-center rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        RSVP
      </button>
    </div>
  );
}
