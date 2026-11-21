// Scroll-driven motion: Lenis smooth scrolling, GSAP ScrollTrigger scenes, split headings, the cursor bubble and
// magnetic buttons. Loaded by main.ts only with prefers-reduced-motion: no-preference; nothing here is needed to
// read or use the page.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

import { formatInteger } from "@/lib/format";

gsap.registerPlugin(ScrollTrigger, SplitText);

const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const $$ = <T extends Element = HTMLElement>(selector: string, root: ParentNode = document) => [
  ...root.querySelectorAll<T>(selector),
];

function smoothScroll() {
  if (!finePointer) return;
  const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -80 }, autoRaf: false });
  document.documentElement.classList.add("has-lenis");
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Stop the page from scrolling behind an open dialog.
  for (const dialog of $$<HTMLDialogElement>("dialog")) {
    dialog.setAttribute("data-lenis-prevent", "");
    new MutationObserver(() => (dialog.open ? lenis.stop() : lenis.start())).observe(dialog, {
      attributes: true,
      attributeFilter: ["open"],
    });
  }
}

function reveals() {
  ScrollTrigger.batch("[data-reveal]", {
    start: "top 88%",
    once: true,
    onEnter: (batch) =>
      batch.forEach((el, i) => {
        (el as HTMLElement).style.transitionDelay = `${i * 0.08}s`;
        el.classList.add("is-in");
      }),
  });
}

function splitHeadings() {
  for (const el of $$("[data-split]")) {
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        el.classList.add("is-split");
        return gsap.from(self.lines, {
          yPercent: 110,
          rotate: 2,
          duration: 1.2,
          stagger: 0.09,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      },
    });
  }
}

function hero() {
  const section = document.querySelector<HTMLElement>("[data-hero]");
  if (!section) return;
  const orbs = $$("[data-orb]", section);
  gsap.to(orbs, {
    yPercent: (i) => 25 + i * 15,
    ease: "none",
    scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
  });
  if (!finePointer) return;
  const movers = orbs.map((orb, i) => ({
    x: gsap.quickTo(orb, "x", { duration: 1.6 + i * 0.4, ease: "power3.out" }),
    y: gsap.quickTo(orb, "y", { duration: 1.6 + i * 0.4, ease: "power3.out" }),
    depth: (i + 1) * 18,
  }));
  section.addEventListener("pointermove", (event) => {
    const nx = event.clientX / window.innerWidth - 0.5;
    const ny = event.clientY / window.innerHeight - 0.5;
    for (const m of movers) {
      m.x(nx * m.depth * -2);
      m.y(ny * m.depth * -2);
    }
  });
}

function manifesto() {
  const text = document.querySelector("[data-manifesto]");
  if (!text) return;
  const words = $$(".word", text);
  ScrollTrigger.create({
    trigger: text,
    start: "top 78%",
    end: "bottom 45%",
    onUpdate: ({ progress }) => {
      const lit = Math.round(progress * words.length);
      words.forEach((word, i) => word.classList.toggle("lit", i < lit));
    },
  });

  const figure = document.querySelector<HTMLElement>("[data-studio]");
  if (!figure) return;
  gsap.fromTo(
    figure,
    { clipPath: "inset(10% 7% 10% 7% round 2.5rem)" },
    {
      clipPath: "inset(0% 0% 0% 0% round 2rem)",
      ease: "none",
      scrollTrigger: { trigger: figure, start: "top 95%", end: "top 25%", scrub: true },
    },
  );
  gsap.fromTo(
    $$("img", figure),
    { scale: 1.25 },
    {
      scale: 1,
      ease: "none",
      scrollTrigger: { trigger: figure, start: "top bottom", end: "bottom top", scrub: true },
    },
  );
}

