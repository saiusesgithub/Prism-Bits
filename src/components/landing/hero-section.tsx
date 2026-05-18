"use client";

import Link from "next/link";
import { ArrowRight, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/common/button";
import { Container } from "@/components/common/container";
import { GradientBackground } from "@/components/landing/gradient-background";
import { SectionBadge } from "@/components/common/section-badge";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <GradientBackground />
      <Container className="relative flex min-h-screen items-center justify-center pt-36 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-5xl text-center"
        >
          <SectionBadge>
            <span className="mr-2 rounded-full bg-white px-3 py-1 text-sm font-bold text-black">NEW</span>
            Open Source UI Library
          </SectionBadge>
          <h1 className="font-display mt-8 text-balance text-6xl font-normal tracking-normal text-foreground sm:text-7xl lg:text-8xl">
            Prism Bits
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-balance text-xl font-medium leading-8 text-white/72 sm:text-2xl">
            <Link
              href="/components"
              className="font-script relative mr-2 inline-block text-6xl leading-[0.72] text-white sm:text-7xl"
            >
              Elegant
              <svg
                aria-hidden="true"
                className="absolute -bottom-4 left-0 h-7 w-full overflow-visible text-pink-300/85"
                viewBox="0 0 220 42"
                preserveAspectRatio="none"
              >
                <path
                  d="M5 20 C42 16 80 13 118 15 C106 22 99 29 112 30 C137 31 166 18 215 17"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            open-source UI bits you can copy, customize, and ship.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/components" size="lg">
              Browse Components
              <ArrowRight className="size-5" />
            </Button>
            <Button href="https://github.com/saiusesgithub/Prism-Bits" variant="secondary" size="lg">
              <GitBranch className="size-5" />
              Contribute on GitHub
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
