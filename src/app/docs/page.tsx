import { Container } from "@/components/common/container";
import { SectionBadge } from "@/components/common/section-badge";

export default function DocsPage() {
  return (
    <main className="pt-28">
      <Container className="pb-24">
        <SectionBadge>Docs</SectionBadge>
        <h1 className="mt-5 text-4xl font-semibold text-foreground sm:text-6xl">Prism Bits documentation</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
          Installation notes, contribution guidelines, component usage, and registry details will live here.
        </p>
        <div className="mt-10 rounded-3xl border border-white/10 bg-card/70 p-8">
          <h2 className="text-2xl font-semibold text-foreground">Coming soon</h2>
          <p className="mt-3 text-muted">
            This route is intentionally lightweight while the Prism Bits API and contribution model take shape.
          </p>
        </div>
      </Container>
    </main>
  );
}
