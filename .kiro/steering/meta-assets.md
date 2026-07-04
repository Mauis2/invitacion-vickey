# Steering: Favicon y Meta Assets

## Objetivo

Configurar correctamente los iconos y assets meta del sitio para que se muestre profesionalmente al compartir y en el navegador.

---

## Assets requeridos

Mínimo obligatorio:

```txt
src/app/
  favicon.ico          (32x32, formato ICO — puede ser una luna o estrella)
  icon.svg             (SVG escalable)
  apple-icon.png       (180x180, PNG)
```

---

## Configuración en Next.js App Router

Next.js App Router detecta automáticamente favicons en `src/app/`.

Alternativa con metadata en `layout.tsx`:

```ts
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: '/apple-icon.png'
  }
}
```

---

## Theme color

Definir el color de la barra del navegador en mobile:

```ts
export const metadata: Metadata = {
  themeColor: '#795465'
}
```

Usar el primary del diseño (Petal Pink).

---

## Open Graph image

Asegurar que existe:

```txt
public/images/og-image.jpg (1200x630)
```

Debe reflejar la temática del baby shower: luna, estrellas, nombre de la bebé, colores rosa y dorado.

---

## No PWA

Este proyecto NO usa Progressive Web App.

No crear:

* `manifest.json` / `manifest.webmanifest`
* Service workers
* Configuración offline

---

## Reglas

* El favicon debe representar la temática (luna, estrella o similar).
* No usar imágenes genéricas como favicon.
* Mantener solo los assets que realmente se usan.

---

## Checklist

* Existe `favicon.ico` o `icon.svg` en `src/app/`
* Existe `apple-icon.png` (180x180)
* Theme color definido en metadata
* Open Graph image existe (1200x630)
* No hay archivos de PWA
