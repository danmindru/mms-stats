import { motion } from 'motion/react'
import { useState } from 'react'
import { ArrowUpRight, Globe, Mail, Podcast, Wrench } from 'lucide-react'
import { PlatformLogo, SpotifyLogo } from '#/components/brand/PlatformLogo'
import { Reveal, RevealGroup, RevealItem } from '#/components/ui/Reveal'
import { SpotlightCard } from '#/components/ui/SpotlightCard'
import { PROPERTIES, SPONSORS, SPONSORS_BY_TIER } from '#/data/properties'
import type { Property, PropertyKind, Sponsor } from '#/data/properties'
import { cn } from '#/lib/format'

const EASE = [0.16, 1, 0.3, 1] as const

const KIND: Record<PropertyKind, { label: string; icon: typeof Globe }> = {
  site: { label: 'website', icon: Globe },
  podcast: { label: 'podcast', icon: Podcast },
  newsletter: { label: 'newsletter', icon: Mail },
  product: { label: 'product', icon: Wrench },
  social: { label: 'on X', icon: Globe },
}

export function Properties() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <div className="mono-label text-muted">04 — everything else we run</div>
            <h2 className="mt-3 font-display text-[clamp(32px,4.5vw,52px)] leading-[1] tracking-[-0.02em] text-ink">
              More than a YouTube channel
            </h2>
          </div>
          <p className="max-w-[560px] text-[17px] leading-[1.45] text-body-muted lg:justify-self-end">
            The show is the centre. Around it: a website people find on Google,
            a podcast, a newsletter, tools we build and use on air, and the
            show’s own account on X. A sponsor shows up in all of them.
          </p>
        </Reveal>

        <RevealGroup
          className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-3"
          stagger={0.07}
        >
          {PROPERTIES.map((p) => (
            <RevealItem key={p.id} className="h-full">
              <PropertyCard p={p} />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* sponsors */}
        <Reveal className="mt-24 grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <div className="mono-label text-muted">
              companies we work with · {SPONSORS.length}
            </div>
            <h2 className="mt-3 font-display text-[clamp(32px,4.5vw,52px)] leading-[1] tracking-[-0.02em] text-ink">
              Brought to you by
            </h2>
          </div>
          <p className="max-w-[560px] text-[17px] leading-[1.45] text-body-muted lg:justify-self-end">
            Every one of these has been on the show. We use most of them
            ourselves, and most have stayed with us for months rather than one
            episode.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-3 lg:grid-cols-[1.3fr_1fr]">
          {SPONSORS_BY_TIER.headline.map((s) => (
            <Reveal key={s.id}>
              <SponsorFeature s={s} tier="headline sponsor" big />
            </Reveal>
          ))}
          <RevealGroup className="grid gap-3" stagger={0.08} delay={0.1}>
            {SPONSORS_BY_TIER.partner.map((s) => (
              <RevealItem key={s.id}>
                <SponsorFeature s={s} tier="partner" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <LogoWall sponsors={SPONSORS_BY_TIER.sponsor} />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------------ */

function PropertyCard({ p }: { p: Property }) {
  const kind = KIND[p.kind]
  const isX = p.kind === 'social'
  return (
    <SpotlightCard tilt className="h-full ring-1 ring-hairline">
      <div className="group relative flex h-full flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <motion.span
              className="relative inline-block h-12 w-12 shrink-0 overflow-hidden rounded-md bg-stone ring-1 ring-ink/5"
              whileHover={{ rotate: [-0, -6, 5, -3, 0] }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={p.icon}
                alt=""
                width={48}
                height={48}
                draggable={false}
                className="h-full w-full object-cover"
              />
              {isX && (
                <span className="absolute -right-0.5 -bottom-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-ink text-white ring-2 ring-white">
                  <PlatformLogo platform="x" size={9} />
                </span>
              )}
            </motion.span>
            <div>
              <h3 className="font-display text-[20px] leading-tight tracking-tight text-ink">
                {/* stretched link: covers the card, inner links sit above it */}
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="after:absolute after:inset-0 after:z-[1] after:content-['']"
                >
                  {p.name}
                </a>
              </h3>
              <span className="mt-1 inline-flex items-center gap-1.5 text-[12px] text-slate">
                {isX ? (
                  <PlatformLogo platform="x" size={10} />
                ) : (
                  <kind.icon size={12} strokeWidth={1.75} />
                )}
                {kind.label}
              </span>
            </div>
          </div>
          <ArrowUpRight
            size={16}
            className="mt-1 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
          />
        </div>

        <p className="mt-4 text-[15px] leading-[1.5] text-body-muted">{p.what}</p>

        <div className="mt-auto pt-5">
          {p.stat && (
            <div className="flex items-end justify-between gap-4 border-t border-hairline pt-4">
              <div>
                <div className="font-display text-[34px] leading-none tracking-[-0.03em] text-ink">
                  {p.stat.value}
                </div>
                <div className="mt-1 text-[12px] text-slate">{p.stat.label}</div>
              </div>
              <span
                className="mono-label max-w-[46%] text-right text-[10px] leading-[1.4] text-muted"
                title={p.stat.source}
              >
                {p.stat.source.split('.')[0]}
              </span>
            </div>
          )}
          {p.links && (
            <div className="relative z-[2] flex flex-wrap gap-2 border-t border-hairline pt-4">
              {p.links.map((l) => (
                <a
                  key={l.label}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    'inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-[13px] ring-1 transition-colors',
                    l.icon === 'spotify'
                      ? 'bg-[#1db954]/10 text-[#137a3a] ring-[#1db954]/30 hover:bg-[#1db954]/20'
                      : 'bg-pale text-primary ring-primary/20 hover:bg-pale-2',
                  )}
                >
                  {l.icon === 'spotify' ? (
                    <SpotifyLogo size={13} />
                  ) : (
                    <Podcast size={13} />
                  )}
                  {l.label}
                </a>
              ))}
            </div>
          )}
          {!p.stat && !p.links && p.preview && (
            <div className="relative -mx-5 -mb-5 mt-1 h-[120px] overflow-hidden rounded-b-lg border-t border-hairline sm:-mx-6 sm:-mb-6">
              <img
                src={p.preview}
                alt=""
                draggable={false}
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
            </div>
          )}
        </div>
      </div>
    </SpotlightCard>
  )
}

/* ------------------------------------------------------------------------ */

function SponsorFeature({
  s,
  tier,
  big = false,
}: {
  s: Sponsor
  tier: string
  big?: boolean
}) {
  return (
    <SpotlightCard tilt className="h-full ring-1 ring-hairline">
      <a
        href={s.url}
        target="_blank"
        rel="noreferrer"
        className={cn(
          'group flex h-full items-center justify-between gap-6 p-6',
          big && 'min-h-[220px] flex-col items-start justify-between sm:p-8',
        )}
      >
        <div className={cn('flex w-full items-center justify-between', !big && 'w-auto')}>
          <span className="mono-label text-muted">{tier}</span>
          {big && (
            <ArrowUpRight
              size={16}
              className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
            />
          )}
        </div>
        <div className={cn('flex items-center gap-5', big ? 'w-full flex-col items-start gap-4' : 'flex-1')}>
          <motion.img
            src={s.logo}
            alt={s.name}
            draggable={false}
            style={{ height: big ? s.height * 1.6 : s.height }}
            className="w-auto max-w-full object-contain"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          />
          <div className={cn(!big && 'ml-auto text-right')}>
            <div className="text-[14px] text-ink">{s.name}</div>
            <div className="text-[13px] text-slate">{s.what}</div>
          </div>
        </div>
      </a>
    </SpotlightCard>
  )
}

function LogoWall({ sponsors }: { sponsors: Sponsor[] }) {
  const [hover, setHover] = useState<string | null>(null)
  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <span className="mono-label text-muted">sponsors</span>
        <span className="mono-label h-4 text-[10px] text-primary">
          {hover
            ? `${sponsors.find((s) => s.id === hover)?.name} · ${sponsors.find((s) => s.id === hover)?.what}`
            : ''}
        </span>
      </div>
      <ul
        className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-hairline ring-1 ring-hairline sm:grid-cols-3 lg:grid-cols-5"
        onMouseLeave={() => setHover(null)}
      >
        {sponsors.map((s, i) => (
          <motion.li
            key={s.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.6, delay: (i % 5) * 0.05 + Math.floor(i / 5) * 0.08, ease: EASE }}
            className="bg-white"
          >
            <a
              href={s.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${s.name} — ${s.what}`}
              onMouseEnter={() => setHover(s.id)}
              onFocus={() => setHover(s.id)}
              className="group relative flex h-[104px] items-center justify-center overflow-hidden px-6 transition-colors hover:bg-pale"
            >
              <motion.span
                className="flex items-center gap-2.5 opacity-70 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                whileHover={{ y: -3, scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              >
                <img
                  src={s.logo}
                  alt={s.iconOnly ? '' : s.name}
                  draggable={false}
                  style={{ height: s.iconOnly ? 28 : Math.min(s.height, 36) }}
                  className={cn(
                    'w-auto max-w-[140px] object-contain',
                    s.iconOnly && 'rounded-sm',
                  )}
                />
                {s.iconOnly && (
                  <span className="font-display text-[16px] tracking-tight text-ink">
                    {s.name}
                  </span>
                )}
              </motion.span>
              <span className="pointer-events-none absolute inset-x-0 bottom-2 translate-y-2 text-center text-[11px] text-slate opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {s.what}
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
