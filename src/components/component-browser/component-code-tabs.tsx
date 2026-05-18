"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { ComponentMetadata } from "@/data/components-registry";

type ComponentCodeTabsProps = {
  component: ComponentMetadata;
};

const tabs = ["Code", "Usage"] as const;

export function ComponentCodeTabs({ component }: ComponentCodeTabsProps) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Code");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const content = activeTab === "Usage" ? component.files.usage : component.files.code;

  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1600);
    } catch {
      setCopyState("failed");
      window.setTimeout(() => setCopyState("idle"), 2200);
    }
  };

  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-3">
      <div className="flex flex-col gap-3 border-b border-white/10 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex rounded-2xl border border-white/10 bg-black/25 p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-4 py-2 text-sm transition ${
                activeTab === tab ? "bg-white text-black" : "text-white/58 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={copyContent}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.12] px-4 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] transition hover:bg-white/[0.16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          {copyState === "copied" ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : "Copy code"}
        </button>
      </div>
      <pre className="mt-3 max-h-[360px] overflow-auto rounded-2xl bg-black/45 p-5 text-sm leading-6 text-white/72">
        <code>{content}</code>
      </pre>
    </section>
  );
}
