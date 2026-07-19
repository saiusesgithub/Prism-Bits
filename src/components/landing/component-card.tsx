"use client";

import { Code2, Eye } from "lucide-react";
import { motion } from "framer-motion";
import type { ComponentMetadata } from "@/data/components-registry";
import { getCategoryBySlug } from "@/data/components-registry";
import { Button } from "@/components/common/button";
import { ComponentCardPreview } from "@/components/landing/component-card-preview";

type ComponentCardProps = {
  component: ComponentMetadata;
};

export function ComponentCard({ component }: ComponentCardProps) {
  const category = getCategoryBySlug(component.category);

  return (
    <motion.article
      id={component.slug}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-cyan-950/10 backdrop-blur transition duration-300 hover:border-cyan-200/30 hover:bg-white/[0.065] hover:shadow-cyan-950/25"
    >
      <div className="h-52 overflow-hidden border-b border-white/10">
        <ComponentCardPreview component={component} />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-accent-2">{category?.name ?? component.category}</p>
            <h3 className="mt-1 text-2xl font-semibold text-foreground">{component.name}</h3>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs capitalize text-white/62">
            {component.status}
          </span>
        </div>
        <p className="mt-4 min-h-12 text-sm leading-6 text-muted">{component.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {component.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-white/[0.055] px-3 py-1 text-xs text-white/55">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button href={`/components/${component.category}/${component.slug}`} variant="secondary" className="h-11 rounded-xl text-sm">
            <Eye className="size-4" />
            Preview
          </Button>
          <Button href="https://github.com/saiusesgithub/Prism-Bits" variant="ghost" className="h-11 rounded-xl border border-white/10 bg-black/20 text-sm">
            <Code2 className="size-4" />
            Code
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
