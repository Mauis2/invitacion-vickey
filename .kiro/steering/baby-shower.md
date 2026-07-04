# Steering: Invitación Digital Baby Shower — Vickey Eileen

## Contexto del proyecto

El proyecto consiste en desarrollar una invitación digital tipo single-page para el **Baby Shower de Vickey Eileen**. La temática es "Moon and Stars" con un estilo visual de acuarela minimalista, delicado y mágico.

La página debe comunicar ternura, ilusión y celebración. No es un sitio corporativo ni comercial — es una experiencia visual personal para compartir con invitados.

## Objetivo del sitio

Crear una página web hermosa, animada y emotiva que permita a los invitados:

* Conocer los detalles del evento (fecha, hora, lugar).
* Sentir la emoción de la llegada de Vickey Eileen.
* Confirmar asistencia (RSVP).
* Ver el itinerario del evento.
* Disfrutar de la galería de momentos.
* Dejar un mensaje o deseo para la bebé.

## Identidad del evento

Nombre del evento:

**Baby Shower de Vickey Eileen**

Temática:

**Celestial Cradle** — Luna, estrellas, nubes, magia nocturna, acuarela.

Personalidad visual:

* Delicada
* Mágica
* Nostálgica
* Aireada
* Cálida
* Whimsical

## Público objetivo

Familiares y amigos cercanos invitados al baby shower. La página debe ser fácil de navegar en móvil (la mayoría accederá desde WhatsApp/redes sociales).

## Tono de comunicación

* Emotivo pero no cursi en exceso
* Cálido y personal
* Poético sin ser complicado
* Íntimo, como una carta entre amigos

## Estructura de la página

### 1. Hero principal

* Nombre "Baby Shower de Vickey Eileen"
* Ícono de luna creciente
* Widget de música ambiental (melodía de cuna)
* Elementos decorativos: nubes flotantes, estrellas con twinkle
* Card con backdrop blur sobre fondo con pattern

### 2. Intro / Nuestro bebé

* Texto emotivo sobre la llegada de Vickey Eileen
* Decoración con estrellas

### 3. Countdown (Cuenta regresiva)

* Días, horas, minutos hasta el evento
* Animación de pulso sutil
* Fondo con container rosa suave

### 4. Mensaje emotivo

* Texto poético/inspiracional
* Fondo con blurs decorativos (pink y tertiary)
* Estrellas decorativas animadas

### 5. Galería — Momentos Mágicos

* Grid de 3 imágenes en estilo polaroid/card
* Bordes suaves, sombras delicadas
* Hover con scale sutil
* Imagen central ligeramente elevada en desktop

### 6. Información del evento — Cuándo y Dónde

* Fecha: 5 de Julio, 2026
* Hora: 2:30 PM
* Lugar: Claustros 1, La Cruz
* Botón para ver ubicación (enlace a mapa)
* Card con sombra y borde dorado/rosa

### 7. Itinerario Estelar (Timeline)

* 2:30 PM — Cita (llegada)
* 3:30 PM — Aperitivos
* 4:00 PM — Show y sorpresas
* 5:30 PM — Comida
* Timeline vertical con línea gradient
* Iconos en cada paso

### 8. Deseos + RSVP

* Área de "shooting stars" animada con mensaje
* Formulario de confirmación:
  * Nombre
  * Número de asistentes
  * Botón enviar confirmación

### 9. Footer

* Emojis decorativos con animación gentle pulse
* Línea divisoria sutil

### 10. Navegación

* Mobile: bottom nav fijo con iconos (Home, Story, Gallery, RSVP)
* Desktop: top bar transparente fijo

## Lineamientos visuales

### Paleta de colores

Basada en Material Design 3 con tonos personalizados:

* **Primary (Petal Pink):** `#795465` — acentos principales
* **Primary Container:** `#f8c8dc` — fondos suaves, cards
* **Secondary (Antique Gold):** `#735c00` — detalles dorados, estrellas
* **Secondary Container:** `#fed65b` — bordes dorados
* **Tertiary:** `#60603e` — iconos de información
* **Surface:** `#fbf9f5` — fondo principal (Creamy Pearl)
* **On Surface:** `#1b1c1a` — texto principal
* **On Surface Variant:** `#4f4448` — texto secundario

### Tipografía

* **Display / Headlines:** Playfair Display (serif, elegante)
* **Body / Labels:** Plus Jakarta Sans (sans, legible)
* Display: 48px / 700
* Headline LG: 32px / 600
* Headline MD: 24px / 500
* Body LG: 18px / 400
* Body MD: 16px / 400
* Label SM: 12px / 600 / tracking wider

### Formas y bordes

* Esquinas redondeadas: 0.5rem a 1.5rem
* Cards con `rounded-2xl` o `rounded-3xl`
* Botones pill con `rounded-full`
* No usar esquinas agudas

### Sombras

* Difusas, baja opacidad
* Tintadas con primary-container (no negro)
* Backdrop blur en cards principales

### Animaciones

* Float: nubes y decoraciones flotando suavemente
* Twinkle: estrellas parpadeando
* Pulse periodic: countdown
* Shooting stars: sección de deseos
* Scroll reveal: fade + slide
* Hover scale en galería

## Responsive / Mobile

* Mobile-first obligatorio (la mayoría accede desde celular)
* Bottom nav en mobile, top bar en desktop
* Cards apiladas en mobile
* Galería 1 columna en mobile, 3 en desktop
* Timeline simplificado en mobile
* Padding: 20px mobile, 64px desktop
* Max width container: 1200px

## Reglas de implementación

* Next.js con App Router y export estático
* TypeScript
* Tailwind CSS (manteniendo la base del diseño HTML de referencia)
* Contenido editable desde JSON
* Componentes separados por sección
* Animaciones con CSS keyframes y Tailwind (respetar reduced-motion)
* Imágenes optimizadas en .webp
* No usar librerías pesadas innecesarias
* Single page con smooth scroll entre secciones
* No es necesario multi-ruta (es una sola página)
* Usar Material Symbols Outlined para iconos (como en el diseño de referencia)

## Criterios de aceptación

* Reproduce fielmente el diseño del HTML de referencia
* Funciona correctamente en mobile (320px+)
* No hay overflow horizontal
* Las animaciones son suaves y no afectan performance
* El countdown funciona correctamente
* El formulario RSVP es funcional
* La navegación mobile funciona
* La galería se ve bien en todos los tamaños
* El sitio transmite magia, ternura y celebración
* Lighthouse Performance mínimo 85 en mobile
