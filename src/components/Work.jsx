import React, { useCallback, useEffect, useState } from "react";
import { FiChevronDown, FiExternalLink, FiGithub } from "react-icons/fi";
import Reveal from "./ui/Reveal";
import { FEATURED, MORE_WORK } from "../data/projects";
import { SITE } from "../data/site";

const isCode = (label) => /code|github/i.test(label);

/**
 * Featured project card.
 *
 * The old cards put the title and DEMO/CODE buttons inside
 * `opacity-0 group-hover:opacity-100`, so on a phone — where there is no hover —
 * every project was invisible and its links were untappable while still being
 * hit-testable. Everything essential is visible by default now; hover only adds
 * a subtle image scale.
 */
const WorkCard = ({ project, open, onToggle, index }) => {
  const detailId = `${project.id}-detail`;
  const hasDetail = Boolean(project.detail?.length || project.highlights?.length);

  return (
    <Reveal
      as="article"
      id={project.id}
      delay={index * 60}
      className="work-card card card-hover"
    >
      <div className="grid items-start md:grid-cols-2">
        {/* Sticky so the screenshot follows the reader down a long expanded
            panel instead of leaving dead space beside it. */}
        <div className="p-4 md:sticky md:top-24 md:p-5">
          {project.image ? (
            <div className="work-media">
              <img
                src={project.image.small}
                srcSet={`${project.image.small} 700w, ${project.image.large} 1400w`}
                sizes="(min-width: 768px) 520px, 100vw"
                width={1400}
                height={875}
                loading="lazy"
                decoding="async"
                alt={project.image.alt}
              />
            </div>
          ) : (
            <div className="work-media work-media--empty">
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                Screenshot coming soon
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col p-6 pt-2 md:p-8 md:pl-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip chip-status">{project.status}</span>
            <span className="chip">{project.year}</span>
          </div>

          <h3 className="mt-4 text-2xl font-bold">{project.name}</h3>
          {project.role ? (
            <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-coral-text">
              {project.role}
            </p>
          ) : null}
          <p className="mt-4 leading-relaxed text-muted">{project.oneLiner}</p>

          {hasDetail ? (
            <>
              <button
                type="button"
                onClick={() => onToggle(project.id)}
                aria-expanded={open}
                aria-controls={detailId}
                aria-label={`${open ? "Show less about" : "Read more about"} ${project.name}`}
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold transition-colors hover:border-coral hover:text-coral-text"
              >
                {open ? "Show less" : "Read more"}
                <FiChevronDown
                  aria-hidden="true"
                  size={16}
                  className="transition-transform duration-300"
                  style={{ transform: open ? "rotate(180deg)" : "none" }}
                />
              </button>

              {/* Stays in the DOM when collapsed so it remains indexable;
                  `visibility: hidden` keeps its links out of the tab order. */}
              <div className="expand" data-open={open} id={detailId}>
                <div className="expand-body">
                  <div className="pt-5">
                    {project.detail?.map((para) => (
                      <p key={para.slice(0, 40)} className="mb-4 leading-relaxed text-muted">
                        {para}
                      </p>
                    ))}

                    {project.highlights?.length ? (
                      <ul className="mt-1 space-y-2.5">
                        {project.highlights.map((h) => (
                          <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                            <span
                              className="mt-2 h-px w-3 shrink-0 bg-coral"
                              aria-hidden="true"
                            />
                            {h}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </div>
            </>
          ) : null}

          {project.stack?.length ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech} className="chip">
                  {tech}
                </li>
              ))}
            </ul>
          ) : null}

          {project.links?.length ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold link-underline"
                >
                  {isCode(link.label) ? (
                    <FiGithub aria-hidden="true" size={15} />
                  ) : (
                    <FiExternalLink aria-hidden="true" size={15} />
                  )}
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
};

const Work = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = useCallback((id) => {
    setOpenId((current) => (current === id ? null : id));
  }, []);

  // Mirror the open card into the URL so a single project can be linked
  // directly. Done as an effect rather than inside the state updater — React
  // updaters must stay pure (StrictMode double-invokes them).
  useEffect(() => {
    if (openId === null) return; // don't clobber the hash before first read
    window.history.replaceState(null, "", `#${openId}`);
  }, [openId]);

  // Open whichever project the URL names — on load, and again whenever an
  // in-page link (e.g. a testimonial) changes the hash after mount.
  useEffect(() => {
    const readHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && FEATURED.some((p) => p.id === hash)) setOpenId(hash);
    };
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, []);

  return (
    <section id="work" className="section-auto section--raised">
      <div className="shell">
        <Reveal variant="fade" className="eyebrow">
          <span>03 — Work</span>
        </Reveal>
        <Reveal as="h2" delay={80} className="section-title">
          Selected projects
        </Reveal>
        <Reveal as="p" delay={150} className="section-lead">
          A few things I have built and shipped. Open any of them for the detail, or
          browse the rest on{" "}
          <a
            className="link-underline font-semibold text-coral-text"
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </Reveal>

        <div className="mt-12 flex flex-col gap-5 md:mt-16">
          {FEATURED.map((project, i) => (
            <WorkCard
              key={project.id}
              project={project}
              index={i}
              open={openId === project.id}
              onToggle={toggle}
            />
          ))}
        </div>

        {MORE_WORK.length ? (
          <div className="mt-16 md:mt-20">
            <Reveal as="h3" variant="fade" className="text-xl font-bold">
              More work
            </Reveal>

            <ul className="mt-6">
              {MORE_WORK.map((project, i) => (
                // id makes compact rows deep-linkable too — testimonials
                // reference tier-2 projects like #djohwoww.
                <Reveal as="li" id={project.id} key={project.id} delay={i * 50} className="work-row">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-semibold">{project.name}</span>
                      <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">
                        {project.year}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{project.oneLiner}</p>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-4">
                    {project.stack?.slice(0, 3).map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                    {project.links?.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} — ${link.label}`}
                        className="text-muted transition-colors hover:text-coral-text"
                      >
                        {isCode(link.label) ? (
                          <FiGithub size={17} />
                        ) : (
                          <FiExternalLink size={17} />
                        )}
                      </a>
                    ))}
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Work;
