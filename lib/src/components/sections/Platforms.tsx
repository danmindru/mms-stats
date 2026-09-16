import { motion } from 'motion/react'
import { ArrowUpRight, Check } from 'lucide-react'
import { Avatar } from '#/components/brand/Avatar'
import { PlatformLogo } from '#/components/brand/PlatformLogo'
import { ClientChart } from '#/components/charts/ClientChart'
import { MonthlyBars } from '#/components/charts/MonthlyBars'
import { Counter } from '#/components/ui/Counter'
import { Reveal, RevealGroup, RevealItem } from '#/components/ui/Reveal'
import { SpotlightCard } from '#/components/ui/SpotlightCard'
import {
  ACCOUNTS,
  PLATFORMS,
  PLATFORM_MONTHLY,
  PLATFORM_TOTALS,
  TOTAL_IMPRESSIONS,
  metric,
} from '#/data/stats'
import type { PlatformId } from '#/data/stats'
import { cn, compact, formatMetric, share } from '#/lib/format'

interface CardSpec {
  platform: PlatformId
  title: string
  subtitle: string
  bullets: string[]
  accounts: (keyof typeof ACCOUNTS)[]
  glow: string
}

const CARDS: CardSpec[] = [
  {
    platform: 'x',
    title: 'X',
    subtitle: 'Two accounts. Daily posting. The main engine.',
    bullets: [
      `${compact(metric('dan-x', 'Engagements') + metric('sandra-x', 'Engagements'))} engagements`,
      `${compact(metric('dan-x', 'Likes') + metric('sandra-x', 'Likes'))} likes`,
      `${compact(metric('dan-x', 'Profile visits') + metric('sandra-x', 'Profile visits'))} profile visits`,
      `${compact(32_200 + 22_800)} followers combined`,
    ],
    accounts: ['dan-x', 'sandra-x'],
    glow: 'rgba(23,23,28,0.10)',
  },
  {
    platform: 'youtube',
    title: 'Morning Maker Show',
    subtitle: 'A live show about building things, hosted by both.',
    bullets: [
      `${formatMetric(10_200, 'hours')} watched (+23% YoY)`,
      `+${compact(5_600)} subscribers (+15% YoY)`,
      `${compact(11_065)} subscribers total`,
      `${compact(411_513)} views all-time`,
    ],
    accounts: ['mms-youtube'],
    glow: 'rgba(225,29,29,0.14)',
  },
  {
    platform: 'linkedin',
    title: 'LinkedIn',
    subtitle: 'Sandra’s long-form home. Cumulative and climbing.',
    bullets: [
      `+58% vs the previous period`,
      `${compact(34_336)} social engagements`,
      `${compact(21_774)} reactions · ${compact(5_935)} comments`,
      `${compact(5_751)} saves`,
    ],
    accounts: ['sandra-linkedin'],
    glow: 'rgba(10,102,194,0.16)',
  },
]

