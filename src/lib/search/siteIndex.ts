/**
 * Shared site content index for search
 * Used by /api/search and search page
 */

export interface SiteIndexEntry {
  title: string;
  description: string;
  url: string;
  category: string;
}

export const siteIndex: SiteIndexEntry[] = [
  // Custom Mouse Models
  { title: 'Custom mouse models', description: 'Design and generate custom genetically modified mouse models tailored to your research needs.', url: '/custom-mouse-models', category: 'Services' },
  { title: 'Knockout mouse models', description: 'Create knockout mice with complete gene deletion for functional studies and phenotyping.', url: '/knockout-mouse-models', category: 'Services' },
  { title: 'Conditional knockout mouse models', description: 'Tissue specific and temporally controlled gene deletion using Cre lox technology.', url: '/conditional-knockout-mouse-models', category: 'Services' },
  { title: 'Conventional knockout mouse models', description: 'Whole body gene knockout mice for studying gene function across all tissues.', url: '/conventional-knockout-mouse-models', category: 'Services' },
  { title: 'Knockin mouse models', description: 'Insert specific sequences, tags, or mutations into the mouse genome with precision.', url: '/knockin-mouse-models', category: 'Services' },
  { title: 'Point mutation mice', description: 'Generate mice carrying specific point mutations to model human disease variants.', url: '/point-mutation-mice', category: 'Services' },
  { title: 'Reporter knockin', description: 'Express fluorescent proteins or enzymes under endogenous promoter control.', url: '/reporter-knockin', category: 'Services' },
  { title: 'Tag knockin mice', description: 'Add epitope tags to endogenous proteins for detection and purification.', url: '/tag-knockin-mice', category: 'Services' },
  { title: 'Humanized mouse models', description: 'Replace mouse genes with human sequences for translational research.', url: '/humanized-mouse-models', category: 'Services' },
  { title: 'Transgenic mouse service', description: 'Random integration of transgenes for overexpression studies.', url: '/transgenic-mouse-service', category: 'Services' },
  // Technology
  { title: 'Cre lox system', description: 'Site specific recombination for conditional gene modification in mice.', url: '/cre-lox-system', category: 'Technology' },
  { title: 'Flp FRT system', description: 'Alternative recombination system for complex genetic manipulations.', url: '/flp-frt-system', category: 'Technology' },
  // Therapeutic Areas
  { title: 'Oncology mouse models', description: 'Mouse models for cancer research and immuno oncology studies.', url: '/oncology-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Immuno oncology mouse models', description: 'Models for studying immune responses to tumors and immunotherapy.', url: '/immuno-oncology-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Neuroscience mouse models', description: 'Models for neurological disease research including Alzheimer and Parkinson.', url: '/neuroscience-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Alzheimers mouse models', description: 'Transgenic and knockin models for Alzheimer disease research.', url: '/alzheimers-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Cardiovascular mouse models', description: 'Models for heart disease and vascular research.', url: '/cardiovascular-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Immunology mouse models', description: 'Models for studying immune system function and autoimmune disease.', url: '/immunology-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Metabolic disease mouse models', description: 'Models for diabetes, obesity, and metabolic syndrome research.', url: '/metabolic-disease-mouse-models', category: 'Therapeutic Areas' },
  { title: 'Rare disease mouse models', description: 'Custom models for orphan and rare disease research.', url: '/rare-disease-mouse-models', category: 'Therapeutic Areas' },
  // Catalog
  { title: 'Catalog mouse models', description: 'Ready made mouse models available for immediate order.', url: '/catalog-mouse-models', category: 'Catalog' },
  { title: 'Humanized immune checkpoint mice', description: 'Pre made humanized PD1, PDL1, CTLA4, and other checkpoint models.', url: '/humanized-immune-checkpoint-mice', category: 'Catalog' },
  { title: 'PD1 humanized mice', description: 'Humanized PD1 mice for immuno oncology research.', url: '/pd1-humanized-mice', category: 'Catalog' },
  { title: 'PDL1 humanized mice', description: 'Humanized PDL1 mice for checkpoint inhibitor studies.', url: '/pdl1-humanized-mice', category: 'Catalog' },
  { title: 'CTLA4 humanized mice', description: 'Humanized CTLA4 mice for immunotherapy research.', url: '/ctla4-humanized-mice', category: 'Catalog' },
  { title: 'LAG3 humanized mice', description: 'Humanized LAG3 mice for next generation checkpoint studies.', url: '/lag3-humanized-mice', category: 'Catalog' },
  { title: 'TIM3 humanized mice', description: 'Humanized TIM3 mice for immune checkpoint research.', url: '/tim3-humanized-mice', category: 'Catalog' },
  { title: 'Single checkpoint mice', description: 'Single humanized immune checkpoint models including PD1, PDL1, CTLA4, LAG3, TIM3, and more.', url: '/single-checkpoint-mice', category: 'Catalog' },
  { title: 'Double checkpoint mice', description: 'Dual humanized checkpoint mice for combination therapy studies.', url: '/double-checkpoint-mice', category: 'Catalog' },
  // Support Services
  { title: 'Colony management services', description: 'Professional breeding and colony maintenance for your mouse lines.', url: '/colony-management-services', category: 'Support Services' },
  { title: 'Cryopreservation services', description: 'Preserve your valuable mouse lines through sperm or embryo freezing.', url: '/cryopreservation-services', category: 'Support Services' },
  { title: 'Rederivation services', description: 'Clean up mouse lines by rederivation into SPF facilities.', url: '/rederivation-services', category: 'Support Services' },
  { title: 'Speed expansion breeding', description: 'Rapid expansion of mouse cohorts for studies.', url: '/speed-expansion-breeding', category: 'Support Services' },
  { title: 'Mouse genotyping service', description: 'Fast and accurate genotyping for your mouse colonies.', url: '/mouse-genotyping-service', category: 'Support Services' },
  { title: 'Phenotyping services', description: 'Comprehensive phenotyping of your mouse models.', url: '/phenotyping-services', category: 'Support Services' },
  // Resources
  { title: 'Resources', description: 'Guides, protocols, and educational content for mouse model research.', url: '/resources', category: 'Resources' },
  { title: 'Mouse genetics glossary', description: 'Comprehensive glossary of mouse genetics terminology.', url: '/glossary', category: 'Resources' },
  { title: 'Conditional vs conventional guide', description: 'Guide to choosing between conditional and conventional knockouts.', url: '/conditional-vs-conventional-guide', category: 'Resources' },
  { title: 'Cre line selection guide', description: 'How to choose the right Cre driver line for your research.', url: '/cre-line-selection-guide', category: 'Resources' },
  { title: 'Ingenious Blog', description: 'Blog articles on mouse model research and technology.', url: '/ingenious-blog', category: 'Resources' },
  { title: 'Lab Signals Newsletter', description: 'Biweekly newsletter with research insights.', url: '/lab-signals', category: 'Resources' },
  { title: 'Breeding Architect', description: 'Interactive tool for designing breeding schemes.', url: '/breeding-scheme-architect', category: 'Resources' },
  { title: 'All FAQs', description: 'Frequently asked questions about mouse models.', url: '/faq', category: 'Resources' },
  // Company
  { title: 'About ingenious targeting laboratory', description: 'Learn about ingenious targeting laboratory and our 26+ years of experience.', url: '/about-itl', category: 'Company' },
  { title: 'Why choose ingenious targeting laboratory', description: 'Discover why researchers trust ingenious targeting laboratory for custom mouse model generation.', url: '/why-choose-itl', category: 'Company' },
  { title: 'Contact', description: 'Get in touch with our team for project inquiries.', url: '/contact', category: 'Company' },
  { title: 'Request a quote', description: 'Submit a project inquiry and receive a custom quote.', url: '/request-quote', category: 'Company' },
  { title: 'Pricing overview', description: 'Information about pricing for mouse model generation services.', url: '/pricing-overview', category: 'Company' },
  { title: 'Order catalog models', description: 'Order ready made mouse models from our catalog.', url: '/order-catalog-models', category: 'Company' },
  { title: 'Schedule meeting', description: 'Schedule a call with our team.', url: '/schedule-meeting', category: 'Company' },
  { title: 'All catalog mouse models', description: 'Browse all catalog models available for order.', url: '/all-catalog-mouse-models', category: 'Catalog' },
  { title: 'Disease model catalog', description: 'Disease models available for research.', url: '/disease-model-catalog', category: 'Catalog' },
  { title: 'Syngeneic tumor models', description: 'Syngeneic tumor models for oncology research.', url: '/syngeneic-tumor-models', category: 'Catalog' },
];

export function searchSiteIndex(query: string, maxResults = 8): SiteIndexEntry[] {
  const term = query.toLowerCase().trim();
  if (!term) return [];

  const searchTerms = term.split(/\s+/).filter(Boolean);
  return siteIndex
    .filter((item) => {
      const searchText = `${item.title} ${item.description} ${item.category}`.toLowerCase();
      return searchTerms.every((t) => searchText.includes(t));
    })
    .slice(0, maxResults);
}
