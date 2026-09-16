import { PEOPLE } from '#/data/stats'
import type { PersonId, PlatformId } from '#/data/stats'
import { cn } from '#/lib/format'
import { PlatformBadge } from './PlatformLogo'

interface Props {
  person: PersonId
  size?: number
  badge?: PlatformId
  ring?: boolean
  className?: string
}

export function Avatar({
  person,
  size = 40,
  badge,
  ring = true,
  className,
}: Props) {
  const p = PEOPLE[person]
  return (
    <span
      className={cn('relative inline-block shrink-0', className)}
      style={{ width: size, height: size }}
    >
      <img
        src={p.avatar}
        alt={p.fullName}
        width={size}
        height={size}
        draggable={false}
        className={cn(
          'block h-full w-full rounded-full object-cover',
          ring && 'ring-2 ring-white',
        )}
        style={{ boxShadow: ring ? `0 0 0 1px ${p.accent}33` : undefined }}
      />
      {badge && (
        <PlatformBadge
          platform={badge}
          size={Math.max(16, Math.round(size * 0.42))}
          className="absolute -right-0.5 -bottom-0.5"
        />
      )}
    </span>
  )
}

/** Overlapping Dan + Sandra pair. */
export function AvatarPair({
  size = 36,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-center', className)}>
      <Avatar person="dan" size={size} />
      <Avatar person="sandra" size={size} className="-ml-3" />
    </span>
  )
}
