'use client'

import { motion } from 'framer-motion'
import eventData from '@/data/event.json'

export default function EventInfoSection() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop py-16 flex justify-center">
      <motion.div
        className="bg-primary-container/25 rounded-3xl p-8 md:p-12 shadow-lg shadow-primary/10 border border-primary-container/60 max-w-lg w-full text-center relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          className="material-symbols-outlined text-primary-fixed-dim absolute -top-4 -left-4 text-5xl rotate-12"
          animate={{ y: [0, -6, 0], rotate: [12, 15, 12] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          loyalty
        </motion.span>

        <h3 className="font-display text-headline-md text-on-surface mb-8">Cuándo y Dónde</h3>

        <div className="flex flex-col gap-6 mb-10">
          <div className="flex items-center justify-center gap-3">
            <span className="material-symbols-outlined text-tertiary" aria-hidden="true">calendar_month</span>
            <p className="font-body text-body-lg text-on-surface-variant">{eventData.date}</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="material-symbols-outlined text-tertiary" aria-hidden="true">schedule</span>
            <p className="font-body text-body-lg text-on-surface-variant">{eventData.time}</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="material-symbols-outlined text-tertiary" aria-hidden="true">location_on</span>
            <p className="font-body text-body-lg text-on-surface-variant">{eventData.location}</p>
          </div>
        </div>

        <motion.a
          href={eventData.locationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-container to-surface-container-low border border-secondary-container/50 text-on-primary-container font-body text-label-sm uppercase tracking-wider py-3 px-8 rounded-full hover:shadow-md hover:shadow-primary-container/40 transition-all"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span>Ver ubicación</span>
          <span className="material-symbols-outlined text-sm" aria-hidden="true">open_in_new</span>
        </motion.a>
      </motion.div>
    </section>
  )
}
