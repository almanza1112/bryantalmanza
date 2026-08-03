/**
 * Shared motion utilities.
 *
 * Everything degrades gracefully: with no IntersectionObserver, or when the
 * visitor asks for reduced motion, elements reveal immediately rather than
 * being left invisible.
 */

export function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const supportsObserver =
  typeof window !== "undefined" && "IntersectionObserver" in window;

/** One observer shared by every reveal, rather than one per element. */
let revealObserver = null;

export function getRevealObserver() {
  if (revealObserver || !supportsObserver) return revealObserver;

  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
        // Once the entrance finishes, drop the reveal styles entirely —
        // [data-reveal].is-visible's `transform: none` out-cascades hover
        // transforms (.card-hover, .skill-tile) and would disable them.
        window.setTimeout(() => {
          entry.target.removeAttribute("data-reveal");
          entry.target.classList.remove("is-visible");
          entry.target.style.removeProperty("--reveal-delay");
        }, 1600);
      });
    },
    { rootMargin: "0px 0px -60px 0px", threshold: 0 }
  );

  return revealObserver;
}

/** Runs `fn` at most once per animation frame. */
export function rafThrottle(fn) {
  let frame = null;
  return (...args) => {
    if (frame !== null) return;
    frame = window.requestAnimationFrame(() => {
      frame = null;
      fn(...args);
    });
  };
}

export const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

/** Sections carry `scroll-margin-top`, so this clears the fixed navbar. */
export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
}
