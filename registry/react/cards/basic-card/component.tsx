'use client';

type BasicCardProps = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
};

export default function BasicCard({
  title = 'Project Update',
  description = 'The latest changes have been deployed successfully to the production environment.',
  icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-cyan-400"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  actionText = 'View details',
  onAction,
}: BasicCardProps) {
  return (
    <div className="group block w-full max-w-sm rounded-2xl border border-white/12 bg-white/[0.05] p-6 shadow-2xl shadow-purple-950/20 transition duration-300 hover:border-white/20 hover:bg-white/[0.08]">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.08] border border-white/10 group-hover:bg-white/[0.12] transition-colors">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="mb-6 text-sm leading-relaxed text-white/60">
        {description}
      </p>
      <button
        onClick={onAction}
        className="inline-flex items-center justify-center rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 w-full"
      >
        {actionText}
      </button>
    </div>
  );
}
