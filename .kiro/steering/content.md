# Steering: Contenido y Datos (JSON)

## Objetivo

Definir reglas claras para la gestión del contenido editable del sitio mediante archivos JSON.

El contenido del baby shower debe poder actualizarse sin tocar código React o estilos.

---

## Principio

Los archivos JSON son la "base de datos" del sitio estático.

Quien organiza el evento debe poder cambiar textos, fecha, lugar, itinerario y detalles editando solo archivos JSON.

---

## Estructura de datos

```txt
src/data/
  event.json             // datos del evento (fecha, hora, lugar, nombre bebé)
  hero.json              // contenido del hero
  intro.json             // texto introductorio
  message.json           // mensaje emotivo
  itinerary.json         // programa/itinerario del evento
  gallery.json           // imágenes de la galería
  navigation.json        // links de navegación
```

---

## Reglas de archivos JSON

* Un archivo por sección o dominio.
* Nombres descriptivos en kebab-case.
* Cada archivo debe ser JSON válido.
* No incluir comentarios dentro del JSON.
* Mantener estructura plana — no anidar más de 3 niveles.

---

## Tipado de contenido

Cada archivo JSON debe tener su tipo correspondiente en:

```txt
src/types/content.types.ts
```

Ejemplo:

```ts
export interface EventContent {
  babyName: string
  date: string
  time: string
  location: string
  locationUrl: string
}

export interface ItineraryItem {
  time: string
  title: string
  icon: string
}

export interface GalleryItem {
  src: string
  alt: string
}
```

---

## Datos del evento

`event.json` contiene la información central:

```json
{
  "babyName": "Vickey Eileen",
  "date": "5 de Julio, 2026",
  "time": "2:30 PM",
  "location": "Claustros 1, La Cruz",
  "locationUrl": "https://maps.google.com/...",
  "countdownTarget": "2026-07-05T14:30:00"
}
```

---

## Imágenes en JSON

Las rutas de imágenes deben ser paths relativos a `public/`:

```json
{
  "src": "/images/gallery/momento-1.webp",
  "alt": "Ilustración de luna y estrellas en acuarela"
}
```

---

## Reglas de edición

* Para cambiar textos: editar el JSON correspondiente.
* Para cambiar colores: editar tokens/variables CSS.
* Para cambiar estructura o layout: editar el componente.
* Para agregar una imagen a la galería: agregar entrada en gallery.json + imagen en public.

---

## Validación

* Si un JSON está incompleto, el build debe fallar con error claro.
* Los componentes no deben renderizar datos `undefined` sin fallback.
