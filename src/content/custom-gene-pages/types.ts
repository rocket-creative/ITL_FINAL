export interface CustomGeneField {
  label: string;
  value: string;
}

/** Verbatim fields extracted from a gene-page document. Do not paraphrase. */
export interface CustomGenePageData {
  symbol: string;
  h1: string;
  fields: CustomGeneField[];
  why: string[];
  applications: string[];
  optionsIntro: string;
  options: string[];
  sources: string[];
  reviewed: string;
  relatedLine: string;
}
