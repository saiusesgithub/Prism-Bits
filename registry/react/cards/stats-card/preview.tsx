"use client";
import StatsCard from "./component";

export default function Preview() {
  return (
    <div className="flex min-h-[400px] w-full flex-col gap-6 items-center justify-center p-10">
      <StatsCard />
      <StatsCard 
        label="Active Users" 
        value="+2,350" 
        trend="up" 
        percentage="+180.1%" 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        }
      />
    </div>
  );
}
