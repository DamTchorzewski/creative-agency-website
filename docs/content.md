# Content

Where the texts and photos live and what is still a stand-in. How the page uses them: [frontend.md](frontend.md).

## Texts

Every text of the site is in `src/data/site.ts`, a typed file: the brand, contact details, navigation, client names,
manifesto, services, process steps, numbers, categories, the nine projects (with their case-study texts and results)
and the team. Components hold only short headings and labels.

- **A new project:** add an entry to `projects` (a unique kebab-case `slug`, one of the `categories`, a `tone` 1 to 9,
  an image in `src/assets/projects/`), then add its view-transition class to `src/styles/global.css`
  (`.vt-panel-<slug>`). `tests/site.test.ts` fails until both exist.
- **Numbers** are formatted with `Intl.NumberFormat("pl-PL")`; the project count under the filters uses
  `Intl.PluralRules` (`1 projekt`, `2 projekty`, `5 projektów`).
- Everything is fictional: Nord Studio, its clients, people, numbers, the address, `info@example.com` and
  `+48 111 111 111`.

## Photos

| Folder                 | What                                  | Source                                     |
| ---------------------- | ------------------------------------- | ------------------------------------------ |
| `src/assets/team/`     | four portraits                        | carried over from `digital-agency-website` |
| `src/assets/studio/`   | the office photo, wide and tall crops | carried over                               |
| `src/assets/projects/` | nine project covers, 370 × 294 px     | carried over                               |

Astro turns them into AVIF/WebP in several widths with hashed names at build time.

## Graphics still to come (as of 2026-11-21)

The site ships with stand-ins that look finished; these are the pieces that would lift it further, for a design chat:

| Piece          | Now                                        | Wanted                                                        |
| -------------- | ------------------------------------------ | ------------------------------------------------------------- |
| Hero visual    | CSS orbs and a grid                        | a 3D loop (Blender, WebM/MP4 with a poster) or a WebGL shader |
| Project covers | 370 px mock-ups on tinted panels           | nine covers of at least 1600 px in one art direction          |
| Service art    | generated SVG (`ServiceArt.astro`)         | 3D icons or short loops                                       |
| Brand          | typographic wordmark `nord.`, favicon `n.` | a designed logo, favicon set and Open Graph image             |
| Showreel       | none                                       | optional, 20–40 s                                             |
