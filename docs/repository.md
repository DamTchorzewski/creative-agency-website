# Repozytorium: opis, tagi i ustawienia

Rzeczy, które ustawia się na GitHubie ręcznie (nie da się ich zapisać w plikach repozytorium). Przegląd projektu:
[README](../README.md), wdrożenie: [deployment.md](deployment.md).

## Nazwa repozytorium: `creative-agency-website`

Standard nazw: `reops/standards/repo-names.md`. Nowe repozytorium od 2026-11-21: przebudowana wersja strony agencji
(marka **Nord Studio**). Poprzednia wersja, `digital-agency-website` (marka WebStudio), zostaje bez zmian pod swoim
adresem.

## Opis i tagi (About)

**Opis (Description):**

```text
Scroll-driven website of a fictional creative agency, built with Astro, Tailwind CSS and GSAP: case studies, light and dark theme.
```

**Strona (Website):**

```text
https://damtchorzewski.github.io/creative-agency-website/
```

**Tagi (Topics):**

```text
astro tailwindcss gsap scrolltrigger lenis agency-website scroll-animation responsive-design accessibility typescript github-pages
```

Z GitHub CLI (`gh`) jedną komendą:

```bash
gh repo edit DamTchorzewski/creative-agency-website --homepage "https://damtchorzewski.github.io/creative-agency-website/" --description "Scroll-driven website of a fictional creative agency, built with Astro, Tailwind CSS and GSAP: case studies, light and dark theme." --add-topic astro --add-topic tailwindcss --add-topic gsap --add-topic scrolltrigger --add-topic lenis --add-topic agency-website --add-topic scroll-animation --add-topic responsive-design --add-topic accessibility --add-topic typescript --add-topic github-pages
```

## Ustawienia do włączenia

| Gdzie (GitHub)                                  | Co ustawić                                                |
| ----------------------------------------------- | --------------------------------------------------------- |
| Settings → Pages                                | źródło: **GitHub Actions** (przed pierwszym release)      |
| Settings → Environments → `github-pages`        | Deployment branches: tylko `main`                         |
| Settings → General → Pull Requests              | rebase merging i merge commits włączone, squash wyłączony |
| Settings → Rules → Rulesets → `main`, `develop` | zablokuj force push i usuwanie gałęzi                     |
| Settings → Code security                        | Dependabot alerts i security updates, secret scanning     |
