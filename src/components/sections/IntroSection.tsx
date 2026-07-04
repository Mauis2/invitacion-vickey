'use client'

import { motion } from 'framer-motion'
import TwinkleStar from '@/components/decorations/TwinkleStar'
import introData from '@/data/intro.json'

export default function IntroSection() {
  return (
    <section id="story" className="px-margin-mobile md:px-margin-desktop py-16 text-center max-w-3xl mx-auto relative">
      <TwinkleStar className="top-10 right-10" size="text-3xl" delay={0.3} color="text-secondary-fixed-dim" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="font-display text-headline-lg text-primary mb-6">{introData.title}</h3>
        <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
          {introData.text}
        </p>
      </motion.div>
    </section>
  )
}
