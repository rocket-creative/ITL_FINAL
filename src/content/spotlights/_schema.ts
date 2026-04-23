export type ModelType =
  | 'knockout'
  | 'conditional_knockout'
  | 'knockin'
  | 'humanized'
  | 'transgenic'
  | 'rat';

export type TherapeuticArea =
  | 'oncology'
  | 'neuroscience'
  | 'cardiovascular'
  | 'immunology'
  | 'metabolic'
  | 'rare_disease';

export type SpotlightStatus = 'draft' | 'approved' | 'published';

export interface SpotlightModelDetail {
  label: string;
  value: string;
}

export interface Spotlight {
  slug: string;
  spotlightNumber: string;
  publishDate: string;
  status: SpotlightStatus;

  featureTag: string;
  title: string;
  subtitle: string;

  piName: string;
  piFirstName: string;
  piLastName: string;
  institution: string;
  institutionLink: string;
  labBio: string;
  collaborators: string;

  paperTitle: string;
  paperCitation: string;
  journal: string;
  journalYear: string;
  pubmedId: string;
  pubmedUrl: string;
  doi: string;
  doiUrl: string;
  pullQuote: string;
  funding: string;

  modelType: ModelType;
  modelTypeDisplay: string;
  modelTypePageUrl: string;
  therapeuticArea: TherapeuticArea;
  modelDetails: SpotlightModelDetail[];

  bodyIntro: string;
  bodyTheModel: string;
  bodyTheResult: string;
  bodyWhyItMatters: string;

  metaTitle: string;
  metaDescription: string;
  ogImage?: string;
}
