import { expect, type Page } from "@playwright/test";

/** Every page template: home, a case study and the 404 page. */
export const ROUTES = ["/", "/projekty/technocrack/", "/404.html"] as const;

/** Fails the test on any console error (a CSP violation shows up as one). */
export function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return {
    check: () => expect(errors, errors.join("\n")).toEqual([]),
  };
}

/** Scrolls to the bottom in steps so lazy images and in-view states settle, then back to the top. */
export async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    window.scrollTo(0, 0);
  });
}
