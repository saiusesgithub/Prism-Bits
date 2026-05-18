import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getComponentBySlug,
  getComponentsByCategory,
  getFirstComponentForCategory,
} from "@/data/components-registry";
import { ComponentDetailPanel } from "@/components/component-browser/component-detail-panel";
import { ComponentSidebar } from "@/components/component-browser/component-sidebar";

type ComponentBrowserLayoutProps = {
  categorySlug: string;
  selectedSlug?: string;
};

export function ComponentBrowserLayout({ categorySlug, selectedSlug }: ComponentBrowserLayoutProps) {
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const components = getComponentsByCategory(categorySlug);
  if (!components.length) notFound();

  const selected = selectedSlug ? getComponentBySlug(categorySlug, selectedSlug) : getFirstComponentForCategory(categorySlug);
  if (!selected) notFound();

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(240px,25%)_1fr]">
      <ComponentSidebar category={category} components={components} selectedSlug={selected.slug} />
      <ComponentDetailPanel category={category} component={selected} />
    </div>
  );
}
