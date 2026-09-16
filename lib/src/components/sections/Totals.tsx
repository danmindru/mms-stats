import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { Clock, Eye, Heart, Layers, TrendingUp, Users } from 'lucide-react'
import { Toggle } from 'radix-ui'
import {
  CumulativeChart,
  SERIES_COLORS,
  SERIES_ORDER,
  SeriesGlyph,
  buildRows,
  seriesLabel,
} from '#/components/charts/CumulativeChart'
import type { SeriesKey, SeriesMode } from '#/components/charts/CumulativeChart'
import { ClientChart } from '#/components/charts/ClientChart'
import { Chip } from '#/components/ui/Button'
import { Counter } from '#/components/ui/Counter'
import { Reveal, RevealGroup, RevealItem } from '#/components/ui/Reveal'
import { SpotlightCard } from '#/components/ui/SpotlightCard'
import {
  COMBINED_CUMULATIVE,
  COMBINED_MONTHLY,
  MONTH_LABELS,
  PEAK_MONTH_INDEX,
  PER_DAY,
  TOTAL_AUDIENCE,
  TOTAL_ENGAGEMENTS,
  TOTAL_IMPRESSIONS,
  TOTAL_WATCH_HOURS,
} from '#/data/stats'
import { cn, compact, full } from '#/lib/format'

const KPIS = [
  {
    icon: Eye,
    label: 'Impressions',
    value: TOTAL_IMPRESSIONS,
    note: 'X + LinkedIn impressions, YouTube views',
    glow: 'rgba(0, 60, 51, 0.16)',
  },
  {
    icon: Heart,
    label: 'Engagements',
    value: TOTAL_ENGAGEMENTS,
    note: 'Likes, replies, reposts, saves, reactions',
    glow: 'rgba(255, 119, 89, 0.18)',
  },
  {
    icon: Users,
    label: 'Audience',
    value: TOTAL_AUDIENCE,
    note: 'Followers on X + YouTube subscribers',
    glow: 'rgba(24, 99, 220, 0.16)',
  },
  {
    icon: Clock,
    label: 'Hours watched',
    value: TOTAL_WATCH_HOURS,
    note: 'Morning Maker Show, last 365 days',
    glow: 'rgba(225, 29, 29, 0.14)',
  },
]

