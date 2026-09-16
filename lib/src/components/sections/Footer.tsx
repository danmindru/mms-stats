import { AvatarPair } from '#/components/brand/Avatar'
import { PlatformLogo } from '#/components/brand/PlatformLogo'
import { ACCOUNTS, WINDOW } from '#/data/stats'

export function Footer() {
  return (
    <footer id="footnotes" className="bg-primary text-white">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <AvatarPair size={32} />
            <div className="leading-tight">
              <div className="font-display text-[16px] tracking-tight">
                Dan &amp; Sandra
              </div>
              <div className="mono-label text-[10px] text-white/50">
                morning maker show
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-[48ch] text-[13px] leading-[1.5] text-white/60">
            A year of reach, visualised. Built with React, TanStack Start,
            Recharts, Motion and NumberFlow. Type set in Space Grotesk, Inter
            and JetBrains Mono as stand-ins for the reference system.
          </p>
        </div>

        <div>
          <div className="mono-label text-coral">methodology</div>
          <ul className="mt-4 space-y-2.5 text-[13px] leading-[1.5] text-white/60">
            <li>
              Window: {WINDOW.start} → {WINDOW.end} ({WINDOW.days} days) for X
              and YouTube.
            </li>
            <li>
              LinkedIn reports a 400-day window (
              {ACCOUNTS['sandra-linkedin'].windowNote?.split(' (')[0]}); shown
              as reported.
            </li>
            <li>
              YouTube counts <em>views</em>; X and LinkedIn count{' '}
              <em>impressions</em>. Both are folded into the combined total.
            </li>
            <li>
              Monthly values are read from the native charts and normalised to
              the reported yearly totals. Headline totals are verbatim.
            </li>
            <li>
              Morning Maker Show is a shared channel; per-person views are
              credited 50/50.
            </li>
          </ul>
        </div>

        <div>
          <div className="mono-label text-white/50">accounts</div>
          <ul className="mt-4 space-y-2.5 text-[13px]">
            {Object.values(ACCOUNTS).map((a) => (
              <li key={a.id}>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
                >
                  <PlatformLogo platform={a.platform} size={12} />
                  {a.handle}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-5 py-5 text-[12px] text-white/40 sm:px-8">
          <span>
            © {new Date().getFullYear()} Dan &amp; Sandra. Numbers don’t lie; we
            just made them prettier.
          </span>
          <span className="mono-label text-[10px]">
            v1 · updated Sep 16, 2026
          </span>
        </div>
      </div>
    </footer>
  )
}
