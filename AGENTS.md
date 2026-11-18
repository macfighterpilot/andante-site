<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Andante demo site (products/andante-site)

Showcase site for Andante (horseback experiences in Tuscany, founders Guia Simonetti & Zoe Mazzon).
Requested by the founder on 2026-11-18 as a demo to pitch the client; target market international
(UK, DE, US, NL, Scandinavia). Owner agent: **Devvy Web** 🌐 (`devvy-web`).

## Rules
- Demo until Andante approves: keep `robots` noindex (layout metadata), `X-Robots-Tag` header
  (`next.config.ts`) and `src/app/robots.ts` disallow. Remove all three only on the founder's OK.
- Never invent prices or facts about Andante: unconfirmed copy carries `TODO(andante)`.
- Only Andante's own public material or free-licence photos (credited). No images of other operators.
- The form must not store data or send email automatically until a backend is approved.
- Static page (company `AGENTS.md` §4): no `force-dynamic`, no clock reads during render
  (Cache Components rejects `new Date()` in prerender).

## Connections
IDs and paths only. Verified 2026-11-18.

| What | Value |
|---|---|
| Repo | GitHub `macfighterpilot/andante-site` (private), branch `main`; commit author = founder's GitHub noreply |
| Vercel | team `clawb`, project `andante-site` → https://andante-site-one.vercel.app (CLI deploys; production deploy of this demo authorised by the founder 2026-11-18). Git not connected |
| Domain | none (founder: no custom domain, no DNS) |
| Backend | none |
| Client contact | andante.horseriding@gmail.com, Instagram @andante.horseriding |

## Open points (to confirm with Andante)
- Real photos (all `placeholder: true` images, plus originals of the 3 Instagram crops).
- Experience list, seasons, durations, inclusions, minimum level for multi-day treks, private bookings.
- Founders' story, FAQ answers (kit, helmets, safety/insurance, children's minimum age, cancellation).
- Phone/WhatsApp, form backend, Italian and German versions, approval to index.
