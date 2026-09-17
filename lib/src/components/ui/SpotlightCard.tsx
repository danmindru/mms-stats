import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react'
import type { MouseEvent, ReactNode } from 'react'
import { cn } from '#/lib/format'

interface Props {
  children: ReactNode
  className?: string
  /** Colour of the cursor-following light. */
  glow?: string
  /** Enable the subtle 3D tilt on hover. */
  tilt?: boolean
  dark?: boolean
  as?: 'div' | 'article' | 'li'
}

/**
 * Card whose border and background pick up a soft light that follows the
 * cursor, plus an optional 3D tilt. The Cohere system is flat, so the effect
 * is kept at hairline intensity: it reads as depth, not a glow effect.
 */
export function SpotlightCard({
  children,
  className,
  glow = 'rgba(126, 34, 206, 0.12)',
  tilt = false,
  dark = false,
}: Props) {
  const mx = useMotionValue(-400)
  const my = useMotionValue(-400)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 180, damping: 22 })
  const sry = useSpring(ry, { stiffness: 180, damping: 22 })
  /*
   * Perspective only while the card is actually tilted. A constant
   * `perspective()` is a 3D transform, which would keep every card on its own
   * compositor layer even at rest; at 0 Motion drops it and the transform
   * collapses to `none`, so idle cards paint like plain boxes.
   */
  const perspective = useTransform([srx, sry], ([a, b]) =>
    Math.abs(a as number) > 0.01 || Math.abs(b as number) > 0.01 ? 1200 : 0,
  )

  const background = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, ${glow}, transparent 65%)`
  const border = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, ${
    dark ? 'rgba(255,255,255,0.55)' : 'rgba(126,34,206,0.35)'
  }, transparent 70%)`

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    mx.set(x)
    my.set(y)
    if (tilt) {
      rx.set((y / r.height - 0.5) * -6)
      ry.set((x / r.width - 0.5) * 6)
    }
  }
  const onLeave = () => {
    mx.set(-400)
    my.set(-400)
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: tilt ? srx : 0,
        rotateY: tilt ? sry : 0,
        transformPerspective: tilt ? perspective : 0,
      }}
      className={cn(
        'group/card relative overflow-hidden rounded-lg',
        dark ? 'bg-primary-deep text-white' : 'bg-white text-ink',
        className,
      )}
    >
      {/* light-tracking border */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] p-px opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background: border,
          WebkitMask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {/* light-tracking wash */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{ background }}
      />
      <div className="relative h-full">{children}</div>
    </motion.div>
  )
}
