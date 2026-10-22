"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { Close, Menu } from "./Icons";
import { site } from "@/content/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);
  const current = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <>
      <header className={`nav ${scrolled || open ? "scrolled" : ""}`}>
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
      <div className={`mobile-menu ${open ? "open" : ""}`} id="mobileMenu">
        {site.nav.map((item) => (
          <Link key={item.href} href={item.href} onClick={close} aria-current={current(item.href)}>{item.label}</Link>
        ))}
        <Link href="/contact" onClick={close} aria-current={current("/contact")}>Contact</Link>
        <Link className="btn btn-primary" href="/contact" onClick={close}>Request a Proposal</Link>
      </div>
    </>
  );
}
