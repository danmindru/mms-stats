import { motion } from 'motion/react'
import { useState } from 'react'
import { ArrowUpRight, Globe, Mail, Podcast, Wrench } from 'lucide-react'
import { PlatformLogo, SpotifyLogo } from '#/components/brand/PlatformLogo'
import { Counter } from '#/components/ui/Counter'
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
  social: { label: 'account', icon: Globe },
}

const SOCIAL_LABEL = { x: 'on X', linkedin: 'on LinkedIn' } as const

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
            a podcast, a newsletter, tools we build and use on air, and our own
            accounts on X and LinkedIn. A sponsor shows up in all of them.
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
              We work with the best
            </h2>
          </div>
          <p className="max-w-[560px] text-[17px] leading-[1.45] text-body-muted lg:justify-self-end">
            Every one of these has been on the show. We use most of them
            ourselves, and most have stayed with us for months rather than one
            episode.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-3 lg:grid-cols-[1fr_1.1fr]">
          {SPONSORS_BY_TIER.headline.map((s) => (
            <Reveal key={s.id} className="h-full">
              <SponsorFeature s={s} tier="headline sponsor" big />
            </Reveal>
          ))}
          <RevealGroup
            className="grid gap-3 sm:grid-cols-2"
            stagger={0.08}
            delay={0.1}
          >
            {SPONSORS_BY_TIER.partner.map((s) => (
              <RevealItem key={s.id} className="h-full">
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
  const social = p.kind === 'social' ? (p.platform ?? 'x') : null
  const pos =
    p.previewPosition === 'right'
      ? 'object-right'
      : p.previewPosition === 'left'
        ? 'object-left'
        : 'object-center'
  return (
    <SpotlightCard tilt className="h-full ring-1 ring-hairline">
      <div className="group relative flex h-full flex-col">
        {/* header band: the property's own preview, or a glyph field */}
        <div className="relative h-[124px] overflow-hidden bg-pale">
          {p.preview ? (
            <>
              <img
                src={p.preview}
                alt=""
                draggable={false}
                className={cn(
                  'h-full w-full object-cover saturate-[0.85] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]',
                  pos,
                )}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/70 via-white/10 to-transparent" />
            </>
          ) : (
            <GlyphField kind={p.kind} platform={social ?? undefined} />
          )}
          <span className="mono-label absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-xl bg-white/85 px-2 py-1 text-[10px] text-slate ring-1 ring-ink/5 backdrop-blur">
            {social ? (
              <PlatformLogo platform={social} size={9} />
            ) : (
              <kind.icon size={11} strokeWidth={1.75} />
            )}
            {social ? SOCIAL_LABEL[social] : kind.label}
          </span>
        </div>

        <div className="relative flex flex-1 flex-col px-5 pb-5 sm:px-6 sm:pb-6">
          <div className="-mt-6 flex items-end justify-between gap-3">
            <motion.span
              className="relative inline-block h-14 w-14 shrink-0 overflow-hidden rounded-md bg-white ring-4 ring-white shadow-[0_8px_24px_-12px_rgba(30,16,53,0.4)]"
              whileHover={{ rotate: [0, -6, 5, -3, 0] }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={p.icon}
                alt=""
                width={56}
                height={56}
                draggable={false}
                className="h-full w-full object-cover"
              />
              {social && (
                <span
                  className={cn(
                    'absolute right-0 bottom-0 inline-flex h-5 w-5 items-center justify-center rounded-full text-white ring-2 ring-white',
                    social === 'linkedin' ? 'bg-brand-linkedin' : 'bg-ink',
                  )}
                >
                  <PlatformLogo platform={social} size={9} />
                </span>
              )}
            </motion.span>
            <ArrowUpRight
              size={16}
              className="mb-1 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
            />
          </div>

          <h3 className="mt-3 font-display text-[21px] leading-tight tracking-tight text-ink">
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
          <p className="mt-2 text-[15px] leading-[1.5] text-body-muted">
            {p.what}
          </p>

          <div className="mt-auto pt-5">
            {p.stat && (
              <div className="flex items-end justify-between gap-4 border-t border-hairline pt-4">
                <div>
                  <div className="font-display text-[34px] leading-none tracking-[-0.03em] text-ink">
                    <Counter
                      value={p.stat.value}
                      mode={p.stat.format}
                      decimals={p.stat.decimals}
                      suffix={p.stat.suffix}
                    />
                  </div>
                  <div className="mt-1 text-[12px] text-slate">
                    {p.stat.label}
                  </div>
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
                      'inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-[13px] ring-1 transition-all hover:-translate-y-0.5',
                      l.icon === 'spotify'
                        ? 'bg-[#1db954]/10 text-[#137a3a] ring-[#1db954]/30 hover:bg-[#1db954]/20'
                        : l.icon === 'youtube'
                          ? 'bg-brand-youtube/10 text-[#b91c1c] ring-brand-youtube/25 hover:bg-brand-youtube/15'
                          : 'bg-pale text-primary ring-primary/20 hover:bg-pale-2',
                    )}
                  >
                    {l.icon === 'spotify' ? (
                      <SpotifyLogo size={13} />
                    ) : l.icon === 'youtube' ? (
                      <PlatformLogo platform="youtube" size={13} />
                    ) : (
                      <Podcast size={13} />
                    )}
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SpotlightCard>
  )
}

/** Soft field of floating glyphs for properties without a preview image. */
function GlyphField({
  kind,
  platform = 'x',
}: {
  kind: PropertyKind
  platform?: 'x' | 'linkedin'
}) {
  const glyphs =
    kind === 'podcast'
      ? [
          <SpotifyLogo key="s" size={34} />,
          <Podcast key="a" size={34} strokeWidth={1.5} />,
          <SpotifyLogo key="s2" size={22} />,
        ]
      : kind === 'social'
        ? [
            <PlatformLogo key="p" platform={platform} size={34} />,
            <PlatformLogo key="p2" platform={platform} size={20} />,
            <PlatformLogo key="p3" platform={platform} size={26} />,
          ]
        : [<Globe key="g" size={34} strokeWidth={1.5} />]
  const spots = [
    { left: '58%', top: '22%', d: 0 },
    { left: '78%', top: '48%', d: 0.6 },
    { left: '44%', top: '58%', d: 1.1 },
  ] as const
  return (
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(216,180,254,0.55),transparent_60%),linear-gradient(90deg,#ffffff,#faf5ff)]">
      {glyphs.map((g, i) => {
        const sp = spots[i % spots.length] ?? spots[0]
        return (
          <motion.span
            key={i}
            className="absolute text-primary/40 transition-colors duration-500 group-hover:text-primary/70"
            style={{ left: sp.left, top: sp.top }}
            /* Float only while on screen; an always-on loop per glyph adds up. */
            whileInView={{ y: [0, -6, 0] }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: sp.d,
            }}
          >
            {g}
          </motion.span>
        )
      })}
    </div>
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
  if (big) {
    return (
      <SpotlightCard tilt className="h-full ring-1 ring-hairline">
        <a
          href={s.url}
          target="_blank"
          rel="noreferrer"
          className="group relative flex h-full flex-col justify-between gap-8 overflow-hidden p-6 sm:p-8"
        >
          <div className="pointer-events-none absolute -top-20 -right-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(216,180,254,0.45),transparent_65%)] transition-transform duration-700 group-hover:scale-125" />
          <div className="relative flex items-center justify-between">
            <span className="mono-label text-muted">{tier}</span>
            <ArrowUpRight
              size={16}
              className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
            />
          </div>
          <div className="relative grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
            <motion.img
              src={s.logo}
              alt={s.name}
              draggable={false}
              style={{ height: s.height * 1.5 }}
              className="w-auto max-w-full object-contain"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            />
            <div>
              <div className="text-[14px] text-ink">
                {s.name} · <span className="text-slate">{s.what}</span>
              </div>
              {s.note && (
                <p className="mt-2 max-w-[52ch] text-[14px] leading-[1.5] text-body-muted">
                  {s.note}
                </p>
              )}
            </div>
          </div>
          {s.placements && (
            <ul className="relative flex flex-wrap gap-1.5">
              {s.placements.map((pl, i) => (
                <motion.li
                  key={pl}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.06, ease: EASE }}
                  className="rounded-xl bg-pale px-2.5 py-1 text-[12px] text-primary ring-1 ring-primary/15"
                >
                  {pl}
                </motion.li>
              ))}
            </ul>
          )}
        </a>
      </SpotlightCard>
    )
  }
  return (
    <SpotlightCard tilt className="h-full ring-1 ring-hairline">
      <a
        href={s.url}
        target="_blank"
        rel="noreferrer"
        className="group flex h-full flex-col gap-5 p-5 sm:p-6"
      >
        <div className="flex items-center justify-between">
          <span className="mono-label text-muted">{tier}</span>
          <ArrowUpRight
            size={14}
            className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
          />
        </div>
        <motion.img
          src={s.logo}
          alt={s.name}
          draggable={false}
          style={{ height: Math.min(s.height, 32) }}
          className="w-auto max-w-[160px] self-start object-contain"
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        />
        <div className="mt-auto">
          <div className="text-[14px] text-ink">{s.name}</div>
          <div className="text-[13px] text-slate">{s.what}</div>
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
        {sponsors.map((s, i) => {
          const active = hover === s.id
          return (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{
                duration: 0.6,
                delay: (i % 5) * 0.05 + Math.floor(i / 5) * 0.08,
                ease: EASE,
              }}
              className={cn(
                'transition-colors duration-300',
                active ? 'bg-pale' : 'bg-white',
              )}
            >
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${s.name} — ${s.what}`}
                onMouseEnter={() => setHover(s.id)}
                onFocus={() => setHover(s.id)}
                onBlur={() => setHover(null)}
                className="relative flex h-[104px] items-center justify-center overflow-hidden px-6 outline-none"
              >
                <motion.span
                  className={cn(
                    'flex items-center gap-2.5 transition-[filter,opacity] duration-500',
                    active ? 'opacity-100 grayscale-0' : 'opacity-70 grayscale',
                  )}
                  animate={active ? { y: -6, scale: 1.05 } : { y: 0, scale: 1 }}
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
                <motion.span
                  className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-[11px] text-slate"
                  initial={false}
                  animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                  transition={{ duration: 0.25 }}
                >
                  {s.what}
                </motion.span>
              </a>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
