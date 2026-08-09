'use client';

import React from 'react';
import MagneticRippleButton from './component';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

export default function MagneticRippleButtonPreview() {
  return (
    <div className="flex min-h-[380px] w-full flex-col items-center justify-center gap-8 rounded-2xl border border-slate-800/60 bg-slate-950 p-8 shadow-2xl">
      <div className="max-w-md space-y-2 text-center">
        <h3 className="text-xl font-bold tracking-tight text-white">
          Magnetic Ripple Button
        </h3>
        <p className="text-sm text-slate-400">
          Hover to feel the smooth magnetic cursor pull and spotlight glow.
          Click anywhere on the button to trigger the dynamic ripple animation.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Primary CTA */}
        <MagneticRippleButton variant="primary" size="lg">
          <Sparkles className="h-5 w-5 text-amber-300" />
          <span>Get Started Now</span>
          <ArrowRight className="h-4 w-4" />
        </MagneticRippleButton>

        {/* Secondary Action */}
        <MagneticRippleButton variant="secondary" size="md">
          <Zap className="h-4 w-4 text-cyan-400" />
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