function services() {
  const cards = $$("[data-service-card]");
  cards.forEach((card, i) => {
    const next = cards[i + 1];
    if (next) {
      // The card underneath shrinks and darkens (an overlay, not opacity: a see-through card would show the one
      // below it).
      const behind = { trigger: next, start: "top bottom", end: "top 30%", scrub: true };
      gsap.to(card, { scale: 0.93, ease: "none", scrollTrigger: behind });
      gsap.to(card.querySelector("[data-service-dim]"), {
        opacity: 0.65,
        ease: "none",
        scrollTrigger: behind,
      });
    }
    gsap.fromTo(
      $$("[data-art-float]", card),
      { yPercent: 12 },
      {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
    gsap.fromTo(
      $$("[data-art-float-alt]", card),
      { yPercent: -10 },
      {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });
}

function process(mm: gsap.MatchMedia) {
  const section = document.querySelector<HTMLElement>("[data-process]");
  const viewport = section?.querySelector<HTMLElement>("[data-process-viewport]");
  const track = section?.querySelector<HTMLElement>("[data-process-track]");
  if (!section || !viewport || !track) return;

  mm.add("(min-width: 72rem)", () => {
    section.classList.add("process-pinned");
    $$("[data-reveal]", track).forEach((step) => step.classList.add("is-in"));
    const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
    gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "bottom bottom",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });
    return () => section.classList.remove("process-pinned");
  });
}

function counters() {
  for (const el of $$("[data-count]")) {
    const target = Number(el.dataset.count);
    const state = { value: 0 };
    el.textContent = formatInteger(0);
    gsap.to(state, {
      value: target,
      duration: 1.8,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => {
        el.textContent = formatInteger(state.value);
      },
    });
  }
}

function work() {
  for (const card of $$(".work-card")) {
    const layer = card.querySelector("[data-parallax]");
    if (!layer) continue;
    gsap.fromTo(
      layer,
      { yPercent: 7 },
      {
        yPercent: -7,
        ease: "none",
        scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  }
  window.addEventListener("layout-change", () => ScrollTrigger.refresh());
}

function footer() {
  const mark = document.querySelector("[data-footer-mark]");
  const footerEl = document.querySelector("[data-footer]");
  if (!mark || !footerEl) return;
  gsap.from(mark, {
    yPercent: 45,
    opacity: 0.2,
    ease: "none",
    scrollTrigger: { trigger: footerEl, start: "top bottom", end: "bottom bottom", scrub: true },
  });
}

function cursor() {
  const bubble = document.querySelector<HTMLElement>(".cursor");
  if (!finePointer || !bubble) return;
  document.documentElement.classList.add("has-cursor");
  const x = gsap.quickTo(bubble, "x", { duration: 0.45, ease: "power3.out" });
  const y = gsap.quickTo(bubble, "y", { duration: 0.45, ease: "power3.out" });
  window.addEventListener("pointermove", (event) => {
    x(event.clientX);
    y(event.clientY);
    const target = (event.target as Element | null)?.closest("[data-cursor='view']");
    if (target) {
      bubble.dataset.state = "view";
      bubble.setAttribute("data-visible", "");
    } else {
      bubble.removeAttribute("data-visible");
      delete bubble.dataset.state;
    }
  });
  document.addEventListener("pointerleave", () => bubble.removeAttribute("data-visible"));
}

function magnetic() {
  if (!finePointer) return;
  for (const el of $$("[data-magnetic]")) {
    const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    el.addEventListener("pointermove", (event) => {
      const box = el.getBoundingClientRect();
      x((event.clientX - box.left - box.width / 2) * 0.28);
      y((event.clientY - box.top - box.height / 2) * 0.32);
    });
    el.addEventListener("pointerleave", () => {
      x(0);
      y(0);
    });
  }
}

export function initMotion() {
  const mm = gsap.matchMedia();
  smoothScroll();
  splitHeadings();
  reveals();
  hero();
  manifesto();
  services();
  process(mm);
  counters();
  work();
  footer();
  cursor();
  magnetic();
  // Fonts and lazy images change the layout after the first measurement.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener("load", () => ScrollTrigger.refresh());
}
