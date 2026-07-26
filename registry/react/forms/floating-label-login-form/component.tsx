"use client";

import { useState, type FormEvent, type ChangeEvent, useId } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type FloatingLabelLoginFormProps = {
  onSubmit?: (data: { email: string; password: string }) => Promise<void> | void;
  loading?: boolean;
  emailLabel?: string;
  passwordLabel?: string;
  buttonText?: string;
  className?: string;
  showValidation?: boolean;
};

export default function FloatingLabelLoginForm({
  onSubmit,
  loading = false,
  emailLabel = "Email address",
  passwordLabel = "Password",
  buttonText = "Sign in",
  className,
  showValidation = true,
}: FloatingLabelLoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<"email" | "password" | null>(null);
  
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const emailId = useId();
  const passwordId = useId();

  const validate = () => {
    if (!showValidation) return true;
    
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validate() && onSubmit) {
      await onSubmit({ email, password });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("w-full max-w-sm flex flex-col gap-5", className)}
      noValidate
    >
      <div className="relative">
        <input
          id={emailId}
          type="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField(null)}
          className={cn(
            "peer w-full rounded-2xl border border-white/15 bg-white/5 px-4 pb-2 pt-6 text-sm text-white backdrop-blur transition duration-200",
            "hover:bg-white/10 hover:border-white/30",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:bg-white/10",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            errors.email && "border-red-400/50 focus-visible:ring-red-400/70 hover:border-red-400/50"
          )}
          disabled={loading}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${emailId}-error` : undefined}
        />
        <label
          htmlFor={emailId}
          className={cn(
            "absolute left-4 top-4 z-10 origin-[0] -translate-y-2.5 scale-[0.85] transform text-white/50 transition-all duration-200 pointer-events-none",
            "peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100",
            "peer-focus:-translate-y-2.5 peer-focus:scale-[0.85] peer-focus:text-white/70",
            (email || focusedField === "email") && "-translate-y-2.5 scale-[0.85]"
          )}
        >
          {emailLabel}
        </label>
        {errors.email && (
          <p id={`${emailId}-error`} className="mt-1.5 px-2 text-xs text-red-400/90" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div className="relative">
        <input
          id={passwordId}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          onFocus={() => setFocusedField("password")}
          onBlur={() => setFocusedField(null)}
          className={cn(
            "peer w-full rounded-2xl border border-white/15 bg-white/5 pl-4 pr-11 pb-2 pt-6 text-sm text-white backdrop-blur transition duration-200",
            "hover:bg-white/10 hover:border-white/30",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:bg-white/10",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            errors.password && "border-red-400/50 focus-visible:ring-red-400/70 hover:border-red-400/50"
          )}
          disabled={loading}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? `${passwordId}-error` : undefined}
        />
        <label
          htmlFor={passwordId}
          className={cn(
            "absolute left-4 top-4 z-10 origin-[0] -translate-y-2.5 scale-[0.85] transform text-white/50 transition-all duration-200 pointer-events-none",
            "peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100",
            "peer-focus:-translate-y-2.5 peer-focus:scale-[0.85] peer-focus:text-white/70",
            (password || focusedField === "password") && "-translate-y-2.5 scale-[0.85]"
          )}
        >
          {passwordLabel}
        </label>
        
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-[14px] z-20 text-white/40 transition-colors hover:text-white/80 focus-visible:outline-none focus-visible:text-white/80 rounded"
          aria-label={showPassword ? "Hide password" : "Show password"}
          disabled={loading}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>

        {errors.password && (
          <p id={`${passwordId}-error`} className="mt-1.5 px-2 text-xs text-red-400/90" role="alert">
            {errors.password}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={cn(
          "group relative mt-2 inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-white px-6 text-sm font-bold text-zinc-950 shadow-[0_14px_36px_rgb(0_0_0/0.35)] transition duration-200",
          "hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgb(0_0_0/0.45)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          "active:translate-y-0",
          "disabled:opacity-70 disabled:pointer-events-none"
        )}
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : null}
        {buttonText}
      </button>
    </form>
  );
}
