import { ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/common/button";
import { Container } from "@/components/common/container";
import { SectionBadge } from "@/components/common/section-badge";

const placeholders = ["SaaS dashboard", "Creative portfolio", "AI tool interface"];

export default function ShowcasePage() {
  return (
    <main className="min-h-screen pt-36">
      <Container className="pb-24">
        <section className="max-w-3xl">
          <SectionBadge>Showcase</SectionBadge>
          <h1 className="mt-6 text-4xl font-semibold tracking-normal text-foreground sm:text-6xl">
            Future projects built with Prism Bits.
          </h1>
          <p className="mt-5 text-base leading-7 text-muted sm:text-lg">
            This page will collect real examples, remixes, and product screens that use Prism Bits components in production.
          </p>
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-3">
          {placeholders.map((name) => (
            <article key={name} className="flex min-h-72 flex-col justify-between rounded-[1.5rem] border border-white/10 bg-card/70 p-6 shadow-2xl shadow-purple-950/10">
              <div>
                <div className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                  <Sparkles className="size-5 text-accent-2" />
                </div>
                <h2 className="mt-5 text-2xl font-semibold text-foreground">{name}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">A reserved showcase slot for a future community submission.</p>
              </div>
              <Button href="/components" variant="ghost" className="mt-8 justify-start px-0">
                Browse bits
                <ExternalLink className="size-4" />
              </Button>
            </article>
          ))}
        </section>
      </Container>
    </main>
  );
}
