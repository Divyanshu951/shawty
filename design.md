---
name: Shawty
colors:
  surface: '#fff8f1'
  surface-dim: '#e0d9cf'
  surface-bright: '#fff8f1'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#faf2e9'
  surface-container: '#f5ede3'
  surface-container-high: '#efe7dd'
  surface-container-highest: '#e9e1d8'
  on-surface: '#1e1b15'
  on-surface-variant: '#584237'
  inverse-surface: '#33302a'
  inverse-on-surface: '#f7f0e6'
  outline: '#8c7164'
  outline-variant: '#e0c0b1'
  surface-tint: '#9d4300'
  primary: '#9d4300'
  on-primary: '#ffffff'
  primary-container: '#f97316'
  on-primary-container: '#582200'
  inverse-primary: '#ffb690'
  secondary: '#545f73'
  on-secondary: '#ffffff'
  secondary-container: '#d5e0f8'
  on-secondary-container: '#586377'
  tertiary: '#944a00'
  on-tertiary: '#ffffff'
  tertiary-container: '#e5812c'
  on-tertiary-container: '#522700'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbca'
  primary-fixed-dim: '#ffb690'
  on-primary-fixed: '#341100'
  on-primary-fixed-variant: '#783200'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#713700'
  background: '#fff8f1'
  on-background: '#1e1b15'
  surface-variant: '#e9e1d8'
  vibrant-orange: '#f97316'
  deep-slate: '#1e293b'
  warm-surface: '#fff7ed'
  accent-yellow: '#fbbf24'
typography:
  display-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-mono:
    fontFamily: Space Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  gutter-md: 24px
  margin-mobile: 20px
  margin-desktop: 48px
  container-max: 1100px
---

## Brand & Style
The design system for this brand is defined by a "Bright Orangish" aesthetic that is fun, catchy, and memorable. It targets a social-savvy audience that values speed and personality. The visual style is **High-Contrast / Bold**, utilizing massive, expressive typography and a vibrant primary palette to create an energetic atmosphere.

The emotional response should be one of excitement and instant gratification. By mixing modern geometric shapes with a warm, inviting color story, the interface transforms a utility—link shortening—into a punchy, brand-driven experience.

## Colors
The palette is centered around a vibrant, energetic orange that demands attention and communicates enthusiasm.

- **Primary:** A loud, saturated orange (#f97316) used for core actions and brand identification.
- **Secondary:** Deep slate used for heavy-duty contrast in text and structural elements to ground the vibrant primary.
- **Tertiary:** A softer orange tint used for hover states and supporting accents.
- **Neutral:** A warm, cream-tinted surface tone (#fff7ed) that replaces sterile whites to maintain the "bright orangish" aesthetic while ensuring high readability.

The default mode is **Light**, emphasizing warmth and clarity.

## Typography
The typography is bold and modern, favoring high-character fonts that feel fresh and distinctive.

- **Headlines:** Uses **Bricolage Grotesque**. Its quirky, expressive terminals and tight spacing provide the "fun and catchy" personality required for the brand.
- **Body:** Uses **Plus Jakarta Sans**. It offers a soft, welcoming feel that balances the aggressive headlines while maintaining excellent readability on warm surfaces.
- **Labels/Data:** Uses **Space Mono** for shortened URLs and technical strings. This adds a "technical-cool" layer that distinguishes user-generated content from the UI's editorial voice.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy to maintain tight control over the bold visual elements. Content is housed within a 1100px container to ensure that large typography doesn't stretch excessively on wide monitors.

- **Rhythm:** An 8px base unit drives all spacing.
- **Desktop:** 12-column grid with generous 48px margins to allow the bold colors to "breathe" against the edges.
- **Mobile:** 4-column grid with 20px margins. 
- **Reflow:** On mobile, vertical spacing is increased by 1.5x to prevent the heavy headlines from feeling cramped.

## Elevation & Depth
In line with the bold and high-contrast style, this system avoids traditional soft shadows in favor of **Tonal Layers** and **Low-Contrast Outlines**.

- **Depth:** Physical elevation is minimal. Instead, use slight color shifts in the warm neutral range to separate surfaces. 
- **Outlines:** Use 2px solid borders in the Secondary color for high-impact elements like buttons and input fields to create a "pop" effect.
- **Interactivity:** Hover states should not lift; they should color-shift (e.g., Orange to a deeper Tangerine) to signal engagement.

## Shapes
The shape language uses **Level 2 (Rounded)** settings. This creates a friendly, approachable vibe that complements the "soft" nature of the body font while keeping the layout structured.

- **Primary Elements:** 0.5rem (8px) for buttons and inputs.
- **Feature Cards:** 1rem (16px) to create a distinct container feel.
- **Interactive Pills:** Use full-radius (pill-shaped) for status chips to contrast against the more rectangular main elements.

## Components

### Buttons
- **Primary:** Vibrant Orange background, deep slate text, 2px border of the same slate. Bold weight.
- **Secondary:** Transparent background with a 2px slate border.
- **Style:** Use high-contrast color blocks. Buttons should feel "chunky" and clickable.

### Input Fields
The main URL shortener input is the brand's "hero" component. Use a 2px border and a background color that is slightly lighter than the base surface. Ensure the **Space Mono** font is used for the input text to make the URL look distinct.

### Cards
Cards should be flat with a 2px border. No shadows. Use a "Header" section within the card that has a light orange background to categorize content quickly.

### Chips
Shortened link tags should use the pill shape with a high-contrast background (e.g., Primary Orange with White text) to make them the focal point of the recent links list.

### Progress & Feedback
Use the **Accent Yellow** for alerts or warnings, maintaining the warm, bright theme while providing a clear visual distinction from the primary brand orange.

```sh

```