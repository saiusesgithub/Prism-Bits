"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import type { ComponentMetadata } from "@/data/components-registry";
import { Button } from "@/components/common/button";

type ComponentCodeTabsProps = {
  component: ComponentMetadata;
};

const tabs = ["Preview", "Code", "Usage"] as const;

export function ComponentCodeTabs({ component }: ComponentCodeTabsProps) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Code");
  const content =
    activeTab === "Preview"
      ? component.files.preview
      : activeTab === "Usage"
        ? component.files.usage
        : component.files.code;

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
        <Button href="https://github.com/saiusesgithub/Prism-Bits" variant="secondary" className="h-10 rounded-xl text-sm">
          <Copy className="size-4" />
          Copy code
        </Button>
      </div>
      <pre className="mt-3 max-h-[360px] overflow-auto rounded-2xl bg-black/45 p-5 text-sm leading-6 text-white/72">
        <code>{content}</code>
      </pre>
    </section>
  );
}
