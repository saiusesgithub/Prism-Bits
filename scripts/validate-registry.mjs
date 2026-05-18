import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const registrySource = readFileSync("src/data/components-registry.ts", "utf8");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const allowedFrameworks = new Set(["react", "html-css-js", "vue", "svelte", "css-only"]);
const allowedStatuses = new Set(["available", "planned", "draft"]);

function collectObjects(arrayName) {
  const startToken = `export const ${arrayName}`;
  const start = registrySource.indexOf(startToken);
  if (start === -1) throw new Error(`Missing ${arrayName}`);

  const assignment = registrySource.indexOf("=", start);
  if (assignment === -1) throw new Error(`Missing ${arrayName} assignment`);

  const arrayStart = registrySource.indexOf("[", assignment);
  if (arrayStart === -1) throw new Error(`Missing ${arrayName} array start`);

  let depth = 0;
  let end = -1;
  for (let index = arrayStart; index < registrySource.length; index += 1) {
    const char = registrySource[index];
    if (char === "[") depth += 1;
    if (char === "]") depth -= 1;
    if (depth === 0) {
      end = index;
      break;
    }
  }

  if (end === -1) throw new Error(`Missing ${arrayName} array end`);

  const block = registrySource.slice(arrayStart + 1, end);
  const objects = [];
  let objectStart = -1;
  depth = 0;

  for (let index = 0; index < block.length; index += 1) {
    const char = block[index];
    if (char === "{") {
      if (depth === 0) objectStart = index;
      depth += 1;
    }
    if (char === "}") {
      depth -= 1;
      if (depth === 0 && objectStart !== -1) {
        objects.push(block.slice(objectStart, index + 1));
        objectStart = -1;
      }
    }
  }

  return objects;
}

function readString(objectSource, field) {
  const match = objectSource.match(new RegExp(`${field}:\\s*"([^"]+)"`));
  return match?.[1];
}

function readStringArray(objectSource, field) {
  const match = objectSource.match(new RegExp(`${field}:\\s*\\[([^\\]]*)\\]`));
  if (!match) return [];

  return [...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1]);
}

const categoryObjects = collectObjects("componentCategories");
const componentObjects = collectObjects("componentsRegistry");
const categories = categoryObjects.map((objectSource) => ({
  name: readString(objectSource, "name"),
  slug: readString(objectSource, "slug"),
}));
const categorySlugs = new Set(categories.map((category) => category.slug));
const seenCategorySlugs = new Set();
const seenComponentKeys = new Set();
const errors = [];

for (const category of categories) {
  if (!category.name) errors.push("Category missing name");
  if (!category.slug) errors.push(`Category ${category.name ?? "(unknown)"} missing slug`);
  if (category.slug && !slugPattern.test(category.slug)) errors.push(`Invalid category slug: ${category.slug}`);
  if (category.slug && seenCategorySlugs.has(category.slug)) errors.push(`Duplicate category slug: ${category.slug}`);
  if (category.slug) seenCategorySlugs.add(category.slug);
}

for (const objectSource of componentObjects) {
  const component = {
    name: readString(objectSource, "name"),
    slug: readString(objectSource, "slug"),
    category: readString(objectSource, "category"),
    framework: readString(objectSource, "framework"),
    status: readString(objectSource, "status"),
    tags: readStringArray(objectSource, "tags"),
  };

  const label = component.name ?? component.slug ?? "(unknown component)";

  if (!component.name) errors.push("Component missing name");
  if (!component.slug) errors.push(`${label} missing slug`);
  if (component.slug && !slugPattern.test(component.slug)) errors.push(`${label} has invalid slug: ${component.slug}`);
  if (!component.category) errors.push(`${label} missing category`);
  if (component.category && !categorySlugs.has(component.category)) errors.push(`${label} references unknown category: ${component.category}`);
  if (!component.framework) errors.push(`${label} missing framework`);
  if (component.framework && !allowedFrameworks.has(component.framework)) errors.push(`${label} has invalid framework: ${component.framework}`);
  if (!component.status) errors.push(`${label} missing status`);
  if (component.status && !allowedStatuses.has(component.status)) errors.push(`${label} has invalid status: ${component.status}`);
  if (!component.tags.length) errors.push(`${label} should include at least one tag`);

  if (component.category && component.slug) {
    const key = `${component.category}/${component.slug}`;
    if (seenComponentKeys.has(key)) errors.push(`Duplicate component route key: ${key}`);
    seenComponentKeys.add(key);
  }

  if (component.framework && component.category && component.slug) {
    const metaPath = join("src", "components", "registry", component.framework, component.category, component.slug, "meta.json");
    if (!existsSync(metaPath)) {
      errors.push(`${label} missing meta.json at ${metaPath}`);
    } else {
      try {
        const meta = JSON.parse(readFileSync(metaPath, "utf8"));
        for (const field of ["name", "slug", "category", "framework", "description", "tags", "status", "author"]) {
          if (meta[field] === undefined) errors.push(`${metaPath} missing ${field}`);
        }
        if (meta.slug !== component.slug) errors.push(`${metaPath} slug does not match registry`);
        if (meta.category !== component.category) errors.push(`${metaPath} category does not match registry`);
        if (meta.framework !== component.framework) errors.push(`${metaPath} framework does not match registry`);
      } catch (error) {
        errors.push(`${metaPath} is not valid JSON: ${error.message}`);
      }
    }
  }
}

if (errors.length) {
  console.error("Registry validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Registry validation passed: ${categories.length} categories, ${componentObjects.length} components.`);
