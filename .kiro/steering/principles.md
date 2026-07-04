# Steering: Principios de Diseño y Desarrollo

## Objetivo

Código simple, mantenible y pragmático.

---

## KISS — Keep It Simple

* Preferir la solución más simple que resuelva el problema.
* Un componente hace una cosa.
* No crear abstracciones innecesarias para un sitio de una sola página.

---

## YAGNI — You Aren't Gonna Need It

* No implementar funcionalidad que no se haya pedido.
* No preparar para escenarios hipotéticos.
* Es una invitación digital — no necesita CMS, auth, ni backend complejo.

---

## Reglas derivadas

* No agregar state management externo (Redux, Zustand).
* No usar patrones de diseño complejos cuando una función simple basta.
* Preferir composición sobre herencia.
* Preferir código explícito sobre código "inteligente".
* Si un archivo tiene más de 150 líneas, considerar dividirlo.

---

## Anti-patrones a evitar

* Over-engineering: resolver problemas que no existen.
* God components: componentes que hacen demasiado.
* Dependencias innecesarias: si se puede resolver con código propio simple, no instalar un paquete.
* Código muerto: no dejar imports, variables o funciones sin usar.
