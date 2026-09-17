import { motion } from 'motion/react'
import { ArrowUpRight, Check } from 'lucide-react'
import { AccountGlyph } from '#/components/brand/Avatar'
import { PlatformLogo } from '#/components/brand/PlatformLogo'
import { ClientChart } from '#/components/charts/ClientChart'
import { Sparkline } from '#/components/charts/Sparkline'
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
import type { AccountId, PlatformId } from '#/data/stats'
import { cn, compact, formatMetric, share } from '#/lib/format'

interface CardSpec {
  platform: PlatformId
  title: string
  subtitle: string
  bullets: string[]
  accounts: AccountId[]
  glow: string
}

const CARDS: CardSpec[] = [
  {
    platform: 'x',
    title: 'X',
    subtitle: 'Two accounts. Both post every day.',
    bullets: [
      `${compact(metric('dan-x', 'Engagements') + metric('sandra-x', 'Engagements'))} engagements`,
      `${compact(metric('dan-x', 'Likes') + metric('sandra-x', 'Likes'))} likes`,
      `${compact(metric('dan-x', 'Profile visits') + metric('sandra-x', 'Profile visits'))} profile visits`,
      `${compact(metric('dan-x', 'Followers') + metric('sandra-x', 'Followers'))} followers across both accounts`,
    ],
    accounts: ['dan-x', 'sandra-x'],
    glow: 'rgba(23,23,28,0.10)',
  },
  {
    platform: 'youtube',
    title: 'Morning Maker Show',
    subtitle:
      'A live show about building things. Dan and Sandra host it together.',
    bullets: [
      `${formatMetric(metric('mms-youtube', 'Watch time'), 'hours')} watched, up 23% on last year`,
      `${compact(metric('mms-youtube', 'New subscribers'))} new subscribers, up 15%`,
      `${compact(metric('mms-youtube', 'Subscribers'))} subscribers in total`,
      `${compact(metric('mms-youtube', 'All-time views'))} views since the channel started`,
    ],
    accounts: ['mms-youtube'],
    glow: 'rgba(225,29,29,0.14)',
  },
  {
    platform: 'linkedin',
    title: 'LinkedIn',
    subtitle: 'Sandra’s account. Longer posts, mostly about work.',
    bullets: [
      'Up 58% on the period before',
      `${compact(metric('sandra-linkedin', 'Social engagements'))} engagements`,
      `${compact(metric('sandra-linkedin', 'Reactions'))} reactions and ${compact(metric('sandra-linkedin', 'Comments'))} comments`,
      `${compact(metric('sandra-linkedin', 'Saves'))} saves`,
    ],
    accounts: ['sandra-linkedin'],
    glow: 'rgba(10,102,194,0.16)',
  },
]

const ORDER: PlatformId[] = ['x', 'linkedin', 'youtube']

export function Platforms() {
  return (
    <section id="platforms" className="relative bg-stone/60 py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <div className="mono-label text-muted">02 — by platform</div>
            <h2 className="mt-3 font-display text-[clamp(32px,4.5vw,52px)] leading-[1] tracking-[-0.02em] text-ink">
              X, YouTube and LinkedIn
            </h2>
          </div>
          <p className="max-w-[560px] text-[17px] leading-[1.45] text-body-muted lg:justify-self-end">
            Yearly totals for each platform. YouTube counts views; X and
            LinkedIn count impressions. Nothing here was paid for.
          </p>
        </Reveal>

        <Reveal className="mt-10" delay={0.05}>
          <div className="mono-label mb-3 flex items-center justify-between text-muted">
            <span>share of the yearly total</span>
            <span>{compact(TOTAL_IMPRESSIONS)}</span>
          </div>
          <div className="flex h-12 w-full gap-1 overflow-hidden rounded-md">
            {ORDER.map((p, i) => {
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
                    'relative flex min-w-0 items-center gap-2 text-white',
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
            {ORDER.map((p) => (
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

  return (
    <SpotlightCard glow={spec.glow} className="h-full ring-1 ring-ink/5">
      <div className="flex h-full flex-col p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <span
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white"
            style={{ background: p.onLight }}
          >
            <PlatformLogo platform={spec.platform} size={20} />
          </span>
          <span className="flex items-center">
            {spec.accounts.map((a, i) => (
              <AccountGlyph
                key={a}
                account={a}
                size={32}
                badge={false}
                className={i > 0 ? '-ml-2.5' : ''}
              />
            ))}
          </span>
        </div>

        <div className="mt-8">
          <div className="mono-label text-muted">{p.metricLabel} · year</div>
          <div className="mt-2 font-display text-[clamp(44px,5vw,64px)] leading-none tracking-[-0.035em] text-ink">
            <Counter value={total} />
          </div>
        </div>

        <h3 className="mt-6 font-display text-[24px] leading-[1.2] tracking-tight text-ink">
          {spec.title}
        </h3>
        <p className="mt-1 text-[15px] leading-[1.45] text-body-muted">
          {spec.subtitle}
        </p>

        <div className="mt-6">
          <div className="mono-label mb-1 text-muted">running total</div>
          <ClientChart height={96}>
            <Sparkline
              id={spec.platform}
              monthly={PLATFORM_MONTHLY[spec.platform]}
              color={p.onLight}
              height={96}
            />
          </ClientChart>
        </div>

        <ul className="mt-5 divide-y divide-hairline border-y border-hairline">
          {spec.accounts.map((id) => {
            const a = ACCOUNTS[id]
            return (
              <li
                key={id}
                className="flex items-center justify-between py-2.5 text-[14px]"
              >
                <span className="flex items-center gap-2.5">
                  <AccountGlyph account={id} size={22} badge={false} />
                  <span className="text-ink">{a.label}</span>
                </span>
                <span className="tabular text-ink">{compact(a.total)}</span>
              </li>
            )
          })}
        </ul>

        <ul className="mt-5 space-y-2.5 text-[14px] text-ink">
          {spec.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5">
              <span className="mt-[3px] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-pale-indigo text-primary">
                <Check size={10} strokeWidth={3} />
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <a
          href={ACCOUNTS[spec.accounts[0]].url}
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
