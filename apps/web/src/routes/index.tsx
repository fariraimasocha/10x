import { createFileRoute } from '@tanstack/react-router'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import SelectedWorks from '../components/SelectedWorks'
import Capabilities from '../components/Capabilities'
import Manifesto from '../components/Manifesto'
import Footer from '../components/Footer'
import CursorBlob from '../components/CursorBlob'

export const Route = createFileRoute('/')({ component: Landing })

function Landing() {
  return (
    <>
      <CursorBlob />
      <Header />
      <main className="relative z-10 w-full">
        <Hero />
        <Marquee />
        <SelectedWorks />
        <Capabilities />
        <Manifesto />
      </main>
      <Footer />
    </>
  )
}
