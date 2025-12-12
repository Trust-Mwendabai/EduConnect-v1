import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import SystemOverview from '../components/SystemOverview'
import VendorPartners from '../components/VendorPartners'
import LearningJourney from '../components/LearningJourney'
import PlatformFeatures from '../components/PlatformFeatures'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <SystemOverview />
      <LearningJourney />
      <VendorPartners />
      <PlatformFeatures />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default LandingPage