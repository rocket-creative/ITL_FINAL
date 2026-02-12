# ITL Website Design System

**Last Updated:** January 9, 2026

This document defines the exact design tokens and patterns to ensure consistency across ALL pages.

---

## 🎨 Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--dk-blue` | `#0a253c` | Dark backgrounds, icon circles, footer |
| `--nav-blue` | `#134978` | Primary buttons, accents |
| `--teal` | `#008080` | CTAs, highlights, borders, icons |
| `--light-teal` | `#00d4d4` | Hero badges, hover states |
| `--white` | `#ffffff` | Text on dark, backgrounds |
| `--off-white` | `#f7f7f7` | Card backgrounds, alternating sections |
| `--gray-border` | `#e0e0e0` | Card borders |
| `--text-dark` | `#333` | Headings |
| `--text-gray` | `#666` | Body text |
| `--text-light` | `#999` | Placeholder text |

---

## 📐 Layout

| Element | Value |
|---------|-------|
| Max content width | `1000px` |
| Page wrapper | `maxWidth: '1200px', margin: '0 auto'` |
| Section padding | `60px 20px` |
| Hero padding | `80px 20px 60px` |
| Card gap | `gap-6` (24px) |
| Grid columns | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` or `lg:grid-cols-4` |

---

## 🔤 Typography

### Headings (Poppins)

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| H1 (Hero) | `2.8rem` | 700 | white |
| H2 (Section) | `2rem` | 700 | `#2384da` |
| H3 (Card title) | `1.1rem` | 600 | `#333` |
| H4 (Subsection) | `1rem` | 600 | `#333` |

### Body (System UI)

| Element | Size | Weight | Color | Line Height |
|---------|------|--------|-------|-------------|
| Hero intro | `1rem` | 300 | `rgba(255,255,255,0.9)` | `1.7rem` |
| Body text | `.9rem` | 300 | `#666` | `1.6rem` |
| Small text | `.85rem` | 300 | `#666` | `1.5rem` |
| Button text | `.85rem` | 500 | varies | - |
| Badge text | `.8rem` | 500 | varies | - |

---

## 🔘 Buttons

### Primary Button (Solid)
```css
backgroundColor: '#008080' /* or '#134978' */
color: 'white'
padding: '10px 20px'
minWidth: '160px'
fontFamily: 'var(--system-ui)'
fontSize: '.85rem'
fontWeight: 500
/* Hover: -translate-y-1, shadow-lg */
```

### Secondary Button (Outline - on dark bg)
```css
backgroundColor: 'transparent'
color: 'white'
padding: '10px 20px'
minWidth: '160px'
border: '2px solid white'
fontFamily: 'var(--system-ui)'
fontSize: '.85rem'
fontWeight: 500
/* Hover: bg-white, text changes to teal or blue */
```

### Hero Primary Button (White on gradient)
```css
backgroundColor: 'white'
color: '#0a253c'
padding: '10px 20px'
minWidth: '160px'
fontFamily: 'var(--system-ui)'
fontSize: '.85rem'
fontWeight: 500
```

### Hero Secondary Button (Outline on gradient)
```css
backgroundColor: 'transparent'
color: 'white'
padding: '10px 20px'
minWidth: '160px'
border: '2px solid white'
fontFamily: 'var(--system-ui)'
fontSize: '.85rem'
fontWeight: 500
```

---

## 🃏 Cards

### Standard Card
```css
backgroundColor: '#f7f7f7'
padding: '25px' /* or '30px' for larger cards */
border: '.5px solid #e0e0e0'
borderTop: '4px solid #008080' /* or #134978 for alternating */
/* Layout: flex flex-col */
/* Button: mt-auto for baseline alignment */
/* Hover: hover:-translate-y-2 hover:shadow-lg transition-all duration-300 */
```

### Icon Circle (inside cards)
```css
width: '50px'
height: '50px'
backgroundColor: '#0a253c'
borderRadius: '50%'
display: 'flex'
alignItems: 'center'
justifyContent: 'center'
marginBottom: '15px'
/* Icon: size={24} color="white" */
```

