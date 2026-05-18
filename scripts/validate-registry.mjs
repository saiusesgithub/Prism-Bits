import { readFileSync } from "node:fs";
import { relative } from "node:path";
import fg from "fast-glob";

const registrySource = readFileSync("src/data/components-registry.ts", "utf8");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const allowedFrameworks = new Set(["react", "html-css-js", "vue", "svelte", "css-only"]);
const allowedStatuses = new Set(["available", "planned", "draft"]);
const allowedDifficulties = new Set(["beginner", "intermediate", "advanced", "Beginner", "Intermediate", "Advanced"]);

function collectCategorySlugs() {
  const match = registrySource.match(/export const componentCategories[\s\S]*?=\s*\[([\s\S]*?)\];/);
  if (!match) return [];

  return [...match[1].matchAll(/slug:\s*"([^"]+)"/g)].map((slugMatch) => slugMatch[1]);
}

const categorySlugs = new Set(collectCategorySlugs());
const metaPaths = await fg("src/components/registry/**/**/**/meta.json", {
  onlyFiles: true,
});
const seenRoutes = new Set();
const errors = [];

if (!categorySlugs.size) {
  errors.push("No categories found in src/data/components-registry.ts");
}

if (!metaPaths.length) {
  errors.push("No component meta.json files found under src/components/registry");
}

for (const metaPath of metaPaths) {
  const relativeMetaPath = relative(process.cwd(), metaPath);
  let meta;
  try {
    meta = JSON.parse(readFileSync(metaPath, "utf8"));
  } catch (error) {
    errors.push(`${relativeMetaPath} is not valid JSON: ${error.message}`);
    continue;
  }

  for (const field of ["name", "slug", "category", "framework", "description", "tags", "status", "author"]) {
    if (meta[field] === undefined) errors.push(`${relativeMetaPath} missing ${field}`);
  }

  if (typeof meta.slug === "string" && !slugPattern.test(meta.slug)) errors.push(`${relativeMetaPath} has invalid slug: ${meta.slug}`);
  if (typeof meta.category === "string" && !categorySlugs.has(meta.category)) errors.push(`${relativeMetaPath} references unknown category: ${meta.category}`);
  if (typeof meta.framework === "string" && !allowedFrameworks.has(meta.framework)) errors.push(`${relativeMetaPath} has invalid framework: ${meta.framework}`);
  if (typeof meta.status === "string" && !allowedStatuses.has(meta.status)) errors.push(`${relativeMetaPath} has invalid status: ${meta.status}`);
  if (meta.difficulty !== undefined && (!["string"].includes(typeof meta.difficulty) || !allowedDifficulties.has(meta.difficulty))) {
    errors.push(`${relativeMetaPath} has invalid difficulty: ${meta.difficulty}`);
  }
  if (!Array.isArray(meta.tags) || !meta.tags.every((tag) => typeof tag === "string")) {
    errors.push(`${relativeMetaPath} tags must be an array of strings`);
  }
  if (!meta.author || typeof meta.author.name !== "string") {
    errors.push(`${relativeMetaPath} author.name is required`);
  }

  if (typeof meta.category === "string" && typeof meta.slug === "string") {
    const routeKey = `${meta.category}/${meta.slug}`;
    if (seenRoutes.has(routeKey)) errors.push(`Duplicate component route: ${routeKey}`);
    seenRoutes.add(routeKey);
  }
}

if (errors.length) {
  console.error("Registry validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Registry validation passed: ${categorySlugs.size} categories, ${metaPaths.length} components.`);
