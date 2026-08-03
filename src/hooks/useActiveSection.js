import { useEffect, useState } from "react";
import { supportsObserver } from "../lib/motion";

/**
 * Tracks which section sits under a band near the middle of the viewport, so
 * the navbar can highlight the matching link.
 *
 * @param {string[]} ids section ids in document order (pass a module-level
 *                       constant — a new array each render retears the effect)
 */
export default function useActiveSection(ids) {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!supportsObserver) return undefined;

    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return undefined;

    const visible = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        const first = ids.find((id) => visible.has(id));
        if (first) setActive(first);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
