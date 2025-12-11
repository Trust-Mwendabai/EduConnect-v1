import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default LandingPage