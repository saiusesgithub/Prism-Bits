"use client";

type StatsCardProps = {
  label?: string;
  value?: string;
  trend?: "up" | "down" | "neutral";
  percentage?: string;
  icon?: React.ReactNode;
};

export default function StatsCard({
  label = "Total Revenue",
  value = "$45,231.89",
  trend = "up",
  percentage = "+20.1%",
  icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
}: StatsCardProps) {
  const isUp = trend === "up";
  const isDown = trend === "down";
  
  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/12 bg-white/[0.05] p-6 shadow-xl transition duration-200 hover:border-white/20 hover:bg-white/[0.08]">
      <div className="flex items-center justify-between pb-2">
        <p className="text-sm font-medium tracking-wide text-white/60 uppercase">{label}</p>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.08]">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <h2 className="text-3xl font-bold text-white">{value}</h2>
      </div>
      <div className="mt-3 flex items-center text-sm">
        <span className={"inline-flex items-center font-medium " + (isUp ? 'text-emerald-400' : isDown ? 'text-rose-400' : 'text-white/60')}>
          {isUp && (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
          )}
          {isDown && (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
              <polyline points="16 17 22 17 22 11" />
            </svg>
          )}
          {percentage}
        </span>
        <span className="ml-2 text-white/40">from last month</span>
      </div>
    </div>
  );
}
