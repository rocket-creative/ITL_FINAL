# ITL Breeding Scheme Architect Tool
## Team Documentation Package

**Created:** January 14, 2026  
**Status:** Ready for Development  
**Location:** `/resources/breeding-scheme-architect` (New page under Resources)  
**Priority:** Phase 2 Implementation

---

## Executive Summary

### What We're Building

A free, interactive **Breeding Scheme Architect** tool that helps researchers plan complex single allele breeding strategies. This fills a genuine gap in the market: no existing tool helps PIs visualize and plan double, triple, or quadruple mutant breeding schemes involving Cre/lox systems, reporters, and disease models.

### Why This Matters for ITL

1. **Lead Generation** — Positions ITL as the consultative expert who helps plan the entire project lifecycle
2. **Differentiation** — JAX/Taconic sell mice but don't provide planning tools
3. **Trust Building** — Free utility that demonstrates scientific expertise before any sales conversation
4. **Natural Conversion** — "Need a custom model to execute this scheme? Request a consultation"

### Market Gap Evidence

From JAX's own blog: *"Explaining these schemes can be difficult, and I swear that I can sometimes feel customers' eyes cross while I'm trying to explain them over the telephone."*

JAX offers a 2-3 hour mini-course on breeding strategies because it's so confusing. That's a signal of unmet need.

**Existing tools only handle:**
- Simple single-locus Mendelian crosses
- Colony tracking (what you HAVE, not what you NEED)
- Statistical breeding number calculations

**No tool exists for:**
- Breeding path visualization
- Generation-by-generation cross planning
- Time/mice/cost estimation for complex schemes
- Handling linked alleles, embryonic lethal genotypes, or germline Cre issues

---

## Feature Specifications

### Core Functionality

#### 1. Allele Input System
Users define their starting alleles:
- Knockout alleles (conventional, conditional)
- Floxed alleles (tm1c, etc.)
- Cre driver alleles (tissue-specific, inducible)
- Reporter alleles (tdTomato, GFP, LacZ)
- Humanized alleles
- Point mutation knockins

**Input Fields per Allele:**
- Gene name
- Allele type (dropdown)
- Chromosomal location (optional but important for linkage)
- Starting genotype (homozygous, heterozygous, hemizygous)
- Strain background
- Sex-linked? (Y/N)

#### 2. Target Genotype Definition
Users specify what they need:
- Experimental genotype(s)
- Control genotype(s)
- Number needed per genotype
- Sex requirements

#### 3. Breeding Path Calculation Engine
The core algorithm that:
- Calculates optimal breeding pairs at each generation
- Handles Mendelian inheritance correctly
- Identifies "fix the common allele" opportunities
- Warns about embryonic lethal combinations
- Flags germline Cre risks
- Accounts for linked alleles on same chromosome

#### 4. Visual Output
- Generation-by-generation breeding diagram
- Punnett square outcomes at each cross
- Expected genotype ratios
- Which mice to keep as breeders vs experimental vs cull

#### 5. Resource Estimation
Integration with statistical calculations (similar to University of Zurich breedingCalculator):
- Estimated breeding pairs needed
- Estimated total mice generated
- Estimated cage requirements
- Timeline to experimental cohorts (weeks/months)
- Cost estimate based on per diem rates

### Secondary Features

#### Cre Driver Selector (Phase 2)
- "I want to knock out gene X in tissue Y"
- Searchable database of common Cre lines
- Expression pattern information
- Links to IMPC/MGI data

#### Save & Share Projects
- Account creation (email-based)
- Save breeding schemes
- Export as PDF
- Share link with collaborators

#### ITL Integration Points
- "Request Consultation" CTA throughout
- "Order this model from ITL" integration
- Pre-filled quote request with allele details

---

## Design System Compliance

### Following ITL Website Standards

All designs must comply with the established ITL design system. Reference these files:
- `DESIGN-SYSTEM.md` — Color tokens, typography, spacing
- `PAGE-BUILD-INSTRUCTIONS.md` — Build rules and component usage
- `fullCSS.md` — Exact CSS values
- ITL Content System Skill — Terminology and tone

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--dk-blue` | `#0a253c` | Dark backgrounds, headers |
| `--nav-blue` | `#134978` | Primary buttons, accents |
| `--teal` | `#008080` | CTAs, highlights, active states |
| `--light-teal` | `#00d4d4` | Hover states, badges |
| `--white` | `#ffffff` | Backgrounds, text on dark |
| `--off-white` | `#f7f7f7` | Card backgrounds |
| `--gray-border` | `#e0e0e0` | Card borders, dividers |
| `--text-dark` | `#333` | Headings |
| `--text-gray` | `#666` | Body text |

### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Page H1 | Poppins | 2.8rem | 700 |
| Section H2 | Poppins | 2rem | 700 |
| Card H3 | Poppins | 1.1rem | 600 |
| Body | System UI | .9rem | 300 |
| Button | System UI | .85rem | 500 |
| Form Labels | System UI | .85rem | 500 |
| Input Text | System UI | .9rem | 400 |

### Layout Constraints

- Max content width: `1000px`
- Page wrapper: `maxWidth: '1200px', margin: '0 auto'`
- Section padding: `60px 20px`
- Hero padding: `80px 20px 60px`
- Card gap: `24px` (gap-6)
- Tool container: centered, max-width 1000px

### Component Standards

#### Cards
```css
backgroundColor: '#f7f7f7'
padding: '25px'
border: '.5px solid #e0e0e0'
borderTop: '4px solid #008080'
/* Hover: -translate-y-2, shadow-lg */
```

#### Buttons
```css
/* Primary */
backgroundColor: '#008080'
color: 'white'
padding: '10px 20px'
minWidth: '160px'
fontSize: '.85rem'
fontWeight: 500

/* Secondary (outline) */
backgroundColor: 'transparent'
color: '#008080'
padding: '10px 20px'
border: '2px solid #008080'
```

#### Form Inputs
```css
border: '1px solid #e0e0e0'
borderRadius: '4px'
padding: '12px 16px'
fontSize: '.9rem'
/* Focus: border-color: #008080 */
```

#### Dropdowns/Selects
```css
/* Same as inputs plus: */
appearance: 'none'
backgroundImage: /* chevron icon */
backgroundPosition: 'right 12px center'
```

### Icons
- Use Lucide React icons (already in project)
- Size: 20-24px for cards, 16-18px for inline
- Color: white on dark backgrounds, teal or gray on light
- NO emojis anywhere

### Animations
- Scroll animations: GSAP with no per-element delay
- Hover transitions: `transition-all duration-300`
- Card hover: `-translate-y-2 shadow-lg`
- Button hover: `-translate-y-1 shadow-md`

---

## Terminology Compliance

### Required Terms (from ITL Content System)

| Use This | Not This |
|----------|----------|
| knockout | knock-out |
| knockin | knock-in |
| LoxP sites | LoxP sites |
| Cre recombinase | cre recombinase |
| FRT sites | frt sites |
| germline transmission | germ-line transmission |
| pre germline characterization | pre-germline characterization |
| conditional knockout | conditional knock-out |
| tissue specific | tissue-specific |
| study ready | study-ready |

### Prohibited Terms
- "cutting edge" or "state of the art"
- "validated" (use "characterized" or "confirmed")
- "best" or "leading"
- "Purchase today" (use "Request consultation")
- NO HYPHENS in copy (client preference)

### Company Name
- Always: "ingenious targeting laboratory" (lowercase)
- Never abbreviate to "ITL" in visible text (code comments OK)

---

## Page Structure

### URL
`/breeding-scheme-architect`

### Navigation Location
Resources dropdown → Breeding Scheme Architect

### Page Sections

```
├── Navigation (UXUIDCNavigation component)
├── Announcement Bar
├── Hero Section
│   ├── Badge: "Free Research Tool"
│   ├── H1: Plan Complex Breeding Schemes
│   ├── Intro paragraph
│   └── CTA buttons
├── Tool Interface Section
│   ├── Allele Input Panel
│   ├── Target Genotype Panel
│   ├── Calculate Button
│   └── Results Display Area
├── How It Works Section
│   ├── Step 1: Define Your Alleles
│   ├── Step 2: Set Target Genotypes
│   ├── Step 3: Generate Breeding Plan
│   └── Step 4: Export or Consult
├── Why Use This Tool Section
│   ├── Benefit cards (4)
│   └── Testimonial (if applicable)
├── Start Your Project CTA
│   └── UXUIDCStartProjectCTA component
├── FAQ Section
│   └── UXUIDCAnimatedFAQ component
├── Related Resources Section
│   ├── Link to Cre Lox System page
│   ├── Link to Conditional vs Conventional Guide
│   ├── Link to Model Generation Timeline
│   └── Link to Request Quote
├── Footer (UXUIDCFooter component)
└── Cookie Consent
```

---

## Cursor AI Prompts

### Prompt 1: Page Scaffold

