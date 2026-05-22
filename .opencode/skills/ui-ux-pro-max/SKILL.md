---
name: ui-ux-pro-max
author: nextlevelbuilder (adaptado para Jardinería Profesional)
version: 1.0.0
description: Diseño UI/UX profesional con 67 estilos, paletas, tipografía y reglas de razonamiento específicas para la web de Jardinería Profesional.
type: design
---

# UI/UX Pro Max — Jardinería Profesional

Skill de diseño UI/UX adaptado del proyecto [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) con 161 reglas de razonamiento, 67 estilos UI, 161 paletas de color y 57 pares tipográficos.

## Design System de Jardinería Profesional

### Patrón de Landing Page

```
+----------------------------------------------------------------------+
|  TARGET: Jardinería Profesional — RECOMMENDED DESIGN SYSTEM         |
+----------------------------------------------------------------------+
|                                                                      |
|  PATTERN: Hero-Centric + Trust & Authority                          |
|     Conversion: Visual portfolio-driven con confianza               |
|     CTA: Botón WhatsApp flotante permanente + formulario contacto    |
|     Sections:                                                        |
|       1. Hero (Full-bleed imagen de jardín + CTA)                   |
|       2. Servicios (3-4 cards con íconos)                           |
|       3. Galería destacada (Masonry grid con lightbox)              |
|       4. Testimonios (carrusel con fotos reales)                    |
|       5. Blog / Consejos (grid de cards)                            |
|       6. Contacto (formulario + WhatsApp + mapa)                    |
|                                                                      |
|  STYLE: Organic Biophilic + Soft UI Evolution                       |
|     Keywords: Naturaleza, verde, orgánico, limpio, profesional      |
|     Best For: Jardinería, paisajismo, servicios al aire libre       |
|     Performance: Excelente | Accessibility: WCAG AA                 |
|                                                                      |
|  COLORS:                                                             |
|     Primary:    #16a34a (Verde Jardín)                              |
|     Secondary:  #15803d (Verde Bosque)                              |
|     Accent:     #d4af37 (Dorado/Destello)                           |
|     Background: #f0fdf4 (Verde muy claro)                           |
|     Surface:    #ffffff (Blanco)                                     |
|     Text:       #1f2937 (Gris oscuro)                                |
|     Muted:      #6b7280 (Gris medio)                                 |
|     Notes: Paleta natural que transmite frescura y confianza        |
|                                                                      |
|  TYPOGRAPHY: Playfair Display / Inter                               |
|     Mood: Elegante, natural, profesional                            |
|     Headings: Playfair Display (serif, premium feel)                |
|     Body: Inter (sans-serif, legible, moderna)                      |
|     Google Fonts: Playfair Display + Inter                          |
|                                                                      |
|  KEY EFFECTS:                                                        |
|     Hover scale en cards (1.02) + sombras suaves + transiciones     |
|     200-300ms + border-radius: 12px en cards e imágenes             |
|                                                                      |
|  AVOID (Anti-patterns):                                              |
|     🌶 Neón/Brillante + Animaciones bruscas + Modo oscuro           |
|     🌶 Fondos texturizados que compitan con las imágenes            |
|     🌶 Tipografía decorativa para body text                         |
|     🌶 Demasiados colores — mantener la paleta verde + blanco       |
|                                                                      |
+----------------------------------------------------------------------+
```

## Reglas de UI/UX Aplicables

### Para Galería de Trabajos
- **Masonry Grid** con `columns-*` de Tailwind
- **Lightbox** nativo con overlay oscuro (sin librerías pesadas)
- **Categorías** como pills/tags para filtrar
- **Thumbnails** via Cloudinary (`w_400,h_300,c_fill`)
- **Loading states** con skeleton mientras cargan imágenes de Cloudinary
- Hover: scale(1.02) + shadow-lg en cada card

### Para Blog / Consejos
- **Feature cards** con imagen de portada, extracto, fecha y categoría
- **Search** con input visible y resultados instantáneos
- **Artículo**: tipografía amplia (`max-w-3xl`), `prose-lg` para contenido
- Breadcrumbs sutiles: Blog → Categoría → Artículo
- **Sin paginación** para menos de 20 artículos (scroll infinito no aplica)

### Para Formulario de Contacto
- **Single column** en mobile, 2-columnas en desktop
- **Validación inline** con feedback visual (borde rojo/verde)
- **WhatsApp** como CTA principal (botón verde flotante + sección dedicada)
- Source tracking oculto (`source: 'web'` o `source: 'whatsapp'`)
- **Success state** con mensaje de confirmación y opción de enviar otro
- Sin CAPTCHA (el rate limiting va del lado del backend)

### Para Admin CMS
- **Sidebar** fijo con iconos + texto
- **Tablas** con acciones inline (editar/borrar) como iconos
- **Formularios** con guardado automático o manual
- **Upload de imágenes** con preview antes de enviar
- **Drag & drop** para reordenar galería

### Para WhatsApp FAB
- Fijo, esquinero inferior derecho
- Z-index: 50 (por encima de todo)
- Transición sutil en hover (scale)
- No molesto en mobile (padding inferior suficiente)
- Texto predefinido en el link: "Hola! Quiero consultar por un servicio de jardinería."

## Checklist Pre-Delivery (Toda UI)

- [ ] Sin emojis como iconos (usar SVG: Lucide o Heroicons)
- [ ] `cursor-pointer` en todos los elementos clickeables
- [ ] Hover states con transiciones smooth (150-300ms)
- [ ] Light mode: contraste de texto 4.5:1 mínimo
- [ ] Focus states visibles para navegación por teclado
- [ ] `prefers-reduced-motion` respetado
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] Imágenes con `loading="lazy"` y `width`/`height` para evitar CLS
- [ ] Sin dependencias JS pesadas para funcionalidad básica
- [ ] Estados vacío/error/loading considerados en cada componente
- [ ] Los anchor tags de navegación no se abren en nueva pestaña (son internos)
- [ ] Solo links externos (WhatsApp, email) usan `target="_blank"` con `rel="noopener noreferrer"`
