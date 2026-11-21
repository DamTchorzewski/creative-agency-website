// The script every page loads: theme, header, menu and order dialogs, portfolio filter, forms. It is small; the
// animation code (GSAP, Lenis, the cursor) is imported later and only when the visitor allows motion.
import { filterProjects, projectCount, type Filter } from "@/lib/projects";
import { initForms } from "@/scripts/forms";

const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* ---------------------------------------------------------------- theme */
function initTheme() {
  const toggle = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  const current = () => root.dataset.theme ?? (systemDark.matches ? "dark" : "light");
  const sync = () => toggle?.setAttribute("aria-pressed", String(current() === "dark"));
  sync();
  systemDark.addEventListener("change", sync);
  toggle?.addEventListener("click", () => {
    const next = current() === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      sync();
    };
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage blocked: the choice lasts until the page is closed */
    }
    if (document.startViewTransition && !reduceMotion.matches) document.startViewTransition(apply);
    else apply();
  });
}

/* ---------------------------------------------------------------- header */
function initHeader() {
  const header = document.querySelector<HTMLElement>("[data-header]");
  if (!header) return;
  let lastY = window.scrollY;
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    header.toggleAttribute("data-scrolled", y > 24);
    // Hide while reading down, show on the way up; never hide near the top or while focus is inside.
    const hide = y > lastY && y > 400 && !header.contains(document.activeElement);
    header.toggleAttribute("data-hidden", hide);
    lastY = y;
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  header.addEventListener("focusin", () => header.removeAttribute("data-hidden"));
  update();

  // Mark the section in view in the main navigation.
  const links = [...document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]")];
  const sections = links
    .map((link) => document.getElementById(link.hash.slice(1)))
    .filter((el): el is HTMLElement => el !== null);
  if (!sections.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const link of links) {
          if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        }
      }
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------------------------- dialogs */
function initDialogs() {
  const menu = document.querySelector<HTMLDialogElement>("#menu");
  const order = document.querySelector<HTMLDialogElement>("#order");
  let opener: HTMLElement | null = null;

  const open = (dialog: HTMLDialogElement | null, from: HTMLElement) => {
    if (!dialog) return;
    opener = from;
    dialog.showModal();
  };
  // Focus goes back to the control that opened the dialog (a native dialog does it too, made explicit here
  // because the menu can hand over to the order dialog).
  for (const dialog of [menu, order]) {
    dialog?.addEventListener("close", () => {
      if (opener && !menu?.open && !order?.open) opener.focus();
    });
    // A click on the backdrop closes the dialog.
    dialog?.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  }

  document.querySelector("[data-menu-open]")?.addEventListener("click", (e) => {
    open(menu, e.currentTarget as HTMLElement);
  });
  document.querySelector("[data-menu-close]")?.addEventListener("click", () => menu?.close());
  menu?.querySelectorAll("[data-menu-link]").forEach((link) => {
    link.addEventListener("click", () => menu.close());
  });

  for (const button of document.querySelectorAll<HTMLElement>("[data-open-order]")) {
    button.addEventListener("click", () => {
      const from = menu?.open ? document.querySelector<HTMLElement>("[data-menu-open]") : button;
      if (from) open(order, from);
    });
  }
  document.querySelector("[data-order-close]")?.addEventListener("click", () => order?.close());
}

/* ---------------------------------------------------------------- portfolio filter */
function initFilter() {
  const buttons = [...document.querySelectorAll<HTMLButtonElement>("[data-filter]")];
  const cards = [...document.querySelectorAll<HTMLElement>(".work-card")];
  const status = document.querySelector<HTMLElement>("[data-filter-status]");
  if (!buttons.length) return;
  const items = cards.map((el) => ({
    el,
    category: el.dataset.category as Exclude<Filter, "all">,
  }));

  for (const button of buttons) {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter as Filter;
      const visible = new Set(filterProjects(items, filter).map((item) => item.el));
      const apply = () => {
        for (const b of buttons) b.setAttribute("aria-pressed", String(b === button));
        for (const card of cards) card.hidden = !visible.has(card);
        if (status) status.textContent = `Pokazano ${projectCount(visible.size)}`;
        window.dispatchEvent(new Event("layout-change"));
      };
      if (document.startViewTransition && !reduceMotion.matches)
        document.startViewTransition(apply);
      else apply();
    });
  }
}

/* ---------------------------------------------------------------- marquee pause (WCAG 2.2.2) */
function initMarquee() {
  const toggle = document.querySelector<HTMLButtonElement>("[data-marquee-toggle]");
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  const label = toggle?.querySelector(".sr-only");
  toggle?.addEventListener("click", () => {
    const paused = toggle.getAttribute("aria-pressed") !== "true";
    toggle.setAttribute("aria-pressed", String(paused));
    hero?.toggleAttribute("data-paused", paused);
    if (label)
      label.textContent = paused
        ? "Wznów animację logo klientów"
        : "Zatrzymaj animację logo klientów";
  });
}

/* ---------------------------------------------------------------- motion, on demand */
function loadMotion() {
  if (reduceMotion.matches) return;
  root.classList.add("js-motion");
  const start = () =>
    import("@/scripts/motion")
      .then((m) => m.initMotion())
      // If the chunk fails to load, show everything without motion rather than leave it hidden.
      .catch(() => root.classList.remove("js-motion"));
  // Start right away (the reveal states are already hidden), but never block the first paint.
  requestAnimationFrame(() => setTimeout(start, 0));
}

initTheme();
initHeader();
initDialogs();
initFilter();
initMarquee();
initForms();
loadMotion();
