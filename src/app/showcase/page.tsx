import { Container } from "@/components/common/container";
import { SectionBadge } from "@/components/common/section-badge";

export default function ShowcasePage() {
  return (
    <main className="pt-28">
      <Container className="pb-24">
        <SectionBadge>Showcase</SectionBadge>
        <h1 className="mt-5 text-4xl font-semibold text-foreground sm:text-6xl">Built with Prism Bits</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
          A future home for projects, experiments, and products using Prism Bits components.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {["Dashboards", "Portfolios", "SaaS tools"].map((item) => (
            <div key={item} className="rounded-3xl border border-white/10 bg-card/70 p-6">
              <p className="text-lg font-semibold text-foreground">{item}</p>
              <p className="mt-3 text-sm leading-6 text-muted">Showcase slots reserved for community submissions.</p>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
