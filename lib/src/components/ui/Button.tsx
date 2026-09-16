import { motion, useMotionValue, useSpring } from 'motion/react'
import { useRef } from 'react'
import type { ComponentProps, MouseEvent, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '#/lib/format'

type Variant = 'primary' | 'inverted' | 'outline' | 'ghost'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-black',
  inverted: 'bg-white text-primary hover:bg-stone',
  outline:
    'bg-transparent text-primary ring-1 ring-primary/80 hover:bg-primary hover:text-white',
  ghost: 'bg-transparent text-ink underline-offset-4 hover:underline px-0',
}

interface ButtonProps extends Omit<ComponentProps<'a'>, 'ref'> {
  variant?: Variant
  children: ReactNode
  arrow?: boolean
}

/** Pill CTA. Magnetic on hover: nudges toward the cursor, then springs back. */
export function Button({
  variant = 'primary',
  children,
  className,
  arrow,
  ...rest
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 })

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el || variant === 'ghost') return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.32)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'group inline-flex items-center gap-2 rounded-pill px-6 py-3 text-[14px] font-medium leading-[1.71] transition-colors duration-300 select-none',
        VARIANTS[variant],
        className,
      )}
      {...(rest as object)}
    >
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight
          size={16}
          strokeWidth={1.75}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </motion.a>
  )
}

/** Small outlined pill used for filters and system labels. */
export function Chip({
  children,
  active,
  className,
  onClick,
  tone = 'dark',
}: {
  children: ReactNode
  active?: boolean
  className?: string
  onClick?: () => void
  tone?: 'dark' | 'light' | 'coral'
}) {
  const base =
    tone === 'light'
      ? active
        ? 'bg-white text-primary ring-white'
        : 'text-white/80 ring-white/30 hover:ring-white/60 hover:text-white'
      : tone === 'coral'
        ? active
          ? 'bg-coral text-primary ring-coral'
          : 'text-coral ring-coral-soft hover:bg-coral/10'
        : active
          ? 'bg-primary text-white ring-primary'
          : 'text-primary ring-hairline hover:ring-primary'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[13px] leading-none ring-1 transition-all duration-300 active:scale-95',
        base,
        className,
      )}
    >
      {children}
    </button>
  )
}
