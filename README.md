# Garcode website (Next.js)

## Run it locally
You need Node.js 20 or newer (https://nodejs.org).

```bash
npm install      # first time only
npm run dev      # open http://localhost:3000
```

`npm run build` makes a production build. Deploy by importing this folder into Vercel or Netlify.

## Pages
| Route | Page (copy.md) |
|---|---|
| `/` | 1 · Landing page |
| `/services` | 2 · Our Core Services |
| `/advantage` | 3 · Cross-Continental Advantage |
| `/work` | 4 · Selected Previous Work |
| `/academy` | 5 · Learning Tracks & Curriculum (Tech Boomers at `/academy#tech-boomers`) |
| `/testimonials` | 6 · Testimonials |
| `/about` | 7 · About the Founder & Founding Philosophy |
| `/contact` | 8 · Contact (form posts to `/api/contact`) |

## Where things live
```
app/
  layout.tsx        Site-wide shell: <head> metadata, fonts, nav, footer
  page.tsx          Home page — lists the sections in order
  <route>/page.tsx  One folder per inner page; each exports its own title/description
  api/contact/      Contact form endpoint (emails the message via Resend)
  globals.css       All styling. Brand colours/fonts are the tokens at the top (:root)
components/         Home sections (Hero, Partner, Ways, Different, Expect, Mission, Cta)
                    Shared: PageHero, Cta, Text, SmartLink, ContactForm, Nav, Footer, Logo,
                    Icons, Placeholder, RevealObserver
content/site.ts     ALL the copy and links — edit text here, not in the components
public/             Static files: icon.svg, and images/ for client photos
copy.md             Garcode's full web copy (all 8 pages) as supplied
```

## Copy still to confirm
Anything Garcode hasn't supplied is written as `todo("…")` in `content/site.ts` and shows on the
page as a dashed **To confirm** box. Replace each with a plain string. Outstanding:
- Work: case study 1 client name/permission, challenge, delivery, result; case studies 2–3; student projects
  (set `work.students.show = false` to hide that section)
- Academy: Tech Boomers audience, content, format, duration, start date, fee
- Testimonials: all quotes, names and roles
- About: founder bio (2–3 sentences) and photo
- Comments in site.ts also flag: how school programmes and school fees are structured

## Contact form — turn on email delivery
The form posts to `/api/contact`, which sends through Resend (https://resend.com).
On Vercel/Netlify set these environment variables:
- `RESEND_API_KEY` (required)
- `CONTACT_TO` — inbox for enquiries (default `info@garcodedigital.com`)
- `CONTACT_FROM` — sender on a domain verified in Resend, e.g. `Garcode Website <website@garcodedigital.com>`

Until `RESEND_API_KEY` is set, submitting opens the visitor's email app with their message filled in,
so no enquiry is lost. Links like `/contact?interest=boomers` pre-select the "I'm interested in" option.

## Still to do before launch
Search the code for `TODO` and `todo(`:
- Replace the photo placeholders (`components/Placeholder.tsx`) with real images via `next/image`
- Swap the placeholder logo in `components/Logo.tsx`
- Add social profile URLs in `content/site.ts`
- Add an Open Graph image (`public/og.png`, 1200×630) in `app/layout.tsx`
- Confirm brand colours (derived to match the template)
