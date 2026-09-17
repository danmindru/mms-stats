import { motion } from 'motion/react'
import type { HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

/*
 * Every reveal animates `filter: blur()` in. Motion would otherwise leave
 * `filter: blur(0px)` on the element for good, and a filter, even a no-op
 * one, keeps the element on its own offscreen surface that the compositor
 * has to carry through every scroll frame. `transitionEnd` drops it once the
 * animation has finished so the page scrolls like it has no filters at all.
 */
const settled = { filter: 'none' }

interface RevealProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  delay?: number
  y?: number
  once?: boolean
  amount?: number
  /**
   * Blur while fading in. Leave on for text and cards; turn off for very
   * large wrappers (whole chart panels), where the blur pass over the full
   * area is the single most expensive thing that happens while scrolling.
   */
  blur?: boolean
}

/** Scroll-triggered fade + rise. Default view margin makes it feel eager. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  once = true,
  amount = 0.25,
  blur = true,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      initial={blur ? { opacity: 0, y, filter: 'blur(6px)' } : { opacity: 0, y }}
      whileInView={
        blur
          ? { opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: settled }
          : { opacity: 1, y: 0 }
      }
      viewport={{ once, amount, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Staggers children that are themselves `RevealItem`s. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -8% 0px' }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
  y = 20,
}: {
  children: ReactNode
  className?: string
  y?: number
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y, filter: 'blur(4px)' },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.8, ease: EASE },
          transitionEnd: settled,
        },
      }}
    >
      {children}
    </motion.div>
  )
}
