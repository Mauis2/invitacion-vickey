export interface EventContent {
  babyName: string
  date: string
  time: string
  location: string
  locationUrl: string
  countdownTarget: string
}

export interface HeroContent {
  title: string
  name: string
  musicLabel: string
}

export interface IntroContent {
  title: string
  text: string
}

export interface MessageContent {
  title: string
  text: string
}

export interface ItineraryItem {
  time: string
  title: string
  icon: string
}

export interface GalleryItem {
  src: string
  alt: string
}
