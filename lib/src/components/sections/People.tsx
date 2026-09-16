import { motion } from 'motion/react'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Avatar } from '#/components/brand/Avatar'
import { PlatformLogo } from '#/components/brand/PlatformLogo'
import { ClientChart } from '#/components/charts/ClientChart'
import { MonthlyBars } from '#/components/charts/MonthlyBars'
import { ShareRing } from '#/components/charts/ShareRing'
import { Counter } from '#/components/ui/Counter'
import { Reveal, RevealGroup, RevealItem } from '#/components/ui/Reveal'
import {
  ACCOUNTS,
  ACCOUNT_LIST,
  PEOPLE,
  PERSON_MONTHLY,
  PERSON_TOTALS,
  TOTAL_IMPRESSIONS,
  metric,
} from '#/data/stats'
import type { PersonId } from '#/data/stats'
import { cn, compact, formatMetric, share } from '#/lib/format'

const PERSON_METRICS: Record<
  PersonId,
  { label: string; value: number; format?: 'compact' | 'percent' | 'hours' }[]
> = {
  dan: [
    { label: 'X impressions', value: ACCOUNTS['dan-x'].total },
    { label: 'X engagements', value: metric('dan-x', 'Engagements') },
    { label: 'X followers', value: 32_200 },
    { label: 'Engagement rate', value: 1.3, format: 'percent' },
    { label: 'Best month (Jan)', value: ACCOUNTS['dan-x'].peak.value },
    { label: 'Show watch time', value: 10_200, format: 'hours' },
  ],
  sandra: [
    { label: 'X impressions', value: ACCOUNTS['sandra-x'].total },
    { label: 'LinkedIn impressions', value: ACCOUNTS['sandra-linkedin'].total },
    { label: 'X followers', value: 22_800 },
    {
      label: 'LinkedIn engagements',
      value: metric('sandra-linkedin', 'Social engagements'),
    },
    { label: 'Best month (Oct)', value: ACCOUNTS['sandra-x'].peak.value },
    { label: 'Show watch time', value: 10_200, format: 'hours' },
  ],
}

const BLURBS: Record<PersonId, string> = {
  dan: 'Ships tools and demos in public, then talks about how they were built. Technical audience, high intent, sticky.',
  sandra:
    'Writes daily about work, craft and the internet. Reaches a broad audience on X and the professional one on LinkedIn.',
}

