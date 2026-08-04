"use client";

import { useState, useRef, MouseEvent } from "react";

type GlowingBorderCardProps = {
  title?: string;
  subtitle?: string;
  badge?: string;
  description?: string;
  primaryActionText?: string;
  onPrimaryAction?: () => void;
};

export default function GlowingBorderCard({
  title = "Neural Synthesizer",
  subtitle = "AI Engine v4.2",
  badge = "Pro Feature",
  description = "Generate real-time adaptive UI components with zero latency and high visual dynamic range.",
  primaryActionText = "Explore Model",
  onPrimaryAction,
}: GlowingBorderCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full max-w-sm overflow-hidden rounded-2xl bg-zinc-950 p-[1px] shadow-2xl transition-all duration-300 hover:shadow-cyan-500/10 focus-within:ring-2 focus-within:ring-cyan-500 focus-within:outline-none"
    >
      {/* Animated Glowing Border Gradient */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-30 blur-md transition duration-500 group-hover:opacity-75 group-hover:blur-lg" />

      {/* Interactive Cursor Spotlight overlay */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px z-10 rounded-2xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 189, 248, 0.15), transparent 80%)`,
          }}
        />
      )}

      {/* Card Inner Content Container */}
      <div className="relative z-20 flex h-full w-full flex-col justify-between rounded-[15px] bg-zinc-900/90 p-6 backdrop-blur-xl transition duration-300 group-hover:bg-zinc-900/80">
        <div>
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              {badge}
            </span>
            <span className="text-xs font-medium text-zinc-400">{subtitle}</span>
          </div>

          {/* Title & Description */}
          <div className="mt-4">
            <h3 className="text-xl font-bold tracking-tight text-white transition duration-200 group-hover:text-cyan-200">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {description}
            </p>
          </div>
        </div>

        {/* Action Button & Footer */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-zinc-800/80">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="h-7 w-7 rounded-full border border-zinc-900 bg-cyan-600 flex items-center justify-center text-[10px] font-bold text-white">AI</div>
              <div className="h-7 w-7 rounded-full border border-zinc-900 bg-purple-600 flex items-center justify-center text-[10px] font-bold text-white">UI</div>
            </div>
            <span className="text-xs text-zinc-400 font-medium">+1.2k users</span>
          </div>

          <button
            onClick={onPrimaryAction}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-xs font-medium text-cyan-300 transition duration-200 hover:bg-cyan-500/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            {primaryActionText}
            <svg
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
