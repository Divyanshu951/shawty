# Complete Shawty — URL Shortener Functionality

**Shawty** is a Next.js URL shortener with auth (Google OAuth via better-auth), a sidebar-based dashboard layout, and a "quick shorten" form that already creates links in a Neon Postgres DB. The project has a well-designed design system (Material Design 3 warm-orange tokens) and several stub pages that need to be brought to life.

Based on the [todo.txt](file:///c:/Users/divya/vscode/REAL_PROJECTS/shawty/todo.txt) and the current codebase state, here is the plan to add all remaining functionality.

---

## User Review Required

> [!IMPORTANT]
> **URL redirect domain**: The current code generates links like `https://link.shawty.online/<slug>`. The redirect handler needs to be implemented. I'll add an API route at `/api/redirect/[slug]` for now, but this will only work for the main domain (localhost / shawty.online). If `link.shawty.online` is a separate subdomain, you'll need to configure DNS/reverse proxy separately. Please confirm if redirect should live at the app's own domain or a separate subdomain.

> [!IMPORTANT]
> **Click tracking granularity**: The DB schema has a commented-out `clicks` table with columns for IP, country, city, browser, OS, device, and referrer. I plan to **uncomment and use it** with basic `User-Agent` parsing (via a lightweight utility, no external geo-IP service). If you want full geo-IP data (country/city), we'd need to integrate a service like `ip-api.com` or Vercel's `req.geo`. Let me know your preference.

> [!WARNING]
> **Hardcoded values**: The dashboard currently has a hardcoded `+14.2% this month` stat, the links page shows `142 total shortlinks` hardcoded, the settings page shows `Premium / $29.00 / month` hardcoded, and the chart uses static dummy data. I'll replace all of these with real data where possible, and remove premium/billing references since there's no payment integration.

---

## Open Questions

1. **Should the "Make a new Shawty" button on the dashboard open a modal, or navigate to a dedicated create page?** I'll default to a **modal** for better UX.
   model us better
2. **Link expiration**: The schema has an `expiresAt` field. Should the shorten form expose an optional expiry date picker, or is this a future feature?
3. **Should deleted/deactivated links show a "Link expired" page, or just 404?**
   no it is a separate project which i have worked on so dont worry about that

so dont worry about link.shawty.online implemetation it's taken care of just work onthis
---

## Proposed Changes

### Phase 1: Core URL Redirect & Click Tracking

This is the most critical missing piece — without it, shortened links don't actually work.

---

#### [MODIFY] [url-schema.ts](file:///c:/Users/divya/vscode/REAL_PROJECTS/shawty/db/schemas/url-schema.ts)

- **Uncomment** the `clicks` table and the `urls_user_created_idx` index.
- Add Drizzle relations between `urlTable` and `clicks`.

#### [NEW] `app/api/redirect/[slug]/route.ts`

- `GET` handler that:
  1. Looks up the `slug` in `urlTable`
  2. Checks `isActive` and `expiresAt`
  3. Inserts a row into `clicks` (IP, user-agent, referrer, basic browser/OS parsing)
  4. Increments `clickCount` on the URL
  5. Returns a `307 Temporary Redirect` to the `destinationUrl`
  6. Returns 404 if slug not found or link inactive/expired

#### [NEW] `lib/parse-user-agent.ts`

- Lightweight utility to extract browser name and OS from a `User-Agent` string (no npm dependency — simple regex parsing).

---

### Phase 2: Links Page — Full CRUD

The links page currently shows a static header. It needs to list, edit, delete, and toggle links.

---

#### [MODIFY] [links/page.tsx](file:///c:/Users/divya/vscode/REAL_PROJECTS/shawty/app/%28app%29/links/page.tsx)

- Fetch all URLs for the current user (`ORDER BY createdAt DESC`)
- Display real total count (replacing hardcoded `142`)
- Render a list of `<LinkCard />` components
- Add search/filter bar

#### [NEW] `components/link-card.tsx`

- Card component showing: slug, destination URL (truncated), click count, created date, active status
- Actions: copy link, toggle active/inactive, edit, delete
- Uses the design system's card style (flat, 2px border, no shadow)

#### [NEW] `app/link-actions.ts`

- Server actions: `deleteLink`, `toggleLinkActive`, `updateLink`
- All actions verify ownership (userId matches session)

#### [NEW] `components/create-link-modal.tsx`

- Modal overlay for creating a new link (reuses the shorten form logic)
- Triggered by "Make a new Shawty" button on dashboard and links pages
- Fields: destination URL, custom alias (optional), expiry date (optional)

#### [NEW] `components/edit-link-modal.tsx`

- Modal for editing an existing link's destination URL, custom alias, and expiry
- Pre-populates current values

#### [NEW] `components/modal.tsx`

- Reusable modal wrapper with backdrop blur, close on escape/outside click, smooth framer-motion animation

---

### Phase 3: Dashboard — Real Data & Stats

The dashboard needs to show real metrics instead of hardcoded values.

---

#### [MODIFY] [dashboard/page.tsx](file:///c:/Users/divya/vscode/REAL_PROJECTS/shawty/app/%28app%29/dashboard/page.tsx)

- Calculate real percentage change (compare this month's clicks to last month's)
- Add additional stat cards: **Total Links**, **Active Links**, **Clicks Today**
- Wire the "Make a new Shawty" button to the create-link modal

#### [MODIFY] [click-activity-chart.tsx](file:///c:/Users/divya/vscode/REAL_PROJECTS/shawty/components/click-activity-chart.tsx)

- Accept click data as props (from server component)
- Render actual click counts per day from the `clicks` table

#### [NEW] `app/dashboard-actions.ts`

- Server-side data fetching functions:
  - `getDashboardStats()` — total clicks, total links, active links, clicks today
  - `getClickActivity(days: number)` — clicks grouped by day for the chart

#### [NEW] `components/stat-card.tsx`

- Reusable stat card component (icon, title, value, optional trend)

#### [NEW] `components/recent-links.tsx`

- Shows the 5 most recently created links with quick copy action
- Displayed below the chart on the dashboard

---

### Phase 4: Analytics Page

The analytics page is currently a stub. Build it into a useful analytics dashboard.

---

#### [MODIFY] [analytics/page.tsx](file:///c:/Users/divya/vscode/REAL_PROJECTS/shawty/app/%28app%29/analytics/page.tsx)

- Show analytics overview: clicks over time, top links, browser/OS breakdown
- Time range selector (7d, 30d, 90d)

#### [NEW] `app/analytics-actions.ts`

- Server-side data fetching:
  - `getClicksOverTime(userId, range)` — clicks grouped by day
  - `getTopLinks(userId, range)` — top 10 links by click count
  - `getBrowserStats(userId, range)` — browser distribution
  - `getOsStats(userId, range)` — OS distribution

#### [NEW] `components/analytics/clicks-over-time-chart.tsx`

- Line/bar chart showing clicks over time (reuses framer-motion bar pattern)

#### [NEW] `components/analytics/top-links-table.tsx`

- Table of top-performing links with slug, destination, clicks, and trend

#### [NEW] `components/analytics/browser-os-breakdown.tsx`

- Simple horizontal bar breakdown for browser and OS distribution

---

### Phase 5: Settings Page — Make It Functional

The settings page has a nice UI but inputs are read-only and non-functional.

---

#### [MODIFY] [settings/page.tsx](file:///c:/Users/divya/vscode/REAL_PROJECTS/shawty/app/%28app%29/settings/page.tsx)

- Make name update functional (use better-auth's `updateUser` API)
- Remove or simplify the Premium billing card (no payment integration exists) — replace with account info (member since, total links created, etc.)
- Add delete account functionality

#### [NEW] `app/settings-actions.ts`

- Server actions: `updateProfile`, `deleteAccount`

---

### Phase 6: Header (Mobile) & Polish

The sidebar is desktop-only (`hidden md:flex`). Mobile users have no navigation.

---

#### [NEW] `components/mobile-header.tsx`

- Responsive header visible only on mobile (`md:hidden`)
- Contains: logo/app name, hamburger menu button, theme toggle
- Hamburger opens a slide-out drawer with the same nav items as the sidebar

#### [MODIFY] [app/(app)/layout.tsx](file:///c:/Users/divya/vscode/REAL_PROJECTS/shawty/app/%28app%29/layout.tsx)

- Add `<MobileHeader />` above `<main>` for mobile viewports

#### [MODIFY] [not-found.tsx](file:///c:/Users/divya/vscode/REAL_PROJECTS/shawty/app/not-found.tsx)

- Update to use the design system colors instead of generic grays

---

## Verification Plan

### Automated Tests

- `pnpm build` — ensure there are no TypeScript or build errors
- Manual verification of redirect flow: create a link → visit `/api/redirect/<slug>` → verify 307 redirect and click count increment

### Manual Verification

1. **Create link** → verify it appears in the links list
2. **Click shortened link** → verify redirect works and click count increases
3. **Dashboard stats** → verify real numbers appear
4. **Edit/delete link** → verify CRUD operations work
5. **Analytics** → verify charts render with real click data
6. **Settings** → verify name update works
7. **Mobile** → verify mobile header/drawer navigation works
8. **Dark mode** — verify all new components respect the existing theme toggle

---

## Execution Order

| Order | Phase                         | Priority    | Estimated Files |
| ----- | ----------------------------- | ----------- | --------------- |
| 1     | **Redirect & Click Tracking** | 🔴 Critical | 4 files         |
| 2     | **Links Page CRUD**           | 🔴 Critical | 6 files         |
| 3     | **Dashboard Real Data**       | 🟡 High     | 5 files         |
| 4     | **Analytics Page**            | 🟡 High     | 5 files         |
| 5     | **Settings Functional**       | 🟢 Medium   | 2 files         |
| 6     | **Mobile Header & Polish**    | 🟢 Medium   | 3 files         |

Total: ~25 new/modified files across 6 phases.
