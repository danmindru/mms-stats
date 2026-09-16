import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import type { ReactNode } from 'react'
import { cn } from '#/lib/format'

export interface RingSegment {
  key: string
  value: number
  color: string
}

interface Props {
  segments: RingSegment[]
  size?: number
  stroke?: number
  className?: string
  center?: ReactNode
  track?: string
}

/**
 * Hand-rolled SVG ring so we control the draw-on animation precisely. Each
 * segment is a stroked circle whose dash offset animates in sequence.
 */
export function ShareRing({
  segments,
  size = 220,
  stroke = 14,
  className,
  center,
  track = 'rgba(23,23,28,0.06)',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const total = segments.reduce((a, s) => a + s.value, 0) || 1
  let offset = 0

  return (
    <div
      ref={ref}
      className={cn('relative inline-block', className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={track}
          strokeWidth={stroke}
        />
        {segments.map((s, idx) => {
          const frac = s.value / total
          const dash = frac * c
          const gap = c - dash
          const start = offset
          offset += dash
          return (
            <motion.circle
              key={s.key}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeLinecap="butt"
              strokeDasharray={`${dash} ${gap}`}
              initial={{ strokeDashoffset: c - start + dash, opacity: 0 }}
              animate={
                inView
                  ? { strokeDashoffset: -start, opacity: 1 }
                  : { strokeDashoffset: c - start + dash, opacity: 0 }
              }
              transition={{
                strokeDashoffset: {
                  duration: 1.4,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.15 + idx * 0.12,
                },
                opacity: { duration: 0.3, delay: 0.15 + idx * 0.12 },
              }}
            />
          )
        })}
      </svg>
      {center && (
        <div className="absolute inset-0 flex items-center justify-center text-center">
          {center}
        </div>
      )}
    </div>
  )
}
