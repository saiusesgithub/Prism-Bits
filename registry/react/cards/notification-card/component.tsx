'use client';

type NotificationCardProps = {
  title?: string;
  message?: string;
  timestamp?: string;
  icon?: React.ReactNode;
  isUnread?: boolean;
};

export default function NotificationCard({
  title = 'Security Alert',
  message = 'A new sign-in was detected from an unrecognized device in London, UK.',
  timestamp = '2 hours ago',
  icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-amber-400"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  ),
  isUnread = true,
}: NotificationCardProps) {
  return (
    <div className="relative flex w-full max-w-sm items-start gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 shadow-lg backdrop-blur-sm transition duration-200 hover:bg-white/[0.06]">
      {isUnread && (
        <span className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]"></span>
      )}

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.06] border border-white/5">
        {icon}
      </div>

      <div className="flex flex-col pr-4">
        <h4 className="text-sm font-semibold text-white">{title}</h4>
        <p className="mt-1 text-xs leading-relaxed text-white/60 line-clamp-2">
          {message}
        </p>
        <span className="mt-2 text-[10px] font-medium uppercase tracking-wider text-white/40">
          {timestamp}
        </span>
      </div>
    </div>
  );
}
