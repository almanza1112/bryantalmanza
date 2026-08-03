import { useEffect, useRef } from "react";
import { getRevealObserver, prefersReducedMotion, supportsObserver } from "../lib/motion";

/** Ref for any element carrying `data-reveal`; animates in on first view. */
export default function useReveal(delay = 0) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);

    if (!supportsObserver || prefersReducedMotion()) {
      // No entrance to play: drop the reveal styling immediately so it can
      // never shadow hover transforms.
      el.removeAttribute("data-reveal");
      return undefined;
    }

    const observer = getRevealObserver();
    observer.observe(el);
    return () => observer.unobserve(el);
  }, [delay]);

  return ref;
}
