'use client'

import { motion } from 'framer-motion'

const links = [
  { href: '#home', label: 'Inicio' },
  { href: '#story', label: 'Historia' },
  { href: '#gallery', label: 'Galería' },
  { href: '#rsvp', label: 'Asistencia' }
]

export default function TopBar() {
  return (
    <motion.header
      className="hidden md:flex fixed top-0 left-0 w-full z-50 justify-between items-center px-margin-desktop py-4 bg-surface/70 backdrop-blur-sm"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      <div className="font-display text-headline-md text-primary tracking-tight">Vickey Eileen</div>
      <nav className="flex gap-6 items-center" aria-label="Navegación principal">
        {links.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            className={`font-body text-label-sm hover:text-primary transition-colors ${
              i === 0 ? 'text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="w-20" />
    </motion.header>
  )
}