export function Totals() {
  const [mode, setMode] = useState<SeriesMode>('platform')
  const [cumulate, setCumulate] = useState(true)
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    x: true,
    youtube: true,
    linkedin: true,
    dan: true,
    sandra: true,
  })
  const [active, setActive] = useState<number | null>(null)

  const rows = useMemo(() => buildRows(mode, cumulate), [mode, cumulate])
  const keys = SERIES_ORDER[mode]
  const idx = active ?? MONTH_LABELS.length - 1
  const shownTotal = keys
    .filter((k) => enabled[k] !== false)
    .reduce((a, k) => a + (rows[idx][k] as number), 0)

  const toggle = (k: SeriesKey) => {
    const nextEnabled = { ...enabled, [k]: !enabled[k] }
    // never allow an empty chart
    if (!keys.some((kk) => nextEnabled[kk])) return
    setEnabled(nextEnabled)
  }

  return (
    <section id="totals" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <div className="mono-label text-muted">01 — totals</div>
            <h2 className="mt-4 font-display text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-0.02em] text-balance text-primary">
              Everything, added up.
            </h2>
          </div>
          <p className="max-w-[560px] text-[18px] leading-[1.4] text-body-muted text-pretty lg:justify-self-end">
            Combined reach across both people and all three platforms. Hover the
            chart to scrub through the year; toggle a series to see how much of
            the total each one carries.
          </p>
        </Reveal>

        {/* KPI row */}
        <RevealGroup
          className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4"
          stagger={0.07}
        >
          {KPIS.map((k) => (
            <RevealItem key={k.label}>
              <SpotlightCard
                glow={k.glow}
                tilt
                className="h-full ring-1 ring-hairline"
              >
                <div className="flex h-full flex-col justify-between gap-6 p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <span className="mono-label text-muted">{k.label}</span>
                    <k.icon
                      size={16}
                      strokeWidth={1.5}
                      className="text-slate"
                    />
                  </div>
                  <div>
                    <div className="font-display text-[clamp(34px,4vw,52px)] leading-none tracking-[-0.03em] text-primary">
                      <Counter value={k.value} />
                    </div>
                    <div className="mt-2 text-[13px] leading-[1.4] text-slate">
                      {k.note}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* The chart */}
        <Reveal
          className="mt-6 overflow-hidden rounded-lg bg-white ring-1 ring-hairline"
          delay={0.1}
        >
          <div className="flex flex-col gap-5 border-b border-hairline p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex flex-col gap-1">
              <span className="mono-label flex items-center gap-2 text-muted">
                <Layers size={12} />
                {cumulate ? 'running total' : 'per month'} ·{' '}
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={MONTH_LABELS[idx]}
                    initial={{ y: 6, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -6, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-primary"
                  >
                    {MONTH_LABELS[idx]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="font-display text-[clamp(32px,4vw,48px)] leading-none tracking-[-0.03em] text-primary">
                <Counter
                  value={shownTotal}
                  inView={false}
                  decimals={shownTotal >= 1e6 ? 1 : 0}
                />
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Segmented
                value={mode}
                onChange={(v) => setMode(v as SeriesMode)}
                options={[
                  { value: 'platform', label: 'By platform' },
                  { value: 'person', label: 'By person' },
                ]}
              />
              <Toggle.Root
                pressed={cumulate}
                onPressedChange={setCumulate}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[13px] leading-none ring-1 transition-all duration-300 active:scale-95',
                  cumulate
                    ? 'bg-primary text-white ring-primary'
                    : 'text-primary ring-hairline hover:ring-primary',
                )}
              >
                <TrendingUp size={12} />
                Cumulative
              </Toggle.Root>
            </div>
          </div>

          <div className="p-3 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {keys.map((k) => (
                <Chip
                  key={k}
                  active={enabled[k] !== false}
                  onClick={() => toggle(k)}
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{
                      background: SERIES_COLORS[k].light,
                      opacity: enabled[k] !== false ? 1 : 0.35,
                    }}
                  />
                  <SeriesGlyph k={k} size={12} />
                  {seriesLabel(k)}
                  <span className="tabular opacity-60">
                    {compact(rows[MONTH_LABELS.length - 1][k] as number)}
                  </span>
                </Chip>
              ))}
            </div>

            <ClientChart height={380}>
              <CumulativeChart
                mode={mode}
                enabled={enabled}
                cumulate={cumulate}
                height={380}
                onActiveIndex={setActive}
              />
            </ClientChart>
          </div>

          <MonthStrip active={active} />
        </Reveal>

        <Reveal
          className="mt-4 grid gap-3 text-[14px] text-slate sm:grid-cols-3"
          delay={0.15}
        >
          <p className="rounded-md bg-stone p-4">
            <span className="text-primary">{full(PER_DAY)}</span> impressions a
            day, on average, across the whole window.
          </p>
          <p className="rounded-md bg-stone p-4">
            Peak month:{' '}
            <span className="text-primary">
              {MONTH_LABELS[PEAK_MONTH_INDEX]}
            </span>{' '}
            with{' '}
            <span className="text-primary">
              {compact(COMBINED_MONTHLY[PEAK_MONTH_INDEX])}
            </span>{' '}
            combined.
          </p>
          <p className="rounded-md bg-stone p-4">
            Halfway point:{' '}
            <span className="text-primary">
              {compact(COMBINED_CUMULATIVE[6])}
            </span>{' '}
            by <span className="text-primary">{MONTH_LABELS[6]}</span>.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/** Animated month ruler beneath the chart. Highlights the hovered bucket. */
function MonthStrip({ active }: { active: number | null }) {
  const max = Math.max(...COMBINED_MONTHLY)
  return (
    <div className="flex items-end gap-1 border-t border-hairline px-5 pt-3 pb-4 sm:px-6">
      {COMBINED_MONTHLY.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
          <motion.div
            className="w-full rounded-[2px] bg-primary/15"
            animate={{
              height: 6 + (v / max) * 28,
              backgroundColor:
                active === i ? 'rgba(23,23,28,1)' : 'rgba(23,23,28,0.15)',
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          />
          <span
            className={cn(
              'mono-label hidden text-[10px] transition-colors sm:block',
              active === i ? 'text-primary' : 'text-muted',
            )}
          >
            {MONTH_LABELS[i].slice(0, 3)}
          </span>
        </div>
      ))}
    </div>
  )
}

export function Segmented({
  value,
  onChange,
  options,
  tone = 'dark',
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  tone?: 'dark' | 'light'
}) {
  return (
    <div
      className={cn(
        'relative inline-flex rounded-xl p-0.5 ring-1',
        tone === 'light'
          ? 'bg-white/5 ring-white/15'
          : 'bg-stone ring-transparent',
      )}
      role="tablist"
    >
      {options.map((o) => {
        const selected = value === o.value
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(o.value)}
            className={cn(
              'relative z-10 rounded-[26px] px-3 py-1.5 text-[13px] leading-none transition-colors',
              selected
                ? tone === 'light'
                  ? 'text-primary'
                  : 'text-white'
                : tone === 'light'
                  ? 'text-white/70 hover:text-white'
                  : 'text-primary/70 hover:text-primary',
            )}
          >
            {selected && (
              <motion.span
                layoutId={`seg-${options.map((x) => x.value).join('-')}`}
                className={cn(
                  'absolute inset-0 -z-10 rounded-[26px]',
                  tone === 'light' ? 'bg-white' : 'bg-primary',
                )}
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
