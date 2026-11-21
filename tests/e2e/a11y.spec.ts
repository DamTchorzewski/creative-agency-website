import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { ROUTES, scrollThrough } from "./helpers";

for (const colorScheme of ["light", "dark"] as const) {
  test.describe(`WCAG 2.2 AA (${colorScheme})`, () => {
    test.use({ colorScheme, reducedMotion: "reduce" });
    for (const route of ROUTES) {
      test(route, async ({ page }) => {
        await page.goto(route);
        await scrollThrough(page);
        const { violations } = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();
        expect(
          violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`),
        ).toEqual([]);
      });
    }
  });
}
