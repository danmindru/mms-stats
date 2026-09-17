# Morning Maker Show — yearly stats

A single-page pitch for the Morning Maker Show. It opens on the yearly
impressions (Sep 2025 – Sep 2026) for Dan (`@d4m1n`, X), Sandra (`@TakoTreba`,
X + LinkedIn) and the show on YouTube, explains how the show works in three
frames, then goes deeper: all accounts together, the YouTube channel in depth
(lifetime and past year), each account, everything else the show runs
(Hunted.Space, podcast, newsletter, site, ralphloop.sh, the show's X account)
and the companies it works with. Every chart is a running total.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build -> .output/  (node .output/server/index.mjs)
npm run lint
```

## Data

All figures come from the native analytics exports in [`../stats`](../stats)
(X Analytics, YouTube Studio, LinkedIn Content analytics). `src/data/stats.ts`
is the single source of truth:

- Headline totals are copied verbatim.
- Monthly buckets (Sep '25 → Sep '26) are read off the native charts and then
  normalised so they sum exactly to the reported totals.
- YouTube counts _views_; X and LinkedIn count _impressions_. Both roll into the
  combined figure, and this is stated in the footer.
- LinkedIn only exposes a 400-day window (Aug 14 2025 → Sep 17 2026); shown as
  reported.

Derived aggregates (per platform, cumulative series, milestones) are computed
in the same file so the UI never carries its own numbers.

- `src/data/youtube.ts` — the channel in two windows: lifetime (Mar 2024 → Sep
  2026, 31 buckets) and past year (13 buckets). Views, watch hours, subscribers
  and revenue from YouTube Studio; the lifetime series is "before the yearly
  window" + "the yearly window" so the two never disagree.
- `src/data/properties.ts` — the other properties (Hunted.Space's 3.05M Google
  impressions are from Search Console) and the sponsor list from
  morningmakershow.com/sponsor, in the order shown there.
- `src/data/story.ts` — the "how we work" copy.

## Stack

- React 19, TanStack Start / Router, Vite 8, Tailwind CSS v4
- [recharts](https://recharts.org) — stacked running-total area chart, sparklines
- [motion](https://motion.dev) — scroll reveals, magnetic CTA, cursor spotlight
  cards, layout-animated segmented control
- [@number-flow/react](https://number-flow.barvian.me) — rolling numerals
- [lucide-react](https://lucide.dev) icons
- `@fontsource-variable` Space Grotesk / Inter / JetBrains Mono as stand-ins for
  the reference design system's proprietary fonts

## Structure

```
src/
  data/                    stats.ts (accounts + aggregates), youtube.ts, properties.ts, story.ts
  lib/format.ts            cn(), compact/full number formatting
  components/
    brand/                 PlatformLogo (X / YouTube / LinkedIn / Spotify), Avatar, ShowIcon, AccountGlyph
    charts/                CumulativeChart, RunningChart (any time axis), Sparkline, ClientChart
    ui/                    Button (magnetic pill), Chip, Counter, Reveal, Segmented, SpotlightCard
    sections/              Header, Hero, Story (pinned 3-frame sequence), Totals, YouTube, People,
                           Properties (+ sponsors), Cta, Footer
  routes/                  __root.tsx (document + meta), index.tsx (page)
public/
  avatars/                 dan, sandra, mms
  story/                   the three "how we work" illustrations (generated, webp)
  properties/              icons and preview crops for Hunted.Space, the site, newsletter, ralphloop.sh
  logos/                   sponsor logos from morningmakershow.com (light/dark variants)
  favicons, og.png         made from the show icon
```

Design tokens (colours, radii, type scale, easings, keyframes) live in
`src/styles.css` under `@theme`. The palette sits on Tailwind's purple scale so
every surface has a known contrast partner: purple-950 for the deepest bands,
purple-900 for dark cards (white text 11:1), purple-700 as the primary
(white text 6.6:1), purple-300/100/50 for highlights and pale washes. White
canvas, 8/22px radii, pill buttons, tight display type with uppercase mono
labels, one warm amber accent.
