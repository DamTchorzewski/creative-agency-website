// Pure helpers for the portfolio: filtering, the "N projects" label and the next/previous case study.
import type { CategoryId } from "@/data/site";

export type Filter = CategoryId | "all";

interface HasCategory {
  category: CategoryId;
}

export function filterProjects<T extends HasCategory>(list: readonly T[], filter: Filter): T[] {
  return filter === "all" ? [...list] : list.filter((project) => project.category === filter);
}

const plural = new Intl.PluralRules("pl-PL");
const forms: Record<string, string> = {
  one: "projekt",
  few: "projekty",
  many: "projektów",
  other: "projektu",
};

/** "1 projekt", "3 projekty", "5 projektów" (Polish plural forms). */
export function projectCount(count: number): string {
  return `${count} ${forms[plural.select(count)] ?? forms.many}`;
}

/** The previous and the next item, wrapping around at both ends. */
export function neighbours<T extends { slug: string }>(list: readonly T[], slug: string) {
  const index = list.findIndex((item) => item.slug === slug);
  if (index === -1 || list.length === 0) throw new Error(`Unknown slug: ${slug}`);
  const prev = list[(index - 1 + list.length) % list.length]!;
  const next = list[(index + 1) % list.length]!;
  return { prev, next };
}
