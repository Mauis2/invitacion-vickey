'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Image from 'next/image'
import {
  getGalleryEntries,
  uploadGalleryImage,
  createGalleryEntry,
  updateGalleryEntry,
  deleteGalleryEntry,
  getGalleryPreviewUrl
} from '@/lib/appwrite'
import type { GalleryEntry } from '@/lib/appwrite'

export default function GalleryPanel() {
  const [entries, setEntries] = useState<GalleryEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [newAlt, setNewAlt] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadEntries = useCallback(async () => {
    try {
      const data = await getGalleryEntries()
      setEntries(data)
    } catch (err) {
      console.error('Error loading gallery:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadEntries()
  }, [loadEntries])

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0]
    if (!file || !newAlt.trim()) return

    setUploading(true)
    try {
      const fileId = await uploadGalleryImage(file)
      const maxOrder = entries.reduce((max, e) => Math.max(max, e.order ?? 0), 0)
      await createGalleryEntry({ fileId, alt: newAlt.trim(), order: maxOrder + 1 })
      setNewAlt('')
      if (fileInputRef.current) fileInputRef.current.value = ''
      await loadEntries()
    } catch (err) {
      console.error('Error uploading image:', err)
    } finally {
      setUploading(false)
    }
  }

  const handleToggleVisibility = async (entry: GalleryEntry) => {
    if (!entry.$id) return
    try {
      await updateGalleryEntry(entry.$id, { visible: !entry.visible })
      setEntries((prev) =>
        prev.map((e) => (e.$id === entry.$id ? { ...e, visible: !e.visible } : e))
      )
    } catch (err) {
      console.error('Error toggling visibility:', err)
    }
  }

  const handleUpdateAlt = async (entry: GalleryEntry, alt: string) => {
    if (!entry.$id || !alt.trim()) return
    try {
      await updateGalleryEntry(entry.$id, { alt: alt.trim() })
      setEntries((prev) =>
        prev.map((e) => (e.$id === entry.$id ? { ...e, alt: alt.trim() } : e))
      )
    } catch (err) {
      console.error('Error updating alt:', err)
    }
  }

  const handleDelete = async (entry: GalleryEntry) => {
    if (!entry.$id) return
    if (!confirm('¿Eliminar esta imagen permanentemente?')) return
    try {
      await deleteGalleryEntry(entry.$id, entry.fileId)
      setEntries((prev) => prev.filter((e) => e.$id !== entry.$id))
    } catch (err) {
      console.error('Error deleting image:', err)
    }
  }

  const handleMoveUp = async (entry: GalleryEntry, index: number) => {
    if (index === 0 || !entry.$id) return
    const prev = entries[index - 1]
    if (!prev.$id) return
    try {
      await updateGalleryEntry(entry.$id, { order: prev.order ?? index - 1 })
      await updateGalleryEntry(prev.$id, { order: entry.order ?? index })
      await loadEntries()
    } catch (err) {
      console.error('Error reordering:', err)
    }
  }

  const handleMoveDown = async (entry: GalleryEntry, index: number) => {
    if (index === entries.length - 1 || !entry.$id) return
    const next = entries[index + 1]
    if (!next.$id) return
    try {
      await updateGalleryEntry(entry.$id, { order: next.order ?? index + 1 })
      await updateGalleryEntry(next.$id, { order: entry.order ?? index })
      await loadEntries()
    } catch (err) {
      console.error('Error reordering:', err)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="font-body text-body-md text-on-surface-variant">Cargando galería...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Upload form */}
      <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/40 mb-8">
        <h4 className="font-display text-headline-md text-on-surface mb-4">Subir imagen</h4>
        <div className="space-y-4">
          <div>
            <label htmlFor="gallery-file" className="font-body text-label-sm text-on-surface-variant block mb-2">
              Imagen (jpg, png, webp, avif)
            </label>
            <input
              id="gallery-file"
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="w-full font-body text-body-md text-on-surface file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-label-sm file:bg-primary-container file:text-on-primary-container hover:file:bg-primary-container/80"
            />
          </div>
          <div>
            <label htmlFor="gallery-alt" className="font-body text-label-sm text-on-surface-variant block mb-2">
              Descripción (alt text)
            </label>
            <input
              id="gallery-alt"
              type="text"
              value={newAlt}
              onChange={(e) => setNewAlt(e.target.value)}
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary text-on-surface font-body text-body-md placeholder:italic placeholder:text-outline"
              placeholder="Describe la imagen..."
            />
          </div>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="px-6 py-2 bg-primary text-on-primary rounded-full font-body text-label-sm disabled:opacity-50"
          >
            {uploading ? 'Subiendo...' : 'Subir imagen'}
          </button>
        </div>
      </div>

      {/* Gallery grid */}
      {entries.length === 0 ? (
        <p className="font-body text-body-md text-on-surface-variant text-center py-8">
          No hay imágenes en la galería.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {entries.map((entry, index) => (
            <GalleryCard
              key={entry.$id}
              entry={entry}
              index={index}
              total={entries.length}
              onToggleVisibility={() => handleToggleVisibility(entry)}
              onUpdateAlt={(alt) => handleUpdateAlt(entry, alt)}
              onDelete={() => handleDelete(entry)}
              onMoveUp={() => handleMoveUp(entry, index)}
              onMoveDown={() => handleMoveDown(entry, index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface GalleryCardProps {
  entry: GalleryEntry
  index: number
  total: number
  onToggleVisibility: () => void
  onUpdateAlt: (alt: string) => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}

function GalleryCard({
  entry,
  index,
  total,
  onToggleVisibility,
  onUpdateAlt,
  onDelete,
  onMoveUp,
  onMoveDown
}: GalleryCardProps) {
  const [editingAlt, setEditingAlt] = useState(false)
  const [altText, setAltText] = useState(entry.alt)

  const handleSaveAlt = () => {
    if (altText.trim() && altText !== entry.alt) {
      onUpdateAlt(altText)
    }
    setEditingAlt(false)
  }

  return (
    <div
      className={`rounded-2xl border overflow-hidden transition-opacity ${
        entry.visible === false
          ? 'opacity-50 border-outline-variant/30'
          : 'border-outline-variant/40'
      }`}
    >
      <div className="relative aspect-square bg-surface-container">
        <Image
          src={getGalleryPreviewUrl(entry.fileId, 400, 400)}
          alt={entry.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized
        />
      </div>
      <div className="p-3 bg-surface-container-low space-y-2">
        {editingAlt ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="flex-1 bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary text-on-surface font-body text-body-md text-sm"
              onKeyDown={(e) => e.key === 'Enter' && handleSaveAlt()}
            />
            <button onClick={handleSaveAlt} className="text-primary font-body text-label-sm">
              ✓
            </button>
          </div>
        ) : (
          <p
            className="font-body text-label-sm text-on-surface-variant truncate cursor-pointer hover:text-on-surface"
            onClick={() => setEditingAlt(true)}
            title="Click para editar"
          >
            {entry.alt}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <button
              onClick={onMoveUp}
              disabled={index === 0}
              className="p-1.5 rounded-full hover:bg-surface-container transition-colors disabled:opacity-30"
              title="Mover arriba"
            >
              <span className="material-symbols-outlined text-lg text-on-surface-variant">
                arrow_upward
              </span>
            </button>
            <button
              onClick={onMoveDown}
              disabled={index === total - 1}
              className="p-1.5 rounded-full hover:bg-surface-container transition-colors disabled:opacity-30"
              title="Mover abajo"
            >
              <span className="material-symbols-outlined text-lg text-on-surface-variant">
                arrow_downward
              </span>
            </button>
          </div>
          <div className="flex gap-1">
            <button
              onClick={onToggleVisibility}
              className="p-1.5 rounded-full hover:bg-surface-container transition-colors"
              title={entry.visible === false ? 'Mostrar' : 'Ocultar'}
            >
              <span className="material-symbols-outlined text-lg text-on-surface-variant">
                {entry.visible === false ? 'visibility_off' : 'visibility'}
              </span>
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 rounded-full hover:bg-error-container transition-colors"
              title="Eliminar"
            >
              <span className="material-symbols-outlined text-lg text-on-surface-variant">
                delete
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
