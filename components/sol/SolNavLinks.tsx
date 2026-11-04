"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SolNavLinks({ signedIn }: { signedIn: boolean }) {
  const pathname = usePathname();
  const links = [
    { href: "/school-of-life", label: "Overview", match: (p: string) => p === "/school-of-life" },
    ...(signedIn
      ? [{ href: "/school-of-life/dashboard", label: "My Dashboard", match: (p: string) => p.startsWith("/school-of-life/dashboard") || p.startsWith("/school-of-life/learn") }]
      : []),
  ];
  return (
    <nav aria-label="School of Life" className="sol-links">
      {links.map((l) => (
        <Link key={l.href} href={l.href} aria-current={l.match(pathname) ? "page" : undefined}>{l.label}</Link>
      ))}
    </nav>
  );
}
