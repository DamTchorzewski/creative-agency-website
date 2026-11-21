// The order and newsletter forms: validation with messages next to the fields, focus on the first error and an
// announced status. The site has no backend, so a valid form only shows that this is a demo.
import { looksLikeBot, validateEmail, validateOrder } from "@/lib/validate";

function setError(form: HTMLFormElement, name: string, message: string | undefined) {
  const field = form.elements.namedItem(name);
  if (!(field instanceof HTMLInputElement)) return;
  const error = document.getElementById(`${field.id}-error`);
  if (message) field.setAttribute("aria-invalid", "true");
  else field.removeAttribute("aria-invalid");
  if (error) error.textContent = message ?? "";
}

function value(form: HTMLFormElement, name: string): string {
  const field = form.elements.namedItem(name);
  return field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement
    ? field.value
    : "";
}

function checked(form: HTMLFormElement, name: string): boolean {
  const field = form.elements.namedItem(name);
  return field instanceof HTMLInputElement && field.checked;
}

export function initForms() {
  for (const form of document.querySelectorAll<HTMLFormElement>("form[data-form]")) {
    const kind = form.dataset.form;
    const status = form.querySelector<HTMLElement>("[data-form-status]");
    const startedAt = Date.now();

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (status) status.textContent = "";

      const errors: Record<string, string | undefined> =
        kind === "order"
          ? validateOrder({
              name: value(form, "name"),
              email: value(form, "email"),
              consent: checked(form, "consent"),
            })
          : { email: validateEmail(value(form, "email")) };

      const names = kind === "order" ? ["name", "email", "consent"] : ["email"];
      for (const name of names) setError(form, name, errors[name]);

      const first = names.find((name) => errors[name]);
      if (first) {
        const field = form.elements.namedItem(first);
        if (field instanceof HTMLElement) field.focus();
        if (status) status.textContent = "Popraw zaznaczone pola.";
        return;
      }

      if (kind === "order" && looksLikeBot(value(form, "website"), startedAt, Date.now())) return;

      form.reset();
      if (status) {
        status.textContent =
          kind === "order"
            ? "Dziękujemy! To strona demonstracyjna, więc zapytanie nie zostało nigdzie wysłane."
            : "Dziękujemy! To strona demonstracyjna, więc adres nie został zapisany.";
      }
    });

    // Clear a field's message as soon as it is fixed.
    form.addEventListener("input", (event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement && target.getAttribute("aria-invalid") === "true") {
        setError(form, target.name, undefined);
      }
    });
  }
}
