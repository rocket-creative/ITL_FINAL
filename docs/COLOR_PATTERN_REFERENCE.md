# Color Pattern Reference Guide
## ITL Website Section Background Standards

### Design System Color Roles

| Role | Colors | Usage | Examples |
|------|--------|-------|----------|
| **HERO** | `linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)` or similar blue/teal gradients | Opening hero section only (top 25-35% of page) | Hero with title, intro, CTAs |
| **STATS** | `#0a253c` or `#134978` (dark blue) | Stats bars with white text | Animated counters showing projects, publications |
| **WHITE** | `#ffffff` or `white` | Neutral sections for content | Content sections, cards, FAQ |
| **GREY** | `#f8f9fa` or `#f7f7f7` | Alternating neutral sections | Background variation for rhythm |
| **ACCENT** | `#008080` (teal) | Featured sections, CTAs (use sparingly 5% max) | Special callouts, CTA sections |

### Correct Alternating Pattern

```
HERO (gradient blue/teal)
↓
STATS (#0a253c dark blue) - Optional stats bar
↓
WHITE
↓
GREY (#f8f9fa or #f7f7f7)
↓
WHITE
↓
GREY
↓
ACCENT (#008080) - Optional featured section
↓
WHITE
↓
GREY
↓
ACCENT or DARK (#008080 or #0a253c) - CTA section
↓
WHITE (closing content like FAQ)
```

### **CRITICAL RULE**
❌ **NEVER** have consecutive sections with the same background color
- No WHITE → WHITE
- No GREY → GREY  
- No BLUE → BLUE

✅ **ALWAYS** alternate: WHITE → GREY → WHITE → GREY

### Text Contrast Requirements (WCAG AA)

| Background | Text Color | Contrast Ratio |
|------------|-----------|----------------|
| `#ffffff` (white) | `#333333` or darker | ≥ 4.5:1 ✅ |
| `#f8f9fa` (light grey) | `#333333` or darker | ≥ 4.5:1 ✅ |
| `#f7f7f7` (light grey) | `#333333` or darker | ≥ 4.5:1 ✅ |
| `#008080` (teal) | `#ffffff` (white) | ≥ 4.5:1 ✅ |
| `#0a253c` (dark blue) | `#ffffff` (white) | ≥ 12:1 ✅ |
| `#134978` (medium blue) | `#ffffff` (white) | ≥ 7:1 ✅ |

### Common Sections and Their Backgrounds

| Section Type | Recommended Background |
|--------------|----------------------|
| Hero | Gradient blue/teal |
| Stats bar | `#0a253c` or `#134978` (dark blue) |
| Intro/overview content | `#ffffff` (white) |
| Features/benefits grid | `#f8f9fa` (grey) |
| Comparison tables | `#ffffff` (white) |
| Applications list | `#f8f9fa` (grey) |
| Publications showcase | `#ffffff` (white) or dark blue card |
| Testimonials | Dark (from component) or `#f8f9fa` (grey) |
| Technical details | `#ffffff` (white) |
| Related links | `#f8f9fa` (grey) |
| CTA section | `#008080` (teal) or `#0a253c` (dark blue) |
| BreedingSchemeArchitectCTA | Component has gradient background |
| LabSignalsSignup | `#f8f9fa` (grey) wrapper recommended |
| FAQ section | `#ffffff` (white) |
| Related services | `#f8f9fa` (grey) |

### Special Components

#### TrustBadges
- Built-in background: `#134978` (dark blue)
- Text: White with grey accents
- **Usage**: Only place on WHITE or GREY sections, never on blue hero sections

#### BreedingSchemeArchitectCTA
- Has built-in gradient background
- Counts as an ACCENT section
- Place between WHITE/GREY sections

#### LabSignalsSignup
- Transparent/adaptive component
- Wrap in a section with `#f8f9fa` (grey) background

#### Testimonials Section
- Has built-in dark background (variant="dark")
- Counts as an ACCENT section

### Audit Checklist for Each Page

1. Read the full page file
2. List all section backgrounds in order from top to bottom
3. Identify any consecutive same-colors (WHITE-WHITE or GREY-GREY)
4. Fix by changing every other section to alternate
5. Verify text color contrasts on each background
6. Check TrustBadges placement (must be on WHITE or GREY, not BLUE)
7. Ensure pattern flows: HERO → variety → variety → variety
8. Save changes

### Examples of Fixes

#### ❌ WRONG - Consecutive Same Colors
```
HERO (gradient)
→ WHITE (intro)
→ WHITE (features)  ← PROBLEM
→ WHITE (benefits)  ← PROBLEM
→ GREY (table)
→ GREY (applications) ← PROBLEM
```

#### ✅ CORRECT - Proper Alternation
```
HERO (gradient)
→ WHITE (intro)
→ GREY (features)
→ WHITE (benefits)
→ GREY (table)
→ WHITE (applications)
```

### Quick Reference Colors

Copy these exact values:
```css
/* White */
background: '#ffffff'
background: 'white'

/* Grey */
background: '#f8f9fa'
background: '#f7f7f7'

/* Teal Accent */
background: '#008080'

/* Dark Blue */
background: '#0a253c'
background: '#134978'

/* Hero Gradient */
background: 'linear-gradient(135deg, #0a253c 0%, #134978 100%)'
background: 'linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%)'
```

### Decision Tree

```
Is this the first section?
└─ YES → Use HERO gradient
└─ NO → Is previous section WHITE?
    └─ YES → Use GREY (#f8f9fa or #f7f7f7)
    └─ NO → Is previous section GREY?
        └─ YES → Use WHITE
        └─ NO → Is previous section DARK/ACCENT?
            └─ YES → Use WHITE
```

---

**Last Updated**: 2026-02-09
**Purpose**: Ensure consistent visual rhythm and WCAG AA compliance across all 154 pages
