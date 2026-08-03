import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { HiOutlineMail } from "react-icons/hi";
import Reveal from "./ui/Reveal";
import { SITE } from "../data/site";
import { STATS } from "../data/projects";

const Home = () => (
  <section id="top" className="section overflow-hidden">
    <div className="shell">
      <Reveal variant="fade" className="eyebrow">
        <span>{SITE.location}</span>
      </Reveal>

      <Reveal as="h1" delay={80} className="mt-6 text-4xl font-bold sm:text-6xl lg:text-7xl">
        Bryant Almanza
      </Reveal>

      <Reveal
        as="p"
        delay={150}
        className="mt-3 text-2xl font-semibold text-muted sm:text-4xl lg:text-5xl"
      >
        I build software that ships.
        <span className="caret" aria-hidden="true" />
      </Reveal>

      <Reveal as="p" delay={220} className="mt-7 max-w-xl leading-relaxed text-muted">
        {/* "specialicialize" was a live typo here. */}
        I specialize in designing and building web and mobile applications — from
        multi-tenant platforms on AWS to apps on the App Store. Have a look around,
        check out my work, or send me an email.
      </Reveal>

      <Reveal delay={300} className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <a href="#work" className="btn btn-primary">
          View my work
          <HiArrowNarrowRight aria-hidden="true" size={18} />
        </a>
        <a href="#contact" className="btn btn-ghost">
          Get in touch
          <HiOutlineMail aria-hidden="true" size={18} />
        </a>
      </Reveal>

      {/* Counted from the project list, so these can never contradict the work
          shown further down the page. */}
      <Reveal
        delay={380}
        className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-8"
      >
        {[
          { value: STATS.appsShipped, label: "Apps on the App Store" },
          { value: STATS.sitesShipped, label: "Websites shipped" },
          { value: STATS.inDevelopment, label: "In development" },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl font-bold text-coral sm:text-4xl">{stat.value}</p>
            <p className="mt-1.5 font-mono text-[0.62rem] uppercase leading-snug tracking-[0.14em] text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </Reveal>
    </div>
  </section>
);

export default Home;
