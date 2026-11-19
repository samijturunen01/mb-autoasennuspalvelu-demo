# MB-Autoasennuspalvelu Oy – website concept (Hades Design)

Speculative website concept for **MB-Autoasennuspalvelu Oy** (business ID 3563174-2), a Mercedes-Benz specialist workshop at Kuurnankatu 28, Joensuu. The company has no website yet. **This is not the official company website.** Every page carries `noindex`, and the booking form runs in demo mode.

- Live demo: https://samijturunen01.github.io/mb-autoasennuspalvelu-demo/
- Status, decisions and next steps: [`docs/PROJECT_STATUS.md`](docs/PROJECT_STATUS.md)

## Stack

React 19 · Vite 8 · TypeScript · Tailwind CSS 4 · React Router 7 · GSAP · lucide-react. Every route is prerendered to static HTML (`scripts/prerender.mjs`) for GitHub Pages.

## Commands

```bash
npm ci
npm run dev        # http://127.0.0.1:5173/mb-autoasennuspalvelu-demo/
npm run lint
npm run build      # tsc + vite build + prerender (10 routes incl. 404.html)
npm run preview    # serves dist/ like GitHub Pages on :4318
npm test           # Playwright (desktop 1440 + Pixel 7) incl. axe checks – run build first
LIVE_URL=https://samijturunen01.github.io npm test   # against the deployed demo
npm run logo       # re-trace the authentic logo into SVG (scripts/trace-logo.mjs)
npm run og         # regenerate OG image and favicons
```

## Structure

```
src/data/        company facts, services, FAQ, routes/SEO, navigation (single source of truth)
src/components/  brand (logo, illustrations), home, layout, forms, contact, ui
src/pages/       Home, Services, ServicePage (also vans), About, Contact, NotFound
src/lib/         analytics stub (no tracking), form adapters (demo / Apps Script), intro + motion helpers
scripts/         prerender, GitHub-Pages-like server, logo tracing, OG/favicons, screenshot helper
docs/            research, strategy, provenance, measurement, status
```

## Production switches (only after customer approval)

See `.env.example`: `VITE_BASE_PATH`, `SITE_URL`, `VITE_FORM_MODE=apps-script` + `VITE_FORM_ENDPOINT`, `VITE_RECAPTCHA_SITE_KEY` (public site key only – verify server-side), `VITE_ALLOW_INDEXING=true`.
