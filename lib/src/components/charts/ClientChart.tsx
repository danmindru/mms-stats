import { ClientOnly } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { cn } from '#/lib/format'

/**
 * Recharts measures the DOM, so it is rendered client-side only. The fallback
 * reserves the same height to keep layout stable during hydration.
 */
export function ClientChart({
  children,
  height,
  className,
  dark,
}: {
  children: ReactNode
  height: number
  className?: string
  dark?: boolean
}) {
  return (
    <ClientOnly
      fallback={
        <div
          className={cn(
            'w-full animate-pulse rounded-md',
            dark ? 'bg-white/5' : 'bg-stone/60',
            className,
          )}
          style={{ height }}
        />
      }
    >
      {children}
    </ClientOnly>
  )
}
