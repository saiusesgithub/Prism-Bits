'use client';

type ProfileCardProps = {
  name?: string;
  role?: string;
  avatarUrl?: string;
  onFollow?: () => void;
  onMessage?: () => void;
};

export default function ProfileCard({
  name = 'Alex Rivera',
  role = 'Senior Frontend Engineer',
  avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&h=128&q=80',
  onFollow,
  onMessage,
}: ProfileCardProps) {
  return (
    <div className="group flex w-full max-w-sm flex-col items-center rounded-2xl border border-white/12 bg-white/[0.05] p-8 shadow-2xl shadow-purple-950/20 transition duration-300 hover:border-white/20 hover:bg-white/[0.08]">
      <div className="relative mb-4">
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-50 blur transition duration-300 group-hover:opacity-100"></div>
        <img
          src={avatarUrl}
          alt={name}
          className="relative h-24 w-24 rounded-full border-2 border-white/10 object-cover"
        />
      </div>
      <h3 className="text-xl font-bold text-white">{name}</h3>
      <p className="mt-1 text-sm font-medium text-cyan-200/70">{role}</p>

      <div className="mt-6 flex w-full gap-3">
        <button
          onClick={onFollow}
          className="flex-1 rounded-lg bg-cyan-500/20 border border-cyan-500/30 px-4 py-2 text-sm font-medium text-cyan-100 transition-colors hover:bg-cyan-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
        >
          Follow
        </button>
        <button
          onClick={onMessage}
          className="flex-1 rounded-lg bg-white/10 border border-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          Message
        </button>
      </div>
    </div>
  );
}
