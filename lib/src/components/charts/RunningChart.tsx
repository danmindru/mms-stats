import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { cn } from '#/lib/format'

interface Props {
  id: string
  labels: string[]
  /** Already-cumulated values, one per label. */
  running: number[]
  /** Per-bucket values, shown in the tooltip as "+x this month". */
  monthly?: number[]
  color: string
  format: (n: number) => string
  dark?: boolean
  height?: number
  className?: string
  onActiveIndex?: (i: number | null) => void
  /** Marks that get a small label above the line (e.g. window boundaries). */
  marks?: { index: number; label: string }[]
}

/**
 * Running-total area chart with an arbitrary time axis. Used where the
 * 13-bucket yearly axis does not apply (e.g. the channel's whole lifetime).
 */
export function RunningChart({
  id,
  labels,
  running,
  monthly,
  color,
  format,
  dark = false,
  height = 260,
  className,
  onActiveIndex,
  marks = [],
}: Props) {
  const data = labels.map((label, i) => ({
    label,
    v: running[i] ?? 0,
    m: monthly?.[i] ?? 0,
    i,
  }))
  const gradId = `run-${id}`
  const n = labels.length
  const tickEvery = n > 20 ? 6 : n > 13 ? 3 : 3
  const axis = dark ? 'rgba(255,255,255,0.6)' : '#8b7fa3'
  const grid = dark ? 'rgba(255,255,255,0.08)' : 'rgba(30,16,53,0.08)'

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 18, right: 14, bottom: 0, left: 14 }}
          onMouseMove={(s) => {
            const raw = s.activeTooltipIndex
            const idx = raw === undefined || raw === null ? NaN : Number(raw)
            onActiveIndex?.(
              Number.isInteger(idx) && idx >= 0 && idx < n ? idx : null,
            )
          }}
          onMouseLeave={() => onActiveIndex?.(null)}
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={color}
                stopOpacity={dark ? 0.55 : 0.35}
              />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke={grid} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            interval={tickEvery - 1}
            dy={8}
            tick={{ fill: axis }}
          />
          <YAxis hide domain={[0, 'dataMax']} />
          <Tooltip
            cursor={{
              stroke: dark ? 'rgba(255,255,255,0.4)' : 'rgba(30,16,53,0.35)',
              strokeDasharray: '3 4',
            }}
            isAnimationActive={false}
            content={({ active, payload }) => {
              if (!active || !payload.length) return null
              const row = payload[0].payload as (typeof data)[number]
              return (
                <div
                  className={cn(
                    'min-w-[150px] rounded-md px-3 py-2 text-[13px] ring-1 backdrop-blur-md',
                    dark
                      ? 'bg-primary-deep/90 text-white ring-white/15'
                      : 'bg-white/95 text-ink ring-hairline shadow-[0_12px_40px_-12px_rgba(30,16,53,0.35)]',
                  )}
                >
                  <div className="mono-label text-[10px] opacity-70">
                    {row.label}
                  </div>
                  <div className="tabular mt-1 flex items-baseline justify-between gap-4">
                    <span className="opacity-70">running total</span>
                    <span className="font-medium">{format(row.v)}</span>
                  </div>
                  {monthly && (
                    <div className="tabular flex items-baseline justify-between gap-4 text-[12px] opacity-70">
                      <span>this month</span>
                      <span>+{format(row.m)}</span>
                    </div>
                  )}
                </div>
              )
            }}
          />
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradId})`}
            dot={false}
            activeDot={{
              r: 5,
              strokeWidth: 2,
              stroke: dark ? '#581c87' : '#fff',
              fill: color,
            }}
            isAnimationActive
            animationDuration={1100}
            animationEasing="ease-out"
          />
          {marks.map((mk) => (
            <ReferenceLine
              key={mk.index}
              x={labels[mk.index] ?? ''}
              stroke={dark ? 'rgba(255,255,255,0.35)' : 'rgba(30,16,53,0.25)'}
              strokeDasharray="2 4"
              label={{
                value: mk.label,
                position: 'insideTopLeft',
                fill: dark ? 'rgba(255,255,255,0.7)' : '#6b5f85',
                fontSize: 10,
                fontFamily: 'var(--font-mono)',
                dx: 4,
              }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

