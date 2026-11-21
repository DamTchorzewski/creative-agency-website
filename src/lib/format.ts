// Numbers through Intl, created once per module (reops/standards/accessibility.md, Locale).
const integer = new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 });

export function formatInteger(value: number): string {
  return integer.format(Math.round(value));
}
