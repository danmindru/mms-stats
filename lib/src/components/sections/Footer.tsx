import { AccountGlyph, TeamAvatars } from '#/components/brand/Avatar'
import { ACCOUNTS, SHOW, WINDOW } from '#/data/stats'

export function Footer() {
  return (
    <footer id="footnotes" className="bg-primary-deep text-white">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <TeamAvatars size={32} />
            <div className="leading-tight">
              <div className="font-display text-[16px] tracking-tight">
                {SHOW.name}
              </div>
              <div className="mono-label text-[10px] text-white/50">
                Dan &amp; Sandra
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-[48ch] text-[13px] leading-[1.5] text-white/60">
            Yearly stats for {WINDOW.short}. Built with React, TanStack Start,
            Recharts, Motion and NumberFlow.
          </p>
        </div>

        <div>
          <div className="mono-label text-sand">how the numbers were made</div>
          <ul className="mt-4 space-y-2.5 text-[13px] leading-[1.5] text-white/60">
            <li>
              X and YouTube: {WINDOW.start} to {WINDOW.end} ({WINDOW.days}{' '}
              days).
            </li>
            <li>
              LinkedIn only reports a 400-day window (Aug 13, 2025 to Sep 16,
              2026). Shown as reported.
            </li>
            <li>
              YouTube counts views. X and LinkedIn count impressions. Both are
              added into the combined total.
            </li>
            <li>
              Yearly totals are copied from each platform’s analytics. Monthly
              values are read from the native charts and scaled to match those
              totals.
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
                  <AccountGlyph account={a.id} size={20} badge={false} />
                  {a.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-5 py-5 text-[12px] text-white/40 sm:px-8">
          <span>© {new Date().getFullYear()} Dan &amp; Sandra</span>
          <span className="mono-label text-[10px]">updated Sep 16, 2026</span>
        </div>
      </div>
    </footer>
  )
}
