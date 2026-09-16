import { motion } from 'motion/react'
import { ArrowDown, Radio, Sparkles } from 'lucide-react'
import { Avatar } from '#/components/brand/Avatar'
import { PlatformBadge, PlatformLogo } from '#/components/brand/PlatformLogo'
import { CumulativeChart } from '#/components/charts/CumulativeChart'
import { ClientChart } from '#/components/charts/ClientChart'
import { Button } from '#/components/ui/Button'
import { Counter } from '#/components/ui/Counter'
import { SplitWords } from '#/components/ui/Reveal'
import {
  ACCOUNTS,
  PER_MINUTE,
  PLATFORM_TOTALS,
  TOTAL_IMPRESSIONS,
  WINDOW,
} from '#/data/stats'
import { compact } from '#/lib/format'

const EASE = [0.16, 1, 0.3, 1] as const

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        className="blueprint pointer-events-none absolute inset-x-0 top-0 h-[720px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1400px] px-5 pt-20 pb-16 sm:px-8 sm:pt-28">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto flex w-fit items-center gap-3 rounded-pill bg-stone px-3 py-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-deep-green" />
          </span>
          <span className="mono-label text-primary/80">
            impressions · last {WINDOW.days} days · all platforms
          </span>
        </motion.div>

        {/* the number */}
        <div className="mt-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
            className="font-display text-[clamp(88px,17vw,220px)] leading-[0.92] tracking-[-0.045em] text-primary"
          >
            <Counter
              value={TOTAL_IMPRESSIONS}
              decimals={1}
              delay={350}
              suffixClassName="text-[0.55em] text-primary/60 ml-[0.06em] -translate-y-[0.08em]"
            />
          </motion.div>

          <h1 className="mx-auto mt-6 max-w-[900px] font-display text-[clamp(30px,4.6vw,60px)] leading-[1.02] tracking-[-0.02em] text-balance text-primary">
            <SplitWords
              text="Sixty-six million impressions. One year. Two people. Zero ad spend."
              delay={0.35}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
            className="mx-auto mt-6 max-w-[620px] text-[18px] leading-[1.4] text-body-muted text-pretty"
          >
            Dan and Sandra publish daily across X, YouTube and LinkedIn. This is
            what the past twelve months actually looked like, pulled straight
            from the native analytics. About {compact(PER_MINUTE)} impressions
            every minute, on average.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.05 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Button href="#totals" arrow>
              See the breakdown
            </Button>
            <Button href="#work" variant="ghost" className="text-[16px]">
              Work with us
            </Button>
          </motion.div>
        </div>

        {/* media composition */}
        <div className="mt-16 grid grid-cols-1 gap-4 lg:mt-20 lg:grid-cols-[1.6fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 1.1 }}
            className="grain relative overflow-hidden rounded-lg bg-deep-green text-white"
          >
            <div
              className="blueprint-dark pointer-events-none absolute inset-0 opacity-70"
              aria-hidden
            />
            <div className="relative z-[2] flex flex-col gap-6 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-pill bg-white/10 px-2.5 py-1 text-[12px] ring-1 ring-white/15">
                    <Radio size={12} className="text-mint" />
                    cumulative · combined
                  </span>
                  <span className="hidden items-center gap-1.5 rounded-pill bg-white/10 px-2.5 py-1 text-[12px] ring-1 ring-white/15 sm:inline-flex">
                    <Sparkles size={12} className="text-coral-soft" />
                    stacked by platform
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <PlatformLogo platform="x" size={14} />
                  <PlatformLogo platform="linkedin" size={14} />
                  <PlatformLogo platform="youtube" size={14} />
                </div>
              </div>

              <ClientChart height={260} dark>
                <CumulativeChart
                  mode="platform"
                  enabled={{ x: true, youtube: true, linkedin: true }}
                  dark
                  minimal
                  height={260}
                />
              </ClientChart>

              <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                {(['x', 'linkedin', 'youtube'] as const).map((p, i) => (
                  <div key={p} className="flex flex-col gap-1">
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

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 1.25 }}
            className="relative flex flex-col justify-between overflow-hidden rounded-lg bg-stone p-6 sm:p-8"
          >
            <div className="mono-label text-primary/60">
              the two people behind it
            </div>

            <div className="relative my-8 flex items-center justify-center">
              <OrbitRing />
              <div className="relative z-10 flex items-center">
                <motion.div
                  whileHover={{ y: -6, rotate: -2 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="rounded-full shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]"
                >
                  <Avatar person="dan" size={112} badge="x" />
                </motion.div>
                <motion.div
                  whileHover={{ y: -6, rotate: 2 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="-ml-6 rounded-full shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]"
                >
                  <Avatar person="sandra" size={112} badge="linkedin" />
                </motion.div>
              </div>
            </div>

            <ul className="divide-y divide-primary/10 text-[14px]">
              <li className="flex items-center justify-between py-2.5">
                <span className="flex items-center gap-2">
                  <Avatar person="dan" size={20} ring={false} />
                  Dan{' '}
                  <span className="text-muted">{ACCOUNTS['dan-x'].handle}</span>
                </span>
                <span className="tabular flex items-center gap-1.5 text-primary">
                  <PlatformLogo platform="x" size={11} className="text-muted" />
                  {compact(ACCOUNTS['dan-x'].total)}
                </span>
              </li>
              <li className="flex items-center justify-between py-2.5">
                <span className="flex items-center gap-2">
                  <Avatar person="sandra" size={20} ring={false} />
                  Sandra{' '}
                  <span className="text-muted">
                    {ACCOUNTS['sandra-x'].handle}
                  </span>
                </span>
                <span className="tabular flex items-center gap-1.5 text-primary">
                  <PlatformLogo platform="x" size={11} className="text-muted" />
                  {compact(ACCOUNTS['sandra-x'].total)}
                </span>
              </li>
              <li className="flex items-center justify-between py-2.5">
                <span className="flex items-center gap-2">
                  <Avatar person="sandra" size={20} ring={false} />
                  Sandra <span className="text-muted">LinkedIn</span>
                </span>
                <span className="tabular flex items-center gap-1.5 text-primary">
                  <PlatformLogo
                    platform="linkedin"
                    size={11}
                    className="text-muted"
                  />
                  {compact(ACCOUNTS['sandra-linkedin'].total)}
                </span>
              </li>
              <li className="flex items-center justify-between py-2.5">
                <span className="flex items-center gap-2">
                  <span className="flex items-center">
                    <Avatar person="dan" size={20} ring={false} />
                    <Avatar
                      person="sandra"
                      size={20}
                      ring={false}
                      className="-ml-2"
                    />
                  </span>
                  Morning Maker Show
                </span>
                <span className="tabular flex items-center gap-1.5 text-primary">
                  <PlatformLogo
                    platform="youtube"
                    size={11}
                    className="text-muted"
                  />
                  {compact(ACCOUNTS['mms-youtube'].total)}
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.a
          href="#totals"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mx-auto mt-12 flex w-fit items-center gap-2 text-[13px] text-muted transition-colors hover:text-ink"
        >
          <ArrowDown size={14} className="animate-bounce" />
          scroll for the receipts
        </motion.a>
      </div>
    </section>
  )
}

/** Slowly rotating ring of platform badges around the avatars. */
function OrbitRing() {
  const badges = ['x', 'youtube', 'linkedin', 'x'] as const
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden
    >
      <div className="relative h-[240px] w-[240px] animate-orbit rounded-full border border-dashed border-primary/15">
        {badges.map((p, i) => {
          const angle = (i / badges.length) * 360
          return (
            <span
              key={`${p}-${i}`}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `rotate(${angle}deg) translate(120px) rotate(-${angle}deg) translate(-50%,-50%)`,
              }}
            >
              <span className="block animate-[orbit_18s_linear_infinite_reverse]">
                <PlatformBadge platform={p} size={26} />
              </span>
            </span>
          )
        })}
      </div>
    </div>
  )
}
