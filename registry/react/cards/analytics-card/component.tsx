"use client";

type AnalyticsCardProps = {
  title?: string;
  metric?: string;
  growth?: string;
  timeframe?: string;
};

export default function AnalyticsCard({
  title = "Traffic Overview",
  metric = "124.5K",
  growth = "+14.2%",
  timeframe = "vs last 7 days",
}: AnalyticsCardProps) {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/12 bg-white/[0.03] p-6 shadow-2xl transition hover:border-white/20">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-white/60">{title}</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{metric}</span>
            <span className="text-sm font-medium text-emerald-400">{growth}</span>
          </div>
          <p className="mt-1 text-xs text-white/40">{timeframe}</p>
        </div>
        <button className="rounded-md p-1.5 text-white/40 hover:bg-white/10 hover:text-white transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
      
      {/* Decorative Chart Placeholder */}
      <div className="mt-6 flex h-24 items-end gap-1.5 opacity-80">
        {[40, 65, 45, 80, 55, 90, 75, 100, 85, 110, 95, 120].map((height, i) => (
          <div 
            key={i} 
            className={"w-full rounded-t-sm " + (i >= 9 ? 'bg-cyan-400' : 'bg-white/10')} 
            style={{ height: height + "%" }}
          ></div>
        ))}
      </div>
    </div>
  );
}
