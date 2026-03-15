# Lab Signals Article Template

Use this template when adding new articles to `src/data/newsletterArticles.ts`.

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
- [ ] No hyphens in body copy
- [ ] No AI phrases ("dive into", "leverage", etc.)
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
