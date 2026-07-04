'use client'

import { useEffect, useState, useCallback } from 'react'
import { getWishes, updateWish, deleteWish } from '@/lib/appwrite'
import type { WishEntry } from '@/lib/appwrite'

export default function WishesPanel() {
  const [wishes, setWishes] = useState<WishEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editMessage, setEditMessage] = useState('')

  const loadWishes = useCallback(async () => {
    try {
      const data = await getWishes()
      setWishes(data)
    } catch (err) {
      console.error('Error loading wishes:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadWishes()
  }, [loadWishes])

  const handleToggleVisibility = async (wish: WishEntry) => {
    if (!wish.$id) return
    try {
      await updateWish(wish.$id, { visible: !wish.visible })
      setWishes((prev) =>
        prev.map((w) => (w.$id === wish.$id ? { ...w, visible: !w.visible } : w))
      )
    } catch (err) {
      console.error('Error toggling visibility:', err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este mensaje permanentemente?')) return
    try {
      await deleteWish(id)
      setWishes((prev) => prev.filter((w) => w.$id !== id))
    } catch (err) {
      console.error('Error deleting wish:', err)
    }
  }

  const handleStartEdit = (wish: WishEntry) => {
    setEditingId(wish.$id || null)
    setEditName(wish.name)
    setEditMessage(wish.message)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditName('')
    setEditMessage('')
  }

  const handleSaveEdit = async () => {
    if (!editingId || !editName.trim() || !editMessage.trim()) return
    try {
      await updateWish(editingId, { name: editName.trim(), message: editMessage.trim() })
      setWishes((prev) =>
        prev.map((w) =>
          w.$id === editingId ? { ...w, name: editName.trim(), message: editMessage.trim() } : w
        )
      )
      handleCancelEdit()
    } catch (err) {
      console.error('Error updating wish:', err)
    }
  }

  const visibleCount = wishes.filter((w) => w.visible !== false).length
  const hiddenCount = wishes.filter((w) => w.visible === false).length

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="font-body text-body-md text-on-surface-variant">Cargando mensajes...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Summary */}
      <div className="flex gap-4 mb-6">
        <div className="bg-primary-container/20 px-4 py-2 rounded-xl">
          <span className="font-body text-label-sm text-on-surface-variant">Total</span>
          <p className="font-display text-headline-md text-on-surface">{wishes.length}</p>
        </div>
        <div className="bg-primary-container/20 px-4 py-2 rounded-xl">
          <span className="font-body text-label-sm text-on-surface-variant">Visibles</span>
          <p className="font-display text-headline-md text-primary">{visibleCount}</p>
        </div>
        <div className="bg-surface-container px-4 py-2 rounded-xl">
          <span className="font-body text-label-sm text-on-surface-variant">Ocultos</span>
          <p className="font-display text-headline-md text-on-surface-variant">{hiddenCount}</p>
        </div>
      </div>

      {/* List */}
      {wishes.length === 0 ? (
        <p className="font-body text-body-md text-on-surface-variant text-center py-8">
          No hay mensajes todavía.
        </p>
      ) : (
        <div className="space-y-3">
          {wishes.map((wish) => (
            <div
              key={wish.$id}
              className={`p-4 rounded-2xl border transition-colors ${
                wish.visible === false
                  ? 'bg-surface-container/50 border-outline-variant/30 opacity-60'
                  : 'bg-surface-container-low border-outline-variant/40'
              }`}
            >
              {editingId === wish.$id ? (
                /* Edit mode */
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary text-on-surface font-body text-body-md"
                    placeholder="Nombre"
                  />
                  <textarea
                    value={editMessage}
                    onChange={(e) => setEditMessage(e.target.value)}
                    rows={3}
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary text-on-surface font-body text-body-md resize-none"
                    placeholder="Mensaje"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="px-4 py-2 bg-primary text-on-primary rounded-full font-body text-label-sm"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-surface-container text-on-surface-variant rounded-full font-body text-label-sm"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                /* View mode */
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-body-md text-on-surface mb-1">
                      &ldquo;{wish.message}&rdquo;
                    </p>
                    <p className="font-body text-label-sm text-on-surface-variant">
                      — {wish.name}
                      {wish.$createdAt && (
                        <span className="ml-2 text-outline">
                          {new Date(wish.$createdAt).toLocaleDateString('es-MX', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => handleToggleVisibility(wish)}
                      className="p-2 rounded-full hover:bg-surface-container transition-colors"
                      title={wish.visible === false ? 'Mostrar' : 'Ocultar'}
                    >
                      <span className="material-symbols-outlined text-xl text-on-surface-variant">
                        {wish.visible === false ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                    <button
                      onClick={() => handleStartEdit(wish)}
                      className="p-2 rounded-full hover:bg-surface-container transition-colors"
                      title="Editar"
                    >
                      <span className="material-symbols-outlined text-xl text-on-surface-variant">
                        edit
                      </span>
                    </button>
                    <button
                      onClick={() => handleDelete(wish.$id!)}
                      className="p-2 rounded-full hover:bg-error-container transition-colors"
                      title="Eliminar"
                    >
                      <span className="material-symbols-outlined text-xl text-on-surface-variant">
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
