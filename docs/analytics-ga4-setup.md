# GA4 setup & maintenance checklist

This is the property-side configuration that makes the tracking code actually
produce useful, long-term reports. The code in `src/lib/analytics.ts` and
`src/components/*` sends the events; **GA4 will hide most of the detail until the
steps below are done in the GA4 Admin UI.** None of this is retroactive, so do
the custom dimensions first.

Property: Good Transformer (GA4). Measurement ID lives in
`NEXT_PUBLIC_GA_MEASUREMENT_ID`.

---

## 1. Register custom dimensions (do this first — not retroactive)

Admin → Data display → **Custom definitions** → Create custom dimension. All are
**event-scoped**. The "Event parameter" must match the code exactly:

| Dimension name   | Scope | Event parameter | What it tells you                                  |
| ---------------- | ----- | --------------- | -------------------------------------------------- |
| Section          | Event | `section`       | Which area/funnel fired the event (e.g. `book_business`, `insights`) |
| Label            | Event | `label`         | The specific item/variant (CTA text, cadence, etc.) |
| Link URL         | Event | `link_url`      | Destination for click/download/schedule events     |
| Asset            | Event | `asset`         | Which downloadable asset was taken                  |
| Mode             | Event | `mode`          | Booking delivery/handoff path (`endpoint`/`email`/`auto`/`manual`) |

Until these exist, the parameters are collected but show as nothing in reports.

---

## 2. Mark key events (conversions)

Admin → **Events** (or Key events). Toggle "Mark as key event" for:

- `booking_brief_submit` — **primary conversion** (a discovery-call brief was captured)
- `newsletter_signup`
- `asset_download`
- `pdf_download`

Secondary / micro-conversions (optional, useful as funnel steps, not as goals):
`booking_schedule_click`, `service_cta_click`, `cta_click`, `insight_cta_click`.

> Note: `booking_brief_submit` fires when the brief is delivered.
> `booking_schedule_click` fires when the visitor proceeds to the scheduler.
> Together they form the funnel: brief submitted → continued to booking.

---

## 3. Data retention → 14 months

Admin → Data settings → **Data retention** → set "Event data retention" to **14
months** (default is 2). Without this, year-over-year and long-window
explorations silently lose old data.

---

## 4. Filter internal traffic

Admin → Data Streams → (web stream) → Configure tag settings → Show all →
**Define internal traffic** → add your home/office IPs. Then Admin → Data
Settings → Data Filters → set the "Internal Traffic" filter to **Active**
(it ships in Testing mode and does nothing until activated).

---

## 5. Enhanced Measurement (confirm SPA page views work)

Admin → Data Streams → (web stream) → **Enhanced measurement** (gear icon).
Keep enabled, and confirm **"Page changes based on browser history events"** is
on — this is what captures page_view on Next.js client-side navigations (there
is no manual page_view in the code by design). Verify in DebugView (step 7) by
clicking between pages and watching `page_view` fire each time.

Also useful and on by default here: Outbound clicks, File downloads, Form
interactions. Leave them on.

---

## 6. Consent Mode v2 (implemented in code — verify here)

The site sets Consent Mode v2 defaults to **denied** before GA loads
(`src/components/google-analytics.tsx`) and flips `analytics_storage` to granted
via the banner (`src/components/consent-banner.tsx`) when a visitor accepts.

To verify: open the site in a fresh/incognito window, open DebugView, and check
that before accepting you see consent state denied (modeled traffic), and after
clicking **Accept** a `consent update` is recorded and GA cookies appear.

In GA4, no action is strictly required, but for best modeling enable
**Consent Mode behavioural/conversion modeling** if prompted in Admin → Data
Settings, and confirm Google signals settings match your consent posture.

> Follow-up (out of scope for GA, flag for later): the LinkedIn Insight Tag in
> `layout.tsx` loads independently of this banner. For full UK/PECR compliance
> it should also be gated behind consent. Track separately.

---

## 7. Validate the whole thing (DebugView)

1. Run the site (`npm run dev`) or use the live site with the GA Debug extension.
2. GA4 → Admin → **DebugView**.
3. Walk the key journeys and confirm each event + its params:

| Action on site                          | Event                   | Key params |
| --------------------------------------- | ----------------------- | ---------- |
| Any primary CTA                         | `cta_click`             | section, label, link_url |
| Service page CTA                        | `service_cta_click`     | section, label, link_url |
| Open an insight (card / related)        | `insight_open`          | section, label, link_url |
| Insight article CTA                     | `insight_cta_click`     | section, label |
| Filter insights                         | `insight_filter`        | section, label |
| Service nav child                       | `nav_service_child`     | section, label |
| Download a PDF                          | `pdf_download`          | section, label, link_url |
| Download an asset                       | `asset_download`        | section, label, asset, link_url |
| Newsletter signup                       | `newsletter_signup`     | section, label (cadence) |
| Submit a booking brief                  | `booking_brief_submit`  | section, label, mode |
| Continue to scheduler                   | `booking_schedule_click`| section, label, link_url, mode |

Confirm the custom dimensions (Section/Label/etc.) are populated, not "(not set)".

---

## 8. Suggested explorations / reports to build once data flows

- **Lead funnel** (Funnel exploration): `page_view` (a /book page) →
  `booking_brief_submit` → `booking_schedule_click`. Break down by `section`
  (business vs personal) and `mode`.
- **Content → conversion**: free-form exploration with landing page / insight
  `label` as rows, `booking_brief_submit` and `newsletter_signup` as values —
  shows which insights actually drive leads.
- **Asset performance**: `asset_download` by `asset` dimension.
- **CTA performance**: `cta_click` / `service_cta_click` by `label` and `link_url`.
- Set these as a saved Collection/Library so reporting is one click each month.

---

## 9. Recurring hygiene (quarterly)

- Re-check Data Filters are still Active and internal IPs current.
- Re-check no `(not set)` creep on registered dimensions (means a code/param drift).
- Confirm conversions still mapped after any GA4 UI changes.
- Keep this file in sync whenever event names or params change in
  `src/lib/analytics.ts` and the components that call `trackEvent`.
