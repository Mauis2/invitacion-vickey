'use client'

import { useState } from 'react'
import WishesPanel from '@/components/admin/WishesPanel'
import RsvpPanel from '@/components/admin/RsvpPanel'
import GalleryPanel from '@/components/admin/GalleryPanel'

type Tab = 'wishes' | 'rsvp' | 'gallery'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || ''

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('wishes')
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/40 shadow-sm max-w-sm w-full"
        >
          <h1 className="font-display text-headline-md text-on-surface text-center mb-2">
            🌙 Admin
          </h1>
          <p className="font-body text-body-md text-on-surface-variant text-center mb-6">
            Ingresa la contraseña para continuar
          </p>
          <div className="mb-4">
            <label htmlFor="admin-password" className="font-body text-label-sm text-on-surface-variant block mb-2">
              Contraseña
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false) }}
              className={`w-full bg-transparent border-0 border-b focus:ring-0 text-on-surface font-body text-body-md ${
                error ? 'border-red-400 focus:border-red-500' : 'border-outline-variant focus:border-primary'
              }`}
              placeholder="••••••••"
              autoFocus
            />
            {error && (
              <p className="font-body text-label-sm text-red-500 mt-2">
                Contraseña incorrecta
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-on-primary py-3 rounded-full font-body text-label-sm uppercase tracking-wider hover:shadow-md transition-shadow"
          >
            Entrar
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="font-display text-headline-lg text-on-surface">
          Panel de Administración
        </h1>
        <p className="font-body text-body-md text-on-surface-variant mt-1">
          Baby Shower de Vickey Eileen 🌙
        </p>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-outline-variant overflow-x-auto">
        <button
          onClick={() => setTab('wishes')}
          className={`px-4 py-3 font-body text-body-md transition-colors rounded-t-lg whitespace-nowrap ${
            tab === 'wishes'
              ? 'text-primary border-b-2 border-primary bg-primary-container/20'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          💌 Mensajes
        </button>
        <button
          onClick={() => setTab('rsvp')}
          className={`px-4 py-3 font-body text-body-md transition-colors rounded-t-lg whitespace-nowrap ${
            tab === 'rsvp'
              ? 'text-primary border-b-2 border-primary bg-primary-container/20'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          👥 Asistentes
        </button>
        <button
          onClick={() => setTab('gallery')}
          className={`px-4 py-3 font-body text-body-md transition-colors rounded-t-lg whitespace-nowrap ${
            tab === 'gallery'
              ? 'text-primary border-b-2 border-primary bg-primary-container/20'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          🖼️ Galería
        </button>
      </div>

      {/* Content */}
      {tab === 'wishes' && <WishesPanel />}
      {tab === 'rsvp' && <RsvpPanel />}
      {tab === 'gallery' && <GalleryPanel />}
    </div>
  )
}
