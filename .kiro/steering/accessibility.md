# Steering: Accesibilidad (a11y)

## Objetivo

El sitio debe ser accesible para todos los invitados, incluyendo aquellos con discapacidades visuales o motoras.

Cumplir WCAG 2.1 nivel AA como mínimo.

---

## Métrica objetivo

```txt
Lighthouse Accessibility: mínimo 90
```

---

## HTML semántico

Usar etiquetas correctas:

```tsx
<header>   // navegación superior
<main>     // contenido principal
<section>  // cada sección de la invitación
<footer>   // pie decorativo
<nav>      // navegación bottom/top
```

---

## Navegación por teclado

* Todos los botones y links accesibles con Tab
* Focus visible en elementos interactivos
* Bottom nav accesible con teclado

---

## Focus visible

```scss
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

---

## Imágenes

* Imágenes de galería: `alt` descriptivo
* Iconos decorativos (nubes, estrellas): `aria-hidden="true"`
* Emojis en footer: decorativos, no informativos

---

## Formulario RSVP

* Cada input debe tener un `<label>` asociado
* Campos requeridos marcados con `required` o `aria-required`
* Botón de submit con texto descriptivo
* Validación con mensajes claros

---

## Contraste

* Texto normal: ratio mínimo 4.5:1
* Texto grande (Playfair Display headers): ratio mínimo 3:1
* Los colores de la paleta deben validar contraste suficiente

---

## Reducción de movimiento

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

En Framer Motion (si se usa):

```tsx
import { useReducedMotion } from 'framer-motion'
const shouldReduce = useReducedMotion()
```

---

## Idioma

```tsx
<html lang="es">
```

---

## Reproductor de música

* Debe poder pausarse/detenerse
* No reproducir automáticamente sin interacción del usuario
* Botón con `aria-label` descriptivo ("Reproducir melodía de cuna" / "Pausar música")

---

## Checklist de accesibilidad

* Lighthouse Accessibility mínimo 90
* Todos los inputs tienen label
* Imágenes informativas tienen alt descriptivo
* Iconos decorativos ocultos a screen readers
* Contraste cumple 4.5:1 para texto normal
* Focus visible en interactivos
* `prefers-reduced-motion` respetado
* `lang="es"` en el HTML
* Música no se auto-reproduce sin interacción
* Navegación funciona con teclado
