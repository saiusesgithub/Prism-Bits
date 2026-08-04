"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [isScrollable, setIsScrollable] = useState(false);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  });

  useEffect(() => {
    const checkScrollable = () => {
      const scrollable = document.documentElement.scrollHeight > window.innerHeight + 10;
      setIsScrollable(scrollable);
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable, { passive: true });
    window.addEventListener("scroll", checkScrollable, { passive: true });

    const observer = new ResizeObserver(checkScrollable);
    if (document.body) {
      observer.observe(document.body);
    }

    return () => {
      window.removeEventListener("resize", checkScrollable);
      window.removeEventListener("scroll", checkScrollable);
      observer.disconnect();
    };
  }, []);

  if (!isScrollable) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] pointer-events-none overflow-hidden bg-transparent"
    >
      <motion.div
        className="h-full w-full origin-left bg-gradient-to-r from-[hsl(var(--accent))] via-[hsl(var(--accent-2))] to-[hsl(var(--accent-3))] shadow-[0_0_12px_hsl(var(--accent-2)/0.8)]"
        style={{ scaleX }}
      />
    </div>
  );
}
