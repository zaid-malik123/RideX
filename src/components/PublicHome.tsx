"use client"
import HeroSection from './HeroSection'
import VechileSlider from './VechileSlider'
import AuthModal from './AuthModal'
import { useState } from 'react'

const PublicHome = () => {
  const [authOpen, setAuthOpen] = useState(true)
  return (
    <>
      <HeroSection/>
      <VechileSlider/>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)}/>
    </>
  )
}

export default PublicHome