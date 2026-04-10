# Lab Signals Article Template

Use this template when adding new articles to `src/data/newsletterArticles.ts`.

## Client manuscript vs house style

When the team provides a **final** article as Markdown or Word, treat it as the source of truth: convert to HTML and stage it **without**:

- Rewriting terminology for unrelated site rules (for example keep **CAR-T**, **off-target**, **first-in-human**).
- **Merging duplicate references**, renumbering citations, or dropping bibliography entries that are not cited in the body, unless the client explicitly requests those edits.
- Applying global “no hyphen” rules from other project docs; those do **not** apply to approved Lab Signals body copy.

Optional hyphen or tone rules apply only to **internally drafted** Lab Signals copy, and only when the team agrees.

## Template

```typescript
  {
    id: "SLUG-HERE",
    slug: "SLUG-HERE",
    title: "FULL ARTICLE TITLE",
    subtitle: "SHORT SUBTITLE OR EMPTY STRING",
    description: "150-160 CHARACTER SEO DESCRIPTION THAT SUMMARIZES THE ARTICLE CONTENT AND INCLUDES KEY TERMS.",
    category: "CATEGORY",
    relatedPage: "/RELATED-SERVICE-PAGE",
    body: `BODY HTML HERE`,
    publishedAt: "YYYY-MM-DD",
  },
```

## Body HTML Structure

```html
<p>Opening paragraph that introduces the topic and hooks the reader. This should be 2-3 sentences that establish context and relevance.</p>

<h3>First Major Section</h3>

<p>Content for this section. Use <strong>bold</strong> for emphasis on key terms. Use <em>italics</em> for scientific names, gene names, or journal titles.</p>

<p>Another paragraph with a citation reference<sup>[1]</sup>. Multiple citations look like this<sup>[2,3]</sup>.</p>

<h4>Subsection If Needed</h4>

<p>More detailed content under the subsection.</p>

<ul>
<li>Bullet point for listing items</li>
<li>Another bullet point</li>
<li>Third point with <strong>emphasis</strong></li>
</ul>

<h3>Second Major Section</h3>

<p>Continue with more content organized logically.</p>

<ol>
<li>Numbered list for sequential steps</li>
<li>Second step</li>
<li>Third step</li>
</ol>

<h3>Conclusion</h3>

<p>Wrap up the article with key takeaways and implications for researchers.<sup>[4]</sup></p>

<div class="lab-signals-references"><p><strong>References</strong></p><ol>
<li>Author A, et al. Title of first reference. <em>Journal Name.</em> Year;vol(issue):pages.</li>
<li>Author B, et al. Title of second reference. <em>Journal Name.</em> Year;vol(issue):pages.</li>
<li>Author C, et al. Title of third reference. <em>Journal Name.</em> Year;vol(issue):pages.</li>
<li>Author D, et al. Title of fourth reference. <em>Journal Name.</em> Year;vol(issue):pages.</li>
</ol></div>
```

## Checklist Before Adding

- [ ] Slug is kebab-case and unique
- [ ] Description is 150-160 characters
- [ ] Category is from approved list
- [ ] Related page URL is valid
- [ ] publishedAt is future date for staging
- [ ] Body copy matches approved manuscript (no hyphen stripping or reference consolidation unless the client requested it)
- [ ] Citation numbers and reference list match the source (including duplicate numbers and extra bibliography lines)
- [ ] No AI phrases ("dive into", "leverage", etc.) when drafting from scratch only
- [ ] Citations use `<sup>[#]</sup>` format
- [ ] References match source document format
- [ ] All HTML tags properly closed

## After Adding

Output these URLs for Kristen:

```
For the [TITLE] article releasing [DAY], [MONTH] [DATE]:

Early preview (password: KristenITL3165!):
https://www.genetargeting.com/lab-signals/SLUG

Team bypass (no password needed):
https://www.genetargeting.com/lab-signals/SLUG?preview=itl-team-preview
```
