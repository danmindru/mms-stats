import { motion } from 'motion/react'
import { cn } from '#/lib/format'

interface Props<T extends string> {
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string }[]
  dark?: boolean
  size?: 'sm' | 'md'
  className?: string
}

/** Two-to-four way switch with a spring-animated thumb. */
export function Segmented<T extends string>({
  value,
  onChange,
  options,
  dark = false,
  size = 'sm',
  className,
}: Props<T>) {
  const id = options.map((x) => x.value).join('-')
  return (
    <div
      className={cn(
        'relative inline-flex rounded-xl p-0.5',
        dark ? 'bg-white/10 ring-1 ring-white/15' : 'bg-stone',
        className,
      )}
      role="tablist"
    >
      {options.map((o) => {
        const selected = value === o.value
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(o.value)}
            className={cn(
              'relative z-10 rounded-[26px] leading-none transition-colors',
              size === 'sm' ? 'px-3 py-1.5 text-[13px]' : 'px-4 py-2 text-[14px]',
              selected
                ? dark
                  ? 'text-band'
                  : 'text-white'
                : dark
                  ? 'text-white/75 hover:text-white'
                  : 'text-ink/70 hover:text-ink',
            )}
          >
            {selected && (
              <motion.span
                layoutId={`seg-${id}`}
                className={cn(
                  'absolute inset-0 -z-10 rounded-[26px]',
                  dark ? 'bg-white' : 'bg-primary',
                )}
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
