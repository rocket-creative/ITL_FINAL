/**
 * MASTER TESTIMONIALS DATA
 * Source: https://www.genetargeting.com/testimonials
 * 
 * IMPORTANT: All testimonials MUST come from this file.
 * Do NOT add, modify, or fabricate any testimonials.
 * These are the ONLY verified client testimonials.
 * 
 * Last updated: January 2026
 */

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  credentials: string;
  affiliation: string;
  /** Optional tags for filtering by topic/service type */
  tags?: string[];
}

/**
 * All 31 verified testimonials from genetargeting.com/testimonials
 */
export const VERIFIED_TESTIMONIALS: Testimonial[] = [
  {
    id: 'dunaief-upenn',
    quote: 'The Hephaestin flox model ingenious has made for us has been great. It has helped generate eight research publications.',
    author: 'Joshua Dunaief',
    credentials: 'PhD, MD',
    affiliation: 'University of Pennsylvania',
    tags: ['conditional-knockout', 'publications', 'ophthalmology'],
  },
  {
    id: 'bosmans-ghent',
    quote: "We are very happy with this mouse line and we're not done yet. There's still plenty to do. The versatility of the F.A.S.T.™ approach is really unparalleled. There are so many possibilities to use the cassette that one paper does not showcase it all. Also, the addition of N-terminal GFP has helped quite a bit to understand gene expression patterns.",
    author: 'Frank Bosmans',
    credentials: 'PhD',
    affiliation: 'Ghent University, Belgium',
    tags: ['fast-technology', 'reporter', 'knockin'],
  },
  {
    id: 'maxson-ohsu',
    quote: "I'd like to thank the ingenious team for making this mouse for us. We are so excited! Everyone at ingenious has been wonderful to work with throughout the entire process. We will definitely be in contact the next time we need a mouse!",
    author: 'Julia Maxson',
    credentials: 'PhD',
    affiliation: 'Knight Cancer Institute, Oregon Health & Science University',
    tags: ['oncology', 'custom-models', 'customer-service'],
  },
  {
    id: 'plumley-warren',
    quote: 'ingenious Targeting Laboratory is highly recommended for generating custom animal models. Past 2 years, we have made 2 conditional knockout mouse lines. All processes of each project were scientifically and professionally handled. Their scientific consulting to initiate the project was superb compared to other companies, and transparency of the project progress reported by project managers was excellent. Their excellency and dedication to meet our needs in a timely manner are invaluable to continuation of our research progress.',
    author: 'Hyekyung Plumley',
    credentials: 'PhD',
    affiliation: 'Warren Center for Neuroscience Drug Discovery',
    tags: ['conditional-knockout', 'neuroscience', 'project-management'],
  },
  {
    id: 'chen-houston',
    quote: 'I would definitely recommend your company to other scientists for their needs of creation of transgenic mouse models.',
    author: 'Frank Y. Chen',
    credentials: 'MD, PhD',
    affiliation: 'Houston Behavioral Healthcare Hospital, Houston Adult Psychiatry',
    tags: ['transgenic', 'recommendation'],
  },
  {
    id: 'martemyanov-scripps',
    quote: 'I had a happy experience working with you. I especially liked your flexibility when negotiating terms of the contract and was very satisfied by the execution timeframe and communications with your science team. I am very likely to come back soon. Your discounts to return clients make it very attractive too.',
    author: 'Kirill Martemyanov',
    credentials: 'PhD',
    affiliation: 'The Scripps Research Institute, Florida',
    tags: ['customer-service', 'repeat-customer', 'value'],
  },
  {
    id: 'hussain-michigan',
    quote: "We are actively engaged in the production of a number of conditional mouse models with iTL. This collaboration has been simple on my end, just providing the gene accession numbers of each gene, and iTL recommending the strategies for each gene. The full range of mouse knockout services matches my needs well. I find iTL's service uniquely useful for my situation of needing different models for my research in a quick and efficient manner.",
    author: 'Mehboob Hussain',
    credentials: 'MD',
    affiliation: 'University of Michigan Health',
    tags: ['conditional-knockout', 'knockout', 'efficiency'],
  },
  {
    id: 'mirmira-chicago',
    quote: "I've been working with iTL over the past 5 years in the production of 3 different genetically altered mice. Not only did iTL help in the design of the mice, but the entire process was transparent with the opportunity at any time along the way to discuss my questions or concerns with scientists who had significant insight into the process. The mice were delivered on time, as billed!",
    author: 'Raghu Mirmira',
    credentials: 'MD, PhD',
    affiliation: 'University of Chicago',
    tags: ['long-term-partnership', 'transparency', 'on-time-delivery'],
  },
  {
    id: 'gabay-geneva',
    quote: 'I have been always very satisfied by the work done by ingenious targeting laboratory for my custom mouse projects.',
    author: 'Cem Gabay',
    credentials: 'MD',
    affiliation: 'University Hospitals of Geneva',
    tags: ['custom-models', 'international', 'satisfaction'],
  },
  {
    id: 'said-uci',
    quote: 'Our project manager did an outstanding job and has provided us with excellent customer service. Her availability to clarify issues has been nothing short of fantastic. I have recommended ingenious to others. Look forward for further collaboration on other projects.',
    author: 'Hamid M. Said',
    credentials: 'PhD, PharmD',
    affiliation: 'University of California, Irvine',
    tags: ['project-management', 'customer-service', 'recommendation'],
  },
  {
    id: 'andersson-carrygenes',
    quote: "iTL has generated a conditional knockout mouse as well as a knockin mouse for my laboratory. As a repeat customer I am obviously happy with their gene targeting services. iTL has consistently proven to be very flexible and easy to work with. This was especially apparent when we phenotyped mice at iTL's animal facilities as their personnel helped us with lab work until 4 am in the morning. Highly recommended!",
    author: 'John Andersson',
    credentials: 'PhD',
    affiliation: 'CarryGenes Therapeutics',
    tags: ['conditional-knockout', 'knockin', 'repeat-customer', 'biotech'],
  },
  {
    id: 'franco-colorado',
    quote: "We found iTL's service to be exceptionally efficient and very well managed. We generated several mouse lines with iTL, and every step for each project was performed quickly and precisely, without any delays or problems.",
    author: 'Santos Franco',
    credentials: 'PhD',
    affiliation: 'University of Colorado Anschutz Medical Campus',
    tags: ['efficiency', 'project-management', 'multiple-projects'],
  },
  {
    id: 'creemers-leuven',
    quote: "I am very happy with iTL's mouse knockout services. It was pleasant to collaborate with my project manager. She was very thorough and communicative, an excellent combination. I will certainly use iTL again when needed, and I'm happy to share my positive experience with colleagues.",
    author: 'John Creemers',
    credentials: 'PhD',
    affiliation: 'University of Leuven, Belgium',
    tags: ['knockout', 'project-management', 'international', 'repeat-customer'],
  },
  {
    id: 'fimmel-loyola',
    quote: "The project was very well managed…in fact, using iTL validated my decision to not try and do this in my own lab. It would have been a catastrophe… (My project manager) was very helpful, always getting back to us in time and explaining every step of the project. I would be glad to serve as a reference for iTL and its staff.",
    author: 'Claus Fimmel',
    credentials: 'MD',
    affiliation: 'Loyola University Medical Center',
    tags: ['project-management', 'outsourcing', 'reference'],
  },
  {
    id: 'roth-upenn',
    quote: 'The people at InGenious are friendly, professional, and extremely good at what they do. I have made 5 Knockin mice with them and everything has gone like clockwork.',
    author: 'David B. Roth',
    credentials: 'MD, PhD',
    affiliation: 'Perelman School of Medicine, University of Pennsylvania',
    tags: ['knockin', 'multiple-projects', 'professionalism'],
  },
  {
    id: 'marmigere-inserm',
    quote: "I worked with ITL on the generation of a conditional knockout mouse strain for a complex gene. I have been very impressed by their flexibility and their efficiency in completing each steps with no delays. I'm glad to share this experience and highly recommend ITL's services.",
    author: 'Frédéric Marmigère',
    credentials: 'PhD',
    affiliation: 'INSERM',
    tags: ['conditional-knockout', 'complex-projects', 'international', 'efficiency'],
  },
  {
    id: 'rateri-kentucky',
    quote: 'iTL generated our angiotensin II type 1a receptor conditional mouse. We found this company very responsive. The project started with discussions on possible construct designs. Following approval, a project manager sent monthly reports alerting us to project milestones. Our experience with iTL was so positive that we have generated more conditional mice with them.',
    author: 'Debra Rateri',
    credentials: 'BS',
    affiliation: 'University of Kentucky',
    tags: ['conditional-knockout', 'cardiovascular', 'project-management', 'repeat-customer'],
  },
  {
    id: 'coetzee-nyu',
    quote: 'iTL produced four conditional knockout mouse models on our behalf. They have been extremely helpful and informative at all stages of the project; all the way from construct design to breeding strategies and genotyping the new mouse models. I know where to turn when the needs comes up again for another mouse project; it is certainly faster and cheaper than doing this by ourselves.',
    author: 'William A. Coetzee',
    credentials: 'DSc',
    affiliation: 'NYU School of Medicine',
    tags: ['conditional-knockout', 'multiple-projects', 'value', 'full-service'],
  },
  {
    id: 'ge-nih',
    quote: 'iTL has generated three knockout and conditional KO mice for my lab. One of them is now published and we would like to thank iTL for the very nice service.',
    author: 'Kai Ge',
    credentials: 'PhD',
    affiliation: 'NIDDK, National Institutes of Health',
    tags: ['knockout', 'conditional-knockout', 'publications', 'nih'],
  },
  {
    id: 'means-sanofi',
    quote: 'iTL generated a conventional knockout mouse for my lab. The entire process was smooth and the quality of service provided by the iTL team and our project manager was exceptional. Several other researchers in my Center are creating mice with iTL and all of us have been extremely satisfied. I strongly recommend iTL for generation of your next mouse model!!!',
    author: 'Terry K. Means',
    credentials: 'PhD',
    affiliation: 'Sanofi',
    tags: ['knockout', 'pharma', 'recommendation', 'customer-service'],
  },
  {
    id: 'clarke-cambridge',
    quote: 'ingenious was very competitively priced compared to other reputable transgenic companies. Most importantly, however, from the very beginning their knowledge and competence convinced me they would deliver on our project, so I trusted them and they fully met our expectations. Why use anyone else!',
    author: 'Murray Clarke',
    credentials: 'PhD',
    affiliation: 'University of Cambridge',
    tags: ['value', 'international', 'trust', 'expertise'],
  },
  {
    id: 'diekwisch-tamu',
    quote: 'iTL has done a tremendous job assisting us with our projects. Not only have they provided successful mouse lines, but their project management has always been on top of things. Communication was excellent, and at all times I felt I could trust the scientists at iTL with my work.',
    author: 'Thomas G.H. Diekwisch',
    credentials: 'DMD, PhD (sc), PhD (phil.)',
    affiliation: 'Texas A&M University College of Dentistry',
    tags: ['project-management', 'communication', 'trust'],
  },
  {
    id: 'reid-amgen',
    quote: 'Just want to say thank you to everyone involved in this project. Everyone was friendly, punctual, professional, and easy to work with.',
    author: 'Michael Reid',
    credentials: 'PhD',
    affiliation: 'Amgen',
    tags: ['pharma', 'biotech', 'professionalism', 'customer-service'],
  },
  {
    id: 'harhaj-pennstate',
    quote: "iTL generated a conventional knockout mouse for us, and we were very pleased with the entire process. The project manager was extremely helpful and efficient and promptly notified us whenever a step had been completed. I highly recommend iTL's services for anyone considering knockout mouse models.",
    author: 'Edward Harhaj',
    credentials: 'PhD',
    affiliation: 'Penn State College of Medicine',
    tags: ['knockout', 'project-management', 'recommendation'],
  },
  {
    id: 'aifantis-nyu',
    quote: 'We have worked with inGenious Targeting Laboratory, Inc. on a variety of conventional, conditional and knockin projects, and we are very impressed with how flexible their service was to our needs and expectations. We look forward to our continued success in generating different mouse models with iTL.',
    author: 'Iannis Aifantis',
    credentials: 'PhD',
    affiliation: 'NYU School of Medicine',
    tags: ['knockout', 'conditional-knockout', 'knockin', 'flexibility', 'multiple-projects'],
  },
  {
    id: 'groenendyk-alberta',
    quote: 'We recently generated a conditional knockout mouse model using iTL (inGenious Targeting Laboratory). We chose iTL based on time, cost, recommendation and location. We were pleased with the technical help we received in identifying the scope of the project. As well, information and services provided by the project manager were timely and extremely helpful and we were very impressed with the customer service. We were promptly updated throughout the project and upon completion, information was provided to help with genotyping and continuation of the project. We are very happy with the prompt services provided by iTL and would happily recommend them to our colleagues.',
    author: 'Jody Groenendyk',
    credentials: 'PhD',
    affiliation: 'University of Alberta',
    tags: ['conditional-knockout', 'project-management', 'value', 'international'],
  },
  {
    id: 'arenzana-pasteur',
    quote: 'Our experience with ingenious is a long one with several knock-in models engineered in the last seven years. Everytime the entire process was efficiently and successfully achieved even when challenged by unexpected difficulties. We are fully satisfied with their services and we would like to underline the quality of the ingenious professionals with a very special mention for project managers. We enthusiastically recommend iTL and we will request their services in the future. No doubts about it.',
    author: 'Fernando Arenzana-Seisdedos',
    credentials: 'Professor & Head of Laboratory',
    affiliation: 'Institut Pasteur',
    tags: ['knockin', 'long-term-partnership', 'international', 'recommendation'],
  },
  {
    id: 'fullerton-ottawa',
    quote: "iTL recently produced a new knockout model for us from a KOMP targeting vector (knockout first, conditional potential). The entire process was extremely efficient and the staff at iTL were both knowledgeable and helpful. We chose iTL because of their cost-effective service and their guarantee of germline transmission when using a KOMP targeting vector. Now that the project is complete, I would definitely use their services again in the future and would recommend them highly to anyone looking to create a new mouse model.",
    author: 'Morgan Fullerton',
    credentials: 'PhD',
    affiliation: 'University of Ottawa',
    tags: ['knockout', 'komp', 'value', 'guarantee', 'international'],
  },
  {
    id: 'wu-ucla',
    quote: 'My experience with iTL has been great. This is a very professional and efficient team. Everything went smoothly throughout the process and we got our mouse model in a very timely manner. I would highly recommend iTL to my colleagues.',
    author: 'Emily Wu',
    credentials: 'PhD',
    affiliation: 'University of California, Los Angeles',
    tags: ['efficiency', 'professionalism', 'recommendation'],
  },
  {
    id: 'basson-kings',
    quote: 'iTL produced a new conditional mouse model for us and the quality of service was exceptional. The team is extremely knowledgeable and the work was completed at the highest possible standards. My project manager was excellent and always happy to answer technical questions and keep me up to date with progress and potential problems. I would recommend iTL highly and will use them again in the future if I need to generate a new mouse line.',
    author: 'Albert Basson',
    credentials: 'PhD',
    affiliation: "King's College London",
    tags: ['conditional-knockout', 'project-management', 'international', 'quality'],
  },
];

