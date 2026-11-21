# Deployment

The site is static (`pnpm build` writes `dist/`) and is published to GitHub Pages by `.github/workflows/deploy.yml`.
How the page is built: [frontend.md](frontend.md).

## What runs when

| Event             | What happens                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| pull request      | `ci.yml`: format, lint, types, unit tests, `pnpm audit --prod`, then e2e (desktop + mobile)             |
| push to `develop` | the same CI without e2e (the pull request ran it), the build kept as an artifact for 14 days; no deploy |
| push to `main`    | the full CI, build, publish to GitHub Pages, then `pnpm health` against the live site                   |
| run by hand       | Actions → Build & Deploy (or CI) → Run workflow, from any branch (only `main` publishes)                |

A change to the documentation only (`*.md`, `docs/`, `LICENSE`, `.env.example`) starts nothing.

## First deploy

1. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
2. Settings → Environments → `github-pages` → Deployment branches: **Selected branches**, `main` only.
3. Release `develop` into `main` (the release PR). The workflow builds, publishes and checks
   `https://damtchorzewski.github.io/creative-agency-website/`.

The workflow reads the address from the Pages settings and passes it to the build as `SITE_URL`, so the base path, the
canonical link and the Open Graph URL are right without editing a file. A custom domain: add it in Settings → Pages
and set the repository variable `SITE_URL` to the full address.

## Health check

`pnpm health` (`scripts/health.mjs`) requests the home page and a case study (200 and a `<main>`), the old
`portfolio.html` redirect (200) and a missing page (404). It is read-only and has no dependencies:
`SITE_URL=<address> pnpm health`.

## Before a release

- `pnpm check` and `pnpm test:e2e` green; `pnpm audit --prod` clean.
- Lighthouse (mobile) on the home page: Performance ≥ 95, the rest 100 (`reops/standards/performance.md`).

## Pausing and rollback

Pause: Actions → Build & Deploy → ⋯ → Disable workflow. Rollback: revert the change on a working branch and release
it, or re-run an earlier successful run of Build & Deploy on `main`.
