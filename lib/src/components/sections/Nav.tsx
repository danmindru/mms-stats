import { Avatar, ShowIcon } from '#/components/brand/Avatar'
import { PEOPLE, SHOW, WINDOW } from '#/data/stats'

/** Plain page header: three avatars, no navigation, not sticky. */
export function Header() {
  return (
    <header className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-6 sm:px-8">
      <div className="flex items-center gap-4">
        <a
          href={SHOW.url}
          target="_blank"
          rel="noreferrer"
          aria-label={SHOW.name}
          className="transition-transform hover:-translate-y-0.5"
        >
          <ShowIcon size={44} ring={false} />
        </a>
        <a
          href="https://x.com/d4m1n"
          target="_blank"
          rel="noreferrer"
          aria-label={PEOPLE.dan.name}
          className="transition-transform hover:-translate-y-0.5"
        >
          <Avatar person="dan" size={44} ring={false} />
        </a>
        <a
          href="https://x.com/TakoTreba"
          target="_blank"
          rel="noreferrer"
          aria-label={PEOPLE.sandra.name}
          className="transition-transform hover:-translate-y-0.5"
        >
          <Avatar person="sandra" size={44} ring={false} />
        </a>
      </div>
      <div className="text-right leading-tight">
        <div className="font-display text-[15px] tracking-tight text-ink">
          {SHOW.name}
        </div>
        <div className="mono-label text-[10px] text-muted">
          yearly stats · {WINDOW.short}
        </div>
      </div>
    </header>
  )
}
