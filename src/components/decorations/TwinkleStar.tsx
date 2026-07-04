'use client'

import { motion } from 'framer-motion'

interface TwinkleStarProps {
  className?: string
  size?: string
  delay?: number
  color?: string
}

export default function TwinkleStar({
  className = '',
  size = 'text-4xl',
  delay = 0,
  color = 'text-secondary-container'
}: TwinkleStarProps) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{
        opacity: [0.4, 1, 0.4],
        scale: [0.9, 1.1, 0.9]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
        delay
      }}
    >
      <span className={`material-symbols-outlined fill-icon ${color} ${size}`} aria-hidden="true">
        star
      </span>
    </motion.div>
  )
}
