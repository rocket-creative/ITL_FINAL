/**
 * Fix article links in Lab Signals content
 * - Convert genetargeting.com/exclusive-newsletter-content/ to /lab-signals/
 * - Convert genetargeting.com/ingenious-blog/ to /ingenious-blog/
 * - Fix internal service links (including subdomains like go.genetargeting.com)
 * - Remove Google Docs reference links or convert to footnotes
 */

// Known external tools/resources that should keep their original links
const externalToolPaths = [
  'mouse-breeding-planner-ingenious',
];

// Part titles to slug mapping for the humanized mouse series
const partTitleToSlug: Record<string, string> = {
  'part 1': 'how-humanized-mouse-models-are-transforming-pre-clinical-r-d',
  'part 2': 'inside-the-humanized-mouse-engineering-the-human-immune-system',
  'part 3': 'modeling-complexity-multi-cytokine-and-multi-organ-humanization',
  'part 4': 'model-vs-model-humanized-mice-compared-to-organoids-chips-and-ai',
  'part 5': 'translating-promise-into-practice-clinical-applications-cros-and-the-future',
};

export function fixArticleLinks(html: string): string {
  let fixed = html;

  // 1. Fix genetargeting.com/exclusive-newsletter-content/ links to /lab-signals/
  fixed = fixed.replace(
    /href="https?:\/\/(www\.)?genetargeting\.com\/exclusive-newsletter-content\/([^"]+)"/gi,
    'href="/lab-signals/$2"'
  );

  // 2. Fix genetargeting.com/ingenious-blog/ links to /ingenious-blog/
  fixed = fixed.replace(
    /href="https?:\/\/(www\.)?genetargeting\.com\/ingenious-blog\/([^"]+)"/gi,
    'href="/ingenious-blog/$2"'
  );

  // 3. Fix genetargeting.com service page links (including www subdomain)
  fixed = fixed.replace(
    /href="https?:\/\/(www\.)?genetargeting\.com\/([^"]+)"/gi,
    (match, www, path) => {
      // Keep external links that aren't service pages
      if (path.includes('http') || path.includes('.pdf') || path.includes('.doc')) {
        return match;
      }
      return `href="/${path}"`;
    }
  );

  // 3b. Fix go.genetargeting.com subdomain links - keep as external or handle specially
  fixed = fixed.replace(
    /href="https?:\/\/go\.genetargeting\.com\/([^"]+)"/gi,
    (match, path) => {
      // Check if this is a known external tool that should open in new tab
      const isExternalTool = externalToolPaths.some(toolPath => path.includes(toolPath));
      if (isExternalTool) {
        // Keep the original link but ensure it opens in new tab (handled by target="_blank" if present)
        return match;
      }
      // Convert other go.genetargeting.com links to relative paths
      return `href="/${path}"`;
    }
  );

  // 4. Convert Google Docs reference links to styled citation markers
  // These are visual indicators only - the original references were in external docs
  // Format: <a href="...docs.google.com...">[1]</a>
  fixed = fixed.replace(
    /<a href="https:\/\/docs\.google\.com\/[^"]+"\s*>\s*\[(\d+)\]\s*<\/a>/gi,
    '<sup class="citation-marker" title="Citation $1">$1</sup>'
  );

  // 4b. Also handle (1) format parentheses: <a href="...docs.google.com...">(1)</a>
  fixed = fixed.replace(
    /<a href="https:\/\/docs\.google\.com\/[^"]+"\s*>\s*\((\d+)\)\s*<\/a>/gi,
    '<sup class="citation-marker" title="Citation $1">$1</sup>'
  );

  // 4c. Handle <sup>[1</sup> wrapped format: <a href="..."><sup>[1</sup></a>
  fixed = fixed.replace(
    /<a href="https:\/\/docs\.google\.com\/[^"]+"\s*>\s*<sup>\s*\[(\d+)\s*<\/sup>\s*<\/a>/gi,
    '<sup class="citation-marker" title="Citation $1">$1</sup>'
  );

  // 4d. Handle complete sup wrapped: <a href="...docs.google.com..."><sup>[1]</sup></a>
  fixed = fixed.replace(
    /<a href="https:\/\/docs\.google\.com\/[^"]+"\s*>\s*<sup>\s*\[(\d+)\]\s*<\/sup>\s*<\/a>/gi,
    '<sup class="citation-marker" title="Citation $1">$1</sup>'
  );

  // 4e. Handle [1-4] range format references
  fixed = fixed.replace(
    /<a href="https:\/\/docs\.google\.com\/[^"]+"\s*>\s*\[(\d+)-(\d+)\]\s*<\/a>/gi,
    '<sup class="citation-marker" title="Citations $1-$2">$1-$2</sup>'
  );

  // 4f. Handle [1,2,3] comma-separated format
  fixed = fixed.replace(
    /<a href="https:\/\/docs\.google\.com\/[^"]+"\s*>\s*\[([\d,\s]+)\]\s*<\/a>/gi,
    '<sup class="citation-marker" title="Citations $1">$1</sup>'
  );

  // 5. Fix unlinked Part references - [Part X: Title] without proper links
  // Match patterns like [Part 3: Title] or [<strong>Part 3: Title</strong>]
  fixed = fixed.replace(
    /\[(<strong>)?Part\s*(\d+)[:\s]+([^\]<]+)(<\/strong>)?\]/gi,
    (match, strongOpen, partNum, title) => {
      const partKey = `part ${partNum}`;
      const slug = partTitleToSlug[partKey];
      if (slug) {
        const linkText = strongOpen ? `<strong>Part ${partNum}: ${title.trim()}</strong>` : `Part ${partNum}: ${title.trim()}`;
        return `<a href="/lab-signals/${slug}" class="article-series-link">${linkText}</a>`;
      }
      return match;
    }
  );

  // 6. Fix "In Part X" references that aren't linked
  fixed = fixed.replace(
    /In Part (\d+) of this series/gi,
    (match, partNum) => {
      const partKey = `part ${partNum}`;
      const slug = partTitleToSlug[partKey];
      if (slug) {
        return `In <a href="/lab-signals/${slug}" class="article-series-link">Part ${partNum}</a> of this series`;
      }
      return match;
    }
  );

  // 7. Fix "(discussed in part X)" references
  fixed = fixed.replace(
    /\(discussed in part (\d+)\)/gi,
    (match, partNum) => {
      const partKey = `part ${partNum}`;
      const slug = partTitleToSlug[partKey];
      if (slug) {
        return `(discussed in <a href="/lab-signals/${slug}" class="article-series-link">Part ${partNum}</a>)`;
      }
      return match;
    }
  );

  // 8. Fix "In part X we" references
  fixed = fixed.replace(
    /In part (\d+) we/gi,
    (match, partNum) => {
      const partKey = `part ${partNum}`;
      const slug = partTitleToSlug[partKey];
      if (slug) {
        return `In <a href="/lab-signals/${slug}" class="article-series-link">Part ${partNum}</a> we`;
      }
      return match;
    }
  );

  return fixed;
}

export default fixArticleLinks;
