import { motion } from 'motion/react'
import { Check, Mail } from 'lucide-react'
import { TeamAvatars } from '#/components/brand/Avatar'
import { PlatformLogo } from '#/components/brand/PlatformLogo'
import { Button } from '#/components/ui/Button'
import { Reveal, RevealGroup, RevealItem } from '#/components/ui/Reveal'
import { ACCOUNTS, TOTAL_IMPRESSIONS, WINDOW } from '#/data/stats'
import { compact } from '#/lib/format'

const OFFERS = [
  {
    title: 'A long-term partnership',
    body: 'Months, not one-offs. Your product becomes part of the show and part of the startups Dan and Sandra run, so it keeps coming up long after the first mention.',
  },
  {
    title: 'Sponsored episodes',
    body: 'We use your product on air, episode after episode, and say what we think of it.',
  },
  {
    title: 'Posts on X and LinkedIn',
    body: 'Posts written by us, in our own words, on our own accounts.',
  },
  {
    title: 'Builds on the show',
    body: 'Dan builds with your product during episodes, and it stays in the stack afterwards.',
  },
]

export function Cta() {
  return (
    <section className="px-3 pb-6 sm:px-5">
      <div className="relative overflow-hidden rounded-lg bg-pale">
        <div
          className="blueprint pointer-events-none absolute inset-0 opacity-70"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-[1400px] gap-12 px-5 py-16 sm:px-10 sm:py-24 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <Reveal>
            <div className="mono-label text-slate">05 — work with us</div>
            <h2 className="mt-3 font-display text-[clamp(34px,4.8vw,64px)] leading-[1] tracking-[-0.025em] text-ink">
              Work with us
            </h2>
            <p className="mt-6 max-w-[54ch] text-[17px] leading-[1.45] text-body-muted">
              We take a few sponsors a year, and only for tools we would use
              anyway. We look for partners who want to stay for the long run:
              Dan and Sandra adopt your product in their own startups, so it
              shows up in episodes, builds and posts for months rather than
              once. The four accounts on this page had{' '}
              {compact(TOTAL_IMPRESSIONS)} yearly impressions.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                href="mailto:sandra@morningmakershow.com?subject=Working%20together"
                arrow
              >
                <span className="inline-flex items-center gap-2">
                  <Mail size={14} /> Email us
                </span>
              </Button>
              <Button
                href={ACCOUNTS['dan-x'].url}
                variant="outline"
                target="_blank"
                rel="noreferrer"
              >
                <span className="inline-flex items-center gap-2">
                  <PlatformLogo platform="x" size={12} /> Message Dan
                </span>
              </Button>
              <Button
                href={ACCOUNTS['sandra-x'].url}
                variant="outline"
                target="_blank"
                rel="noreferrer"
              >
                <span className="inline-flex items-center gap-2">
                  <PlatformLogo platform="x" size={12} /> Message Sandra
                </span>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-3 text-[13px] text-slate">
              <TeamAvatars size={28} />
              Replies come from Dan and Sandra.
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
                    <h3 className="font-display text-[20px] leading-[1.2] tracking-tight text-ink">
                      {o.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-[1.5] text-body-muted">
                      {o.body}
                    </p>
                  </div>
                  <span className="ml-auto mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pale text-primary">
                    <Check size={11} strokeWidth={3} />
                  </span>
                </motion.div>
              </RevealItem>
            ))}
            <RevealItem>
              <p className="px-1 pt-2 text-[12px] leading-[1.4] text-muted">
                All numbers cover {WINDOW.start} to {WINDOW.end}.
              </p>
            </RevealItem>
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
