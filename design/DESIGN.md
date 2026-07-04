---
name: Celestial Cradle
colors:
  surface: '#fbf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#fbf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ef'
  surface-container: '#efeeea'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e4e2de'
  on-surface: '#1b1c1a'
  on-surface-variant: '#4f4448'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f0ed'
  outline: '#817478'
  outline-variant: '#d2c3c7'
  surface-tint: '#795465'
  primary: '#795465'
  on-primary: '#ffffff'
  primary-container: '#f8c8dc'
  on-primary-container: '#765162'
  inverse-primary: '#e9bacd'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#60603e'
  on-tertiary: '#ffffff'
  tertiary-container: '#d9d7ac'
  on-tertiary-container: '#5e5e3b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd8e7'
  primary-fixed-dim: '#e9bacd'
  on-primary-fixed: '#2e1221'
  on-primary-fixed-variant: '#5f3c4d'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e6e5b9'
  tertiary-fixed-dim: '#cac99f'
  on-tertiary-fixed: '#1d1d03'
  on-tertiary-fixed-variant: '#484828'
  background: '#fbf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2de'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  container-max-width: 1200px
---

## Brand & Style

This design system celebrates the arrival of Vickey Eileen with a whimsical, "Moon and Stars" narrative. The brand personality is delicate, magical, and deeply nurturing. It evokes the feeling of a quiet, starry night in a nursery—peaceful yet filled with wonder.

The visual style is **Watercolor-Inspired Minimalism**. It blends the organic, hand-painted textures of watercolor illustrations with a clean, modern layout. The primary goal is to create a digital environment that feels as soft as a physical invitation, utilizing depth through layered "paper" surfaces and gentle, ethereal blurs.

**Key Visual Pillars:**
- **Whimsical:** Floating elements, twinkling accents, and soft-focus backgrounds.
- **Nostalgic:** Traditional serif typography paired with hand-drawn motifs.
- **Airy:** Significant use of negative space to allow "creamy" textures to breathe.

## Colors

The palette is anchored in a soft, "Petal Pink" and supported by the warmth of "Antique Gold." The background is never a pure white, but rather a "Creamy Pearl" to maintain a warm, inviting atmosphere.

- **Primary (Petal Pink):** Used for main accents, soft buttons, and delicate headers.
- **Secondary (Antique Gold):** Reserved for star motifs, shimmering borders, and high-emphasis callouts.
- **Tertiary (Creamy Pearl):** The foundation color for large surfaces and backgrounds.
- **Neutrals:** Soft taupes and muted greys replace harsh blacks for text to maintain a low-contrast, gentle readability.

Color transitions should mimic watercolor bleeds, using soft gradients rather than sharp intersections.

## Typography

The typography system pairs the high-contrast elegance of **Playfair Display** with the modern, approachable geometry of **Plus Jakarta Sans**.

- **Display & Headlines:** Use Playfair Display to evoke a sense of tradition and celebration. Titles should use "Title Case" to feel more like an invitation.
- **Body Text:** Plus Jakarta Sans is chosen for its soft terminals and exceptional legibility, ensuring details about the event are easy to digest.
- **Labels:** Small labels use increased letter spacing and semi-bold weights to provide hierarchy without needing aggressive colors.

For mobile, display sizes should scale down by 20%, ensuring that the "Vickey Eileen" name remains the focal point without overflowing containers.

## Layout & Spacing

This design system utilizes a **Fluid Grid** with generous, "airy" margins to reinforce the cloud-like theme. 

- **The 8px Rhythm:** All spacing between elements (padding/margins) must be multiples of 8px to maintain a hidden structural discipline amidst the whimsical visuals.
- **Safe Zones:** Content is centered in a max-width container of 1200px on desktop. On mobile, we use a slightly tighter 20px margin to maximize screen real estate for illustrations.
- **Reflow Rules:** Images and watercolor assets should "float" outside the standard grid gutters occasionally to create a more organic, less rigid layout.

## Elevation & Depth

Depth is achieved through **Soft Tonal Layering** and **Ambient Shadows**, mimicking the way paper cutouts look when layered in a shadow box.

- **Shadow Character:** Shadows should be highly diffused (blur > 20px), low opacity (10-15%), and tinted with the primary pink or a soft blue rather than black.
- **Backdrop Blurs:** Use subtle "frosted glass" effects on cards that sit atop star patterns to ensure text remains readable while keeping the background visible.
- **Z-Index Strategy:** Clouds sit at the lowest elevation, followed by the main content cards, with stars and magical "glitter" accents floating at the highest level.

## Shapes

The shape language is dominated by **circles and arches**, avoiding sharp corners entirely.

- **Corner Radii:** Main content containers use a `1rem` (16px) radius. Small components like buttons use a "Soft" 8px radius.
- **The Arch Motif:** Use large, sweeping arches for header backgrounds or image frames to mimic the curve of the moon.
- **Organic Shapes:** Decorative elements (clouds) should use irregular, hand-drawn vector paths rather than perfect geometric circles.

## Components

### Buttons
Primary buttons are pill-shaped with a soft pink-to-cream gradient and a subtle gold border. Hover states should include a slight lift (shadow increase) and a twinkling star icon appearing next to the text.

### Cards
Cards are the "paper" of the design system. They feature a `rounded-lg` corner and a faint watercolor texture overlay. Borders are 1px thick and colored in a very light gold or translucent pink.

### Input Fields
Forms should feel non-intrusive. Use "underlined" style inputs with gold accents instead of heavy boxed borders. Placeholders should be in an italicized serif to feel like a personal note.

### Chips & Tags
Used for "Date," "Time," or "Location" labels. These should have a light Creamy Pearl background with a soft pink border, mimicking a small gift tag.

### Patterns
- **Cloud Pattern:** A subtle, repeating background overlay of soft-edged, semi-opaque white shapes.
- **Star Pattern:** Scattered "Antique Gold" 4-pointed stars of varying sizes, used primarily in header and footer regions.