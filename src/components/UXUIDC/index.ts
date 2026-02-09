/**
 * |UXUIDC| Component Library Index
 * @version 1.1.0
 * @created 2026
 * @description Central export for all UXUIDC components
 */

// Layout Components
export { default as UXUIDCNavigation } from './Navigation';
export { default as UXUIDCFooter } from './Footer';
export { default as UXUIDCAnnouncementBar } from './AnnouncementBar';

// Hero & Sections
export { default as UXUIDCHeroSection } from './HeroSection';
export { default as UXUIDCFeatureGrid } from './FeatureGrid';
export { default as UXUIDCWorkflowSection } from './WorkflowSection';
export { default as UXUIDCTrustBadges } from './TrustBadges';

// Cards & Lists
export { default as UXUIDCServiceCard, UXUIDCServiceCardGrid } from './ServiceCard';
export { default as UXUIDCTestimonialCard, UXUIDCTestimonialsSection } from './TestimonialCard';
export { PublicationCard, PublicationList } from './PublicationCard';
export type { PublicationData } from './PublicationCard';

// Reusable Animated Components
export { default as UXUIDCAnimatedCounter } from './AnimatedCounter';
export { default as UXUIDCAnimatedFAQ } from './AnimatedFAQ';
export { default as UXUIDCStartProjectCTA } from './StartProjectCTA';
export { default as BreedingSchemeArchitectCTA } from './BreedingSchemeArchitectCTA';

// Glossary Components
export { 
  UXUIDCGlossarySection,
  knockoutTerms,
  conditionalTerms,
  knockinTerms,
  humanizationTerms,
  inducibleTerms,
  transgenicTerms
} from './GlossarySection';

// Glossary Term Links (New - Phase 3)
export { 
  GlossaryTermLink, 
  GlossaryHighlight,
  getTermBySlug as getGlossaryTerm
} from './GlossaryTermLink';

// Icons - Flat SVG icons (no emojis)
export * from './Icons';

// Legacy Content Links
export { default as LegacyInfoLink } from './LegacyInfoLink';

// Resource Links
export { 
  default as UXUIDCResourceLinks,
  conditionalKnockoutResources,
  humanizationResources,
  pointMutationResources,
  reporterResources,
  rosa26Resources,
  ratModelResources,
  creResources,
  breedingResources,
  pricingResources,
  conditionalReversibleResources
} from './ResourceLinks';

// Lab Signals Newsletter
export { 
  default as LabSignalsSignup,
  labSignalsArticles,
  getRelatedLabSignalsArticles
} from './LabSignalsSignup';

// Forms
export { default as FlodeskForm } from './FlodeskForm';
export { default as HubSpotForm } from './HubSpotForm';

// Newsletter Components
export { default as NewsletterGate } from './NewsletterGate';
export { default as SocialShare } from './SocialShare';

// Catalog Search
export { default as CatalogSearch } from './CatalogSearch';

// Scientific Diagram Placeholders
export { 
  ScientificDiagramPlaceholder,
  type DiagramPlaceholderProps 
} from './ScientificDiagramPlaceholder';

// Utilities
export { default as UXUIDCCookieConsent } from './CookieConsent';
