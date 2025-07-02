import React from 'react'
import NavBar from './Navbar'
import Footer from './Footer'
import { ParallaxScroll } from './parallax-scroll'

export default function Gallery() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-black">
        <NavBar />
        <ParallaxScroll />
        <Footer />
    </main>
  )
}
