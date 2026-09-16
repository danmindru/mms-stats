import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X as CloseIcon } from 'lucide-react'
import { AvatarPair } from '#/components/brand/Avatar'
import { Button } from '#/components/ui/Button'
import { WINDOW } from '#/data/stats'
import { cn } from '#/lib/format'

const LINKS = [
  { href: '#totals', label: 'Totals' },
  { href: '#platforms', label: 'Platforms' },
  { href: '#people', label: 'People' },
  { href: '#moments', label: 'Moments' },
]

export function AnnouncementBar() {
  return (
    <div className="flex h-9 items-center justify-center bg-black px-4 text-[12px] leading-[1.4] text-white">
      <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-mint text-mint animate-pulse-dot" />
      <span className="opacity-90">
        Reporting window {WINDOW.start} → {WINDOW.end}. Native analytics
        exports, no estimates inflated.
      </span>
      <a
        href="#footnotes"
        className="ml-3 hidden underline underline-offset-2 opacity-70 hover:opacity-100 sm:inline"
      >
        Methodology
      </a>
    </div>
  )
}

export function Nav() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const shadow = useTransform(
    scrollY,
    [0, 80],
    ['0 0 0 0 rgba(0,0,0,0)', '0 1px 0 0 rgba(23,23,28,0.08)'],
  )

  useEffect(() => scrollY.on('change', (v) => setScrolled(v > 24)), [scrollY])

  return (
    <motion.header
      style={{ boxShadow: shadow }}
      className={cn(
        'sticky top-0 z-50 backdrop-blur-xl transition-[background-color,padding] duration-500',
        scrolled ? 'bg-white/80 py-2' : 'bg-white/0 py-4',
      )}
    >
      <nav className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <AvatarPair size={28} />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-[15px] tracking-tight">
              Dan &amp; Sandra
            </span>
            <span className="mono-label text-[10px] text-muted">
              morning maker show
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative rounded-pill px-3.5 py-1.5 text-[14px] text-ink/80 transition-colors hover:bg-stone hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end gap-2">
          <Button href="#work" className="hidden sm:inline-flex" arrow>
            Work with us
          </Button>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-hairline md:hidden"
          >
            {open ? <CloseIcon size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-hairline bg-white px-5 py-4 md:hidden"
        >
          <ul className="flex flex-col divide-y divide-hairline">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3 text-[16px]"
                >
                  {l.label}
                  <ArrowUpRight size={16} className="text-muted" />
                </a>
              </li>
            ))}
            <li className="pt-4">
              <Button href="#work" className="w-full justify-center" arrow>
                Work with us
              </Button>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  )
}
