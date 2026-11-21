import { expect, test } from "@playwright/test";

import { trackErrors } from "./helpers";

test("the contact form explains errors and confirms a valid send", async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto("/#kontakt");
  const form = page.locator("#kontakt form");
  const send = form.getByRole("button", { name: /Wyślij zapytanie/ });

  await send.click();
  const name = form.getByLabel(/Imię/);
  await expect(name).toHaveAttribute("aria-invalid", "true");
  await expect(name).toBeFocused();
  await expect(form.getByText("Podaj imię (co najmniej 2 litery).")).toBeVisible();
  await expect(form.getByRole("status")).toHaveText("Popraw zaznaczone pola.");

  await name.fill("Jan");
  await expect(name).not.toHaveAttribute("aria-invalid", "true");
  await form.getByLabel(/E-mail/).fill("jan@firma.pl");
  await form.getByLabel(/Zgadzam się/).check();
  await page.waitForTimeout(2600); // the minimum fill time of the bot check
  await send.click();
  await expect(form.getByRole("status")).toContainText("strona demonstracyjna");
  await expect(name).toHaveValue("");
  errors.check();
});

test("the order dialog opens from the hero and Escape returns focus", async ({ page }) => {
  await page.goto("/");
  const opener = page.locator("[data-hero]").getByRole("button", { name: /Zamów usługę/ });
  await opener.click();
  const dialog = page.getByRole("dialog", { name: "Opowiedzcie nam o projekcie" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByLabel(/Imię/)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
});

test("the newsletter form needs a valid address", async ({ page }) => {
  await page.goto("/");
  const form = page.locator("footer form");
  const email = form.getByLabel("Twój e-mail");
  await email.fill("jan@");
  await form.getByRole("button", { name: "Zapisz się" }).click();
  await expect(form.getByText(/Sprawdź adres e-mail/)).toBeVisible();
  await email.fill("jan@firma.pl");
  await form.getByRole("button", { name: "Zapisz się" }).click();
  await expect(form.getByRole("status")).toContainText("strona demonstracyjna");
});
