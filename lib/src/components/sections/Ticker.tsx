import { Avatar } from '#/components/brand/Avatar'
import { PlatformLogo } from '#/components/brand/PlatformLogo'
import {
  ACCOUNTS,
  MOMENTS,
  TOTAL_ENGAGEMENTS,
  TOTAL_WATCH_HOURS,
} from '#/data/stats'
import { compact } from '#/lib/format'

const ITEMS = [
  {
    glyph: <PlatformLogo platform="x" size={12} />,
    label: `${ACCOUNTS['dan-x'].handle}`,
    value: compact(ACCOUNTS['dan-x'].total),
    person: 'dan' as const,
  },
  {
    glyph: <PlatformLogo platform="x" size={12} />,
    label: `${ACCOUNTS['sandra-x'].handle}`,
    value: compact(ACCOUNTS['sandra-x'].total),
    person: 'sandra' as const,
  },
  {
    glyph: <PlatformLogo platform="youtube" size={12} />,
    label: 'Morning Maker Show',
    value: `${compact(ACCOUNTS['mms-youtube'].total)} views`,
  },
  {
    glyph: <PlatformLogo platform="linkedin" size={12} />,
    label: 'Sandra',
    value: compact(ACCOUNTS['sandra-linkedin'].total),
    person: 'sandra' as const,
  },
  { glyph: null, label: 'engagements', value: compact(TOTAL_ENGAGEMENTS) },
  {
    glyph: null,
    label: 'hours watched',
    value: `${compact(TOTAL_WATCH_HOURS)} h`,
  },
  { glyph: null, label: MOMENTS[0].title, value: MOMENTS[0].when },
  { glyph: null, label: MOMENTS[1].title, value: MOMENTS[1].when },
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
            {it.person && <Avatar person={it.person} size={20} ring={false} />}
            {it.glyph && <span className="text-primary">{it.glyph}</span>}
            <span className="text-muted">{it.label}</span>
            <span className="tabular font-display text-[15px] text-primary">
              {it.value}
            </span>
            <span className="ml-4 h-1 w-1 rounded-full bg-hairline" />
          </span>
        ))}
      </div>
    </div>
  )
}