```
Create a new page for the ITL website at /breeding-scheme-architect

This is an interactive breeding scheme planning tool for mouse genetics researchers.

CRITICAL REQUIREMENTS:
1. Follow ALL rules in DESIGN-SYSTEM.md exactly
2. Follow ALL rules in PAGE-BUILD-INSTRUCTIONS.md
3. Use UXUIDC component naming convention
4. NO hyphens in any visible text (client requirement)
5. Company name is always lowercase "ingenious targeting laboratory"

PAGE STRUCTURE:
- Hero with gradient background (same as other pages)
- Badge: "Free Research Tool"
- H1: "Plan Complex Breeding Schemes"
- Intro: "Visualize breeding paths, calculate expected genotype ratios, and estimate time to experimental cohorts. This free tool helps researchers plan knockout, knockin, Cre lox, and humanized model breeding before starting a project."

Use these shared components:
- UXUIDCNavigation
- UXUIDCFooter
- UXUIDCStartProjectCTA (for teal CTA section)
- UXUIDCAnimatedFAQ

Create new component: UXUIDCBreedingSchemeArchitect in /components/UXUIDC/

Colors from design system:
- --dk-blue: #0a253c
- --teal: #008080
- --off-white: #f7f7f7

Section padding: 60px 20px
Max content width: 1000px
```

### Prompt 2: Tool Component Structure

```
Create the UXUIDCBreedingSchemeArchitect component with these sections:

1. ALLELE INPUT PANEL
   - "Add Allele" button (teal, outlined)
   - For each allele, show card with:
     - Gene name input (text)
     - Allele type dropdown:
       - Conventional knockout
       - Conditional knockout (floxed)
       - Cre driver (constitutive)
       - Cre driver (inducible)
       - Reporter (fluorescent)
       - Reporter (LacZ)
       - Knockin (point mutation)
       - Knockin (cDNA)
       - Humanized
     - Chromosomal location input (optional, placeholder: "e.g., Chr 11")
     - Starting genotype dropdown:
       - Homozygous (+/+)
       - Heterozygous (+/-)
       - Hemizygous (for transgenes)
     - Remove button (X icon)
   - Allow up to 6 alleles

2. TARGET GENOTYPE PANEL
   - H3: "Define Target Genotypes"
   - Experimental genotype builder
   - Control genotype builder
   - Number needed inputs
   - Sex requirement dropdown (any, male only, female only, balanced)

3. CALCULATE SECTION
   - Large teal button: "Generate Breeding Plan"
   - Loading state with spinner

4. RESULTS DISPLAY
   - Initially hidden, shows after calculation
   - Breeding path visualization (generations)
   - Punnett square display
   - Statistics panel:
     - Estimated generations
     - Estimated total mice
     - Estimated breeding pairs
     - Timeline estimate
   - Export buttons: "Save as PDF", "Share Link"
   - CTA: "Request Project Consultation" (teal button)

STYLING:
- Cards: bg #f7f7f7, border .5px #e0e0e0, border-top 4px #008080
- Inputs: border 1px #e0e0e0, focus border-color #008080
- Buttons: follow design system exactly
- Use Lucide icons, never emojis
```

### Prompt 3: Breeding Logic Implementation

```
Create the breeding calculation logic in /lib/UXUIDC/breeding-calculator.ts

This module should handle:

1. MENDELIAN GENETICS
   - Single locus crosses (monohybrid)
   - Two locus crosses (dihybrid)
   - Multi-locus crosses (up to 6 alleles)
   - Punnett square generation

2. ALLELE INHERITANCE RULES
   - Autosomal dominant/recessive
   - Sex-linked inheritance
   - Hemizygous transgene inheritance (50% transmission)
   - Homozygous lethal detection

3. BREEDING PATH OPTIMIZATION
   - "Fix the common allele" strategy
   - Identify optimal cross order
   - Calculate generations to target
   - Handle linked alleles (same chromosome warning)

4. STATISTICS (following University of Zurich methodology)
   - Input: target genotype frequency, number needed, sex requirements
   - Output: breeding pairs needed, estimated total offspring, confidence level
   - Account for strain-specific litter sizes (C57BL/6: avg 6-8 pups)
   - Account for breeding efficiency (~80%)

5. SPECIAL CASES
   - Germline Cre warning (some Cre lines active in germline)
   - Embryonic lethal genotype detection
   - Inducible system considerations

Types:
```typescript
interface Allele {
  id: string;
  geneName: string;
  alleleType: AlleleType;
  chromosome?: string;
  startingGenotype: 'homozygous' | 'heterozygous' | 'hemizygous';
  isSexLinked: boolean;
}

