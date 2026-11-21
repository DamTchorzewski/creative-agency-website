import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { categories, projects, services, team } from "@/data/site";
import { filterProjects, neighbours, projectCount } from "@/lib/projects";
import { looksLikeBot, validateEmail, validateOrder } from "@/lib/validate";

describe("content", () => {
  it("has unique, URL-safe project slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("gives every project a known category, alt text and three results", () => {
    const ids = new Set<string>(categories.map((c) => c.id));
    for (const p of projects) {
      expect(ids.has(p.category)).toBe(true);
      expect(p.imageAlt.length).toBeGreaterThan(10);
      expect(p.results).toHaveLength(3);
    }
  });

  it("uses every category at least once", () => {
    for (const c of categories) expect(filterProjects(projects, c.id).length).toBeGreaterThan(0);
  });

  it("has a view-transition rule in global.css for every project", () => {
    const css = readFileSync("src/styles/global.css", "utf8");
    for (const p of projects) expect(css).toContain(`.vt-panel-${p.slug} {`);
  });

  it("keeps the three services and four people of the original site", () => {
    expect(services.map((s) => s.title)).toEqual([
      "Aplikacje komputerowe",
      "Aplikacje mobilne",
      "Rozwiązania graficzne",
    ]);
    expect(team.map((m) => m.role)).toEqual([
      "Product Designer",
      "Frontend Developer",
      "Marketing",
      "UI Designer",
    ]);
  });
});

describe("filterProjects", () => {
  const list = [
    { category: "strony" as const },
    { category: "dizajn" as const },
    { category: "strony" as const },
  ];
  it("returns everything for 'all' as a copy", () => {
    const all = filterProjects(list, "all");
    expect(all).toEqual(list);
    expect(all).not.toBe(list);
  });
  it("keeps one category", () => {
    expect(filterProjects(list, "strony")).toHaveLength(2);
    expect(filterProjects(list, "marketing")).toHaveLength(0);
  });
});

describe("projectCount", () => {
  it.each([
    [1, "1 projekt"],
    [2, "2 projekty"],
    [4, "4 projekty"],
    [5, "5 projektów"],
    [9, "9 projektów"],
    [12, "12 projektów"],
    [22, "22 projekty"],
    [0, "0 projektów"],
  ])("%i -> %s", (count, label) => {
    expect(projectCount(count)).toBe(label);
  });
});

describe("neighbours", () => {
  const list = [{ slug: "a" }, { slug: "b" }, { slug: "c" }];
  it("wraps around at both ends", () => {
    expect(neighbours(list, "a")).toEqual({ prev: { slug: "c" }, next: { slug: "b" } });
    expect(neighbours(list, "c").next).toEqual({ slug: "a" });
  });
  it("throws on an unknown slug", () => {
    expect(() => neighbours(list, "x")).toThrow("Unknown slug");
  });
});

describe("validation", () => {
  it("accepts a complete order", () => {
    expect(validateOrder({ name: "Jan", email: "jan@firma.pl", consent: true })).toEqual({});
  });
  it("reports every missing field", () => {
    const errors = validateOrder({ name: " ", email: "", consent: false });
    expect(Object.keys(errors).sort()).toEqual(["consent", "email", "name"]);
  });
  it.each(["jan", "jan@", "jan@firma", "jan @firma.pl"])("rejects the e-mail %s", (email) => {
    expect(validateEmail(email)).toBeDefined();
  });
  it("trims the e-mail", () => {
    expect(validateEmail("  jan@firma.pl ")).toBeUndefined();
  });
  it("spots the honeypot and a too-fast send", () => {
    expect(looksLikeBot("http://spam", 0, 10_000)).toBe(true);
    expect(looksLikeBot("", 0, 1_000)).toBe(true);
    expect(looksLikeBot("", 0, 10_000)).toBe(false);
  });
});
