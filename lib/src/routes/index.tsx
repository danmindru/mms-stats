import { createFileRoute } from '@tanstack/react-router'
import { Header } from '#/components/sections/Header'
import { Hero } from '#/components/sections/Hero'
import { Story } from '#/components/sections/Story'
import { Totals } from '#/components/sections/Totals'
import { YouTube } from '#/components/sections/YouTube'
import { People } from '#/components/sections/People'
import { Properties } from '#/components/sections/Properties'
import { Cta } from '#/components/sections/Cta'
import { Footer } from '#/components/sections/Footer'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Story />
        <Totals />
        <YouTube />
        <People />
        <Properties />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
