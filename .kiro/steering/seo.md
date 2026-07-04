# Steering: SEO y Metadata para Invitación Digital

## Objetivo

Configurar metadata básica para que la invitación se vea bien al compartir por WhatsApp, redes sociales y mensajería.

Este NO es un sitio comercial que necesite posicionarse en buscadores. El SEO aquí se limita a:

* Open Graph (preview en WhatsApp/redes)
* Título y descripción correctos
* Imagen de preview atractiva

---

## Regla principal

Este proyecto usa Next.js con export estático.

Configurar `next.config.ts`:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  }
}

export default nextConfig
```

Es una sola página (single page). No se necesitan múltiples rutas, sitemap ni robots.txt.

---

## Metadata

La metadata debe configurarse en `layout.tsx` o `page.tsx`:

```ts
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Baby Shower de Vickey Eileen 🌙',
  description: 'Estás invitado/a al Baby Shower de Vickey Eileen. 5 de Julio, 2026. ¡Te esperamos!',
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
```

---

## Open Graph image

Debe existir una imagen atractiva para preview:

```txt
public/images/og-image.jpg (1200x630)
```

La imagen debe reflejar la temática del evento (luna, estrellas, rosa suave, nombre de la bebé).

---

## Lo que NO se necesita

* No se necesita sitemap.xml
* No se necesita robots.txt
* No se necesitan canonical URLs
* No se necesita Schema.org / JSON-LD
* No se necesitan múltiples rutas
* No se necesita indexación en buscadores
* No se necesita SEO local ni keywords

---

## Prioridad

Lo importante es que al compartir el link por WhatsApp o redes sociales:

* Se vea un título claro
* Se vea una descripción del evento
* Se muestre la imagen de preview
* Se vea bonito y profesional en el preview card
