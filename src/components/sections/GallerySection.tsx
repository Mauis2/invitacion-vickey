'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'
import { getVisibleGalleryEntries, getGalleryPreviewUrl } from '@/lib/appwrite'
import type { GalleryEntry } from '@/lib/appwrite'
import galleryData from '@/data/gallery.json'

interface GalleryImage {
  src: string
  alt: string
}

export default function GallerySection() {
  const [images, setImages] = useState<GalleryImage[]>(galleryData)

  const loadFromAppwrite = useCallback(async () => {
    try {
      const entries = await getVisibleGalleryEntries()
      if (entries.length > 0) {
        setImages(
          entries.map((e: GalleryEntry) => ({
            src: getGalleryPreviewUrl(e.fileId, 600, 600),
            alt: e.alt
          }))
        )
      }
    } catch {
      // fall back to static gallery.json
    }
  }, [])

  useEffect(() => {
    loadFromAppwrite()
  }, [loadFromAppwrite])

  return (
    <section id="gallery" className="px-margin-mobile md:px-margin-desktop py-16">
      <motion.h3
        className="font-display text-headline-md text-primary text-center mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Momentos Mágicos
      </motion.h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 max-w-5xl mx-auto">
        {images.map((item, i) => (
          <motion.div
            key={i}
            className={`aspect-square rounded-2xl overflow-hidden shadow-md shadow-primary-container/30 border border-primary-container/40 p-1.5 md:p-2 bg-primary-container/15 ${
              i === 1 ? 'md:-translate-y-4' : ''
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: i === 1 ? -16 : 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
                unoptimized
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