interface BreedingPlan {
  generations: Generation[];
  estimatedMice: number;
  estimatedPairs: number;
  estimatedWeeks: number;
  warnings: string[];
}

interface Generation {
  number: number;
  crosses: Cross[];
  expectedOutcomes: GenotypeRatio[];
  keepersForNextGen: string[];
  experimentalMice: string[];
}
```

Use pure functions, no side effects. Include comprehensive JSDoc comments.
```

### Prompt 4: Visualization Component

```
Create the breeding path visualization component: UXUIDCBreedingPathDiagram

This displays the generation-by-generation breeding scheme visually.

REQUIREMENTS:
1. Vertical flow diagram (top to bottom)
2. Each generation as a horizontal band
3. Show:
   - Parent genotypes (left side)
   - Cross indicator (X symbol)
   - Offspring genotype ratios (right side)
   - Which offspring become next-gen breeders (highlighted)
   - Which offspring are experimental targets (different highlight)

STYLING:
- Use SVG or Canvas for the diagram
- Colors from design system:
  - Breeder mice: #134978 (nav-blue)
  - Experimental mice: #008080 (teal)
  - Cull/not needed: #999 (gray)
  - Lines connecting generations: #e0e0e0
- Labels: System UI font, .85rem
- Generation headers: Poppins, 1rem, weight 600

INTERACTIVITY:
- Hover on genotype to see details
- Click generation to expand Punnett square
- Responsive: stack vertically on mobile

ACCESSIBILITY:
- Include aria-labels
- Keyboard navigable
- Screen reader descriptions for diagram
```

### Prompt 5: FAQ Content

```
Add FAQ section to the breeding scheme architect page using UXUIDCAnimatedFAQ component.

FAQ Questions (5 required per ITL standards):

1. Q: "What breeding schemes can this tool plan?"
   A: "The breeding scheme architect handles complex single allele crosses including conditional knockouts with Cre lox systems, reporter alleles, humanized models, and combinations of up to six different alleles. It calculates optimal breeding paths, expected genotype ratios, and estimates time to experimental cohorts."

2. Q: "How does the tool calculate breeding pair numbers?"
   A: "The calculator uses established statistical methods similar to published research tools, accounting for Mendelian inheritance ratios, strain specific litter sizes (C57BL/6 averages 6 to 8 pups), breeding efficiency (approximately 80%), and your target sample size requirements."

3. Q: "Can I save my breeding schemes?"
   A: "Yes. Create a free account to save breeding schemes, export them as PDF documents, or generate shareable links for collaborators. Your saved schemes remain accessible for future reference and modification."

4. Q: "What happens if my alleles are on the same chromosome?"
   A: "The tool will alert you when alleles may be linked on the same chromosome, which affects recombination rates and inheritance patterns. In these cases, consult with our scientific team for guidance on optimal breeding strategies for linked alleles."

5. Q: "How do I get help with my specific breeding project?"
   A: "Request a project consultation to discuss your breeding scheme with our scientific team. We can help optimize your strategy, recommend appropriate Cre driver lines, and design custom models if needed. Consultation requests receive responses within one business day."

Note: NO HYPHENS in any text above. Verify before implementing.
```

### Prompt 6: Related Resources Section

```
Add a Related Resources section before the footer.

Section title: "Related Resources"
Subtitle: "Learn more about breeding strategies and model design"

Cards (4 in a row on desktop, stack on mobile):

1. Cre Lox System
   - Icon: Settings (Lucide)
   - Link: /cre-lox-system
   - Description: "Understanding Cre recombinase and LoxP sites for conditional gene targeting"

2. Conditional vs Conventional Guide
   - Icon: GitBranch (Lucide)
   - Link: /conditional-vs-conventional-guide
   - Description: "Choose the right knockout strategy for your research goals"

3. Model Generation Timeline
   - Icon: Clock (Lucide)
   - Link: /model-generation-timeline
   - Description: "Understand timelines from project start to study ready cohorts"

4. Request Project Consultation
   - Icon: MessageSquare (Lucide)
   - Link: /request-quote
   - Description: "Discuss your project with our scientific team"
   - Button style (teal background instead of outline)

Card styling per design system:
- bg: #f7f7f7
- border: .5px solid #e0e0e0
- border-top: 4px solid #008080 (alternate #134978)
- padding: 25px
- hover: -translate-y-2 shadow-lg
```

### Prompt 7: SEO and Schema

