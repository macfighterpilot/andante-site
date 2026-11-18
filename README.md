# Andante · demo website

Premium showcase site for **Andante, Horseback Experience Designer** (Tuscany, Instagram
[@andante.horseriding](https://www.instagram.com/andante.horseriding/)). Built by the App Factory as a
demo for the founder: **not approved by Andante yet**, so every page is `noindex` and `robots.txt`
disallows everything.

- Next.js 16 App Router, Tailwind 4, static prerender. English first, locale routing under `/[lang]`
  (add `it` / `de` dictionaries in `src/i18n/` when needed).
- Copy: `src/i18n/en.ts`. Lines marked `SOURCE: IG` come from Andante's public Instagram; lines marked
  `TODO(andante)` are plausible demo copy to confirm. Prices are always "On request".
- Images: `src/lib/images.ts`. `placeholder: true` = free-licence photo from Wikimedia Commons
  (credited in the footer), to be replaced with Andante's own photography. The three `andante-*`
  images are low-resolution crops of their public Instagram posts (`scripts/crop-ig.mjs`).
- Enquiry form (`src/components/enquiry-form.tsx`): demo mode. Validates, shows a confirmation and
  opens a pre-filled email to andante.horseriding@gmail.com from the visitor's own mail app.
  Nothing is stored, nothing is sent automatically.

```bash
pnpm install
pnpm dev            # http://localhost:3000/en
pnpm build && PORT=3921 pnpm start
node scripts/shot.mjs http://localhost:3921/en /tmp/andante 390 1440   # QA screenshots
```

Open items before going live: see `AGENTS.md` § Open points.