export function People() {
  const [focus, setFocus] = useState<PersonId | null>(null)
  const danPct = share(PERSON_TOTALS.dan, TOTAL_IMPRESSIONS)
  const sandraPct = share(PERSON_TOTALS.sandra, TOTAL_IMPRESSIONS)

  return (
    <section id="people" className="scroll-mt-24 px-3 py-6 sm:px-5">
      <div className="grain relative overflow-hidden rounded-lg bg-deep-green text-white">
        <div
          className="blueprint-dark pointer-events-none absolute inset-0 opacity-60"
          aria-hidden
        />
        <div className="relative z-[2] mx-auto max-w-[1400px] px-5 py-20 sm:px-10 sm:py-28">
          <Reveal className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <div>
              <div className="mono-label text-white/50">03 — per person</div>
              <h2 className="mt-4 font-display text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-0.02em] text-balance">
                Two very different engines.
              </h2>
            </div>
            <p className="max-w-[560px] text-[18px] leading-[1.4] text-white/70 text-pretty lg:justify-self-end">
              Sandra brings the reach. Dan brings the depth. Together they cover
              the whole funnel, from a viral thread to a forty-minute build
              session. YouTube is a shared channel and is credited half to each.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
            <PersonPanel person="dan" focused={focus} onFocus={setFocus} />

            <Reveal
              className="flex items-center justify-center py-4 lg:py-0"
              delay={0.15}
            >
              <ShareRing
                size={230}
                stroke={16}
                track="rgba(255,255,255,0.08)"
                segments={[
                  {
                    key: 'sandra',
                    value: PERSON_TOTALS.sandra,
                    color:
                      focus === 'dan' ? 'rgba(255,173,155,0.3)' : '#ffad9b',
                  },
                  {
                    key: 'dan',
                    value: PERSON_TOTALS.dan,
                    color:
                      focus === 'sandra' ? 'rgba(121,176,255,0.3)' : '#79b0ff',
                  },
                ]}
                center={
                  <div className="flex flex-col items-center">
                    <span className="mono-label text-white/50">split</span>
                    <span className="font-display text-[34px] leading-none tracking-tight">
                      {focus === 'dan'
                        ? `${danPct}%`
                        : focus === 'sandra'
                          ? `${sandraPct}%`
                          : `${sandraPct} / ${danPct}`}
                    </span>
                    <span className="mt-1 text-[12px] text-white/60">
                      {focus ? PEOPLE[focus].name : 'Sandra / Dan'}
                    </span>
                  </div>
                }
              />
            </Reveal>

            <PersonPanel person="sandra" focused={focus} onFocus={setFocus} />
          </div>

          <RevealGroup
            className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-4"
            stagger={0.06}
          >
            {ACCOUNT_LIST.map((a) => (
              <RevealItem key={a.id}>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-md bg-white/5 p-4 ring-1 ring-white/10 transition-colors hover:bg-white/10"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex items-center">
                      {a.people.map((p, i) => (
                        <Avatar
                          key={p}
                          person={p}
                          size={28}
                          badge={
                            i === a.people.length - 1 ? a.platform : undefined
                          }
                          className={i > 0 ? '-ml-2' : ''}
                        />
                      ))}
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-[14px]">{a.handle}</span>
                      <span className="mono-label text-[10px] text-white/50">
                        {a.platform === 'youtube' ? 'views' : 'impressions'}
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

function PersonPanel({
  person,
  focused,
  onFocus,
}: {
  person: PersonId
  focused: PersonId | null
  onFocus: (p: PersonId | null) => void
}) {
  const p = PEOPLE[person]
  const total = PERSON_TOTALS[person]
  const pct = share(total, TOTAL_IMPRESSIONS)
  const accounts = ACCOUNT_LIST.filter((a) => a.people.includes(person))
  const dim = focused !== null && focused !== person
  const color = person === 'dan' ? '#79b0ff' : '#ffad9b'

  return (
    <Reveal delay={person === 'dan' ? 0.05 : 0.25} className="h-full">
      <motion.article
        onMouseEnter={() => onFocus(person)}
        onMouseLeave={() => onFocus(null)}
        animate={{ opacity: dim ? 0.55 : 1, scale: dim ? 0.985 : 1 }}
        transition={{ duration: 0.4 }}
        className="flex h-full flex-col rounded-lg bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur-sm sm:p-8"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: person === 'dan' ? -3 : 3, scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16 }}
            >
              <Avatar
                person={person}
                size={72}
                ring={false}
                className="rounded-full ring-2 ring-white/20"
              />
            </motion.div>
            <div>
              <h3 className="font-display text-[28px] leading-none tracking-tight">
                {p.fullName}
              </h3>
              <div className="mt-1.5 text-[13px] text-white/60">{p.role}</div>
              <div className="mt-2 flex items-center gap-1.5">
                {accounts.map((a) => (
                  <span
                    key={a.id}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white/80 ring-1 ring-white/15"
                  >
                    <PlatformLogo platform={a.platform} size={11} />
                  </span>
                ))}
              </div>
            </div>
          </div>
          <span
            className="mono-label rounded-pill px-2.5 py-1 text-[11px] ring-1"
            style={{
              color,
              borderColor: color,
              boxShadow: `inset 0 0 0 1px ${color}55`,
            }}
          >
            {pct}% of total
          </span>
        </div>

        <div className="mt-8">
          <div className="mono-label text-white/50">
            impressions credited · 365 days
          </div>
          <div className="mt-2 font-display text-[clamp(48px,6vw,80px)] leading-none tracking-[-0.04em]">
            <Counter value={total} />
          </div>
        </div>

        <p className="mt-5 max-w-[46ch] text-[15px] leading-[1.5] text-white/70">
          {BLURBS[person]}
        </p>

        <div className="mt-6">
          <ClientChart height={110} dark>
            <MonthlyBars
              values={PERSON_MONTHLY[person]}
              color={color}
              dark
              height={110}
            />
          </ClientChart>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-6 sm:grid-cols-3">
          {PERSON_METRICS[person].map((m) => (
            <div key={m.label}>
              <dt className="text-[12px] leading-tight text-white/50">
                {m.label}
              </dt>
              <dd
                className={cn(
                  'tabular mt-1 font-display text-[20px] leading-none tracking-tight',
                )}
              >
                {formatMetric(m.value, m.format)}
              </dd>
            </div>
          ))}
        </dl>
      </motion.article>
    </Reveal>
  )
}
