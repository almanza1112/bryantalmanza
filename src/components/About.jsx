import React from "react";
import Reveal from "./ui/Reveal";

const About = () => (
  <section id="about" className="section-auto">
    <div className="shell">
      <Reveal variant="fade" className="eyebrow">
        <span>01 — About</span>
      </Reveal>
      <Reveal as="h2" delay={80} className="section-title">
        A developer you can trust
      </Reveal>

      {/* The old markup forced grid-cols-2 at every width with an empty second
          column, so the heading sat in half the screen on phones for no reason. */}
      <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-2 md:gap-14">
        <Reveal variant="left" className="text-xl font-semibold leading-snug sm:text-2xl">
          <p>
            I build software that has to hold up in production — not demos, not
            prototypes.
          </p>
        </Reveal>

        <Reveal delay={120} className="space-y-5 leading-relaxed text-muted">
          <p>
            Most of my work lives somewhere between the backend and the app: APIs,
            auth, payments, and the infrastructure underneath them. Recently that
            has meant multi-tenant platforms on AWS, HIPAA-compliant health
            products, and native and cross-platform apps that made it to the App
            Store.
          </p>
          <p>
            I care about the parts users never see. Whether a payout can be
            double-spent, whether a session survives a dropped connection, whether
            the thing still works on a three-year-old phone.
          </p>
          <p>
            I work with businesses establishing themselves online and with founders
            trying to get a first version into people's hands. If that sounds like
            you, I would like to hear about it.
          </p>
        </Reveal>
      </div>
    </div>
  </section>
);

export default About;
