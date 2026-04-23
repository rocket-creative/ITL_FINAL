import type { ReactNode } from 'react';
import UXUIDCNavigation from '@/components/UXUIDC/Navigation';
import Footer from '@/components/UXUIDC/Footer';

export default function ResearcherSpotlightLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <UXUIDCNavigation />
      <style>{SPOTLIGHT_STYLES}</style>
      <main id="main-content" className="spotlight-scope">
        {children}
      </main>
      <Footer />
    </div>
  );
}

const SPOTLIGHT_STYLES = `
.spotlight-scope {
  --sp-ink: #111111;
  --sp-ink-soft: #2a2a2a;
  --sp-paper: #fafaf7;
  --sp-rule: #1a1a1a;
  --sp-rule-soft: #cfcfc8;
  --sp-accent: #134978;
  --sp-accent-ink: #008080;
  --sp-navy: #0a253c;
  --sp-navy-soft: #1a4a6e;
  --sp-font: var(--font-poppins), system-ui, "Helvetica Neue", Arial, sans-serif;
  background: var(--sp-paper);
  color: var(--sp-ink);
  font-family: var(--sp-font);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  padding: 0;
}

.spotlight-scope a:focus-visible,
.spotlight-scope button:focus-visible {
  outline: 2px solid var(--sp-accent);
  outline-offset: 3px;
}

.spotlight-scope em {
  font-style: italic;
}

.spotlight-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}
@media (max-width: 768px) {
  .spotlight-container { padding: 0 20px; }
}

/* ===== METADATA BAR ===== */
.spotlight-meta-bar {
  background: #666;
  padding: 18px 0;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: #ffffff;
}
.spotlight-meta-bar .spotlight-container {
  padding-top: 4px;
  padding-bottom: 4px;
}
.spotlight-meta-bar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
}
.spotlight-meta-bar-left {
  display: flex;
  gap: 32px;
  align-items: center;
  flex-wrap: wrap;
}
.spotlight-meta-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #ffffff;
}
.spotlight-meta-tag::before {
  content: "";
  width: 6px;
  height: 6px;
  background: #00d4d4;
  border-radius: 50%;
}

/* ===== HERO ===== */
.spotlight-hero {
  padding: 96px 0 64px;
  border-bottom: 1px solid var(--sp-rule);
}
.spotlight-hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 96px;
  align-items: end;
}
@media (max-width: 900px) {
  .spotlight-hero { padding: 56px 0 48px; }
  .spotlight-hero-grid { grid-template-columns: 1fr; gap: 48px; }
}
.spotlight-hero-label {
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--sp-ink-soft);
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 16px;
  font-weight: 600;
}
.spotlight-thin-rule {
  flex: 1;
  height: 1px;
  background: var(--sp-rule-soft);
}
.spotlight-hero-title {
  font-size: clamp(40px, 6vw, 88px);
  font-weight: 300;
  line-height: 0.98;
  letter-spacing: -0.025em;
  margin: 0 0 24px;
  color: var(--sp-ink);
}
.spotlight-hero-title em {
  font-style: italic;
  color: var(--sp-accent-ink);
  font-weight: 300;
}
.spotlight-hero-subtitle {
  font-size: 17px;
  line-height: 1.55;
  color: var(--sp-ink-soft);
  max-width: 520px;
  font-weight: 400;
}

.spotlight-hero-aside {
  font-size: 13px;
  line-height: 1.6;
}
.spotlight-hero-aside-item {
  padding: 20px 0;
  border-top: 1px solid var(--sp-rule-soft);
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 24px;
}
.spotlight-hero-aside-item:last-child {
  border-bottom: 1px solid var(--sp-rule-soft);
}
.spotlight-hero-aside-label {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--sp-ink-soft);
  font-weight: 600;
}
.spotlight-hero-aside-value {
  color: var(--sp-ink);
}
.spotlight-hero-aside-value a {
  color: var(--sp-accent);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}
@media (max-width: 500px) {
  .spotlight-hero-aside-item { grid-template-columns: 1fr; gap: 6px; }
}

/* ===== CITATION ===== */
.spotlight-citation {
  padding: 40px 0;
  border-bottom: 1px solid var(--sp-rule);
}
.spotlight-citation-inner {
  display: grid;
  grid-template-columns: 180px 1fr auto;
  gap: 48px;
  align-items: baseline;
}
@media (max-width: 900px) {
  .spotlight-citation-inner { grid-template-columns: 1fr; gap: 16px; }
}
.spotlight-citation-label {
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--sp-ink-soft);
  font-weight: 600;
}
.spotlight-citation-text {
  font-size: 15px;
  line-height: 1.6;
  color: var(--sp-ink);
  font-weight: 400;
}
.spotlight-citation-text em {
  font-style: italic;
}
.spotlight-citation-action {
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sp-accent);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 2px;
  white-space: nowrap;
  font-weight: 600;
}
.spotlight-citation-action:hover {
  color: var(--sp-navy);
}

/* ===== BODY ===== */
.spotlight-body-section {
  padding: 96px 0;
  border-bottom: 1px solid var(--sp-rule);
}
.spotlight-body-grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 96px;
  align-items: start;
}
@media (max-width: 900px) {
  .spotlight-body-section { padding: 64px 0; }
  .spotlight-body-grid { grid-template-columns: 1fr; gap: 32px; }
}
.spotlight-body-label {
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--sp-ink-soft);
  position: sticky;
  top: 32px;
  font-weight: 600;
}
.spotlight-body-content {
  max-width: 680px;
}
.spotlight-body-content h2 {
  font-size: clamp(28px, 3.5vw, 36px);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.015em;
  margin: 0 0 32px;
  color: var(--sp-ink);
}
.spotlight-body-content h2 em {
  font-style: italic;
  color: var(--sp-accent-ink);
}
.spotlight-body-content h3 {
  font-size: 13px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--sp-ink-soft);
  margin: 48px 0 16px;
  font-weight: 600;
}
.spotlight-body-content p {
  font-size: 19px;
  line-height: 1.55;
  margin: 0 0 24px;
  color: var(--sp-ink-soft);
  font-weight: 400;
}
.spotlight-body-content p em {
  font-style: italic;
}
.spotlight-body-content p strong {
  color: var(--sp-ink);
  font-weight: 600;
}
.spotlight-body-content p.spotlight-body-first::first-letter {
  font-size: 68px;
  float: left;
  line-height: 0.85;
  padding-right: 12px;
  padding-top: 6px;
  color: var(--sp-ink);
  font-weight: 300;
}

/* ===== PULLQUOTE ===== */
.spotlight-pullquote {
  margin: 64px 0;
  padding: 40px 0;
  border-top: 1px solid var(--sp-rule);
  border-bottom: 1px solid var(--sp-rule);
}
.spotlight-pullquote blockquote {
  font-size: 28px;
  line-height: 1.25;
  font-style: italic;
  color: var(--sp-ink);
  margin: 0 0 16px;
  font-weight: 300;
}
.spotlight-pullquote cite {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--sp-ink-soft);
  font-style: normal;
  font-weight: 600;
}

/* ===== MODEL SECTION ===== */
.spotlight-model-section {
  padding: 96px 0;
  border-bottom: 1px solid var(--sp-navy);
  background:
    radial-gradient(ellipse at 12% 18%, rgba(35, 132, 218, 0.18) 0%, transparent 55%),
    radial-gradient(ellipse at 85% 82%, rgba(0, 128, 128, 0.14) 0%, transparent 60%),
    linear-gradient(135deg, #041a2e 0%, #0a253c 35%, #0f3657 70%, #061827 100%);
  color: #ffffff;
  position: relative;
  overflow: hidden;
}
.spotlight-model-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.25'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.08;
  pointer-events: none;
}
.spotlight-model-section > * {
  position: relative;
  z-index: 1;
}
.spotlight-model-section-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}
@media (max-width: 900px) {
  .spotlight-model-section { padding: 64px 0; }
  .spotlight-model-section-inner { padding: 0 20px; }
}
.spotlight-model-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
}
@media (max-width: 900px) {
  .spotlight-model-grid { grid-template-columns: 1fr; gap: 32px; }
}
.spotlight-eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--sp-ink-soft);
  font-weight: 600;
  margin-bottom: 24px;
}
.spotlight-model-section .spotlight-eyebrow {
  color: rgba(255, 255, 255, 0.7);
}
.spotlight-arrow-diag {
  display: inline-block;
  transform: rotate(-45deg);
  font-size: 14px;
}
.spotlight-arrow {
  display: inline-block;
  font-size: 14px;
  transition: transform 0.2s ease;
}
.spotlight-model-heading-col h2 {
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: -0.015em;
  margin: 0;
  color: #ffffff;
}
.spotlight-model-cta {
  margin-top: 32px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #ffffff;
  text-decoration: none;
  border-bottom: 1px solid #ffffff;
  padding-bottom: 4px;
  transition: gap 0.2s ease;
  font-weight: 600;
}
.spotlight-model-cta:hover { gap: 20px; }
.spotlight-model-detail-rows { font-size: 14px; }
.spotlight-model-detail-row {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 24px;
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.92);
}
.spotlight-model-detail-row:last-child {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.spotlight-model-detail-label {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
}
.spotlight-model-detail-value em {
  font-style: italic;
  color: #ffffff;
}
@media (max-width: 500px) {
  .spotlight-model-detail-row { grid-template-columns: 1fr; gap: 8px; }
}

/* ===== RESEARCHER CARD ===== */
.spotlight-researcher-section {
  padding: 96px 0;
  border-bottom: 1px solid var(--sp-rule);
}
.spotlight-researcher-grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 96px;
  align-items: start;
}
@media (max-width: 900px) {
  .spotlight-researcher-section { padding: 64px 0; }
  .spotlight-researcher-grid { grid-template-columns: 1fr; gap: 32px; }
}
.spotlight-researcher-card {
  max-width: 680px;
}
.spotlight-researcher-card h2 {
  font-size: clamp(28px, 3.5vw, 36px);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.015em;
  margin: 0 0 24px;
  color: var(--sp-ink);
}
.spotlight-researcher-card p {
  font-size: 18px;
  line-height: 1.55;
  color: var(--sp-ink-soft);
  margin: 0 0 20px;
  font-weight: 400;
}
.spotlight-researcher-links {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  font-size: 13px;
}
.spotlight-researcher-link-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 24px;
  padding: 14px 0;
  border-top: 1px solid var(--sp-rule-soft);
}
.spotlight-researcher-link-row:last-child {
  border-bottom: 1px solid var(--sp-rule-soft);
}
.spotlight-researcher-link-label {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--sp-ink-soft);
  font-weight: 600;
}
.spotlight-researcher-link-row a {
  color: var(--sp-accent);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}
@media (max-width: 500px) {
  .spotlight-researcher-link-row { grid-template-columns: 1fr; gap: 6px; }
}

/* ===== FOOTER CTA ===== */
.spotlight-footer-cta {
  padding: 128px 0;
  border-bottom: 1px solid var(--sp-rule);
}
.spotlight-footer-cta-inner {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 64px;
  align-items: end;
}
@media (max-width: 768px) {
  .spotlight-footer-cta { padding: 80px 0; }
  .spotlight-footer-cta-inner { grid-template-columns: 1fr; gap: 32px; }
}
.spotlight-footer-cta h2 {
  font-size: clamp(32px, 5vw, 64px);
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: -0.015em;
  margin: 0;
  max-width: 800px;
  color: var(--sp-ink);
}
.spotlight-primary-link {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #ffffff;
  text-decoration: none;
  padding: 20px 32px;
  border: 1px solid #008080;
  background: #008080;
  font-weight: 600;
  transition: background 0.2s ease, color 0.2s ease;
  white-space: nowrap;
}
.spotlight-primary-link:hover {
  background: transparent;
  color: #008080;
}

/* ===== INDEX CARDS ===== */
.spotlight-index-hero {
  padding: 96px 0 64px;
  border-bottom: 1px solid var(--sp-rule);
}
@media (max-width: 900px) {
  .spotlight-index-hero { padding: 64px 0 48px; }
}
.spotlight-index-hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 96px;
  align-items: end;
}
@media (max-width: 900px) {
  .spotlight-index-hero-grid { grid-template-columns: 1fr; gap: 32px; }
}
.spotlight-index-hero h1 {
  font-size: clamp(48px, 6vw, 88px);
  font-weight: 300;
  line-height: 0.98;
  letter-spacing: -0.025em;
  margin: 0;
  color: var(--sp-ink);
}
.spotlight-index-hero p {
  font-size: 17px;
  line-height: 1.55;
  color: var(--sp-ink-soft);
  max-width: 520px;
  margin: 0;
}
.spotlight-index-list {
  padding: 0;
}
.spotlight-index-card {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 48px;
  padding: 48px 0;
  border-bottom: 1px solid var(--sp-rule-soft);
  text-decoration: none;
  color: var(--sp-ink);
  transition: padding-left 0.2s ease, border-color 0.2s ease;
  position: relative;
}
.spotlight-index-card:first-child { border-top: 1px solid var(--sp-rule-soft); }
.spotlight-index-card:hover,
.spotlight-index-card:focus-visible {
  padding-left: 16px;
  outline: none;
}
.spotlight-index-card:hover .spotlight-index-title,
.spotlight-index-card:focus-visible .spotlight-index-title { color: var(--sp-accent); }
@media (max-width: 768px) {
  .spotlight-index-card { grid-template-columns: 1fr; gap: 16px; padding: 32px 0; }
}
.spotlight-index-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
}
.spotlight-index-number {
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--sp-accent);
  font-weight: 600;
}
.spotlight-index-tag {
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--sp-ink-soft);
  font-weight: 600;
}
.spotlight-index-pi { color: var(--sp-ink); font-weight: 500; padding-top: 4px; }
.spotlight-index-institution { color: var(--sp-ink-soft); }
.spotlight-index-body { display: flex; flex-direction: column; gap: 12px; }
.spotlight-index-title {
  font-size: clamp(24px, 2.5vw, 28px);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.01em;
  margin: 0;
  color: var(--sp-ink);
  transition: color 0.2s ease;
}
.spotlight-index-title em {
  font-style: italic;
  color: var(--sp-accent-ink);
}
.spotlight-index-subtitle {
  font-size: 15px;
  line-height: 1.55;
  color: var(--sp-ink-soft);
  max-width: 560px;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.spotlight-index-cta {
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sp-accent);
  font-weight: 600;
  padding-top: 8px;
}

/* ===== NOT FOUND ===== */
.spotlight-notfound {
  padding: 160px 0;
  text-align: center;
}
.spotlight-notfound h1 {
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 300;
  letter-spacing: -0.02em;
  margin: 0 0 24px;
  color: var(--sp-ink);
}
.spotlight-notfound p {
  font-size: 17px;
  color: var(--sp-ink-soft);
  margin: 0 0 32px;
}
.spotlight-notfound a {
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sp-accent);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 2px;
  font-weight: 600;
}
`;
