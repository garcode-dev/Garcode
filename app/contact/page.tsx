import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { SocialRow } from "@/components/Cta";
import { FeatureIcon, type FeatureIconName } from "@/components/Icons";
import { contact as c } from "@/content/site";

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  openGraph: { title: c.meta.title, description: c.meta.description },
};

export default function ContactPage() {
  return (
    <>
      <PageHero {...c.hero} />

      <section className="contact-section" aria-label="Contact Garcode">
        <div className="wrap contact-grid">
          <div className="contact-side">
            {c.channels.map((ch) => (
              <div key={ch.title} className="channel reveal">
                <h2>{ch.title}</h2>
                <ul>
                  {ch.lines.map((l) => (
                    <li key={l.label + l.href}>
                      <span className="icon icon-sm" aria-hidden="true"><FeatureIcon name={l.icon as FeatureIconName} /></span>
                      <a
                        href={l.href}
                        {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <SocialRow light />
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
