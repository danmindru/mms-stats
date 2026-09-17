import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { useRef, useState } from 'react'
import { Mail, Podcast } from 'lucide-react'
import { TeamAvatars } from '#/components/brand/Avatar'
import { PlatformLogo, SpotifyLogo } from '#/components/brand/PlatformLogo'
import { Reveal, RevealGroup, RevealItem } from '#/components/ui/Reveal'
import { AUDIENCE, FRAMES, OUTLETS } from '#/data/story'
import type { Frame } from '#/data/story'
import { cn } from '#/lib/format'

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * "How we work" in three frames. On large screens the frames are pinned and
 * advance with scroll (one viewport per frame); on smaller screens they stack.
 */
export function Story() {
  const track = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ['start start', 'end end'],
  })
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(FRAMES.length - 1, Math.floor(v * FRAMES.length))
    if (next !== active) setActive(next)
  })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })
  const current = FRAMES[active] ?? FRAMES[0]
  const railScale = useTransform(progress, [0, 1], [0, 1])
  const parallax = useTransform(progress, [0, 1], ['-3%', '3%'])

  return (
    <section className="px-3 py-6 sm:px-5">
      <div className="grain relative overflow-clip rounded-lg bg-primary-deep text-white">
        <div
          className="blueprint-dark pointer-events-none absolute inset-0 opacity-50"
          aria-hidden
        />

        {/* intro */}
        <div className="relative z-[2] mx-auto max-w-[1400px] px-5 pt-16 sm:px-10 sm:pt-24">
          <Reveal className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <div>
              <div className="mono-label text-white/70">how we work</div>
              <h2 className="mt-4 font-display text-[clamp(34px,5vw,64px)] leading-[1] tracking-[-0.03em]">
                A morning show for people who build things.
              </h2>
            </div>
            <div className="lg:justify-self-end">
              <div className="flex items-center gap-3">
                <TeamAvatars size={32} />
                <span className="mono-label text-white/70">
                  {AUDIENCE.title}
                </span>
              </div>
              <p className="mt-3 max-w-[46ch] text-[17px] leading-[1.45] text-white/85">
                {AUDIENCE.body}
              </p>
            </div>
          </Reveal>
        </div>

        {/* pinned sequence, large screens */}
        <div
          ref={track}
          className="relative z-[2] hidden lg:block"
          style={{ height: `${FRAMES.length * 100}vh` }}
        >
          <div className="sticky top-0 flex h-screen items-center">
            <div className="mx-auto grid w-full max-w-[1400px] grid-cols-[0.8fr_1.2fr] items-center gap-14 px-10">
              {/* rail + copy */}
              <div className="relative pl-10">
                <div className="absolute top-1 bottom-1 left-[7px] w-px bg-white/15" />
                <motion.div
                  className="absolute top-1 bottom-1 left-[7px] w-px origin-top bg-white"
                  style={{ scaleY: railScale }}
                />
                <ol className="absolute top-0 left-0 flex h-full flex-col justify-between py-1">
                  {FRAMES.map((f, i) => (
                    <li key={f.id}>
                      <button
                        type="button"
                        aria-label={`Go to ${f.title}`}
                        onClick={() => {
                          const el = track.current
                          if (!el) return
                          const top =
                            el.getBoundingClientRect().top +
                            window.scrollY +
                            (i / FRAMES.length) * el.offsetHeight +
                            1
                          window.scrollTo({
                            top,
                            behavior: reduce ? 'auto' : 'smooth',
                          })
                        }}
                        className={cn(
                          'block h-[15px] w-[15px] rounded-full border-2 border-primary-deep transition-colors',
                          i <= active ? 'bg-white' : 'bg-white/30',
                        )}
                      />
                    </li>
                  ))}
                </ol>

                <div className="min-h-[260px]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      <FrameCopy frame={current} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* frame */}
              <div className="relative">
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-band ring-1 ring-white/15">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={current.id}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: EASE }}
                    >
                      <motion.div
                        className="absolute inset-[-4%]"
                        style={{ y: reduce ? 0 : parallax }}
                      >
                        <FrameImage frame={current} />
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                  {/* letterbox */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-primary-deep/70 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-primary-deep/80 to-transparent" />
                  <div className="pointer-events-none absolute bottom-4 left-5 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_0_4px_rgba(248,113,113,0.25)]" />
                    <span className="mono-label text-[10px] text-white/85">
                      {current.index} / 0{FRAMES.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* stacked, small screens */}
        <div className="relative z-[2] mx-auto max-w-[1400px] px-5 pt-12 lg:hidden">
          <RevealGroup className="grid gap-10" stagger={0.1}>
            {FRAMES.map((f) => (
              <RevealItem key={f.id}>
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-band ring-1 ring-white/15">
                  <FrameImage frame={f} />
                </div>
                <div className="mt-5">
                  <FrameCopy frame={f} />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* outlets */}
        <div className="relative z-[2] mx-auto max-w-[1400px] px-5 pt-14 pb-16 sm:px-10 sm:pb-24">
          <Reveal className="flex flex-col gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <span className="mono-label text-white/70">
              one episode ends up on
            </span>
            <ul className="flex flex-wrap gap-2">
              {OUTLETS.map((o, i) => (
                <motion.li
                  key={o.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                  whileHover={{ y: -3 }}
                  className="inline-flex items-center gap-2 rounded-xl bg-white/[0.08] px-3 py-1.5 text-[13px] ring-1 ring-white/15"
                >
                  <OutletIcon icon={o.icon} />
                  {o.label}
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function FrameCopy({ frame }: { frame: Frame }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="mono-label text-white/70">{frame.index}</span>
        <span className="h-px w-6 bg-white/30" />
        <span className="mono-label text-white/70">{frame.kicker}</span>
      </div>
      <h3 className="mt-4 font-display text-[clamp(28px,3.4vw,46px)] leading-[1.05] tracking-[-0.03em]">
        {frame.title}
      </h3>
      <p className="mt-4 max-w-[44ch] text-[17px] leading-[1.5] text-white/85">
        {frame.body}
      </p>
    </div>
  )
}

/** Illustration with a quiet gradient fallback if the asset is missing. */
function FrameImage({ frame }: { frame: Frame }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div
        className="h-full w-full bg-[radial-gradient(ellipse_at_30%_30%,rgba(216,180,254,0.35),transparent_60%),linear-gradient(135deg,#581c87,#3b0764)]"
        aria-label={frame.alt}
        role="img"
      />
    )
  }
  return (
    <img
      src={frame.image}
      alt={frame.alt}
      draggable={false}
      onError={() => setFailed(true)}
      className="h-full w-full object-cover"
    />
  )
}

function OutletIcon({ icon }: { icon: (typeof OUTLETS)[number]['icon'] }) {
  const cls = 'text-white/85'
  switch (icon) {
    case 'youtube':
    case 'x':
    case 'linkedin':
      return <PlatformLogo platform={icon} size={12} className={cls} />
    case 'spotify':
      return <SpotifyLogo size={12} className={cls} />
    case 'apple':
      return <Podcast size={13} className={cls} />
    case 'mail':
      return <Mail size={13} className={cls} />
    case 'hunted':
      return (
        <img
          src="/properties/hunted-space.png"
          alt=""
          width={14}
          height={14}
          className="rounded-[3px]"
        />
      )
  }
}
