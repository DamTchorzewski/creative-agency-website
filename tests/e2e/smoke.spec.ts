import { expect, test } from "@playwright/test";

import { ROUTES, scrollThrough, trackErrors } from "./helpers";

for (const route of ROUTES) {
  test(`${route} renders with no errors and no sideways scroll`, async ({ page }) => {
    const errors = trackErrors(page);
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    await scrollThrough(page);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
    errors.check();
  });
}

test("an unknown address answers 404", async ({ page }) => {
  const response = await page.goto("/nie-ma-takiej-strony/");
  expect(response?.status()).toBe(404);
});

test("the old portfolio address leads to the projects", async ({ page }) => {
  await page.goto("/portfolio.html");
  await expect(page).toHaveURL(/#realizacje$/);
});

test("every case study links to the next one", async ({ page }) => {
  await page.goto("/projekty/growing-business/");
  await page.getByRole("link", { name: /Następny projekt/ }).click();
  await expect(page).toHaveURL(/\/projekty\/technocrack\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Technocrack");
});
