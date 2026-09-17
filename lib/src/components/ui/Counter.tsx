import NumberFlow, { NumberFlowGroup } from '@number-flow/react'
import { useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { splitCompact, cn } from '#/lib/format'

interface CounterProps {
  value: number
  className?: string
  /** 'compact' renders 66.7M ; 'full' renders 66,739,342 */
  mode?: 'compact' | 'full' | 'raw'
  decimals?: number
  prefix?: string
  suffix?: string
  suffixClassName?: string
  /** Delay before the count-up begins once in view (ms). */
  delay?: number
  /** Animate from zero when scrolled into view. */
  inView?: boolean
}

/**
 * Animated numeral. Starts at zero and rolls to `value` the first time it
 * enters the viewport. Built on NumberFlow so digits spin rather than blur.
 *
 * NumberFlow's `willChange` is deliberately left off: it puts
 * `will-change: transform` on every digit, which with a few dozen counters on
 * the page pins close to a thousand elements to their own compositor layers
 * for the whole session and makes scrolling heavy.
 */
export function Counter({
  value,
  className,
  mode = 'compact',
  decimals,
  prefix,
  suffix,
  suffixClassName,
  delay = 0,
  inView = true,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const seen = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const [armed, setArmed] = useState(!inView)

  useEffect(() => {
    if (!seen || armed) return
    const t = setTimeout(() => setArmed(true), delay)
    return () => clearTimeout(t)
  }, [seen, armed, delay])

  const target = armed ? value : 0

  if (mode === 'compact') {
    const { value: v, suffix: s } = splitCompact(value)
    const shown = armed ? v : 0
    const digits = decimals ?? (v >= 100 ? 0 : 1)
    return (
      <span
        ref={ref}
        className={cn('tabular inline-flex items-baseline', className)}
      >
        {prefix}
        <NumberFlow
          value={shown}
          format={{
            minimumFractionDigits: digits,
            maximumFractionDigits: digits,
          }}
          transformTiming={{
            duration: 1400,
            easing: 'cubic-bezier(0.16,1,0.3,1)',
          }}
          spinTiming={{ duration: 1400, easing: 'cubic-bezier(0.16,1,0.3,1)' }}
          opacityTiming={{ duration: 400, easing: 'ease-out' }}
        />
        <span className={cn('ml-[0.04em]', suffixClassName)}>{s}</span>
        {suffix}
      </span>
    )
  }

  return (
    <span
      ref={ref}
      className={cn('tabular inline-flex items-baseline', className)}
    >
      {prefix}
      <NumberFlow
        value={target}
        format={
          mode === 'full'
            ? { useGrouping: true, maximumFractionDigits: decimals ?? 0 }
            : { maximumFractionDigits: decimals ?? 0 }
        }
        transformTiming={{
          duration: 1600,
          easing: 'cubic-bezier(0.16,1,0.3,1)',
        }}
        spinTiming={{ duration: 1600, easing: 'cubic-bezier(0.16,1,0.3,1)' }}
        opacityTiming={{ duration: 400, easing: 'ease-out' }}
      />
      {suffix && <span className={suffixClassName}>{suffix}</span>}
    </span>
  )
}

export { NumberFlowGroup }
