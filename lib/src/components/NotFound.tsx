import { ArrowLeft } from 'lucide-react'
import { Button } from '#/components/ui/Button'

export function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="mono-label text-muted">404</span>
      <h1 className="font-display text-[clamp(36px,6vw,72px)] leading-none tracking-[-0.03em] text-ink">
        Page not found.
      </h1>
      <Button href="/" variant="outline">
        <span className="inline-flex items-center gap-2">
          <ArrowLeft size={14} /> Back to the stats
        </span>
      </Button>
    </main>
  )
}
