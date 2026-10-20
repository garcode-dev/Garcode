# Garcode website (Next.js)

## Run it locally
You need Node.js 20 or newer (https://nodejs.org).

```bash
npm install      # first time only
npm run dev      # open http://localhost:3000
```

`npm run build` makes a production build. Deploy by importing this folder into Vercel or Netlify.

## Where things live
```
app/
  layout.tsx      Site-wide shell: <head> metadata, fonts, nav, footer
  page.tsx        Home page — just lists the sections in order
  globals.css     All styling. Brand colours/fonts are the tokens at the top (:root)
components/       One file per section (Hero, Partner, Ways, Different, Expect, Mission, Cta)
                  plus Nav, Footer, Logo, Icons, Placeholder, RevealObserver
content/site.ts   ALL the copy and links — edit text here, not in the components
public/           Static files: icon.svg, and images/ for client photos
copy.md           Garcode's full web copy (all 8 pages) as supplied
```

## Adding a page
Create `app/<route>/page.tsx` (e.g. `app/services/page.tsx`), add its copy to `content/site.ts`,
and export `metadata` from the page for its title/description.
Routes already linked from the nav/footer: /services /academy /work /advantage /about /testimonials /contact

## Still to do before launch
Search the code for `TODO`:
- Replace the 6 photo placeholders (`components/Placeholder.tsx`) with real images via `next/image`
- Swap the placeholder logo in `components/Logo.tsx`
- Add social profile URLs in `content/site.ts`
- Add an Open Graph image (`public/og.png`, 1200×630) in `app/layout.tsx`
- Confirm brand colours (derived to match the template)
