'use client'

import HeroSection from '@/components/sections/HeroSection'
import IntroSection from '@/components/sections/IntroSection'
import CountdownSection from '@/components/sections/CountdownSection'
import MessageSection from '@/components/sections/MessageSection'
import GallerySection from '@/components/sections/GallerySection'
import EventInfoSection from '@/components/sections/EventInfoSection'
import ItinerarySection from '@/components/sections/ItinerarySection'
import WishesSection from '@/components/sections/WishesSection'
import RsvpSection from '@/components/sections/RsvpSection'
import FooterSection from '@/components/sections/FooterSection'
import BottomNav from '@/components/navigation/BottomNav'
import TopBar from '@/components/navigation/TopBar'
import GlobalDecorations from '@/components/decorations/GlobalDecorations'

export default function Home() {
  return (
    <>
      <GlobalDecorations />
      <TopBar />
      <main className="relative z-10 max-w-container mx-auto pb-32 md:pb-0">
        <HeroSection />
        <IntroSection />
        <CountdownSection />
        <MessageSection />
        <GallerySection />
        <EventInfoSection />
        <ItinerarySection />
        <WishesSection />
        <RsvpSection />
      </main>
      <FooterSection />
      <BottomNav />
    </>
  )
}
