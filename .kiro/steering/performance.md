# Steering: Performance

## Objetivo

Optimizar el sitio para cargar rápido en mobile, ya que la mayoría de invitados accederá desde el celular vía WhatsApp.

---

## Métricas objetivo

```txt
Lighthouse Performance Mobile: mínimo 85
Lighthouse Accessibility: mínimo 90
Lighthouse Best Practices: mínimo 90
```

---

## Regla principal

No sacrificar performance por efectos visuales excesivos.

Las animaciones deben ser ligeras y con CSS cuando sea posible.

---

## Imágenes

Reglas obligatorias:

* Usar `.webp` o `.avif`
* Usar `next/image` con `unoptimized: true` (static export)
* Definir `width` y `height`
* Hero/primera imagen con `priority`
* Imágenes de galería con lazy loading
* Nombres descriptivos
* Comprimir imágenes antes de incluirlas

---

## Fuentes

Usar `next/font` obligatoriamente:

```tsx
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display'
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body'
})
```

No usar `@import url(...)` ni `<link>` a Google Fonts.

---

## JavaScript

* No convertir toda la app en client component
* Usar `'use client'` solo donde sea necesario (countdown, formulario, reproductor de música)
* Evitar librerías pesadas
* Las animaciones CSS son preferibles a JS cuando sea viable

---

## Animaciones

Permitido:

* Float con CSS keyframes
* Twinkle con opacity + scale
* Scroll reveal con IntersectionObserver o Framer Motion
* Hover scale en galería
* Shooting star con CSS

Evitar:

* Animaciones continuas pesadas en múltiples elementos simultáneos
* Parallax complejo
* Canvas o WebGL innecesarios

Respetar `prefers-reduced-motion`:

```scss
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Layout Shift

Evitar CLS:

* Definir dimensiones de imágenes
* Reservar espacio para el countdown
* No cambiar layout al cargar fuentes

---

## Checklist de performance

* El sitio exporta correctamente
* Las imágenes están comprimidas en .webp
* No hay imágenes pesadas sin optimizar
* Las fuentes se cargan con next/font
* Las animaciones son CSS-first
* No hay layout shift visible
* Lighthouse mobile performance mínimo 85
