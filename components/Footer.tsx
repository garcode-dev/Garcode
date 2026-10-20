import Link from "next/link";
import Logo from "./Logo";
import { footerLinks, site } from "@/content/site";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Logo />
            <p>{site.tagline}</p>
          </div>
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4>Get in touch</h4>
            <ul>
              {site.contact.emails.map((e) => (
                <li key={e}><a href={`mailto:${e}`}>{e}</a></li>
              ))}
              <li><a href={site.contact.phoneHref}>{site.contact.phone}</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Garcode. All rights reserved.</span>
          <span>Build Skills. Build Software. Build the Future.</span>
        </div>
      </div>
    </footer>
  );
}
