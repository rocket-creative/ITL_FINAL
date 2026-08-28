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
export { ThankYouPageShell } from './ThankYouPageShell';

// Hero & Sections
export { default as UXUIDCPageHero } from './PageHero';
export type { PageHeroProps } from './PageHero';
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
export { default as UXUIDCDataTable } from './DataTable';
export type { DataTableProps, DataTableColumn, DataTableRow } from './DataTable';
export { default as UXUIDCStartProjectCTA } from './StartProjectCTA';
export { default as CatalogCustomCtaButtons } from './CatalogCustomCtaButtons';
export { default as CatalogCustomDualCta } from './CatalogCustomDualCta';
export type { CatalogCustomDualCtaProps } from './CatalogCustomDualCta';
export { default as PageClosingCta } from './PageClosingCta';
export { default as StandardPageCtaStack } from './StandardPageCtaStack';
export type { StandardPageCtaStackProps } from './StandardPageCtaStack';
export { default as UXUIDCEducationalSalesBanner, getEducationalOffer } from './EducationalSalesBanner';
export type { EducationalSalesOffer } from './EducationalSalesBanner';
export { default as CatalogGeneLookup, getCatalogLookup, hasEducationalCatalogMap } from './CatalogGeneLookup';
export type { CatalogLookup, CatalogGene } from './catalogLookupMap';
export { default as UXUIDCServicePricingAnchor } from './ServicePricingAnchor';
export type { ServicePricingFaq } from './ServicePricingAnchor';
export { default as CatalogStickyRail } from './CatalogStickyRail';
export { default as CommercialCTATracker } from './CommercialCTATracker';
export { default as PricingUnlockForm } from './PricingUnlockForm';
export type { PricingUnlockFormProps } from './PricingUnlockForm';
export { default as BreedingSchemeArchitectCTA } from './BreedingSchemeArchitectCTA';
export { AutoAnimate } from './AutoAnimate';

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
export { default as HubSpotForm } from './HubSpotFormSimple';
export { default as HubSpotFormWithFallback } from './HubSpotFormWithFallback';
export { default as CustomHubSpotForm } from './CustomHubSpotForm';
export type { FormField } from './CustomHubSpotForm';

// Newsletter Components
export { default as NewsletterGate } from './NewsletterGate';
export { default as SocialShare } from './SocialShare';
export { default as IngeniousAd } from './IngeniousAd';

// Catalog Search
export { default as CatalogSearch } from './CatalogSearch';

// Navbar Search (unified catalog + site)
export { NavbarSearch } from './NavbarSearch';

// Scientific Diagram Placeholders
export { 
  ScientificDiagramPlaceholder,
  type DiagramPlaceholderProps 
} from './ScientificDiagramPlaceholder';

// Utilities
export { default as UXUIDCCookieConsent } from './CookieConsent';
export { default as BreadcrumbSchema } from './BreadcrumbSchema';
export { default as FAQPageSchema } from './FAQPageSchema';

// Researcher Spotlight
export { SpotlightModule } from './spotlight';
