// Astro configuration. SITE_URL is the only environment variable (see .env.example): the deploy workflow sets it
// from the Pages settings, so the build works under https://<owner>.github.io/<repo>/ without editing this file.
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const siteUrl = process.env.SITE_URL ? new URL(process.env.SITE_URL) : undefined;

export default defineConfig({
  // Origin for canonical and Open Graph URLs; the path (a project page on github.io) becomes the base.
  site: siteUrl?.origin,
  base: siteUrl ? siteUrl.pathname.replace(/\/$/, "") || "/" : "/",
  trailingSlash: "always",
  build: { assets: "assets" },
  devToolbar: { enabled: false },
  // No Markdown code blocks on the site; Shiki would need inline styles, which the CSP forbids.
  markdown: { syntaxHighlight: false },
  // GitHub Pages cannot send headers, so the policy goes into a <meta> tag with a hash of every script and style.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "form-action 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "upgrade-insecure-requests",
      ],
    },
  },
  vite: { plugins: [tailwindcss()] },
});