export function Platforms() {
  return (
    <section
      id="platforms"
      className="relative scroll-mt-24 bg-stone/60 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <div className="mono-label text-muted">02 — per platform</div>
            <h2 className="mt-4 font-display text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-0.02em] text-balance text-primary">
              Three surfaces, one voice.
            </h2>
          </div>
          <p className="max-w-[560px] text-[18px] leading-[1.4] text-body-muted text-pretty lg:justify-self-end">
            Each platform gets its own format, its own rhythm, and its own
            numbers. None of it is paid distribution.
          </p>
        </Reveal>

        {/* share bar */}
        <Reveal className="mt-14" delay={0.05}>
          <div className="mono-label mb-3 flex items-center justify-between text-muted">
            <span>share of impressions</span>
            <span>{compact(TOTAL_IMPRESSIONS)} total</span>
          </div>
          <div className="flex h-12 w-full gap-1 overflow-hidden rounded-md">
            {(['x', 'linkedin', 'youtube'] as PlatformId[]).map((p, i) => {
              const pct = share(PLATFORM_TOTALS[p], TOTAL_IMPRESSIONS)
              const small = pct < 12
              return (
                <motion.div
                  key={p}
                  initial={{ flexGrow: 0, opacity: 0 }}
                  whileInView={{ flexGrow: Math.max(pct, 4), opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.1 + i * 0.1,
                  }}
                  className={cn(
                    'group relative flex min-w-0 items-center gap-2 text-white',
                    small ? 'justify-center px-2' : 'px-3',
                  )}
                  style={{ background: PLATFORMS[p].onLight, flexBasis: 0 }}
                  title={`${PLATFORMS[p].name} · ${pct}% · ${compact(PLATFORM_TOTALS[p])}`}
                >
                  <PlatformLogo platform={p} size={13} className="shrink-0" />
                  {!small && (
                    <span className="tabular truncate text-[13px]">
                      {pct}%{' '}
                      <span className="hidden opacity-60 md:inline">
                        · {compact(PLATFORM_TOTALS[p])}
                      </span>
                    </span>
                  )}
                </motion.div>
              )
            })}
          </div>
          <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-slate">
            {(['x', 'linkedin', 'youtube'] as PlatformId[]).map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: PLATFORMS[p].onLight }}
                />
                <span className="text-ink">{PLATFORMS[p].name}</span>
                <span className="tabular">
                  {share(PLATFORM_TOTALS[p], TOTAL_IMPRESSIONS)}% ·{' '}
                  {compact(PLATFORM_TOTALS[p])}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <RevealGroup className="mt-6 grid gap-4 lg:grid-cols-3" stagger={0.1}>
          {CARDS.map((c) => (
            <RevealItem key={c.platform} className="h-full">
              <PlatformCard spec={c} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

function PlatformCard({ spec }: { spec: CardSpec }) {
  const p = PLATFORMS[spec.platform]
  const total = PLATFORM_TOTALS[spec.platform]
  const pct = share(total, TOTAL_IMPRESSIONS)
  const people = Array.from(
    new Set(spec.accounts.flatMap((a) => ACCOUNTS[a].people)),
  )
  const primaryUrl = ACCOUNTS[spec.accounts[0]].url

  return (
    <SpotlightCard glow={spec.glow} className="h-full ring-1 ring-primary/5">
      <div className="flex h-full flex-col p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <span
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white"
            style={{ background: p.onLight }}
          >
            <PlatformLogo platform={spec.platform} size={20} />
          </span>
          <span className="flex items-center">
            {people.map((pe, i) => (
              <Avatar
                key={pe}
                person={pe}
                size={30}
                className={i > 0 ? '-ml-2.5' : ''}
              />
            ))}
          </span>
        </div>

        <div className="mt-8">
          <div className="mono-label text-muted">
            {p.metricLabel} · {pct}% of total
          </div>
          <div className="mt-2 font-display text-[clamp(44px,5vw,64px)] leading-none tracking-[-0.035em] text-primary">
            <Counter value={total} />
          </div>
        </div>

        <h3 className="mt-6 font-display text-[24px] leading-[1.2] tracking-tight text-primary">
          {spec.title}
        </h3>
        <p className="mt-1 text-[15px] leading-[1.45] text-body-muted">
          {spec.subtitle}
        </p>

        <div className="mt-6">
          <ClientChart height={96}>
            <MonthlyBars
              values={PLATFORM_MONTHLY[spec.platform]}
              color={p.onLight}
              height={96}
            />
          </ClientChart>
        </div>

        {spec.platform === 'x' && <XSplit />}

        <div className="mt-6 border-t border-hairline pt-5">
          <ul className="space-y-2.5 text-[14px] text-ink">
            {spec.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5">
                <span className="mt-[3px] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-pale-green text-deep-green">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <a
          href={primaryUrl}
          target="_blank"
          rel="noreferrer"
          className="group mt-auto inline-flex items-center gap-1 pt-6 text-[14px] text-ink underline-offset-4 hover:underline"
        >
          Open {spec.accounts.length > 1 ? 'the accounts' : 'the account'}
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </SpotlightCard>
  )
}

/** Dan vs Sandra split inside the X card. */
function XSplit() {
  const dan = ACCOUNTS['dan-x'].total
  const sandra = ACCOUNTS['sandra-x'].total
  const total = dan + sandra
  const danPct = share(dan, total)
  return (
    <div className="mt-5">
      <div className="mono-label mb-2 flex items-center justify-between text-muted">
        <span className="flex items-center gap-1.5">
          <Avatar person="dan" size={14} ring={false} />{' '}
          {ACCOUNTS['dan-x'].handle}
        </span>
        <span className="flex items-center gap-1.5">
          {ACCOUNTS['sandra-x'].handle}{' '}
          <Avatar person="sandra" size={14} ring={false} />
        </span>
      </div>
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-stone">
        <motion.div
          className="h-full rounded-l-full"
          style={{ background: '#1863dc' }}
          initial={{ width: 0 }}
          whileInView={{ width: `${danPct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="h-full flex-1 rounded-r-full"
          style={{ background: '#ff7759' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </div>
      <div className="tabular mt-2 flex items-center justify-between text-[13px] text-slate">
        <span>
          {compact(dan)} <span className="opacity-60">· {danPct}%</span>
        </span>
        <span>
          <span className="opacity-60">{100 - danPct}% · </span>
          {compact(sandra)}
        </span>
      </div>
    </div>
  )
}
