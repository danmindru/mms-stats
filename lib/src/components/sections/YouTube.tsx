import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { ArrowUpRight, Clock, Eye, TrendingUp, UserPlus } from 'lucide-react'
import { ShowIcon } from '#/components/brand/Avatar'
import { PlatformLogo } from '#/components/brand/PlatformLogo'
import { ClientChart } from '#/components/charts/ClientChart'
import { RunningChart } from '#/components/charts/RunningChart'
import { Sparkline } from '#/components/charts/Sparkline'
import { Counter } from '#/components/ui/Counter'
import { Reveal, RevealGroup, RevealItem } from '#/components/ui/Reveal'
import { Segmented } from '#/components/ui/Segmented'
import { SpotlightCard } from '#/components/ui/SpotlightCard'
import { SHOW } from '#/data/stats'
import {
  YOUTUBE,
  YOUTUBE_METRICS,
  YOUTUBE_NOW,
  YOUTUBE_PEAKS,
} from '#/data/youtube'
import type { YoutubeMetric, YoutubeWindow } from '#/data/youtube'
import { cn, compact, formatMetric, full } from '#/lib/format'

const ICON: Record<YoutubeMetric, typeof Eye> = {
  views: Eye,
  hours: Clock,
  subs: UserPlus,
}

const COLOR: Record<YoutubeMetric, string> = {
  views: '#7e22ce',
  hours: '#a855f7',
  subs: '#e11d1d',
}

const fmt = (metric: YoutubeMetric) => (n: number) =>
  metric === 'hours' ? formatMetric(n, 'hours') : compact(n)

