import type { SVGProps } from 'react'
import type { PlatformId } from '#/data/stats'
import { cn } from '#/lib/format'

const PATHS: Record<PlatformId, string> = {
  x: 'M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z',
  youtube:
    'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
}

export const PLATFORM_LABEL: Record<PlatformId, string> = {
  x: 'X',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
}

interface Props extends SVGProps<SVGSVGElement> {
  platform: PlatformId
  size?: number
}

export function PlatformLogo({
  platform,
  size = 16,
  className,
  ...rest
}: Props) {
  return (
    <svg
      role="img"
      aria-label={PLATFORM_LABEL[platform]}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={cn('shrink-0', className)}
      {...rest}
    >
      <path d={PATHS[platform]} />
    </svg>
  )
}

/** Small filled badge in brand colour, used on avatars and chart legends. */
export function PlatformBadge({
  platform,
  size = 22,
  className,
}: {
  platform: PlatformId
  size?: number
  className?: string
}) {
  const bg =
    platform === 'x'
      ? 'bg-primary text-white'
      : platform === 'youtube'
        ? 'bg-brand-youtube text-white'
        : 'bg-brand-linkedin text-white'
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full ring-2 ring-white',
        bg,
        className,
      )}
      style={{ width: size, height: size }}
    >
      <PlatformLogo platform={platform} size={Math.round(size * 0.5)} />
    </span>
  )
}
