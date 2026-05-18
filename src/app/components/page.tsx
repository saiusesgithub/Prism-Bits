import { Search } from "lucide-react";
import { Container } from "@/components/common/container";
import { Footer } from "@/components/landing/footer";
import { SectionBadge } from "@/components/common/section-badge";
import { CategoryGrid } from "@/components/component-browser/category-grid";
import { componentCategories } from "@/data/components-registry";

export default function ComponentsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background pt-36">
      <Container className="relative pb-24">
        <section className="max-w-3xl">
          <SectionBadge>Components</SectionBadge>
          <h1 className="mt-6 text-4xl font-semibold tracking-normal text-foreground sm:text-6xl">
            Components
          </h1>
          <p className="mt-5 text-base leading-7 text-muted sm:text-lg">
            Browse open-source UI bits by category.
          </p>
        </section>

        <section className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-3">
          <div className="flex min-h-14 items-center gap-3 rounded-[1.1rem] border border-white/[0.08] bg-black/25 px-5 text-muted">
            <Search className="size-5 text-white/45" />
            <span>Search categories or components</span>
          </div>
        </section>

        <CategoryGrid categories={componentCategories} />
      </Container>
      <Footer />
    </main>
  );
}
