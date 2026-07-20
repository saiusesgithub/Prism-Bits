"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return <div className={cn("size-9 rounded-full bg-white/[0.08]", className)} />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={cn(
        "relative flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-foreground transition-colors hover:bg-white/[0.12] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/10 dark:bg-white/[0.08]",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          {isDark ? <Sun className="size-4 text-amber-300" /> : <Moon className="size-4 text-indigo-500" />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
