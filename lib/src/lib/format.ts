import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

const compactFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

const fullFormatter = new Intl.NumberFormat('en-US')

export const compact = (n: number) => compactFormatter.format(n)
export const full = (n: number) => fullFormatter.format(n)

export const formatMetric = (
  value: number,
  format?: 'compact' | 'percent' | 'currency' | 'hours',
) => {
  switch (format) {
    case 'percent':
      return `${value.toFixed(1)}%`
    case 'currency':
      return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    case 'hours':
      return `${compact(value)} h`
    default:
      return compact(value)
  }
}

/** Splits 66_700_000 into { value: 66.7, suffix: 'M' } for animated display. */
export const splitCompact = (n: number) => {
  const abs = Math.abs(n)
  if (abs >= 1e9) return { value: n / 1e9, suffix: 'B' }
  if (abs >= 1e6) return { value: n / 1e6, suffix: 'M' }
  if (abs >= 1e3) return { value: n / 1e3, suffix: 'K' }
  return { value: n, suffix: '' }
}

export const share = (part: number, whole: number) =>
  whole === 0 ? 0 : Math.round((part / whole) * 1000) / 10
