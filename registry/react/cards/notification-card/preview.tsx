"use client";
import NotificationCard from "./component";

export default function Preview() {
  return (
    <div className="flex min-h-[300px] w-full flex-col gap-4 items-center justify-center p-10">
      <NotificationCard />
      <NotificationCard 
        title="Payment Successful" 
        message="Your subscription has been renewed for the next billing cycle." 
        isUnread={false} 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        }
      />
    </div>
  );
}
