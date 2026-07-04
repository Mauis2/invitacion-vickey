'use client'

import { motion } from 'framer-motion'

interface FloatingCloudProps {
  className?: string
  size?: string
  delay?: number
}

export default function FloatingCloud({ className = '', size = 'text-6xl', delay = 0 }: FloatingCloudProps) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{
        y: [0, -10, 0],
        x: [0, 5, 0]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
        delay
      }}
    >
      <span className={`material-symbols-outlined fill-icon text-primary-fixed-dim opacity-50 ${size}`} aria-hidden="true">
        cloud
      </span>
    </motion.div>
  )
}
