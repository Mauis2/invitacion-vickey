'use client'

import { motion } from 'framer-motion'
import itineraryData from '@/data/itinerary.json'

export default function ItinerarySection() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop py-16">
      <motion.h3
        className="font-display text-headline-md text-primary text-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Itinerario Estelar
      </motion.h3>

      <div className="max-w-2xl mx-auto relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-primary-container before:to-outline-variant">
        {itineraryData.map((item, i) => (
          <motion.div
            key={i}
            className={`relative flex items-center justify-between md:justify-normal ${
              i % 2 === 0 ? 'md:flex-row-reverse' : ''
            } group mb-8`}
            initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                i === 0 ? 'border-primary bg-primary-container' : 'border-primary-container bg-surface'
              } shrink-0 md:order-1 ${
                i % 2 === 0 ? 'md:-translate-x-1/2' : 'md:translate-x-1/2'
              } shadow-sm z-10 ml-0 md:ml-auto md:mr-auto`}
            >
              <span
                className={`material-symbols-outlined text-sm ${
                  i === 0 ? 'fill-icon text-primary' : 'text-primary'
                }`}
                aria-hidden="true"
              >
                {item.icon}
              </span>
            </div>

            <div
              className={`w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl ${
                i === 0
                  ? 'bg-primary-container/40 border border-primary-container shadow-sm'
                  : 'bg-surface-container-low border border-outline-variant/60'
              } text-left ${i % 2 === 0 ? 'md:text-right' : ''}`}
            >
              <span className="font-body text-label-sm text-primary font-bold block mb-1">{item.time}</span>
              <h4 className="font-body text-body-md font-semibold text-on-surface">{item.title}</h4>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
