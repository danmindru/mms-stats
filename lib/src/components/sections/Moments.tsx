import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Avatar } from '#/components/brand/Avatar'
import { PlatformLogo } from '#/components/brand/PlatformLogo'
import { Reveal } from '#/components/ui/Reveal'
import {
  ACCOUNTS,
  COMBINED_MONTHLY,
  MOMENTS,
  MONTH_LABELS,
  PLATFORMS,
} from '#/data/stats'
import { cn, compact } from '#/lib/format'

export function Moments() {
  const [open, setOpen] = useState<number | null>(0)
  const max = Math.max(...COMBINED_MONTHLY)

  return (
    <section id="moments" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <div className="mono-label text-muted">04 — moments</div>
            <h2 className="mt-4 font-display text-[clamp(36px,5vw,60px)] leading-[1] tracking-[-0.02em] text-balance text-primary">
              The spikes, explained.
            </h2>
          </div>
          <p className="max-w-[560px] text-[18px] leading-[1.4] text-body-muted text-pretty lg:justify-self-end">
            Reach like this is never evenly distributed. A handful of moments do
            the heavy lifting; the daily habit is what puts you in position for
            them.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Reveal>
            <ul className="border-t border-hairline">
              {MOMENTS.map((m, i) => {
                const acc = ACCOUNTS[m.account]
                const isOpen = open === i
                return (
                  <li
                    key={`${m.title}-${i}`}
                    className="border-b border-hairline"
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="group grid w-full grid-cols-[72px_1fr_auto] items-center gap-4 py-5 text-left sm:grid-cols-[96px_1fr_auto_auto] sm:gap-6"
                    >
                      <span className="mono-label text-muted">{m.when}</span>
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="flex shrink-0 items-center">
                          {acc.people.map((p, j) => (
                            <Avatar
                              key={p}
                              person={p}
                              size={28}
                              className={j > 0 ? '-ml-2' : ''}
                            />
                          ))}
                        </span>
                        <span className="truncate font-display text-[clamp(18px,2vw,24px)] leading-[1.2] tracking-tight text-primary">
                          {m.title}
                        </span>
                      </span>
                      <span
                        className="hidden items-center gap-1.5 rounded-xl px-2.5 py-1 text-[12px] ring-1 sm:inline-flex"
                        style={{
                          color: PLATFORMS[acc.platform].onLight,
                          borderColor: `${PLATFORMS[acc.platform].onLight}55`,
                        }}
                      >
                        <PlatformLogo platform={acc.platform} size={11} />
                        {PLATFORMS[acc.platform].name}
                      </span>
                      <span className="flex items-center gap-3">
                        <span className="tabular font-display text-[18px] text-primary sm:text-[22px]">
                          {compact(m.value)}
                        </span>
                        <ChevronDown
                          size={16}
                          className={cn(
                            'text-muted transition-transform duration-300',
                            isOpen && 'rotate-180',
                          )}
                        />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.45,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[64ch] pb-6 pl-[88px] text-[16px] leading-[1.5] text-body-muted sm:pl-[120px]">
                            {m.detail}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          {/* sidebar heat strip */}
          <Reveal delay={0.1}>
            <div className="sticky top-28 rounded-lg bg-stone p-6">
              <div className="mono-label text-muted">
                combined, month by month
              </div>
              <ul className="mt-5 space-y-2">
                {COMBINED_MONTHLY.map((v, i) => {
                  const hot = MOMENTS.some((m) => m.monthIndex === i)
                  const active =
                    open !== null && MOMENTS[open]?.monthIndex === i
                  return (
                    <li
                      key={i}
                      className="grid grid-cols-[52px_1fr_56px] items-center gap-3 text-[13px]"
                    >
                      <span
                        className={cn(
                          'mono-label',
                          active ? 'text-primary' : 'text-muted',
                        )}
                      >
                        {MONTH_LABELS[i]}
                      </span>
                      <span className="h-2 w-full overflow-hidden rounded-full bg-primary/10">
                        <motion.span
                          className="block h-full rounded-full"
                          style={{
                            background: active
                              ? '#ff7759'
                              : hot
                                ? '#17171c'
                                : 'rgba(23,23,28,0.45)',
                          }}
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${Math.max(2, (v / max) * 100)}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            ease: [0.16, 1, 0.3, 1],
                            delay: i * 0.04,
                          }}
                        />
                      </span>
                      <span
                        className={cn(
                          'tabular text-right',
                          active ? 'text-primary' : 'text-slate',
                        )}
                      >
                        {compact(v)}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
