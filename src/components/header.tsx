"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = { t: Dictionary["nav"]; lang: string };

export function Header({ t, lang }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { href: "#experiences", label: t.experiences },
    { href: "#about", label: t.about },
    { href: "#tuscany", label: t.tuscany },
    { href: "#gallery", label: t.gallery },
    { href: "#faq", label: t.faq },
  ];
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "bg-sand/95 text-ink shadow-[0_1px_0_rgb(42_37_31/0.08)] backdrop-blur" : "bg-transparent text-sand"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <a href={`/${lang}`} className="display text-[1.9rem] leading-none tracking-wide" aria-label="Andante, home">
          Andante
        </a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="kicker opacity-85 transition-opacity hover:opacity-100">
              {l.label}
            </a>
          ))}
          <a href="#enquire" className={`btn ${solid ? "btn-primary" : "btn-ghost"} !min-h-10 !px-5`}>
            {t.enquire}
          </a>
        </nav>
        <button
          type="button"
          className="kicker flex h-11 items-center gap-2 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? t.close : t.menu}
          <span aria-hidden className="relative block h-3 w-5">
            <span className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0.5"}`} />
            <span className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
          </span>
        </button>
      </div>
      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto bg-sand px-5 pb-10 pt-6 text-ink lg:hidden"
      >
        <nav className="flex flex-col" aria-label="Mobile">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="display border-b border-stone py-4 text-4xl"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#enquire" onClick={() => setOpen(false)} className="btn btn-primary mt-8 w-full">
          {t.enquire}
        </a>
      </div>
    </header>
  );
}
