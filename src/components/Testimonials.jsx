import React from "react";
import { FiExternalLink } from "react-icons/fi";
import Reveal from "./ui/Reveal";
import { TESTIMONIALS } from "../data/projects";
import { SITE } from "../data/site";

/**
 * Renders nothing when TESTIMONIALS is empty, so the page stays correct rather
 * than showing an empty shell or placeholder quotes.
 */
const Testimonials = () => {
  if (!TESTIMONIALS.length) return null;

  return (
    <section id="testimonials" className="section-auto">
      <div className="shell">
        <Reveal variant="fade" className="eyebrow">
          <span>04 — Testimonials</span>
        </Reveal>
        <Reveal as="h2" delay={80} className="section-title">
          What clients say
        </Reveal>
        <Reveal as="p" delay={150} className="section-lead">
          Reviews from clients I have worked with, in their own words.
        </Reveal>

        <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              as="li"
              key={t.quote.slice(0, 40)}
              delay={i * 80}
              className="card card-hover p-6 sm:p-8"
            >
              <figure className="flex h-full flex-col">
              <span
                aria-hidden="true"
                className="font-sans text-5xl font-bold leading-none text-coral"
              >
                &ldquo;
              </span>

              <blockquote className="-mt-3 leading-relaxed">{t.quote}</blockquote>

              <figcaption className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line pt-5 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted">
                <span className="text-coral-text">{t.client}</span>
                {t.project ? (
                  <>
                    <span aria-hidden="true">·</span>
                    {/* Deep-links straight to that project's card. */}
                    <a href={`#${t.projectId}`} className="link-underline">
                      {t.project}
                    </a>
                  </>
                ) : null}
              </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120} className="mt-8">
          <a
            href={SITE.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold link-underline"
          >
            See more on Upwork
            <FiExternalLink aria-hidden="true" size={15} />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default Testimonials;
