# Good Transformer: Analytics & event tracking

How the site measures behaviour, the full event taxonomy, and the **one-time GA4
admin setup** needed before the events show up usefully in reports.

See [`services.md`](services.md) for the owning Google account and
[`env-vars.md`](env-vars.md) for the measurement-ID config.

---

## How it's wired

- **Google Analytics 4** loads site-wide from the root layout via
  `src/components/google-analytics.tsx`, reading `NEXT_PUBLIC_GA_MEASUREMENT_ID`
  (`G-LN1EJ68X71`). With no ID set (local dev) it renders nothing.
- **LinkedIn Insight Tag** loads site-wide from the root layout via
  `src/components/linkedin-insight-tag.tsx`, reading
  `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` (currently `9252146`). With no partner ID
  set it renders nothing. The partner ID comes from the Good Transformer
  LinkedIn Campaign Manager account, under Analyze → Insight Tag.
- **Custom events** are dispatched through one helper, `src/lib/analytics.ts`
  (`trackEvent`), which fires the **same payload to both GA4 (`gtag`) and
  Plausible** (`window.plausible`, if present). Two callers:
  - `src/components/analytics-events.tsx`: a document-level capture-phase click
    listener that fires for any element carrying `data-analytics-event` (+
    optional `-section`, `-label`, `-asset`).
  - Direct `trackEvent(...)` calls for events that aren't a simple click
    (booking handoff, confirmed newsletter subscribe).

Every event sends these GA4 parameters: `event_category` (= section, or
`engagement`), `event_label` (= label), `link_url` (= href), `asset`.

---

## Event taxonomy

### Conversions / high-value (recommend marking as Key events)

| Event | Fires when | Section(s) | Notes |
|---|---|---|---|
| `booking_start` | Visitor reaches the Cal.com scheduling handoff, auto-redirect after the brief saves, **or** clicks "Continue to scheduling" | `book_personal`, `book_business` | The Cal URL carries the visitor's name/email; analytics receives the **base** URL only, no PII. The actual booking completes off-site on Cal.com, so this is the closest on-site proxy for a booked call. |
| `newsletter_signup` | Subscribe request succeeds (`response.ok`), **not** on button click | `insights` | `label` = cadence (`weekly` / `daily`). |
| `asset_download` | An Insights downloadable asset is clicked | `insights_index` | `asset` = asset title. |

### Engagement / intent

| Event | Fires when | Section(s) |
|---|---|---|
| `cta_click` | Any shared "Book a call" / contact CTA is clicked | `home_hero`, `patrick_cta`, `book_business_success`, `book_personal_success`, `service_contact_prompt`, `cta_group` (default) |
| `service_cta_click` | A CTA on a Services page is clicked | `services_overview_leaders`, `services_overview_teams`, `services_roadmap`, `leader_lessons_final_cta`, `team_advisory_final_cta` |
| `insight_cta_click` | The in-article CTA on an Insight post is clicked | `insight_post` |
| `insight_open` | An Insight card is opened (index or related) | `insights_index`, `insights_related` |
| `insight_filter` | A tag filter is clicked on the Insights index | (`label` = tag) |
| `pdf_download` | A Services PDF is downloaded | `services_downloads`, `leader_lessons_*_download` |
| `nav_services_overview`, `nav_service_child` | Header nav items clicked |  |

> `cta_click` is upper-funnel **intent**, not a conversion. Don't mark it as a
> Key event (it would inflate conversion counts). Analyse it segmented by
> `Section` instead.

---

## GA4 admin checklist (one-time, click-by-click)

Do this in [analytics.google.com](https://analytics.google.com) on property
**`486698902`** (account `goodtransformer1@gmail.com`). **None of this is
backfilled.** Custom dimensions and key events only apply to data collected
*after* you create them, so do it as soon as the events are deployed.

### 1. Register custom dimensions (so event detail is visible in reports)

GA4 does **not** show `event_category` / `event_label` / `asset` / `link_url` in
any standard report until they're registered. For each row below:

**Admin → Data display → Custom definitions → Custom dimensions → Create custom dimension**

| Dimension name | Scope | Event parameter |
|---|---|---|
| Section | Event | `event_category` |
| Label | Event | `event_label` |
| Asset | Event | `asset` |
| Link URL | Event | `link_url` |

(Leave scope = **Event**. They become available in Explorations immediately and
in standard reports within ~24–48h.)

### 2. Mark Key events (conversions)

**Admin → Data display → Key events → New key event**, then type each name
exactly (you can create them before GA4 has ever seen them):

- `booking_start`
- `newsletter_signup`
- `asset_download`

### 3. Confirm SPA page views are counted

The site uses client-side navigation. **Admin → Data streams → (web stream) →
Enhanced measurement → ⚙** and ensure **"Page changes based on browser history
events"** is ON (default). This makes navigation between Insights count as page
views.

### 4. Build the reports

- **Booking funnel**: **Explore → Funnel exploration**, steps:
  1. `session_start`  2. `cta_click`  3. `booking_start`.
  Shows drop-off from CTA intent → scheduling handoff.
- **CTA breakdown**: **Explore → Free-form**: dimension **Section** + **Label**,
  metric Event count, filter `Event name exactly matches cta_click`. Shows which
  CTAs and locations drive clicks.
- **Insights**: same, filtered to `insight_open` / `asset_download`, broken down
  by **Label** / **Asset**.

### 5. Verify after deploy

**Admin → DebugView** (with the *GA Debugger* Chrome extension, or append
`?debug_mode=1`). Click a hero CTA, submit a test newsletter signup, and walk a
booking through to the Cal.com handoff; confirm `cta_click`, `newsletter_signup`,
and `booking_start` appear with the expected parameters.

---

## LinkedIn Insight Tag setup

In LinkedIn Campaign Manager for the Good Transformer page/ad account:

1. Go to **Analyze → Insight Tag**.
2. Choose **Manually install tag** and copy the numeric partner ID from the tag.
3. Add it to GitHub Actions secrets as `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`.
4. Push/deploy the site.
5. Verify in Campaign Manager under **Analyze → Conversion Tracking → Data Sources**.

LinkedIn may take up to 24 hours to show the tag as active after a LinkedIn
member visits the site. For browser verification, open DevTools → Network,
filter for `ads.linkedin`, refresh the page, and confirm a LinkedIn request is
sent.

Use this for aggregated visitor demographics, matched companies, retargeting
audiences, and campaign optimisation. It should not be treated as a named
individual visitor identification tool.

---

## Plausible (optional, future)

`trackEvent` already calls `window.plausible(...)` with the same props, so if a
Plausible script is ever added there is **no code change**: the custom events
flow automatically. No Plausible account is wired today.
