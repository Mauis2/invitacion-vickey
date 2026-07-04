'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { submitRsvp } from '@/lib/appwrite'

export default function RsvpSection() {
  const [name, setName] = useState('')
  const [guests, setGuests] = useState(1)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setSending(true)
    try {
      await submitRsvp({ name: name.trim(), guests })
      setSent(true)
      setName('')
      setGuests(1)
    } catch {
      // handle silently
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="rsvp" className="px-margin-mobile md:px-margin-desktop py-16">
      <motion.div
        className="bg-primary-container/20 p-8 rounded-3xl border border-primary-container/40 shadow-sm max-w-xl mx-auto text-left relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h4 className="font-display text-headline-md text-on-surface mb-6 text-center">
          Confirmar asistencia
        </h4>

        {sent ? (
          <motion.div
            className="text-center py-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="text-5xl mb-4 block">🌙</span>
            <p className="font-display text-headline-md text-primary mb-2">¡Confirmado!</p>
            <p className="font-body text-body-md text-on-surface-variant">
              Te esperamos con mucha ilusión ✨
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="rsvp-name" className="font-body text-label-sm text-on-surface-variant block mb-2">
                Nombre
              </label>
              <input
                id="rsvp-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary text-on-surface font-body text-body-md placeholder:italic placeholder:text-outline"
                placeholder="Tu nombre completo"
                required
              />
            </div>
            <div>
              <label htmlFor="rsvp-guests" className="font-body text-label-sm text-on-surface-variant block mb-2">
                Asistentes
              </label>
              <select
                id="rsvp-guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary text-on-surface font-body text-body-md"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <motion.button
              type="submit"
              disabled={sending}
              className="w-full bg-gradient-to-r from-primary-container to-primary-fixed py-3 rounded-full font-body text-label-sm text-on-primary-container uppercase tracking-wider hover:shadow-md transition-shadow mt-4 disabled:opacity-50"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              {sending ? 'Enviando...' : 'Enviar Confirmación'}
            </motion.button>
          </form>
        )}
      </motion.div>
    </section>
  )
}
