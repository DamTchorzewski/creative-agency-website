import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import astro from "eslint-plugin-astro";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
  globalIgnores(["dist", ".astro", ".scratch", "node_modules"]),
  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  // accessibility rules for the templates
  astro.configs["jsx-a11y-recommended"],
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      // A scrollable region (the team row on phones) must be reachable with the keyboard (axe:
      // scrollable-region-focusable), so role="region" may take tabindex="0".
      "astro/jsx-a11y/no-noninteractive-tabindex": ["error", { roles: ["tabpanel", "region"] }],
    },
  },
);
