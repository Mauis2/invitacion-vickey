'use client'

import { useEffect, useState, useCallback } from 'react'
import { getRsvps, deleteRsvp } from '@/lib/appwrite'
import type { RsvpEntry } from '@/lib/appwrite'

export default function RsvpPanel() {
  const [rsvps, setRsvps] = useState<RsvpEntry[]>([])
  const [loading, setLoading] = useState(true)

  const loadRsvps = useCallback(async () => {
    try {
      const data = await getRsvps()
      setRsvps(data)
    } catch (err) {
      console.error('Error loading RSVPs:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadRsvps()
  }, [loadRsvps])

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta confirmación?')) return
    try {
      await deleteRsvp(id)
      setRsvps((prev) => prev.filter((r) => r.$id !== id))
    } catch (err) {
      console.error('Error deleting RSVP:', err)
    }
  }

  const totalGuests = rsvps.reduce((sum, r) => sum + r.guests, 0)

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="font-body text-body-md text-on-surface-variant">Cargando asistentes...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Summary */}
      <div className="flex gap-4 mb-6">
        <div className="bg-primary-container/20 px-4 py-2 rounded-xl">
          <span className="font-body text-label-sm text-on-surface-variant">Confirmaciones</span>
          <p className="font-display text-headline-md text-on-surface">{rsvps.length}</p>
        </div>
        <div className="bg-primary-container/20 px-4 py-2 rounded-xl">
          <span className="font-body text-label-sm text-on-surface-variant">Total asistentes</span>
          <p className="font-display text-headline-md text-primary">{totalGuests}</p>
        </div>
      </div>

      {/* List */}
      {rsvps.length === 0 ? (
        <p className="font-body text-body-md text-on-surface-variant text-center py-8">
          No hay confirmaciones todavía.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="text-left font-body text-label-sm text-on-surface-variant py-3 px-4">
                  Nombre
                </th>
                <th className="text-center font-body text-label-sm text-on-surface-variant py-3 px-4">
                  Asistentes
                </th>
                <th className="text-right font-body text-label-sm text-on-surface-variant py-3 px-4">
                  Fecha
                </th>
                <th className="text-right font-body text-label-sm text-on-surface-variant py-3 px-4">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {rsvps.map((rsvp) => (
                <tr
                  key={rsvp.$id}
                  className="border-b border-outline-variant/30 hover:bg-surface-container-low transition-colors"
                >
                  <td className="font-body text-body-md text-on-surface py-3 px-4">
                    {rsvp.name}
                  </td>
                  <td className="font-body text-body-md text-on-surface text-center py-3 px-4">
                    {rsvp.guests}
                  </td>
                  <td className="font-body text-label-sm text-on-surface-variant text-right py-3 px-4">
                    {rsvp.$createdAt
                      ? new Date(rsvp.$createdAt).toLocaleDateString('es-MX', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : '—'}
                  </td>
                  <td className="text-right py-3 px-4">
                    <button
                      onClick={() => handleDelete(rsvp.$id!)}
                      className="p-2 rounded-full hover:bg-error-container transition-colors"
                      title="Eliminar"
                    >
                      <span className="material-symbols-outlined text-xl text-on-surface-variant">
                        delete
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
