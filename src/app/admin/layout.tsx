import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — Baby Shower de Vickey Eileen',
  robots: 'noindex, nofollow'
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      {children}
    </div>
  )
}
