import { motion } from 'motion/react'
import { Check, Mail } from 'lucide-react'
import { AvatarPair } from '#/components/brand/Avatar'
import { PlatformLogo } from '#/components/brand/PlatformLogo'
import { Button } from '#/components/ui/Button'
import { Reveal, RevealGroup, RevealItem } from '#/components/ui/Reveal'
import { ACCOUNTS, TOTAL_IMPRESSIONS, WINDOW } from '#/data/stats'
import { compact } from '#/lib/format'

const OFFERS = [
  {
    title: 'Sponsored episode',
    body: 'A full Morning Maker Show segment where we actually use your product, live, and say what we think.',
  },
  {
    title: 'Threads and posts',
    body: 'Native posts on X and LinkedIn in our own voice. No copy-paste briefs, no “#ad” energy.',
  },
  {
    title: 'Build-with-us',
    body: 'Dan ships something real with your tool in public. The demo is the ad.',
  },
]

export function Cta() {
  return (
    <section id="work" className="scroll-mt-24 px-3 pb-6 sm:px-5">
      <div className="relative overflow-hidden rounded-lg bg-pale-blue">
        <div
          className="blueprint pointer-events-none absolute inset-0 opacity-70"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-[1400px] gap-12 px-5 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <Reveal>
            <div className="mono-label text-slate">05 — work with us</div>
            <h2 className="mt-4 font-display text-[clamp(38px,5.4vw,72px)] leading-[1] tracking-[-0.025em] text-balance text-primary">
              You’ve seen the numbers. The rest is a conversation.
            </h2>
            <p className="mt-6 max-w-[54ch] text-[18px] leading-[1.4] text-body-muted text-pretty">
              We work with a small number of tools we’d use anyway. If that’s
              you, we’ll put you in front of {compact(TOTAL_IMPRESSIONS)}{' '}
              impressions’ worth of people who build things for a living.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                href="mailto:hello@morningmaker.show?subject=Let%E2%80%99s%20talk"
                arrow
              >
                <span className="inline-flex items-center gap-2">
                  <Mail size={14} /> Start a conversation
                </span>
              </Button>
              <Button
                href={ACCOUNTS['dan-x'].url}
                variant="outline"
                target="_blank"
                rel="noreferrer"
              >
                <span className="inline-flex items-center gap-2">
                  <PlatformLogo platform="x" size={12} /> DM Dan
                </span>
              </Button>
              <Button
                href={ACCOUNTS['sandra-x'].url}
                variant="outline"
                target="_blank"
                rel="noreferrer"
              >
                <span className="inline-flex items-center gap-2">
                  <PlatformLogo platform="x" size={12} /> DM Sandra
                </span>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-3 text-[13px] text-slate">
              <AvatarPair size={28} />
              Replies come from us, not an agency.
            </div>
          </Reveal>

          <RevealGroup className="grid gap-3" stagger={0.1} delay={0.15}>
            {OFFERS.map((o, i) => (
              <RevealItem key={o.title}>
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className="flex gap-4 rounded-md bg-white p-5 ring-1 ring-hairline"
                >
                  <span className="mono-label mt-1 shrink-0 text-muted">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-[20px] leading-[1.2] tracking-tight text-primary">
                      {o.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-[1.5] text-body-muted">
                      {o.body}
                    </p>
                  </div>
                  <span className="ml-auto mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pale-green text-deep-green">
                    <Check size={11} strokeWidth={3} />
                  </span>
                </motion.div>
              </RevealItem>
            ))}
            <RevealItem>
              <p className="px-1 pt-2 text-[12px] leading-[1.4] text-muted">
                Figures on this page cover {WINDOW.start} to {WINDOW.end}. Past
                reach is not a guarantee of future reach, but it is a reasonable
                place to start.
              </p>
            </RevealItem>
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
