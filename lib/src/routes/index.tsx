import { createFileRoute } from '@tanstack/react-router'
import { Header } from '#/components/sections/Nav'
import { Hero } from '#/components/sections/Hero'
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
      <Header />
      <main>
        <Hero />
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
