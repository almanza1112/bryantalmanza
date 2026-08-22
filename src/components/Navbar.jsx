import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineBusinessCenter } from "react-icons/md";
import Logo from "../assets/logo.png";
import useActiveSection from "../hooks/useActiveSection";
import useScrollState from "../hooks/useScrollState";
import { scrollToId } from "../lib/motion";
import { NAV_IDS, NAV_LINKS, SITE } from "../data/site";
import { track } from "../lib/analytics";

/**
 * Navigation is plain anchors now, not react-scroll <Link>s. Those rendered
 * <a> elements with no href, which made all nine nav links unreachable by
 * keyboard, and carried no offset, so every target landed 80px underneath the
 * fixed bar.
 */
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { scrolled, progress } = useScrollState();
  const active = useActiveSection(NAV_IDS);
  const burgerRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return undefined;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const burgerEl = burgerRef.current;

    // Take the page behind the menu out of the tab order and the a11y tree,
    // so focus cannot wander into content the overlay is covering.
    const behind = ["main", "footer"]
      .map((sel) => document.querySelector(sel))
      .filter(Boolean);
    behind.forEach((el) => {
      el.setAttribute("inert", "");
      el.setAttribute("aria-hidden", "true");
    });

    // Move focus into the menu once it is visible.
    const focusFrame = window.requestAnimationFrame(() => {
      document.querySelector("#mobile-menu a")?.focus();
    });

    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
      window.cancelAnimationFrame(focusFrame);
      behind.forEach((el) => {
        el.removeAttribute("inert");
        el.removeAttribute("aria-hidden");
      });
      // Hand focus back to the control that opened the menu.
      burgerEl?.focus();
    };
  }, [open, close]);

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => {
      if (e.matches) close();
    };
    // Safari below 14 only has the deprecated addListener.
    if (mq.addEventListener) {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }
    if (mq.addListener) {
      mq.addListener(onChange);
      return () => mq.removeListener(onChange);
    }
    return undefined;
  }, [close]);

  /** Close first, then scroll — the body lock must lift before the page moves. */
  const handleMobileNav = (e, id) => {
    e.preventDefault();
    close();
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => scrollToId(id));
    });
  };

  const rail = [
    { label: "My Business", href: SITE.business, icon: MdOutlineBusinessCenter },
    { label: "Github", href: SITE.github, icon: FaGithub },
    { label: "Email", href: `mailto:${SITE.email}`, icon: HiOutlineMail },
  ];

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header
        className={`nav-shell ${scrolled ? "nav-shell--scrolled" : ""}`}
        style={{ "--progress": progress }}
      >
        <div className="mx-auto flex h-full max-w-[1100px] items-center justify-between px-5 sm:px-8">
          <a href="#top" aria-label={`${SITE.name} — back to top`} className="relative z-50">
            <img
              src={Logo}
              alt={`${SITE.name} logo`}
              width={250}
              height={250}
              className="h-11 w-11 sm:h-12 sm:w-12"
            />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="nav-link"
                data-active={active === link.id}
                aria-current={active === link.id ? "true" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            ref={burgerRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            data-open={open}
            className="burger relative z-50 -mr-2 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="burger-bar" />
            <span className="burger-bar" />
          </button>
        </div>

        <span className="nav-progress" aria-hidden="true" />
      </header>

      <div
        id="mobile-menu"
        className="mobile-panel md:hidden"
        data-open={open}
        aria-hidden={!open}
      >
        <div className="flex min-h-full flex-col px-6 pb-10 pt-28">
          <nav aria-label="Mobile">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleMobileNav(e, link.id)}
                className="mobile-link mobile-stagger"
                style={{ "--i": i }}
                tabIndex={open ? 0 : -1}
              >
                <span className="font-mono text-xs text-coral-text">0{i + 1}</span>
                {link.label}
              </a>
            ))}
          </nav>

          <div
            className="mobile-stagger mt-auto flex flex-col gap-4 pt-10 text-sm"
            style={{ "--i": NAV_LINKS.length }}
          >
            {rail.map((item) => {
              const Icon = item.icon;
              const external = item.href.startsWith("http");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  target={external ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  onClick={() =>
                    track("outbound_click", {
                      label: item.label,
                      href: item.href,
                      location: "navbar",
                    })
                  }
                  className="flex items-center gap-3 text-muted transition-colors hover:text-coral-text"
                >
                  <Icon aria-hidden="true" size={18} className="text-coral" />
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop social rail */}
      <div className="fixed left-0 top-[38%] z-30 hidden xl:block">
        <ul className="flex flex-col gap-1">
          {rail.map((item) => {
            const Icon = item.icon;
            const external = item.href.startsWith("http");
            return (
              <li key={item.label}>
                <a
                  className="si-item"
                  href={item.href}
                  target={external ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  onClick={() =>
                    track("outbound_click", {
                      label: item.label,
                      href: item.href,
                      location: "navbar",
                    })
                  }
                >
                  {item.label}
                  <Icon aria-hidden="true" size={24} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
