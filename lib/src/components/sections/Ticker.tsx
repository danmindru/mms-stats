import { AccountGlyph } from '#/components/brand/Avatar'
import {
  ACCOUNT_LIST,
  TOTAL_AUDIENCE,
  TOTAL_ENGAGEMENTS,
  TOTAL_WATCH_HOURS,
} from '#/data/stats'
import type { AccountId } from '#/data/stats'
import { compact } from '#/lib/format'

interface Item {
  account?: AccountId
  label: string
  value: string
}

const ITEMS: Item[] = [
  ...ACCOUNT_LIST.map((a) => ({
    account: a.id,
    label: a.label,
    value: `${compact(a.total)} ${a.platform === 'youtube' ? 'views' : 'impressions'}`,
  })),
  { label: 'Engagements', value: compact(TOTAL_ENGAGEMENTS) },
  { label: 'Followers and subscribers', value: compact(TOTAL_AUDIENCE) },
  { label: 'Hours watched', value: `${compact(TOTAL_WATCH_HOURS)} h` },
]

export function Ticker() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="mask-fade-x overflow-hidden border-y border-hairline py-4">
      <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
        {row.map((it, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-3 text-[13px] text-ink/80"
          >
            {it.account && (
              <AccountGlyph account={it.account} size={22} badge={false} />
            )}
            <span className="text-muted">{it.label}</span>
            <span className="tabular font-display text-[15px] text-ink">
              {it.value}
            </span>
            <span className="ml-4 h-1 w-1 rounded-full bg-hairline" />
          </span>
        ))}
      </div>
    </div>
  )
}
