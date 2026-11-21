import { expect, test } from "@playwright/test";

test("the portfolio filter shows one category and announces the count", async ({ page }) => {
  await page.goto("/#realizacje");
  const cards = page.locator(".work-card:visible");
  await expect(cards).toHaveCount(9);
  const design = page.getByRole("button", { name: /^Dizajn/ });
  await design.click();
  await expect(design).toHaveAttribute("aria-pressed", "true");
  await expect(cards).toHaveCount(2);
  await expect(page.locator("[data-filter-status]")).toHaveText("Pokazano 2 projekty");
  await page.getByRole("button", { name: /^Wszystkie/ }).click();
  await expect(cards).toHaveCount(9);
});

test("the theme toggle switches and remembers the theme", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.getByRole("button", { name: "Przełącz motyw jasny i ciemny" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("the skip link moves focus to the content", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard flow");
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Przejdź do treści" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
});

test("on a phone the menu opens as a dialog and a link closes it", async ({ page, isMobile }) => {
  test.skip(!isMobile, "phone layout only");
  await page.goto("/");
  await page.getByRole("button", { name: "Otwórz menu" }).click();
  const menu = page.getByRole("dialog", { name: "Menu" });
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: /Zespół/ }).click();
  await expect(menu).toBeHidden();
  await expect(page).toHaveURL(/#zespol$/);
});
