'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'
import { getVisibleWishes, submitWish } from '@/lib/appwrite'
import type { WishEntry } from '@/lib/appwrite'
import ShootingStar from '@/components/decorations/ShootingStar'

export default function WishesSection() {
  const [wishes, setWishes] = useState<WishEntry[]>([])
  const [currentWish, setCurrentWish] = useState<WishEntry | null>(null)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const loadWishes = useCallback(async () => {
    try {
      const data = await getVisibleWishes()
      setWishes(data)
    } catch {
      // silently fail — wishes are optional
    }
  }, [])

  useEffect(() => {
    loadWishes()
  }, [loadWishes])

  // Rotate through wishes — show all before repeating (shuffle deck)
  useEffect(() => {
    if (wishes.length === 0) return
    let timeout: NodeJS.Timeout
    let queue: WishEntry[] = []

    const shuffle = (arr: WishEntry[]) => {
      const shuffled = [...arr]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
    }

    const showNext = () => {
      if (queue.length === 0) {
        queue = shuffle(wishes)
      }
      const next = queue.shift()!
      setCurrentWish(next)
      // Base 5s + 30ms per character, capped at 15s
      const duration = Math.min(5000 + next.message.length * 30, 15000)
      timeout = setTimeout(showNext, duration)
    }

    showNext()
    return () => clearTimeout(timeout)
  }, [wishes])

  const handleSubmitWish = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    setSending(true)
    try {
      await submitWish({ name: name.trim(), message: message.trim() })
      setSent(true)
      setName('')
      setMessage('')
      await loadWishes()
      setTimeout(() => setSent(false), 3000)
    } catch {
      // handle silently
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="px-margin-mobile md:px-margin-desktop py-16 relative">
      <div className="max-w-3xl mx-auto text-center z-10 relative">
        <motion.h3
          className="font-display text-headline-lg text-primary mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Un deseo para nuestra bebé
        </motion.h3>

        {/* Wish Display — cielo nocturno con estrellas fugaces */}
        <div className="relative min-h-[14rem] md:min-h-[16rem] rounded-3xl overflow-hidden mb-12 border border-outline-variant/20"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(248, 200, 220, 0.15) 0%, rgba(251, 249, 245, 0.05) 60%, transparent 100%), linear-gradient(to bottom, rgba(30, 31, 28, 0.03), rgba(121, 84, 101, 0.05))'
          }}
        >
          {/* Estrellas fugaces del fondo */}
          <ShootingStar className="top-[10%] left-[10%]" delay={0} duration={2} />
          <ShootingStar className="top-[5%] left-[30%]" delay={3.5} duration={1.8} />
          <ShootingStar className="top-[15%] left-[50%]" delay={7} duration={2.2} />
          <ShootingStar className="top-[8%] left-[5%]" delay={10} duration={1.5} />

          {/* Estrellas estáticas parpadeantes */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-secondary-container"
              style={{
                top: `${15 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`
              }}
              animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
            />
          ))}

          {/* Deseo actual */}
          <div className="absolute inset-0 flex items-center justify-center px-6 py-8 overflow-y-auto">
            <AnimatePresence mode="wait">
              {currentWish ? (
                <motion.div
                  key={currentWish.$id}
                  className="text-center max-w-lg"
                  initial={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(6px)', y: -10 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  {/* Glow detrás del texto */}
                  <motion.div
                    className="absolute inset-0 -z-10 rounded-full opacity-30"
                    style={{
                      background: 'radial-gradient(circle, rgba(254, 214, 91, 0.4), transparent 70%)'
                    }}
                    animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.span
                    className="text-2xl block mb-3"
                    initial={{ rotate: -20, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  >
                    ⭐
                  </motion.span>
                  <p className={`font-body text-on-surface italic leading-relaxed ${
                    currentWish.message.length > 200 ? 'text-body-md' : 'text-body-lg'
                  }`}>
                    &ldquo;{currentWish.message}&rdquo;
                  </p>
                  <motion.p
                    className="font-body text-label-sm text-primary mt-3 tracking-wide"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    — {currentWish.name}
                  </motion.p>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.span
                    className="text-3xl block mb-3"
                    animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    🌠
                  </motion.span>
                  <p className="font-body text-body-lg text-on-surface-variant italic">
                    Deja tu mensaje de amor en las estrellas...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Wish Form */}
        <motion.form
          onSubmit={handleSubmitWish}
          className="bg-surface-container-low p-6 rounded-2xl border border-surface-container-high shadow-sm max-w-xl mx-auto text-left mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4 className="font-display text-headline-md text-on-surface mb-4 text-center">
            Escribe tu deseo ⭐
          </h4>
          <div className="space-y-4">
            <div>
              <label htmlFor="wish-name" className="font-body text-label-sm text-on-surface-variant block mb-2">
                Tu nombre
              </label>
              <input
                id="wish-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary text-on-surface font-body text-body-md placeholder:italic placeholder:text-outline"
                placeholder="Tu nombre"
                required
              />
            </div>
            <div>
              <label htmlFor="wish-message" className="font-body text-label-sm text-on-surface-variant block mb-2">
                Tu deseo para Vickey Eileen
              </label>
              <textarea
                id="wish-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary text-on-surface font-body text-body-md placeholder:italic placeholder:text-outline resize-none"
                placeholder="Escribe un hermoso deseo..."
                required
              />
            </div>
            <motion.button
              type="submit"
              disabled={sending}
              className="w-full bg-gradient-to-r from-primary-container to-primary-fixed py-3 rounded-full font-body text-label-sm text-on-primary-container uppercase tracking-wider hover:shadow-md transition-shadow disabled:opacity-50"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              {sent ? '✨ ¡Deseo enviado!' : sending ? 'Enviando...' : 'Enviar Deseo ⭐'}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
