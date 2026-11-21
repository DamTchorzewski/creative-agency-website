# Front end

How the page is built: the scroll story, the design tokens, the motion and what happens without it. The texts are
edited as described in [content.md](content.md); releasing is in [deployment.md](deployment.md).

## The scroll story

`src/pages/index.astro` puts the sections in this order; each is one component in `src/components/`.

| #   | Section (anchor)         | What happens on scroll (motion allowed)                                                                                                    |
| --- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Hero                     | the headline rises word by word (CSS only, `RiseText.astro`); the orbs drift with scroll and the mouse; client marquee with a pause button |
| 2   | Manifesto (`#manifest`)  | the words light up one by one (scrubbed); the studio photo opens from a rounded inset to full width                                        |
| 3   | Services (`#uslugi`)     | three sticky cards stack; the card underneath shrinks and darkens; the art moves in parallax                                               |
| 4   | Process (`#proces`)      | from 72 rem wide the section pins and the four steps scroll sideways; narrower it is a grid                                                |
| 5   | Numbers                  | counters run once when they come into view (the real value is in a screen-reader text)                                                     |
| 6   | Projects (`#realizacje`) | filters (a view transition between states), cards with parallax; a card morphs into its case study                                         |
| 7   | Team (`#zespol`)         | a swipeable row on phones (a focusable region), a grid with a colour reveal on hover on desktop                                            |
| 8   | Contact (`#kontakt`)     | the form; the footer wordmark rises as the footer comes in                                                                                 |

Section headings below the first screen are split into lines by GSAP SplitText (`data-split`) and rise when they come
into view. Other blocks with `data-reveal` fade up.

## Tokens and themes

All colours are tokens in `src/styles/global.css` (`--bg`, `--ink`, `--muted`, `--accent`, …), each written with
`light-dark()` and mapped to Tailwind colours with `@theme inline` (`bg-bg-2`, `text-muted`, `border-line`). The theme
follows the system; the toggle sets `data-theme` on `<html>` and stores the choice in `localStorage`; an inline script in
the head applies it before the first paint. The project panels take their hue from `data-tone` (1 to 9).

Fonts: Geist Variable (text and display) and Instrument Serif italic (the accent words), both self-hosted through
fontsource; the Latin Geist file is preloaded and both have metric-matched fallbacks.

## Motion and its fallbacks

| Piece                                                   | Where                   | Loaded when                                                             |
| ------------------------------------------------------- | ----------------------- | ----------------------------------------------------------------------- |
| theme, header, dialogs, filter, forms                   | `src/scripts/main.ts`   | always (small)                                                          |
| GSAP scenes, SplitText                                  | `src/scripts/motion.ts` | `prefers-reduced-motion: no-preference`, imported after the first paint |
| Lenis smooth scrolling, cursor bubble, magnetic buttons | `motion.ts`             | the same, and a fine pointer with hover (a mouse)                       |
| hero headline, progress bar, marquee, orbit text        | CSS                     | inside `@media (prefers-reduced-motion: no-preference)`                 |

- The hidden reveal states exist only under `html.js-motion`, which `main.ts` sets just before it imports `motion.ts`;
  if the import fails the class is removed, so no content can stay hidden.
- With reduced motion nothing moves and nothing is hidden (`tests/e2e/reduced-motion.spec.ts`).
- Anything that moves by itself (the marquee and the orbit text) has a pause button (WCAG 2.2.2).
- View transitions (`@view-transition`, `startViewTransition`) are switched off with reduced motion.

## Content Security Policy

`astro.config.mjs` turns on `security.csp`: Astro writes a `<meta http-equiv="content-security-policy">` with a hash of
every script and the directives listed there. So no `style="…"` attribute may appear in the markup (the panel hue, the
stack offset and the view-transition names are classes); scripts set styles through the CSSOM, which the policy allows.
The e2e tests fail on any console error, which includes a CSP violation.
