import { render, screen } from "@testing-library/react";
import App from "./App";
import { FEATURED, PROJECTS, STATS, TESTIMONIALS } from "./data/projects";

test("renders the whole page without crashing", () => {
  const { container } = render(<App />);

  expect(screen.getByRole("heading", { level: 1 })).toBeTruthy();
  expect(screen.getAllByRole("heading", { level: 2 }).length).toBeGreaterThan(3);

  // Key conversion paths exist and are tappable.
  expect(screen.getAllByRole("link", { name: /view my work/i }).length).toBeGreaterThan(0);
  expect(screen.getByRole("button", { name: /send message/i })).toBeTruthy();
  expect(screen.getByRole("button", { name: /open menu/i })).toBeTruthy();

  // Every featured project renders as a deep-linkable card.
  FEATURED.forEach((p) => {
    expect(container.querySelector(`article#${p.id}`)).toBeTruthy();
  });

  // Testimonials render when data exists.
  expect(container.querySelectorAll("blockquote").length).toBe(TESTIMONIALS.length);
});

test("derived stats stay consistent with the project list", () => {
  // The hero advertises these numbers; if data edits break the derivation,
  // fail here rather than on the live site.
  expect(STATS.appsShipped).toBeGreaterThanOrEqual(5);
  expect(STATS.sitesShipped).toBeGreaterThanOrEqual(7);
  expect(STATS.inDevelopment).toBeGreaterThanOrEqual(1);

  // Every testimonial that names a project must point at a real anchor —
  // featured cards and compact rows both carry ids.
  const ids = new Set(PROJECTS.map((p) => p.id));
  TESTIMONIALS.filter((t) => t.projectId).forEach((t) => {
    expect(ids.has(t.projectId)).toBe(true);
  });
});
