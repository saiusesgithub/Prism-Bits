"use client";

type RegistryCardProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  tags?: string[];
  href?: string;
};

export default function RegistryCard({
  eyebrow = "Buttons",
  title = "Glass CTA",
  description = "A polished call-to-action pair for dark landing pages.",
  tags = ["react", "beginner"],
  href = "#",
}: RegistryCardProps) {
  return (
    <a
      href={href}
      className="group block w-full max-w-72 rounded-2xl border border-white/12 bg-white/[0.05] p-5 shadow-2xl shadow-purple-950/20 transition duration-200 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
    >
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-cyan-200/70">{eyebrow}</p>
      <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/55">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full bg-white/[0.07] px-2.5 py-1 text-xs text-white/60">
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-5 text-sm font-medium text-white/70 transition group-hover:text-white">
        View component <span aria-hidden="true">→</span>
      </p>
    </a>
  );
}
