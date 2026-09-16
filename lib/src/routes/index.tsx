import { createFileRoute } from '@tanstack/react-router'
import { AnnouncementBar, Nav } from '#/components/sections/Nav'
import { Hero } from '#/components/sections/Hero'
import { Ticker } from '#/components/sections/Ticker'
import { Totals } from '#/components/sections/Totals'
import { Platforms } from '#/components/sections/Platforms'
import { People } from '#/components/sections/People'
import { Moments } from '#/components/sections/Moments'
import { Cta } from '#/components/sections/Cta'
import { Footer } from '#/components/sections/Footer'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Totals />
        <Platforms />
        <People />
        <Moments />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
