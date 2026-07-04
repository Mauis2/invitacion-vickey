'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'
import ShootingStar from './ShootingStar'

/**
 * Decoraciones globales que flotan por toda la página:
 * - Nubes suaves en posiciones aleatorias
 * - Estrellas parpadeantes
 * - Estrellas fugaces ocasionales
 */
export default function GlobalDecorations() {
  const clouds = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: `cloud-${i}`,
        top: `${10 + Math.random() * 80}%`,
        left: i < 3 ? `${Math.random() * 15}%` : `${85 + Math.random() * 12}%`,
        size: Math.random() * 20 + 40,
        opacity: Math.random() * 0.2 + 0.1,
        duration: Math.random() * 4 + 6,
        delay: Math.random() * 3
      })),
    []
  )

  const stars = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: `star-${i}`,
        top: `${Math.random() * 95}%`,
        left: `${Math.random() * 95}%`,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5
      })),
    []
  )

  const shootingStars = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: `shooting-${i}`,
        top: 5 + Math.random() * 25,
        left: 5 + Math.random() * 40,
        delay: i * 5 + Math.random() * 3,
        duration: Math.random() * 1 + 1.5
      })),
    []
  )

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Nubes flotantes */}
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute"
          style={{
            top: cloud.top,
            left: cloud.left,
            opacity: cloud.opacity
          }}
          animate={{
            y: [0, -12, 0],
            x: [0, 6, 0]
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: cloud.delay
          }}
        >
          <span
            className="material-symbols-outlined fill-icon text-primary-fixed-dim"
            style={{ fontSize: cloud.size }}
          >
            cloud
          </span>
        </motion.div>
      ))}

      {/* Estrellas parpadeantes */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-secondary-container/70"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size
          }}
          animate={{
            opacity: [0.1, 0.7, 0.1],
            scale: [0.8, 1.3, 0.8]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: star.delay
          }}
        />
      ))}

      {/* Estrellas fugaces */}
      {shootingStars.map((s) => (
        <div key={s.id} className="absolute" style={{ top: `${s.top}%`, left: `${s.left}%` }}>
          <ShootingStar
            delay={s.delay}
            duration={s.duration}
          />
        </div>
      ))}
    </div>
  )
}
