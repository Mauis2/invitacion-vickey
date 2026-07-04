'use client'

import { motion } from 'framer-motion'

interface ShootingStarProps {
  className?: string
  delay?: number
  duration?: number
  size?: number
}

export default function ShootingStar({
  className = '',
  delay = 0,
  duration = 2,
  size = 5
}: ShootingStarProps) {
  const distance = 250

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{
        x: [0, distance * 0.5, distance],
        y: [0, distance * 0.35, distance * 0.7],
        opacity: [0, 1, 0]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: [0.25, 0.1, 0.25, 1],
        delay,
        repeatDelay: Math.random() * 4 + 2
      }}
      aria-hidden="true"
    >
      <div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          background: 'radial-gradient(circle, rgba(255, 255, 255, 1), rgba(254, 214, 91, 0.8))',
          boxShadow: '0 0 8px 3px rgba(254, 214, 91, 0.6), 0 0 4px 1px rgba(255, 255, 255, 0.8)'
        }}
      />
    </motion.div>
  )
}
