import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import HowItWorksSection from './components/HowItWorksSection'
import BookConsultationSection from './components/BookConsultationSection'
import Testimonials from './components/Testimonials'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <BookConsultationSection />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
