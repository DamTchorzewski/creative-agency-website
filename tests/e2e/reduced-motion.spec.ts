import { expect, test } from "@playwright/test";

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("nothing is hidden, split or animated", async ({ page }) => {
    await page.goto("/");
    // The motion script never loads, so no reveal state hides content and no smooth scrolling starts.
    await expect(page.locator("html")).not.toHaveClass(/js-motion|has-lenis/);
    const state = await page.evaluate(() => ({
      hidden: [...document.querySelectorAll("[data-reveal], [data-split], .word")].filter(
        (el) => Number(getComputedStyle(el).opacity) < 1,
      ).length,
      animations: document.getAnimations().filter((a) => a.playState === "running").length,
    }));
    expect(state).toEqual({ hidden: 0, animations: 0 });
  });
});

test.describe("motion allowed", () => {
  test.use({ reducedMotion: "no-preference" });

  test("the client marquee can be paused", async ({ page }) => {
    await page.goto("/");
    const toggle = page.locator("[data-marquee-toggle]");
    await expect(toggle).toHaveAccessibleName("Zatrzymaj animację logo klientów");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(toggle).toHaveAccessibleName("Wznów animację logo klientów");
    await expect(page.locator("[data-hero]")).toHaveAttribute("data-paused", "");
  });

  test("the reveal states end visible after scrolling", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/js-motion/);
    const card = page.locator(".work-card").first();
    await card.scrollIntoViewIfNeeded();
    await expect(card).toHaveCSS("opacity", "1");
  });
});