export function YouTube() {
  const [window, setWindow] = useState<YoutubeWindow>('total')
  const [metric, setMetric] = useState<YoutubeMetric>('views')
  const [hover, setHover] = useState<number | null>(null)

  const data = YOUTUBE[window]
  const series = data[metric]
  const spec = YOUTUBE_METRICS.find((m) => m.id === metric) ?? YOUTUBE_METRICS[0]
  const shown = hover === null ? series.total : (series.running[hover] ?? 0)
  const shownLabel = hover === null ? data.range : series.labels[hover]
  const perDay = Math.round(series.total / data.days)
  const marks =
    window === 'total'
      ? [{ index: series.labels.length - 13, label: 'past year' }]
      : []

  return (
    <section className="relative bg-stone/60 py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <div className="mono-label text-muted">02 — youtube, in depth</div>
            <div className="mt-4 flex items-center gap-4">
              <ShowIcon size={56} badge="youtube" />
              <div>
                <h2 className="font-display text-[clamp(30px,4.2vw,50px)] leading-[1] tracking-[-0.02em] text-ink">
                  {SHOW.name} on YouTube
                </h2>
                <a
                  href={SHOW.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-2 inline-flex items-center gap-1.5 text-[14px] text-slate hover:text-ink"
                >
                  <PlatformLogo platform="youtube" size={12} />
                  youtube.com/@MorningMakerShow
                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-[560px] text-[17px] leading-[1.45] text-body-muted">
              Views, watch time and subscribers for the channel. Total is
              everything since the first episode on {YOUTUBE_NOW.since}. Past
              year is the same window as the rest of this page. Every chart is a
              running total.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <Segmented<YoutubeWindow>
                value={window}
                onChange={(w) => {
                  setWindow(w)
                  setHover(null)
                }}
                options={[
                  { value: 'total', label: 'Total' },
                  { value: 'year', label: 'Past year' },
                ]}
                size="md"
              />
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={window}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.25 }}
                  className="mono-label text-muted"
                >
                  {data.range}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        {/* metric cards: click to drive the big chart */}
        <RevealGroup
          className="mt-10 grid gap-3 md:grid-cols-3"
          stagger={0.08}
        >
          {YOUTUBE_METRICS.map((m) => {
            const s = data[m.id]
            const Icon = ICON[m.id]
            const selected = metric === m.id
            const delta = data.delta?.[m.id]
            return (
              <RevealItem key={m.id}>
                <button
                  type="button"
                  onClick={() => {
                    setMetric(m.id)
                    setHover(null)
                  }}
                  aria-pressed={selected}
                  className="block w-full text-left"
                >
                  <SpotlightCard
                    tilt
                    className={cn(
                      'h-full ring-1 transition-shadow',
                      selected
                        ? 'ring-primary shadow-[0_18px_50px_-24px_rgba(126,34,206,0.45)]'
                        : 'ring-hairline hover:ring-primary/40',
                    )}
                  >
                    <div className="flex h-full flex-col gap-5 p-5 sm:p-6">
                      <div className="flex items-center justify-between">
                        <span className="mono-label text-muted">
                          {m.label}
                        </span>
                        <span
                          className={cn(
                            'inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors',
                            selected
                              ? 'bg-primary text-white'
                              : 'bg-pale text-primary',
                          )}
                        >
                          <Icon size={14} strokeWidth={1.75} />
                        </span>
                      </div>
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <div className="font-display text-[clamp(34px,3.6vw,48px)] leading-none tracking-[-0.035em] text-ink">
                            <Counter
                              value={s.total}
                              inView={false}
                              decimals={s.total >= 100_000 ? 0 : 1}
                            />
                          </div>
                          <div className="mt-1.5 text-[12px] text-slate">
                            {m.unit} · {data.label.toLowerCase()}
                            {delta !== undefined && (
                              <span className="ml-2 inline-flex items-center gap-1 rounded-xl bg-emerald-50 px-1.5 py-0.5 text-[11px] text-emerald-700 ring-1 ring-emerald-200">
                                <TrendingUp size={10} /> +{delta}% on the year
                                before
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="-mx-2">
                        <ClientChart height={56}>
                          <Sparkline
                            id={`yt-${m.id}-${window}`}
                            monthly={s.monthly}
                            labels={s.labels}
                            color={COLOR[m.id]}
                            height={56}
                            showAxis={false}
                          />
                        </ClientChart>
                      </div>
                    </div>
                  </SpotlightCard>
                </button>
              </RevealItem>
            )
          })}
        </RevealGroup>

        {/* big chart */}
        <Reveal delay={0.1} className="mt-6">
          <div className="rounded-lg bg-white ring-1 ring-hairline">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-hairline px-5 py-5 sm:px-7">
              <div>
                <div className="mono-label text-muted">
                  running total · {spec.label.toLowerCase()} ·{' '}
                  <span className="text-ink">{shownLabel}</span>
                </div>
                <div className="mt-2 font-display text-[clamp(40px,5vw,72px)] leading-none tracking-[-0.04em] text-ink">
                  <Counter
                    key={`${window}-${metric}`}
                    value={shown}
                    inView={false}
                    decimals={shown >= 100_000 ? 0 : 1}
                    suffix={metric === 'hours' ? ' hours' : undefined}
                    suffixClassName="text-[0.3em] text-muted ml-2 font-sans tracking-normal"
                  />
                </div>
              </div>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-2 text-[13px] sm:grid-cols-3">
                <div>
                  <dt className="text-slate">per day</dt>
                  <dd className="tabular font-display text-[18px] text-ink">
                    {metric === 'hours' ? `${full(perDay)} h` : full(perDay)}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate">est. revenue</dt>
                  <dd className="tabular font-display text-[18px] text-ink">
                    {formatMetric(data.revenue, 'currency')}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate">subscribers now</dt>
                  <dd className="tabular font-display text-[18px] text-ink">
                    {full(YOUTUBE_NOW.subscribers)}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="p-3 sm:p-6">
              <ClientChart height={300}>
                <RunningChart
                  id={`yt-main-${window}-${metric}`}
                  labels={series.labels}
                  running={series.running}
                  monthly={series.monthly}
                  color={COLOR[metric]}
                  format={fmt(metric)}
                  height={300}
                  onActiveIndex={setHover}
                  marks={marks}
                />
              </ClientChart>
            </div>
          </div>
        </Reveal>

        {/* facts */}
        <RevealGroup className="mt-6 grid gap-3 lg:grid-cols-3" stagger={0.08}>
          <RevealItem>
            <div className="h-full rounded-lg bg-white p-6 ring-1 ring-hairline">
              <div className="mono-label text-muted">biggest days</div>
              <ul className="mt-4 divide-y divide-hairline">
                {YOUTUBE_PEAKS.map((p) => (
                  <li key={p.when} className="flex gap-4 py-3">
                    <span className="mono-label w-[72px] shrink-0 pt-0.5 text-muted">
                      {p.when}
                    </span>
                    <span className="text-[14px] leading-[1.45] text-body-muted">
                      <span className="tabular font-display text-[16px] text-ink">
                        {compact(p.views)} views
                      </span>{' '}
                      in a day. {p.note}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
          <RevealItem>
            <div className="h-full rounded-lg bg-white p-6 ring-1 ring-hairline">
              <div className="mono-label text-muted">
                most watched, last 48 hours
              </div>
              <ol className="mt-4 space-y-3">
                {YOUTUBE_NOW.topRightNow.map((t, i) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="mono-label w-6 text-muted">0{i + 1}</span>
                    <span className="flex h-8 w-12 shrink-0 items-center justify-center rounded-xs bg-pale text-primary">
                      <PlatformLogo platform="youtube" size={12} />
                    </span>
                    <span className="text-[15px] text-ink">{t}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-[12px] text-muted">
                From YouTube Studio on Sep 15, 2026.
              </p>
            </div>
          </RevealItem>
          <RevealItem>
            <div className="grain h-full rounded-lg bg-band p-6 text-white">
              <div className="mono-label text-white/70">in plain words</div>
              <p className="mt-4 text-[16px] leading-[1.5] text-white/85">
                The channel started in {YOUTUBE_NOW.since.slice(-4)}. Just over
                half of everything it has ever done happened in the past year:{' '}
                {compact(YOUTUBE.year.views.total)} of{' '}
                {compact(YOUTUBE.total.views.total)} views,{' '}
                {compact(YOUTUBE.year.hours.total)} of{' '}
                {compact(YOUTUBE.total.hours.total)} hours watched, and{' '}
                {compact(YOUTUBE.year.subs.total)} of{' '}
                {compact(YOUTUBE.total.subs.total)} subscribers. Watch time is
                up 23% and subscribers up 15% on the year before.
              </p>
              <p className="mt-4 text-[13px] text-white/70">
                Monthly values are read from YouTube Studio’s charts and scaled
                to the reported totals.
              </p>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  )
}
