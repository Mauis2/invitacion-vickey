# Steering: Seguridad Básica — Invitación Digital

## Objetivo

Aplicar medidas de seguridad mínimas para un sitio estático personal sin backend.

Este es un sitio de invitación, no comercial. La seguridad debe ser proporcional.

---

## Formulario RSVP

Si el formulario envía datos a algún servicio (Google Forms, Formspree, etc.):

* Validar campos en cliente (nombre requerido, asistentes requerido).
* No exponer API keys en el código fuente si se usa un servicio externo.
* Si solo abre WhatsApp con un mensaje pre-armado, la seguridad es mínima.

---

## Links externos

Todo enlace con `target="_blank"` debe incluir:

```tsx
rel="noopener noreferrer"
```

---

## Dependencias

* No instalar paquetes innecesarios.
* Preferir paquetes conocidos y mantenidos.
* Usar versiones exactas cuando sea posible.

---

## Datos sensibles

* No exponer información personal excesiva (dirección exacta completa, teléfonos, etc.) directamente en el HTML si el sitio es público.
* Si la ubicación se comparte, hacerlo a través de un link a Google Maps.

---

## Lo que NO se necesita

* No se necesitan headers de seguridad avanzados
* No se necesita honeypot (no hay formulario que envíe a servidor propio)
* No se necesita ofuscación de datos
* No se necesita CSP complejo
* No se necesita autenticación

---

## Checklist

* Links externos tienen `rel="noopener noreferrer"`
* No hay secretos en el código fuente
* Formulario valida campos básicos en cliente
* No hay paquetes con vulnerabilidades conocidas