### Image Placeholder
```css
border: '2px dashed #e0e0e0' /* or rgba(255,255,255,0.4) on dark */
borderRadius: '8px'
aspectRatio: '4/3'
display: 'flex'
flexDirection: 'column'
alignItems: 'center'
justifyContent: 'center'
backgroundColor: 'white' /* or rgba(255,255,255,0.05) on dark */
```

---

## 🦸 Hero Section

### Background
```css
background: 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)'
padding: '80px 20px 60px'
position: 'relative'
overflow: 'hidden'
```

### Background Pattern (SVG)
```css
position: 'absolute'
top: 0, left: 0, right: 0, bottom: 0
opacity: 0.1
backgroundImage: /* cross pattern SVG */
```

### Badge
```css
display: 'inline-flex'
alignItems: 'center'
gap: '8px'
backgroundColor: 'rgba(255,255,255,0.15)'
padding: '6px 16px'
borderRadius: '20px'
marginBottom: '20px'
/* Text: color: 'white', fontSize: '.8rem', fontWeight: 500 */
```

### Layout
```css
maxWidth: '1000px'
margin: '0 auto'
/* Grid: grid-cols-1 lg:grid-cols-2 gap-12 items-center */
```

---

## 📑 Section Patterns

### Light Section (white bg)
```css
backgroundColor: 'white'
padding: '60px 20px'
/* Content: maxWidth: '1000px', margin: '0 auto' */
```

### Alternating Section (off-white bg)
```css
backgroundColor: '#f7f7f7'
padding: '60px 20px'
```

### Dark Section (testimonials, response time)
```css
backgroundColor: '#0a253c'
padding: '60px 20px' /* or '40px 20px' for bars */
/* Text: white, rgba(255,255,255,0.8) */
```

### Teal CTA Section
Use `UXUIDCStartProjectCTA` component with DNA animation.

---

## ✨ Animations

### Scroll Animation (animate-in class)
```javascript
gsap.fromTo(el, 
  { opacity: 0, y: 30 },
  {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  }
);
// NO per-element delay (causes cumulative lag)
```

### Card Hover
```css
transition-all duration-300
hover:-translate-y-2 hover:shadow-lg
```

### Button Hover
```css
transition-all duration-300
hover:-translate-y-1 hover:shadow-md
```

---

## 🧩 Shared Components

| Component | Usage |
|-----------|-------|
| `UXUIDCNavigation` | Every page header |
| `UXUIDCFooter` | Every page footer |
| `UXUIDCAnimatedFAQ` | FAQ sections (pass title and faqs array) |
| `UXUIDCAnimatedCounter` | Stats sections (pass stats array) |
| `UXUIDCStartProjectCTA` | Teal CTA with DNA animation |
| Icons from `Icons.tsx` | All icons (never emojis) |

---

## ❌ Do NOT

- Use emojis (use flat SVG icons)
- Use different button sizes per page
- Use `delay: i * 0.1` in scroll animations
- Use different hero gradients
- Abbreviate "Ingenious Targeting Laboratory" to "ITL" in visible text (code comments OK)
- Create duplicate FAQ sections
- Use inconsistent card padding/borders

---

## ✅ Checklist for Every Page

- [ ] Hero uses standard gradient and `80px 20px 60px` padding
- [ ] Hero badge uses `rgba(255,255,255,0.15)` bg, white text
- [ ] Hero buttons: primary white/teal, secondary outline white
- [ ] All buttons: `padding: 10px 20px`, `minWidth: 160px`, `fontSize: .85rem`
- [ ] Cards: `bg #f7f7f7`, `border .5px #e0e0e0`, `borderTop 4px` colored
- [ ] Card buttons: `mt-auto` with `flex flex-col` parent
- [ ] Section padding: `60px 20px`
- [ ] Section headings: `#2384da`, `2rem`, `700`
- [ ] Body text: `#666`, `.9rem`, `300`
- [ ] Icons: flat SVG from Icons.tsx
- [ ] FAQ: use `UXUIDCAnimatedFAQ` component
- [ ] Animations: no per-element delay
- [ ] Forms: HubSpot integration
