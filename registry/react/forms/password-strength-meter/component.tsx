"use client";

import { useId, useState, type ChangeEvent } from "react";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type PasswordChecks = {
  length: boolean;
  lowercase: boolean;
  uppercase: boolean;
  number: boolean;
  symbol: boolean;
};

export type PasswordStrength = {
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
  percent: number;
  checks: PasswordChecks;
};

const LABELS = ["Very weak", "Weak", "Fair", "Strong", "Very strong"] as const;

/**
 * Pure, dependency-free password strength scorer.
 *
 * Runs five independent requirement checks, then maps the number that pass to
 * a 0–4 score (each of the four visible strength levels needs one more passing
 * check than the last). `percent` is always `score * 25`, so the bar width and
 * the score never disagree.
 */
export function evaluatePasswordStrength(password: string): PasswordStrength {
  const checks: PasswordChecks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };

  if (password.length === 0) {
    return { score: 0, label: LABELS[0], percent: 0, checks };
  }

  const passed = Object.values(checks).filter(Boolean).length;
  const score = Math.min(Math.max(passed - 1, 0), 4) as PasswordStrength["score"];

  return { score, label: LABELS[score], percent: score * 25, checks };
}

const REQUIREMENTS: { key: keyof PasswordChecks; text: string }[] = [
  { key: "length", text: "At least 8 characters" },
  { key: "lowercase", text: "A lowercase letter" },
  { key: "uppercase", text: "An uppercase letter" },
  { key: "number", text: "A number" },
  { key: "symbol", text: "A symbol" },
];

const SEGMENT_COLORS = [
  "bg-red-400",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-lime-400",
  "bg-emerald-400",
] as const;

export type PasswordStrengthMeterProps = {
  label?: string;
  className?: string;
};

export default function PasswordStrengthMeter({
  label = "Password",
  className,
}: PasswordStrengthMeterProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const inputId = useId();

  const { score, label: strengthLabel, checks } = evaluatePasswordStrength(password);
  const hasValue = password.length > 0;

  return (
    <div className={cn("w-full max-w-sm flex flex-col gap-4", className)}>
      <div className="relative">
        <input
          id={inputId}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          placeholder={label}
          className={cn(
            "w-full rounded-2xl border border-white/15 bg-white/5 py-3 pl-4 pr-11 text-sm text-white backdrop-blur transition duration-200 placeholder:text-white/40",
            "hover:bg-white/10 hover:border-white/30",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:bg-white/10"
          )}
          aria-describedby={`${inputId}-strength`}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 text-white/40 transition-colors hover:text-white/80 focus-visible:outline-none focus-visible:text-white/80 rounded"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <div className="flex flex-col gap-2" id={`${inputId}-strength`} aria-live="polite">
        <div className="flex gap-1.5" role="presentation">
          {[0, 1, 2, 3].map((segment) => (
            <div
              key={segment}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors duration-300",
                hasValue && segment < score ? SEGMENT_COLORS[score] : "bg-white/10"
              )}
            />
          ))}
        </div>
        {hasValue && (
          <p className="text-xs font-medium text-white/70">
            Strength: <span className="text-white/90">{strengthLabel}</span>
          </p>
        )}
      </div>

      <ul className="flex flex-col gap-1.5">
        {REQUIREMENTS.map(({ key, text }) => {
          const met = checks[key];
          return (
            <li
              key={key}
              className={cn(
                "flex items-center gap-2 text-xs transition-colors",
                met ? "text-emerald-400/90" : "text-white/45"
              )}
            >
              {met ? <Check size={14} /> : <X size={14} />}
              {text}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
