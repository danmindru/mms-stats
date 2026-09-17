import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { AccountGlyph, TeamAvatars } from '#/components/brand/Avatar'
import { PlatformLogo } from '#/components/brand/PlatformLogo'
import { ClientChart } from '#/components/charts/ClientChart'
import { CumulativeChart, SERIES_COLORS } from '#/components/charts/CumulativeChart'
import { Sparkline } from '#/components/charts/Sparkline'
import { Counter } from '#/components/ui/Counter'
import { Reveal, RevealGroup, RevealItem } from '#/components/ui/Reveal'
import {
  ACCOUNTS,
  PEOPLE,
  PLATFORMS,
  SHOW,
  TOTAL_IMPRESSIONS,
  metric,
} from '#/data/stats'
import type { AccountId } from '#/data/stats'
import { formatMetric } from '#/lib/format'

interface Stat {
  label: string
  value: number
  format?: 'compact' | 'percent' | 'hours'
}

/** Four accounts, one card each, same size. Order follows the page: X, YouTube, LinkedIn. */
const CARDS: { id: AccountId; note: string; stats: Stat[] }[] = [
  {
    id: 'dan-x',
    note: 'Posts about the tools and demos Dan builds.',
    stats: [
      { label: 'Engagements', value: metric('dan-x', 'Engagements') },
      { label: 'Followers', value: metric('dan-x', 'Followers') },
      { label: 'Likes', value: metric('dan-x', 'Likes') },
      {
        label: 'Engagement rate',
        value: metric('dan-x', 'Engagement rate'),
        format: 'percent',
      },
    ],
  },
  {
    id: 'sandra-x',
    note: 'Daily posts about work and the internet.',
    stats: [
      { label: 'Engagements', value: metric('sandra-x', 'Engagements') },
      { label: 'Followers', value: metric('sandra-x', 'Followers') },
      { label: 'Likes', value: metric('sandra-x', 'Likes') },
      {
        label: 'Engagement rate',
        value: metric('sandra-x', 'Engagement rate'),
        format: 'percent',
      },
    ],
  },
  {
    id: 'mms-youtube',
    note: 'The show itself. Dan and Sandra host every episode together.',
    stats: [
      {
        label: 'Hours watched',
        value: metric('mms-youtube', 'Watch time'),
        format: 'hours',
      },
      {
        label: 'New subscribers',
        value: metric('mms-youtube', 'New subscribers'),
      },
      { label: 'Subscribers', value: metric('mms-youtube', 'Subscribers') },
      {
        label: 'All-time views',
        value: metric('mms-youtube', 'All-time views'),
      },
    ],
  },
  {
    id: 'sandra-linkedin',
    note: 'Longer posts, mostly about work.',
    stats: [
      {
        label: 'Engagements',
        value: metric('sandra-linkedin', 'Social engagements'),
      },
      { label: 'Reactions', value: metric('sandra-linkedin', 'Reactions') },
      { label: 'Comments', value: metric('sandra-linkedin', 'Comments') },
      { label: 'Saves', value: metric('sandra-linkedin', 'Saves') },
    ],
  },
]

export function People() {
  return (
    <section className="px-3 py-6 sm:px-5">
      <div className="grain relative overflow-hidden rounded-lg bg-primary text-white">
        <div
          className="blueprint-dark pointer-events-none absolute inset-0 opacity-60"
          aria-hidden
        />
        <div className="relative z-[2] mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24">
          <Reveal className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-end">
            <div>
              <div className="mono-label text-white/50">03 — who</div>
              <div className="mt-5">
                <TeamAvatars size={56} />
              </div>
              <h2 className="mt-5 font-display text-[clamp(32px,4.5vw,52px)] leading-[1] tracking-[-0.02em]">
                {PEOPLE.dan.name}, {PEOPLE.sandra.name} and the show
              </h2>
              <p className="mt-5 max-w-[48ch] text-[17px] leading-[1.45] text-white/70">
                One team. Dan and Sandra make the {SHOW.name} together and each
                post on their own accounts. The four accounts add up to one
                yearly total, shown here by account. Each account has its own
                card below.
              </p>
            </div>

            <div className="rounded-lg bg-white/[0.06] p-5 ring-1 ring-white/10 sm:p-6">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="mono-label text-white/50">
                    yearly total · all four accounts
                  </div>
                  <div className="mt-1 font-display text-[clamp(36px,4vw,52px)] leading-none tracking-[-0.04em]">
                    <Counter value={TOTAL_IMPRESSIONS} decimals={1} />
                  </div>
                </div>
                <ul className="flex flex-wrap gap-x-4 gap-y-1">
                  {CARDS.map((c) => (
                    <li
                      key={c.id}
                      className="flex items-center gap-1.5 text-[12px] text-white/70"
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: SERIES_COLORS[c.id].dark }}
                      />
                      {ACCOUNTS[c.id].label}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <ClientChart height={200} dark>
                  <CumulativeChart
                    mode="account"
                    enabled={{
                      'dan-x': true,
                      'sandra-x': true,
                      'mms-youtube': true,
                      'sandra-linkedin': true,
                    }}
                    dark
                    minimal
                    height={200}
                  />
                </ClientChart>
              </div>
            </div>
          </Reveal>

          <RevealGroup
            className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
            stagger={0.08}
          >
            {CARDS.map((c) => (
              <RevealItem key={c.id} className="h-full">
                <AccountCard id={c.id} note={c.note} stats={c.stats} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}

function AccountCard({
  id,
  note,
  stats,
}: {
  id: AccountId
  note: string
  stats: Stat[]
}) {
  const a = ACCOUNTS[id]
  const unit = a.platform === 'youtube' ? 'views' : 'impressions'

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="flex h-full flex-col rounded-lg bg-white/[0.06] p-5 ring-1 ring-white/10 backdrop-blur-sm sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <AccountGlyph account={id} size={44} />
          <div>
            <h3 className="font-display text-[19px] leading-tight tracking-tight">
              {a.label}
            </h3>
            <a
              href={a.url}
              target="_blank"
              rel="noreferrer"
              className="group mt-0.5 inline-flex items-center gap-1 text-[12px] text-white/55 hover:text-white"
            >
              {a.handle}
              <ArrowUpRight
                size={11}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
        <span
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
          style={{ background: PLATFORMS[a.platform].onLight }}
          aria-label={PLATFORMS[a.platform].name}
        >
          <PlatformLogo platform={a.platform} size={12} />
        </span>
      </div>

      <p className="mt-4 text-[14px] leading-[1.5] text-white/65">{note}</p>

      <div className="mt-5">
        <div className="mono-label text-white/50">yearly {unit}</div>
        <div className="mt-1.5 font-display text-[40px] leading-none tracking-[-0.035em]">
          <Counter value={a.total} />
        </div>
      </div>

      <div className="mt-4">
        <div className="mono-label mb-1 text-white/50">running total</div>
        <ClientChart height={84} dark>
          <Sparkline
            id={id}
            monthly={a.monthly}
            color={SERIES_COLORS[id].dark}
            dark
            height={84}
          />
        </ClientChart>
      </div>

      <dl className="mt-auto grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/10 pt-4">
        {stats.map((m) => (
          <div key={m.label}>
            <dt className="text-[11px] leading-tight text-white/50">
              {m.label}
            </dt>
            <dd className="tabular mt-0.5 font-display text-[18px] leading-none tracking-tight">
              {formatMetric(m.value, m.format)}
            </dd>
          </div>
        ))}
      </dl>
    </motion.article>
  )
}
