import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { Clock, Eye, Heart, Users } from 'lucide-react'
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
import { Segmented } from '#/components/ui/Segmented'
import { Reveal, RevealGroup, RevealItem } from '#/components/ui/Reveal'
import { SpotlightCard } from '#/components/ui/SpotlightCard'
import {
  COMBINED_CUMULATIVE,
  MILESTONES,
  MONTHS,
  MONTH_LABELS,
  TOTAL_AUDIENCE,
  TOTAL_ENGAGEMENTS,
  TOTAL_IMPRESSIONS,
  TOTAL_WATCH_HOURS,
} from '#/data/stats'
import { cn, compact } from '#/lib/format'

const KPIS = [
  {
    icon: Eye,
    label: 'yearly impressions',
    value: TOTAL_IMPRESSIONS,
    note: 'X and LinkedIn impressions plus YouTube views',
  },
  {
    icon: Heart,
    label: 'yearly engagements',
    value: TOTAL_ENGAGEMENTS,
    note: 'Likes, replies, reposts, saves and reactions',
  },
  {
    icon: Users,
    label: 'followers now',
    value: TOTAL_AUDIENCE,
    note: 'X followers plus YouTube subscribers, as of Sep 2026',
  },
  {
    icon: Clock,
    label: 'yearly hours watched',
    value: TOTAL_WATCH_HOURS,
    note: 'Morning Maker Show on YouTube',
  },
]

export function Totals() {
  const [mode, setMode] = useState<SeriesMode>('platform')
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      Object.values(SERIES_ORDER)
        .flat()
        .map((k) => [k, true]),
    ),
  )
  const [active, setActive] = useState<number | null>(null)

  const rows = useMemo(() => buildRows(mode), [mode])
  const keys = SERIES_ORDER[mode]
  const last = MONTH_LABELS.length - 1
  const idx = active ?? last
  const shownTotal = keys
    .filter((k) => enabled[k] !== false)
    .reduce((a, k) => a + (rows[idx][k] as number), 0)

  const toggle = (k: SeriesKey) => {
    const next = { ...enabled, [k]: !enabled[k] }
    if (!keys.some((kk) => next[kk])) return
    setEnabled(next)
  }

  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <div className="mono-label text-muted">01 — yearly totals</div>
            <h2 className="mt-3 font-display text-[clamp(32px,4.5vw,52px)] leading-[1] tracking-[-0.02em] text-ink">
              All accounts together
            </h2>
          </div>
          <p className="max-w-[560px] text-[17px] leading-[1.45] text-body-muted lg:justify-self-end">
            Every chart on this page is a yearly running total. Hover the
            chart to see the total at any month. Click a label to hide or show
            that part.
          </p>
        </Reveal>

        <RevealGroup
          className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4"
          stagger={0.07}
        >
          {KPIS.map((k) => (
            <RevealItem key={k.label}>
              <SpotlightCard
                tilt
                className="h-full ring-1 ring-hairline"
              >
                <div className="flex h-full flex-col justify-between gap-6 p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <span className="mono-label text-muted">
                      {k.label}
                    </span>
                    <k.icon
                      size={16}
                      strokeWidth={1.5}
                      className="text-slate"
                    />
                  </div>
                  <div>
                    <div className="font-display text-[clamp(34px,4vw,52px)] leading-none tracking-[-0.03em] text-ink">
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

        <Reveal
          className="mt-6 overflow-hidden rounded-lg bg-white ring-1 ring-hairline"
          delay={0.1}
        >
          <div className="flex flex-col gap-5 border-b border-hairline p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex flex-col gap-1">
              <span className="mono-label flex items-center gap-2 text-muted">
                running total ·{' '}
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={MONTH_LABELS[idx]}
                    initial={{ y: 6, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -6, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-ink"
                  >
                    {MONTH_LABELS[idx]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="font-display text-[clamp(32px,4vw,48px)] leading-none tracking-[-0.03em] text-ink">
                <Counter
                  value={shownTotal}
                  inView={false}
                  decimals={shownTotal >= 1e6 ? 1 : 0}
                />
              </span>
            </div>

            <Segmented<SeriesMode>
              value={mode}
              onChange={setMode}
              options={[
                { value: 'platform', label: 'By platform' },
                { value: 'account', label: 'By account' },
              ]}
            />
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
                    {compact(rows[last][k] as number)}
                  </span>
                </Chip>
              ))}
            </div>

            <ClientChart height={380}>
              <CumulativeChart
                mode={mode}
                enabled={enabled}
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
          {MILESTONES.map((m) => (
            <p key={m.threshold} className="rounded-md bg-stone p-4">
              Passed <span className="text-ink">{compact(m.threshold)}</span> in{' '}
              <span className="text-ink">
                {MONTHS[m.monthIndex]} {m.monthIndex <= 3 ? '2025' : '2026'}
              </span>
              .
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/** Running-total ruler beneath the chart. Highlights the hovered month. */
function MonthStrip({ active }: { active: number | null }) {
  const max = COMBINED_CUMULATIVE[COMBINED_CUMULATIVE.length - 1]
  return (
    <div className="flex items-end gap-1 border-t border-hairline px-5 pt-3 pb-4 sm:px-6">
      {COMBINED_CUMULATIVE.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
          <motion.div
            className="w-full rounded-[2px]"
            animate={{
              height: 4 + (v / max) * 30,
              backgroundColor:
                active === i ? 'rgba(126,34,206,1)' : 'rgba(126,34,206,0.18)',
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          />
          <span
            className={cn(
              'mono-label hidden text-[10px] transition-colors sm:block',
              active === i ? 'text-ink' : 'text-muted',
            )}
          >
            {MONTH_LABELS[i].slice(0, 3)}
          </span>
        </div>
      ))}
    </div>
  )
}
