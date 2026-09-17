import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { AccountGlyph, Avatar, ShowIcon } from '#/components/brand/Avatar'
import { PlatformLogo } from '#/components/brand/PlatformLogo'
import { ClientChart } from '#/components/charts/ClientChart'
import { Sparkline } from '#/components/charts/Sparkline'
import { Counter } from '#/components/ui/Counter'
import { Reveal, RevealGroup, RevealItem } from '#/components/ui/Reveal'
import { ACCOUNTS, PEOPLE, SHOW, addSeries, metric } from '#/data/stats'
import type { AccountId } from '#/data/stats'
import { compact, formatMetric } from '#/lib/format'

interface Card {
  key: string
  title: string
  subtitle: string
  glyph: React.ReactNode
  accounts: AccountId[]
  stats: {
    label: string
    value: number
    format?: 'compact' | 'percent' | 'hours'
  }[]
  color: string
}

const CARDS: Card[] = [
  {
    key: 'dan',
    title: PEOPLE.dan.name,
    subtitle:
      'Co-hosts the show. Posts on X about the tools and demos he builds.',
    glyph: <Avatar person="dan" size={64} ring={false} />,
    accounts: ['dan-x'],
    stats: [
      { label: 'X impressions', value: ACCOUNTS['dan-x'].total },
      { label: 'X engagements', value: metric('dan-x', 'Engagements') },
      { label: 'X followers', value: metric('dan-x', 'Followers') },
      { label: 'Likes', value: metric('dan-x', 'Likes') },
      { label: 'Bookmarks', value: metric('dan-x', 'Bookmarks') },
      {
        label: 'Engagement rate',
        value: metric('dan-x', 'Engagement rate'),
        format: 'percent',
      },
    ],
    color: '#f4f4f6',
  },
  {
    key: 'sandra',
    title: PEOPLE.sandra.name,
    subtitle:
      'Co-hosts the show. Posts daily on X and LinkedIn about work and the internet.',
    glyph: <Avatar person="sandra" size={64} ring={false} />,
    accounts: ['sandra-x', 'sandra-linkedin'],
    stats: [
      { label: 'X impressions', value: ACCOUNTS['sandra-x'].total },
      {
        label: 'LinkedIn impressions',
        value: ACCOUNTS['sandra-linkedin'].total,
      },
      { label: 'X followers', value: metric('sandra-x', 'Followers') },
      { label: 'X engagements', value: metric('sandra-x', 'Engagements') },
      {
        label: 'LinkedIn engagements',
        value: metric('sandra-linkedin', 'Social engagements'),
      },
      { label: 'Likes on X', value: metric('sandra-x', 'Likes') },
    ],
    color: '#c4bdff',
  },
  {
    key: 'show',
    title: SHOW.name,
    subtitle:
      'The YouTube channel. Dan and Sandra host every episode together.',
    glyph: <ShowIcon size={64} ring={false} />,
    accounts: ['mms-youtube'],
    stats: [
      { label: 'Views', value: ACCOUNTS['mms-youtube'].total },
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
      {
        label: 'All-time hours',
        value: metric('mms-youtube', 'All-time watch time'),
        format: 'hours',
      },
    ],
    color: '#ff7b7b',
  },
]

export function People() {
  return (
    <section id="people" className="px-3 py-6 sm:px-5">
      <div className="grain relative overflow-hidden rounded-lg bg-primary text-white">
        <div
          className="blueprint-dark pointer-events-none absolute inset-0 opacity-60"
          aria-hidden
        />
        <div className="relative z-[2] mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24">
          <Reveal className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <div>
              <div className="mono-label text-white/50">03 — who</div>
              <h2 className="mt-3 font-display text-[clamp(32px,4.5vw,52px)] leading-[1] tracking-[-0.02em]">
                Dan, Sandra and the show
              </h2>
            </div>
            <p className="max-w-[560px] text-[17px] leading-[1.45] text-white/70 lg:justify-self-end">
              One team, four accounts. Dan and Sandra make the show together and
              each post on their own accounts. Yearly stats for each are below.
            </p>
          </Reveal>

          <RevealGroup
            className="mt-12 grid gap-4 lg:grid-cols-3"
            stagger={0.1}
          >
            {CARDS.map((c) => (
              <RevealItem key={c.key} className="h-full">
                <PersonCard card={c} />
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealGroup
            className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-4"
            stagger={0.06}
          >
            {Object.values(ACCOUNTS).map((a) => (
              <RevealItem key={a.id}>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-md bg-white/5 p-4 ring-1 ring-white/10 transition-colors hover:bg-white/10"
                >
                  <span className="flex items-center gap-3">
                    <AccountGlyph account={a.id} size={30} />
                    <span className="flex flex-col leading-tight">
                      <span className="text-[14px]">{a.label}</span>
                      <span className="mono-label text-[10px] text-white/50">
                        {a.platform === 'youtube' ? 'views' : 'impressions'} ·
                        year
                      </span>
                    </span>
                  </span>
                  <span className="tabular flex items-center gap-1.5 font-display text-[18px]">
                    {compact(a.total)}
                    <ArrowUpRight
                      size={14}
                      className="text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}

function PersonCard({ card }: { card: Card }) {
  const monthly = addSeries(card.accounts.map((a) => ACCOUNTS[a].monthly))
  const total = card.accounts.reduce((s, a) => s + ACCOUNTS[a].total, 0)
  const platforms = Array.from(
    new Set(card.accounts.map((a) => ACCOUNTS[a].platform)),
  )

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="flex h-full flex-col rounded-lg bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur-sm sm:p-7"
    >
      <div className="flex items-center gap-4">
        {card.glyph}
        <div>
          <h3 className="font-display text-[26px] leading-none tracking-tight">
            {card.title}
          </h3>
          <div className="mt-2 flex items-center gap-1.5">
            {platforms.map((p) => (
              <span
                key={p}
                className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white/80 ring-1 ring-white/15"
              >
                <PlatformLogo platform={p} size={11} />
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-5 text-[15px] leading-[1.5] text-white/70">
        {card.subtitle}
      </p>

      <div className="mt-7">
        <div className="mono-label text-white/50">
          {card.key === 'show' ? 'views' : 'impressions'} · year
        </div>
        <div className="mt-2 font-display text-[clamp(44px,5vw,64px)] leading-none tracking-[-0.04em]">
          <Counter value={total} />
        </div>
      </div>

      <div className="mt-6">
        <div className="mono-label mb-1 text-white/50">running total</div>
        <ClientChart height={96} dark>
          <Sparkline
            id={card.key}
            monthly={monthly}
            color={card.color}
            dark
            height={96}
          />
        </ClientChart>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-6 sm:grid-cols-3">
        {card.stats.map((m) => (
          <div key={m.label}>
            <dt className="text-[12px] leading-tight text-white/50">
              {m.label}
            </dt>
            <dd className="tabular mt-1 font-display text-[20px] leading-none tracking-tight">
              {formatMetric(m.value, m.format)}
            </dd>
          </div>
        ))}
      </dl>
    </motion.article>
  )
}
