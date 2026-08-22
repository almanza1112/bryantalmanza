import React, { useEffect, useRef, useState } from "react";
import { FiAlertCircle, FiCheck, FiLoader, FiSend } from "react-icons/fi";
import Reveal from "./ui/Reveal";
import { SITE } from "../data/site";
import { track } from "../lib/analytics";

const STATUS = { IDLE: "idle", SENDING: "sending", SENT: "sent", ERROR: "error" };

/** Named so bots fill it, stripped before submit so Getform never sees it. */
const HONEYPOT = "company_website";

/**
 * The form previously did a native POST straight to Getform, which navigated
 * the visitor away to a third-party confirmation page and lost them. It submits
 * over fetch now and confirms in place.
 */
const Contact = () => {
  const formRef = useRef(null);
  const sentHeadingRef = useRef(null);
  const [status, setStatus] = useState(STATUS.IDLE);

  // The success view replaces the focused form, which screen readers would
  // otherwise experience as focus silently vanishing. Land it on the heading.
  useEffect(() => {
    if (status === STATUS.SENT) sentHeadingRef.current?.focus();
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form || status === STATUS.SENDING) return;

    const data = new FormData(form);
    if (data.get(HONEYPOT)) {
      setStatus(STATUS.SENT);
      return;
    }
    data.delete(HONEYPOT);

    setStatus(STATUS.SENDING);
    try {
      const res = await fetch(SITE.formEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus(STATUS.SENT);
      track("contact_submit", {});
      form.reset();
    } catch (err) {
      setStatus(STATUS.ERROR);
    }
  };

  const sending = status === STATUS.SENDING;

  return (
    <section id="contact" className="section-auto section--raised">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal variant="fade" className="eyebrow">
              <span>05 — Contact</span>
            </Reveal>
            <Reveal as="h2" delay={80} className="section-title">
              Let's build something
            </Reveal>
            <Reveal as="p" delay={150} className="section-lead">
              Tell me what you are working on and I will get back to you. If you would
              rather just email me directly, that works too.
            </Reveal>

            <Reveal delay={220} className="mt-8">
              <a
                href={`mailto:${SITE.email}`}
                onClick={() =>
                  track("outbound_click", {
                    label: "Email",
                    href: `mailto:${SITE.email}`,
                    location: "contact",
                  })
                }
                className="text-lg font-semibold link-underline break-all"
              >
                {SITE.email}
              </a>
              <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted">
                {SITE.location}
              </p>
            </Reveal>
          </div>

          <Reveal delay={120} className="card p-6 sm:p-8">
            <span className="sr-only" aria-live="polite">
              {status === STATUS.SENT ? "Message sent." : ""}
            </span>
            {status === STATUS.SENT ? (
              <div className="flex flex-col items-center py-10 text-center" role="status">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-coral text-coral">
                  <FiCheck size={30} aria-hidden="true" />
                </span>
                <h3 ref={sentHeadingRef} tabIndex={-1} className="mt-6 text-2xl font-bold outline-none">Message sent</h3>
                <p className="mt-3 max-w-sm text-muted">
                  Thanks for reaching out — I will get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus(STATUS.IDLE)}
                  className="btn btn-ghost mt-8"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="field-label" htmlFor="cf-name">
                      Name
                    </label>
                    <input
                      id="cf-name"
                      className="field"
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="Jane Rivera"
                      required
                    />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="cf-email">
                      Email
                    </label>
                    <input
                      id="cf-email"
                      className="field"
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="jane@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="field-label" htmlFor="cf-message">
                    Message
                  </label>
                  <textarea
                    id="cf-message"
                    className="field resize-y"
                    name="message"
                    rows="6"
                    placeholder="A few lines about your project."
                    required
                  />
                </div>

                <input
                  type="text"
                  name={HONEYPOT}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute h-px w-px overflow-hidden opacity-0"
                  style={{ left: "-9999px" }}
                />

                <button type="submit" className="btn btn-primary btn-block mt-7" disabled={sending}>
                  {sending ? "Sending" : "Send message"}
                  {sending ? (
                    <FiLoader className="animate-spin" size={16} aria-hidden="true" />
                  ) : (
                    <FiSend size={16} aria-hidden="true" />
                  )}
                </button>

                {status === STATUS.ERROR ? (
                  <p
                    className="mt-5 flex items-start gap-3 rounded-lg border border-line-strong bg-navy px-4 py-3.5 text-sm"
                    role="alert"
                  >
                    <FiAlertCircle
                      className="mt-0.5 shrink-0 text-coral"
                      size={16}
                      aria-hidden="true"
                    />
                    <span>
                      That did not go through. Please try again, or email me directly at{" "}
                      <a
                        href={`mailto:${SITE.email}`}
                        onClick={() =>
                          track("outbound_click", {
                            label: "Email",
                            href: `mailto:${SITE.email}`,
                            location: "contact",
                          })
                        }
                        className="link-underline text-coral-text"
                      >
                        {SITE.email}
                      </a>
                      .
                    </span>
                  </p>
                ) : null}
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