```
Add SEO metadata and schema.org structured data for the breeding scheme architect page.

META:
- Title: "Breeding Scheme Architect | Free Mouse Genetics Planning Tool | ingenious targeting laboratory"
- Description: "Plan complex single allele breeding schemes for knockout, knockin, Cre lox, and humanized mouse models. Free tool calculates breeding paths, genotype ratios, and time to experimental cohorts."

SCHEMA (add to page head):
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Breeding Scheme Architect",
  "description": "Interactive tool for planning complex mouse breeding schemes involving multiple alleles, Cre lox systems, and conditional knockouts",
  "url": "https://www.genetargeting.com/breeding-scheme-architect",
  "applicationCategory": "Scientific Tool",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "creator": {
    "@type": "Organization",
    "name": "ingenious targeting laboratory",
    "url": "https://www.genetargeting.com"
  }
}
```

Also add FAQ schema for the 5 FAQs.
```

---

## Technical Implementation Notes

### State Management
- Use React useState/useReducer for tool state
- Consider Zustand if state becomes complex
- Persist to localStorage for unsaved work recovery

### Form Validation
- Require at least 2 alleles to calculate
- Validate chromosome format if provided
- Warn if no target genotype defined

### Performance
- Lazy load the breeding calculator logic
- Use React.memo for visualization component
- Debounce calculation triggers

### Accessibility
- All form inputs have labels
- Error messages announced to screen readers
- Keyboard navigation for all interactive elements
- Color contrast meets WCAG AA

### Mobile Responsiveness
- Tool interface stacks vertically on mobile
- Touch-friendly input sizes (min 44px tap targets)
- Horizontal scroll for large diagrams with pinch-zoom

---

## Files to Create

```
/app/breeding-scheme-architect/
  page.tsx                    # Main page component
  
/components/UXUIDC/
  BreedingSchemeArchitect/
    index.tsx                 # Main tool component
    AlleleInputPanel.tsx      # Allele entry form
    TargetGenotypePanel.tsx   # Target definition
    ResultsDisplay.tsx        # Calculated results
    BreedingPathDiagram.tsx   # Visual diagram
    PunnettSquare.tsx         # Punnett square display
    StatisticsPanel.tsx       # Numbers/estimates
    
/lib/UXUIDC/
  breeding-calculator.ts      # Core calculation logic
  genetics-utils.ts           # Mendelian helpers
  types/breeding.ts           # TypeScript interfaces
```

---

## Testing Scenarios

### Test Case 1: Simple Conditional Knockout
- 2 alleles: Floxed gene + Cre driver
- Target: homozygous floxed, hemizygous Cre
- Expected: 2 generations, ~25% target frequency

### Test Case 2: Triple Mutant
- 3 alleles: Floxed gene + Cre driver + Reporter
- Target: homozygous floxed, hemizygous Cre, homozygous reporter
- Expected: 3-4 generations, complex path

### Test Case 3: Linked Alleles
- 2 alleles on same chromosome
- Should trigger warning about linkage

### Test Case 4: Embryonic Lethal
- Homozygous knockout that's lethal
- Should warn and adjust calculations

---

## Launch Checklist

- [ ] Page follows DESIGN-SYSTEM.md exactly
- [ ] No hyphens in any visible text
- [ ] Company name lowercase throughout
- [ ] All buttons match design system specs
- [ ] Cards have correct styling
- [ ] FAQ uses UXUIDCAnimatedFAQ component
- [ ] CTA uses UXUIDCStartProjectCTA component
- [ ] Navigation includes new page link
- [ ] Mobile responsive tested
- [ ] Accessibility audit passed
- [ ] Schema.org markup added
- [ ] Meta tags optimized
- [ ] Analytics tracking added
- [ ] Error states handled gracefully
- [ ] Loading states implemented

---

## Future Enhancements (Phase 3+)

1. **Account System** — Save/load breeding schemes
2. **PDF Export** — Professional report generation
3. **Cre Driver Database** — Searchable Cre line selector
4. **API Integration** — Connect to ITL quote system
5. **Collaboration** — Share schemes with lab members
6. **Import from Literature** — Parse breeding schemes from papers

---

## Questions for Team

1. Should we require account creation to use the tool, or allow anonymous use?
2. Do we want to capture emails as leads even for free tool usage?
3. Should the "Request Consultation" pre-fill with the breeding scheme details?
4. What strain backgrounds should we support beyond C57BL/6?
5. Should we include cost estimates based on ITL pricing?

---

**Document Version:** 1.0  
**Created By:** Claude (AI Assistant)  
**For:** Rocket Creative LLC / UXUI Design Corp  
**Client:** Ingenious Targeting Laboratory
