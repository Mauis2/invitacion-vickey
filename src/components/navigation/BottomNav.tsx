'use client'

import { motion } from 'framer-motion'

const links = [
  { href: '#home', icon: 'star', label: 'Inicio', active: true },
  { href: '#story', icon: 'auto_awesome', label: 'Historia', active: false },
  { href: '#gallery', icon: 'photo_library', label: 'Galería', active: false },
  { href: '#rsvp', icon: 'favorite', label: 'Asistencia', active: false }
]

export default function BottomNav() {
  return (
    <motion.nav
      className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 pb-safe bg-surface-container-low/80 backdrop-blur-md shadow-md border-t border-outline-variant/30 rounded-t-xl md:hidden"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      aria-label="Navegación principal mobile"
    >
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={`flex flex-col items-center justify-center ${
            link.active
              ? 'bg-primary-container text-on-primary-container rounded-full px-4 py-1 scale-90'
              : 'text-on-surface-variant hover:text-primary'
          } transition-all`}
        >
          <span
            className="material-symbols-outlined"
            style={link.active ? { fontVariationSettings: "'FILL' 1" } : undefined}
            aria-hidden="true"
          >
            {link.icon}
          </span>
          <span className="font-body text-label-sm mt-1">{link.label}</span>
        </a>
      ))}
    </motion.nav>
  )
}
