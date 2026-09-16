import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { MONTH_LABELS } from '#/data/stats'
import { compact, cn } from '#/lib/format'

interface Props {
  values: number[]
  color: string
  dark?: boolean
  height?: number
  className?: string
  /** Highlight the largest bar. */
  highlightPeak?: boolean
  showAxis?: boolean
  radius?: number
}

/** Compact monthly bar chart with the peak bar picked out. */
export function MonthlyBars({
  values,
  color,
  dark,
  height = 120,
  className,
  highlightPeak = true,
  showAxis = true,
  radius = 4,
}: Props) {
  const data = MONTH_LABELS.map((month, i) => ({ month, v: values[i], i }))
  const peak = values.indexOf(Math.max(...values))
  const base = dark ? 'rgba(255,255,255,0.22)' : `${color}55`

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 4, right: 10, bottom: 0, left: 10 }}
          barCategoryGap="28%"
        >
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            interval={showAxis ? 2 : 100}
            hide={!showAxis}
            tickFormatter={(v: string) => v.slice(0, 3)}
            dy={6}
            tick={{ fill: dark ? 'rgba(255,255,255,0.5)' : '#93939f' }}
          />
          <YAxis hide />
          <Tooltip
            cursor={{
              fill: dark ? 'rgba(255,255,255,0.06)' : 'rgba(23,23,28,0.05)',
              radius: 4,
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
                      ? 'bg-primary/85 text-white ring-white/15'
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
          <Bar
            dataKey="v"
            radius={[radius, radius, radius, radius]}
            isAnimationActive
            animationDuration={1200}
            animationEasing="ease-out"
          >
            {data.map((d) => (
              <Cell
                key={d.i}
                fill={highlightPeak && d.i === peak ? color : base}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
