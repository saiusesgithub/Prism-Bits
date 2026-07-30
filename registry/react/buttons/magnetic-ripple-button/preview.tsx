"use client";

import React from "react";
import MagneticRippleButton from "./component";
import { Sparkles, ArrowRight, Zap } from "lucide-react";

export default function MagneticRippleButtonPreview() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[380px] w-full p-8 bg-slate-950 rounded-2xl border border-slate-800/60 shadow-2xl gap-8">
      <div className="text-center space-y-2 max-w-md">
        <h3 className="text-xl font-bold text-white tracking-tight">
          Magnetic Ripple Button
        </h3>
        <p className="text-sm text-slate-400">
          Hover to feel the smooth magnetic cursor pull and spotlight glow. Click
          anywhere on the button to trigger the dynamic ripple animation.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Primary CTA */}
        <MagneticRippleButton variant="primary" size="lg">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>Get Started Now</span>
          <ArrowRight className="w-4 h-4" />
        </MagneticRippleButton>

        {/* Secondary Action */}
        <MagneticRippleButton variant="secondary" size="md">
          <Zap className="w-4 h-4 text-cyan-400" />
          <span>Quick Launch</span>
        </MagneticRippleButton>

        {/* Outline Action */}
        <MagneticRippleButton variant="outline" size="md">
          <span>Explore Features</span>
        </MagneticRippleButton>
      </div>
    </div>
  );
}
