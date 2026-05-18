import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/common/button";

const frameworks = ["React", "HTML/CSS/JS", "Vue", "Svelte", "CSS-only"];
const categories = ["Buttons", "Cards", "Navbars", "Forms", "Loaders", "Hero Sections"];

export function SearchFilters() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-3 shadow-2xl shadow-purple-950/10 backdrop-blur-2xl">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <div className="flex min-h-16 items-center gap-3 rounded-[1.35rem] border border-white/[0.08] bg-black/25 px-5 text-white/54 shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]">
          <Search className="size-5 text-cyan-200/70" />
          <span className="text-sm sm:text-base">Search components, tags, categories, or effects</span>
        </div>
        <Button variant="secondary" className="min-h-16">
          <SlidersHorizontal className="size-5" />
          Filters
        </Button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {frameworks.map((framework) => (
          <span key={framework} className="rounded-full border border-cyan-200/10 bg-cyan-200/[0.06] px-3 py-1.5 text-xs font-medium text-cyan-100/72">
            {framework}
          </span>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {categories.map((category) => (
          <span key={category} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-white/62">
            {category}
          </span>
        ))}
      </div>
    </section>
  );
}
