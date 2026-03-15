# Lab Signals Reference Formats

This document shows the exact reference formats used in Lab Signals articles. **Always match the format from the source document.**

## Format A: Simple (No Links)

Use when the source document does not include DOI links or URLs.

### Example (FDA Modernization Act article)

```html
<div class="lab-signals-references"><p><strong>References</strong></p><ol>
<li>FDA Modernization Act of 2022, Pub L No. 117-328 (2022).</li>
<li>U.S. Food and Drug Administration. <em>Roadmap to Reducing Animal Testing in Preclinical Safety Studies.</em> 2025.</li>
<li>U.S. Food and Drug Administration. <em>Investigational New Drug Application (IND) Guidance for Industry.</em></li>
<li>National Institutes of Health. NIH statement on advancing human-based research technologies and NAMs. 2025.</li>
<li>Low LA, Mummery C, Berridge BR, Austin CP, Tagle DA. Organs-on-chips: into the next decade. <em>Nat Rev Drug Discov.</em> 2021;20:345-361.</li>
<li>Clevers H. Modeling development and disease with organoids. <em>Cell.</em> 2016;165(7):1586-1597.</li>
</ol></div>
```

### Pattern

```
Author(s). Title. <em>Journal.</em> Year;vol(issue):pages.
```

## Format B: With DOI Links

Use when DOIs are provided in the source document.

### Example (Inducible Gene Expression article)

```html
<div class="lab-signals-references"><p><strong>References</strong></p><ol>
<li>Soliman MM, et al. Small Molecule- and Cell Contact-Inducible Systems for Controlling Expression and Differentiation in Stem Cells. <em>Development</em>. 2025;152(11):dev204505. <a href="https://doi.org/10.1242/dev.204505" target="_blank" rel="noopener noreferrer">doi:10.1242/dev.204505</a></li>
<li>De Carluccio G, Fusco V, Di Bernardo D. Engineering a Synthetic Gene Circuit for High-Performance Inducible Expression in Mammalian Systems. <em>Nat Commun</em>. 2024;15:3311. <a href="https://doi.org/10.1038/s41467-024-47592-y" target="_blank" rel="noopener noreferrer">doi:10.1038/s41467-024-47592-y</a></li>
</ol></div>
```

### Pattern

```
Author(s). Title. <em>Journal</em>. Year;vol(issue):pages. <a href="https://doi.org/..." target="_blank" rel="noopener noreferrer">doi:...</a>
```

## Format C: Older Style (Paragraph-Based)

Some older articles use paragraph tags with bold reference numbers. **Do not use this format for new articles.**

### Example (Legacy format - do not use)

```html
<p><strong>[1]</strong> Author names. Title. Journal. Year;vol:pages. doi:... PMID:...</p>
<p><strong>[2]</strong> Author names. Title. Journal. Year;vol:pages. doi:... PMID:...</p>
```

## Key Rules

1. **Match the source** - If the source doc has no DOIs, don't add them
2. **Use the wrapper** - Always wrap in `<div class="lab-signals-references">`
3. **Use ordered list** - References go in `<ol><li>` tags
4. **Italicize journals** - Use `<em>Journal Name</em>`
5. **Link attributes** - Always include `target="_blank" rel="noopener noreferrer"` on links

## Journal Abbreviations

| Full Name | Abbreviation |
|-----------|--------------|
| Nature Communications | Nat Commun |
| Nature Reviews Drug Discovery | Nat Rev Drug Discov |
| Nature Reviews Immunology | Nat Rev Immunol |
| Nature Medicine | Nat Med |
| Cell | Cell |
| Science | Science |
| Proceedings of the National Academy of Sciences | Proc Natl Acad Sci USA |
| Journal of Clinical Investigation | J Clin Invest |
| Annual Review of Pathology | Annu Rev Pathol |
| Trends in Biotechnology | Trends Biotechnol |
| Frontiers in Drug Discovery | Front Drug Discov |
| Cancer Journal | Cancer J |
