'use client'

import { motion } from 'framer-motion'

const emojis = ['🌙', '☁️', '⭐', '🌸', '🌻', '🌸', '⭐', '☁️', '🌙']

export default function FooterSection() {
  return (
    <footer className="text-center py-10 pb-24 md:pb-10 border-t border-primary-container/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary-container/20 -z-10" />
      <div className="flex justify-center gap-4 text-2xl">
        {emojis.map((emoji, i) => (
          <motion.span
            key={i}
            animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i % 2 === 0 ? 0 : 2
            }}
            aria-hidden="true"
          >
            {emoji}
          </motion.span>
        ))}
      </div>
    </footer>
  )
}
