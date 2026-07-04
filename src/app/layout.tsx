import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair'
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta'
})

export const metadata: Metadata = {
  title: 'Baby Shower de Vickey Eileen 🌙',
  description:
    'Estás invitado/a al Baby Shower de Vickey Eileen. 5 de Julio, 2026. ¡Te esperamos!',
  openGraph: {
    title: 'Baby Shower de Vickey Eileen 🌙',
    description: 'Estás invitado/a al Baby Shower de Vickey Eileen. 5 de Julio, 2026.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Baby Shower de Vickey Eileen — Moon & Stars'
      }
    ],
    locale: 'es_MX',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baby Shower de Vickey Eileen 🌙',
    description: 'Estás invitado/a al Baby Shower de Vickey Eileen. 5 de Julio, 2026.',
    images: ['/images/og-image.jpg']
  }
}

export const viewport: Viewport = {
  themeColor: '#795465'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${jakarta.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen relative overflow-x-hidden">{children}</body>
    </html>
  )
}
