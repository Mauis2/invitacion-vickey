'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import eventData from '@/data/event.json'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
}

function calculateTimeLeft(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60)
  }
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(eventData.countdownTarget))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(eventData.countdownTarget))
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const items = [
    { value: timeLeft.days, label: 'Días' },
    { value: timeLeft.hours, label: 'Horas' },
    { value: timeLeft.minutes, label: 'Min' }
  ]

  return (
    <section className="px-margin-mobile md:px-margin-desktop py-12 flex justify-center">
      <motion.div
        className="bg-primary-container/50 border border-primary-container rounded-2xl p-8 flex flex-wrap justify-center gap-6 md:gap-12 shadow-md shadow-primary-container/20"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            className="flex flex-col items-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
          >
            <span className="font-display text-4xl text-primary mb-1">{item.value}</span>
            <span className="font-body text-label-sm text-on-surface-variant uppercase">
              {item.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
