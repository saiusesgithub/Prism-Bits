import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import fg from "fast-glob";

const REGISTRY_ROOT = "src/components/registry";

const registrySource = readFileSync("src/data/components-registry.ts", "utf8");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const githubUsernamePattern = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
const allowedFrameworks = new Set(["react", "html-css-js", "vue", "svelte", "css-only"]);
const allowedStatuses = new Set(["available", "planned", "draft"]);
const allowedDifficulties = new Set(["beginner", "intermediate", "advanced"]);

// Files that must exist next to meta.json before a component may be "available".
const requiredFilesByFramework = {
  "html-css-js": ["index.html", "style.css"],
  "css-only": ["index.html", "style.css"],
  react: ["component.tsx"],
  vue: ["component.vue"],
  svelte: ["component.svelte"],
};

function collectCategorySlugs() {
  const match = registrySource.match(/export const componentCategories[\s\S]*?=\s*\[([\s\S]*?)\];/);
  if (!match) return [];

  return [...match[1].matchAll(/slug:\s*"([^"]+)"/g)].map((slugMatch) => slugMatch[1]);
}

const categorySlugs = new Set(collectCategorySlugs());
const metaPaths = await fg(`${REGISTRY_ROOT}/**/meta.json`, { onlyFiles: true });
const seenRoutes = new Map();
const errors = [];

function fail(componentPath, message) {
  errors.push(`${componentPath}: ${message}`);
}

if (!categorySlugs.size) {
  errors.push("No categories found in src/data/components-registry.ts");
}

if (!metaPaths.length) {
  errors.push(`No component meta.json files found under ${REGISTRY_ROOT}`);
}

for (const metaPath of metaPaths) {
  const componentDir = dirname(metaPath);
  const relativePath = relative(REGISTRY_ROOT, componentDir).split(sep).join("/");
  const segments = relativePath.split("/");

  // --- Directory structure: exactly framework/category/slug ---
  if (segments.length !== 3) {
    fail(componentDir, `meta.json must live at ${REGISTRY_ROOT}/<framework>/<category>/<slug>/ (found depth ${segments.length}: "${relativePath}")`);
    continue;
  }

  const [folderFramework, folderCategory, folderSlug] = segments;

  if (!allowedFrameworks.has(folderFramework)) {
    fail(componentDir, `framework directory "${folderFramework}" is not supported (expected one of: ${[...allowedFrameworks].join(", ")})`);
  }
  if (!categorySlugs.has(folderCategory)) {
    fail(componentDir, `category directory "${folderCategory}" is not a known category from src/data/components-registry.ts`);
  }
  if (!slugPattern.test(folderSlug)) {
    fail(componentDir, `component directory "${folderSlug}" must be lowercase kebab-case (e.g. "retro-shadow-button")`);
  }

  // --- Metadata parsing ---
  let meta;
  try {
    meta = JSON.parse(readFileSync(metaPath, "utf8"));
  } catch (error) {
    fail(componentDir, `meta.json is not valid JSON: ${error.message}`);
    continue;
  }

  for (const field of ["name", "slug", "category", "framework", "description", "tags", "status", "author"]) {
    if (meta[field] === undefined) fail(componentDir, `meta.json is missing required field "${field}"`);
  }

  if (meta.name !== undefined && (typeof meta.name !== "string" || !meta.name.trim())) {
    fail(componentDir, `"name" must be a non-empty string`);
  }
  if (meta.description !== undefined && (typeof meta.description !== "string" || !meta.description.trim())) {
    fail(componentDir, `"description" must be a non-empty string`);
  }

  // --- Slug rules + folder/meta consistency ---
  if (typeof meta.slug === "string" && !slugPattern.test(meta.slug)) {
    fail(componentDir, `"slug" must be lowercase kebab-case, got "${meta.slug}"`);
  }
  if (typeof meta.slug === "string" && meta.slug !== folderSlug) {
    fail(componentDir, `folder name "${folderSlug}" does not match meta.json slug "${meta.slug}"`);
  }
  if (typeof meta.category === "string" && !categorySlugs.has(meta.category)) {
    fail(componentDir, `"category" references unknown category "${meta.category}"`);
  }
  if (typeof meta.category === "string" && categorySlugs.has(folderCategory) && meta.category !== folderCategory) {
    fail(componentDir, `category directory "${folderCategory}" does not match meta.json category "${meta.category}"`);
  }
  if (typeof meta.framework === "string" && !allowedFrameworks.has(meta.framework)) {
    fail(componentDir, `"framework" must be one of: ${[...allowedFrameworks].join(", ")}, got "${meta.framework}"`);
  }
  if (typeof meta.framework === "string" && allowedFrameworks.has(folderFramework) && meta.framework !== folderFramework) {
    fail(componentDir, `framework directory "${folderFramework}" does not match meta.json framework "${meta.framework}"`);
  }

  // --- Enums ---
  if (meta.status !== undefined && !allowedStatuses.has(meta.status)) {
    fail(componentDir, `"status" must be one of: ${[...allowedStatuses].join(", ")}, got "${meta.status}"`);
  }
  if (meta.difficulty !== undefined && !allowedDifficulties.has(meta.difficulty)) {
    fail(componentDir, `"difficulty" must be one of: ${[...allowedDifficulties].join(", ")} (lowercase), got "${meta.difficulty}"`);
  }

  // --- Tags / dependencies / author ---
  if (meta.tags !== undefined && (!Array.isArray(meta.tags) || !meta.tags.every((tag) => typeof tag === "string" && tag.trim()))) {
    fail(componentDir, `"tags" must be an array of non-empty strings`);
  }
  if (meta.dependencies !== undefined && (!Array.isArray(meta.dependencies) || !meta.dependencies.every((dep) => typeof dep === "string" && dep.trim()))) {
    fail(componentDir, `"dependencies" must be an array of non-empty strings when supplied`);
  }
  if (meta.author !== undefined) {
    if (typeof meta.author !== "object" || meta.author === null || typeof meta.author.name !== "string" || !meta.author.name.trim()) {
      fail(componentDir, `"author.name" is required and must be a non-empty string`);
    }
    if (meta.author?.github !== undefined && (typeof meta.author.github !== "string" || !githubUsernamePattern.test(meta.author.github))) {
      fail(componentDir, `"author.github" must be a valid GitHub username when supplied, got "${meta.author?.github}"`);
    }
  }

  // --- Route uniqueness across all frameworks (URL is /components/<category>/<slug>) ---
  if (typeof meta.category === "string" && typeof meta.slug === "string") {
    const routeKey = `${meta.category}/${meta.slug}`;
    if (seenRoutes.has(routeKey)) {
      fail(componentDir, `duplicate route "${routeKey}" — already declared by ${seenRoutes.get(routeKey)}`);
    } else {
      seenRoutes.set(routeKey, componentDir);
    }
  }

  // --- Required implementation files ---
  // "available" components must be complete. "draft"/"planned" entries are
  // intentional placeholders and are exempt from the file requirement.
  if (meta.status === "available" && typeof meta.framework === "string" && requiredFilesByFramework[meta.framework]) {
    for (const fileName of requiredFilesByFramework[meta.framework]) {
      if (!existsSync(join(componentDir, fileName))) {
        fail(componentDir, `status is "available" but required ${meta.framework} file "${fileName}" is missing`);
      }
    }
  }
}

if (errors.length) {
  console.error("Registry validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  console.error(`\n${errors.length} error${errors.length === 1 ? "" : "s"} found.`);
  process.exit(1);
}

console.log(`Registry validation passed: ${categorySlugs.size} categories, ${metaPaths.length} components, 0 errors.`);
