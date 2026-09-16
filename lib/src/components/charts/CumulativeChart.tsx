import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { TooltipContentProps } from 'recharts'
import {
  MONTH_LABELS,
  PEOPLE,
  PERSON_MONTHLY,
  PLATFORMS,
  PLATFORM_MONTHLY,
  cumulative,
} from '#/data/stats'
import type { PersonId, PlatformId } from '#/data/stats'
import { compact, cn } from '#/lib/format'
import { PlatformLogo } from '#/components/brand/PlatformLogo'
import { Avatar } from '#/components/brand/Avatar'

export type SeriesMode = 'platform' | 'person'
export type SeriesKey = PlatformId | PersonId

export const SERIES_COLORS: Record<SeriesKey, { light: string; dark: string }> =
  {
    x: { light: '#17171c', dark: '#f4f4f6' },
    youtube: { light: '#e11d1d', dark: '#ff6b6b' },
    linkedin: { light: '#0a66c2', dark: '#63a8ff' },
    dan: { light: '#1863dc', dark: '#79b0ff' },
    sandra: { light: '#ff7759', dark: '#ffad9b' },
  }

export const SERIES_ORDER: Record<SeriesMode, SeriesKey[]> = {
  platform: ['x', 'linkedin', 'youtube'],
  person: ['sandra', 'dan'],
}

export const seriesLabel = (k: SeriesKey) =>
  k in PLATFORMS ? PLATFORMS[k as PlatformId].name : PEOPLE[k as PersonId].name

export function SeriesGlyph({
  k,
  size = 16,
  className,
}: {
  k: SeriesKey
  size?: number
  className?: string
}) {
  if (k in PLATFORMS) {
    return (
      <PlatformLogo
        platform={k as PlatformId}
        size={size}
        className={className}
      />
    )
  }
  return (
    <Avatar
      person={k as PersonId}
      size={size + 4}
      ring={false}
      className={className}
    />
  )
}

export interface Row {
  month: string
  i: number
  [key: string]: number | string
}

export const buildRows = (mode: SeriesMode, cumulate: boolean): Row[] => {
  const src = mode === 'platform' ? PLATFORM_MONTHLY : PERSON_MONTHLY
  const keys = SERIES_ORDER[mode]
  const series = Object.fromEntries(
    keys.map((k) => [
      k,
      cumulate
        ? cumulative(src[k as keyof typeof src])
        : src[k as keyof typeof src],
    ]),
  ) as Record<SeriesKey, number[]>
  return MONTH_LABELS.map((month, i) => {
    const row: Row = { month, i }
    for (const k of keys) row[k] = series[k][i]
    return row
  })
}

interface Props {
  mode: SeriesMode
  enabled: Record<string, boolean>
  cumulate?: boolean
  dark?: boolean
  height?: number
  onActiveIndex?: (i: number | null) => void
  activeIndex?: number | null
  className?: string
  minimal?: boolean
}

