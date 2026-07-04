'use client'

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import FloatingCloud from '@/components/decorations/FloatingCloud'
import TwinkleStar from '@/components/decorations/TwinkleStar'
import StarField from '@/components/decorations/StarField'
import heroData from '@/data/hero.json'

export default function HeroSection() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play()
      setPlaying(true)
    }
  }

  return (
    <header
      id="home"
      className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-margin-mobile md:px-margin-desktop py-16 overflow-hidden"
    >
      <audio ref={audioRef} src="/music.mp3" loop preload="none" />

      <StarField count={8} />
      <FloatingCloud className="top-10 left-10" size="text-6xl" />
      <TwinkleStar className="top-20 right-20" delay={0.5} />
      <FloatingCloud className="bottom-20 left-1/4" size="text-7xl" delay={2} />
      <TwinkleStar className="bottom-32 right-1/3" size="text-3xl" delay={1.5} color="text-primary-fixed-dim" />

      <motion.div
        className="z-10 bg-primary-container/40 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-xl shadow-primary-container/30 border border-primary-container/60 max-w-2xl w-full mx-auto flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.span
          className="material-symbols-outlined text-primary text-4xl mb-4"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          brightness_3
        </motion.span>

        <h1 className="font-display text-display-lg text-primary tracking-tight mb-2">
          {heroData.title}
        </h1>
        <h2 className="font-display text-4xl md:text-5xl text-on-surface mb-6">
          {heroData.name}
        </h2>

        <motion.button
          onClick={toggleMusic}
          className="flex items-center gap-4 bg-surface-container-low px-6 py-3 rounded-full border border-primary-container/50 shadow-sm mt-4 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label={playing ? 'Pausar música' : 'Reproducir melodía de cuna'}
        >
          <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined" aria-hidden="true">
              {playing ? 'pause' : 'play_arrow'}
            </span>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-body text-label-sm text-on-surface-variant uppercase tracking-wider">
              {playing ? 'Reproduciendo' : 'Melodía de cuna'}
            </span>
            <span className="font-body text-body-md text-primary">{heroData.musicLabel}</span>
          </div>
          {playing && (
            <div className="flex items-end gap-0.5 h-4 ml-2" aria-hidden="true">
              {[0, 0.2, 0.4].map((delay) => (
                <motion.div
                  key={delay}
                  className="w-1 bg-primary rounded-full"
                  animate={{ height: ['4px', '16px', '4px'] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay }}
                />
              ))}
            </div>
          )}
        </motion.button>
      </motion.div>
    </header>
  )
}
