"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/common/animated-counter";
import { Button } from "@/components/common/button";
import { Container } from "@/components/common/container";
import { GitHubIcon } from "@/components/common/github-icon";
import { GradientBackground } from "@/components/landing/gradient-background";

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type HeroSectionProps = {
  componentCount?: number;
};

export function HeroSection({ componentCount = 18 }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <GradientBackground />
      <Container className="relative flex min-h-screen items-center justify-center pt-36 pb-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-5xl text-center"
        >
          <motion.h1
            variants={rise}
            className="font-display text-balance text-6xl font-normal tracking-normal text-foreground sm:text-7xl lg:text-8xl"
          >
            Prism Bits
          </motion.h1>

          <motion.p
            variants={rise}
            className="mx-auto mt-6 max-w-3xl text-balance text-xl font-medium leading-8 text-foreground/80 sm:text-2xl"
          >
            <Link
              href="/components"
              className="font-script group relative mr-2 inline-block text-6xl leading-[0.72] text-foreground transition-all duration-300 hover:[text-shadow:0_0_24px_hsl(var(--accent-2)/0.6)] sm:text-7xl dark:text-white"
            >
              Elegant
              <svg
                aria-hidden="true"
                className="absolute -bottom-4 left-0 h-7 w-full overflow-visible transition-opacity duration-300 group-hover:opacity-100"
                viewBox="0 0 220 42"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="squiggle-gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="hsl(266 94% 68%)" />
                    <stop offset="50%" stopColor="hsl(330 92% 70%)" />
                    <stop offset="100%" stopColor="hsl(190 94% 66%)" />
                  </linearGradient>
                </defs>
                <path
                  d="M5 20 C42 16 80 13 118 15 C106 22 99 29 112 30 C137 31 166 18 215 17"
                  fill="none"
                  stroke="url(#squiggle-gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            open-source UI bits you can copy, customize, and ship.
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button href="/components" size="lg">
              Browse Components
              <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
            <Button
              href="https://github.com/saiusesgithub/Prism-Bits"
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              size="lg"
            >
              <GitHubIcon className="size-5" />
              Contribute on GitHub
            </Button>
          </motion.div>

          <motion.ul
            variants={rise}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium text-muted"
          >
            <li className="flex items-center gap-2">
              <span className="font-semibold text-foreground">
                <AnimatedCounter value={componentCount} suffix="+" />
              </span>{" "}
              components
            </li>
            <li className="hidden size-1 rounded-full bg-accent sm:block" aria-hidden="true" />
            <li className="flex items-center gap-2">
              React · Vue · Tailwind
            </li>
            <li className="hidden size-1 rounded-full bg-accent sm:block" aria-hidden="true" />
            <li className="flex items-center gap-2">
              <span className="font-semibold text-foreground">
                <AnimatedCounter value={100} suffix="%" />
              </span>{" "}
              Open Source (MIT)
            </li>
          </motion.ul>
        </motion.div>
      </Container>
    </section>
  );
}
