import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import HowItWorksSection from './components/HowItWorksSection'
import BookConsultationSection from './components/BookConsultationSection'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <BookConsultationSection />
      </main>
      <Footer />
    </>
  )
}
