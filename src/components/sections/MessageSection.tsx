'use client'

import { motion } from 'framer-motion'
import TwinkleStar from '@/components/decorations/TwinkleStar'
import messageData from '@/data/message.json'

export default function MessageSection() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop py-20 relative overflow-hidden my-12">
      <div className="absolute inset-0 bg-primary-container/30 rounded-3xl -mx-4 md:mx-0 z-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl mix-blend-multiply" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-container/50 rounded-full blur-3xl mix-blend-multiply" />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7 }}
      >
        <h3 className="font-display text-headline-lg text-on-surface mb-8">{messageData.title}</h3>
        <p className="font-body text-body-lg text-on-surface-variant leading-relaxed italic mb-8">
          &ldquo;{messageData.text}&rdquo;
        </p>
        <div className="flex justify-center gap-2 relative">
          <TwinkleStar className="relative" size="text-2xl" delay={0} color="text-secondary-container" />
          <TwinkleStar className="relative mt-1" size="text-xl" delay={0.5} color="text-secondary-container" />
          <TwinkleStar className="relative mt-2" size="text-lg" delay={1} color="text-secondary-container" />
        </div>
      </motion.div>
    </section>
  )
}