export function CumulativeChart({
  mode,
  enabled,
  cumulate = true,
  dark = false,
  height = 360,
  onActiveIndex,
  className,
  minimal = false,
}: Props) {
  const rows = useMemo(() => buildRows(mode, cumulate), [mode, cumulate])
  const keys = SERIES_ORDER[mode].filter((k) => enabled[k] !== false)
  const gridColor = dark ? 'rgba(255,255,255,0.08)' : 'rgba(23,23,28,0.08)'
  const tickColor = dark ? 'rgba(255,255,255,0.55)' : '#93939f'
  const idPrefix = `${mode}-${dark ? 'd' : 'l'}-${cumulate ? 'c' : 'm'}`

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={rows}
          margin={{ top: 16, right: 12, bottom: 0, left: minimal ? 0 : -8 }}
          onMouseMove={(s) => {
            // Recharts 3 reports the index as a string; coerce and validate.
            const raw = s.activeTooltipIndex
            const idx = raw === undefined || raw === null ? NaN : Number(raw)
            onActiveIndex?.(
              Number.isInteger(idx) && idx >= 0 && idx < rows.length
                ? idx
                : null,
            )
          }}
          onMouseLeave={() => onActiveIndex?.(null)}
        >
          <defs>
            {SERIES_ORDER[mode].map((k) => {
              const c = SERIES_COLORS[k][dark ? 'dark' : 'light']
              return (
                <linearGradient
                  key={k}
                  id={`${idPrefix}-${k}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={c}
                    stopOpacity={dark ? 0.55 : 0.34}
                  />
                  <stop
                    offset="100%"
                    stopColor={c}
                    stopOpacity={dark ? 0.08 : 0.03}
                  />
                </linearGradient>
              )
            })}
            <filter
              id={`${idPrefix}-glow`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {!minimal && (
            <CartesianGrid
              vertical={false}
              stroke={gridColor}
              strokeDasharray="2 6"
            />
          )}
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fill: tickColor }}
            interval={minimal ? 3 : 'preserveStartEnd'}
            minTickGap={24}
            dy={8}
            hide={minimal}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: tickColor }}
            tickFormatter={(v: number) => compact(v)}
            width={52}
            hide={minimal}
          />
          <Tooltip
            cursor={{
              stroke: dark ? 'rgba(255,255,255,0.35)' : 'rgba(23,23,28,0.35)',
              strokeWidth: 1,
              strokeDasharray: '3 4',
            }}
            content={(p) => (
              <ChartTooltip
                {...(p as TooltipContentProps)}
                dark={dark}
                keys={keys}
                cumulate={cumulate}
              />
            )}
            isAnimationActive={false}
          />
          {keys.map((k) => {
            const c = SERIES_COLORS[k][dark ? 'dark' : 'light']
            return (
              <Area
                key={k}
                type="monotone"
                dataKey={k}
                stackId="stack"
                stroke={c}
                strokeWidth={1.75}
                fill={`url(#${idPrefix}-${k})`}
                activeDot={{
                  r: 5,
                  strokeWidth: 2,
                  stroke: dark ? '#003c33' : '#ffffff',
                  fill: c,
                  filter: `url(#${idPrefix}-glow)`,
                }}
                dot={false}
                isAnimationActive
                animationDuration={1400}
                animationEasing="ease-out"
              />
            )
          })}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

function ChartTooltip({
  active,
  payload,
  label,
  dark,
  keys,
  cumulate,
}: TooltipContentProps & {
  dark: boolean
  keys: SeriesKey[]
  cumulate: boolean
}) {
  if (!active || !payload.length) return null
  const total = payload.reduce((a, p) => a + (Number(p.value) || 0), 0)
  const ordered = [...keys].reverse()
  return (
    <div
      className={cn(
        'min-w-[200px] rounded-md p-3 text-[13px] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.35)] ring-1 backdrop-blur-md',
        dark
          ? 'bg-primary/85 text-white ring-white/15'
          : 'bg-white/90 text-ink ring-hairline',
      )}
    >
      <div className="mono-label mb-2 flex items-center justify-between gap-6 opacity-60">
        <span>{String(label)}</span>
        <span>{cumulate ? 'running total' : 'in month'}</span>
      </div>
      <ul className="space-y-1.5">
        {ordered.map((k) => {
          const item = payload.find((p) => p.dataKey === k)
          if (!item) return null
          return (
            <li key={k} className="flex items-center justify-between gap-6">
              <span className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{
                    background: SERIES_COLORS[k][dark ? 'dark' : 'light'],
                  }}
                />
                <SeriesGlyph k={k} size={12} />
                <span className="opacity-80">{seriesLabel(k)}</span>
              </span>
              <span className="tabular font-medium">
                {compact(Number(item.value))}
              </span>
            </li>
          )
        })}
      </ul>
      <div
        className={cn(
          'mt-2 flex items-center justify-between border-t pt-2',
          dark ? 'border-white/15' : 'border-hairline',
        )}
      >
        <span className="opacity-70">Combined</span>
        <span className="tabular font-display text-[15px] font-medium">
          {compact(total)}
        </span>
      </div>
    </div>
  )
}
