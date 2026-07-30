"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue, type HTMLMotionProps } from "framer-motion";

export interface MagneticRippleButtonProps extends HTMLMotionProps<"button"> {
  children?: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  magneticStrength?: number;
  rippleColor?: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function MagneticRippleButton({
  children,
  className = "",
  variant = "primary",
  size = "md",
  magneticStrength = 0.35,
  rippleColor = "rgba(255, 255, 255, 0.4)",
  onClick,
  ...props
}: MagneticRippleButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for magnetic pull physics
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const magneticX = useSpring(rawX, springConfig);
  const magneticY = useSpring(rawY, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const offsetX = (e.clientX - centerX) * magneticStrength;
      const offsetY = (e.clientY - centerY) * magneticStrength;

      rawX.set(offsetX);
      rawY.set(offsetY);

      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [magneticStrength, rawX, rawY]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple: Ripple = {
          id: Date.now(),
          x,
          y,
          size,
        };

        setRipples((prev) => [...prev, newRipple]);

        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);
      }

      if (onClick) {
        onClick(e);
      }
    },
    [onClick]
  );

  // Variant styling
  const variantStyles = {
    primary:
      "bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 border border-violet-500/30",
    secondary:
      "bg-slate-900 text-slate-100 border border-slate-700/80 hover:bg-slate-800 shadow-md shadow-black/40",
    outline:
      "bg-transparent text-indigo-400 border-2 border-indigo-500/60 hover:bg-indigo-500/10 hover:border-indigo-400",
    ghost:
      "bg-transparent text-slate-200 hover:bg-slate-800/60 hover:text-white",
  };

  // Size styling
  const sizeStyles = {
    sm: "px-4 py-2 text-xs font-semibold gap-1.5 rounded-lg",
    md: "px-6 py-3 text-sm font-semibold gap-2 rounded-xl",
    lg: "px-8 py-4 text-base font-semibold gap-2.5 rounded-2xl",
  };

  return (
    <motion.button
      ref={buttonRef}
      style={{ x: magneticX, y: magneticY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center justify-center overflow-hidden cursor-pointer select-none transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {/* Interactive Radial Spotlight Glow */}
      {isHovered && (
        <span
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl transition-opacity duration-300"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            width: "120px",
            height: "120px",
            background:
              variant === "primary"
                ? "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>

      {/* Expanding Ripple Elements */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full animate-ripple"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: `${ripple.size}px`,
            height: `${ripple.size}px`,
            backgroundColor: rippleColor,
            transform: "translate(-50%, -50%) scale(0)",
          }}
        />
      ))}

      {/* Ripple Animation CSS inline scope */}
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.7;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 600ms cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }
      `}</style>
    </motion.button>
  );
}
