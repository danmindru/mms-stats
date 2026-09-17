import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { ArrowUpRight, Clock, Eye, Play, TrendingUp, UserPlus } from 'lucide-react'
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
  YOUTUBE_TOP_VIDEOS,
  youtubeThumb,
  youtubeUrl,
} from '#/data/youtube'
import type { YoutubeMetric, YoutubeVideo, YoutubeWindow } from '#/data/youtube'
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
              Views, watch time and subscribers for the channel since the
              beginning or just for last year.
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
        <Reveal delay={0.1} className="mt-6" blur={false}>
          <div className="rounded-lg bg-white ring-1 ring-hairline">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-hairline px-5 py-5 sm:px-7">
              <div>
                <div className="mono-label text-muted">
                  total YouTube {spec.label.toLowerCase()} ·{' '}
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
              <dl className="grid grid-cols-2 gap-x-8 gap-y-2 text-[13px]">
                <div>
                  <dt className="text-slate">per day</dt>
                  <dd className="tabular font-display text-[18px] text-ink">
                    {metric === 'hours' ? `${full(perDay)} h` : full(perDay)}
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

        {/* most watched videos */}
        <Reveal className="mt-12 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="mono-label text-muted">most watched</div>
            <h3 className="mt-2 font-display text-[clamp(22px,2.6vw,30px)] leading-[1.1] tracking-[-0.02em] text-ink">
              3 most watched videos in the past year
            </h3>
          </div>
          <span className="mono-label text-[10px] text-muted">
            from YouTube Studio · Sep 17, 2026
          </span>
        </Reveal>
        <RevealGroup className="mt-5 grid gap-3 md:grid-cols-3" stagger={0.08}>
          {YOUTUBE_TOP_VIDEOS.map((v, i) => (
            <RevealItem key={v.id} className="h-full">
              <VideoCard v={v} rank={i + 1} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

function VideoCard({ v, rank }: { v: YoutubeVideo; rank: number }) {
  const [failed, setFailed] = useState(false)
  return (
    <SpotlightCard tilt className="h-full ring-1 ring-hairline">
      <a
        href={youtubeUrl(v.id)}
        target="_blank"
        rel="noreferrer"
        aria-label={`${v.title} — ${compact(v.views)} views on YouTube`}
        className="group flex h-full flex-col"
      >
        <div className="relative aspect-video overflow-hidden bg-pale">
          {failed ? (
            <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_at_70%_40%,rgba(216,180,254,0.55),transparent_60%),linear-gradient(90deg,#ffffff,#faf5ff)] text-primary/50">
              <PlatformLogo platform="youtube" size={40} />
            </div>
          ) : (
            <img
              src={youtubeThumb(v.id)}
              alt=""
              loading="lazy"
              draggable={false}
              onError={() => setFailed(true)}
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          <span className="mono-label absolute top-3 left-3 rounded-xl bg-white/90 px-2 py-1 text-[10px] text-ink ring-1 ring-ink/5 backdrop-blur">
            0{rank}
          </span>
          <span className="tabular absolute right-3 bottom-3 rounded-xs bg-ink/80 px-1.5 py-0.5 text-[11px] text-white">
            {v.duration}
          </span>
          <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-primary shadow-[0_12px_30px_-12px_rgba(30,16,53,0.6)]">
              <Play size={18} fill="currentColor" strokeWidth={0} className="ml-0.5" />
            </span>
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h4 className="font-display text-[18px] leading-[1.25] tracking-tight text-ink">
            {v.title}
          </h4>
          <div className="mt-auto flex items-end justify-between gap-4 pt-5">
            <div>
              <div className="font-display text-[30px] leading-none tracking-[-0.03em] text-ink">
                <Counter value={v.views} decimals={0} />
              </div>
              <div className="mt-1 text-[12px] text-slate">views in the past year</div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[13px] text-slate transition-colors group-hover:text-ink">
              <PlatformLogo platform="youtube" size={12} />
              Watch
              <ArrowUpRight
                size={13}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>
        </div>
      </a>
    </SpotlightCard>
  )
}
