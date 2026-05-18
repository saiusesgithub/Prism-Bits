import "server-only";

import { readFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import fg from "fast-glob";
import { componentCategories, type ComponentDifficulty, type ComponentFramework, type ComponentMetadata, type ComponentStatus } from "@/data/components-registry";

type ComponentMetaJson = {
  name?: unknown;
  slug?: unknown;
  category?: unknown;
  framework?: unknown;
  description?: unknown;
  tags?: unknown;
  status?: unknown;
  difficulty?: unknown;
  author?: {
    name?: unknown;
    github?: unknown;
  };
  dependencies?: unknown;
};

const allowedFrameworks = new Set<ComponentFramework>(["react", "html-css-js", "vue", "svelte", "css-only"]);
const allowedStatuses = new Set<ComponentStatus>(["available", "planned", "draft"]);

function normalizeDifficulty(value: unknown): ComponentDifficulty {
  if (typeof value !== "string") return "Beginner";

  const normalized = value.toLowerCase();
  if (normalized === "advanced") return "Advanced";
  if (normalized === "intermediate") return "Intermediate";
  return "Beginner";
}

function normalizeStatus(value: unknown): ComponentStatus {
  return typeof value === "string" && allowedStatuses.has(value as ComponentStatus) ? (value as ComponentStatus) : "draft";
}

function normalizeFramework(value: unknown): ComponentFramework | null {
  return typeof value === "string" && allowedFrameworks.has(value as ComponentFramework) ? (value as ComponentFramework) : null;
}

async function readOptionalFile(directory: string, fileName: string) {
  try {
    return await readFile(join(directory, fileName), "utf8");
  } catch {
    return undefined;
  }
}

function validateString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function getDefaultCode(meta: ComponentMetaJson, files: { html?: string; css?: string; js?: string; component?: string }) {
  if (files.component) return files.component;

  const chunks = [];
  if (files.html) chunks.push(files.html);
  if (files.css) chunks.push(`<style>\n${files.css}\n</style>`);
  if (files.js) chunks.push(`<script>\n${files.js}\n</script>`);

  return chunks.join("\n\n") || `${meta.name ?? "Component"} source coming soon.`;
}

async function loadComponentFromMeta(metaPath: string): Promise<ComponentMetadata | null> {
  const directory = dirname(metaPath);
  const relativeMetaPath = relative(process.cwd(), metaPath);

  try {
    const meta = JSON.parse(await readFile(metaPath, "utf8")) as ComponentMetaJson;
    const name = validateString(meta.name);
    const slug = validateString(meta.slug);
    const category = validateString(meta.category);
    const framework = normalizeFramework(meta.framework);
    const description = validateString(meta.description);

    if (!name || !slug || !category || !framework || !description) {
      console.warn(`[registry] Skipping ${relativeMetaPath}: missing name, slug, category, framework, or description.`);
      return null;
    }

    const tags = Array.isArray(meta.tags) ? meta.tags.filter((tag): tag is string => typeof tag === "string") : [];
    const dependencies = Array.isArray(meta.dependencies)
      ? meta.dependencies.filter((dependency): dependency is string => typeof dependency === "string")
      : undefined;

    const html = await readOptionalFile(directory, "index.html");
    const css = await readOptionalFile(directory, "style.css");
    const js = await readOptionalFile(directory, "script.js");
    const tsxComponent = await readOptionalFile(directory, "component.tsx");
    const vueComponent = await readOptionalFile(directory, "component.vue");
    const svelteComponent = await readOptionalFile(directory, "component.svelte");
    const preview = await readOptionalFile(directory, "preview.tsx");
    const codeFile = await readOptionalFile(directory, "code.ts");
    const componentSource = tsxComponent ?? vueComponent ?? svelteComponent;
    const code = codeFile ?? getDefaultCode(meta, { html, css, js, component: componentSource });

    return {
      name,
      slug,
      category,
      framework,
      description,
      tags,
      difficulty: normalizeDifficulty(meta.difficulty),
      author: {
        name: validateString(meta.author?.name) ?? "Prism Bits",
        github: validateString(meta.author?.github) ?? undefined,
      },
      status: normalizeStatus(meta.status),
      dependencies,
      files: {
        preview: preview ?? `${framework === "react" ? "React live preview" : "Code preview"}`,
        code,
        usage: componentSource ? `<${name.replace(/\s+/g, "")} />` : html ?? code,
        html,
        css,
        js,
      },
    };
  } catch (error) {
    console.warn(`[registry] Skipping ${relativeMetaPath}: ${error instanceof Error ? error.message : "invalid meta.json"}`);
    return null;
  }
}

export async function getComponentsRegistry() {
  const metaPaths = await fg("src/components/registry/**/**/**/meta.json", {
    absolute: true,
    onlyFiles: true,
  });
  const components = (await Promise.all(metaPaths.map(loadComponentFromMeta))).filter((component): component is ComponentMetadata => Boolean(component));

  return components.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getComponentsByCategory(categorySlug: string) {
  const components = await getComponentsRegistry();
  return components.filter((component) => component.category === categorySlug);
}

export async function getComponentBySlug(categorySlug: string, slug: string) {
  const components = await getComponentsByCategory(categorySlug);
  return components.find((component) => component.slug === slug);
}

export async function getFirstComponentForCategory(categorySlug: string) {
  const components = await getComponentsByCategory(categorySlug);
  return components[0];
}

export function getCategoryBySlug(slug: string) {
  return componentCategories.find((category) => category.slug === slug);
}

export async function getCategoryComponentCount(categorySlug: string) {
  const components = await getComponentsByCategory(categorySlug);
  return components.length;
}
