# Project status – MB-Autoasennuspalvelu Oy website concept

_Last updated: 2026-11-19_

## Basics

- **Target company:** MB-Autoasennuspalvelu Oy (business ID 3563174-2, registered 2025-09-08), Kuurnankatu 28, 80130 Joensuu. Independent Mercedes-Benz specialist workshop (cars and vans), KL-ServicePartner chain member, e-Pro network.
- **Original website:** none. `autoasennuspalvelu.com` is a Squarespace "Coming Soon" placeholder. The main source is the company's KL-ServicePartner listing (see CONTENT_SOURCES.md).
- **Master prompt:** `C:\VERKKOSIVUT\Prompt.md` (Hades Design Conversion First v2.0). The example URL is ignored. This is a "company without a website" project: a new site, researched independently.
- **User instructions:** follow the master prompt fully and autonomously, including GitHub Pages deployment. Do not modify the master prompt.
- **Repository:** https://github.com/samijturunen01/mb-autoasennuspalvelu-demo
- **Live demo:** https://samijturunen01.github.io/mb-autoasennuspalvelu-demo/

## Strategy (details: CONVERSION_STRATEGY.md)

- Primary conversion: service booking request, by phone (Jouni 010 206 4590 / JP 010 206 4591) or the "huoltoaikapyyntö" form.
- Secondary: email, directions, service pages, van page.
- Segments: private Mercedes owners, businesses with Mercedes vans, hybrid/EV owners, seasonal installations.

## Creative direction – "Huoltokuva" (service plate)

The company's own logo, a W124 line drawing with heavy outlined lettering, is treated like a workshop-manual technical plate:

- **Surfaces:** graphite drawing board (#0f1113) with a faint grid, warm service-book paper (#f1efea).
- **Accent:** a single halogen-amber accent (#f2b035), used for actions and light.
- **Lettering:** the logo's outlined type (white fill, #686868 outline) is reused for big numerals and letters (MB, A/B, J/JP, 404).
- **Type:** Archivo variable (condensed 62–68 % for display, normal width for body) and IBM Plex Mono for plate labels.
- **Graphic language:** numbered callout balloons, leader lines, dash-dot construction lines, dimension rules, "Kuva 01" plate captions.

**Signature animation:** on every full load or refresh of the homepage, an amber diagnostic scan line inks the faint blueprint of the logo car (about 1.2 s). The headlamps then flicker on and numbered callouts (01–05) draw out to the services. The whole sequence takes about 2.2 s. H1 and CTAs are visible immediately. The intro does not replay on in-app returns, is skipped with reduced motion, and uses no storage or cookies (`data-intro` = playing / done / skipped).

## Pages (10 prerendered routes incl. 404)

`/` · `/palvelut/` · `/palvelut/maaraaikaishuolto/` · `/palvelut/vianhaku-ja-korjaukset/` · `/palvelut/lammittimet-ja-asennukset/` · `/palvelut/sahko-ja-hybridiautot/` · `/pakettiautot/` · `/yritys/` · `/yhteystiedot/` · `404.html`

## Completed features

- Authentic logo vectorised (potrace, layered: car, letter bodies with open counters, outline, rule, tagline), compared against the original, plus dark variant, wordmark, OG image and favicons.
- Hero service plate with interactive callouts linked to service sections; mobile legend.
- Homepage: specialist reasons, hover/focus service plate with line illustrations, Huolto A/B explainer, vans feature, direct numbers + hours, KL-ServicePartner facts (attributed), FAQ, closing CTA.
- Service page template: need, signals, numbered sub-services with topic-preselected booking links and anchors, FAQ, related services, CTA. The huolto page includes the A/B explainer; the vans page includes fleet contacts.
- Booking form: Finnish licence-plate input (auto-formats ABC-123), topic chips (preselect via `?aihe=`), timing chips, progressive company field, error summary with focus and field links, demo submit ("Demoversio – viestiä ei lähetetty."), adapter ready for Apps Script + reCAPTCHA.
- Contact: tiles, hours (marked for confirmation), company info, click-to-load Google Map, directions and open-in-maps.
- Header with Etusivu first and active state, sticky mobile call/booking bar, full-screen mobile menu (focus trap, Escape), skip link, concept-demo label on every page.
- SEO: unique titles and descriptions, OG, AutoRepair, Service, FAQ and Breadcrumb JSON-LD (verified facts only, no ratings or hours), sitemap, robots allows crawling, noindex everywhere.

## Testing status (local, 2026-11-19)

- `tsc -b` ✔ · `eslint .` ✔ · `npm run build` ✔
- Playwright: 96 passed, 4 skipped (viewport-specific) on desktop 1440 and Pixel 7. Covers all pages (status, single H1, noindex, no console errors, no overflow, images), unique titles and descriptions, 404, robots, JSON-LD facts, navigation (Etusivu first, active, top-of-page on menu nav, back/forward restore, anchors, deep links, no blocking overlay, mobile menu, action bar), intro (plays on load and refresh, not on in-app return or back, no layout shift, reduced motion), form (validation, focus, plate format, preselection, demo submit sends nothing, company field), map click-to-load + directions, tel/mailto, callouts, service plate, FAQ, no trackers or cookies, and axe WCAG 2.2 A/AA (no serious or critical issues) on all routes including 404.
- Visual review at 360, 390, 768, 1024, 1280 and 1440 px.

## Known issues / notes

- Opening hours come from the Immonen Ky directory listing. They are shown with an asterisk and left out of the structured data.
- The car path (~30 kB) is inlined once in the homepage HTML and in the JS bundle (needed for the animated hero). Static logo uses are cached SVG files.
- Archivo variable (wdth + wght, latin) is about 90 kB.

## Asset permissions

The logo is used under the user's authorisation. No photos exist; no stock or AI images are used. See ASSET_PROVENANCE.md and IMAGE_REPLACEMENT_LIST.md.

## Remaining before production (if purchased)

Confirm the items in CONTENT_SOURCES.md (hours, heritage, e-Pro level, chain benefits, wording). Then: domain/DNS (`autoasennuspalvelu.com`), HTTPS check, Apps Script + reCAPTCHA (server-side verification), privacy notice, analytics with consent, `VITE_ALLOW_INDEXING=true` + canonical/sitemap on the real domain, Google Business Profile, optional authentic photos.

## Next recommended action

Present the demo to the owner. Collect confirmations and photos, then switch to production configuration.
