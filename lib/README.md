# Dan & Sandra — a year of reach

A single-page, animated visualisation of impressions over the past 365 days for
Dan (`@d4m1n`, X), Sandra (`@TakoTreba`, X + LinkedIn) and the Morning Maker
Show on YouTube. Combined totals first, then per platform, then per person,
then the moments that made the spikes.

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
- LinkedIn only exposes a 400-day window (Aug 13 2025 → Sep 16 2026); shown as
  reported.
- Morning Maker Show is a shared channel and is credited 50/50 per person.

Derived aggregates (per platform, per person, cumulative series, moments) are
computed in the same file so the UI never carries its own numbers.

## Stack

- React 19, TanStack Start / Router, Vite 8, Tailwind CSS v4
- [recharts](https://recharts.org) — stacked cumulative area chart, monthly bars
- [motion](https://motion.dev) — scroll reveals, split-word headline, magnetic
  CTA, cursor spotlight cards, layout-animated segmented control
- [@number-flow/react](https://number-flow.barvian.me) — rolling numerals
- [radix-ui](https://www.radix-ui.com) toggle, [lucide-react](https://lucide.dev) icons
- `@fontsource-variable` Space Grotesk / Inter / JetBrains Mono as stand-ins for
  the reference design system's proprietary fonts

## Structure

```
src/
  data/stats.ts            numbers + derived aggregates
  lib/format.ts            cn(), compact/full number formatting
  components/
    brand/                 PlatformLogo (X / YouTube / LinkedIn), Avatar
    charts/                CumulativeChart, MonthlyBars, ShareRing, ClientChart
    ui/                    Button (magnetic pill), Chip, Counter, Reveal, SpotlightCard
    sections/              Nav, Hero, Ticker, Totals, Platforms, People, Moments, Cta, Footer
  routes/                  __root.tsx (document + meta), index.tsx (page)
public/avatars/            dan.png, sandra.png
```

Design tokens (colours, radii, type scale, easings, keyframes) live in
`src/styles.css` under `@theme`, following the Cohere-derived system: white
editorial canvas, deep-green dark band, soft stone surfaces, 8/22px radii, pill
CTAs, tight display type with uppercase mono labels, coral and blue accents.
