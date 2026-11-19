# Conversion measurement plan

**Nothing is tracked in the demo.** `src/lib/analytics.ts` only logs events to the console in development. No analytics, pixels or cookies are active, and the tests verify this.

## Primary conversion metric

**Qualified booking requests per month** = phone calls to 010 206 4590 / 010 206 4591 that become a booked job + submitted booking forms that become a booked job. The workshop confirms these. Web data alone can't count them.

Funnel levels (never mix them):

1. Micro-conversions: CTA clicks, phone/email link clicks, form starts, map loads.
2. Leads: successful form submissions (`form_submit_success` with `demo: false`).
3. Qualified inquiries: leads the workshop considers real jobs.
4. Booked jobs: arrive at the workshop.
5. Revenue: from the workshop's own system.

## Event definitions (already wired in the UI)

| Event | When | Parameters (no personal data) |
|---|---|---|
| `cta_click` | Any booking CTA | `location`, `cta` |
| `phone_click` | Any `tel:` link | `location`, `person` (jouni/jp) |
| `email_click` | Any `mailto:` link | `location` |
| `form_start` | First interaction with the booking form | `form` |
| `booking_topic_select` | Topic chip selected | `topic` |
| `form_validation_error` | Submit blocked | `fields` (field names only) |
| `form_submit_success` | Adapter returned ok | `demo`, `topics` |
| `plate_entered` | Submitted form contained a plate (never the plate itself) | – |
| `service_interest` | Service link from home plate / related lists | `service`, `location` |
| `callout_click` | Hero drawing callout clicked | `callout` |
| `directions_click` | Directions / open-in-maps | `location` |
| `map_load` | Visitor loads the Google map | – |

## Implementation requirements (production)

- Choose a tool with the customer: GA4 via GTM, or a cookieless option such as Plausible or Matomo without cookies.
- Consent management if cookies are set: load nothing before consent. A privacy notice is required in either case.
- Replace the `track()` body with `window.dataLayer.push({ event, ...params })` (after consent).
- Mark `form_submit_success` (non-demo) and `phone_click` as key events. Call tracking for the 010 numbers would need the operator's reporting or a call-tracking service, which needs separate consideration.
- Never send names, phone numbers, emails, plates or free text to analytics.

## Baseline

There is no baseline: the company has had no website. Record the first 8–12 weeks after launch as the baseline, ideally together with the workshop's own count of new customers who found them online.

## Optimisation candidates after launch

1. Hero headline variants (location-led vs. "Mersu" tone).
2. Phone vs. form split on mobile: is the sticky bar used, and which button?
3. Form completion rate, and whether the plate field helps or hurts.
4. Van page conversion from business searches.
5. Whether the Huolto A/B section gets engagement that leads to booking.
