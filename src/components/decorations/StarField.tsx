'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface StarFieldProps {
  count?: number
  className?: string
}

export default function StarField({ count = 12, className = '' }: StarFieldProps) {
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 6 + 3,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2
    }))
  }, [count])

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-secondary-container"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: star.delay
          }}
        />
      ))}
    </div>
  )
}
