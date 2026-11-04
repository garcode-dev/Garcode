"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { Arrow, Close, Menu } from "./Icons";
import { site } from "@/content/site";
import { sol } from "@/content/schoolOfLife";

const BAR_KEY = "garcode-sol-bar-dismissed";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [barDismissed, setBarDismissed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    try {
      if (localStorage.getItem(BAR_KEY) === "1") setBarDismissed(true);
    } catch {}
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);
  const isCurrent = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
  const current = (href: string) => (isCurrent(href) ? "page" : undefined);

  // The School of Life announcement shows across the site, except on School of Life pages.
  const showBar = !barDismissed && !pathname.startsWith("/school-of-life");
  const dismissBar = () => {
    setBarDismissed(true);
    try {
      localStorage.setItem(BAR_KEY, "1");
    } catch {}
  };

  return (
    <>
      <header className={`nav ${scrolled || open ? "scrolled" : ""} ${showBar ? "with-bar" : ""}`}>
        {showBar && (
          <div className="announce">
            <div className="wrap announce-inner">
              <span className="announce-dot" aria-hidden="true" />
              <p>
                <span className="announce-long">{sol.announcement.text}</span>
                <span className="announce-short">School of Life: digital micro-skills in 3 to 5 minutes a day.</span>
              </p>
              <Link className="announce-cta" href={sol.announcement.cta.href}>
                {sol.announcement.cta.label} <Arrow />
              </Link>
              <button className="announce-close" onClick={dismissBar} aria-label="Hide announcement">
                <Close />
              </button>
            </div>
          </div>
        )}
        <div className="wrap nav-inner">
          <Logo />
          <nav aria-label="Main">
            <ul className="nav-links">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} aria-current={current(item.href)}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="nav-cta">
            <Link className="btn btn-primary" href="/contact">Request a Proposal</Link>
            <button
              className="menu-btn"
              aria-expanded={open}
              aria-controls="mobileMenu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <Close /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-menu ${open ? "open" : ""} ${showBar ? "with-bar" : ""}`} id="mobileMenu">
        {site.nav.map((item) => (
          <Link key={item.href} href={item.href} onClick={close} aria-current={current(item.href)}>{item.label}</Link>
        ))}
        <Link href="/contact" onClick={close} aria-current={current("/contact")}>Contact</Link>
        <Link className="btn btn-primary" href="/contact" onClick={close}>Request a Proposal</Link>
      </div>
    </>
  );
}