/**
 * Helper function to get testimonials by tag
 */
export function getTestimonialsByTag(tag: string): Testimonial[] {
  return VERIFIED_TESTIMONIALS.filter(t => t.tags?.includes(tag));
}

/**
 * Helper function to get testimonials by multiple tags (OR logic)
 */
export function getTestimonialsByTags(tags: string[]): Testimonial[] {
  return VERIFIED_TESTIMONIALS.filter(t => 
    t.tags?.some(tag => tags.includes(tag))
  );
}

/**
 * Helper function to get a random selection of testimonials
 */
export function getRandomTestimonials(count: number): Testimonial[] {
  const shuffled = [...VERIFIED_TESTIMONIALS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Helper function to get testimonial by ID
 */
export function getTestimonialById(id: string): Testimonial | undefined {
  return VERIFIED_TESTIMONIALS.find(t => t.id === id);
}

/**
 * Helper function to get testimonials for a specific page context
 * Uses tags to find relevant testimonials
 */
export function getTestimonialsForContext(context: string, count: number = 3): Testimonial[] {
  const contextMap: Record<string, string[]> = {
    // Service types
    'knockout': ['knockout', 'conditional-knockout'],
    'conditional-knockout': ['conditional-knockout'],
    'knockin': ['knockin', 'fast-technology'],
    'humanized': ['humanized'],
    'transgenic': ['transgenic'],
    
    // Therapeutic areas
    'oncology': ['oncology'],
    'neuroscience': ['neuroscience'],
    'cardiovascular': ['cardiovascular'],
    'immunology': ['immuno-oncology', 'immunology'],
    'ophthalmology': ['ophthalmology'],
    
    // General
    'homepage': ['publications', 'recommendation', 'quality'],
    'services': ['project-management', 'customer-service', 'efficiency'],
    'about': ['long-term-partnership', 'trust', 'recommendation'],
    'pharma': ['pharma', 'biotech'],
  };

  const tags = contextMap[context] || [];
  let relevant = getTestimonialsByTags(tags);
  
  // If not enough relevant testimonials, fill with random ones
  if (relevant.length < count) {
    const remaining = VERIFIED_TESTIMONIALS.filter(t => !relevant.includes(t));
    const shuffled = remaining.sort(() => 0.5 - Math.random());
    relevant = [...relevant, ...shuffled.slice(0, count - relevant.length)];
  }
  
  // Shuffle and limit
  return relevant.sort(() => 0.5 - Math.random()).slice(0, count);
}

/**
 * Format author name with credentials
 */
export function formatAuthorWithCredentials(testimonial: Testimonial): string {
  return `${testimonial.author}, ${testimonial.credentials}`;
}

/**
 * Featured testimonials for homepage - curated selection
 */
export const FEATURED_TESTIMONIALS: Testimonial[] = [
  VERIFIED_TESTIMONIALS.find(t => t.id === 'dunaief-upenn')!,
  VERIFIED_TESTIMONIALS.find(t => t.id === 'plumley-warren')!,
  VERIFIED_TESTIMONIALS.find(t => t.id === 'basson-kings')!,
];

/**
 * Short quotes suitable for compact displays
 * (testimonials with shorter quotes)
 */
export const SHORT_TESTIMONIALS: Testimonial[] = VERIFIED_TESTIMONIALS.filter(
  t => t.quote.length < 200
);

/**
 * Pre-selected testimonials for specific page contexts
 * These are curated selections that work well for specific pages
 */
/**
 * Single testimonial exports for standardized page display
 * Each page should use exactly 1 testimonial
 */
export const KNOCKOUT_TESTIMONIALS = [
  VERIFIED_TESTIMONIALS.find(t => t.id === 'maxson-ohsu')!,
];

export const NEUROSCIENCE_TESTIMONIALS = [
  VERIFIED_TESTIMONIALS.find(t => t.id === 'plumley-warren')!,
];

export const ONCOLOGY_TESTIMONIALS = [
  VERIFIED_TESTIMONIALS.find(t => t.id === 'maxson-ohsu')!,
];

export const SERVICES_TESTIMONIALS = [
  VERIFIED_TESTIMONIALS.find(t => t.id === 'said-uci')!,
];

export const RESOURCES_TESTIMONIALS = [
  VERIFIED_TESTIMONIALS.find(t => t.id === 'dunaief-upenn')!,
];

export const HUMANIZED_TESTIMONIALS = [
  VERIFIED_TESTIMONIALS.find(t => t.id === 'bosmans-ghent')!,
];

export const CONDITIONAL_KO_TESTIMONIALS = [
  VERIFIED_TESTIMONIALS.find(t => t.id === 'plumley-warren')!,
];

export const PHARMA_BIOTECH_TESTIMONIALS = [
  VERIFIED_TESTIMONIALS.find(t => t.id === 'means-sanofi')!,
];

export const CARDIOVASCULAR_TESTIMONIALS = [
  VERIFIED_TESTIMONIALS.find(t => t.id === 'rateri-kentucky')!,
];

export const CATALOG_TESTIMONIALS = [
  VERIFIED_TESTIMONIALS.find(t => t.id === 'dunaief-upenn')!,
];

export const IMMUNOLOGY_TESTIMONIALS = [
  VERIFIED_TESTIMONIALS.find(t => t.id === 'said-uci')!,
];

export const CRE_LOX_TESTIMONIALS = [
  VERIFIED_TESTIMONIALS.find(t => t.id === 'coetzee-nyu')!,
];

export const TECHNOLOGY_TESTIMONIALS = [
  VERIFIED_TESTIMONIALS.find(t => t.id === 'bosmans-ghent')!,
];

/**
 * Single testimonial selections for pages that only show one
 */
export const SINGLE_BASSON = VERIFIED_TESTIMONIALS.find(t => t.id === 'basson-kings')!;
export const SINGLE_DUNAIEF = VERIFIED_TESTIMONIALS.find(t => t.id === 'dunaief-upenn')!;
export const SINGLE_PLUMLEY = VERIFIED_TESTIMONIALS.find(t => t.id === 'plumley-warren')!;
export const SINGLE_MIRMIRA = VERIFIED_TESTIMONIALS.find(t => t.id === 'mirmira-chicago')!;
export const SINGLE_SAID = VERIFIED_TESTIMONIALS.find(t => t.id === 'said-uci')!;
export const SINGLE_FRANCO = VERIFIED_TESTIMONIALS.find(t => t.id === 'franco-colorado')!;
export const SINGLE_RATERI = VERIFIED_TESTIMONIALS.find(t => t.id === 'rateri-kentucky')!;

export default VERIFIED_TESTIMONIALS;
