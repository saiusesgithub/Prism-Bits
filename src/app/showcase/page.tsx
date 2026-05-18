import { ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/common/button";
import { Container } from "@/components/common/container";
import { Footer } from "@/components/landing/footer";
import { SectionBadge } from "@/components/common/section-badge";

const placeholders = ["SaaS dashboard", "Creative portfolio", "AI tool interface"];

export default function ShowcasePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background pt-36">
      <Container className="relative pb-24">
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
            <article key={name} className="group flex min-h-80 flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/10 bg-card/70 p-5 shadow-2xl shadow-purple-950/10 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-cyan-200/25">
              <div>
                <div className="mb-5 flex h-36 items-center justify-center rounded-[1.25rem] border border-white/10 bg-[radial-gradient(circle_at_25%_30%,hsl(var(--accent)/0.24),transparent_12rem),radial-gradient(circle_at_80%_45%,hsl(var(--accent-2)/0.2),transparent_12rem),linear-gradient(135deg,#080812,#111827)]">
                  <Sparkles className="size-10 text-white drop-shadow-[0_0_28px_rgb(103_232_249/0.55)]" />
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
      <Footer />
    </main>
  );
}
