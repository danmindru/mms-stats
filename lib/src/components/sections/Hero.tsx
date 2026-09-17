import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { AccountGlyph, TeamAvatars } from '#/components/brand/Avatar'
import { PlatformLogo } from '#/components/brand/PlatformLogo'
import { CumulativeChart } from '#/components/charts/CumulativeChart'
import { ClientChart } from '#/components/charts/ClientChart'
import { Counter } from '#/components/ui/Counter'
import {
  ACCOUNT_LIST,
  PER_DAY,
  PLATFORM_TOTALS,
  TOTAL_IMPRESSIONS,
  WINDOW,
} from '#/data/stats'
import { compact, full } from '#/lib/format'

const EASE = [0.16, 1, 0.3, 1] as const

export function Hero() {
  return (
    <section className="relative">
      <div className="relative mx-auto max-w-[1400px] px-5 pt-8 pb-10 sm:px-8 sm:pt-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mono-label text-muted"
            >
              yearly stats · {WINDOW.start} – {WINDOW.end}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: EASE, delay: 0.1 }}
              className="mt-3 font-display text-[clamp(64px,9vw,120px)] leading-[0.95] tracking-[-0.045em] text-ink"
            >
              <Counter
                value={TOTAL_IMPRESSIONS}
                decimals={1}
                delay={250}
                suffixClassName="text-[0.55em] text-ink/50 ml-[0.06em] -translate-y-[0.08em]"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
              className="mt-4 max-w-[46ch] text-[17px] leading-[1.45] text-body-muted"
            >
              Yearly impressions for Dan’s and Sandra’s X accounts, the Morning
              Maker Show on YouTube and Sandra’s LinkedIn, added together.
              About {full(PER_DAY)} a day.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.35 }}
            className="grain relative overflow-hidden rounded-lg bg-primary text-white"
          >
            <div
              className="blueprint-dark pointer-events-none absolute inset-0 opacity-70"
              aria-hidden
            />
            <div className="relative z-[2] flex flex-col gap-5 p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="flex items-center gap-3">
                  <TeamAvatars size={28} />
                  <span className="mono-label text-white/70">
                    yearly running total · all accounts
                  </span>
                </span>
                <div className="flex items-center gap-2 text-white/70">
                  <PlatformLogo platform="x" size={14} />
                  <PlatformLogo platform="youtube" size={14} />
                  <PlatformLogo platform="linkedin" size={14} />
                </div>
              </div>

              <ClientChart height={220} dark>
                <CumulativeChart
                  mode="platform"
                  enabled={{ x: true, youtube: true, linkedin: true }}
                  dark
                  minimal
                  height={220}
                />
              </ClientChart>

              <div className="grid gap-2 border-t border-white/10 pt-4 sm:grid-cols-3 sm:gap-3">
                {(['x', 'linkedin', 'youtube'] as const).map((p, i) => (
                  <div
                    key={p}
                    className="flex items-center justify-between gap-3 sm:flex-col sm:items-start sm:gap-1"
                  >
                    <span className="mono-label flex items-center gap-1.5 text-white/60">
                      <PlatformLogo platform={p} size={11} />
                      {p === 'youtube' ? 'views' : 'impressions'}
                    </span>
                    <span className="font-display text-[clamp(20px,2.4vw,30px)] leading-none tracking-tight">
                      <Counter
                        value={PLATFORM_TOTALS[p]}
                        delay={500 + i * 120}
                      />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* account strip */}
        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
          className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ACCOUNT_LIST.map((a) => (
            <li key={a.id}>
              <a
                href={a.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 rounded-md bg-stone p-4 transition-colors hover:bg-stone-2"
              >
                <span className="flex items-center gap-3">
                  <AccountGlyph account={a.id} size={36} />
                  <span className="flex flex-col leading-tight">
                    <span className="text-[14px] text-ink">{a.label}</span>
                    <span className="mono-label text-[10px] text-muted">
                      yearly{' '}
                      {a.platform === 'youtube' ? 'views' : 'impressions'}
                    </span>
                  </span>
                </span>
                <span className="tabular flex items-center gap-1 font-display text-[20px] text-ink">
                  {compact(a.total)}
                  <ArrowUpRight
                    size={14}
                    className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
