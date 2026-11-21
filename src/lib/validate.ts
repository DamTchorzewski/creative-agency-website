// Validation of the two forms, shared by the page script and the unit tests. Messages are Polish, like the page.
export interface OrderValues {
  name: string;
  email: string;
  consent: boolean;
}

export type Errors<T> = Partial<Record<keyof T, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEmail(email: string): string | undefined {
  const value = email.trim();
  if (!value) return "Podaj adres e-mail.";
  if (!EMAIL.test(value)) return "Sprawdź adres e-mail, na przykład jan@firma.pl.";
  return undefined;
}

export function validateOrder(values: OrderValues): Errors<OrderValues> {
  const errors: Errors<OrderValues> = {};
  if (values.name.trim().length < 2) errors.name = "Podaj imię (co najmniej 2 litery).";
  const email = validateEmail(values.email);
  if (email) errors.email = email;
  if (!values.consent) errors.consent = "Zaznacz zgodę, żebyśmy mogli odpowiedzieć.";
  return errors;
}

/** Bots fill the hidden field or send the form faster than a person can type. */
export function looksLikeBot(honeypot: string, startedAt: number, now: number): boolean {
  return honeypot.trim() !== "" || now - startedAt < 2500;
}
