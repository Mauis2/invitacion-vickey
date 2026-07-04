# Steering: Convenciones de Código

## Objetivo

Mantener consistencia en todo el proyecto.

---

## Naming de archivos

| Tipo | Convención | Ejemplo |
|------|-----------|---------|
| Componentes React | PascalCase | `HeroSection.tsx` |
| SCSS Modules | PascalCase (mismo nombre del componente) | `HeroSection.module.scss` |
| Archivos JSON | kebab-case | `event.json` |
| Utilidades/helpers | camelCase | `countdown.ts` |
| Tipos | camelCase con sufijo `.types` | `content.types.ts` |

---

## Naming en código

| Tipo | Convención | Ejemplo |
|------|-----------|---------|
| Componentes | PascalCase | `CountdownTimer` |
| Props interfaces | PascalCase con sufijo `Props` | `CountdownTimerProps` |
| Variables y funciones | camelCase | `formatTime` |
| CSS classes (en modules) | camelCase | `styles.heroCard` |
| Tokens CSS | kebab-case con prefijo | `--color-primary` |

---

## Estructura de componentes

Cada componente en su propia carpeta:

```txt
ComponentName/
  ComponentName.tsx
  ComponentName.module.scss
```

---

## Orden de imports

```tsx
// 1. React / Next.js
import Image from 'next/image'

// 2. Librerías externas
import { motion } from 'framer-motion'

// 3. Componentes internos
import CountdownTimer from '@/components/CountdownTimer/CountdownTimer'

// 4. Datos / JSON
import eventData from '@/data/event.json'

// 5. Tipos
import type { EventContent } from '@/types/content.types'

// 6. Estilos
import styles from './HeroSection.module.scss'
```

Separar cada grupo con una línea en blanco.

---

## Reglas de TypeScript

* No usar `any`.
* Preferir `interface` sobre `type` para objetos.
* Tipar todas las props de componentes.
* Tipar los JSON de contenido.
* Exportar tipos desde `src/types/`.

---

## Prettier

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "none",
  "tabWidth": 2,
  "printWidth": 100
}
```

---

## Exports

* Usar `export default` para componentes.
* Usar named exports para utilidades y tipos.

---

## Links externos

Todo enlace con `target="_blank"` debe incluir:

```tsx
rel="noopener noreferrer"
```
