"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/common/button";
import { Container } from "@/components/common/container";
import { GitHubIcon } from "@/components/common/github-icon";
import { GradientBackground } from "@/components/landing/gradient-background";
import { SectionBadge } from "@/components/common/section-badge";

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const rise = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type HeroSectionProps = {
  componentCount?: number;
};

export function HeroSection({ componentCount }: HeroSectionProps) {
  const stats = [
    componentCount ? `${componentCount}+ components` : "Growing component library",
    "React · Vue · HTML/CSS",
    "MIT licensed",
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      <GradientBackground />
      <Container className="relative flex min-h-screen items-center justify-center pt-36 pb-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-5xl text-center"
        >
          <motion.div variants={rise}>
            <SectionBadge>
              <span className="rounded-full bg-gradient-to-r from-accent via-accent-3 to-accent-2 px-3 py-1 text-sm font-bold text-white shadow-[0_0_18px_hsl(var(--accent)/0.45)]">
                NEW
              </span>
              <Sparkles className="size-4 text-accent-2" aria-hidden="true" />
              Open Source UI Library
            </SectionBadge>
          </motion.div>

          <motion.h1
            variants={rise}
            className="font-display mt-8 text-balance text-6xl font-normal tracking-normal text-foreground sm:text-7xl lg:text-8xl"
          >
            Prism Bits
          </motion.h1>

          <motion.p
            variants={rise}
            className="mx-auto mt-6 max-w-3xl text-balance text-xl font-medium leading-8 text-white/72 sm:text-2xl"
          >
            <Link
              href="/components"
              className="font-script group relative mr-2 inline-block text-6xl leading-[0.72] text-white transition-all duration-300 hover:[text-shadow:0_0_24px_hsl(var(--accent-2)/0.6)] sm:text-7xl"
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
            className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-medium text-white/45"
          >
            {stats.map((stat, index) => (
              <li key={stat} className="flex items-center gap-3">
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className="size-1 rounded-full bg-gradient-to-r from-accent to-accent-2"
                  />
                )}
                {stat}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5"
          >
            <div className="h-2.5 w-1 rounded-full bg-gradient-to-b from-accent-2 to-accent" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
