import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { MONTH_LABELS, cumulative } from '#/data/stats'
import { compact, cn } from '#/lib/format'

interface Props {
  /** Monthly values; the sparkline plots their running total. */
  monthly: number[]
  color: string
  dark?: boolean
  height?: number
  className?: string
  showAxis?: boolean
  id: string
  /** Bucket labels; defaults to the page's yearly month axis. */
  labels?: string[]
}

/** Small cumulative area chart for cards. */
export function Sparkline({
  monthly,
  color,
  dark,
  height = 96,
  className,
  showAxis = true,
  id,
  labels = MONTH_LABELS,
}: Props) {
  const data = cumulative(monthly).map((v, i) => ({
    month: labels[i] ?? '',
    v,
  }))
  const gradId = `spark-${id}`

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 6, right: 18, bottom: 0, left: 18 }}
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={color}
                stopOpacity={dark ? 0.5 : 0.3}
              />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            interval={showAxis ? 3 : 100}
            hide={!showAxis}
            tickFormatter={(v: string) => v.slice(0, 3)}
            dy={6}
            tick={{ fill: dark ? 'rgba(255,255,255,0.5)' : '#8f8ca3' }}
          />
          <YAxis hide domain={[0, 'dataMax']} />
          <Tooltip
            cursor={{
              stroke: dark ? 'rgba(255,255,255,0.35)' : 'rgba(30,16,53,0.3)',
              strokeDasharray: '3 4',
            }}
            isAnimationActive={false}
            content={({ active, payload }) => {
              if (!active || !payload.length) return null
              const row = payload[0].payload as { month: string; v: number }
              return (
                <div
                  className={cn(
                    'rounded-sm px-2.5 py-1.5 text-[12px] ring-1 backdrop-blur-md',
                    dark
                      ? 'bg-primary-deep/90 text-white ring-white/15'
                      : 'bg-white/90 text-ink ring-hairline',
                  )}
                >
                  <span className="mono-label opacity-60">{row.month}</span>
                  <span className="tabular ml-2 font-medium">
                    {compact(row.v)}
                  </span>
                </div>
              )
            }}
          />
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.75}
            fill={`url(#${gradId})`}
            dot={false}
            activeDot={{
              r: 4,
              strokeWidth: 2,
              stroke: dark ? '#581c87' : '#fff',
              fill: color,
            }}
            isAnimationActive
            animationDuration={1200}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
