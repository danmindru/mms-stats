import type { CSSProperties } from 'react'
import { ACCOUNTS, PEOPLE, SHOW } from '#/data/stats'
import type { AccountId, PersonId, PlatformId } from '#/data/stats'
import { cn } from '#/lib/format'
import { PlatformBadge } from './PlatformLogo'

interface Props {
  person: PersonId
  size?: number
  badge?: PlatformId
  ring?: boolean
  className?: string
  style?: CSSProperties
}

export function Avatar({
  person,
  size = 40,
  badge,
  ring = true,
  className,
  style,
}: Props) {
  const p = PEOPLE[person]
  return (
    <span
      className={cn('relative inline-block shrink-0', className)}
      style={{ width: size, height: size, ...style }}
    >
      <img
        src={p.avatar}
        alt={p.name}
        width={size}
        height={size}
        draggable={false}
        className={cn(
          'block h-full w-full rounded-full object-cover',
          ring && 'ring-2 ring-white',
        )}
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

/** The Morning Maker Show icon, same footprint as an Avatar. */
export function ShowIcon({
  size = 40,
  badge,
  ring = true,
  className,
  style,
}: {
  size?: number
  badge?: PlatformId
  ring?: boolean
  className?: string
  style?: CSSProperties
}) {
  return (
    <span
      className={cn('relative inline-block shrink-0', className)}
      style={{ width: size, height: size, ...style }}
    >
      <img
        src={SHOW.icon}
        alt={SHOW.name}
        width={size}
        height={size}
        draggable={false}
        className={cn(
          'block h-full w-full rounded-full object-cover',
          ring && 'ring-2 ring-white',
        )}
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

/** Dan, Sandra and the show, side by side. */
export function TeamAvatars({
  size = 36,
  overlap = true,
  className,
}: {
  size?: number
  overlap?: boolean
  className?: string
}) {
  const shift = overlap ? { marginLeft: -size * 0.28 } : { marginLeft: 6 }
  return (
    <span className={cn('inline-flex items-center', className)}>
      <ShowIcon size={size} />
      <Avatar person="dan" size={size} style={shift} />
      <Avatar person="sandra" size={size} style={shift} />
    </span>
  )
}

/**
 * Glyph for a single account: the show icon for the YouTube channel,
 * otherwise the person's avatar. Both carry the platform badge.
 */
export function AccountGlyph({
  account,
  size = 28,
  badge = true,
  className,
}: {
  account: AccountId
  size?: number
  badge?: boolean
  className?: string
}) {
  const a = ACCOUNTS[account]
  if (a.platform === 'youtube') {
    return (
      <ShowIcon
        size={size}
        badge={badge ? 'youtube' : undefined}
        className={className}
      />
    )
  }
  return (
    <Avatar
      person={a.people[0]}
      size={size}
      badge={badge ? a.platform : undefined}
      className={className}
    />
  )
}
