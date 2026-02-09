# Legacy Content Directory

This directory contains extracted content from the legacy genetargeting.com website.

## File Naming Convention

Each file follows this pattern:
- `{slug}.md` - For top-level pages (e.g., `knockout-mouse-models.md`)
- `{category}__{slug}.md` - For nested pages (e.g., `exclusive-newsletter-content__how-a-knockout-mouse-is-made.md`)

## File Structure

Each legacy markdown file contains:

```markdown
---
legacy_url: "https://www.genetargeting.com/path"
new_build_url: "/path/"
url_handling: "reuse" | "redirect"
link_from: ["/related-page-1/", "/related-page-2/"]
extracted_date: "2026-01-11"
---

# Page Title

Main content extracted verbatim from the legacy site...
```

## Notes

- Content is preserved VERBATIM - do not edit the text
- Only styling/layout should use new components
- If url_handling is "redirect", set up 301 redirect from legacy URL to new_build_url
