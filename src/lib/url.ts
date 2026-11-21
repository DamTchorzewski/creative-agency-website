// Links inside the site must include the base path (the repository name on GitHub Pages).
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/** "/projekty/x/" -> "/creative-agency-website/projekty/x/" when the site is built for a project page. */
export function withBase(path: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
