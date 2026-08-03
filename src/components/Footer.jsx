import React from "react";
import { FaGithub } from "react-icons/fa";
import { FiArrowUp } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { NAV_LINKS, SITE } from "../data/site";

const Footer = () => (
  <footer className="border-t border-line px-5 py-12 sm:px-8">
    <div className="shell flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-lg font-bold">{SITE.name}</p>
        <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted">
          {SITE.role} · {SITE.location}
        </p>
      </div>

      <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {NAV_LINKS.map((link) => (
          <a key={link.id} href={`#${link.id}`} className="link-underline text-muted">
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-5">
        <a
          href={SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-muted transition-colors hover:text-coral-text"
        >
          <FaGithub size={20} />
        </a>
        <a
          href={SITE.business}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="AlmanzaTech, my software studio"
          className="text-muted transition-colors hover:text-coral-text"
        >
          <MdOutlineBusinessCenter size={22} />
        </a>
        <a
          href={`mailto:${SITE.email}`}
          aria-label="Email me"
          className="text-muted transition-colors hover:text-coral-text"
        >
          <HiOutlineMail size={22} />
        </a>
      </div>
    </div>

    <div className="shell mt-10 flex items-center justify-between border-t border-line pt-6 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted">
      <span>© {new Date().getFullYear()} {SITE.name}</span>
      <a href="#top" className="flex items-center gap-2 transition-colors hover:text-coral-text">
        Back to top
        <FiArrowUp aria-hidden="true" size={13} />
      </a>
    </div>
  </footer>
);

export default Footer;
