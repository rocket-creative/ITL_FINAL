/**
 * Publications Data for ingenious targeting laboratory
 * 
 * HOW TO UPDATE:
 * 1. Add new publications to the beginning of the appropriate year array
 * 2. If adding a new year, create a new entry at the top of the publicationsByYear object
 * 3. Each publication should have: authors, year, title, journal, volume/issue info, link
 * 
 * FORMAT:
 * {
 *   authors: "Author A, Author B, Author C.",
 *   year: 2025,
 *   title: "Publication title here.",
 *   journal: "Journal Name",
 *   volume: "Volume(Issue): Pages", // or "Online ahead of print"
 *   link: "https://pubmed.ncbi.nlm.nih.gov/xxxxx/"
 * }
 * 
 * GENERATED FROM MASTER LIST: 2026-02-17
 * Source: /Users/rocketcreative/Downloads/publications.md
 */

export interface Publication {
  authors: string;
  year: number;
  title: string;
  journal: string;
  volume: string;
  link?: string; // PubMed or other article URL
}

export interface PublicationsByYear {
  [year: string]: Publication[];
}

export const publicationsByYear: PublicationsByYear = {
  "2025": [
    {
      authors: "Tebbe L, Ikelle L, Makia MS, Kakakhel M, Al-Ubaidi MR, Naash MI.",
      year: 2025,
      title: "Syntaxin 3B Mediates Light-Dependent Interactions with STXBP1 and Arrestin 4: Distinct Roles in Rods and Cones",
      journal: "Adv Sci (Weinh)",
      volume: "Online ahead of print",
      link: "https://pubmed.ncbi.nlm.nih.gov/41220299/"
    },
    {
      authors: "Salzbank J, Lacaille H, Gaby J, O'Reilly JJ, Kissner M, Vacher CM, Penn AA.",
      year: 2025,
      title: "Microglia alter sex-specific cerebellar myelination following placental hormone loss",
      journal: "Nat Commun",
      volume: "16(1): 9846",
      link: "https://pubmed.ncbi.nlm.nih.gov/41203610/"
    },
    {
      authors: "Diamond EL, Emile JF, Fujino T, Haroche J, Maron MI, Lewis AM, Rahman J, Reiner AS, Bossert D, Rosenblum M, Yabe M, Petrova-Drus K, Francis JH, Rotemberg V, Rampal RK, Yoo S, Daniyan AF, Mahajan S, Hatzoglou V, Young R, Ulaner GA, Rösler W, Hershkovitz-Rokah O, Shpilberg O, Mazor RD, Chen LYC, Singer M, Cuibus MA, Weis K, Benbarche S, Zhang P, Fox N, Castro C, Tittley S, Witkowski M, Cohen-Aubart F, Terriou L, Hanoun M, Schleinitz N, Sosa G, Hautala T, De Lassus LF, Rosen N, Abdel-Wahab O, Durham BH.",
      year: 2025,
      title: "RAF-independent MEK mutations drive refractory histiocytic neoplasms but respond to ERK inhibition",
      journal: "Cancer Cell",
      volume: "Online ahead of print",
      link: "https://pubmed.ncbi.nlm.nih.gov/41135521/"
    },
    {
      authors: "Reinartz DM, Escamilla-Rivera V, Shao M, Tribble SL, Caulin C, Wilson JE.",
      year: 2025,
      title: "Impact of absent in melanoma 2 on head and neck squamous cell carcinoma development",
      journal: "J Immunol. vkaf224",
      volume: "",
      link: "https://pubmed.ncbi.nlm.nih.gov/41042265/"
    },
    {
      authors: "Chandrasekharan B, Wu H, Smoller C, Kim J, Wolfarth AA, Eboka R, Boyer D, Metzger AJ, Addis CR, Liu K, Srinivasan S, Macpherson AJ, Jones RM, Neish AS.",
      year: 2025,
      title: "Microbiota-dependent formylated peptide receptor (Fpr1/2) signaling regulates enteric nervous system development and gastrointestinal motility in mice",
      journal: "Cell Mol Gastroenterol Hepatol",
      volume: "12(19): 101624",
      link: "https://pubmed.ncbi.nlm.nih.gov/40907665/"
    },
    {
      authors: "Norlander AE, Abney M, Zhang J, Polosukhin VV, Thomas CM, Ceneviva ZJ, AlMotairy R, Patel R, Cephus JY, Toki S, Zhou W, Chatila TA, Newcomb DC, Peebles RS Jr.",
      year: 2025,
      title: "Prostaglandin I2 signaling restrains Treg ST2 expression by repressing β-catenin in allergic airway inflammation",
      journal: "J Allergy Clin Immunol",
      volume: "Online ahead of print",
      link: "https://pubmed.ncbi.nlm.nih.gov/40812430/"
    },
    {
      authors: "MacDowell Kaswan ZA, Hurtado M, Chen EY, Steelman AJ, McCusker RH.",
      year: 2025,
      title: "Ido1 or Ido2 deficiency in myeloid-derived cells attenuates TMEV-induced ictogenesis",
      journal: "J Neuroimmunol. 2025 (408): 578707",
      volume: "",
      link: "https://pubmed.ncbi.nlm.nih.gov/40829361/"
    },
    {
      authors: "Jiang Y, Sachdeva K, Goulbourne CN, Berg MJ, Peddy J, Stavrides PH, Pensalfini A, Pawlik M, Malampati S, Whyte L, Basavarajappa BS, Shivakumar S, Bleiwas C, Smiley JF, Mathews PM, Nixon RA.",
      year: 2025,
      title: "Increased neuronal expression of the early endosomal adaptor APPL1 leads to endosomal and synaptic dysfunction with cholinergic neurodegeneration",
      journal: "J Neurosci",
      volume: "29(45): e2331242025",
      link: "https://pubmed.ncbi.nlm.nih.gov/39345644/"
    },
    {
      authors: "Zhou W, Zhang J, Chowdhury NU, Norlander AE, Toki S, Abney M, Rusznak M, Gibson-Corley KN, Cook DP, Newcomb DC, Peebles RS Jr.",
      year: 2025,
      title: "PGI2 signaling metabolically reprograms CD4 Th2 cells and represses allergic airway inflammation",
      journal: "J Immunol",
      volume: "9(214): 2270-2280",
      link: "https://pubmed.ncbi.nlm.nih.gov/40587812/"
    },
    {
      authors: "Choe HJ, Lee JS, Park JY, Lee SA, Park YJ, Chung SS, Park KS.",
      year: 2025,
      title: "SENP2 regulates UCP1-dependent thermogenesis in brown adipocytes via deSUMOylation of ERRα",
      journal: "Exp Mol Med 6 (57): 1283-1293",
      volume: "",
      link: "https://pubmed.ncbi.nlm.nih.gov/40579429/"
    },
    {
      authors: "Brown AC, Uddin MJ, Munday RM, Naz F, Moreau GB, Ramakrishnan G, Rich SS, Haque R, Wojcik GL, Duggal P, Marie C, Petri WA Jr.",
      year: 2025,
      title: "The cAMP responsive element modulator (CREM) transcription factor influences susceptibility to undernutrition and infection",
      journal: "mBio",
      volume: "8(16): e0139025",
      link: "https://pubmed.ncbi.nlm.nih.gov/40576353/"
    },
    {
      authors: "Wang L, Noyer L, Jishage M, Wang YH, Tao AY, McDermott M, Gando I, Sidhu I, Hu K, Zhong L, Sun K, Drmic D, Kaufmann U, Feske S.",
      year: 2025,
      title: "CLNS1A regulates genome stability and cell cycle progression to control CD4 T cell function and autoimmunity",
      journal: "Sci Immunol",
      volume: "108(10): eadq8860",
      link: "https://pubmed.ncbi.nlm.nih.gov/40540585/"
    },
    {
      authors: "Milanick W, Li J, Thomas CI, Al-Yaari M, Guerrero-Given D, Kamasawa N, Young SM Jr.",
      year: 2025,
      title: "Presynaptic α2δs specify synaptic gain, not synaptogenesis, in the mammalian brain",
      journal: "Neuron",
      volume: "12(113): p1886-1897.E9",
      link: "https://pubmed.ncbi.nlm.nih.gov/40367942/"
    },
    {
      authors: "Pioli KT, Ritchie M, Haq H, Pioli PD.",
      year: 2025,
      title: "Jchain-Diphtheria Toxin Receptor Mice Allow for Diphtheria Toxin-Mediated Depletion of Antibody-Secreting Cells and Analysis of Differentiation Kinetics",
      journal: "bioRxiv",
      volume: "",
      link: "https://pubmed.ncbi.nlm.nih.gov/38766257/"
    },
    {
      authors: "Mohassel P, Hearn H, Rooney J, Zou Y, Johnson K, Norato G, Nalls MA, Yun P, Ogata T, Silverstein S, Sleboda DA, Roberts TJ, Rifkin DB, Bönnemann CG.",
      year: 2025,
      title: "Collagen type VI regulates TGF-β bioavailability in skeletal muscle in mice",
      journal: "J Clin Invest",
      volume: "9(135): e173354",
      link: "https://pubmed.ncbi.nlm.nih.gov/40309777/"
    },
    {
      authors: "Lee B, Kwon JT, Jeong Y, Caris H, Oh D, Feng M, Davila Mejia I, Zhang X, Ishikawa T, Watson BR, Moffitt JR, Chung K, Huh JR, Choi GB.",
      year: 2025,
      title: "Inflammatory and anti-inflammatory cytokines bidirectionally modulate amygdala circuits regulating anxiety",
      journal: "Cell",
      volume: "8(188): 2190-2202.e15",
      link: "https://pubmed.ncbi.nlm.nih.gov/40199321/"
    },
    {
      authors: "Ham H, Hirdler JB, Bihnam DT, Mao Z, Gicobi JK, Macedo BG, Rodriguez-Quevedo MF, Schultz DF, Correia C, Zhong J, Martinez KE, Banuelos A, Ashton DS, Lagnado AB, Guo R, Pessoa R, Pandey A, Li H, Lucien F, Borges da Silva H, Dong H, Billadeau DD.",
      year: 2025,
      title: "Lysosomal NKG7 restrains mTORC1 activity to promote CD8+ T cell durability and tumor control",
      journal: "Nat Commun",
      volume: "16(1): 1628",
      link: "https://pubmed.ncbi.nlm.nih.gov/39952956/"
    },
    {
      authors: "Zong P, Li CX, Feng J, Yue Z, Nethramangalath T, Xie Y, Qin X, Cicchetti M, Cai Y, Jellison E, Matsushita M, Runnels LW, Yue L.",
      year: 2025,
      title: "TRPM7 channel activity promotes the pathogenesis of abdominal aortic aneurysms",
      journal: "Nat Cardiovasc Res",
      volume: "4(2): 197-215",
      link: "https://pubmed.ncbi.nlm.nih.gov/39953276/"
    },
    {
      authors: "Navarro HI, Daly AE, Rodriguez B, Wu S, Ngo KA, Fraser A, Schiffman A, Liu Y, Smale ST, Chia JJ, Hoffmann A.",
      year: 2025,
      title: "NF-κB RelB suppresses the inflammatory gene expression programs of dendritic cells by competing with RelA for binding to target gene promoters",
      journal: "Cell Discov",
      volume: "11(1): 13",
      link: "https://pubmed.ncbi.nlm.nih.gov/39929805/"
    },
    {
      authors: "Mao Z, Hirdler JB, Gicobi JK, Maynes M, Hsu MA, Dellacecca ER, Zhang W, Teske JJ, Li Y, Zhao G, Lucien-Matteoni F, da Silva HB, Billadeau DD, Dong H.",
      year: 2025,
      title: "PD-1 prelimits both the cytotoxic and exhaustion potential in thymic CD8+ T cells and impacts the maintenance of peripheral tumor immunity",
      journal: "bioRxiv",
      volume: "",
      link: "https://pubmed.ncbi.nlm.nih.gov/39868106/"
    },
    {
      authors: "Shaikh K, Bowman M, McCormick SM, Gao L, Zhang J, White J, Tawil J, Kapoor A, Arav-Boger R, Norbury CC, Harhaj EW.",
      year: 2025,
      title: "ZFAND6 promotes TRAF2-dependent mitophagy to restrain cGAS-STING signaling",
      journal: "iScience",
      volume: "1(28): 111544",
      link: "https://pubmed.ncbi.nlm.nih.gov/39811672/"
    }
  ],
  "2024": [
    {
      authors: "Nargis T, Muralidharan C, Enriquez JR, Wang JE, Kaylan K, Chakraborty A, Pratuangtham S, Figatner K, Nelson JB, May SC, Nadler JL, Boxer MB, Maloney, DJ, Tersey SA, Mirmira RG.",
      year: 2024,
      title: "12-Lipoxygenase inhibition delays onset of autoimmune diabetes in human gene replacement mice",
      journal: "JCI Insight",
      volume: "24(9): e185299",
      link: "https://pubmed.ncbi.nlm.nih.gov/39531315/"
    },
    {
      authors: "Alexander M, Upadhyay V, Rock R, Ramirez L, Trepka K, Puchalska P, Orellana D, Ang QY, Whitty C, Turnbaugh JA, Tian Y, Dumlao D, Nayak R, Patterson A, Newman JC, Crawford PA, Turnbaugh PJ.",
      year: 2024,
      title: "A diet-dependent host metabolite shapes the gut microbiota to protect from autoimmunity",
      journal: "Cell Rep",
      volume: "11(43):114891",
      link: "https://pubmed.ncbi.nlm.nih.gov/39500329/"
    },
    {
      authors: "Ghosh A, Chénier I, Leung YH, Oppong AK, Peyot, M-L, Madiraju SRM, Al-Khairi I, Abubaker J, Al-Mulla F, Prentki M, Abu-Farha M.",
      year: 2024,
      title: "Adipocyte Angptl8 deletion improves glucose and energy metabolism and obesity associated inflammation in mice",
      journal: "iScience",
      volume: "12(27): 111292",
      link: "https://pubmed.ncbi.nlm.nih.gov/39640567/"
    },
    {
      authors: "Tran P, Mishra P, Williams LG, Moskalenko R, Sharma S, Nilsson AK, Watt DL, Andersson P, Bergh A, Pursell ZF, Chabes A.",
      year: 2024,
      title: "Altered dNTP pools accelerate tumor formation in mice",
      journal: "Nucleic Acids Res",
      volume: "52(20): 12475-12486",
      link: "https://pubmed.ncbi.nlm.nih.gov/39360631/"
    },
    {
      authors: "Bowman RL, Dunbar AJ, Mishra T, Xiao W, Waarts MR, Maestre IF, Eisman SE, Cai L, Mowla S, Shah N, Youn A, Bennett L, Fontenard S, Gounder S, Gandhi A, Bowman M, O'Connor K, Zaroogian Z, Sánchez-Vela P, Martinez Benitez AR, Werewski M, Park Y, Csete IS, Krishnan A, Lee D, Boorady N, Potts CR, Jenkins MT, Cai SF, Carroll MP, Meyer SE, Miles LA, Ferrell PB Jr, Trowbridge JJ, Levine RL.",
      year: 2024,
      title: "In vivo models of subclonal oncogenesis and dependency in hematopoietic malignancy",
      journal: "Cancer Cell",
      volume: "11(42): 1955-1969.e7",
      link: "https://pubmed.ncbi.nlm.nih.gov/39532065/"
    },
    {
      authors: "Liang C, Malik S, He M, Groom L, Ture SK, O'Connor TN, Morrell CN, Dirksen RT.",
      year: 2024,
      title: "Compound heterozygous RYR1-RM mouse model reveals disease pathomechanisms and muscle adaptations to promote postnatal survival",
      journal: "FASEB J",
      volume: "20(38): e70120",
      link: "https://pubmed.ncbi.nlm.nih.gov/39466056/"
    },
    {
      authors: "Liouta K, Lubas M, Venugopal V, Chabbert J, Jeannière C, Diaz C, Munier M, Tessier B, Claverol S, Favereaux A, Sainlos M, de Wit J, Letellier M, Thoumine O, Chamma I.",
      year: 2024,
      title: "LRRTM2 controls presynapse nano-organization and AMPA receptor sub-positioning through Neurexin-binding interface",
      journal: "Nat Commun",
      volume: "15(1): 8807",
      link: "https://pubmed.ncbi.nlm.nih.gov/39394199/"
    },
    {
      authors: "Ramasamy C, Neelamegam K, Ramachandran S, Xia H, Kapusta DR, Danesh FR, Pandey KN.",
      year: 2024,
      title: "Podocyte Cell-Specific Npr1 is Required for Blood Pressure and Renal Homeostasis in Male and Female Mice: Role of Sex-Specific Differences",
      journal: "Physiol Genomics",
      volume: "56(10): 672-690",
      link: "https://pubmed.ncbi.nlm.nih.gov/39101921/"
    },
    {
      authors: "Hockemeyer K, Sakellaropoulos T, Chen X, Ivashkiv O, Sirenko M, Zhou H, Gambi G, Battistello E, Avrampou K, Sun Z, Guillamot M, Chiriboga L, Jour G, Dolgalev I, Corrigan, K, Bhatt, Osman I, Tsirigos A, Kourtis N, Aifantis I.",
      year: 2024,
      title: "The stress response regulator HSF1 modulates natural killer cell anti-tumour immunity",
      journal: "Nat Cell Bio",
      volume: "26(10): 1734-1744",
      link: "https://pubmed.ncbi.nlm.nih.gov/39223375/"
    },
    {
      authors: "Marshall Moscon S, Neely E, Proctor E, Connor J.",
      year: 2024,
      title: "A common variant in the iron regulatory gene (Hfe) alters the metabolic and transcriptional landscape in brain regions vulnerable to neurodegeneration",
      journal: "Neurochem",
      volume: "9(168): 3132-3153",
      link: "https://pubmed.ncbi.nlm.nih.gov/39072788/"
    },
    {
      authors: "van Doremalen N, Bushmaker T, Fischer RJ, Okumura A, Figueroa Acosta D M, McMinn RJ, Letko M, Scott D, Saturday G, Munster VJ.",
      year: 2024,
      title: "Transmission dynamics of MERS-CoV in a transgenic human DPP4 mouse model",
      journal: "npj viruses2(36)",
      volume: "",
      link: "https://www.nature.com/articles/s44298-024-00048-y#citeas"
    },
    {
      authors: "Andres-Hernando A, Orlicky DJ, Kuwabara M, Fini MA, Tolan DR, Johnson RJ, Lanaspa MA.",
      year: 2024,
      title: "Activation of AMPD2 drives metabolic dysregulation and liver disease in mice with hereditary fructose intolerance",
      journal: "Commun Biol",
      volume: "7(1): 849",
      link: "https://pubmed.ncbi.nlm.nih.gov/38992061/"
    },
    {
      authors: "Sabui S, Anthonymuthu S, Ramamoorthy K, Skupsky J, Jennings TSK, Rahmatpanah F, Fleckenstein JM, Said HM.",
      year: 2024,
      title: "Effect of knocking out mouse Slc44a4 on colonic uptake of the microbiota-generated thiamine pyrophosphate and on colon physiology",
      journal: "Am J Physiol Gastrointest Liver Physiol",
      volume: "327(1): G36-G46",
      link: "https://pubmed.ncbi.nlm.nih.gov/38713615/"
    },
    {
      authors: "Serrano J, Boyd J, Brown IS, Mason C, Smith KR, Karolyi K, Maurya SK, Meshram NN, Serna V, Link GM, Gardell SJ, Kyriazis GA.",
      year: 2024,
      title: "The TAS1R2 G-protein-coupled receptor is an ambient glucose sensor in skeletal muscle that regulates NAD homeostasis and mitochondrial capacity",
      journal: "Nat Commun",
      volume: "15(1): 4915",
      link: "https://pubmed.ncbi.nlm.nih.gov/38851747/"
    },
    {
      authors: "Du SW, Komirisetty R, Lewandowski D, Choi EH, Panas D, Suh S, Tabaka M, Radu RA, Palczewski K.",
      year: 2024,
      title: "Conditional deletion of miR-204 and miR-211 in murine retinal pigment epithelium results in retinal degeneration",
      journal: "J Biol Chem",
      volume: "300(6): 107344",
      link: "https://pubmed.ncbi.nlm.nih.gov/38705389/"
    },
    {
      authors: "Corral-Sarasa J, Manuel Martínez-Gálvez J, González-García P, Wendling O, Jiménez-Sánchez L, López-Herrador S, Quinzii CM, Díaz-Casado ME, López LC.",
      year: 2024,
      title: "4-Hydroxybenzoic acid rescues multisystemic disease and perinatal lethality in a mouse model of mitochondrial disease",
      journal: "Cell Rep",
      volume: "43(5): 114148",
      link: "https://pubmed.ncbi.nlm.nih.gov/38697100/"
    },
    {
      authors: "Bassetto M, Kolesnikov AV, Lewandowski D, Kiser JZ, Halabi M, Einstein DE, Choi EH, Palczewski K, Kefalov VJ, Kiser PD.",
      year: 2024,
      title: "Dominant role for pigment epithelial CRALBP in supplying visual chromophore to photoreceptors",
      journal: "Cell Rep",
      volume: "43(5): 114143",
      link: "https://pubmed.ncbi.nlm.nih.gov/38676924/"
    },
    {
      authors: "Benbarche S, Pineda JMB, Galvis LB, Biswas J, Liu B, Wang E, Zhang Q, Hogg SJ, Lyttle K, Dahi A, Lewis AM, Sarchi M, Rahman J, Fox N, Ai Y, Mehta S, Garippa R, Ortiz-Pacheco J, Li Z, Monetti M, Stanley RF, Doulatov S, Bradley RK, Abdel-Wahab O.",
      year: 2024,
      title: "GPATCH8 modulates mutant SF3B1 mis-splicing and pathogenicity in hematologic malignancies",
      journal: "Mol Cell",
      volume: "84(10): 1886-1903",
      link: "https://pubmed.ncbi.nlm.nih.gov/38688280/"
    },
    {
      authors: "Thomas ME, Qi W, Walsh MP, Ma J, Westover T, Abdelhamed S, Ezzell LJ, Rolle C, Xiong E, Rosikiewicz W, Xu B, Loughran AJ, Pruett-Miller SM, Janke LJ, Klco JM.",
      year: 2024,
      title: "Functional characterization of cooperating MGA mutations in RUNX1::RUNX1T1 acute myeloid leukemia",
      journal: "Leukemia",
      volume: "5(38): 991-1002",
      link: "https://pubmed.ncbi.nlm.nih.gov/38454121/"
    },
    {
      authors: "Dunbar, AJ, Bowman, RL, Park YC, O'Connor K, Izzo F, Myers RM, Karzai A,Zaroogian Z, Kim WJ, Fernández-Maestre I, Waarts MR, Nazir A, Xiao W,Codilupi T, Brodsky M, Farina M, Cai L, Cai SF, Wang B, An W, Yang JL,Mowla S, Eisman SE, Hanasoge Somasundara AV, Glass JL, Mishra T, Houston R, Guzzardi E, Martinez Benitez AR, Viny AD, Koche RP, Meyer SC, Landau DA, Levine RL.",
      year: 2024,
      title: "Jak2V617F Reversible Activation Shows Its Essential Requirement in Myeloproliferative Neoplasms",
      journal: "Cancer Discov",
      volume: "14(5): 737-751",
      link: "https://pubmed.ncbi.nlm.nih.gov/38230747/"
    },
    {
      authors: "Kittaka M, Mizuno N, Morino H, Yoshimoto T, TZhu T, Liu S, Wang Z, Mayahara K, Iio K, Kondo K, Kondo T, Hayashi T, Coghlan S, Teno Y, Anh Phung Doan A, Levitan M, Choi RB, Matsuda S, Ouhara K, Wan J, Cassidy AM, Pelletier S, Nampoothiri S, Urtizberea AJ, Robling AG, Ono M, Kawakami H, Reichenberger EJ, Ueki Y.",
      year: 2024,
      title: "Loss-of-function OGFRL1 variants identified in autosomal recessive cherubism families",
      journal: "JBMR Plus",
      volume: "8(6): ziae050",
      link: "https://pubmed.ncbi.nlm.nih.gov/38699440/"
    },
    {
      authors: "Tsvilovskyy V, Ottenheijm R, Kriebs U, Schütz A, Diakopoulos KN, Jha A, Bildl W, Wirth A, Böck J, Jaślan D, Ferro I, Taberner FJ, Kalinina O, Hildebrand S, Wissenbach U, Weissgerber P, Vogt D, Eberhagen C, Mannebach S, Berlin M, Kuryshev V, Schumacher D, Philippaert K, Camacho-Londoño JE, Mathar I, Dieterich C, Klugbauer N, Biel M, Wahl-Schott C, Lipp P, Flockerzi V, Zischka H, Algül H, Lechner SG, Lesina M, Grimm C, Fakler B, Schulte U, Muallem S, Freichel M.",
      year: 2024,
      title: "OCaR1 endows exocytic vesicles with autoregulatory competence by preventing uncontrolled Ca2+ release, exocytosis, and pancreatic tissue damage",
      journal: "J Clin Invest",
      volume: "134(7): e169428",
      link: "https://pubmed.ncbi.nlm.nih.gov/38557489/"
    },
    {
      authors: "Herrera JL, Komatsu M.",
      year: 2024,
      title: "Akt3 activation by R-Ras in an endothelial cell enforces quiescence and barrier stability of neighboring endothelial cells via Jagged1",
      journal: "Cell Rep",
      volume: "43(3): 113837",
      link: "https://pubmed.ncbi.nlm.nih.gov/38402584/"
    },
    {
      authors: "Yamada M, Keller RR, Lopez Gutierrez R, Cameron D, Suzuki H, Sanghrajka R,Vaynshteyn J, Gerwin J, Maura F, Hooper W, Shah M, Robine N, Demarest P, Bayin NS, Jubierre Zapater L, Reed C, Hébert S, Masilionis I, Chaligne R, Socci N D, Taylor MD, Kleinman CL, Joyner AL, Raju P, Kentsis A.",
      year: 2024,
      title: "Childhood cancer mutagenesis caused by transposase-derived PGBD5",
      journal: "Sci Adv",
      volume: "10(12): eadn4649",
      link: "https://pubmed.ncbi.nlm.nih.gov/38517960/"
    },
    {
      authors: "Xu J, Choi R, Gupta K, Warren HR, Santhanam L, Pluznick JL.",
      year: 2024,
      title: "An evolutionarily conserved olfactory receptor is required for sex differences in blood pressure",
      journal: "Science Advances",
      volume: "12(10): eadk1487",
      link: "https://pubmed.ncbi.nlm.nih.gov/38507492/"
    },
    {
      authors: "Amici DR, Alhayek S, Klein AT, Wang YZ, Wilen AP, Song W, Zhu P, Thakkar A, King MA, Steffeck AW, Alasady MJ, Peek C, Savas JN, Mendillo ML.",
      year: 2024,
      title: "Tight regulation of a nuclear HAPSTR1-HUWE1 pathway essential for mammalian life",
      journal: "Life Sci. Alliance",
      volume: "7(5): e202302370",
      link: "https://pubmed.ncbi.nlm.nih.gov/38453366/"
    },
    {
      authors: "Ma J, Al Moussawi K, Lou H, Chan HF, Wang Y, Chadwick J, Phetsouphanh C, Slee EA, Zhong S, Leissing TM, Roth A, Qin X, Chen S, Yin J, Ratnayaka I, Hu Y, Louphrasitthiphol P, Taylor L, Bettencourt PJG, Muers M, Greaves DR, McShane H, Goldin R, Soilleux EJ, Coleman ML, Ratcliffe PJ, Lu X.",
      year: 2024,
      title: "Deficiency of factor-inhibiting HIF creates a tumor-promoting immune microenvironment",
      journal: "Proc Natl Acad Sci U S A",
      volume: "121(10): e2309957121",
      link: "https://pubmed.ncbi.nlm.nih.gov/38422022/"
    },
    {
      authors: "Chakrabarti S, Klich JD, Khallaf MA, Hulme AJ, Sánchez-Carranza O, Baran Z M, Rossi A, Huang A T-L, Pohl T, Fleischer R, Fürst C, Hammes A, Bégay V, Hörnberg H, Finol-Urdaneta RK, Poole K, Dottori M, Lewin GR.",
      year: 2024,
      title: "Touch sensation requires the mechanically gated ion channel ELKIN1",
      journal: "Science",
      volume: "6686(383): 992-998",
      link: "https://pubmed.ncbi.nlm.nih.gov/38422143/"
    },
    {
      authors: "Desiderio S, Schwaller F, Tartour K, Padmanabhan K, Lewin GR, Carroll P, Marmigere F.",
      year: 2024,
      title: "Touch receptor end-organ innervation and function require sensory neuron expression of the transcription factor Meis2",
      journal: "eLife 12 (RP89287)",
      volume: "",
      link: "https://pubmed.ncbi.nlm.nih.gov/38386003/"
    },
    {
      authors: "Chhabra KH, Bathina S, Faniyan TS, Samuel DJ, Raza MU, de Souza Cordeiro LM, Viana Di Prisco G, Atwood BK, Robles J, Bainbridge L, Davis A.",
      year: 2024,
      title: "ADGRL1 is a glucose receptor involved in mediating energy and glucose homeostasis",
      journal: "Diabetologia",
      volume: "67(1): 170-189",
      link: "https://pubmed.ncbi.nlm.nih.gov/37712955/"
    }
  ],
  "2023": [
    {
      authors: "Lenz G, Luther SA, Thome M.",
      year: 2023,
      title: "Identification of Tensin-3 as a MALT1 substrate that controls B cell adhesion and lymphoma dissemination.",
      journal: "Proc Natl Acad Sci U S A",
      volume: "120(52): e2301155120",
      link: "https://pubmed.ncbi.nlm.nih.gov/38109544/"
    },
    {
      authors: "Miyauchi S, Arimoto KI, Liu M, Zhang Y, Zhang DE.",
      year: 2023,
      title: "Reprogramming of tumor-associated macrophages via NEDD4-mediated CSF1R degradation by targeting USP18",
      journal: "Cell Rep",
      volume: "42(12): 113560",
      link: "https://pubmed.ncbi.nlm.nih.gov/38100351/"
    },
    {
      authors: "Engavale M, Hernandez CJ, Infante A, LeRoith T, Radovan E, Evans L, Villarreal J, Reilly CM,  Sutton RB, Keyel PA.",
      year: 2023,
      title: "Deficiency of macrophage-derived Dnase1L3 causes lupus-like phenotypes in mice.",
      journal: "J Leukoc Biol",
      volume: "114(6): 547-556",
      link: "https://pubmed.ncbi.nlm.nih.gov/37804110/#:~:text=In%20contrast%20to%20global%20Dnase1L3,derived%20DnaselL3%20helps%20limit%20lupus."
    },
    {
      authors: "Doremalen Nv, Bushmaker T, Fischer RJ, Okumura A, Figueroa D, McMinn RJ, Letko M, Saturday G, Munster VJ.",
      year: 2023,
      title: "Transmission dynamics of MERS-CoV in a transgenic human DPP4 mouse model",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/2023.11.22.568286v1.article-info"
    },
    {
      authors: "Thomas CI, Anderson JR, Alexis A, Guerrero-Given D, Chavez A, McNabb MC, Unal B, Ehlers MD, Bolton MM, Kamasawa N.",
      year: 2023,
      title: "A multi-faceted analysis of synapses reveals the role of neuroligin-1 cleavage in presynaptic vesicle accumulation in the lateral amygdala",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/2023.11.07.566075v1.article-info"
    },
    {
      authors: "Le TDV, Liu D, Ellis BJ, Collins S, Ayala JE.",
      year: 2023,
      title: "Glucagon-Like Peptide-1 Receptor Activation Stimulates PKA-Mediated Phosphorylation of Raptor and this Contributes to the Weight Loss Effect of Liraglutide.",
      journal: "Elife",
      volume: "6(12): e80944",
      link: "https://pubmed.ncbi.nlm.nih.gov/37930356/"
    },
    {
      authors: "Alexander M, Upadhyay V, Rock R, Ramirez L, Puchalska P, Orellana D, Ang QY, Turnbaugh JA, Tian Y, Dumlao D, Nayak R, Patterson A, Newman JC, Crawford PA, Turnbaugh PJ.",
      year: 2023,
      title: "A diet-dependent host metabolite shapes the gut microbiota to protect from autoimmunity",
      journal: "bioRxiv",
      volume: "",
      link: "https://pubmed.ncbi.nlm.nih.gov/37961209/"
    },
    {
      authors: "Haley M, Bertrand J, Anderson VT, Fuad M, Frenguelli BG, Corrêa SAL, Wall MJ.",
      year: 2023,
      title: "Arc expression regulates long-term potentiation magnitude and metaplasticity in area CA1 of the hippocampus in ArcKR mice",
      journal: "Eur J Neurosci",
      volume: "58(10): 4166-4180",
      link: "https://pubmed.ncbi.nlm.nih.gov/37821126/"
    },
    {
      authors: "Burzynski LC, Morales-Maldonado A, Rodgers A, Kitt LA, Humphry M, Figg N, Bennett MR, Clarke MCH.",
      year: 2023,
      title: "Thrombin-activated interleukin-1α drives atherogenesis, but also promotes vascular smooth muscle cell proliferation and collagen production.",
      journal: "Cardiovasc Res",
      volume: "119(12): 2179-89",
      link: "https://pubmed.ncbi.nlm.nih.gov/37309666/"
    },
    {
      authors: "Liu Q, Bell BJ, Kim DW, Lee SS, Keles MF, Blum ID, Wang AA, Blank EJ, Xiong J, Bedont JL, Chang AJ, Issa H, Cohen JY, Blackshaw S, Wu MN.",
      year: 2023,
      title: "A clock-dependent brake for rhythmic arousal in the dorsomedial hypothalamus.",
      journal: "Nat Commun",
      volume: "14(1): 6381",
      link: "https://pubmed.ncbi.nlm.nih.gov/37821426/"
    },
    {
      authors: "Parekh VI, Brinster LR, Guan B, Simonds WF, Weinstein LS, Agarwal SK.",
      year: 2023,
      title: "A Knock-In Mouse Model of the Gcm2 Variant p.Y392S Develops Normal Parathyroid Glands.",
      journal: "J Endocr Soc",
      volume: "7(11): bvad126",
      link: "https://pubmed.ncbi.nlm.nih.gov/37885910/"
    },
    {
      authors: "Chen YH, Wu HL, Gower BA, Azziz R.",
      year: 2023,
      title: "SAT386 Constitutive Overexpression Of Microrna-93 As A Cause Of Metabolic Dysfunction And Hyperandrogenism In Polycystic Ovary Syndrome (PCOS): Evidence From A Transgenic (Mir-93+) Murine Model.",
      journal: "J Endocr Soc",
      volume: "7(Suppl 1): bvad114.1691",
      link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10555862/"
    },
    {
      authors: "Martin M, Motolani A, Kim HG, Collins AM, Alipourgivi F, Jin J, Wei H, Wood BA, Ma YY, Dong XC, Mirmira RG, Lu T.",
      year: 2023,
      title: "KDM2A Deficiency in the Liver Promotes Abnormal Liver Function and Potential Liver Damage.",
      journal: "Biomolecules",
      volume: "13(10): 1457",
      link: "https://pubmed.ncbi.nlm.nih.gov/37892137/"
    },
    {
      authors: "Klco J, Iii MT, Qi W, Walsh M, Ma J, Westover T, Abdelhamed S, Ezzell L, Rolle C, Xiong E, Rosikiewicz W, Xu B, Pruett-Miller S, Loughran A, Janke L.",
      year: 2023,
      title: "Functional Characterization of Cooperating MGA Mutations in RUNX1::RUNX1T1 Acute Myeloid Leukemia",
      journal: "Res Sq",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10543392/"
    },
    {
      authors: "Crane R, Tebbe L, Mwoyosvi ML, Al-Ubaidi MR, Naash MI.",
      year: 2023,
      title: "Expression of the human usherin c.2299delG mutation leads to early-onset auditory loss and stereocilia disorganization",
      journal: "Commun Biol",
      volume: "6(1): 933",
      link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10497539/"
    },
    {
      authors: "Watt HJ, Chawla AS, Lamoliatte F, Pryde S, Knatko E, Rasmussen KD, Bending D, Swamy M.",
      year: 2023,
      title: "Rewiring of the TCR signalosome in natural intestinal Intraepithelial T lymphocytes drives non-deletional tolerance.",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/2023.09.01.555859.abstract"
    },
    {
      authors: "Tworak A, Kolesnikov AV, Hong JD, Choi EH, Luu JC, Palczewska G, Dong Z, Lewandowski D, Brooks MJ, Campello L, Swaroop A, Kiser PD, Kefalov VJ, Palczewski K.",
      year: 2023,
      title: "Rapid RGR-dependent visual pigment recycling is mediated by the RPE and specialized Müller glia",
      journal: "Cell Rep",
      volume: "42(8): 112982",
      link: "https://pubmed.ncbi.nlm.nih.gov/37585292/"
    },
    {
      authors: "Mazucanti CH, Kennedy V, Jr., Premathilake HU, Doyle ME, Tian J, Liu QR, O’Connell J, Camandola S, Egan JM.",
      year: 2023,
      title: "AAV5-mediated manipulation of insulin expression in choroid plexus has long-term metabolic and behavioral consequences.",
      journal: "Cell Rep",
      volume: "42(8): 112903",
      link: "https://pubmed.ncbi.nlm.nih.gov/37515772/"
    },
    {
      authors: "Tsitsikov EN, Phan KP, Liu Y, Tsytsykova AV, Paterno R, Sherry DM, Johnson AC, Dunn IF.",
      year: 2023,
      title: "Spontaneous Mutation in 2310061I04Rik Results in Reduced Expression of Mitochondrial Genes and Impaired Brain Myelination.",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/2023.08.10.552737.abstract"
    },
    {
      authors: "Feng W, Lopez JR, Antrobus S, Zheng J, Uryash A, Dong Y, Beqollari D, Bannister RA, Hopkins PM, Beam KG, Allen PD, Pessah IN.",
      year: 2023,
      title: "Putative malignant hyperthermia mutation Ca(V)1.1-R174W is insufficient to trigger a fulminant response to halothane or confer heat stress intolerance.",
      journal: "J Biol Chem",
      volume: "299(8): 104992",
      link: "https://pubmed.ncbi.nlm.nih.gov/37392848/"
    },
    {
      authors: "Souza G, Stornetta DS, Shi Y, Lim E, Berry FE, Bayliss DA, Abbott SBG.",
      year: 2023,
      title: "Neuromedin B-expressing neurons in the retrotrapezoid nucleus regulate respiratory homeostasis and promote stable breathing in adult mice.",
      journal: "J Neurosci",
      volume: "43(30): 5501-5520",
      link: "https://pubmed.ncbi.nlm.nih.gov/37290937/"
    },
    {
      authors: "Tsitsikov EN, Phan KP, Liu Y, Tsytsykova AV, Kinter M, Selland L, Garman L, Griffin C, Dunn IF.",
      year: 2023,
      title: "TRAF7 is an essential regulator of blood vessel integrity during mouse embryonic and neonatal development",
      journal: "iScience",
      volume: "26(8): 107474",
      link: "https://pubmed.ncbi.nlm.nih.gov/37583551/"
    },
    {
      authors: "Ikelle L, Makia M, Lewis T, Crane R, Kakakhel M, Conley SM, Birtley JR, Arshavsky VY, Al-Ubaidi MR, Naash MI.",
      year: 2023,
      title: "Comparative study of PRPH2 D2 loop mutants reveals divergent disease mechanism in rods and cones.",
      journal: "Cell Mol Life Sci",
      volume: "80(8): 214",
      link: "https://pubmed.ncbi.nlm.nih.gov/37466729/"
    },
    {
      authors: "Dong L, Cheng R, Ma X, Liang W, Hong Y, Li H, Zhou K, Du Y, Takahashi Y, Zhang X, Li X, Ma JX.",
      year: 2023,
      title: "Regulation of monocyte activation by PPARα through interaction with the cGAS-STING pathway.",
      journal: "Diabetes",
      volume: "72(7): 958-972",
      link: "https://pubmed.ncbi.nlm.nih.gov/37058417/"
    },
    {
      authors: "Li H, Chaitankar V, Cui L, Chen W, Chin K, Zhu J, Liu W, Rodgers GP.",
      year: 2023,
      title: "Characterization of olfactomedin 4+ cells in prostate and urethral-tube epithelium during murine postnatal development and in adult mice.",
      journal: "Sci Rep",
      volume: "13(1): 10290",
      link: "https://pubmed.ncbi.nlm.nih.gov/37357228/"
    },
    {
      authors: "Fauteux-Daniel S, Merlo Pich LM, Girard-Guyonvarc’h C, Caruso A, Rodriguez E, Gabay C.",
      year: 2023,
      title: "The role of interleukin-18 and interleukin-18 binding protein in K/BxN serum transfer-induced arthritis",
      journal: "Front Immunol14: 1215364",
      volume: "",
      link: "https://pubmed.ncbi.nlm.nih.gov/37415987/"
    },
    {
      authors: "Kouvaros S, Bizup B, Solis O, Kumar M, Ventriglia E, Curry FP, Michaelides M, Tzounopoulos T.",
      year: 2023,
      title: "A CRE/DRE dual recombinase transgenic mouse reveals synaptic zinc-mediated thalamocortical neuromodulation.",
      journal: "Sci Adv",
      volume: "9(23): eadf3525",
      link: "https://pubmed.ncbi.nlm.nih.gov/37294760/"
    },
    {
      authors: "Chakrabarti S, Klich JD, Khallaf MA, Sánchez-Carranza O, Baran ZM, Rossi A, Tzu-Lun Huang A, Pohl T,  Fleischer R, Fürst C, Hammes A, Bégay V, Hörnberg H, Poole K, Lewin GR.",
      year: 2023,
      title: "Touch sensation requires the mechanically-gated ion channel Elkin1",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/2023.06.09.544247v1.article-info"
    },
    {
      authors: "Harel M, Fauteux-Daniel S, Rodriguez E, Palmer G, Gabay C.",
      year: 2023,
      title: "IL-18 Binding Protein-Producing Cells Attenuate Anemia in Murine Macrophage Activation Syndrome.",
      journal: "J Immunol",
      volume: "210(11): 1790-1803",
      link: "https://pubmed.ncbi.nlm.nih.gov/37074208/"
    },
    {
      authors: "Zapater LJ, Rodriguez-Fos E, Planas-Felix M, Lewis S, Cameron D, Demarest P, Nabila A, Zhao J, Bergin P, Reed C, Yamada M, Pagnozzi A, Nava C, Bourel-Ponchel E, Neilson DE, Dursun A, Özgül RK, Akar HT, Socci ND, Hayes M, Rabadan R, Torrents D, Kruer MC, Toth M, Kentsis A.",
      year: 2023,
      title: "A transposase-derived gene required for human brain development",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/2023.04.28.538770.abstract"
    },
    {
      authors: "Fernandez RF, Wilson ES, Diaz V, Martínez-Gardeazabal J, Foguth R, Cannon JR, Jackson SN, Hermann BP, Eells JB, Ellis JM.",
      year: 2023,
      title: "Lipid metabolism in dopaminergic neurons influences light entrainment.",
      journal: "J Neurochem",
      volume: "165(3): 379-90",
      link: "https://pubmed.ncbi.nlm.nih.gov/36815399/"
    },
    {
      authors: "Fellermeyer M, Anzilotti C, Paluch C, Cornall RJ, Davis SJ, Gileadi U.",
      year: 2023,
      title: "Combination CD200R/PD-1 blockade in a humanised mouse model.",
      journal: "Immunother Adv",
      volume: "3(1): ltad006",
      link: "https://pubmed.ncbi.nlm.nih.gov/37082107/"
    },
    {
      authors: "Liang W, Huang L, Whelchel A, Yuan T, Ma X, Cheng R, Takahashi Y, Karamichos D, Ma J-X.",
      year: 2023,
      title: "Peroxisome proliferator-activated receptor-α (PPARα) regulates wound healing and mitochondrial metabolism in the cornea.",
      journal: "Proc Natl Acad Sci U S A",
      volume: "120(13): e2217576120",
      link: "https://pubmed.ncbi.nlm.nih.gov/36943878/"
    },
    {
      authors: "Yang Y, Reid MA, Hanse EA, Li H, Li Y, Ruiz BI, Fan Q, Kong M.",
      year: 2023,
      title: "SAPS3 subunit of protein phosphatase 6 is an AMPK inhibitor and controls metabolic homeostasis upon dietary challenge in male mice.",
      journal: "Nat Commun",
      volume: "14(1): 1368",
      link: "https://pubmed.ncbi.nlm.nih.gov/36914647/"
    },
    {
      authors: "Poria D, Kolesnikov AV, Lee TJ, Salom D, Palczewski K, Kefalov VJ.",
      year: 2023,
      title: "Investigating the Role of Rhodopsin F45L Mutation in Mouse Rod Photoreceptor Signaling and Survival.",
      journal: "eNeuro10(3)",
      volume: "",
      link: "https://pubmed.ncbi.nlm.nih.gov/36823167/"
    },
    {
      authors: "Flinois A, Méan I, Mutero-Maeda A, Guillemot L, Citi S.",
      year: 2023,
      title: "Paracingulin recruits CAMSAP3 to tight junctions and regulates microtubule and polarized epithelial organization.",
      journal: "J Cell Sci",
      volume: "137(5): jcs260745",
      link: "https://pubmed.ncbi.nlm.nih.gov/37013686/"
    },
    {
      authors: "Wang J, Zhang Z, Guan J, Tung HC, Xie J, Huang H, Chen Y, Xu M, Ren S, Li S, Zhang M, Yang D, Xie W.",
      year: 2023,
      title: "Hepatocyte estrogen sulfotransferase inhibition protects female mice from Concanavalin A-induced T cell-mediated hepatitis independent of estrogens.",
      journal: "J Biol Chem",
      volume: "299(3): 103026",
      link: "https://pubmed.ncbi.nlm.nih.gov/36796516/"
    },
    {
      authors: "Kim JS, Sun H, Meeker S, Undem BJ.",
      year: 2023,
      title: "Role of Na(V) 1.9 in inflammatory mediator-induced activation of mouse airway vagal C-fibres.",
      journal: "J Physiol",
      volume: "601(6): 1139-1150",
      link: "https://pubmed.ncbi.nlm.nih.gov/36750759/"
    },
    {
      authors: "Tebbe L, Mwoyosvi ML, Crane R, Makia MS, Kakakhel M, Cosgrove D, Al-Ubaidi MR, Naash MI.",
      year: 2023,
      title: "The usherin mutation c.2299delG leads to its mislocalization and disrupts interactions with whirlin and VLGR1.",
      journal: "Nat Commun",
      volume: "14(1): 972",
      link: "https://pubmed.ncbi.nlm.nih.gov/36810733/"
    },
    {
      authors: "Kyriazis G, Serrano J, Boyd J, Mason C, Smith K, Karolyi K, Kondo S, Brown I, Maurya S, Meshram N, Serna V, Gilger J, Branch D, Gardell S, Baskin K, Ayala J, Pratley R, Goodpaster B, Coen P.",
      year: 2023,
      title: "The TAS1R2 sweet taste receptor regulates skeletal muscle mass and fitness.",
      journal: "Res Sq [Preprint]",
      volume: "",
      link: "https://pubmed.ncbi.nlm.nih.gov/36798161/"
    },
    {
      authors: "Barth K, Vasić V, McDonald B, Heinig N, Wagner MC, Schumann U, Röhlecke C, Bicker F, Schumann L, Radyushkin K, Baumgart J, Tenzer S, Zipp F, Meinhardt M, Alitalo K, Tegeder I, Schmidt MHH.",
      year: 2023,
      title: "EGFL7 loss correlates with increased VEGF-D expression, upregulating hippocampal adult neurogenesis and improving spatial learning and memory.",
      journal: "Cell Mol Life Sci",
      volume: "80(2): 54",
      link: "https://pubmed.ncbi.nlm.nih.gov/36715759/"
    },
    {
      authors: "Mlynarczyk C, Teater M, Pae J, Chin CR, Wang L, Arulraj T, Barisic D, Papin A, Hoehn KB, Kots E, Ersching J, Bandyopadhyay A, Barin E, Poh HX, Evans CM, Chadburn A, Chen Z, Shen H, Isles HM, Pelzer B, Tsialta I, Doane AS, Geng H, Rehman MH, Melnick J, Morgan W, Nguyen DTT, Elemento O, Kharas MG, Jaffrey SR, Scott DW, Khelashvili G, Meyer-Hermann M, Victora GD, Melnick A.",
      year: 2023,
      title: "BTG1 mutation yields supercompetitive B cells primed for malignant transformation.",
      journal: "Science",
      volume: "379(6629): eabj7412",
      link: "https://pubmed.ncbi.nlm.nih.gov/36656933/"
    }
  ],
  "2022": [
    {
      authors: "Nakamura S, Tanimoto K, Bhawal UK.",
      year: 2022,
      title: "Ribosomal Stress Couples with the Hypoxia Response in Dec1-Dependent Orthodontic Tooth Movement.",
      journal: "Int J Mol Sci",
      volume: "24(1): 618",
      link: "https://pubmed.ncbi.nlm.nih.gov/36614058/"
    },
    {
      authors: "Ojeda-Alonso J, Bégay V, Garcia-Contreras J, Campos-Pérez A, Purfürst B, Lewin G.",
      year: 2022,
      title: "Lack of evidence for participation of TMEM150c/TENTONIN3 in sensory mechanotransduction.",
      journal: "J Gen Physiol",
      volume: "154(12): e202213098",
      link: "https://pubmed.ncbi.nlm.nih.gov/36256908/"
    },
    {
      authors: "Engelmann J, Zarrer J, Gensch V, Riecken K, Berenbrok N, Luu TV, Beitzen-Heineke A, Vargas-Delgado ME, Pantel K, Bokemeyer C, Bhamidipati S, Darwish IS, Masuda E, Burstyn-Cohen T, Alberto EJ, Ghosh S, Rothlin C, Hesse E, Taipaleenmäki H, Ben-Batalla I, Loges S.",
      year: 2022,
      title: "Regulation of bone homeostasis by MERTK and TYRO3.",
      journal: "Nat Commun",
      volume: "13(1): 7689",
      link: "https://pubmed.ncbi.nlm.nih.gov/36509738/"
    },
    {
      authors: "Wischhof L, Lee HM, Tutas J, Overkott C, Tedt E, Stork M, Peitz M, Brüstle O, Ulas T, Händler K, Schultze JL, Ehninger D, Nicotera P, Salomoni P, Bano D.",
      year: 2022,
      title: "BCL7A-containing SWI/SNF/BAF complexes modulate mitochondrial bioenergetics during neural progenitor differentiation.",
      journal: "EMBO J",
      volume: "41(23): e110595",
      link: "https://pubmed.ncbi.nlm.nih.gov/36305367/"
    },
    {
      authors: "Yuan T, Dong L, Pearsall EA, Zhou K, Cheng R, Ma JX.",
      year: 2022,
      title: "The Protective Role of Microglial PPARα in Diabetic Retinal Neurodegeneration and Neurovascular Dysfunction.",
      journal: "Cells",
      volume: "11(23): 3869",
      link: "https://pubmed.ncbi.nlm.nih.gov/36497130/"
    },
    {
      authors: "Xu J, Choi R, Gupta K, Warren HR, Santhanam L, Pluznick JL.",
      year: 2022,
      title: "An evolutionarily conserved olfactory receptor is required for sex differences in blood pressure.",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/2022.11.16.516677v1.abstract"
    },
    {
      authors: "Abdelhamed S, Thomas ME, Westover T, Umeda M, Xiong, E, Rolle, C, Walsh MP, Wu H, Schwartz JR, Valentine V, Valentine M, Pounds S, Ma J, Janke LJ, Klco JM.",
      year: 2022,
      title: "Mutant Samd9l expression impairs hematopoiesis and induces bone marrow failure in mice.",
      journal: "J Clin Invest",
      volume: "132(21): e158869",
      link: "https://pubmed.ncbi.nlm.nih.gov/36074606/"
    },
    {
      authors: "Keller TCSt, Lechauve C, Keller AS, Broseghini-Filho GB, Butcher JT, Askew Page HR, Islam A, Yin Tan Z, DeLalio LJ, Brooks S, Sharma P, Hong K, Xu W, Simão Padilha A, Ruddiman CA, Best AK, Macal E, Kim-Shapiro DB, Christ G, Yan Z, Cortese-Krott MM, Ricart K, Patel R, Bender TP, Sonkusare SK, Weiss MJ, Ackerman H, Columbus L, Isakson BE.",
      year: 2022,
      title: "Endothelial alpha globin is a nitrite reductase.",
      journal: "Nat Commun",
      volume: "13(1): 6405",
      link: "https://pubmed.ncbi.nlm.nih.gov/36302779/"
    },
    {
      authors: "Al-Mass A, Poursharifi P, Peyot ML, Lussier R, Chenier I, Leung YH, Ghosh A, Oppong A, Possik E, Mugabo Y, Ahmad R, Sladek R, Murthy Madiraju SR, Al-Mulla F, Prentki M.",
      year: 2022,
      title: "Hepatic glycerol shunt and glycerol-3-phosphate phosphatase control liver metabolism and glucodetoxification under hyperglycemia.",
      journal: "Mol Metab66: 101609",
      volume: "",
      link: "https://pubmed.ncbi.nlm.nih.gov/36198384/"
    },
    {
      authors: "Ualiyeva S, Lemire E, Boyd A, Wong C, Avilés EC, Maxfield A, Roditi R, Matsumoto I, Barrett NA, Buchheit KM, Laidlaw TM, Boyce JA, Bankova L, Haber AL.",
      year: 2022,
      title: "Olfactory microvillar tuft cells direct neurogenesis during allergic inflammation.",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/2022.09.26.509561v1.abstract"
    },
    {
      authors: "Lacroix M, Beauchemin H, Fraszczak J, Ross J, Shooshtarizadeh P, Chen R, Möröy T.",
      year: 2022,
      title: "The X-Linked Helicase DDX3X Is Required for Lymphoid Differentiation and MYC-Driven Lymphomagenesis.",
      journal: "Cancer Res",
      volume: "82(17): 3172-86",
      link: "https://pubmed.ncbi.nlm.nih.gov/35815807/"
    },
    {
      authors: "Burn TN, Miot C, Gordon SM, Culberson EJ, Diamond T, Kreiger PA, Hayer KE, Bhattacharyya A, Jones JM, Bassing CH, Behrens EM.",
      year: 2022,
      title: "The RAG1 Ubiquitin Ligase Domain Stimulates Recombination of TCRβ and TCRα Genes and Influences Development of αβ T Cell Lineages.",
      journal: "J Immunol",
      volume: "209(5): 938-949",
      link: "https://pubmed.ncbi.nlm.nih.gov/35948399/"
    },
    {
      authors: "Fonseca FV, Raffay TM, Xiao K, McLaughlin PJ, Qian Z, Grimmett ZW, Adachi N, Wang B, Hausladen A, Cobb BA, Zhang R, Hess DT, Gaston B, Lambert NA, Reynolds JD, Premont RT,  Stamler JS.",
      year: 2022,
      title: "S-nitrosylation is required for β(2)AR desensitization and experimental asthma.",
      journal: "Mol Cell",
      volume: "82(16): 3089-3102",
      link: "https://pubmed.ncbi.nlm.nih.gov/35931084/"
    },
    {
      authors: "Tanaka S, Zheng S, Kharel Y, Fritzemeier RG, Huang T, Foster D, Poudel N, Goggins E, Yamaoka Y, Rudnicka KP, Lipsey JE, Radel HV, Ryuh SM, Inoue T, Yao J, Rosin DL, Schwab SR, Santos WL, Lynch KR, Okusa MD.",
      year: 2022,
      title: "Sphingosine 1-phosphate signaling in perivascular cells enhances inflammation and fibrosis in the kidney.",
      journal: "Sci Transl Med",
      volume: "14(658): eabj2681",
      link: "https://pubmed.ncbi.nlm.nih.gov/35976996/"
    },
    {
      authors: "Akalu YT, Mercau ME, Ansems M, Hughes LD, Nevin J, Alberto EJ, Liu XN, He LZ, Alvarado D, Keler T, Kong Y, Philbrick WM, Bosenberg M, Finnemann SC, Iavarone A, Lasorella A, Rothlin CV, Ghosh S.",
      year: 2022,
      title: "Tissue-specific modifier alleles determine Mertk loss-of-function traits.",
      journal: "Elife11: e80530",
      volume: "",
      link: "https://pubmed.ncbi.nlm.nih.gov/35969037/"
    },
    {
      authors: "Yang H, Yuan L, Ibaragi S, Li S, Shapiro R, Vanli N, Goncalves KA, Yu W, Kishikawa H, Jiang Y, Hu AJ, Jay D, Cochran B, Holland EC, Hu GF.",
      year: 2022,
      title: "Angiogenin and plexin-B2 axis promotes glioblastoma progression by enhancing invasion, vascular association, proliferation and survival.",
      journal: "Br J Cancer",
      volume: "127(3): 422-435",
      link: "https://pubmed.ncbi.nlm.nih.gov/35418212/"
    },
    {
      authors: "Sellar RS, Sperling AS, Słabicki M, Gasser JA, McConkey ME, Donovan KA, Mageed N, Adams DN, Zou C, Miller PG, Dutta RK, Boettcher S, Lin AE, Sandoval B, Quevedo Barrios VA, Kovalcik V, Koeppel J, Henderson EK, Fink EC, Yang L, Chan A, Pangeni Pokharel S, Bergstrom EJ, Burt R, Udeshi ND, Carr SA, Fischer ES, Chen C-W, Ebert BL.",
      year: 2022,
      title: "Degradation of GSPT1 causes TP53-independent cell death in leukemia while sparing normal hematopoietic stem cells.",
      journal: "J Clin Invest",
      volume: "132(16): e153514",
      link: "https://pubmed.ncbi.nlm.nih.gov/35763353/"
    },
    {
      authors: "Li Q, Lin J, Widrick JJ, Luo S, Li G, Zhang Y, Laporte J, Perrella MA, Liu X, Agrawal PB.",
      year: 2022,
      title: "Dynamin-2 reduction rescues the skeletal myopathy of a SPEG-deficient mouse model.",
      journal: "JCI Insight",
      volume: "7(15): e157336",
      link: "https://pubmed.ncbi.nlm.nih.gov/35763354/"
    },
    {
      authors: "Rumney RMH, Róg J, Chira N, Kao AP, Al-Khalidi R, & Górecki DC.",
      year: 2022,
      title: "P2X7 Purinoceptor Affects Ectopic Calcification of Dystrophic Muscles.",
      journal: "Front Pharmacol13: 935804",
      volume: "",
      link: "https://pubmed.ncbi.nlm.nih.gov/35910348/"
    },
    {
      authors: "Keller R, Yamada M, Cameron D, Suzuki H, Sanghrajka R, Vaynshteyn J, Gerwin J, Maura F, Hooper W, Shah M, Robine N, Demarest P, Sumru Bayin N, Jubierre L, Reed C, Taylor MD, Joyner AL, Praveen Raju G, Kentsis A.",
      year: 2022,
      title: "Childhood cancer mutagenesis caused by a domesticated DNA transposase.",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/2022.07.05.498128v1.abstract"
    },
    {
      authors: "Widjaja-Adhi MAK, Kolesnikov AV, Vasudevan S, Park PS, Kefalov VJ, Golczak M.",
      year: 2022,
      title: "Acyl-CoA:wax alcohol acyltransferase 2 modulates the cone visual cycle in mouse retina.",
      journal: "FASEB J",
      volume: "36(7): e22390",
      link: "https://pubmed.ncbi.nlm.nih.gov/35665537/"
    },
    {
      authors: "Gleixner AM, Verdone BM, Otte CG, Anderson EN, Ramesh N, Shapiro OR, Gale JR, Mauna JC, Mann JR, Copley KE, Daley EL, Ortega JA, Cicardi ME, Kiskinis E, Kofler J, Pandey UB, Trotti D, Donnelly CJ.",
      year: 2022,
      title: "NUP62 localizes to ALS/FTLD pathological assemblies and contributes to TDP-43 insolubility.",
      journal: "Nat Commun",
      volume: "13(1): 3380",
      link: "https://pubmed.ncbi.nlm.nih.gov/35697676/"
    },
    {
      authors: "Kasatkina LA, Ma C, Matlashov ME, Vu T, Li M, Kaberniuk AA, Yao J, Verkhusha VV.",
      year: 2022,
      title: "Optogenetic manipulation and photoacoustic imaging using a near-infrared transgenic mouse model.",
      journal: "Nat Commun",
      volume: "13(1): 2813",
      link: "https://pubmed.ncbi.nlm.nih.gov/35589810/"
    },
    {
      authors: "Dunbar A, Bowman RL, Park Y, Izzo F, Myers RM, Karzai A, Jun Kim W, Fernández Maestre I, Waarts MR, Nazir A, Xiao W, Brodsky M, Farina M, Cai L, Cai SF, Wang B, An W, Yang JL, Mowla S, Eisman SE, Mishra T, Houston R, Guzzardi E, Martinez Benitez AR, Viny A, Koche R, Landau DA, Levine RL.",
      year: 2022,
      title: "Jak2V617F Reversible Activation Shows an Essential Requirement for Jak2V617F in Myeloproliferative Neoplasms.",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/2022.05.18.492332v1"
    },
    {
      authors: "Liu Q, Liu M, Jin Y, Li B.",
      year: 2022,
      title: "Rapid and enzyme-free signal amplification for fluorescent detection of microRNA via localized catalytic hairpin assembly on gold nanoparticles.",
      journal: "Talanta",
      volume: "15(242): 123142",
      link: "https://pubmed.ncbi.nlm.nih.gov/35193011/"
    },
    {
      authors: "Tebbe L, Sakthivel H, Makia MS, Kakakhel M, Conley SM, Al-Ubaidi MR, Naash MI.",
      year: 2022,
      title: "Prph2 disease mutations lead to structural and functional defects in the RPE.",
      journal: "FASEB J",
      volume: "36(5): e22284",
      link: "https://pubmed.ncbi.nlm.nih.gov/35344225/"
    },
    {
      authors: "Desiderio S, Schwaller F, Lewin GR, Carroll P, Marmigère F.",
      year: 2022,
      title: "Touch receptor end-organ innervation and function requires sensory expression of the transcription factor Meis2.",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/2022.04.28.489889v1"
    },
    {
      authors: "Gao K, Zong H, Hou K, Zhang Y, Zhang R, Zhao D, Guo X, Luo Y, Jia S.",
      year: 2022,
      title: "p53N236S Activates Autophagy in Response to Hypoxic Stress Induced by DFO.",
      journal: "Genes (Basel)",
      volume: "13(5): 763",
      link: "https://pubmed.ncbi.nlm.nih.gov/35627147/"
    },
    {
      authors: "Wani S, Law IKM, Bugwadia AK, Hoffman JM, Pothoulakis C.",
      year: 2022,
      title: "Substance P and adenosine signaling pathways regulate exosomal sorting of miR-21 in colonic epithelial cells.",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/2022.03.30.486482v2.abstract"
    },
    {
      authors: "Vasić V, Barth K, Bicker F, Schumann U, Maurer C, Heinig N, Röhlecke C, Nimtschke U, Schumann L, Meinhardt M, Mittmann T, Radyushkin K, Baumgart J, Tenzer S, Zipp F, Tegeder I, Schmidt MHH.",
      year: 2022,
      title: "Less is more – loss of EGFL7 improves memory by upregulation of VEGF-D.",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/2022.04.07.487327v1.full"
    },
    {
      authors: "Verdone BM, Cicardi ME, Wen X, Sriramoji S, Russell K, Markandaiah SS, Jensen BK, Krishnamurthy K, Haeusler AR, Pasinelli P, Trotti D.",
      year: 2022,
      title: "A mouse model with widespread expression of the C9orf72-linked glycine-arginine dipeptide displays non-lethal ALS/FTD-like phenotypes",
      journal: "Sci Rep",
      volume: "12(1): 5644",
      link: "https://pubmed.ncbi.nlm.nih.gov/35379876/"
    },
    {
      authors: "Kasai Y, Gan SP, Funaki T, Ohashi-Kumagai Y, Tominaga M, Shiu SJ, Suzuki D, Matsubara D, Sakamoto T, Sakurai-Yageta M, Ito T, Murakami Y.",
      year: 2022,
      title: "Trans-homophilic interaction of CADM1 promotes organ infiltration of T-cell lymphoma by adhesion to vascular endothelium.",
      journal: "Cancer Sci",
      volume: "113(5): 1669-78",
      link: "https://pubmed.ncbi.nlm.nih.gov/35213073/"
    },
    {
      authors: "Zhang K, Baumann B, Song Y, Sterling J, Erler E, Guttha S, Kozmik Z, Dunaief J.",
      year: 2022,
      title: "Conditional knockout of hephaestin in the neural retina disrupts retinal iron homeostasis.",
      journal: "Exp Eye Res218: 109028",
      volume: "",
      link: "https://pubmed.ncbi.nlm.nih.gov/35271829/"
    },
    {
      authors: "Al-Mass A, Poursharifi P, Peyot M-L, Lussier R, Levens EJ, Guida J, Mugabo Y, Possik E, Ahmad R, Al-Mulla F, Sladek R, Madiraju SRM, Prentki M.",
      year: 2022,
      title: "Glycerol-3-phosphate phosphatase operates a glycerol shunt in pancreatic β-cells that controls insulin secretion and metabolic stress.",
      journal: "Mol Metab60: 101471",
      volume: "",
      link: "https://pubmed.ncbi.nlm.nih.gov/35272070/"
    },
    {
      authors: "Stifler C, Yamazaki H, Gilbert P, Margolis H, Beniash E.",
      year: 2022,
      title: "Loss of biological control of enamel mineralization in amelogenin-phosphorylation-deficient mice",
      journal: "J Struct Biol",
      volume: "214(2): 107844",
      link: "https://pubmed.ncbi.nlm.nih.gov/35219810/"
    },
    {
      authors: "Lee J, Chae S, Nan J, Do Koo Y, Lee S, Park Y, Hwang D, Han W, Lee D, Kim Y, Chung S, Park K.",
      year: 2022,
      title: "SENP2 suppresses browning of white adipose tissues by de-conjugating SUMO from C/EBPβ",
      journal: "Cell Rep",
      volume: "38(8): 110408",
      link: "https://pubmed.ncbi.nlm.nih.gov/35196497/"
    },
    {
      authors: "Royer C, Sandham E, Slee E, Godwin J, Veits N, Hathrell H, Zhou F, Leonavicius K, Garratt J, Narendra T, Vincent A, Jones C, Child T, Coward K, Graham C, Lu X, Srinivas S.",
      year: 2022,
      title: "ASPP2 maintains the integrity of mechanically stressed pseudostratified epithelia during morphogenesis",
      journal: "Nat Commun",
      volume: "13(1): 941",
      link: "https://pubmed.ncbi.nlm.nih.gov/35177595/"
    },
    {
      authors: "Márta K, Booth D, Csordás G, Hajnóczky G.",
      year: 2022,
      title: "Fluorescent protein transgenic mice for the study of Ca2+ and redox signaling",
      journal: "Free Radic Biol Med181: 241-250",
      volume: "",
      link: "https://pubmed.ncbi.nlm.nih.gov/35158029/"
    },
    {
      authors: "Darbandi S, Nelson A, Pai E, Bender K, Rubenstein J.",
      year: 2022,
      title: "LiCl treatment leads to long-term restoration of spine maturation and synaptogenesis in adult Tbr1 mutants.",
      journal: "J Neurodev Disord",
      volume: "14(1): 11",
      link: "https://pubmed.ncbi.nlm.nih.gov/35123407/"
    },
    {
      authors: "Bandarabadi M, Li S, Tafti M, Colombo G, Becchetti A, Vassalli A.",
      year: 2022,
      title: "Orexin action on the dopaminergic system modulates theta during REM sleep and wakefulness.",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/2022.01.30.478401v1"
    },
    {
      authors: "Smith TC, Vasilakos G, Shaffer S, Puglise J, Chou C, Barton E, Luna E.",
      year: 2022,
      title: "Novel γ-sarcoglycan interactors in murine muscle membranes.",
      journal: "Skelet Muscle",
      volume: "12(1): 2",
      link: "https://pubmed.ncbi.nlm.nih.gov/35065666/"
    },
    {
      authors: "Nan J, Lee JS, Moon JH, Lee SA, Park YJ, Lee DS, Chung SS, Park KS.",
      year: 2022,
      title: "SENP2 regulates mitochondrial function and insulin secretion in pancreatic β cells",
      journal: "Exp Mol Med",
      volume: "54(1): 72–80",
      link: "https://pubmed.ncbi.nlm.nih.gov/35064188/"
    },
    {
      authors: "Szaroszyk M, Kattih B, Martin-Garrido A, Trogisch FA, Dittrich GM, Grund A, Abouissa A, Derlin K, Meier M, Holler T, Korf-Klingebiel M, Völker K, Garfias Macedo T, Pablo Tortola C, Boschmann M, Huang N, Froese N, Zwadlo C, Malek Mohammadi M, Luo X, Wagner M, Cordero J, Geffers R, Batkai S, Thum T, Bork N, Nikolaev VO, Müller OJ, Katus HA, El-Armouche A, Kraft T, Springer J, Dobreva G, Wollert KC, Fielitz J, von Haehling S, Kuhn M, Bauersachs J, Heineke J.",
      year: 2022,
      title: "Skeletal muscle derived Musclin protects the heart during pathological overload.",
      journal: "Nat Commun",
      volume: "13(1): 149",
      link: "https://pubmed.ncbi.nlm.nih.gov/35013221/"
    },
    {
      authors: "Cheng C, Weiss L, Leinonen H, Shmara A, Yin HZ, Ton T, Do A, Lee J, Ta L, Mohanty E, Vargas J, Weiss J, Palczewski K, Kimonis V.",
      year: 2022,
      title: "VCP/p97 inhibitor CB-5083 modulates muscle pathology in a mouse model of VCP inclusion body myopathy.",
      journal: "J Transl Med",
      volume: "20(1): 21",
      link: "https://pubmed.ncbi.nlm.nih.gov/34998409/"
    },
    {
      authors: "Serrano J, Meshram NN, Soundarapandian MM, Smith KR, Mason C, Brown IS, Tyrberg B, Kyriazis GA.",
      year: 2022,
      title: "Saccharin Stimulates Insulin Secretion Dependent on Sweet Taste Receptor-Induced Activation of PLC Signaling Axis.",
      journal: "Biomedicines",
      volume: "10(1): 120",
      link: "https://pubmed.ncbi.nlm.nih.gov/35052799/"
    },
    {
      authors: "Cheng C, Weiss L, Leinonen H, Shmara A, Yin HZ, Ton T, Do A, Lee J, Ta L, Mohanty E, Vargas J, Weiss J, Palczewski K, Kimonis V.",
      year: 2022,
      title: "VCP/p97 inhibitor CB-5083 modulates muscle pathology in a mouse model of VCP inclusion body myopathy.",
      journal: "J Transl Med",
      volume: "20(1): 21",
      link: "https://pubmed.ncbi.nlm.nih.gov/34998409/"
    }
  ],
  "2021": [
    {
      authors: "Ualiyeva S, Lemire E, Aviles EC, Wong C, Boyd AA, Lai J, Liu T, Matsumoto I, Barrett NA, Boyce JA, Haber AL, Bankova LG.",
      year: 2021,
      title: "Tuft cell-produced cysteinyl leukotrienes and IL-25 synergistically initiate lung type 2 inflammation.",
      journal: "Sci Immunol",
      volume: "6(66): eabj0474",
      link: "https://pubmed.ncbi.nlm.nih.gov/34932383/"
    },
    {
      authors: "Lüönd F, Sugiyama N, Bill R, Bornes L, Hager C, Tang F, Santacroce N, Beisel C, Ivanek R, Bürglin T, Tiede S, van Rheenen J, Christofori G.",
      year: 2021,
      title: "Distinct contributions of partial and full EMT to breast cancer malignancy",
      journal: "Dev Cell",
      volume: "56(23): 3203-3221.e11",
      link: "https://pubmed.ncbi.nlm.nih.gov/34847378/"
    },
    {
      authors: "Poh L, Razak S, Lim HM, Lai MKP, Chen CL, Lim LHK, Arumugam TV, Fann DY.",
      year: 2021,
      title: "AIM2 inflammasome mediates apoptotic and pyroptotic death in the cerebellum following chronic hypoperfusion",
      journal: "Exp Neurol346: 113856",
      volume: "",
      link: "https://pubmed.ncbi.nlm.nih.gov/34474007/"
    },
    {
      authors: "Tirado-Gonzalez I, Descot A, Soetopo D, Nevmerzhitskaya A, Schäffer A, Kur IM, Czlonka E, Wachtel C, Tsoukala I, Müller L, Schäfer AL, Weitmann M, Dinse P, Alberto E, Buck MC, Landry JJ, Baying B, Slotta-Huspenina J, Roesler J, Harter PN, Kubasch AS, Meinel J, Elwakeel E, Strack E, Quang CT, Abdel-Wahab O, Schmitz M, Weigert A, Schmid T, Platzbecker U, Benes V, Ghysdael J, Bonig H, Götze KS, Rothlin CV, Ghosh S, Medyouf H.",
      year: 2021,
      title: "AXL Inhibition in Macrophages Stimulates Host-versus-Leukemia Immunity and Eradicates Naïve and Treatment-Resistant Leukemia.",
      journal: "Cancer Discov",
      volume: "11(11): 2924-2943",
      link: "https://pubmed.ncbi.nlm.nih.gov/34103328/"
    },
    {
      authors: "Rosier K, McDevitt MT, Smet J, Floyd BJ, Verschoore M, Marcaida MJ, Bingman CA, Lemmens I, Dal Peraro M, Tavernier J, Cravatt BF, Gounko NV, Vints K, Monnens Y,  Bhalla K, Aerts L, Rashan EH, Vanlander AV, Van Coster R, Régal L, Pagliarini DJ, Creemers JWM.",
      year: 2021,
      title: "Prolyl endopeptidase-like is a (thio)esterase involved in mitochondrial respiratory chain function",
      journal: "Science",
      volume: "24(12): 103460",
      link: "https://pubmed.ncbi.nlm.nih.gov/34888501/"
    },
    {
      authors: "Wadugu BA, Heard A, Srivatsan SN, Alberti MO, Ndonwi M, Grieb S, Bradley J, Shao J, Ahmed T, Shirai CL, Khanna A, Fei DL, Miller CA, Graubert TA, Walter MJ.",
      year: 2021,
      title: "U2AF1 is a haplo-essential gene required for cancer cell survival",
      journal: "J Clin Invest",
      volume: "131(21): e141401",
      link: "https://pubmed.ncbi.nlm.nih.gov/34546980/"
    },
    {
      authors: "McGuire MR, Mukhopadhyay D, Myers SL, Mosher EP, Brookheart RT, Kammers K, Sehgal A, Selen ES, Wolfgang MJ, Bumpus NN, Espenshade PJ.",
      year: 2021,
      title: "Progesterone receptor membrane component 1 (PGRMC1) binds and stabilizes cytochromes P450 through a heme-independent mechanism",
      journal: "J Biol Chem",
      volume: "297(5): 101316",
      link: "https://pubmed.ncbi.nlm.nih.gov/34678314/"
    },
    {
      authors: "Ouyang X, Becker E, Jr., Bone NB, Johnson MS, Craver J, Zong WX, Darley-Usmar VM, Zmijewski JW, Zhang J.",
      year: 2021,
      title: "ZKSCAN3 in severe bacterial lung infection and sepsis-induced immunosuppression",
      journal: "Lab Invest",
      volume: "101(11): 1467-1474",
      link: "https://pubmed.ncbi.nlm.nih.gov/34504306/"
    },
    {
      authors: "Vacher CM, Lacaille H, O’Reilly JJ, Salzbank J, Bakalar D, Sebaoui S, Liere P, Clarkson-Paredes C, Sasaki T, Sathyanesan A, Kratimenos P, Ellegood J, Lerch JP, Imamura Y, Popratiloff A, Hashimoto-Torii K, Gallo V, Schumacher M, Penn AA.",
      year: 2021,
      title: "Placental endocrine function shapes cerebellar development and social behavior",
      journal: "Nat Neurosci",
      volume: "24(10): 1392-1401",
      link: "https://pubmed.ncbi.nlm.nih.gov/34400844/"
    },
    {
      authors: "Dogra S, Stansley BJ, Xiang Z, Qian W, Gogliotti RG, Nicoletti F, Lindsley CW, Niswender CM, Joffe ME, Conn PJ.",
      year: 2021,
      title: "Activating mGlu3 metabotropic glutamate receptors rescues schizophrenia-like cognitive deficits through metaplastic adaptations within the hippocampus",
      journal: "Biol Psychiatry",
      volume: "90(6): 385-398",
      link: "https://pubmed.ncbi.nlm.nih.gov/33965197/"
    },
    {
      authors: "Anderson-Baucum E, Piñeros AR, Kulkarni A, Webb-Robertson BJ, Maier B, Anderson RM, Wu W, Tersey SA, Mastracci TL, Casimiro I, Scheuner D, Metz TO, Nakayasu ES, Evans-Molina C, Mirmira RG.",
      year: 2021,
      title: "Deoxyhypusine synthase promotes a pro-inflammatory macrophage phenotype",
      journal: "Cell Metab",
      volume: "33(9): 1883-1893.e7",
      link: "https://pubmed.ncbi.nlm.nih.gov/34496231/"
    },
    {
      authors: "Hale J, An X, Guo X, Gao E, Papoin J, Blanc L, Hillyer CD, Gratzer W, Baines A, Mohandas N.",
      year: 2021,
      title: "αI-spectrin represents evolutionary optimization of spectrin for red blood cell deformability",
      journal: "Biophys J",
      volume: "120(17): 3588-3599",
      link: "https://pubmed.ncbi.nlm.nih.gov/34352252/"
    },
    {
      authors: "Wang CC, Weyrer C, Fioravante D, Kaeser PS, Regehr WG.",
      year: 2021,
      title: "Presynaptic short-term plasticity persists in the absence of PKC phosphorylation of Munc18-1",
      journal: "J Neurosci",
      volume: "41(35): 7329-7339",
      link: "https://pubmed.ncbi.nlm.nih.gov/34290081/"
    },
    {
      authors: "Andres-Hernando A, Cicerchi C, Kuwabara M, Orlicky DJ, Sanchez-Lozada LG, Nakagawa T, Johnson RJ, Lanaspa MA.",
      year: 2021,
      title: "Umami-induced obesity and metabolic syndrome is mediated by nucleotide degradation and uric acid generation",
      journal: "Nat Metab",
      volume: "3(9): 1189-1201",
      link: "https://pubmed.ncbi.nlm.nih.gov/34552272/"
    },
    {
      authors: "He D, Li X, Zhang F, Wang C, Liu Y, Bhawal UK, Sun J.",
      year: 2021,
      title: "Dec2 inhibits macrophage pyroptosis to promote periodontal homeostasis",
      journal: "J Periodontal Implant Sci",
      volume: "",
      link: "https://pc.jpis.org/DOIx.php?id=10.5051/jpis.2101380069"
    },
    {
      authors: "Yang W, Chen L, Xu L, Bilotta AJ, Yao S, Liu Z, Cong Y.",
      year: 2021,
      title: "MicroRNA-10a Negatively Regulates CD4 + T Cell IL-10 Production through Suppression of Blimp1",
      journal: "J Immunol",
      volume: "207(3): 985-995",
      link: "https://pubmed.ncbi.nlm.nih.gov/34301843/"
    },
    {
      authors: "Poh L, Fann DY, Wong P, Lim HM, Foo SL, Kang SW, Rajeev V, Selvaraji S, Vinaya RI, Parathy N, Khan MB, Jo DG, Drummond GR, Sobey CG, Lai MKP, Chen CLH, Lim LHK, Arumugam TV.",
      year: 2021,
      title: "AIM2 Inflammasome Mediates Hallmark Neuropathological Alterations and Cognitive Impairment in a Mouse Model of Vascular Dementia",
      journal: "Mol Psychiatry",
      volume: "26(8):4544-4560",
      link: "https://pubmed.ncbi.nlm.nih.gov/33299135/"
    },
    {
      authors: "Wang Q, Wang S, Sun Z.",
      year: 2021,
      title: "Kidney-Specific Klotho Gene Deletion Causes Aortic Aneurysm via Hyperphosphatemia",
      journal: "Hypertension",
      volume: "78(2): 308-319",
      link: "https://pubmed.ncbi.nlm.nih.gov/34176284/"
    },
    {
      authors: "Gao Y, Cardamone MD, Kwan J, Orofino J, Hekman R, Lyons S, Emili A, Perissi V.",
      year: 2021,
      title: "Inhibition of Mul1-mediated ubiquitination promotes mitochondria-associated translation",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/2021.07.28.454107v2.abstract"
    },
    {
      authors: "Modarresi F, Pedram Fatemi R, Razavipour SF, Ricciardi N, Makhmutova M, Khoury N, Magistri M, Volmar CH, Wahlestedt C, Faghihi MA.",
      year: 2021,
      title: "A novel knockout mouse model of the noncoding antisense Brain-Derived Neurotrophic Factor ( Bdnf) gene displays increased endogenous Bdnf protein and improved memory function following exercise",
      journal: "Heliyon",
      volume: "7(7): e07570",
      link: "https://pubmed.ncbi.nlm.nih.gov/34377851/"
    },
    {
      authors: "Leinonen H, Cheng C, Pitkänen M, Sander CL, Zhang J, Saeid S, Turunen T, Shmara A, Weiss L, Ta L, Ton T, Koskelainen A, Vargas JD, Kimonis V, Palczewski K.",
      year: 2021,
      title: "A p97/Valosin-Containing Protein Inhibitor Drug CB-5083 Has a Potent but Reversible Off-Target Effect on Phosphodiesterase-6",
      journal: "J Pharmacol Exp Ther",
      volume: "378(1): 31-41",
      link: "https://pubmed.ncbi.nlm.nih.gov/33931547/"
    },
    {
      authors: "Xu P, Xi Y, Zhu J, Zhang M, Luka Z, Stolz DB, Cai X, Xie Y, Xu M, Ren S, Huang Z, Yang D, York JD, Ma X, Xie W.",
      year: 2021,
      title: "Intestinal Sulfation Is Essential to Protect Against Colitis and Colonic Carcinogenesis",
      journal: "Gastroenterology",
      volume: "161(1): 271-286.e11",
      link: "https://pubmed.ncbi.nlm.nih.gov/33819483/"
    },
    {
      authors: "Guix FX, Capitán AM, Casadomé-Perales Á, Palomares-Pérez I, López Del Castillo I, Miguel V, Goedeke L, Martín MG, Lamas S, Peinado H, Fernández-Hernando C, Dotti CG.",
      year: 2021,
      title: "Increased exosome secretion in neurons aging in vitro by NPC1-mediated endosomal cholesterol buildup",
      journal: "Life Sci Alliance",
      volume: "4(8): e202101055",
      link: "https://pubmed.ncbi.nlm.nih.gov/34183444/"
    },
    {
      authors: "Chen L, Wimalasena NK, Shim J, Han C, Lee SI, Gonzalez-Cano R, Estacion M, Faber CG, Lauria G, Dib-Hajj SD, Woolf CJ, Waxman SG.",
      year: 2021,
      title: "Two independent mouse lines carrying the Nav1.7 I228M gain-of-function variant display dorsal root ganglion neuron hyperexcitability but a minimal pain phenotype",
      journal: "Pain",
      volume: "162(6): 1758-1770",
      link: "https://pubmed.ncbi.nlm.nih.gov/33323889/"
    },
    {
      authors: "Samant SA, Pillai VB, Gupta MP.",
      year: 2021,
      title: "Skeletal muscle-specific over-expression of the nuclear sirtuin SIRT6 blocks cancer-associated cachexia by regulating multiple targets",
      journal: "JCSM Rapid Commun",
      volume: "4(1): 40-56",
      link: "https://pubmed.ncbi.nlm.nih.gov/34212132/"
    },
    {
      authors: "Ishii Y, Takasu S, Grúz P, Masumura K, Ogawa K, Nohmi T, Umemura T.",
      year: 2021,
      title: "The Role of DNA Polymerase ζ in Benzo[a]pyrene-induced Mutagenesis in the Mouse Lung",
      journal: "Mutagenesis",
      volume: "36(2): 155-164",
      link: "https://pubmed.ncbi.nlm.nih.gov/33544859/"
    },
    {
      authors: "Adelaja A, Taylor B, Sheu KM, Liu Y, Luecke S, Hoffmann A.",
      year: 2021,
      title: "Six distinct NFκB signaling codons convey discrete information to distinguish stimuli and enable appropriate macrophage responses",
      journal: "Immunity",
      volume: "54(5): 916-930.e7",
      link: "https://pubmed.ncbi.nlm.nih.gov/33979588/"
    },
    {
      authors: "Malinova TS, Angulo-Urarte A, Nüchel J, Tauber M, van der Stoel MM, Janssen V, de Haan A, Groenen AG, Tebbens M, Graupera M, Plomann M, Huveneers S.",
      year: 2021,
      title: "A junctional PACSIN2/EHD4/MICAL-L1 complex coordinates VE-cadherin trafficking for endothelial migration and angiogenesis",
      journal: "Nat Commun",
      volume: "12(1): 2610",
      link: "https://pubmed.ncbi.nlm.nih.gov/33972531/"
    },
    {
      authors: "Choi EH, Suh S, Einstein DE, Leinonen H, Dong Z, Ramachandra Rao S, Fliesler SJ, Blackshaw S, Yu M, Peachey NS, Palczewski K, Kiser PD.",
      year: 2021,
      title: "An inducible Cre mouse for studying roles of the RPE in retinal physiology and disease",
      journal: "JCI Insight",
      volume: "6(9): e146604",
      link: "https://pubmed.ncbi.nlm.nih.gov/33784255/"
    },
    {
      authors: "Scudder SL, Gonzales FR, Howell KK, Stein IS, Dozier LE, Anagnostaras SG, Zito K, Patrick GN.",
      year: 2021,
      title: "Altered phosphorylation of the proteasome subunit Rpt6 has minimal impact on synaptic plasticity and learning",
      journal: "eNeuro",
      volume: "8(3): ENEURO.0073-20.2021",
      link: "https://pubmed.ncbi.nlm.nih.gov/33658307/"
    },
    {
      authors: "Dabertrand F, Harraz OF, Koide M, Longden TA, Rosehart AC, Hill-Eubanks DC, Joutel A, Nelson MT.",
      year: 2021,
      title: "PIP 2 corrects cerebral blood flow deficits in small vessel disease by rescuing capillary Kir2.1 activity",
      journal: "Proc Natl Acad Sci U S A",
      volume: "118(17): e2025998118",
      link: "https://pubmed.ncbi.nlm.nih.gov/33875602/"
    },
    {
      authors: "Kawahara K, Mukai T, Iseki M, Nagasu A, Nagasu H, Akagi T, Tsuji S, Hiramatsu-Asano S, Ueki Y, Ishihara K, Kashihara N, Morita Y.",
      year: 2021,
      title: "SH3BP2 Deficiency Ameliorates Murine Systemic Lupus Erythematosus",
      journal: "Int J Mol Sci",
      volume: "22(8): 4169",
      link: "https://pubmed.ncbi.nlm.nih.gov/33920631/"
    },
    {
      authors: "Herrera JL, Komatsu M.",
      year: 2021,
      title: "R-Ras Deficiency in Pericytes Causes Frequent Microphthalmia and Perturbs Retinal Vascular Development",
      journal: "J Vasc Res",
      volume: "58(4): 252-266",
      link: "https://pubmed.ncbi.nlm.nih.gov/33873190/"
    },
    {
      authors: "Kawahara K, Mukai T, Iseki M, Nagasu A, Nagasu H, Akagi T, Tsuji S, Hiramatsu-Asano S, Ueki Y, Ishihara K, Kashihara N, Morita Y.",
      year: 2021,
      title: "SH3BP2 Deficiency Ameliorates Murine Systemic Lupus Erythematosus",
      journal: "Int J Mol Sci",
      volume: "22(8): 4169",
      link: "https://pubmed.ncbi.nlm.nih.gov/33920631/"
    },
    {
      authors: "Jergović M, Thompson HL, Bradshaw CM, Sonar SA, Ashgar A, Mohty N, Joseph B, Fain MJ, Cleveland K, Schnellman RG, Nikolich-Žugich J.",
      year: 2021,
      title: "IL-6 can singlehandedly drive many features of frailty in mice",
      journal: "Geroscience",
      volume: "43(2): 539-549",
      link: "https://pubmed.ncbi.nlm.nih.gov/33629207/"
    },
    {
      authors: "Maguire OA, Ackerman SE, Szwed SK, Maganti AV, Marchildon F, Huang X, Kramer DJ, Rosas-Villegas A, Gelfer RG, Turner LE, Ceballos V, Hejazi A, Samborska B, Rahbani JF, Dykstra CB, Annis MG, Luo JD, Carroll TS, Jiang CS, Dannenberg AJ, Siegel PM, Tersey SA, Mirmira RG, Kazak L, Cohen P.",
      year: 2021,
      title: "Creatine-mediated crosstalk between adipocytes and cancer cells regulates obesity-driven breast cancer",
      journal: "Cell Metab",
      volume: "33(3): 499-512.e6",
      link: "https://pubmed.ncbi.nlm.nih.gov/33596409/"
    },
    {
      authors: "Croze ML, Flisher M, Guillaume A, Tremblay C, Granziera S, Noguchi GM, Vivot K, Ghislain J, Huising MO, Poitout V.",
      year: 2021,
      title: "Free-fatty acid receptor 4 inhibitory signaling in delta cells regulates islet hormone secretion in mice",
      journal: "Mol Metab45: 101166",
      volume: "",
      link: "https://pubmed.ncbi.nlm.nih.gov/33484949/"
    },
    {
      authors: "Hurley S, Mohan C, Suetterlin P, Ellingford R, Riegman KLH, Ellegood J, Caruso A, Michetti C, Brock O, Evans R, Rudari F, Delogu A, Scattoni ML, Lerch JP, Fernandes C, Basson MA.",
      year: 2021,
      title: "Distinct, dosage-sensitive requirements for the autism-associated factor CHD8 during cortical development",
      journal: "Mol Autism",
      volume: "12(1): 16",
      link: "https://pubmed.ncbi.nlm.nih.gov/33627187/"
    },
    {
      authors: "Keller TCS IV, Keller AS, Brás Broseghini-Filho G, Butcher JT, Page, Askew-Page HR, Islam A, Tan ZY, DeLalio LJ, Brooks S, Sharma P, Hong K, Xu W, Padilha AS, Ruddiman CA, Best AK, Macal E, Kim-Shapiro DB, Christ G, Yan Z, Cortese-Krott MM, Ricart K, Patel R, Bender TP, Sonkusare SK, Weiss MJ, Ackerman H, Columbus L, Isakson BE.",
      year: 2021,
      title: "Endothelial alpha globin is a nitrite reductase",
      journal: "Nat Commun",
      volume: "13(1): 6405",
      link: "https://pubmed.ncbi.nlm.nih.gov/36302779/"
    },
    {
      authors: "Burn TN, Miot C, Kreiger P, Hayer KE, Bhattacharyya A, Jones JM, Bassing CH, Behrens EM.",
      year: 2021,
      title: "The RAG1 Ubiquitin Ligase Domain Enhances T Cell Receptor Gene Assembly and Thymic Selection",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/2021.01.04.425211v1.full"
    },
    {
      authors: "Xiao Y, Qureischi M, Dietz L, Vaeth M, Vallabhapurapu SD, Klein-Hessling S, Klein M, Liang C, König A, Serfling E, Mottok A, Bopp T, Rosenwald A, Buttmann M, Berberich I, Beilhack A, Berberich-Siebelt F.",
      year: 2021,
      title: "Lack of NFATc1 SUMOylation prevents autoimmunity and alloreactivity",
      journal: "J Exp Med",
      volume: "218(1): e20181853",
      link: "https://pubmed.ncbi.nlm.nih.gov/32986812/"
    },
    {
      authors: "Nam YH, Jeong SY, Kim YH, Rodriguez I, Nuankaew W, Bhawal UK, Hong BN, Kang TH.",
      year: 2021,
      title: "Anti-aging effects of Korean Red Ginseng (KRG) in differentiated embryo chondrocyte (DEC) knockout mice",
      journal: "J Ginseng Res",
      volume: "45(1): 183-190",
      link: "https://pubmed.ncbi.nlm.nih.gov/33437170/"
    }
  ],
  "2020": [
    {
      authors: "Goodman JB, Qin F, Morgan R, Chambers JM, Croteau D, Siwik DA, Hobai I, Panagia M, Luptak I, Bachschmid M, Tong XY, Pimentel DR, Cohen RA, Colucci WS.",
      year: 2020,
      title: "Redox-Resistant SERCA Attenuates Oxidant-Stimulated Mitochondrial Calcium and Apoptosis in Cardiac Myocytes and Pressure Overload-Induced Myocardial Failure in Mice",
      journal: "Circulation",
      volume: "142(25): 2459-2469",
      link: "https://pubmed.ncbi.nlm.nih.gov/33076678/"
    },
    {
      authors: "Liu QR, Canseco-Alba A, Liang Y, Ishiguro H, Onaivi ES.",
      year: 2020,
      title: "Low Basal CB2R in Dopamine Neurons and Microglia Influences Cannabinoid Tetrad Effects",
      journal: "Int J Mol Sci",
      volume: "21(24): 9763",
      link: "https://pubmed.ncbi.nlm.nih.gov/33371336/"
    },
    {
      authors: "Timofeev O, Koch L, Niederau C, Tscherne A, Schneikert J, Klimovich M, Elmshäuser S, Zeitlinger M, Mernberger M, Nist A, Osterburg C, Dötsch V, Hrabé de Angelis M, Stiewe T.",
      year: 2020,
      title: "Phosphorylation Control of p53 DNA-Binding Cooperativity Balances Tumorigenesis and Aging",
      journal: "Cancer Res",
      volume: "80(23): 5231-5244",
      link: "https://pubmed.ncbi.nlm.nih.gov/32873634/"
    },
    {
      authors: "Bertan F, Wischhof L, Sosulina L, Mittag M, Dalügge D, Fornarelli A, Gardoni F, Marcello E, Di Luca M, Fuhrmann M, Remy S, Bano D, Nicotera P.",
      year: 2020,
      title: "Loss of Ryanodine Receptor 2 impairs neuronal activity-dependent remodeling of dendritic spines and triggers compensatory neuronal hyperexcitability",
      journal: "Cell Death Differ",
      volume: "27(12): 3354-3373",
      link: "https://pubmed.ncbi.nlm.nih.gov/32641776/"
    },
    {
      authors: "Nakata T, Creasey EA, Kadoki M, Lin H, Selig MK, Yao J, Lefkovith A, Daly MJ, Graham DB, Xavier RJ.",
      year: 2020,
      title: "A missense variant in SLC39A8 confers risk for Crohn’s disease by disrupting manganese homeostasis and intestinal barrier integrity",
      journal: "Proc Natl Acad Sci U S A",
      volume: "117(46): 28930-28938",
      link: "https://pubmed.ncbi.nlm.nih.gov/33139556/"
    },
    {
      authors: "Baba T, Alvarez-Prats A, Kim YJ, Abebe D, Wilson S, Aldworth Z, Stopfer MA, Heuser J, Balla T.",
      year: 2020,
      title: "Myelination of peripheral nerves is controlled by PI4KB through regulation of Schwann cell Golgi function",
      journal: "Proc Natl Acad Sci U S A",
      volume: "117(45): 28102-28113",
      link: "https://pubmed.ncbi.nlm.nih.gov/33106410/"
    },
    {
      authors: "Sawada J, Perrot CY, Chen L, Fournier-Goss AE, Oyer J, Copik A, Komatsu M.",
      year: 2020,
      title: "High endothelial venules accelerate naive T cell recruitment by tumor necrosis factor-mediated R-Ras up-regulation",
      journal: "Am J Pathol",
      volume: "191(2): 396-414",
      link: "https://pubmed.ncbi.nlm.nih.gov/33159887/"
    },
    {
      authors: "Vikberg AL, Malla S, Golovleva I.",
      year: 2020,
      title: "Differential tissue specific expression of Kif23 alternative transcripts in mice with the human mutation causing congenital dyserythropoietic anemia type III",
      journal: "Blood Cells Mol Dis85: 102483",
      volume: "",
      link: "https://pubmed.ncbi.nlm.nih.gov/32818800/"
    },
    {
      authors: "Fernandez-Caggiano M, Kamynina A, Francois AA, Prysyazhna O, Eykyn TR, Krasemann S, Crespo-Leiro MG, Vieites MG, Bianchi K, Morales V, Domenech N, Eaton P.",
      year: 2020,
      title: "Mitochondrial pyruvate carrier abundance mediates pathological cardiac hypertrophy",
      journal: "Nat Metab",
      volume: "2(11): 1223-1231",
      link: "https://pubmed.ncbi.nlm.nih.gov/33106688/"
    },
    {
      authors: "DelGiorno KE, Chung CY, Vavinskaya V, Maurer HC, Novak SW, Lytle NK, Ma Z, Giraddi RR, Wang D, Fang L, Naeem RF, Andrade LR, Ali WH, Tseng H, Tsui C, Gubbala VB, Ridinger-Saison M, Ohmoto M, Erikson GA, O’Connor C, Shokhirev MN, Hah N, Urade Y, Matsumoto I, Kaech SM, Singh PK, Manor U, Olive KP, Wahl GM.",
      year: 2020,
      title: "Tuft Cells Inhibit Pancreatic Tumorigenesis in Mice by Producing Prostaglandin D 2",
      journal: "Gastroenterology",
      volume: "159(5): 1866-1881.e8",
      link: "https://pubmed.ncbi.nlm.nih.gov/32717220/"
    },
    {
      authors: "Ferrari F, Arrigoni L, Franz H, Izzo A, Butenko L, Trompouki E, Vogel T, Manke T.",
      year: 2020,
      title: "DOT1L-mediated murine neuronal differentiation associates with H3K79me2 accumulation and preserves SOX2-enhancer accessibility",
      journal: "Nat Commun",
      volume: "11(1): 5200",
      link: "https://pubmed.ncbi.nlm.nih.gov/33060580/"
    },
    {
      authors: "Spina E, Handlin R, Simundza J, Incassati A, Faiq M, Sainulabdeen A, Chan KC, Cowin P.",
      year: 2020,
      title: "Gpr125 identifies myoepithelial progenitors at tips of lacrimal ducts and is essential for tear film",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/2020.09.15.296749v2.full"
    },
    {
      authors: "Widjaja-Adhi MAK, Silvaroli JA, Chelstowska S, Trischman T, Bederman I, Sayegh R, Golczak M.",
      year: 2020,
      title: "Deficiency in Acyl-CoA:Wax Alcohol Acyltransferase 2 causes evaporative dry eye disease by abolishing biosynthesis of wax esters",
      journal: "FASEB J",
      volume: "34(10): 13792-13808",
      link: "https://pubmed.ncbi.nlm.nih.gov/32851726/"
    },
    {
      authors: "Su J, Basso D, Iyer S, Su K, Wei J, Fox MA.",
      year: 2020,
      title: "Paracrine Role for Somatostatin Interneurons in the Assembly of Perisomatic Inhibitory Synapses",
      journal: "J Neurosci",
      volume: "40(39): 7421-7435",
      link: "https://pubmed.ncbi.nlm.nih.gov/32847968/"
    },
    {
      authors: "Hsu J, Huang HT, Lee CT, Choudhuri A, Wilson NK, Abraham BJ, Moignard V, Kucinski I, Yu S, Hyde RK, Tober J, Cai X, Li Y, Guo Y, Yang S, Superdock M, Trompouki E, Calero-Nieto FJ, Ghamari A, Jiang J, Gao P, Gao L, Nguyen V, Robertson AL, Durand EM, glKathrein KL, Aifantis I, Gerber SA, Tong W, Tan K, Cantor AB, Zhou Y, Liu PP, Young RA, Göttgens B, Speck NA, Zon LI.",
      year: 2020,
      title: "CHD7 and Runx1 interaction provides a braking mechanism for hematopoietic differentiation",
      journal: "Proc Natl Acad Sci U S A",
      volume: "117(38): 23626-23635",
      link: "https://pubmed.ncbi.nlm.nih.gov/32883883/"
    },
    {
      authors: "Kakakhel M, Tebbe L, Makia MS, Conley SM, Sherry DM, Al-Ubaidi MR, Naash MI.",
      year: 2020,
      title: "Syntaxin 3 is essential for photoreceptor outer segment protein trafficking and survival",
      journal: "Proc Natl Acad Sci U S A",
      volume: "117(34): 20615-20624",
      link: "https://pubmed.ncbi.nlm.nih.gov/32778589/"
    },
    {
      authors: "Wetzel LA, Hurtado M, MacDowell Kaswan ZA, McCusker RH, Steelman AJ.",
      year: 2020,
      title: "Deletion of indoleamine 2,3 dioxygenase (Ido)1 but not Ido2 exacerbates disease symptoms of MOG35-55-induced experimental autoimmune encephalomyelitis",
      journal: "Brain, Behavior, & Immunity – Health7: 100116",
      volume: "",
      link: "https://www.sciencedirect.com/science/article/pii/S2666354620300818"
    },
    {
      authors: "Rosen SM, Joshi M, Hitt T, Beggs AH, Agrawal PB.",
      year: 2020,
      title: "Knockin mouse model of the human CFL2 p.A35T mutation results in a unique splicing defect and severe myopathy phenotype",
      journal: "Hum Mol Genet",
      volume: "29(12):1996-2003",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/32160286"
    },
    {
      authors: "Venturutti L, Teater M, Zhai A, Chadburn A, Babiker L, Kim D, Béguelin W, Lee TC, Kim Y, Chin CR, Yewdell WT, Raught B, Phillip JM, Jiang Y, Staudt LM, Green MR, Chaudhuri J, Elemento O, Farinha P, Weng AP, Nissen MD, Steidl C, Morin RD, Scott DW, Privé GG, Melnick AM.",
      year: 2020,
      title: "TBL1XR1 Mutations Drive Extranodal Lymphoma by Inducing a Pro-tumorigenic Memory Fate",
      journal: "Cell",
      volume: "182(2): 297-316.e27",
      link: "https://pubmed.ncbi.nlm.nih.gov/32619424/"
    },
    {
      authors: "Daly M, Xavier R, Mohanan V, Lassen K.",
      year: 2020,
      title: "Compositions and methods for treating inflammatory bowel diseases",
      journal: "US Patent Application No.20200246488",
      volume: "",
      link: "http://www.freepatentsonline.com/y2020/0246488.html"
    },
    {
      authors: "Ariizumi K, Cruz P.",
      year: 2020,
      title: "Anti-dc-hil antibodies for cancer diagnosis, prognosis and therapy",
      journal: "US Patent Application No.US20200206343",
      volume: "",
      link: "https://patents.google.com/patent/US20180064809A1/en"
    },
    {
      authors: "Choi J, Diao H, Faliti CE, Truong J, Rossi M, Bélanger S, Yu B, Goldrath AW, Pipkin ME, Crotty S.",
      year: 2020,
      title: "Bcl-6 is the nexus transcription factor of T follicular helper cells via repressor-of-repressor circuits",
      journal: "Nat Immunol",
      volume: "21(7): 777-789",
      link: "https://pubmed.ncbi.nlm.nih.gov/32572238/"
    },
    {
      authors: "Park G, Nhan HS, Tyan SH, Kawakatsu Y, Zhang C, Navarro M, Koo EH.",
      year: 2020,
      title: "Caspase Activation and Caspase-Mediated Cleavage of APP Is Associated with Amyloid β-Protein-Induced Synapse Loss in Alzheimer’s Disease",
      journal: "Cell Rep",
      volume: "31(13): 107839",
      link: "https://pubmed.ncbi.nlm.nih.gov/32610140/"
    },
    {
      authors: "Damisah EC, Hill RA, Rai A, Chen F, Rothlin CV, Ghosh S, Grutzendler J.",
      year: 2020,
      title: "Astrocytes and microglia play orchestrated roles and respect phagocytic territories during neuronal corpse removal in vivo.",
      journal: "Sci Adv",
      volume: "6(26): eaba3239",
      link: "https://pubmed.ncbi.nlm.nih.gov/32637606/"
    },
    {
      authors: "Muralidharan SV, Nilsson LM, Lindberg MF, Nilsson JA.",
      year: 2020,
      title: "Small molecule inhibitors and a kinase-dead expressing mouse model demonstrate that the kinase activity of Chk1 is essential for mouse embryos and cancer cells",
      journal: "Life Sci Alliance",
      volume: "3(8): e202000671",
      link: "https://pubmed.ncbi.nlm.nih.gov/32571801/"
    },
    {
      authors: "Tilstra JS, John S, Gordon RA, Leibler C, Kashgarian M, Bastacky S, Nickerson KM, Shlomchik MJ.",
      year: 2020,
      title: "B cell-intrinsic TLR9 expression is protective in murine lupus",
      journal: "J Clin Invest",
      volume: "130(6): 3172-3187",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/32191633"
    },
    {
      authors: "Eckstein E, Pyrski M, Pinto S, Freichel M, Vennekens R, Zufall F.",
      year: 2020,
      title: "Cyclic regulation of Trpm4 expression in female vomeronasal neurons driven by ovarian sex hormones",
      journal: "Mol Cell Neurosci13:103495",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/32298804"
    },
    {
      authors: "Taylor B, Adelaja A, Liu Y, Luecke S, Hoffmann A.",
      year: 2020,
      title: "Identification and physiological significance of temporal NFκB signaling codewords deployed by macrophages to classify immune threats",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/2020.05.23.112862v1.full"
    },
    {
      authors: "Goldstein JD, Bassoy EY, Caruso A, Palomo J, Rodriguez E, Lemeille S, Gabay C.",
      year: 2020,
      title: "IL-36 signaling in keratinocytes controls early IL-23 production in psoriasis-like dermatitis",
      journal: "Life Sci Alliance",
      volume: "3(6): e202000688",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/32345660"
    },
    {
      authors: "Seo JA, Kang MC, Yang WM, Hwang WM, Kim SS, Hong SH, Heo JI, Vijyakumar A, Pereira de Moura L, Uner A, Huang H, Lee SH, Lima IS, Park KS, Kim MS, Dagon Y, Willnow TE, Aroda V, Ciaraldi TP, Henry RR, Kim YB.",
      year: 2020,
      title: "Apolipoprotein J is a hepatokine regulating muscle glucose metabolism and insulin sensitivity",
      journal: "Nat Commun",
      volume: "11(1): 2024",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/32332780"
    },
    {
      authors: "Fazel Darbandi S, Robinson Schwartz SE, Pai EL, Everitt A, Turner ML, Cheyette BNR, Willsey AJ, State MW, Sohal VS, Rubenstein JLR.",
      year: 2020,
      title: "Enhancing WNT Signaling Restores Cortical Neuronal Spine Maturation and Synaptogenesis in Tbr1 Mutants",
      journal: "Cell Rep",
      volume: "31(2): 107495",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/32294447"
    },
    {
      authors: "Léveillé M, Besse-Patin A, Jouvet N, Gunes A, Jeromson S, Khan NP, Sczelecki S, Baldwin C, Dumouchel A, Correia J, Jannig P, Boulais J, Ruas JL, Estall JL.",
      year: 2020,
      title: "PGC-1α isoforms coordinate to balance hepatic metabolism and apoptosis in inflammatory environments",
      journal: "Mol Metab34:72-84",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/32180561"
    },
    {
      authors: "Bell BJ, Liu Q, Kim DW, Lee S, Liu Q, Blum I, Wang A, Bedont J, Chang A, Issa H, Cohen J, Blackshaw S, Wu MN.",
      year: 2020,
      title: "A Clock-Driven Neural Network Critical for Arousal",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/2020.03.12.989921v2"
    },
    {
      authors: "Kaku H, Rothstein TL.",
      year: 2020,
      title: "FAIM Is a Non-redundant Defender of Cellular Viability in the Face of Heat and Oxidative Stress and Interferes With Accumulation of Stress-Induced Protein Aggregates",
      journal: "Front Mol Biosci7:32",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/32175331"
    },
    {
      authors: "Kharel Y, Huang T, Salamon A, Harris T, Santos WL, Lynch KR.",
      year: 2020,
      title: "Mechanism of sphingosine 1-phosphate clearance from blood",
      journal: "Biochem J",
      volume: "477(5): 925-935",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/32065229"
    },
    {
      authors: "Martin P, Palmer G, Rodriguez E, Palomo J, Lemeille S, Goldstein J, Gabay C.",
      year: 2020,
      title: "Intracellular IL-1 Receptor Antagonist Isoform 1 Released from Keratinocytes upon Cell Death Acts as an Inhibitor for the Alarmin IL-1α",
      journal: "J Immunol",
      volume: "204(4): 967-979",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31932497"
    },
    {
      authors: "Rothschild G, Zhang W, Lim J, Giri PK, Laffleur B, Chen Y, Fang M, Nair L, Liu ZP, Deng H, Hammarstrom L, Wang J, Basu U.",
      year: 2020,
      title: "Noncoding RNA transcription alters chromosomal topology to promote isotype-specific class switch recombination",
      journal: "Sci Immunol5(44)",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/32034089"
    },
    {
      authors: "McCann JJ, Vasilevskaya IA, Poudel Neupane N, Shafi AA, McNair C, Dylgjeri E, Mandigo AC, Schiewer MJ, Schrecengost RS, Gallagher P, Stanek TJ, McMahon SB, Berman-Booty LD, Ostrander WF, Knudsen KE.",
      year: 2020,
      title: "USP22 functions as an oncogenic driver in prostate cancer by regulating cell proliferation and DNA repair",
      journal: "Cancer Res",
      volume: "80(3): 430-443",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31740444"
    },
    {
      authors: "Kittaka M, Yoshimoto T, Schlosser C, Rottapel R, Kajiya M, Kurihara H, Reichenberger EJ, Ueki Y.",
      year: 2020,
      title: "Alveolar bone protection by targeting the SH3BP2-SYK axis in osteoclasts",
      journal: "J Bone Miner Res",
      volume: "35(2): 382-395",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31613396"
    },
    {
      authors: "Hsu CL, Chhiba KD, Krier-Burris R, Hosakoppal S, Berdnikovs S, Miller ML, Bryce PJ.",
      year: 2020,
      title: "Allergic inflammation is initiated by IL-33-dependent crosstalk between mast cells and basophils",
      journal: "PLoS One",
      volume: "15(1): e0226701",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31940364"
    },
    {
      authors: "Yang J, Agarwal M, Ling S, Teitz-Tennenbaum S, Zemans RL, Osterholzer JJ, Sisson TH, Kim KK.",
      year: 2020,
      title: "Diverse Injury Pathways Induce Alveolar Epithelial Cell CCL2/12 Which Promotes Lung Fibrosis",
      journal: "Am J Respir Cell Mol Biol",
      volume: "62(5): 622-632",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31922885"
    },
    {
      authors: "Shin NY, Yamazaki H, Beniash E, Yang X, Margolis SS, Pugach MK, Simmer JP, Margolis HC.",
      year: 2020,
      title: "Amelogenin phosphorylation regulates tooth enamel formation by stabilizing a transient amorphous mineral precursor",
      journal: "J Biol Chem",
      volume: "295(7): 1943-1959",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31919099"
    },
    {
      authors: "Gerber SD, Beauchamp P, Zhuang L, Villiger PM, Trueb B.",
      year: 2020,
      title: "Functional domains of the FgfrL1 receptor",
      journal: "Dev Biol",
      volume: "1(1): 43-54",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31923383"
    },
    {
      authors: "Marbach-Breitruck E, Kutzner L, Rothe M, Gurke R, Schreiber Y, Reddanna P, Schebb NH, Stehling S, Wieler LH, Heydeck D, Kuhn H.",
      year: 2020,
      title: "Functional Characterization of Knock-In Mice Expressing a 12/15-Lipoxygenating Alox5 Mutant Instead of the 5-Lipoxygenating Wild-Type Enzyme",
      journal: "Antioxid Redox Signal",
      volume: "32(1): 1-17",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31642348"
    },
    {
      authors: "Chakraborty D, Strayve DG, Makia MS, Conley SM, Kakahel M, Al-Ubaidi MR, Naash MI.",
      year: 2020,
      title: "Novel molecular mechanisms for Prph2‐associated pattern dystrophy",
      journal: "FASEB J",
      volume: "34(1): 1211-1230",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31914632"
    },
    {
      authors: "Dziegielewski J, Bońkowska MA, Poniecka EA, Heo Jinho, Du Kangping, Crittenden RB, Bender TP, Brautigan DL, Larner JM.",
      year: 2020,
      title: "Deletion of the SAPS1 subunit of protein phosphatase 6 in mice increases radiosensitivity and impairs the cellular DNA damage response",
      journal: "DNA Repair85: 102737",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31751917"
    },
    {
      authors: "Kaplan N, Dong Y, Wang S, Yang W, Park JK, Wang J, Fiolek E, Perez White B, Chandel NS, Peng H, Lavker RM.",
      year: 2020,
      title: "FIH‐1 engages novel binding partners to positively influence epithelial proliferation via p63",
      journal: "FASEB J",
      volume: "34(1): 525-539",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31914679"
    }
  ],
  "2019": [
    {
      authors: "Chen Z, Jiang R, Chen M, Zheng J, Chen M, Braidy N, Liu S, Liu G, Maimaitiming Z, Shen T, Dunaief JL, Vulpe CD, Anderson GJ, Chen H.",
      year: 2019,
      title: "Multi-copper ferroxidase deficiency leads to iron accumulation and oxidative damage in astrocytes and oligodendrocytes",
      journal: "Scientific Reports, 9(9437)",
      volume: "",
      link: "https://www.nature.com/articles/s41598-019-46019-9.pdf"
    },
    {
      authors: "Clarke BA, Majumder S, Zhu H, Lee YT, Kono M, Li C, Khanna C, Blain H, Schwartz R, Huso VL, Byrnes C, Tuymetova G, Dunn TM, Allende ML, Proia RL.",
      year: 2019,
      title: "The Ormdl genes regulate the sphingolipid synthesis pathway to ensure proper myelination and neurologic function in mice",
      journal: "Elife8. pii: e51067",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31880535"
    },
    {
      authors: "DelGiorno KE, Chung CY, Mauer HC, Novak SW, Giraddi RR, Wang D, Naeem RF, Fang L, Andrade LR, Lytle NK, Ali WH, Tsui C, Gubbala VB, Ridinger-Saison M, Ohmoto M, O’Connor C, Erikson GA, Shokhirev MN, Urade Y, Matsumoto I, Vavinskaya V, Singh PK, Manor U, Olive KP, Wahl GM.",
      year: 2019,
      title: "Tuft cells restrain pancreatic tumorigenesis through paracrine eicosanoid signaling",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/2019.12.19.882985v1.abstract"
    },
    {
      authors: "Chew LJ, Ming X, McEllin B, Dupree J, Hong E, Catron M, Fauveau M, Nait-Oumesmar B, Gallo V.",
      year: 2019,
      title: "Sox17 Regulates a Program of Oligodendrocyte Progenitor Cell Expansion and Differentiation during Development and Repair",
      journal: "Cell Rep",
      volume: "29(10): 3173-3186.e7",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31801081"
    },
    {
      authors: "Levasseur EM, Yamada K, Piñeros AR, Wu W, Syed F, Orr KS, Anderson-Baucum E, Mastracci TL, Maier B, Mosley AL, Liu Y, Bernal-Mizrachi E, Alonso LC, Scott D, Garcia-Ocaña A, Tersey SA, Mirmira RG.",
      year: 2019,
      title: "Hypusine biosynthesis in β cells links polyamine metabolism to facultative cellular proliferation to maintain glucose homeostasis",
      journal: "Sci Signal",
      volume: "12(610): eaax0715",
      link: "https://pubmed.ncbi.nlm.nih.gov/31796630/"
    },
    {
      authors: "Modares NF, Polz R, Haghighi F, Lamertz L, Behnke K, Zhuang Y, Kordes C, Haussinger D, Sorg UR, Pfeffer K, Floss DM, Moll JM, Piekorz RP, Ahmadian MR, Lang PA, Scheller J.",
      year: 2019,
      title: "IL-6 trans-signaling controls liver regeneration after partial hepatectomy",
      journal: "Hepatology",
      volume: "70(6): 2075-2091",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31100194"
    },
    {
      authors: "Zhang Z, Sliter DA, Bleck CKE, Ding S.",
      year: 2019,
      title: "Fis1 deficiencies differentially affect mitochondrial quality in skeletal muscle",
      journal: "Mitochondrion49: 217-226",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31526891"
    },
    {
      authors: "Zhu W, Botticelli EM, Kery RE, Mao Y, Wang X, Yang A, Zhou J, Zhang X, Soberman RJ, Klibanski A, Zhou Y.",
      year: 2019,
      title: "Meg3-DMR, not the Meg3 gene, regulates imprinting of the Dlk1-Dio3 locus",
      journal: "Dev Biol",
      volume: "455(1): 10-18",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31301299"
    },
    {
      authors: "Cui SY, Yang MX, Zhang YH, Zheng V, Zhang HT, Gurney ME, Xu Y, O’Donnell JM.",
      year: 2019,
      title: "Protection from Amyloid β Peptide-Induced Memory, Biochemical, and Morphological Deficits by a Phosphodiesterase-4D Allosteric Inhibitor",
      journal: "J Pharmacol Exp Ther",
      volume: "371(2): 250-259",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31488603"
    },
    {
      authors: "Timofeev O, Klimovich B, Schneikert J, Wanzel M, Pavlakis E, Noll J, Mutlu S, Elmshauser S, Nist A, Mernberger M, Lamp B, Wenig U, Brobeil A, Gattenlohner S, Kohler K, Stiewe T.",
      year: 2019,
      title: "Residual apoptotic activity of a tumorigenic p53 mutant improves cancer therapy responses",
      journal: "EMBO J",
      volume: "38(20): e102096",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31483066"
    },
    {
      authors: "Khor B, Conway KL, Omar AS, Biton M, Haber AL, Rogel N, Baxt LA, Begun J, Kuballa P, Gagnon JD, Lassen KG, Regev A, Xavier RJ.",
      year: 2019,
      title: "Distinct Tissue-Specific Roles for the Disease-Associated Autophagy Genes ATG16L2 and ATG16L1",
      journal: "J Immunol",
      volume: "203(7): 1820-1829",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31451676"
    },
    {
      authors: "Kanwal A, Pillai VB, Samant S, Gupta M, Gupta MP.",
      year: 2019,
      title: "The nuclear and mitochondrial sirtuins, Sirt6 and Sirt3, regulate each other’s activity and protect the heart from developing obesity-mediated diabetic cardiomyopathy",
      journal: "FASEB J",
      volume: "33(10): 10872-10888",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31318577"
    },
    {
      authors: "Lawrence DW, Shornick LP, Kornbluth J.",
      year: 2019,
      title: "Mice deficient in NKLAM have attenuated inflammatory cytokine production in a Sendai virus pneumonia model",
      journal: "PLoS One",
      volume: "14(9): e0222802",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31539400"
    },
    {
      authors: "Karayol R, Medrihan L, Warner-Schmidt JL, Rao MN, Holzner EB, Greengard P, Heintz N, Schmidt EF.",
      year: 2019,
      title: "Serotonin receptor 4 in mature excitatory hippocampal neurons modulates mood and anxiety",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/758151v1.abstract"
    },
    {
      authors: "Saito T, Mihira N, Matsuba Y, Sasaguri H, Hashimoto S, Narasimhan S, Zhang B, Murayama S, Higuchi M, Lee VMY, Trojanowski JQ, Saido TC.",
      year: 2019,
      title: "Humanization of the entire murine Mapt gene provides a murine model of pathological human tau propagation",
      journal: "J Biol Chem",
      volume: "294(34): 12754-12765",
      link: "https://pubmed.ncbi.nlm.nih.gov/31273083/"
    },
    {
      authors: "Dubois EL, Guitton-Sert L, Beliveau M, Parmar K, Chagraoui J, Vignard J, Pauty J, Caron MC, Coulombe Y, Buisson R, Jacquet K, Gamblin C, Gao Y, Laprise P, Lebel M, Sauvageau G, D d’Andrea A, Masson JY.",
      year: 2019,
      title: "A Fanci knockout mouse model reveals common and distinct functions for FANCI and FANCD2",
      journal: "Nucleic Acids Res",
      volume: "47(14): 7532-7547",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31219578"
    },
    {
      authors: "Zhao J, Tian Y, Zhang H, Qu L, Chen Y, Liu Q, Luo Y, Wu X.",
      year: 2019,
      title: "p53 Mutant p53N236S Induces Neural Tube Defects in Female Embryos",
      journal: "Int J Biol Sci",
      volume: "15(9): 2006-2015",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31523200"
    },
    {
      authors: "Vila IK, Park MK, Setijono SR, Yao Y, Kim H, Badin PM, Choi S, Narkar V, Choi SW, Chung J, Moro C, Song SJ, Song MS.",
      year: 2019,
      title: "A muscle-specific UBE2O/AMPKα2 axis promotes insulin resistance and metabolic syndrome in obesity",
      journal: "JCI Insight4(13). pii: 128269",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31292296"
    },
    {
      authors: "Wang WH, Krisenko MO, Higgins RL, Morman RE, Geahlen RL.",
      year: 2019,
      title: "A Mouse Model for the Study of SYK Function through Chemical Genetics Demonstrates SYK-Dependent Signaling through the B Cell Receptor, but Not TLR4",
      journal: "Immunohorizons",
      volume: "3(7): 254-261",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31356155"
    },
    {
      authors: "Kim SS, Hwang WM, Yang WM, Lee H, Park KS, Dagon Y, Kim YB.",
      year: 2019,
      title: "Rho-kinase mediates the anorexigenic action of melanocortin by suppressing AMPK",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/677880v1.abstract"
    },
    {
      authors: "Hashimoto S, Matsuba Y, Kamano N, Mihira N, Sahara N, Takano J, Muramatsu SI, Saido TC, Saito T.",
      year: 2019,
      title: "Tau binding protein CAPON induces tau aggregation and neurodegeneration",
      journal: "Nat Commun",
      volume: "10(1): 2394",
      link: "https://pubmed.ncbi.nlm.nih.gov/31160584/"
    },
    {
      authors: "Koo YD, Lee JS, Lee SA, Quaresma PGF, Bhat R, Haynes WG, Park YJ, Kim YB, Chung SS, Park KS.",
      year: 2019,
      title: "SUMO-specific protease 2 mediates leptin-induced fatty acid oxidation in skeletal muscle",
      journal: "Metabolism95:27-35",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30902749"
    },
    {
      authors: "Ge C, Vilfranc CL, Che L, Pandita RK, Hambarde S, Andreassen PR, Niu L, Olowokure O, Shah S, Waltz SE, Zou L, Wang J, Pandita TK, Du C.",
      year: 2019,
      title: "The BRUCE-ATR Signaling Axis Is Required for Accurate DNA Replication and Suppression of Liver Cancer Development",
      journal: "Hepatology",
      volume: "69(6): 2608-2622",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30693543"
    },
    {
      authors: "Andersen RE, Hong SJ, Lim JJ, Cui M, Harpur BA, Hwang E, Delgado RN, Ramos AD, Liu SJ, Blencowe BJ, Lim DA.",
      year: 2019,
      title: "The Long Noncoding RNA Pnky Is a Trans-acting Regulator of Cortical Development In Vivo",
      journal: "Dev Cell",
      volume: "49(4): 632-642.e7",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31112699"
    },
    {
      authors: "Chekuri A, Sahu B, Chavali VRM, Voronchikhina M, Hermida AS, Suk JJ, Alapati AN, Bartsch DU, Ayala-Ramirez R, Zenteno JC, Dinculescu A, Jablonski MM, Borooah S, Ayyagari R.",
      year: 2019,
      title: "The long-term effects of gene therapy in a novel mouse model of human MFRP-associated retinopathy",
      journal: "Hum Gene Ther",
      volume: "30(5): 632-650",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30499344"
    },
    {
      authors: "Chen J, Zhang C, Su Z, Li FL, Hwu P, Wang Z, Wang Y, Li Y, Tong J, Chen C, Zhou D.",
      year: 2019,
      title: "Normal development and fertility of Fut1, Fut2, and Sec1 triple knockout mice",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/615070v1"
    },
    {
      authors: "Burzynski LC, Humphry M, Pyrillou K, Wiggins KA, Chan JNE, Figg N, Kitt LL, Summers C, Tatham KC, Martin PB, Bennett MR, Clarke MCH.",
      year: 2019,
      title: "The Coagulation and Immune Systems Are Directly Linked through the Activation of Interleukin-1α by Thrombin",
      journal: "Immunity",
      volume: "50(4): 1033-1042.e6",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30926232"
    },
    {
      authors: "Kumari SS, Varadaraj K.",
      year: 2019,
      title: "A predominant form of C-terminally end-cleaved AQP0 functions as an open water channel and an adhesion protein in AQP0ΔC/ΔC mouse lens",
      journal: "Biochem Biophys Res Commun",
      volume: "511(3): 626-630",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30826060"
    },
    {
      authors: "Stefan-Lifshitz M, Karakose E, Cui L, Ettela A, Yi Z, Zhang W, Tomer Y.",
      year: 2019,
      title: "Epigenetic modulation of β cells by interferon-α via PNPT1/mir-26a/TET2 triggers autoimmune diabetes",
      journal: "JCI Insight4(5). pii: 126663",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30721151"
    },
    {
      authors: "Hussain M, Mondal P, Song WJ.",
      year: 2019,
      title: "Compositions and methods for treating diabetes",
      journal: "US Patent No.10220069B2",
      volume: "",
      link: "https://patents.google.com/patent/US10220069B2/en"
    },
    {
      authors: "Varadaraj K, Kumari S.",
      year: 2019,
      title: "Deletion of Seventeen Amino Acids at the C-Terminal End of Aquaporin 0 Causes Distortion Aberration and Cataract in the Lenses of AQP0ΔC/ΔC Mice",
      journal: "Invest Ophthalmol Vis Sci",
      volume: "60(4): 858-867",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30821811"
    },
    {
      authors: "Sangkhae V, Nemeth E.",
      year: 2019,
      title: "Placental iron transport: the mechanism and regulatory circuits",
      journal: "Free Radic Biol Med133: 254-261",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29981833"
    },
    {
      authors: "Weyrer C, Turecek J, Niday Z, Liu PW, Nanou E, Catterall WA, Bean BP, Regehr WG.",
      year: 2019,
      title: "The Role of CaV2.1 Channel Facilitation in Synaptic Facilitation",
      journal: "Cell Rep",
      volume: "26(9): 2289-2297.e3",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30811980"
    },
    {
      authors: "Pillai MR, Mihi B, Ishiwata K, Nakamura K, Sakuragi N, Finkelstein DB, McGargill MA, Nakayama T, Ayabe T, Coleman ML, Bix M.",
      year: 2019,
      title: "Myc-induced nuclear antigen constrains a latent intestinal epithelial cell-intrinsic anthelmintic pathway",
      journal: "PLoS One",
      volume: "14(2): e0211244",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30807587"
    },
    {
      authors: "Palczewski K, Maeda A, Golczak M.",
      year: 2019,
      title: "Compounds and methods of treating ocular disorders",
      journal: "US Patent No.10208049B2",
      volume: "",
      link: "https://patents.google.com/patent/US10208049B2/en"
    },
    {
      authors: "Conley SM, Stuck MW, Watson JN, Zulliger R, Burnett JL, Naash MI.",
      year: 2019,
      title: "Prph2 initiates outer segment morphogenesis but maturation requires Prph2/Rom1 oligomerization",
      journal: "Hum Mol Genet",
      volume: "28(3):459-475",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30307502"
    },
    {
      authors: "Vendrov AE, Sumida A, Canugovi C, Lozhkin A, Hayami T, Madamanchi NR, Runge MS.",
      year: 2019,
      title: "NOXA1-dependent NADPH Oxidase Regulates Redox Signaling and Phenotype of Vascular Smooth Muscle Cell During Atherogenesis",
      journal: "Redox Biol",
      volume: "21:101063",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30576919"
    },
    {
      authors: "Onaivi ES, Qing-Rong L.",
      year: 2019,
      title: "Transgenic Mice",
      journal: "US Patent Application No.US2019/0029238 A1",
      volume: "",
      link: "https://patentimages.storage.googleapis.com/7b/58/1e/b484814e486d8e/US20190029238A1.pdf"
    }
  ],
  "2018": [
    {
      authors: "Fuqua BK, Lu Y, Frazer DM, Darshan D, Wilkins SJ, Dunn L, Loguinov AV, Kogan, SC, Matak P, Chen H, Dunaief JL, Vulpe CD, Anderson GJ.",
      year: 2018,
      title: "Severe Iron Metabolism Defects in Mice With Double Knockout of the Multicopper Ferroxidases Hephaestin and Ceruloplasmin",
      journal: "Cell Mol Gastroenterol Hepatol, 6(4)",
      volume: "",
      link: "https://pubmed.ncbi.nlm.nih.gov/30182051/"
    },
    {
      authors: "Zheng J, Jiang R, Chen M, Maimaitiming Z, Wang J, Anderson GJ, Vulpe CD, Dunaief JL, Chen H.",
      year: 2018,
      title: "Multi-Copper Ferroxidase-Deficient Mice Have Increased Brain Iron Concentrations and Learning and Memory Deficits",
      journal: "The Journal of Nutrition",
      volume: "148(4): 643-649",
      link: "https://academic.oup.com/jn/article/148/4/643/4965924?login=true"
    },
    {
      authors: "Emrick JJ, Mathur A, Wei J, Gracheva EO, Gronert K, Rosenblum MD, Julius D.",
      year: 2018,
      title: "Tissue-specific contributions of Tmem79 to atopic dermatitis and mast cell-mediated histaminergic itch",
      journal: "Proc Natl Acad Sci U S A",
      volume: "115(51): E12091-E12100",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30463955"
    },
    {
      authors: "Sato PY, Chuprun JK, Grisanti LA, Woodall MC, Brown BR, Roy R, Traynham CJ, Ibetti J, Lucchese AM, Yuan A, Drosatos K, Tilley DG, Gao E, Koch WJ.",
      year: 2018,
      title: "Restricting mitochondrial GRK2 post-ischemia confers cardioprotection by reducing myocyte death and maintaining glucose oxidation",
      journal: "Sci Signal 11(560)",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30538174"
    },
    {
      authors: "Pollak AJ, Liu C, Gudlur A, Mayfield JE, Dalton ND, Gu Y, Chen J, Heller Brown J, Hogan PG, Wiley SE, Peterson KL, Dixon JE.",
      year: 2018,
      title: "A secretory pathway kinase regulates sarcoplasmic reticulum Ca2+ homeostasis and protects against heart failure",
      journal: "Elife7: e41378",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30520731"
    },
    {
      authors: "Fernandez RF, Kim SQ, Zhao Y, Foguth RM, Weera MM, Counihan JL, Nomura DK, Chester JA, Cannon JR, Ellis JM.",
      year: 2018,
      title: "Acyl-CoA synthetase 6 enriches the neuroprotective omega-3 fatty acid DHA in the brain",
      journal: "Proc Natl Acad Sci U S A",
      volume: "115(49): 12525-12530",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30401738"
    },
    {
      authors: "Uche UU, Piccirillo AR, Kataoka S, Grebinoski SJ, D’Cruz LM, Kane LP.",
      year: 2018,
      title: "PIK3IP1/TrIP restricts activation of T cells through inhibition of PI3K/Akt",
      journal: "J Exp Med",
      volume: "215(12): 3165-3179",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30429249"
    },
    {
      authors: "Salvatierra J, Diaz-Bustamante M, Meixiong J, Tierney E, Dong X, Bosmans F.",
      year: 2018,
      title: "A disease mutation reveals a role for NaV1.9 in acute itch",
      journal: "J Clin Invest",
      volume: "128(12): 5434-5447",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30395542"
    },
    {
      authors: "Memetimin H, Li D, Tan K, Zhou C, Liang Y, Wu Y, Wang S.",
      year: 2018,
      title: "Myeloid Specific Deletion of Thrombospondin 1 Protects Against Inflammation and Insulin Resistance in Long-term Diet-induced Obese Male Mice",
      journal: "Am J Physiol Endocrinol Metab",
      volume: "315(6): E1194-E1203",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30351986"
    },
    {
      authors: "Fazel Darbandi S, Robinson Schwartz SE, Qi Q, Catta-Preta R, Pai EL, Mandell JD,  Everitt A, Rubin A, Krasnoff RA, Katzman S, Tastad D, Nord AS, Willsey AJ, Chen B, State MW, Sohal VS, Rubenstein JLR.",
      year: 2018,
      title: "Neonatal Tbr1 Dosage Controls Cortical Layer 6 Connectivity",
      journal: "Neuron",
      volume: "100(4): 831-845.e7",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30318412"
    },
    {
      authors: "Engelowski E, Modares NF, Gorressen S, Bouvain P, Semmler D, Alter C, Ding Z, Flogel U, Schrader J, Xu H, Lang PA, Fischer J, Floss DM, Scheller J.",
      year: 2018,
      title: "IL-23R Signaling Plays No Role in Myocardial Infarction",
      journal: "Sci Rep",
      volume: "8(1): 17078",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30459442"
    },
    {
      authors: "Hurley S, Mohan C, Suetterlin P, Ellegood J, Rudari F, Lerch JP, Fernandes C, Basson MA.",
      year: 2018,
      title: "Non-monotonic regulation of gene expression, neural progenitor fate and brain growth by the chromatin remodeller CHD8",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/469031v1.abstract"
    },
    {
      authors: "Chen X, Umeh CC, Tainsh RE, Feng DD, Maguire M, Zuo F, Rahimian M, Logan R, Wang X, Ascherio A, Macklin EA, Buys ES, Schwarzschild MA.",
      year: 2018,
      title: "Dissociation between urate and blood pressure in mice and in people with early Parkinson’s disease",
      journal: "EBioMedicine",
      volume: "37: 259-268",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30415890"
    },
    {
      authors: "Tharmarajah G, Eckhard U, Jain F, Marino G, Prudova A, Urtatiz O, Fuchs H, Angelis MH, Overall CM, Van Raamsdonk CD.",
      year: 2018,
      title: "Melanocyte development in the mouse tail epidermis requires the Adamts9 metalloproteinase",
      journal: "Pigment Cell Melanoma Res",
      volume: "31(6): 693-707",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29781574"
    },
    {
      authors: "Li S, Franken P, Vassalli A.",
      year: 2018,
      title: "Bidirectional and context-dependent changes in theta and gamma oscillatory brain activity in noradrenergic cell-specific Hypocretin/Orexin receptor 1-KO mice",
      journal: "Sci Rep",
      volume: "8(1): 15474",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30341359"
    },
    {
      authors: "Zulliger R, Conley SM, Mwoyosvi ML, Al-Ubaidi MR, Naash MI.",
      year: 2018,
      title: "Oligomerization of Prph2 and Rom1 is essential for photoreceptor outer segment formation",
      journal: "Hum Mol Gen",
      volume: "27(20): 3507-3518",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29961824"
    },
    {
      authors: "Kimonis V, Nalbandian A.",
      year: 2018,
      title: "Exon skipping technology in VCP disease",
      journal: "US Patent No.10093932B2",
      volume: "",
      link: "https://patents.google.com/patent/US10093932B2/en"
    },
    {
      authors: "Fink EC, McConkey M, Adams DN, Haldar SD, Kennedy JA, Guirguis AA, Udeshi ND, Mani DR, Chen M, Liddicoat B, Svinkina T, Nguyen AT, Carr SA, Ebert BL.",
      year: 2018,
      title: "Crbn I391V is sufficient to confer in vivo sensitivity to thalidomide and its derivatives in mice",
      journal: "Blood",
      volume: "132(14):1535-1544",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30064974"
    },
    {
      authors: "Bishop, TE.",
      year: 2018,
      title: "Multi-image color refinement with application to disparity estimation",
      journal: "US Patent No.10,097,805 B2",
      volume: "",
      link: "https://patents.google.com/patent/US10097805B2/en"
    },
    {
      authors: "Wang C, de Mochel NSR, Christenson SA, Cassandras M, Moon R, Brumwell AN, Byrnes LE, Li A, Yokosaki Y, Shan P, Sneddon JB, Jablons D, Lee PJ, Matthay MA, Chapman HA, Peng T.",
      year: 2018,
      title: "Expansion of hedgehog disrupts mesenchymal identity and induces emphysema phenotype",
      journal: "J Clin Invest",
      volume: "128(10): 4343-4358",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29999500"
    },
    {
      authors: "Zhang F, Suzuki M, Kim IS, Kobayashi R, Hamada N, Sato F, Bhawal UK.",
      year: 2018,
      title: "Transcription factor DEC1 is required for maximal experimentally induced periodontal inflammation",
      journal: "J Periodontal Res",
      volume: "53(5): 883-893",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29882288"
    },
    {
      authors: "Zhang C, Xu Y, Chowdhary A, Fox D 3rd, Gurney ME, Zhang HT, Auerbach BD, Salvi RJ, Yang M, Li G, O’Donnell JM.",
      year: 2018,
      title: "Memory enhancing effects of BPN14770, an allosteric inhibitor of phosphodiesterase-4D, in wild-type and humanized mice",
      journal: "Neuropsychopharmacology",
      volume: "43(11): 2299-2309",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30131563"
    },
    {
      authors: "Defrances MC, Kane LP.",
      year: 2018,
      title: "Manipulation of T Cell and Mast Cell Activation by PIK3IP1",
      journal: "US Patent Application No.15/909322",
      volume: "",
      link: "http://www.freepatentsonline.com/y2018/0250393.html"
    },
    {
      authors: "Obana EA, Zhou Q, Furmanski O, Doughty ML.",
      year: 2018,
      title: "Conditional deletion of Neurog1 in the cerebellum of postnatal mice delays inhibitory interneuron maturation",
      journal: "J Neurosci Res",
      volume: "96(9): 1560-1575",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29665106"
    },
    {
      authors: "Keszei M, Record J, Kritikou JS, Wurzer H, Geyer C, Thiemann M, Drescher P, Brauner H, Köcher L, James J, He M, Baptista MAP, Dahlberg CIM, Biswas A, Lain S, Lane DP, Song W, Pütsep K, Vandenberghe P, Snapper SB, Westerberg LS.",
      year: 2018,
      title: "Constitutive activation of WASp in X-linked neutropenia renders neutrophils hyperactive",
      journal: "J Clin Invest",
      volume: "128(9): 4115-4131",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30124469"
    },
    {
      authors: "Kim IS, Zhang F, Bhawal UK.",
      year: 2018,
      title: "The Role of the Hypoxia Responsive Gene DEC1 in Periodontal Inflammation",
      journal: "J Hard Tissue Biol",
      volume: "27(3): 227-232",
      link: "https://www.jstage.jst.go.jp/article/jhtb/27/3/27_227/_article/-char/en"
    },
    {
      authors: "Shridas P, De Beer MC, Webb NR.",
      year: 2018,
      title: "High-density lipoprotein inhibits serum amyloid A-mediated reactive-oxygen species generation and NLRP3 inflammasome activation",
      journal: "J Biol Chem",
      volume: "293(34): 13257-13269",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29976759"
    },
    {
      authors: "Zhang J, Yan R, Wu C, Wang H, Yang G, Zhong Y, Liu Y, Wan L, Tang A.",
      year: 2018,
      title: "Spermatogenesis‐associated 48 is essential for spermatogenesis in mice",
      journal: "Andrologia",
      volume: "50(6): e13027",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29700843"
    },
    {
      authors: "Choi EH, Suh S, Sander CL, Hernandez CJO, Bulman ER, Khadka N, Dong Z, Shi W, Palczewski K, Kiser PD.",
      year: 2018,
      title: "Insights into the pathogenesis of dominant retinitis pigmentosa associated with a D477G mutation in RPE65",
      journal: "Hum Mol Genet",
      volume: "27(13): 2225-2243",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29659842"
    },
    {
      authors: "Ali A, Mistry BV, Ahmed HA, Abdulla R, Amer HA, Prince A, Alazami AM, Alkuraya FS, Assiri A.",
      year: 2018,
      title: "Deletion of DDB1- and CUL4- associated factor-17 (Dcaf17) gene causes spermatogenesis defects and male infertility in mice",
      journal: "Sci Rep",
      volume: "8(1): 9202",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29907856"
    },
    {
      authors: "Suetterlin P, Hurley S, Mohan C, Riegman KLH, Pagani M, Caruso A, Ellegood J, Galbusera A, Crespo-Enriquez I, Michetti C, Yee Y, Ellingford R, Brock O, Delogu A, Francis-West P, Lerch JP, Scattoni ML, Gozzi A, Fernandes C, Basson MA.",
      year: 2018,
      title: "Altered Neocortical Gene Expression, Brain Overgrowth and Functional Over-Connectivity in Chd8 Haploinsufficient Mice",
      journal: "Cereb Cortex",
      volume: "28(6): 2192-2206",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29668850"
    },
    {
      authors: "Wall MJ, Collins DR, Chery SL, Allen ZD, Pastuzyn ED, George AJ, Nikolova VD, Moy SS, Philpot BD, Shepherd JD, Müller J, Ehlers MD, Mabb AM, Corrêa SAL.",
      year: 2018,
      title: "The Temporal Dynamics of Arc Expression Regulate Cognitive Flexibility",
      journal: "Neuron",
      volume: "98(6): 1124-1132.e7",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29861284"
    },
    {
      authors: "Wan H, Lapek J, Fujimura K, Strnadel J, Liu B, Gonzalez DJ, Zhang W, Watson F, Yu V, Liu C, Melo CM, Miller YI, Elliott KC, Cheresh DA, Klemke RL.",
      year: 2018,
      title: "Pseudopodium-enriched atypical kinase 1 mediates angiogenesis by modulating GATA2-dependent VEGFR2 transcription",
      journal: "Cell Discov",
      volume: "4(1): 26",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29872538"
    },
    {
      authors: "Alvarez MB, Xu L, Childress P, Maupin KA, Mohamad SFG, Chitteti B, Himes E, Olivos Iii DJ, Cheng YH, Conway SJ, Srour EF, Kacena MA.",
      year: 2018,
      title: "Megakaryocyte and Osteoblast Interactions Modulate Bone Mass and Hematopoiesis",
      journal: "Stem Cell Dev",
      volume: "27(10): 671-682",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29631496"
    },
    {
      authors: "Hayashi H, Hess DT, Zhang R, Sugi K, Gao H, Tan BL, Bowles DE, Milano CA, Jain MK, Koch W, Stamler JS.",
      year: 2018,
      title: "S-Nitrosylation of β-Arrestins Biases Receptor Signaling and Confers Ligand Independence",
      journal: "Mol Cell",
      volume: "70(3): 473-487.e6",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29727618"
    },
    {
      authors: "Nanou E, Lee A, Catterall WA.",
      year: 2018,
      title: "Control of Excitation/Inhibition Balance in a Hippocampal Circuit by Calcium Sensor Protein Regulation of Presynaptic Calcium Channels",
      journal: "J Neurosci",
      volume: "38(18): 4430-4440",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29654190"
    },
    {
      authors: "Huntoon V, Widrick JJ, Sanchez C, Rosen SM, Kutchukian C, Cao S, Pierson CR, Liu X, Perrella MA, Beggs AH, Jacquemond V, Agrawal PB.",
      year: 2018,
      title: "SPEG-deficient skeletal muscles exhibit abnormal triad and defective calcium handling",
      journal: "Hum Mol Genet",
      volume: "27(9): 1608-1617",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29474540"
    },
    {
      authors: "Liu J, Reggiani JDS, Laboulaye MA, Pandey S, Chen B, Rubenstein JLR, Krishnaswamy A, Sanes JR.",
      year: 2018,
      title: "Tbr1 instructs laminar patterning of retinal ganglion cell dendrites",
      journal: "Nat Neurosci",
      volume: "21(5): 659-670",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29632360"
    },
    {
      authors: "Gale Jr MJ, Schnell G, Loo Y.",
      year: 2018,
      title: "Methods and Compositions for Activation of Innate Immune Responses Through RIG-I Like Receptor Signaling",
      journal: "US Patent Application No.15/711934",
      volume: "",
      link: "http://www.freepatentsonline.com/y2018/0104325.html"
    },
    {
      authors: "Wallace CH, Wu BX, Salem M, Ansa-Addo EA, Metelli A, Sun S, Gilkeson G, Shlomchik MJ, Liu B, Li Z.",
      year: 2018,
      title: "B lymphocytes confer immune tolerance via cell surface GARP-TGF-β complex",
      journal: "JCI Insight 3(7)",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29618665"
    },
    {
      authors: "Nixon AM, Meadowcroft MD, Neely EB, Snyder AM, Purnell CJ, Wright J, Lamendella R, Nandar W, Huang X, Connor JR.",
      year: 2018,
      title: "HFE Genotype Restricts the Response to Paraquat in a Mouse Model of Neurotoxicity.",
      journal: "J Neurochem",
      volume: "145(4): 299-311",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29315562"
    },
    {
      authors: "Lawrence DW, Kornbluth J.",
      year: 2018,
      title: "Reduced inflammation and cytokine production in NKLAM deficient mice during Streptococcus pneumoniae infection",
      journal: "PLoS One",
      volume: "13(3): e0194202",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29518136"
    },
    {
      authors: "Ariizumi K, Cruz P.",
      year: 2018,
      title: "Anti-dc-hil antibodies for cancer diagnosis, prognosis and therapy",
      journal: "US Patent No.20180064809A1",
      volume: "",
      link: "https://patents.google.com/patent/US20180064809A1/en"
    },
    {
      authors: "Cardamone MD, Tanasa B, Cederquist CT, Huang J, Mahdaviani K, Li W, Rosenfeld MG, Liesa M, Perissi V.",
      year: 2018,
      title: "Mitochondrial Retrograde Signaling in Mammals Is Mediated by the Transcriptional Cofactor GPS2 via Direct Mitochondria-to-Nucleus Translocation",
      journal: "Mol Cell",
      volume: "69(5): 757-772",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29499132"
    },
    {
      authors: "Cortes JR, Ambesi-Impiombato A, Couronne L, Quinn SA, Kim CS, da Silva Almeida AC, West Z, Belver L, Martin MS, Scourzic L, Bhagat G, Bernard OA, Ferrando AA, Palomero T.",
      year: 2018,
      title: "RHOA G17V Induces T Follicular Helper Cell Specification and Promotes Lymphomagenesis",
      journal: "Cancer Cell",
      volume: "33(2): 259-273",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29398449"
    },
    {
      authors: "Chang HF, Manneback S, Beck A, Ravichandran K, Krause E, Frohnweiler K, Fecher-Trost C, Schirra C, Pattu V, Flockerzi V, Rettig J.",
      year: 2018,
      title: "Cytotoxic granule endocytosis depends on the Flower protein.",
      journal: "J Cell Biol",
      volume: "217(2): 667-683",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29288152"
    },
    {
      authors: "Ussher JR, Campbell JE, Mulvihill EE, Baggio LL, Bates HE, McLean BA, Gopal K, Capozzi M, Yusta B, Cao X, Ali S, Kim M, Kabir MG, Seino Y, Suzuki J, Drucker DJ.",
      year: 2018,
      title: "Inactivation of the Glucose-Dependent Insulinotropic Polypeptide Receptor Improves Outcomes following Experimental Myocardial Infarction",
      journal: "Cell Metab",
      volume: "27(2): 450-460.e6",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29275960"
    },
    {
      authors: "Zhao L, Wang B, Zhao X, Wu X, Zhang Q, Wei C, Shi M, Li Y, Tang W, Zhang J, Yang J, Singh SK, Jia S, Luo Y.",
      year: 2018,
      title: "Gain of function in the mouse model of a recurrent mutation p53N236S promotes the formation of double minute chromosomes and the oncogenic potential of p19ARF",
      journal: "Mol Carcinog",
      volume: "57(2): 147-158",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28949402"
    },
    {
      authors: "Molina-Ortiz P, Orban T, Martin M, Habets A, Dequiedt F, Schurmans S.",
      year: 2018,
      title: "Rasa3 controls turnover of endothelial cell adhesion and vascular lumen integrity by a Rap1-dependent mechanism",
      journal: "PLoS Genet",
      volume: "14(1): e1007195",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29381707"
    },
    {
      authors: "Molday LL, Wahl D, Sarunic MV, Molday RS.",
      year: 2018,
      title: "Localization and functional characterization of the p.Asn965Ser (N965S) ABCA4 variant in mice reveal pathogenic mechanisms underlying Stargardt macular degeneration",
      journal: "Hum Mol Genet",
      volume: "27(2): 295-306",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29145636"
    },
    {
      authors: "Schmidt MO, Garman KA, Lee YG, Zuo C, Beck PJ, Tan M, Aguilar-Pimentel JA, Ollert M, Schmidt-Weber C, Fuchs H, Gailus-Durner V, Hrabe de Angelis M, Tassi E, Riegel AT, Wellstein A.",
      year: 2018,
      title: "The Role of Fibroblast Growth Factor-Binding Protein 1 in Skin Carcinogenesis and Inflammation",
      journal: "J Invest Dermatol",
      volume: "138(1): 179-188",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28864076"
    }
  ],
  "2017": [
    {
      authors: "Kelley RA, Al-Ubaidi MR, Sinha T, Genc AM, Makia MS, Ikelle L, Naash MI.",
      year: 2017,
      title: "Ablation of the riboflavin-binding protein retbindin reduces flavin levels and leads to progressive and dose-dependent degeneration of rods and cones",
      journal: "J Biol Chem",
      volume: "292(51): 21023-21034",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29079576"
    },
    {
      authors: "Liu QR, Canseco-Alba A, Zhang HY, Tagliaferro P, Chung M, Dennis E, Sanabria B, Schanz N, Escosteguy-Neto JC, Ishiguro H, Lin Z, Sgro S, Leonard CM, Santos-Junior JG, Gardner EL, Egan JM, Lee JW, Xi ZX, Onaivi ES.",
      year: 2017,
      title: "Cannabinoid type 2 receptors in dopamine neurons inhibits psychomotor behaviors, alters anxiety, depression and alcohol preference.",
      journal: "Sci Rep7: 17410",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29234141"
    },
    {
      authors: "Wischhof L, Maida S, Piazzesi A, Gioran A, Barragan Sanz K, Irsen S, Beyer M, Schultze JL, Dyer MJ, Salomoni P,  Ehninger D, Nicotera P, Bano D.",
      year: 2017,
      title: "The SWI/SNF subunit Bcl7a contributes to motor coordination and Purkinje cell function.",
      journal: "Sci Rep7: 17055",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29213114"
    },
    {
      authors: "Noh K, Mangala LS, Han HD, Zhang N, Pradeep S, Wu SY, Ma S, Mora E, Rupaimoole R, Jiang D, Wen Y, Shahzad MMK, Lyons Y, Cho M, Hu W, Nagaraja AS, Haemmerle M, Mak CSL, Chen X, Gharpure KM, Deng H, Xiong W, Kingsley CV, Liu J, Jennings N, Birrer MJ, Bouchard RR, Lopez-Berestein G, Coleman RL, An Z, Sood AK.",
      year: 2017,
      title: "Differential Effects of EGFL6 on Tumor versus Wound Angiogenesis.",
      journal: "Cell Rep21: 2785-2795",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29212026"
    },
    {
      authors: "Maltese M, Martella G, Imbriani P, Schuermans J, Billion K, Sciamanna G, Farook F, Ponterio G, Tassone A, Santoro M, Bonsi P, Pisani A, Goodchild RE.",
      year: 2017,
      title: "Abnormal striatal plasticity in a DYT11/SGCE myoclonus dystonia mouse model is reversed by adenosine A2A receptor inhibition",
      journal: "Neurobiol Dis",
      volume: "108: 128-139",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28823931"
    },
    {
      authors: "Wu BX, Li A, Lei L, Kaneko S, Wallace C, Li X, Li Z.",
      year: 2017,
      title: "Glycoprotein A repetitions predominant (GARP) positively regulates transforming growth factor (TGF) β3 and is essential for mouse palatogenesis",
      journal: "J Biol Chem",
      volume: "44: 18091-18097",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28912269"
    },
    {
      authors: "Albertini E, Mayr E, Taferner A, Pircher H, Jansen-Duerr P, Von Grafenstein S, Kramer C, Liedl KR, Diener T, Metzger C.",
      year: 2017,
      title: "Uses of FAHD1",
      journal: "US Patent No.20170312343A1",
      volume: "",
      link: "https://patents.google.com/patent/US20170312343A1/en"
    },
    {
      authors: "Valnegri P, Huang J, Yamada T, Yang Y, Mejia LA, Cho HY, Oldenborg A, Bonni A.",
      year: 2017,
      title: "RNF8/UBC13 ubiquitin signaling suppresses synapse formation in the mammalian brain.",
      journal: "Nat Commun8: 1271",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29097665"
    },
    {
      authors: "Shen C, Xu L, Han S, Dong Z, Zhao X, Wang S, Qian S, Li B, Ma X, Wang P, Zhu H, Zou Y, Fan Z, Ge J, Sun A.",
      year: 2017,
      title: "Novel idiopathic DCM-related SCN5A variants localised in DI-S4 predispose electrical disorders by reducing peak sodium current density",
      journal: "J Med Genet",
      volume: "54(11): 762-770",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28779003"
    },
    {
      authors: "Xiao C, Pinol RA, Carlin JL, Li C, Deng C, Gavrilova O, Reitman ML.",
      year: 2017,
      title: "Bombesin-like receptor 3 (Brs3) expression in glutamatergic, but not GABAergic, neurons is required for regulation of energy metabolism",
      journal: "Mol Metab",
      volume: "6(11): 1540-1550",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29107299"
    },
    {
      authors: "Price NL, Rotllan N, Canfran-Duque A, Zhang X, Pati P, Arias N, Moen J, Mayr M, Ford DA, Baldan A,  Suárez Y, Fernández-Hernando C.",
      year: 2017,
      title: "Genetic Dissection of the Impact of miR-33a and miR-33b during the Progression of Atherosclerosis",
      journal: "Cell Rep21: 1317-1330",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29091769"
    },
    {
      authors: "Kuznetsov NV, Almuzzaini B, Kritikou JS, Baptista MAP, Oliveira MMS, Keszei M, Snapper SB, Percipalle P, Westerberg LS.",
      year: 2017,
      title: "Nuclear Wiskott-Aldrich syndrome protein co-regulates T cell factor 1-mediated transcription in T cells",
      journal: "Genome Med",
      volume: "9(1): 91",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29078804"
    },
    {
      authors: "Kim C, Potluri P, Khalil A, Gaut D, McManus M, Compton S, Wallace DC, Yadava N.",
      year: 2017,
      title: "An X-chromosome linked mouse model (Ndufa1S55A) for systemic partial Complex I deficiency for studying predisposition to neurodegeneration and other diseases.",
      journal: "Neurochem Int109:78-93",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28506826"
    },
    {
      authors: "Han X, He Y, Bi GH, Zhang HY, Song R, Liu QR, Egan JM, Gardner EL, Li J, Xi ZX.",
      year: 2017,
      title: "CB1 Receptor Activation on VgluT2-Expressing Glutamatergic Neurons Underlies Δ9-Tetrahydrocannabinol (Δ9-THC)-Induced Aversive Effects in Mice",
      journal: "Sci Rep",
      volume: "7(1): 12315",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28951549"
    },
    {
      authors: "Lietman CD, Segedy AK, Li B, Fazio S, Atkinson JB, Linton MF, Young PP.",
      year: 2017,
      title: "Loss of SPRR3 in ApoE-/- mice leads to atheroma vulnerability through Akt dependent and independent effects in VSMCs",
      journal: "PLoS One",
      volume: "12(9): e0184620",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28886156"
    },
    {
      authors: "Bhave G, Colon S, Ferrell N.",
      year: 2017,
      title: "The sulfilimine cross-link of collagen IV contributes to kidney tubular basement membrane stiffness",
      journal: "Am J Physiol Renal Physiol313(3) :F596-F602",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28424209"
    },
    {
      authors: "Genabai NK, Kannan A, Ahmad S, Jiang X, Bhatia K, Gangwani L.",
      year: 2017,
      title: "Deregulation of ZPR1 causes respiratory failure in spinal muscular atrophy",
      journal: "Sci Rep",
      volume: "7: 8295",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28811488"
    },
    {
      authors: "Muchenditsi A, Yang H, Hamilton JP, Koganti L,Housseau F, Aronov L, Fan H, Pierson H, Bhattacharjee A, Murphy R, Sears C, Potter J, Wooton-Kee CR, Lutsenko S.",
      year: 2017,
      title: "Targeted inactivation of copper transporter Atp7b in hepatocytes causes liver steatosis and obesity in mice",
      journal: "Am J Physiol Gastrointest Liver Physiol",
      volume: "313(1): G39-G49",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28428350"
    },
    {
      authors: "Watson C, Shimogori T, Puelles L.",
      year: 2017,
      title: "Mouse Fgf8-Cre-LacZ lineage analysis defines the territory of the postnatal mammalian isthmus.",
      journal: "J Comp Neurol525: 2782-2799",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28510270"
    },
    {
      authors: "Feldner A, Adam MG, Tetzlaff F, Moll I, Komljenovic D, Sahm F, Bauerle T, Ishikawa H, Schroten H, Korff T, Hofmann I, Wolburg H, von Deimling A, Fischer A.",
      year: 2017,
      title: "Loss of Mpdz impairs ependymal cell integrity leading to perinatal-onset hydrocephalus in mice.",
      journal: "EMBO Mol Med",
      volume: "9: 890-905",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28500065"
    },
    {
      authors: "Tischfield DJ, Saraswat DK, Furash A, Fowler SC, Fuccillo MV, Anderson SA.",
      year: 2017,
      title: "Loss of the neurodevelopmental gene Zswim6 alters striatal morphology and motor regulation",
      journal: "Neurobiol Dis103: 174-183",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28433741"
    },
    {
      authors: "Bicker F, Vasic V, Horta G, Ortega F, Nolte H, Kavyanifar A, Keller S, Stankovic ND, Harter PN, Benedito R, Lutz B, Bauerle T, Hartwig J, Baumgart J, Kruger M, Radyushkin K, Alberi L, Berninger B, Schmidt MHH.",
      year: 2017,
      title: "Neurovascular EGFL7 regulates adult neurogenesis in the subventricular zone and thereby affects olfactory perception",
      journal: "Nat Commun8: 15922",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28656980"
    },
    {
      authors: "Welsbie DS, Mitchell KL, Jaskula-Ranga V, Sluch VM, Yang Z, Kim J, Buehler E, Patel A, Martin SE, Zhang PW, Ge Y, Duan Y, Fuller J, Kim BJ, Hamed E, Chamling X, Lei L, Fraser IDC, Ronai ZA, Berlinicke CA, Zack DJ.",
      year: 2017,
      title: "Enhanced Functional Genomic Screening Identifies Novel Mediators of Dual Leucine Zipper Kinase-Dependent Injury Signaling in Neurons.",
      journal: "Neuron94: 1142-1154 e1146",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28641113"
    },
    {
      authors: "Bosurgi L, Cao YG, Cabeza-Cabrerizo M, Tucci A, Hughes LD, Kong Y, Weinstein JS, Licona-Limon P, Schmid ET, Pelorosso F, Gagliani N, Craft JE, Flavell RA, Ghosh S, Rothlin CV.",
      year: 2017,
      title: "Macrophage function in tissue repair and remodeling requires IL-4 or IL-13 with apoptotic cells.",
      journal: "Science",
      volume: "356(6342): 1072-1076",
      link: "https://pubmed.ncbi.nlm.nih.gov/28495875/"
    },
    {
      authors: "Neudecker V, Haneklaus M, Jensen O, Khailova L, Masterson JC, Tye H, Biette K, Jedlicka P, Brodsky KS, Gerich ME, Mack M, Robertson AAB, Cooper MA, Furuta GT, Dinarello CA, O’Neill LA, Eltzschig HK, Masters SL, McNamee EN.",
      year: 2017,
      title: "Myeloid-derived miR-223 regulates intestinal inflammation via repression of the NLRP3 inflammasome.",
      journal: "J Exp Med214: 1737-1752",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28487310"
    },
    {
      authors: "Krivinko JM, Erickson SL, Abrahamson EE, Wills ZP, Ikonomovic MD, Penzes P, Sweet RA.",
      year: 2017,
      title: "Kalirin reduction rescues psychosis-associated behavioral deficits in APPswe/PSEN1dE9 transgenic mice",
      journal: "Neurobiol Aging54: 59-70",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28319837"
    },
    {
      authors: "Panaro BL, Flock GB, Campbell JE, Beaudry JL, Cao X, Drucker DJ.",
      year: 2017,
      title: "beta-Cell Inactivation of Gpr119 Unmasks Incretin-Dependence of GPR119-Mediated Glucoregulation.",
      journal: "Diabetes",
      volume: "66: 1626-1635",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28254842"
    },
    {
      authors: "Rosenblum LT, Shamamandri-Markandaiah S, Ghosh B, Foran E, Lepore AC, Pasinelli P, Trotti D.",
      year: 2017,
      title: "Mutation of the caspase-3 cleavage site in the astroglial glutamate transporter EAAT2 delays disease progression and extends lifespan in the SOD1-G93A mouse model of ALS.",
      journal: "Exp Neurol292: 145-153",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28342750"
    },
    {
      authors: "Fujita Y, Masuda K, Bando M, Nakato R, Katou Y, Tanaka T, Nakayama M, Takao K, Miyakawa T, Tanaka T, Ago Y, Hashimoto H, Shirahige K, Yamashita T.",
      year: 2017,
      title: "Decreased cohesin in the brain leads to defective synapse development and anxiety-related behavior",
      journal: "J Exp Med",
      volume: "214(5): 1431-1452",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28408410"
    },
    {
      authors: "Nugent AA, Park JG, Wei Y, Tenney AP, Gilette NM, DeLisle MM, Chan WM, Cheng L, Engle EC.",
      year: 2017,
      title: "Mutant α2-chimaerin signals via bidirectional ephrin pathways in Duane retraction syndrome",
      journal: "J Clin Invest",
      volume: "127(5): 1664-1682",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28346224"
    },
    {
      authors: "Longden TA, Dabertrand F, Koide M, Gonzales AL, Tykocki NR, Brayden JE, Hill-Eubanks D, Nelson MT.",
      year: 2017,
      title: "Capillary K+-sensing initiates retrograde hyperpolarization to increase local cerebral blood flow.",
      journal: "Nat Neurosci",
      volume: "20: 717-726",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28319610"
    },
    {
      authors: "Tsvilovskyy V, Solis-Lopez A, Schumacher D, Medert R, Roers A, Kriebs U, Freichel M.",
      year: 2017,
      title: "Deletion of Orai2 augments endogenous CRAC currents and degranulation in mast cells leading to enhanced anaphylaxis",
      journal: "Cell Calcium71: 24-33",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29604961"
    },
    {
      authors: "Daniels BP, Snyder AG, Olsen TM, Orozco S, Oguin TH, 3rd, Tait SW, Martinez J, Gale M, Jr., Loo YM, Oberst A.",
      year: 2017,
      title: "RIPK3 Restricts Viral Pathogenesis via Cell Death-Independent Neuroinflammation.",
      journal: "Cell169: 301-313 e311",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28366204"
    },
    {
      authors: "Martin P, Palmer G, Rodriguez E, Seemayer CA, Palomo J, Talabot-Ayer D, Gabay C.",
      year: 2017,
      title: "Deficiency in IL-1 Receptor Type 2 Aggravates K/BxN Serum Transfer-Induced Arthritis in Mice but Has No Impact on Systemic Inflammatory Responses.",
      journal: "J Immunol",
      volume: "198: 2916-2926",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28235865"
    },
    {
      authors: "Mao M, Kiss M, Ou Y, Gould DB.",
      year: 2017,
      title: "Genetic dissection of anterior segment dysgenesis caused by a Col4a1 mutation.",
      journal: "Dis Model Mech",
      volume: "10: 475-485",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28237965"
    },
    {
      authors: "Wang L,Bell P, Morizono H, He Z, Pumbo E, Yu H, White J, Batshaw ML, Wilson JM.",
      year: 2017,
      title: "AAV gene therapy corrects OTC deficiency and prevents liver fibrosis in aged OTC-knock out heterozygous mice",
      journal: "Mol Genet Metab",
      volume: "120(4): 299-305",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28283349"
    },
    {
      authors: "Zakariyah AF, Rajgara RF, Veinot JP, Skerjanc IS, Burgon PG.",
      year: 2017,
      title: "Congenital heart defect causing mutation in Nkx2.5 displays in vivo functional deficit.",
      journal: "J Mol Cell Cardiol105: 89-98",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28302382"
    },
    {
      authors: "Alexaki A, Clarke BA, Gavrilova O, Ma Y, Zhu H, Ma X, Xu L, Tuymetova G, Larman BC, Allende ML, Dunn TM, Proia RL.",
      year: 2017,
      title: "De Novo Sphingolipid Biosynthesis Is Required for Adipocyte Survival and Metabolic Homeostasis.",
      journal: "J Biol Chem292: 3929-3939",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28100772"
    },
    {
      authors: "Koukouli F, Rooy M, Tziotis D, Sailor KA, O’Neill HC, Levenga J, Witte M, Nilges M, Changeux JP, Hoeffer CA, Stitzel JA, Gutkin BS, DiGregorio DA, Maskos U.",
      year: 2017,
      title: "Nicotine reverses hypofrontality in animal models of addiction and schizophrenia.",
      journal: "Nat Med",
      volume: "23: 347-354",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28112735"
    },
    {
      authors: "Shin Y, Moiseyev G, Chakraborty D, Ma JX.",
      year: 2017,
      title: "A Dominant Mutation in Rpe65, D477G, Delays Dark Adaptation and Disturbs the Visual Cycle in the Mutant Knock-In Mice.",
      journal: "Am J Pathol187: 517-527",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28041994"
    },
    {
      authors: "Lentucci C, Belkina AC, Cederquist CT, Chan M, Johnson HE, Prasad S, Lopacinski A, Nikolajczyk BS, Monti S, Snyder-Cappione J, Tanasa B, Cardamone MD, Perissi V.",
      year: 2017,
      title: "Inhibition of Ubc13-mediated Ubiquitination by GPS2 Regulates Multiple Stages of B Cell Development",
      journal: "J Biol Chem",
      volume: "292(7): 2754-2772",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28039360"
    },
    {
      authors: "Mierke CT, Fischer T, Puder S, Kunschmann T, Soetje B, Ziegler WH.",
      year: 2017,
      title: "Focal adhesion kinase activity is required for actomyosin contractility-based invasion of cells into dense 3D matrices.",
      journal: "Sci Rep7: 42780",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28202937"
    },
    {
      authors: "Noguchi S, Ogawa M, Malicdan MC, Nonaka I, Nishino I.",
      year: 2017,
      title: "Muscle Weakness and Fibrosis Due to Cell Autonomous and Non-cell Autonomous Events in Collagen VI Deficient Congenital Muscular Dystrophy.",
      journal: "EBioMedicine15: 193-202",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28043812"
    },
    {
      authors: "Vannoy CH, Zhou H, Qiao C, Xiao X, Bang AG, Lu QL.",
      year: 2017,
      title: "Adeno-Associated Virus-Mediated Mini-Agrin Delivery Is Unable to Rescue Disease Phenotype in a Mouse Model of Limb Girdle Muscular Dystrophy Type 2I.",
      journal: "Am J Pathol187: 431-440",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28107841"
    },
    {
      authors: "Zhao L, Wang B, Zhao X, Wu X, Zhang Q, Wei C, Shi M, Li Y, Tang W, Zhang J, Yang J, Singh SK, Jia S, Luo Y.",
      year: 2017,
      title: "Gain of function in the mouse model of a recurrent mutation p53N236S promotes the formation of double minute chromosomes and the oncogenic potential of p19ARF.",
      journal: "Mol Carcinog",
      volume: "57(2): 147-158",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28949402"
    }
  ],
  "2016": [
    {
      authors: "Fuqua BK, Dunaief JL, Vulpe CD, Anderson GJ, Wang H, Chen H.",
      year: 2016,
      title: "Hephaestin and ceruloplasmin facilitate iron metabolism in the mouse kidney",
      journal: "Scientific Reports, 6(39470)",
      volume: "",
      link: "https://www.nature.com/articles/srep39470"
    },
    {
      authors: "Kuchmiy AA, D’Hont J, Hochepied T, Lamkanfi M.",
      year: 2016,
      title: "NLRP2 controls age-associated maternal fertility.",
      journal: "J Exp Med",
      volume: "213: 2851-2860",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27881734"
    },
    {
      authors: "Marichal T, Gaudenzio N, El Abbas S, Sibilano R, Zurek O, Starkl P, Reber LL, Pirottin D, Kim J, Chambon P, Roers A, Antoine N, Kawakami Y, Kawakami T, Bureau F, Tam SY, Tsai M, Galli SJ.",
      year: 2016,
      title: "Guanine nucleotide exchange factor RABGEF1 regulates keratinocyte-intrinsic signaling to maintain skin homeostasis.",
      journal: "J Clin Invest",
      volume: "126: 4497-4515",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27820702"
    },
    {
      authors: "Pal R, Ke Q, Pihan GA, Yesilaltay A, Penman ML, Wang L, Chitraju C, Kang PM, Krieger M, Kocher O.",
      year: 2016,
      title: "Carboxy-terminal deletion of the HDL receptor reduces receptor levels in liver and steroidogenic tissues, induces hypercholesterolemia, and causes fatal heart disease.",
      journal: "Am J Physiol Heart Circ Physiol 311: H1392-H1408",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27694217"
    },
    {
      authors: "Meadowcroft MD, Wang J, Purnell CJ, Peters DG, Eslinger PJ, Neely EB, Gill DJ, Vasavada M, Ali-Rahmani F, Yang QX, Connor JR.",
      year: 2016,
      title: "Reduced white matter MRI transverse relaxation rate in cognitively normal H63D-HFE human carriers and H67D-HFE mice.",
      journal: "Brain Imaging Behav",
      volume: "10: 1231-1242",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26660104"
    },
    {
      authors: "Shinohara K, Liu X, Morgan DA, Davis DR, Sequeira-Lopez ML, Cassell MD, Grobe JL, Rahmouni K, Sigmund CD.",
      year: 2016,
      title: "Selective Deletion of the Brain-Specific Isoform of Renin Causes Neurogenic Hypertension",
      journal: "Hypertension",
      volume: "68(6): 1385-1392",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27754863"
    },
    {
      authors: "Jayaraman D, Kodani A, Gonzalez DM, Mancias JD, Mochida GH, Vagnoni C, Johnson J, Krogan N, Harper JW, Reiter JF, Yu TW, Bae BI, Walsh CA.",
      year: 2016,
      title: "Microcephaly Proteins Wdr62 and Aspm Define a Mother Centriole Complex Regulating Centriole Biogenesis, Apical Complex, and Cell Fate.",
      journal: "Neuron",
      volume: "92: 813-828",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27974163"
    },
    {
      authors: "Ni J, Bao S, Johnson RI, Zhu B, Li J, Vadaparampil J, Smith CM, Campbell KN, Grahammer F, Huber TB, Xi ZX.",
      year: 2016,
      title: "MAGI-1 Interacts with Nephrin to Maintain Slit Diaphragm Structure through Enhanced Rap1 Activation in Podocytes.",
      journal: "J Biol Chem",
      volume: "291: 24406-24417",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27707879"
    },
    {
      authors: "Nanou E, Scheuer T, Catterall WA.",
      year: 2016,
      title: "Calcium sensor regulation of the CaV2.1 Ca2+ channel contributes to long-term potentiation and spatial learning.",
      journal: "Proc Natl Acad Sci U S A",
      volume: "113: 13209-13214",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27799552"
    },
    {
      authors: "Pamarthy S, Mao L, Katara GK, Fleetwood S, Kulshreshta A, Gilman-Sachs A, Beaman KD.",
      year: 2016,
      title: "The V-ATPase a2 isoform controls mammary gland development through Notch and TGF-β signaling",
      journal: "Cell Death Dis",
      volume: "7(11): e2443",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27809299"
    },
    {
      authors: "Spencer NJ, Sorensen J, Travis L, Wiklendt L, Costa M, Hibberd T.",
      year: 2016,
      title: "Imaging activation of peptidergic spinal afferent varicosities within visceral organs using novel CGRPalpha-mCherry reporter mice.",
      journal: "Am J Physiol Gastrointest Liver Physiol 311: G880-G894",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27659421"
    },
    {
      authors: "Gao Q, Ren H, Chen M, Niu Z, Tao H, Jia Y, Zhang J, Li W.",
      year: 2016,
      title: "Long non-coding RNAs regulate effects of beta-crystallin B2 on mouse ovary development.",
      journal: "Mol Med Rep",
      volume: "14: 4223-4231",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27666820"
    },
    {
      authors: "Cederquist CT, Lentucci C, Martinez-Calejman C, Hayashi V, Orofino J, Guertin D, Fried SK, Lee MJ, Cardamone MD, Perissi V.",
      year: 2016,
      title: "Systemic insulin sensitivity is regulated by GPS2 inhibition of AKT ubiquitination and activation in adipose tissue",
      journal: "Mol Metab",
      volume: "6(1): 125-137",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28123943"
    },
    {
      authors: "Shepard BD, Cheval L, Peterlin Z, Firestein S, Koepsell H, Doucet A, Pluznick JL.",
      year: 2016,
      title: "A Renal Olfactory Receptor Aids in Kidney Glucose Handling",
      journal: "Sci Rep",
      volume: "6: 35215",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27739476"
    },
    {
      authors: "Wang XF, Barbier E, Chiu YT, He Y, Zhan J, Bi GH, Zhang HY, Feng B, Liu-Chen LY, Wang JB, Xi ZX.",
      year: 2016,
      title: "T394A Mutation at the mu Opioid Receptor Blocks Opioid Tolerance and Increases Vulnerability to Heroin Self-Administration in Mice.",
      journal: "J Neurosci",
      volume: "36: 10392-10403",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27707973"
    },
    {
      authors: "Kurkewich JL, Bikorimana E, Nguyen T, Klopfenstein N, Zhang H, Hallas WM,.",
      year: 2016,
      title: "Stayback G, McDowell MA, Dahl R. 2016. The mirn23a microRNA cluster antagonizes B cell development",
      journal: "J Leukoc Biol",
      volume: "100(4): 665-677",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27084569"
    },
    {
      authors: "Onaivi ES, Liu QR.",
      year: 2016,
      title: "Transgenic mice",
      journal: "WO Patent No.2016137966A1",
      volume: "",
      link: "https://patents.google.com/patent/WO2016137966A1/en"
    },
    {
      authors: "Cheng HY, Gaddis DE, Wu R, McSkimming C, Haynes LD, Taylor AM, McNamara CA, Sorci-Thomas M, Hedrick CC.",
      year: 2016,
      title: "Loss of ABCG1 influences regulatory T cell differentiation and atherosclerosis.",
      journal: "J Clin Invest",
      volume: "126: 3236-3246",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27482882"
    },
    {
      authors: "Chen J, Gu Y, Zhang Z, Zheng W, Yang L, Huang W, Lin S, Li Y, Guo H, Luo M, Ma Q, Jiang Z, Tang A, Gui Y.",
      year: 2016,
      title: "Deficiency of SPATA46, a Novel Nuclear Membrane Protein, Causes Subfertility in Male Mice.",
      journal: "Biol Reprod",
      volume: "95: 58",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27488028"
    },
    {
      authors: "Chakraborty D, Conley SM, Zulliger R, Naash MI.",
      year: 2016,
      title: "The K153Del PRPH2 mutation differentially impacts photoreceptor structure and function.",
      journal: "Hum Mol Genet",
      volume: "25: 3500-3514",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27365499"
    },
    {
      authors: "Beguelin W, Teater M, Gearhart MD, Calvo Fernandez MT, Goldstein RL, Cardenas MG, Hatzi K, Rosen M, Shen H, Corcoran CM, Hamline MY, Gascoyne RD, Levine RL, Abdel-Wahab O, Licht JD, Shaknovich R, Elemento O, Bardwell VJ, Melnick AM.",
      year: 2016,
      title: "EZH2 and BCL6 Cooperate to Assemble CBX8-BCOR Complex to Repress Bivalent Promoters, Mediate Germinal Center Formation and Lymphomagenesis.",
      journal: "Cancer Cell",
      volume: "30: 197-213",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27505670"
    },
    {
      authors: "Shin HY, Willi M, Yoo KH, Zeng X, Wang C, Metser G, Hennighausen L.",
      year: 2016,
      title: "Hierarchy within the mammary STAT5-driven Wap super-enhancer.",
      journal: "Nat Genet",
      volume: "48: 904-911",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27376239"
    },
    {
      authors: "Chatterjee I,Baruah J, Lurie EE, Wary KK.",
      year: 2016,
      title: "Endothelial lipid phosphate phosphatase-3 deficiency that disrupts the endothelial barrier function is a modifier of cardiovascular development",
      journal: "Cardiovasc Res",
      volume: "111(1): 105-18",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27125875"
    },
    {
      authors: "Duquesnes N, Callot C, Jeannot P, Daburon V, Nakayama KI, Manenti S, Davy A, Besson A.",
      year: 2016,
      title: "p57(Kip2) knock-in mouse reveals CDK-independent contribution in the development of Beckwith-Wiedemann syndrome",
      journal: "J Pathol",
      volume: "239(3): 250-61",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27015986"
    },
    {
      authors: "Rios D, Wood MB, Li J, Chassaing B, Gewirtz AT, Williams IR.",
      year: 2016,
      title: "Antigen sampling by intestinal M cells is the principal pathway initiating mucosal IgA production to commensal enteric bacteria",
      journal: "Mucosal Immunol",
      volume: "9(4): 907-16",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26601902"
    },
    {
      authors: "Barriocanal-Casado E, Cueto-Urena C, Benabdellah K, Gutierrez-Guerrero A, Cobo M, Hidalgo-Gutierrez A, Rodriguez-Sevilla JJ, Martin F, Lopez LC.",
      year: 2016,
      title: "Gene Therapy Corrects Mitochondrial Dysfunction in Hematopoietic Progenitor Cells and Fibroblasts from Coq9R239X Mice.",
      journal: "PLoS One 11: e0158344",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27341668"
    },
    {
      authors: "Sonkusare SK, Dalsgaard T, Bonev AD, Nelson MT.",
      year: 2016,
      title: "Inward rectifier potassium (Kir2.1) channels as end-stage boosters of endothelium-dependent vasodilators.",
      journal: "J Physiol",
      volume: "594: 3271-3285",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26840527"
    },
    {
      authors: "Legarda D, Justus SJ, Ang RL, Rikhi N, Li W, Moran TM, Zhang J, Mizoguchi E, Zelic M, Kelliher MA, Blander JM, Ting AT.",
      year: 2016,
      title: "CYLD Proteolysis Protects Macrophages from TNF-Mediated Auto-necroptosis Induced by LPS and Licensed by Type I IFN",
      journal: "Cell Rep",
      volume: "15(11): 2449-61",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27264187"
    },
    {
      authors: "Mercier FE, Sykes DB, Scadden DT.",
      year: 2016,
      title: "Single Targeted Exon Mutation Creates a True Congenic Mouse for Competitive Hematopoietic Stem Cell Transplantation: The C57BL/6-CD45.1(STEM) Mouse.",
      journal: "Stem Cell Reports",
      volume: "6: 985-992",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27185283"
    },
    {
      authors: "Caron C, DeGeer J, Fournier P, Duquette PM, Luangrath V, Ishii H, Karimzadeh F, Lamarche-Vane N, Royal I.",
      year: 2016,
      title: "CdGAP/ARHGAP31, a Cdc42/Rac1 GTPase regulator, is critical for vascular development and VEGF-mediated angiogenesis.",
      journal: "Sci Rep",
      volume: "6: 27485",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27270835"
    },
    {
      authors: "Yang HQ, Foster MN, Jana K, Ho J, Rindler MJ, Coetzee WA.",
      year: 2016,
      title: "Plasticity of sarcolemmal KATP channel surface expression: relevance during ischemia and ischemic preconditioning",
      journal: "Am J Physiol Heart Circ Physiol 310 H1558-66",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27037371"
    },
    {
      authors: "Kim MH, de Beer MC, Wroblewski JM, Charnigo RJ, Ji A, Webb NR, de Beer FC, van der Westhuyzen DR.",
      year: 2016,
      title: "Impact of individual acute phase serum amyloid A isoforms on HDL metabolism in mice.",
      journal: "J Lipid Res",
      volume: "57: 969-979",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27018443"
    },
    {
      authors: "Sato F, Muragaki Y, Kawamoto T, Fujimoto K, Kato Y, Zhang Y.",
      year: 2016,
      title: "Rhythmic expression of DEC2 protein in vitro and in vivo.",
      journal: "Biomed Rep",
      volume: "4: 704-710",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27284410"
    },
    {
      authors: "Wu X, Indzhykulian AA, Niksch PD, Webber RM, Garcia-Gonzalez M, Watnick T, Zhou J, Vollrath MA, Corey DP.",
      year: 2016,
      title: "Hair-Cell Mechanotransduction Persists in TRP Channel Knockout Mice.",
      journal: "PLoS One 11: e0155577",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27196058"
    },
    {
      authors: "Cantù C, Zimmerli D, Basler K.",
      year: 2016,
      title: "Unexpected survival of mice carrying a mutation in Pygo2 that strongly reduces its binding to Bcl9/9l",
      journal: "Science Matters",
      volume: "",
      link: "https://sciencematters.io/articles/201604000006"
    },
    {
      authors: "Liu Y, Wang Y, Du Z, Yan X, Zheng P.",
      year: 2016,
      title: "Fbxo30 Regulates Mammopoiesis by Targeting the Bipolar Mitotic Kinesin Eg5",
      journal: "Cell Rep",
      volume: "15(5): 1111-1122",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27117404"
    },
    {
      authors: "Hibberd TJ, Kestell GR, Kyloh MA, Brookes SJ, Wattchow DA, Spencer NJ.",
      year: 2016,
      title: "Identification of different functional types of spinal afferent neurons innervating the mouse large intestine using a novel CGRPalpha transgenic reporter mouse.",
      journal: "Am J Physiol Gastrointest Liver Physiol 310: G561-573",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26822917"
    },
    {
      authors: "Fourgeaud L, Traves PG, Tufail Y, Leal-Bailey H, Lew ED, Burrola PG, Callaway P, Zagorska A, Rothlin CV, Nimmerjahn A, Lemke G.",
      year: 2016,
      title: "TAM receptors regulate multiple features of microglial physiology.",
      journal: "Nature",
      volume: "532: 240-244",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27049947"
    },
    {
      authors: "Kabir I, Li Z, Bui HH, Kuo MS, Gao G, Jiang XC.",
      year: 2016,
      title: "Small Intestine but Not Liver Lysophosphatidylcholine Acyltransferase 3 (Lpcat3) Deficiency Has a Dominant Effect on Plasma Lipid Metabolism",
      journal: "J Biol Chem",
      volume: "291(14): 7651-60",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26828064"
    },
    {
      authors: "Huang LH, Melton EM, Li H, Sohn P, Rogers MA, Mulligan-Kehoe MJ, Fiering SN, Hickey WF, Chang CC, Chang TY.",
      year: 2016,
      title: "Myeloid Acyl-CoA:Cholesterol Acyltransferase 1 Deficiency Reduces Lesion Macrophage Content and Suppresses Atherosclerosis Progression",
      journal: "J Biol Chem",
      volume: "291(12): 6232-44",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26801614"
    },
    {
      authors: "Hamblet CE, Makowski SL, Tritapoe JM, Pomerantz JL.",
      year: 2016,
      title: "NK Cell Maturation and Cytotoxicity Are Controlled by the Intramembrane Aspartyl Protease SPPL3",
      journal: "J Immunol",
      volume: "196(6): 2614-26",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26851218"
    },
    {
      authors: "Antony AN, Paillard M, Moffat C, Juskeviciute E, Correnti J, Bolon B, Rubin E, Csordas G, Seifert EL, Hoek JB, Hajnóczky G.",
      year: 2016,
      title: "MICU1 regulation of mitochondrial Ca(2+) uptake dictates survival and tissue regeneration.",
      journal: "Nat Commun",
      volume: "7: 10955",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26956930"
    },
    {
      authors: "Hathaway CK, Chang AS, Grant R, Kim HS, Madden VJ, Bagnell CR, Jr., Jennette JC, Smithies O, Kakoki M.",
      year: 2016,
      title: "High Elmo1 expression aggravates and low Elmo1 expression prevents diabetic nephropathy.",
      journal: "Proc Natl Acad Sci U S A",
      volume: "113: 2218-2222",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26858454"
    },
    {
      authors: "Subramanian VS, Lambrecht N, Lytle C, Said HM.",
      year: 2016,
      title: "Conditional (intestinal-specific) knockout of the riboflavin transporter-3 (RFVT-3) impairs riboflavin absorption.",
      journal: "Am J Physiol Gastrointest Liver Physiol 310: G285-293",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26660539"
    },
    {
      authors: "Barnett RE, Conklin DJ, Ryan L, Keskey RC, Ramjee V, Sepulveda EA, Srivastava S, Bhatnagar A, Cheadle WG.",
      year: 2016,
      title: "Anti-inflammatory effects of miR-21 in the macrophage response to peritonitis",
      journal: "J Leukoc Biol",
      volume: "99(2): 361-71",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26382295"
    },
    {
      authors: "Thornton TM, Delgado P, Chen L, Salas B, Krementsov D, Fernandez M, Vernia S, Davis RJ, Heimann R, Teuscher C, Krangel MS, Ramiro AR, Rincon M.",
      year: 2016,
      title: "Inactivation of nuclear GSK3β by Ser(389) phosphorylation promotes lymphocyte fitness during DNA double-strand break response",
      journal: "Nat Commun",
      volume: "7: 10553",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26822034"
    },
    {
      authors: "Alavi MV, Mao M, Pawlikowski BT, Kvezereli M, Duncan JL, Libby RT, John SW, Gould DB.",
      year: 2016,
      title: "Col4a1 mutations cause progressive retinal neovascular defects and retinopathy.",
      journal: "Sci Rep6: 18602",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26813606"
    },
    {
      authors: "Nanou E, Yan J, Whitehead NP, Kim MJ, Froehner SC, Scheuer T, Catterall WA.",
      year: 2016,
      title: "Altered short-term synaptic plasticity and reduced muscle strength in mice with impaired regulation of presynaptic CaV2.1 Ca2+ channels.",
      journal: "Proc Natl Acad Sci U S A",
      volume: "113: 1068-1073",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26755585"
    },
    {
      authors: "Nanou E, Sullivan JM, Scheuer T, Catterall WA.",
      year: 2016,
      title: "Calcium sensor regulation of the CaV2.1 Ca2+ channel contributes to short-term synaptic plasticity in hippocampal neurons.",
      journal: "Proc Natl Acad Sci U S A",
      volume: "113: 1062-1067",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26755594"
    },
    {
      authors: "Fujita Y, Makishima M, Bhawal UK.",
      year: 2016,
      title: "Differentiated embryo chondrocyte 1 (DEC1) is a novel negative regulator of hepatic fibroblast growth factor 21 (FGF21) in aging mice",
      journal: "Biochem Biophys Res Commun",
      volume: "269(3): 477-82",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26697751"
    },
    {
      authors: "Alavi MV, Mao M, PawKazerounian S, Ciarlini PD, Yuan D, Ghazvinian R, Alberich-Jorda M, Joshi M, Zhang H, Beggs AH, Gazda HT. 2016. [Development of Soft Tissue Sarcomas in Ribosomal Proteins L5 and S24 Heterozygous Mice](https://www.ncbi.nlm.nih.gov/pubmed/26722357). J Cancer 7(1): 32-6.likowski BT, Kvezereli M, Duncan JL, Libby RT, John SW, Gould DB.",
      year: 2016,
      title: "Col4a1 mutations cause progressive retinal neovascular defects and retinopathy.",
      journal: "Sci Rep6: 18602",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26813606"
    }
  ],
  "2015": [
    {
      authors: "Jiang R, Hua C, Wan Y, Jiang B, Hu H, Zheng J, Fuqua BK, Dunaief JL, Anderson GJ, David S, Vulpe CD, Chen H.",
      year: 2015,
      title: "Hephaestin and ceruloplasmin play distinct but interrelated roles in iron homeostasis in mouse brain",
      journal: "The Journal of Nutrition",
      volume: "145(5): 1003–1009",
      link: "https://academic.oup.com/jn/article/145/5/1003/4589975?login=false"
    },
    {
      authors: "Charrier LE, Loie E, Laprise P.",
      year: 2015,
      title: "Mouse Crumbs3 sustains epithelial tissue morphogenesis in vivo",
      journal: "Sci Rep",
      volume: "5: 17699",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26631503"
    },
    {
      authors: "Stuck MW, Conley SM, Naash MI.",
      year: 2015,
      title: "Retinal Degeneration Slow (RDS) Glycosylation Plays a Role in Cone Function and in the Regulation of RDS·ROM-1 Protein Complex Formation",
      journal: "J Biol Chem",
      volume: "290(46): 27901-13",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26420485"
    },
    {
      authors: "Zemen BG, Lai MH, Whitt JP, Khan Z, Zhao G, Meredith AL.",
      year: 2015,
      title: "Generation of Kcnma1fl-tdTomato, a conditional deletion of the BK channel alpha subunit in mouse.",
      journal: "Physiol Rep 3",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26537348"
    },
    {
      authors: "Ghosh S, Geahlen RL.",
      year: 2015,
      title: "Stress Granules Modulate SYK to Cause Microglial Cell Dysfunction in Alzheimer’s Disease.",
      journal: "EBioMedicine",
      volume: "2: 1785-1798",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26870803"
    },
    {
      authors: "Zulliger R, Conley SM, Mwoyosvi ML, Stuck MW, Azadi S, Naash MI.",
      year: 2015,
      title: "SNAREs Interact with Retinal Degeneration Slow and Rod Outer Segment Membrane Protein-1 during Conventional and Unconventional Outer Segment Targeting.",
      journal: "PLoS One 10: e0138508",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26406599"
    },
    {
      authors: "Savant S, La Porta S, Budnik A, Busch K, Hu J, Tisch N, Korn C, Valls AF, Benest AV, Terhardt D, Qu X, Adams RH, Baldwin HS, Ruiz de Almodovar C, Rodewald HR, Augustin HG.",
      year: 2015,
      title: "The Orphan Receptor Tie1 Controls Angiogenesis and Vascular Remodeling by Differentially Regulating Tie2 in Tip and Stalk Cells",
      journal: "Cell Rep",
      volume: "12(11): 1761-73",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26344773"
    },
    {
      authors: "Joly AL, Liu S, Dahlberg CI, Mailer RK, Westerberg LS, Andersson J.",
      year: 2015,
      title: "Foxp3 lacking exons 2 and 7 is unable to confer suppressive ability to regulatory T cells in vivo.",
      journal: "J Autoimmun",
      volume: "63: 23-30",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26149776"
    },
    {
      authors: "Igoucheva O, Alexeev V, Halabi CM, Adams SM, Stoilov I, Sasaki T, Arita M, Donahue A, Mecham RP, Birk DE, Chu ML.",
      year: 2015,
      title: "Fibulin-4 E57K Knock-in Mice Recapitulate Cutaneous, Vascular and Skeletal Defects of Recessive Cutis Laxa 1B with both Elastic Fiber and Collagen Fibril Abnormalities.",
      journal: "J Biol Chem",
      volume: "290: 21443-21459",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26178373"
    },
    {
      authors: "Huang L, Urtatiz O, Van Raamsdonk CD.",
      year: 2015,
      title: "Oncogenic G Protein GNAQ Induces Uveal Melanoma and Intravasation in Mice",
      journal: "Cancer Res",
      volume: "14: 3229",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26113083"
    },
    {
      authors: "Sciaccaluga M, Moriconi C, Martinello K, Catalano M, Bermudez I, Stitzel JA, Maskos U, Fucile S.",
      year: 2015,
      title: "Crucial role of nicotinic alpha5 subunit variants for Ca2+ fluxes in ventral midbrain neurons.",
      journal: "FASEB J",
      volume: "29: 3389-3398",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25911614"
    },
    {
      authors: "Wilson JE, Petrucelli AS, Chen L, Koblansky AA, Truax AD, Oyama Y, Rogers AB, Brickey WJ, Wang Y, Schneider M, Mühlbauer M, Chou WC, Barker BR, Jobin C, Allbritton NL, Ramsden DA, Davis BK, Ting JP.",
      year: 2015,
      title: "Inflammasome-independent role of AIM2 in suppressing colon tumorigenesis via DNA-PK and Akt.",
      journal: "Nat Med",
      volume: "21: 906-913",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26107252"
    },
    {
      authors: "Yoon KW, Byun S, Kwon E, Hwang SY, Chu K, Hiraki M, Jo SH, Weins A, Hakroush S, Cebulla A, Sykes DB, Greka A, Mundel P, Fisher DE, Mandinova A, Lee SW.",
      year: 2015,
      title: "Control of signaling-mediated clearance of apoptotic cells by the tumor suppressor p53.",
      journal: "Science",
      volume: "349: 1261669",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26228159"
    },
    {
      authors: "Tindi JO, Chavez AE, Cvejic S, Calvo-Ochoa E, Castillo PE, Jordan BA.",
      year: 2015,
      title: "ANKS1B Gene Product AIDA-1 Controls Hippocampal Synaptic Transmission by Regulating GluN2B Subunit Localization",
      journal: "J Neurosci",
      volume: "35(24): 8986-96",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26085624"
    },
    {
      authors: "Causton B, Ramadas RA, Cho JL, Jones K, Pardo-Saganta A, Rajagopal J, Xavier RJ, Medoff BD.",
      year: 2015,
      title: "CARMA3 Is Critical for the Initiation of Allergic Airway Inflammation.",
      journal: "J Immunol",
      volume: "195: 683-694",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26041536"
    },
    {
      authors: "Lin WJ, Jiang C, Sadahiro M, Bozdagi O, Vulchanova L, Alberini CM, Salton SR.",
      year: 2015,
      title: "VGF and Its C-Terminal Peptide TLQP-62 Regulate Memory Formation in Hippocampus via a BDNF-TrkB-Dependent Mechanism.",
      journal: "J Neurosci",
      volume: "35: 10343-10356",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26180209"
    },
    {
      authors: "Gong W, Gohla RM, Bowlin KM, Koyano-Nakagawa N, Garry DJ, Shi X.",
      year: 2015,
      title: "Kelch Repeat and BTB Domain Containing Protein 5 (Kbtbd5) Regulates Skeletal Muscle Myogenesis through the E2F1-DP1 Complex.",
      journal: "J Biol Chem",
      volume: "290: 15350-15361",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25940086"
    },
    {
      authors: "Zhang N, Tsybovsky Y, Kolesnikov AV, Rozanowska M, Swider M, Schwartz SB, Stone EM, Palczewska G, Maeda A, Kefalov VJ, Jacobson SG, Cideciyan AV, Palczewski K.",
      year: 2015,
      title: "Protein misfolding and the pathogenesis of ABCA4-associated retinal degenerations",
      journal: "Hum Mol Genet",
      volume: "24(11): 3220-37",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25712131"
    },
    {
      authors: "Seehus CR, Aliahmad P, de la Torre B, Iliev ID, Spurka L, Funari VA, Kaye J.",
      year: 2015,
      title: "The development of innate lymphoid cells requires TOX-dependent generation of a common innate lymphoid cell progenitor.",
      journal: "Nat Immunol",
      volume: "16: 599-608",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25915732"
    },
    {
      authors: "Bavik C, Henry SH, Zhang Y, Mitts K, McGinn T, Budzynski E, Pashko A, Lieu KL, Zhong S, Blumberg B, Kuksa V, Orme M, Scott I, Fawzi A, Kubota R.",
      year: 2015,
      title: "Visual Cycle Modulation as an Approach toward Preservation of Retinal Integrity.",
      journal: "PLoS One 10: e0124940",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25970164"
    },
    {
      authors: "Kim E, Ilagan JO, Liang Y, Daubner GM, Lee SC, Ramakrishnan A, Li Y, Chung YR, Micol JB, Murphy ME, Cho H, Kim MK, Zebari AS, Aumann S, Park CY, Buonamici S, Smith PG, Deeg HJ, Lobry C, Aifantis I, Modis Y, Allain FH, Halene S, Bradley RK, Abdel-Wahab O.",
      year: 2015,
      title: "SRSF2 Mutations Contribute to Myelodysplasia by Mutant-Specific Effects on Exon Recognition",
      journal: "Cancer Cell",
      volume: "27(5): 617-630",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25965569"
    },
    {
      authors: "Kotecki L, Hearing M, McCall NM, Marron Fernandez de Velasco E, Pravetoni M, Arora D, Victoria NC, Munoz MB, Xia Z, Slesinger PA, Weaver CD, Wickman K.",
      year: 2015,
      title: "GIRK Channels Modulate Opioid-Induced Motor Activity in a Cell Type- and Subunit-Dependent Manner",
      journal: "J Neurosci",
      volume: "35(18): 7131-42",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25948263"
    },
    {
      authors: "Jeanne M, Jorgensen J, Gould DB.",
      year: 2015,
      title: "Molecular and Genetic Analyses of Collagen Type IV Mutant Mouse Models of Spontaneous Intracerebral Hemorrhage Identify Mechanisms for Stroke Prevention.",
      journal: "Circulation",
      volume: "131: 1555-1565",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25753534"
    },
    {
      authors: "Kevany BM, Zhang N, Jastrzebska B, Palczewski K.",
      year: 2015,
      title: "Animals deficient in C2Orf71, an autosomal recessive retinitis pigmentosa-associated locus, develop severe early-onset retinal degeneration",
      journal: "Hum Mol Genet",
      volume: "24(9): 2627-40",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25616964"
    },
    {
      authors: "Schmidt AM, Lu W, Sindhava VJ, Huang Y, Burkhardt JK, Yang E, Riese MJ, Maltzman JS, Jordan MS, Kambayashi T.",
      year: 2015,
      title: "Regulatory T cells require TCR signaling for their suppressive function.",
      journal: "J Immunol",
      volume: "194: 4362-4370",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25821220"
    },
    {
      authors: "Augello MA, Berman-Booty LD, Carr R 3rd, Yoshida A, Dean JL, Schiewer MJ, Feng FY, Tomlins SA, Gao E, Koch WJ, Benovic JL, Diehl JA, Knudsen KE.",
      year: 2015,
      title: "Consequence of the tumor-associated conversion to cyclin D1b",
      journal: "EMBO Mol Med",
      volume: "7(5): 628-47",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25787974"
    },
    {
      authors: "Luna-Sanchez M, Diaz-Casado E, Barca E, Tejada MA, Montilla-Garcia A, Cobos EJ, Escames G, Acuna-Castroviejo D, Quinzii CM, Lopez LC.",
      year: 2015,
      title: "The clinical heterogeneity of coenzyme Q10 deficiency results from genotypic differences in the Coq9 gene.",
      journal: "EMBO Mol Med",
      volume: "7: 670-687",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25802402"
    },
    {
      authors: "Sadahiro M, Erickson C, Lin WJ, Shin AC, Razzoli M, Jiang C, Fargali S, Gurney A, Kelley KA, Buettner C, Bartolomucci A, Salton SR.",
      year: 2015,
      title: "Role of VGF-derived carboxy-terminal peptides in energy balance and reproduction: analysis of “humanized” knockin mice expressing full-length or truncated VGF.",
      journal: "Endocrinology",
      volume: "156: 1724-1738",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25675362"
    },
    {
      authors: "Maganti AV, Maier B, Tersey SA, Sampley ML, Mosley AL, Ozcan S, Pachaiyappan B, Woster PM, Hunter CS, Stein R, Mirmira RG.",
      year: 2015,
      title: "Transcriptional activity of the islet β cell factor Pdx1 is augmented by lysine methylation catalyzed by the methyltransferase Set7/9",
      journal: "J Biol Chem",
      volume: "290(15): 9812-22",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25713082"
    },
    {
      authors: "Wu C, Xu Y, Lu H, Howatt DA, Balakrishnan A, Moorleghen JJ, Vander Kooi CW, Cassis LA, Wang JA, Daugherty A.",
      year: 2015,
      title: "Cys18-Cys137 disulfide bond in mouse angiotensinogen does not affect AngII-dependent functions in vivo",
      journal: "Hypertension",
      volume: "65(4): 800-5",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25691624"
    },
    {
      authors: "Bolte C, Ren X, Tomley T, Ustiyan V, Pradhan A, Hoggatt A, Kalin TV, Herring BP, Kalinichenko VV.",
      year: 2015,
      title: "Forkhead box F2 regulation of platelet-derived growth factor and myocardin/serum response factor signaling is essential for intestinal development.",
      journal: "J Biol Chem",
      volume: "290: 7563-7575",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25631042"
    },
    {
      authors: "Pircher H, von Grafenstein S, Diener T, Metzger C, Albertini E, Taferner A, Unterluggauer H, Kramer C, Liedl KR, Jansen-Durr P.",
      year: 2015,
      title: "Identification of FAH domain-containing protein 1 (FAHD1) as oxaloacetate decarboxylase.",
      journal: "J Biol Chem",
      volume: "290: 6755-6762",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25575590"
    },
    {
      authors: "Dincheva I, Drysdale AT, Hartley CA, Johnson DC, Jing D, King EC, Ra S, Gray JM, Yang R, DeGruccio AM, Huang C, Cravatt BF, Glatt CE, Hill MN, Casey BJ, Lee FS.",
      year: 2015,
      title: "FAAH genetic variation enhances fronto-amygdala function in mouse and human.",
      journal: "Nat Commun",
      volume: "6: 6395",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25731744"
    },
    {
      authors: "Lindley LE, Curtis KM, Sanchez-Mejias A, Rieger ME, Robbins DJ, Briegel KJ.",
      year: 2015,
      title: "The WNT-controlled transcriptional regulator LBH is required for mammary stem cell expansion and maintenance of the basal lineage",
      journal: "Development",
      volume: "142(5): 893-904",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25655704"
    },
    {
      authors: "Thakur C, Wolfarth M, Sun J, Zhang Y, Lu Y, Battelli L, Porter DW, Chen F.",
      year: 2015,
      title: "Oncoprotein mdig contributes to silica-induced pulmonary fibrosis by altering balance between Th17 and Treg T cells.",
      journal: "Oncotarget6: 3722-3736",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25669985"
    },
    {
      authors: "Sag D, Cekic C, Wu R, Linden J, Hedrick CC.",
      year: 2015,
      title: "The cholesterol transporter ABCG1 links cholesterol homeostasis and tumour immunity.",
      journal: "Nat Commun",
      volume: "6: 6354",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25724068"
    },
    {
      authors: "Emmanuele V, Kubota A, Garcia-Diaz B, Garone C, Akman HO, Sanchez-Gutierrez D, Escudero LM, Kariya S, Homma S, Tanji K, Quinzii CM, Hirano M.",
      year: 2015,
      title: "Fhl1 W122S causes loss of protein function and late-onset mild myopathy.",
      journal: "Hum Mol Genet",
      volume: "24: 714-726",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25274776"
    },
    {
      authors: "Nalbandian A, Ghimbovschi S, Wang Z, Knoblach S, Llewellyn KJ, Vesa J, Hoffman EP, Kimonis VE.",
      year: 2015,
      title: "Global gene expression profiling in R155H knock-in murine model of VCP disease.",
      journal: "Clin Transl Sci",
      volume: "8: 8-16",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25388089"
    },
    {
      authors: "Shimizu H, Astapova I, Ye F, Bilban M, Cohen RN, Hollenberg AN.",
      year: 2015,
      title: "NCoR1 and SMRT play unique roles in thyroid hormone action in vivo",
      journal: "Mol Cell Biol",
      volume: "35(3): 555-65",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25421714"
    },
    {
      authors: "Talabot-Ayer D, Martin P, Vesin C, Seemayer CA, Vigne S, Gabay C, Palmer G.",
      year: 2015,
      title: "Severe neutrophil-dominated inflammation and enhanced myelopoiesis in IL-33-overexpressing CMV/IL33 mice.",
      journal: "J Immunol194: 750-760",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25505285"
    },
    {
      authors: "Kuper C, Beck FX, Neuhofer W.",
      year: 2015,
      title: "Generation of a conditional knockout allele for the NFAT5 gene in mice",
      journal: "Front Physiol",
      volume: "5: 507",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25601839"
    },
    {
      authors: "Dabovic B, Robertson IB, Zilberberg L, Vassallo M, Davis EC, Rifkin DB.",
      year: 2015,
      title: "Function of latent TGFbeta binding protein 4 and fibulin 5 in elastogenesis and lung development.",
      journal: "J Cell Physiol230: 226-236",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24962333"
    },
    {
      authors: "Hillmer RE, Boisvert JP, Cucciare MJ, Dwinell MB, Joksimovic M.",
      year: 2015,
      title: "Generation and characterization of mice harboring a conditional CXCL12 allele.",
      journal: "Int J Dev Biol59: 205-209",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26505253"
    }
  ],
  "2014": [
    {
      authors: "Fuqua BK, Lu Y, Darshan D, Frazer DM, Wilkins SJ, Wolkow N, Bell AG, Hsu J, Yu CC, Chen H, Dunaief JL, Anderson GJ, Vulpe CD.",
      year: 2014,
      title: "The multicopper ferroxidase hephaestin enhances intestinal iron absorption in mice",
      journal: "PLOS One, 9(6)",
      volume: "",
      link: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0098792"
    },
    {
      authors: "Nishide K, Hirano T.",
      year: 2014,
      title: "Overlapping and non-overlapping functions of condensins I and II in neural stem cell divisions",
      journal: "PLoS Genet",
      volume: "10(12): e1004847",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25474630"
    },
    {
      authors: "Jaworski M, Marsland BJ, Gehrig J, Held W, Favre S, Luther SA, Perroud M, Golshayan D, Gaide O, Thome M.",
      year: 2014,
      title: "Malt1 protease inactivation efficiently dampens immune responses but causes spontaneous autoimmunity.",
      journal: "EMBO J",
      volume: "33: 2765-2781",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25319413"
    },
    {
      authors: "Stuck MW, Conley SM, Naash MI.",
      year: 2014,
      title: "The Y141C knockin mutation in RDS leads to complex phenotypes in the mouse.",
      journal: "Hum Mol Genet",
      volume: "23: 6260-6274",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25001182"
    },
    {
      authors: "Segedy AK, Pyle AL, Li B, Zhang Y, Babaev VR, Jat P, Fazio S, Atkinson JB, Linton MF, Young PP.",
      year: 2014,
      title: "Identification of small proline-rich repeat protein 3 as a novel atheroprotective factor that promotes adaptive Akt signaling in vascular smooth muscle cells",
      journal: "Arterioscler Thromb Vasc Biol",
      volume: "34(12): 2527-36",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25278290"
    },
    {
      authors: "Giguere PM, Gall BJ, Ezekwe EA Jr, Laroche G, Buckley BK, Kebaier C, Wilson JE, Ting JP, Siderovski DP, Duncan JA.",
      year: 2014,
      title: "G Protein signaling modulator-3 inhibits the inflammasome activity of NLRP3",
      journal: "J Biol Chem",
      volume: "289(48): 33245-57",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25271165"
    },
    {
      authors: "Fu Y, Westenbroek RE, Scheuer T, Catterall WA.",
      year: 2014,
      title: "Basal and β-adrenergic regulation of the cardiac calcium channel CaV1.2 requires phosphorylation of serine 1700",
      journal: "Proc Natl Acad Sci U S A",
      volume: "111(46): 16598-603",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25368181"
    },
    {
      authors: "Mei Y, Thompson MD, Shiraishi Y, Cohen RA, Tong X.",
      year: 2014,
      title: "Sarcoplasmic/endoplasmic reticulum Ca2+ ATPase C674 promotes ischemia- and hypoxia-induced angiogenesis via coordinated endothelial cell and macrophage function.",
      journal: "J Mol Cell Cardiol",
      volume: "76: 275-282",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25260714"
    },
    {
      authors: "Amengual J, Zhang N, Kemerer M, Maeda T, Palczewski K, Von Lintig J.",
      year: 2014,
      title: "STRA6 is critical for cellular vitamin A uptake and homeostasis.",
      journal: "Hum Mol Genet",
      volume: "23: 5402-5417",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24852372"
    },
    {
      authors: "Schatz O, Langer E, Ben-Arie N.",
      year: 2014,
      title: "Gene dosage of the transcription factor Fingerin (bHLHA9) affects digit development and links syndactyly to ectrodactyly.",
      journal: "Hum Mol Genet",
      volume: "23: 5394-5401",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24852374"
    },
    {
      authors: "Min SH, Suzuki A, Stalker TJ, Zhao L, Wang Y, McKennan C, Riese MJ, Guzman JF, Zhang S, Lian L, Joshi R, Meng R, Seeholzer SH, Choi JK, Koretzky G, Marks MS, Abrams CS.",
      year: 2014,
      title: "Loss of PIKfyve in platelets causes a lysosomal disease leading to inflammation and thrombosis in mice.",
      journal: "Nat Commun",
      volume: "5: 4691",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25178411"
    },
    {
      authors: "Cantu C, Zimmerli D, Hausmann G, Valenta T, Moor A, Aguet M, Basler K.",
      year: 2014,
      title: "Pax6-dependent, but beta-catenin-independent, function of Bcl9 proteins in mouse lens development.",
      journal: "Genes Dev",
      volume: "28: 1879-1884",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25184676"
    },
    {
      authors: "Bluteau G, Zhuang L, Amann R, Trueb B.",
      year: 2014,
      title: "Targeted disruption of the intracellular domain of receptor FgfrL1 in mice.",
      journal: "PLoS One 9: e105210",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25126760"
    },
    {
      authors: "Thompson MD, Mei Y, Weisbrod RM, Silver M, Shukla PC, Bolotina VM, Cohen RA, Tong X.",
      year: 2014,
      title: "Glutathione adducts on sarcoplasmic/endoplasmic reticulum Ca2+ ATPase Cys-674 regulate endothelial cell calcium stores and angiogenic function as well as promote ischemic blood flow recovery.",
      journal: "J Biol Chem",
      volume: "289: 19907-19916",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24920669"
    },
    {
      authors: "Vaidya A, Mao Z, Tian X, Spencer B, Seluanov A, Gorbunova V.",
      year: 2014,
      title: "Knock-in reporter mice demonstrate that DNA repair by non-homologous end joining declines with age",
      journal: "PLoS Genet",
      volume: "10(7): e1l04511",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25033455"
    },
    {
      authors: "Dubail J, Aramaki-Hattori N, Bader HL, Nelson CM, Katebi N, Matuska B, Olsen BR, Apte SS.",
      year: 2014,
      title: "A new Adamts9 conditional mouse allele identifies its non-redundant role in interdigital web regression.",
      journal: "Genesis",
      volume: "52: 702-712",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24753090"
    },
    {
      authors: "Gigi V, Lewis S, Shestova O, Mijuskovic M, Deriano L, Meng W, Luning Prak ET, Roth DB.",
      year: 2014,
      title: "RAG2 mutants alter DSB repair pathway choice in vivo and illuminate the nature of ‘alternative NHEJ’",
      journal: "Nucleic Acids Res",
      volume: "42(10): 6352-64",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24753404"
    },
    {
      authors: "Oliver KH, Jessen T, Crawford EL, Chung CY, Sutcliffe JS, Carneiro AM.",
      year: 2014,
      title: "Pro32Pro33 mutations in the integrin beta3 PSI domain result in alphaIIbbeta3 priming and enhanced adhesion: reversal of the hypercoagulability phenotype by the Src inhibitor SKI-606.",
      journal: "Mol Pharmacol",
      volume: "85: 921-931",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24695082"
    },
    {
      authors: "Vannoy CH, Xu L, Keramaris E, Lu P, Xiao X, Lu QL.",
      year: 2014,
      title: "Adeno-associated virus-mediated overexpression of LARGE rescues alpha-dystroglycan function in dystrophic mice with mutations in the fukutin-related protein.",
      journal: "Hum Gene Ther Methods",
      volume: "25: 187-196",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24635668"
    },
    {
      authors: "Tai TS, Pai SY, Ho IC.",
      year: 2014,
      title: "Itm2a, a target gene of GATA-3, plays a minimal role in regulating the development and function of T cells.",
      journal: "PLoS One 9: e96535",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24831988"
    },
    {
      authors: "Palczewski K, Maeda A, Golczak M.",
      year: 2014,
      title: "Compounds and methods of treating ocular disorders",
      journal: "US Patent 8722669B2",
      volume: "",
      link: "https://patents.google.com/patent/US8722669B2/en"
    },
    {
      authors: "Tabata M, Rodgers JT, Hall JA, Lee Y, Jedrychowski MP, Gygi SP, Puigserver P.",
      year: 2014,
      title: "Cdc2-like kinase 2 suppresses hepatic fatty acid oxidation and ketogenesis through disruption of the PGC-1alpha and MED1 complex.",
      journal: "Diabetes",
      volume: "63: 1519-1532",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24458359"
    },
    {
      authors: "Ying G, Avasthi P, Irwin M, Gerstner CD, Frederick JM, Lucero MT, Baehr W.",
      year: 2014,
      title: "Centrin 2 is required for mouse olfactory ciliary trafficking and development of ependymal cilia planar polarity",
      journal: "J Neurosci",
      volume: "34(18): 6377-88",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24790208"
    },
    {
      authors: "Song WJ, Mondal P, Wolfe A, Alonso LC, Stamateris R, Ong BW, Lim OC, Yang KS, Radovick S, Novaira HJ, Farber EA, Farber CR, Turner SD, Hussain MA.",
      year: 2014,
      title: "Glucagon regulates hepatic kisspeptin to impair insulin secretion.",
      journal: "Cell Metab",
      volume: "19: 667-681",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24703698"
    },
    {
      authors: "Zhu Z, Todorova K, Lee KK, Wang J, Kwon E, Kehayov I, Kim HG, Kolev V, Dotto GP, Lee SW, Mandinova A.",
      year: 2014,
      title: "Small GTPase RhoE/Rnd3 is a critical regulator of Notch1 signaling.",
      journal: "Cancer Res",
      volume: "74: 2082-2093",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24525741"
    },
    {
      authors: "Hiebler S, Masuda T, Hacia JG, Moser AB, Faust PL, Liu A, Chowdhury N, Huang N, Lauer A, Bennett J, Watkins PA, Zack DJ, Braverman NE, Raymond GV, Steinberg SJ.",
      year: 2014,
      title: "The Pex1-G844D mouse: a model for mild human Zellweger spectrum disorder.",
      journal: "Mol Genet Metab",
      volume: "111: 522-532",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24503136"
    },
    {
      authors: "Nakamura Y, Bryan J.",
      year: 2014,
      title: "Targeting SUR1/Abcc8-type neuroendocrine KATP channels in pancreatic islet cells.",
      journal: "PLoS One 9: e91525",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24621811"
    },
    {
      authors: "Coleman JA, Zhu X, Djajadi HR, Molday LL, Smith RS, Libby RT, John SW, Molday RS.",
      year: 2014,
      title: "Phospholipid flippase ATP8A2 is required for normal visual and auditory function and photoreceptor and spiral ganglion cell survival.",
      journal: "J Cell Sci",
      volume: "127: 1138-1149",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24413176"
    },
    {
      authors: "Kohara K, Pignatelli M, Rivest AJ, Jung HY, Kitamura T, Suh J, Frank D, Kajikawa K, Mise N, Obata Y, Wickersham IR, Tonegawa S.",
      year: 2014,
      title: "Cell type-specific genetic and optogenetic tools reveal hippocampal CA2 circuits.",
      journal: "Nat Neurosci",
      volume: "17: 269-279",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24336151"
    },
    {
      authors: "Mansour AA, Khazanov-Zisman S, Netser Y, Klar A, Ben-Arie N.",
      year: 2014,
      title: "Nato3 plays an integral role in dorsoventral patterning of the spinal cord by segregating floor plate/p3 fates via Nkx2.2 suppression and Foxa2 maintenance.",
      journal: "Development",
      volume: "141: 574-584",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24401371"
    },
    {
      authors: "Yun B, Lee H, Ghosh M, Cravatt BF, Hsu KL, Bonventre JV, Ewing H, Gelb MH, Leslie CC.",
      year: 2014,
      title: "Serine hydrolase inhibitors block necrotic cell death by preventing calcium overload of the mitochondria and permeability transition pore formation.",
      journal: "J Biol Chem",
      volume: "289: 1491-1504",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24297180"
    },
    {
      authors: "Gaidamakov S, Maximova OA, Chon H, Blewett NH, Wang H, Crawford AK, Day A, Tulchin N, Crouch RJ, Morse HC, 3rd, Blitzer RD, Maraia RJ.",
      year: 2014,
      title: "Targeted deletion of the gene encoding the La autoantigen (Sjogren’s syndrome antigen B) in B cells or the frontal brain causes extensive tissue loss.",
      journal: "Mol Cell Biol",
      volume: "34: 123-131",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24190965"
    }
  ],
  "2013": [
    {
      authors: "Feuermann Y, Kang K, Gavrilova O, Haetscher N, Jang SJ, Yoo KH, Jiang C, Gonzalez FJ, Robinson GW, Hennighausen L.",
      year: 2013,
      title: "MiR-193b and miR-365-1 are not required for the development and function of brown fat in the mouse",
      journal: "RNA Biol",
      volume: "10(12): 1807-14",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24356587"
    },
    {
      authors: "Wang Y, Hekimi S.",
      year: 2013,
      title: "Mitochondrial respiration without ubiquinone biosynthesis.",
      journal: "Hum Mol Genet",
      volume: "22: 4768-4783",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23847050"
    },
    {
      authors: "Chen M, Zhang W, Lu X, Hoggatt AM, Gunst SJ, Kassab GS, Tune JD, Herring BP.",
      year: 2013,
      title: "Regulation of 130-kDa smooth muscle myosin light chain kinase expression by an intronic CArG element.",
      journal: "J Biol Chem",
      volume: "288: 34647-34657",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24151072"
    },
    {
      authors: "Fu Y, Westenbroek RE, Scheuer T, Catterall WA.",
      year: 2013,
      title: "Phosphorylation sites required for regulation of cardiac calcium channels in the fight-or-flight response.",
      journal: "Proc Natl Acad Sci U S A",
      volume: "110: 19621-19626",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24218620"
    },
    {
      authors: "Yang J, Wheeler SE, Velikoff M, Kleaveland KR, LaFemina MJ, Frank JA, Chapman HA, Christensen PJ, Kim KK.",
      year: 2013,
      title: "Activated alveolar epithelial cells initiate fibrosis through secretion of mesenchymal proteins.",
      journal: "Am J Pathol",
      volume: "183: 1559-1570",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24012677"
    },
    {
      authors: "Huang ZM, Gao E, Fonseca FV, Hayashi H, Shang X, Hoffman NE, Chuprun JK, Tian X, Tilley DG, Madesh M, Lefer DJ, Stamler JS, Koch WJ.",
      year: 2013,
      title: "Convergence of G protein-coupled receptor and S-nitrosylation signaling determines the outcome to cardiac ischemic injury.",
      journal: "Sci Signal 6: ra95",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24170934"
    },
    {
      authors: "Li L, Liu B, Wapinski OL, Tsai MC, Qu K, Zhang J, Carlson JC, Lin M, Fang F, Gupta RA, Helms JA, Chang HY.",
      year: 2013,
      title: "Targeted disruption of Hotair leads to homeotic transformation and gene derepression",
      journal: "Cell Rep",
      volume: "5(1): 3-12",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24075995"
    },
    {
      authors: "Mei Y, ThompsoZheng H, Gupta V, Patterson-Fortin J, Bhattacharya S, Katlinski K, Wu J, Varghese B, Carbone CJ, Aressy B, Fuchs SY, Greenberg RA. 2013. [A BRISC-SHMT complex deubiquitinates IFNAR1 and regulates interferon responses](https://www.ncbi.nlm.nih.gov/pubmed/24075985). Cell Rep 5(1): 180-93.n MD, Shiraishi Y, Cohen RA, Tong X. 2014.",
      year: 2013,
      title: "Sarcoplasmic/endoplasmic reticulum Ca2+ ATPase C674 promotes ischemia- and hypoxia-induced angiogenesis via coordinated endothelial cell and macrophage function.",
      journal: "J Mol Cell Cardiol",
      volume: "76: 275-282",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25260714"
    },
    {
      authors: "Tsukamoto K, Mani DR, Shi J, Zhang S, Haagensen DE, Otsuka F, Guan J, Smith JD, Weng W, Liao R, Kolodgie FD, Virmani R, Krieger M.",
      year: 2013,
      title: "Identification of apolipoprotein D as a cardioprotective gene using a mouse model of lethal atherosclerotic coronary artery disease.",
      journal: "Proc Natl Acad Sci U S A",
      volume: "110: 17023-17028",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24082102"
    },
    {
      authors: "Johansson JU, Pradhan S, Lokteva LA, Woodling NS, Ko N, Brown HD, Wang Q, Loh C, Cekanaviciute E, Buckwalter M, Manning-Bog AB, Andreasson KI.",
      year: 2013,
      title: "Suppression of inflammation with conditional deletion of the prostaglandin E2 EP2 receptor in macrophages and brain microglia.",
      journal: "J Neurosci",
      volume: "33: 16016-16032",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24089506"
    },
    {
      authors: "Schlehe JS, Journel MS, Taylor KP, Amodeo KD, LaVoie MJ.",
      year: 2013,
      title: "The mitochondrial disease associated protein Ndufaf2 is dispensable for Complex-1 assembly but critical for the regulation of oxidative stress.",
      journal: "Neurobiol Dis",
      volume: "58: 57-67",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23702311"
    },
    {
      authors: "Xu L, Lu PJ, Wang CH, Keramaris E, Qiao C, Xiao B, Blake DJ, Xiao X, Lu QL.",
      year: 2013,
      title: "Adeno-associated virus 9 mediated FKRP gene therapy restores functional glycosylation of alpha-dystroglycan and improves muscle functions.",
      journal: "Mol Ther",
      volume: "21: 1832-1840",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23817215"
    },
    {
      authors: "Ota T, Doyle-Cooper C, Cooper AB, Doores KJ, Aoki-Ota M, Le K, Schief WR, Wyatt RT, Burton DR, Nemazee D.",
      year: 2013,
      title: "B cells from knock-in mice expressing broadly neutralizing HIV antibody b12 carry an innocuous B cell receptor responsive to HIV vaccine candidates.",
      journal: "J Immunol",
      volume: "191: 3179-3185",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23940273"
    },
    {
      authors: "Ramirez-Ortiz ZG, Pendergraft WF, 3rd, Prasad A, Byrne MH, Iram T, Blanchette CJ, Luster AD, Hacohen N, El Khoury J, Means TK.",
      year: 2013,
      title: "The scavenger receptor SCARF1 mediates the clearance of apoptotic cells and prevents autoimmunity.",
      journal: "Nat Immunol",
      volume: "14: 917-926",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23892722"
    },
    {
      authors: "Blaeser A, Keramaris E, Chan YM, Sparks S, Cowley D, Xiao X, Lu QL.",
      year: 2013,
      title: "Mouse models of fukutin-related protein mutations show a wide range of disease phenotypes.",
      journal: "Hum Genet",
      volume: "132: 923-934",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23591631"
    },
    {
      authors: "Donaldson ZR, Young LJ.",
      year: 2013,
      title: "The relative contribution of proximal 5′ flanking sequence and microsatellite variation on brain vasopressin 1a receptor (Avpr1a) gene expression and behavior",
      journal: "PLoS Genet",
      volume: "9(8): e1003729",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24009523"
    },
    {
      authors: "Jun JC, Kertesy S, Jones MB, Marinis JM, Cobb BA, Tigno-Aranjuez JT, Abbott DW.",
      year: 2013,
      title: "Innate immune-directed NF-kappaB signaling requires site-specific NEMO ubiquitination.",
      journal: "Cell Rep",
      volume: "4: 352-361",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23871670"
    },
    {
      authors: "Hanel W, Marchenko N, Xu S, Yu SX, Weng W, Moll U.",
      year: 2013,
      title: "Two hot spot mutant p53 mouse models display differential gain of function in tumorigenesis.",
      journal: "Cell Death Differ",
      volume: "20: 898-909",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23538418"
    },
    {
      authors: "Lindley LE, Briegel KJ.",
      year: 2013,
      title: "Generation of mice with a conditional Lbh null allele.",
      journal: "Genesis",
      volume: "51: 491-497",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23495064"
    },
    {
      authors: "Van’t Veer A, Bechtholt AJ, Onvani S, Potter D, Wang Y, Liu-Chen LY, Schutz G, Chartoff EH, Rudolph U, Cohen BM, Carlezon WA Jr.",
      year: 2013,
      title: "Ablation of kappa-opioid receptors from brain dopamine neurons has anxiolytic-like effects and enhances cocaine-induced plasticity.",
      journal: "Neuropsychopharmacology",
      volume: "38: 1585-1597",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23446450"
    },
    {
      authors: "Wiig H, Schroder A, Neuhofer W, Jantsch J, Kopp C, Karlsen TV, Boschmann M, Goss J, Bry M, Rakova N, Dahlmann A, Brenner S, Tenstad O, Nurmi H, Mervaala E, Wagner H, Beck FX, Müller DN, Kerjaschki D, Luft FC, Harrison DG, Alitalo K, Titze J.",
      year: 2013,
      title: "Immune cells control skin lymphatic electrolyte homeostasis and blood pressure.",
      journal: "J Clin Invest",
      volume: "123: 2803-2815",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23722907"
    },
    {
      authors: "Edwards JP, Fujii H, Zhou AX, Creemers J, Unutmaz D, Shevach EM.",
      year: 2013,
      title: "Regulation of the expression of GARP/latent TGF-beta1 complexes on mouse T cells and their role in regulatory T cell and Th17 differentiation.",
      journal: "J Immunol",
      volume: "190: 5506-5515",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23645881"
    },
    {
      authors: "Cantu C, Valenta T, Hausmann G, Vilain N, Aguet M, Basler K.",
      year: 2013,
      title: "The Pygo2-H3K4me2/3 interaction is dispensable for mouse development and Wnt signaling-dependent transcription.",
      journal: "Development",
      volume: "140: 2377-2386",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23637336"
    },
    {
      authors: "Caruso N, Herberth B, Bartoli M, Puppo F, Dumonceaux J, Zimmermann A, Denadai S, Lebosse M, Roche S, Geng L, Magdinier F, Attarian S, Bernard R, Maina F, Levy N, Helmbacher F.",
      year: 2013,
      title: "Deregulation of the protocadherin gene FAT1 alters muscle shapes: implications for the pathogenesis of facioscapulohumeral dystrophy.",
      journal: "PLoS Genet 9: e1003550",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23785297"
    },
    {
      authors: "Nandar W, Neely EB, Unger E, Connor JR.",
      year: 2013,
      title: "A mutation in the HFE gene is associated with altered brain iron profiles and increased oxidative stress in mice.",
      journal: "Biochim Biophys Acta",
      volume: "1832: 729-741",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23429074"
    },
    {
      authors: "Rahgozar K, Wright E, Carrithers LM, Carrithers MD.",
      year: 2013,
      title: "Mediation of protection and recovery from experimental autoimmune encephalomyelitis by macrophages expressing the human voltage-gated sodium channel NaV1.5",
      journal: "J Neuropathol Exp Neurol",
      volume: "72(6): 489-504",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23656992"
    },
    {
      authors: "Lee GS, He Y, Dougherty EJ, Jimenez-Movilla M, Avella M, Grullon S, Sharlin DS, Guo C, Blackford JA, Jr., Awasthi S, Zhang Z, Armstrong SP, London EC, Chen W, Dean J, Simons SS Jr.",
      year: 2013,
      title: "Disruption of Ttll5/stamp gene (tubulin tyrosine ligase-like protein 5/SRC-1 and TIF2-associated modulatory protein gene) in male mice causes sperm malformation and infertility.",
      journal: "J Biol Chem",
      volume: "288: 15167-15180",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23558686"
    },
    {
      authors: "Lee PC, Dodart JC, Aron L, Finley LW, Bronson RT, Haigis MC, Yankner BA, Harper JW.",
      year: 2013,
      title: "Altered social behavior and neuronal development in mice lacking the Uba6-Use1 ubiquitin transfer system.",
      journal: "Mol Cell",
      volume: "50: 172-184",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23499007"
    },
    {
      authors: "Poddar D, Basu A, Baldwin WM, 3rd, Kondratov RV, Barik S, Mazumder B.",
      year: 2013,
      title: "An extraribosomal function of ribosomal protein L13a in macrophages resolves inflammation.",
      journal: "J Immunol",
      volume: "190: 3600-3612",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23460747"
    },
    {
      authors: "Moghadaszadeh B, Rider BE, Lawlor MW, Childers MK, Grange RW, Gupta K, Boukedes SS, Owen CA, Beggs AH.",
      year: 2013,
      title: "Selenoprotein N deficiency in mice is associated with abnormal lung development.",
      journal: "FASEB J",
      volume: "27: 1585-1599",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23325319"
    },
    {
      authors: "Herring BE, Shi Y, Suh YH, Zheng CY, Blankenship SM, Roche KW, Nicoll RA.",
      year: 2013,
      title: "Cornichon proteins determine the subunit composition of synaptic AMPA receptors.",
      journal: "Neuron",
      volume: "77: 1083-1096",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23522044"
    },
    {
      authors: "Garcia-Corzo L, Luna-Sanchez M, Doerrier C, Garcia JA, Guaras A, Acin-Perez R, Bullejos-Peregrin J, Lopez A, Escames G, Enriquez JA, Acuña-Castroviejo D, López LC.",
      year: 2013,
      title: "Dysfunctional Coq9 protein causes predominant encephalomyopathy associated with CoQ deficiency.",
      journal: "Hum Mol Genet",
      volume: "22: 1233-1248",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23255162"
    },
    {
      authors: "Ferrer M, Cornwall G, Oko R.",
      year: 2013,
      title: "A population of CRES resides in the outer dense fibers of spermatozoa.",
      journal: "Biol Reprod88: 65",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23269664"
    },
    {
      authors: "Kim MH, de Beer MC, Wroblewski JM, Webb NR, de Beer FC.",
      year: 2013,
      title: "SAA does not induce cytokine production in physiological conditions.",
      journal: "Cytokine",
      volume: "61: 506-512",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23165195"
    },
    {
      authors: "Nalbandian A, Llewellyn KJ, Badadani M, Yin HZ, Nguyen C, Katheria V, Watts G, Mukherjee J, Vesa J, Caiozzo V, Mozaffar T, Weiss JH, Kimonis VE.",
      year: 2013,
      title: "A progressive translational mouse model of human valosin-containing protein disease: the VCP(R155H/+) mouse.",
      journal: "Muscle Nerve",
      volume: "47: 260-270",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23169451"
    },
    {
      authors: "Ghosal A, Lambrecht N, Subramanya SB, Kapadia R, Said HM.",
      year: 2013,
      title: "Conditional knockout of the Slc5a6 gene in mouse intestine impairs biotin absorption.",
      journal: "Am J Physiol Gastrointest Liver Physiol304: G64-71",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23104561"
    },
    {
      authors: "Zhang N, Kolesnikov AV, Jastrzebska B, Mustafi D, Sawada O, Maeda T, Genoud C, Engel A, Kefalov VJ, Palczewski K.",
      year: 2013,
      title: "Autosomal recessive retinitis pigmentosa E150K opsin mice exhibit photoreceptor disorganization.",
      journal: "J Clin Invest",
      volume: "123: 121-137",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23221340"
    },
    {
      authors: "de Beer MC, Wroblewski JM, Noffsinger VP, Ji A, Meyer JM, van der Westhuyzen DR, de Beer FC, Webb NR.",
      year: 2013,
      title: "The Impairment of Macrophage-to-Feces Reverse Cholesterol Transport during Inflammation Does Not Depend on Serum Amyloid A.",
      journal: "J Lipids",
      volume: "2013: 283486",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23431457"
    }
  ],
  "2012": [
    {
      authors: "Andersson DC, Betzenhauser MJ, Reiken S, Umanskaya A, Shiomi T, Marks AR.",
      year: 2012,
      title: "Stress-induced increase in skeletal muscle force requires protein kinase A phosphorylation of the ryanodine receptor.",
      journal: "J Physiol",
      volume: "590: 6381-6387",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23070698"
    },
    {
      authors: "Vanleeuwen JE, Penzes P.",
      year: 2012,
      title: "Long-term perturbation of spine plasticity results in distinct impairments of cognitive function.",
      journal: "J Neurochem",
      volume: "123: 781-789",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22862288"
    },
    {
      authors: "Guillemot L, Schneider Y, Brun P, Castagliuolo I, Pizzuti D, Martines D, Jond L, Bongiovanni M, Citi S.",
      year: 2012,
      title: "Cingulin is dispensable for epithelial barrier function and tight junction structure, and plays a role in the control of claudin-2 expression and response to duodenal mucosa injury.",
      journal: "J Cell Sci",
      volume: "125: 5005-5014",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22946046"
    },
    {
      authors: "Xiang F, Cui B, Gao Q, Zhang J, Zhang J, Li W.",
      year: 2012,
      title: "Decreased levels of Ca(2)(+)-calmodulin-dependent protein kinase IV in the testis as a contributing factor to reduced fertility in male Crybb2(-)/(-) mice.",
      journal: "Int J Mol Med",
      volume: "30: 1145-1151",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22948125"
    },
    {
      authors: "Lapointe J, Wang Y, Bigras E, Hekimi S.",
      year: 2012,
      title: "The submitochondrial distribution of ubiquinone affects respiration in long-lived Mclk1+/- mice.",
      journal: "J Cell Biol",
      volume: "199: 215-224",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23045551"
    },
    {
      authors: "Huang H, Kong D, Byun KH, Ye C, Koda S, Lee DH, Oh BC, Lee SW, Lee B, Zabolotny JM, Kim MS, Bjørbæk C, Lowell BB, Kim YB.",
      year: 2012,
      title: "Rho-kinase regulates energy balance by targeting hypothalamic leptin receptor signaling.",
      journal: "Nat Neurosci",
      volume: "15: 1391-1398",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22941110"
    },
    {
      authors: "Konsavage WM, Jr., Jin G, Yochum GS.",
      year: 2012,
      title: "The Myc 3′ Wnt-responsive element regulates homeostasis and regeneration in the mouse intestinal tract.",
      journal: "Mol Cell Biol",
      volume: "32: 3891-3902",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23640071"
    },
    {
      authors: "Wang C, Lee JE, Cho YW, Xiao Y, Jin Q, Liu C, Ge K.",
      year: 2012,
      title: "UTX regulates mesoderm differentiation of embryonic stem cells independent of H3K27 demethylase activity.",
      journal: "Proc Natl Acad Sci U S A",
      volume: "109: 15324-15329",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22949634"
    },
    {
      authors: "Zhang J, Neal J, Lian G, Shi B, Ferland RJ, Sheen V.",
      year: 2012,
      title: "Brefeldin A-inhibited guanine exchange factor 2 regulates filamin A phosphorylation and neuronal migration.",
      journal: "J Neurosci",
      volume: "32: 12619-12629",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22956851"
    },
    {
      authors: "Zou C, Levine EM.",
      year: 2012,
      title: "Vsx2 controls eye organogenesis and retinal progenitor identity via homeodomain and non-homeodomain residues required for high affinity DNA binding.",
      journal: "PLoS Genet 8: e1002924",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23028343"
    },
    {
      authors: "Suthar MS, Ramos HJ, Brassil MM, Netland J, Chappell CP, Blahnik G, McMillan A, Diamond MS, Clark EA, Bevan MJ, Gale M Jr.",
      year: 2012,
      title: "The RIG-I-like receptor LGP2 controls CD8(+) T cell survival and fitness",
      journal: "Immunity",
      volume: "37(2): 235-48",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22841161"
    },
    {
      authors: "Yin HZ, Nalbandian A, Hsu CI, Li S, Llewellyn KJ, Mozaffar T, Kimonis VE, Weiss JH.",
      year: 2012,
      title: "Slow development of ALS-like spinal cord pathology in mutant valosin-containing protein gene knock-in mice.",
      journal: "Cell Death Dis 3: e374",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22898872"
    },
    {
      authors: "Cook JR, Smaldone S, Cozzolino C, del Solar M, Lee-Arteaga S, Nistala H, Ramirez F.",
      year: 2012,
      title: "Generation of Fbn1 conditional null mice implicates the extracellular microfibrils in osteoprogenitor recruitment.",
      journal: "Genesis",
      volume: "50: 635-641",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22374917"
    },
    {
      authors: "Robbins GR, Truax AD, Davis BK, Zhang L, Brickey WJ, Ting JP.",
      year: 2012,
      title: "Regulation of class I major histocompatibility complex (MHC) by nucleotide-binding domain, leucine-rich repeat-containing (NLR) proteins.",
      journal: "J Biol Chem",
      volume: "287: 24294-24303",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22645137"
    },
    {
      authors: "Geng R, Melki S, Chen DH, Tian G, Furness DN, Oshima-Takago T, Neef J, Moser T, Askew C, Horwitz G, Holt JR, Imanishi Y, Alagramam KN.",
      year: 2012,
      title: "The mechanosensory structure of the hair cell requires clarin-1, a protein encoded by Usher syndrome III causative gene.",
      journal: "J Neurosci",
      volume: "32: 9485-9498",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22787034"
    },
    {
      authors: "Gonzalez S, Rangel-Barajas C, Peper M, Lorenzo R, Moreno E, Ciruela F, Borycz J, Ortiz J, Lluis C, Franco R, McCormick PJ, Volkow ND, Rubinstein M, Floran B, Ferré S.",
      year: 2012,
      title: "Dopamine D4 receptor, but not the ADHD-associated D4.7 variant, forms functional heteromers with the dopamine D2S receptor in the brain.",
      journal: "Mol Psychiatry",
      volume: "17: 650-662",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21844870"
    },
    {
      authors: "Zhang Y, Rubin GR, Fineberg N, Huisingh C, McGwin G, Pittler SJ, Kraft TW.",
      year: 2012,
      title: "Age-related changes in Cngb1-X1 knockout mice: prolonged cone survival.",
      journal: "Doc Ophthalmol",
      volume: "124: 163-175",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22367173"
    },
    {
      authors: "Zinzow-Kramer WM, Long AB, Youngblood BA, Rosenthal KM, Butler R, Mohammed AU, Skountzou I, Ahmed R, Evavold BD, Boss JM.",
      year: 2012,
      title: "CIITA promoter I CARD-deficient mice express functional MHC class II genes in myeloid and lymphoid compartments.",
      journal: "Genes Immun",
      volume: "13: 299-310",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22218223"
    },
    {
      authors: "Zhang X, Thatcher SE, Rateri DL, Bruemmer D, Charnigo R, Daugherty A, Cassis LA.",
      year: 2012,
      title: "Transient exposure of neonatal female mice to testosterone abrogates the sexual dimorphism of abdominal aortic aneurysms.",
      journal: "Circ Res 110: e73-85",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22539767"
    },
    {
      authors: "Agrawal PB, Joshi M, Savic T, Chen Z, Beggs AH.",
      year: 2012,
      title: "Normal myofibrillar development followed by progressive sarcomeric disruption with actin accumulations in a mouse Cfl2 knockout demonstrates requirement of cofilin-2 for muscle maintenance.",
      journal: "Hum Mol Genet",
      volume: "21: 2341-2356",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22343409"
    },
    {
      authors: "Popmihajlov Z, Xu D, Morgan H, Milligan Z, Smith KA.",
      year: 2012,
      title: "Conditional IL-2 Gene Deletion: Consequences for T Cell Proliferation.",
      journal: "Front Immunol",
      volume: "3: 102",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22590468"
    },
    {
      authors: "Shim H, Wang CT, Chen YL, Chau VQ, Fu KG, Yang J, McQuiston AR, Fisher RA, Chen CK.",
      year: 2012,
      title: "Defective retinal depolarizing bipolar cells in regulators of G protein signaling (RGS) 7 and 11 double null mice.",
      journal: "J Biol Chem",
      volume: "287: 14873-14879",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22371490"
    },
    {
      authors: "Wolkow N, Song D, Song Y, Chu S, Hadziahmetovic M, Lee JC, Iacovelli J, Grieco S, Dunaief JL.",
      year: 2012,
      title: "Ferroxidase hephaestin’s cell-autonomous role in the retinal pigment epithelium.",
      journal: "Am J Pathol",
      volume: "180: 1614-1624",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22342521"
    },
    {
      authors: "Ukarapong S, Bao Y, Perera EM, Berkovitz GD.",
      year: 2012,
      title: "Megakaryocyte development is normal in mice with targeted disruption of Tescalcin.",
      journal: "Exp Cell Res",
      volume: "318: 662-669",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22285131"
    },
    {
      authors: "Yang G, Li H, Tang G, Wu L, Zhao K, Cao Q, Xu C, Wang R.",
      year: 2012,
      title: "Increased neointimal formation in cystathionine gamma-lyase deficient mice: role of hydrogen sulfide in alpha5beta1-integrin and matrix metalloproteinase-2 expression in smooth muscle cells.",
      journal: "J Mol Cell Cardiol",
      volume: "52: 677-688",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22200376"
    },
    {
      authors: "Hiebler S, Masuda T, Hacia JG, Moser AB, Faust PL, Liu A, Chowdhury N, Huang N, Lauer A, Bennett J, Watkins PA, Zack DJ, Braverman NE, Raymond GV, Steinberg SJ. 2014.",
      year: 2012,
      title: "The Pex1-G844D mouse: a model for mild human Zellweger spectrum disorder.",
      journal: "Mol Genet Metab",
      volume: "111: 522-532",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24503136"
    },
    {
      authors: "Pierson CR, Dulin-Smith AN, Durban AN, Marshall ML, Marshall JT, Snyder AD, Naiyer N, Gladman JT, Chandler DS, Lawlor MW, Buj-Bello A, Dowling JJ, Beggs AH.",
      year: 2012,
      title: "Modeling the human MTM1 p.R69C mutation in murine Mtm1 results in exon 4 skipping and a less severe myotubular myopathy phenotype.",
      journal: "Hum Mol Genet",
      volume: "21: 811-825",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22068590"
    },
    {
      authors: "Rajadhyaksha AM, Ra S, Kishinevsky S, Lee AS, Romanienko P, DuBoff M, Yang C, Zupan B, Byrne M, Daruwalla ZR, Mark W, Kosofsky BE, Toth M, Higgins JJ.",
      year: 2012,
      title: "Behavioral characterization of cereblon forebrain-specific conditional null mice: a model for human non-syndromic intellectual disability",
      journal: "Behav Brain Res",
      volume: "226(2): 428-34",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21995942"
    },
    {
      authors: "Yiannikouris F, Karounos M, Charnigo R, English VL, Rateri DL, Daugherty A, Cassis LA.",
      year: 2012,
      title: "Adipocyte-specific deficiency of angiotensinogen decreases plasma angiotensinogen concentration and systolic blood pressure in mice.",
      journal: "Am J Physiol Regul Integr Comp Physiol 302: R244-251",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22071160"
    },
    {
      authors: "Eliyahu E, Shtraizent N, Shalgi R, Schuchman EH.",
      year: 2012,
      title: "Construction of conditional acid ceramidase knockout mice and in vivo effects on oocyte development and fertility.",
      journal: "Cell Physiol Biochem",
      volume: "30: 735-748",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22854249"
    },
    {
      authors: "Makino CL, Wen XH, Olshevskaya EV, Peshenko IV, Savchenko AB, Dizhoor AM.",
      year: 2012,
      title: "Enzymatic relay mechanism stimulates cyclic GMP synthesis in rod photoresponse: biochemical and physiological study in guanylyl cyclase activating protein 1 knockout mice.",
      journal: "PLoS One 7: e47637",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23082185"
    },
    {
      authors: "Miller NL, Lawson C, Chen XL, Lim ST, Schlaepfer DD.",
      year: 2012,
      title: "Rgnef (p190RhoGEF) knockout inhibits RhoA activity, focal adhesion establishment, and cell motility downstream of integrins.",
      journal: "PLoS One",
      volume: "7(5): e37830",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22649559"
    },
    {
      authors: "Nalbandian A, Llewellyn KJ, Kitazawa M, Yin HZ, Badadani M, Khanlou N, Edwards R, Nguyen C, Mukherjee J, Mozaffar T, Watts G, Weiss J, Kimonis VE.",
      year: 2012,
      title: "The homozygote VCP(R(1)(5)(5)H/R(1)(5)(5)H) mouse model exhibits accelerated human VCP-associated disease pathology.",
      journal: "PLoS One 7: e46308",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23029473"
    },
    {
      authors: "Rateri DL, Moorleghen JJ, Knight V, Balakrishnan A, Howatt DA, Cassis LA, Daugherty A.",
      year: 2012,
      title: "Depletion of endothelial or smooth muscle cell-specific angiotensin II type 1a receptors does not influence aortic aneurysms or atherosclerosis in LDL receptor deficient mice.",
      journal: "PLoS One 7: e51483",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23236507"
    },
    {
      authors: "Soberman RJ, MacKay CR, Vaine CA, Ryan GB, Cerny AM, Thompson MR, Nikolic B, Primo V, Christmas P, Sheiffele P, Aronov L, Knipe DM, Kurt-Jones EA.",
      year: 2012,
      title: "CD200R1 supports HSV-1 viral replication and licenses pro-inflammatory signaling functions of TLR2.",
      journal: "PLoS One 7: e47740",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23082204"
    },
    {
      authors: "Wang Y, Zhu S, Weisman GA, Gitlin JD, Petris MJ.",
      year: 2012,
      title: "Conditional knockout of the Menkes disease copper transporter demonstrates its critical role in embryogenesis.",
      journal: "PLoS One 7: e43039",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22900086"
    }
  ],
  "2011": [
    {
      authors: "Peng Y, Clark C, Luong R, Tu WH, Lee J, Johnson DT, Das A, Carroll TJ, Sun Z.",
      year: 2011,
      title: "The leucine zipper putative tumor suppressor 2 protein LZTS2 regulates kidney development.",
      journal: "J Biol Chem286: 40331-40342",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21949185"
    },
    {
      authors: "Milosevic I, Giovedi S, Lou X, Raimondi A, Collesi C, Shen H, Paradise S, O’Toole E, Ferguson S, Cremona O, De Camilli P.",
      year: 2011,
      title: "Recruitment of endophilin to clathrin-coated pit necks is required for efficient vesicle uncoating after fission",
      journal: "Neuron",
      volume: "72(4): 587-601",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22099461"
    },
    {
      authors: "Nielsen JA, Chambers MA, Romm E, Lee LY, Berndt JA, Hudson LD.",
      year: 2011,
      title: "Mouse transmembrane BAX inhibitor motif 3 (Tmbim3) encodes a 38 kDa transmembrane protein expressed in the central nervous system.",
      journal: "Mol Cell Biochem",
      volume: "357: 73-81",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21614515"
    },
    {
      authors: "Notari M, Hu Y, Koch S, Lu M, Ratnayaka I, Zhong S, Baer C, Pagotto A, Goldin R, Salter V, Candi E, Melino G, Lu X.",
      year: 2011,
      title: "Inhibitor of apoptosis-stimulating protein of p53 (iASPP) prevents senescence and is required for epithelial stratification",
      journal: "Proc Natl Acad Sci U S A",
      volume: "108(40): 16645-50",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21930934"
    },
    {
      authors: "Tsuboi K, Okamoto Y, Ikematsu N, Inoue M, Shimizu Y, Uyama T, Wang J, Deutsch DG, Burns MP, Ulloa NM, Tokumura A, Ueda N.",
      year: 2011,
      title: "Enzymatic formation of N-acylethanolamines from N-acylethanolamine plasmalogen through N-acylphosphatidylethanolamine-hydrolyzing phospholipase D-dependent and -independent pathways.",
      journal: "Biochim Biophys Acta1811: 565-577",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21801852"
    },
    {
      authors: "Chew LJ, Shen W, Ming X, Senatorov VV, Jr., Chen HL, Cheng Y, Hong E, Knoblach S, Gallo V.",
      year: 2011,
      title: "SRY-box containing gene 17 regulates the Wnt/beta-catenin signaling pathway in oligodendrocyte progenitor cells.",
      journal: "J Neurosci31: 13921-13935",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21957254"
    },
    {
      authors: "Sabharwal P, Lee C, Park S, Rao M, Sockanathan S.",
      year: 2011,
      title: "GDE2 regulates subtype-specific motor neuron generation through inhibition of Notch signaling",
      journal: "Neuron",
      volume: "71(6): 1058-70",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21943603"
    },
    {
      authors: "Kennedy PC, Zhu R, Huang T, Tomsig JL, Mathews TP, David M, Peyruchaud O, Macdonald TL, Lynch KR.",
      year: 2011,
      title: "Characterization of a sphingosine 1-phosphate receptor antagonist prodrug.",
      journal: "J Pharmacol Exp Ther338: 879-889",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21632869"
    },
    {
      authors: "Wellner N, Tsuboi K, Madsen AN, Holst B, Diep TA, Nakao M, Tokumura A, Burns MP, Deutsch DG, Ueda N, Hansen HS.",
      year: 2011,
      title: "Studies on the anorectic effect of N-acylphosphatidylethanolamine and phosphatidylethanolamine in mice.",
      journal: "Biochim Biophys Acta",
      volume: "1811: 508-512",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21723414"
    },
    {
      authors: "Parent AD, Cornwall GA, Liu LY, Smith CE, Hermo L.",
      year: 2011,
      title: "Alterations in the testis and epididymis associated with loss of function of the cystatin-related epididymal spermatogenic (CRES) protein.",
      journal: "J Androl32: 444-463",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21051588"
    },
    {
      authors: "Shridas P, Bailey WM, Talbott KR, Oslund RC, Gelb MH, Webb NR.",
      year: 2011,
      title: "Group X secretory phospholipase A2 enhances TLR4 signaling in macrophages.",
      journal: "J Immunol187: 482-489",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21622863"
    },
    {
      authors: "Chapman HA, Li X, Alexander JP, Brumwell A, Lorizio W, Tan K, Sonnenberg A, Wei Y, Vu TH.",
      year: 2011,
      title: "Integrin alpha6beta4 identifies an adult distal lung epithelial population with regenerative potential in mice",
      journal: "J Clin Invest121: 2855-2862",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21701069"
    },
    {
      authors: "Huang S, Ling JJ, Yang S, Li XJ, Li S.",
      year: 2011,
      title: "Neuronal expression of TATA box-binding protein containing expanded polyglutamine in knock-in mice reduces chaperone protein response by impairing the function of nuclear factor-Y transcription factor.",
      journal: "Brain134: 1943-1958",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21705419"
    },
    {
      authors: "Zubenko GS, Hughes HB, 3rd.",
      year: 2011,
      title: "Replacement of homologous mouse DNA sequence with pathogenic 6-base human CREB1 promoter sequence creates murine model of major depressive disorder.",
      journal: "Am J Med Genet B Neuropsychiatr Genet156B: 517-531",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21598377"
    },
    {
      authors: "Allen IC, Moore CB, Schneider M, Lei Y, Davis BK, Scull MA, Gris D, Roney KE, Zimmermann AG, Bowzard JB, Ranjan P, Monroe KM, Pickles RJ, Sambhara S, Ting JP.",
      year: 2011,
      title: "NLRX1 protein attenuates inflammatory responses to infection by interfering with the RIG-I-MAVS and TRAF6-NF-kappaB signaling pathways.",
      journal: "Immunity34: 854-865",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21703540"
    },
    {
      authors: "Ma X, Kumar M, Choudhury SN, Becker Buscaglia LE, Barker JR, Kanakamedala K, Liu MF, Li Y.",
      year: 2011,
      title: "Loss of the miR-21 allele elevates the expression of its target genes and reduces tumorigenesis.",
      journal: "Proc Natl Acad Sci U S A108: 10144-10149",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21646541"
    },
    {
      authors: "Kolesnikov AV, Rikimaru L, Hennig AK, Lukasiewicz PD, Fliesler SJ, Govardovskii VI, Kefalov VJ, Kisselev OG.",
      year: 2011,
      title: "G-protein betagamma-complex is crucial for efficient signal amplification in vision.",
      journal: "J Neurosci31: 8067-8077",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21632928"
    },
    {
      authors: "Chavali VR, Khan NW, Cukras CA, Bartsch DU, Jablonski MM, Ayyagari R.",
      year: 2011,
      title: "A CTRP5 gene S163R mutation knock-in mouse model for late-onset retinal degeneration",
      journal: "Hum Mol Genet",
      volume: "20(10): 2000-14",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21349921"
    },
    {
      authors: "Bacchelli C, Buckland KF, Buckridge S, Salzer U, Schneider P, Thrasher AJ, Gaspar HB.",
      year: 2011,
      title: "The C76R transmembrane activator and calcium modulator cyclophilin ligand interactor mutation disrupts antibody production and B-cell homeostasis in heterozygous and homozygous mice.",
      journal: "J Allergy Clin Immunol127: 1253-1259 e1213",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21458042"
    },
    {
      authors: "Fu Y, Westenbroek RE, Yu FH, Clark JP, 3rd, Marshall MR, Scheuer T, Catterall WA.",
      year: 2011,
      title: "Deletion of the distal C terminus of CaV1.2 channels leads to loss of beta-adrenergic regulation and heart failure in vivo.",
      journal: "J Biol Chem",
      volume: "286: 12617-12626",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21216955"
    },
    {
      authors: "Templin AT, Maier B, Nishiki Y, Tersey SA, Mirmira RG.",
      year: 2011,
      title: "Deoxyhypusine synthase haploinsufficiency attenuates acute cytokine signaling.",
      journal: "Cell Cycle10: 1043-1049",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21389784"
    },
    {
      authors: "Rateri DL, Moorleghen JJ, Balakrishnan A, Owens AP, 3rd, Howatt DA, Subramanian V, Poduri A, Charnigo R, Cassis LA, Daugherty A.",
      year: 2011,
      title: "Endothelial cell-specific deficiency of Ang II type 1a receptors attenuates Ang II-induced ascending aortic aneurysms in LDL receptor-/- mice.",
      journal: "Circ Res108: 574-581",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21252156"
    },
    {
      authors: "Suzuki-Hirano A, Ogawa M, Kataoka A, Yoshida AC, Itoh D, Ueno M, Blackshaw S, Shimogori T.",
      year: 2011,
      title: "Dynamic spatiotemporal gene expression in embryonic mouse thalamus",
      journal: "J Comp Neurol",
      volume: "519(3): 528-43",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21192082"
    },
    {
      authors: "Verma S, Hoffmann FW, Kumar M, Huang Z, Roe K, Nguyen-Wu E, Hashimoto AS, Hoffmann PR.",
      year: 2011,
      title: "Selenoprotein K knockout mice exhibit deficient calcium flux in immune cells and impaired immune responses.",
      journal: "J Immunol186: 2127-2137",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21220695"
    },
    {
      authors: "de Beer MC, Ji A, Jahangiri A, Vaughan AM, de Beer FC, van der Westhuyzen DR, Webb NR.",
      year: 2011,
      title: "ATP binding cassette G1-dependent cholesterol efflux during inflammation",
      journal: "J Lipid Res",
      volume: "52(2): 345-53",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21138980"
    },
    {
      authors: "Lionnet T, Czaplinski K, Darzacq X, Shav-Tal Y, Wells AL, Chao JA, Park HY, de Turris V, Lopez-Jones M, Singer RH.",
      year: 2011,
      title: "A transgenic mouse for in vivo detection of endogenous labeled mRNA.",
      journal: "Nat Methods8: 165-170",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21240280"
    },
    {
      authors: "Jimenez T, McDermott JP, Sanchez G, Blanco G.",
      year: 2011,
      title: "Na,K-ATPase alpha4 isoform is essential for sperm fertility.",
      journal: "Proc Natl Acad Sci U S A",
      volume: "108: 644-649",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21187400"
    },
    {
      authors: "Chau KM, Cornwall GA.",
      year: 2011,
      title: "Reduced fertility in vitro in mice lacking the cystatin CRES (cystatin-related epididymal spermatogenic): rescue by exposure of spermatozoa to dibutyryl cAMP and isobutylmethylxanthine.",
      journal: "Biol Reprod",
      volume: "84: 140-152",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20811015"
    },
    {
      authors: "Xie Z, Cahill ME, Radulovic J, Wang J, Campbell SL, Miller CA, Sweatt JD, Penzes P.",
      year: 2011,
      title: "Hippocampal phenotypes in kalirin-deficient mice.",
      journal: "Mol Cell Neurosci",
      volume: "46: 45-54",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20708080"
    },
    {
      authors: "Zack M, Boyanovsky BB, Shridas P, Bailey W, Forrest K, Howatt DA, Gelb MH, de Beer FC, Daugherty A, Webb NR.",
      year: 2011,
      title: "Group X secretory phospholipase A(2) augments angiotensin II-induced inflammatory responses and abdominal aortic aneurysm formation in apoE-deficient mice.",
      journal: "Atherosclerosis",
      volume: "214: 58-64",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20833395"
    }
  ],
  "2010": [
    {
      authors: "Liang J, Saad Y, Lei T, Wang J, Qi D, Yang Q, Kolattukudy PE, Fu M.",
      year: 2010,
      title: "MCP-induced protein 1 deubiquitinates TRAF proteins and negatively regulates JNK and NF-kappaB signaling.",
      journal: "J Exp Med207: 2959-2973.1",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21115689"
    },
    {
      authors: "Gao X, Eladari D, Leviel F, Tew BY, Miro-Julia C, Cheema FH, Miller L, Nelson R, Paunescu TG, McKee M, Brown D, Al-Awqati Q.",
      year: 2010,
      title: "Deletion of hensin/DMBT1 blocks conversion of beta- to alpha-intercalated cells and induces distal renal tubular acidosis.",
      journal: "Proc Natl Acad Sci U S A107: 21872-21877",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21098262"
    },
    {
      authors: "Eckhardt ER, Witta J, Zhong J, Arsenescu R, Arsenescu V, Wang Y, Ghoshal S, de Beer MC, de Beer FC, de Villiers WJ.",
      year: 2010,
      title: "Intestinal epithelial serum amyloid A modulates bacterial growth in vitro and pro-inflammatory responses in mouse experimental colitis.",
      journal: "BMC Gastroenterol10: 133",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21067563"
    },
    {
      authors: "Slee EA, Benassi B, Goldin R, Zhong S, Ratnayaka I, Blandino G, Lu X.",
      year: 2010,
      title: "Phosphorylation of Ser312 contributes to tumor suppression by p53 in vivo.",
      journal: "Proc Natl Acad Sci U S A107: 19479-19484",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20962274"
    },
    {
      authors: "Ryazanova LV, Rondon LJ, Zierler S, Hu Z, Galli J, Yamaguchi TP, Mazur A, Fleig A, Ryazanov AG.",
      year: 2010,
      title: "TRPM7 is essential for Mg(2+) homeostasis in mammals",
      journal: "Nat Commun1: 109",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21045827"
    },
    {
      authors: "Xu X, Yang H, Lin YF, Li X, Cape A, Ressler KJ, Li S, Li XJ.",
      year: 2010,
      title: "Neuronal Abelson helper integration site-1 (Ahi1) deficiency in mice alters TrkB signaling with a depressive phenotype.",
      journal: "Proc Natl Acad Sci U S A107: 19126-19131",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20956301"
    },
    {
      authors: "de Beer MC, Webb NR, Wroblewski JM, Noffsinger VP, Rateri DL, Ji A, van der Westhuyzen DR, de Beer FC.",
      year: 2010,
      title: "Impact of serum amyloid A on high density lipoprotein composition and levels.",
      journal: "J Lipid Res",
      volume: "51: 3117-3125",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20667817"
    },
    {
      authors: "Klover PJ, Muller WJ, Robinson GW, Pfeiffer RM, Yamaji D, Hennighausen L.",
      year: 2010,
      title: "Loss of STAT1 from mouse mammary epithelium results in an increased Neu-induced tumor burden.",
      journal: "Neoplasia12: 899-905",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21076615"
    },
    {
      authors: "Li X, Shridas P, Forrest K, Bailey W, Webb NR.",
      year: 2010,
      title: "Group X secretory phospholipase A2 negatively regulates adipogenesis in murine models",
      journal: "FASEB J",
      volume: "24(11): 4313-24",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20585029"
    },
    {
      authors: "Chan YM, Keramaris-Vrantsis E, Lidov HG, Norton JH, Zinchenko N, Gruber HE, Thresher R, Blake DJ, Ashar J, Rosenfeld J, Lu QL.",
      year: 2010,
      title: "Fukutin-related protein is essential for mouse muscle, brain and eye development and mutation recapitulates the wide clinical spectrums of dystroglycanopathies.",
      journal: "Hum Mol Genet19: 3995-4006",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20675713"
    },
    {
      authors: "Badadani M, Nalbandian A, Watts GD, Vesa J, Kitazawa M, Su H, Tanaja J, Dec E, Wallace DC, Mukherjee J, Caiozzo V, Warman M, Kimonis VE.",
      year: 2010,
      title: "VCP associated inclusion body myopathy and paget disease of bone knock-in mouse model exhibits tissue pathology typical of human disease.",
      journal: "PLoS One5",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20957154"
    },
    {
      authors: "Shridas P, Bailey WM, Gizard F, Oslund RC, Gelb MH, Bruemmer D, Webb NR.",
      year: 2010,
      title: "Group X secretory phospholipase A2 negatively regulates ABCA1 and ABCG1 expression and cholesterol efflux in macrophages",
      journal: "Arterioscler Thromb Vasc Biol",
      volume: "30(10): 2014-21",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20844270"
    },
    {
      authors: "Toyoda R, Assimacopoulos S, Wilcoxon J, Taylor A, Feldman P, Suzuki-Hirano A, Shimogori T, Grove EA.",
      year: 2010,
      title: "FGF8 acts as a classic diffusible morphogen to pattern the neocortex.",
      journal: "Development137: 3439-3448",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20843859"
    },
    {
      authors: "Chalaris A, Adam N, Sina C, Rosenstiel P, Lehmann-Koch J, Schirmacher P, Hartmann D, Cichy J, Gavrilova O, Schreiber S, Jostock T, Matthews V, Hasler R, Becker C, Neurath MF, Reiss K, Saftig P, Scheller J, Rose-John S.",
      year: 2010,
      title: "Critical role of the disintegrin metalloprotease ADAM17 for intestinal inflammation and regeneration in mice",
      journal: "J Exp Med",
      volume: "207(8): 1617-24",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20603312"
    },
    {
      authors: "Fairbridge NA, Dawe CE, Niri FH, Kooistra MK, King-Jones K, McDermid HE.",
      year: 2010,
      title: "Cecr2 mutations causing exencephaly trigger misregulation of mesenchymal/ectodermal transcription factors.",
      journal: "Birth Defects Res A Clin Mol Teratol",
      volume: "88: 619-625",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20589882"
    },
    {
      authors: "Geva M, Cabilly Y, Assaf Y, Mindroul N, Marom L, Raini G, Pinchasi D, Elroy-Stein O.",
      year: 2010,
      title: "A mouse model for eukaryotic translation initiation factor 2B-leucodystrophy reveals abnormal development of brain white matter.",
      journal: "Brain133: 2448-2461",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20826436"
    },
    {
      authors: "Zhou Y, Cheunsuchon P, Nakayama Y, Lawlor MW, Zhong Y, Rice KA, Zhang L, Zhang X, Gordon FE, Lidov HG, Bronson RT, Klibanski A.",
      year: 2010,
      title: "Activation of paternally expressed genes and perinatal death caused by deletion of the Gtl2 gene.",
      journal: "Development137: 2643-2652",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20610486"
    },
    {
      authors: "Lim ST, Chen XL, Tomar A, Miller NL, Yoo J, Schlaepfer DD.",
      year: 2010,
      title: "Knock-in mutation reveals an essential role for focal adhesion kinase activity in blood vessel morphogenesis and cell motility-polarity but not cell proliferation.",
      journal: "J Biol Chem",
      volume: "285: 21526-21536",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20442405"
    },
    {
      authors: "Shridas P, Bailey WM, Boyanovsky BB, Oslund RC, Gelb MH, Webb NR.",
      year: 2010,
      title: "Group X secretory phospholipase A2 regulates the expression of steroidogenic acute regulatory protein (StAR) in mouse adrenal glands",
      journal: "J Biol Chem",
      volume: "285(26): 20031-9",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20421306"
    },
    {
      authors: "Kushnir A, Shan J, Betzenhauser MJ, Reiken S, Marks AR.",
      year: 2010,
      title: "Role of CaMKIIdelta phosphorylation of the cardiac ryanodine receptor in the force frequency relationship and heart failure.",
      journal: "Proc Natl Acad Sci U S A107: 10274-10279",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20479242"
    },
    {
      authors: "Markert CD, Meaney MP, Voelker KA, Grange RW, Dalley HW, Cann JK, Ahmed M, Bishwokarma B, Walker SJ, Yu SX, Brown M, Lawlor MW, Beggs AH, Childers MK.",
      year: 2010,
      title: "Functional muscle analysis of the Tcap knockout mouse.",
      journal: "Hum Mol Genet19: 2268-2283",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20233748"
    },
    {
      authors: "Yang G, Wu L, Bryan S, Khaper N, Mani S, Wang R.",
      year: 2010,
      title: "Cystathionine gamma-lyase deficiency and overproliferation of smooth muscle cells.",
      journal: "Cardiovasc Res86: 487-495",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20051385"
    },
    {
      authors: "Bahrami J, Yusta B, Drucker DJ.",
      year: 2010,
      title: "ErbB activity links the glucagon-like peptide-2 receptor to refeeding-induced adaptation in the murine small bowel.",
      journal: "Gastroenterology138: 2447-2456",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20226187"
    },
    {
      authors: "Besnard V, Matsuzaki Y, Clark J, Xu Y, Wert SE, Ikegami M, Stahlman MT, Weaver TE, Hunt AN, Postle AD, Whitsett JA.",
      year: 2010,
      title: "Conditional deletion of Abca3 in alveolar type II cells alters surfactant homeostasis in newborn and adult mice.",
      journal: "Am J Physiol Lung Cell Mol Physiol298: L646-659",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20190032"
    },
    {
      authors: "Reidling JC, Lambrecht N, Kassir M, Said HM.",
      year: 2010,
      title: "Impaired intestinal vitamin B1 (thiamin) uptake in thiamin transporter-2-deficient mice.",
      journal: "Gastroenterology138: 1802-1809",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/19879271"
    },
    {
      authors: "Tornqvist G, Sandberg A, Hagglund AC, Carlsson L.",
      year: 2010,
      title: "Cyclic expression of lhx2 regulates hair formation.",
      journal: "PLoS Genet6: e1000904",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20386748"
    },
    {
      authors: "McCalmon SA, Desjardins DM, Ahmad S, Davidoff KS, Snyder CM, Sato K, Ohashi K, Kielbasa OM, Mathew M, Ewen EP, Walsh K, Gavras H, Naya FJ.",
      year: 2010,
      title: "Modulation of angiotensin II-mediated cardiac remodeling by the MEF2A target gene Xirp2.",
      journal: "Circ Res106: 952-960",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20093629"
    },
    {
      authors: "Gibb DR, El Shikh M, Kang DJ, Rowe WJ, El Sayed R, Cichy J, Yagita H, Tew JG, Dempsey PJ, Crawford HC, Conrad DH.",
      year: 2010,
      title: "ADAM10 is essential for Notch2-dependent marginal zone B cell development and CD23 cleavage in vivo.",
      journal: "J Exp Med207: 623-635",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20156974"
    },
    {
      authors: "Harashima A, Guettouche T, Barber GN.",
      year: 2010,
      title: "Phosphorylation of the NFAR proteins by the dsRNA-dependent protein kinase PKR constitutes a novel mechanism of translational regulation and cellular defense.",
      journal: "Genes Dev24: 2640-2653",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20203183"
    },
    {
      authors: "Herrmann R, Lobanova ES, Hammond T, Kessler C, Burns ME, Frishman LJ, Arshavsky VY.",
      year: 2010,
      title: "Phosducin regulates transmission at the photoreceptor-to-ON-bipolar cell synapse.",
      journal: "J Neurosci30: 3239-3253",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20203183"
    },
    {
      authors: "Fukata Y, Lovero KL, Iwanaga T, Watanabe A, Yokoi N, Tabuchi K, Shigemoto R, Nicoll RA, Fukata M.",
      year: 2010,
      title: "Disruption of LGI1-linked synaptic complex causes abnormal synaptic transmission and epilepsy.",
      journal: "Proc Natl Acad Sci U S A107: 3799-3804",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20133599"
    },
    {
      authors: "Jentarra GM, Olfers SL, Rice SG, Srivastava N, Homanics GE, Blue M, Naidu S, Narayanan V.",
      year: 2010,
      title: "Abnormalities of cell packing density and dendritic complexity in the MeCP2 A140V mouse model of Rett syndrome/X-linked mental retardation.",
      journal: "BMC Neurosci11: 19",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20163734"
    },
    {
      authors: "Howng SY, Avila RL, Emery B, Traka M, Lin W, Watkins T, Cook S, Bronson R, Davisson M, Barres BA, Popko B.",
      year: 2010,
      title: "ZFP191 is required by oligodendrocytes for CNS myelination.",
      journal: "Genes Dev24: 301-311",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20080941"
    },
    {
      authors: "Tischfield MA, Baris HN, Wu C, Rudolph G, Van Maldergem L, He W, Chan WM, Andrews C, Demer JL, Robertson RL, Mackey DA, Ruddle JB, Bird TD, Gottlob I, Pieh C, Traboulsi EI, Pomeroy SL, Hunter DG, Soul JS, Newlin A, Sabol LJ, Doherty EJ, de Uzcátegui CE, de Uzcátegui N, Collins ML, Sener EC, Wabbels B, Hellebrand H, Meitinger T, de Berardinis T, Magli A, Schiavi C, Pastore-Trossello M, Koc F, Wong AM, Levin AV, Geraghty MT, Descartes M, Flaherty M, Jamieson RV, Møller HU, Meuthen I, Callen DF, Kerwin J, Lindsay S, Meindl A, Gupta ML Jr, Pellman D, Engle EC.",
      year: 2010,
      title: "Human TUBB3 mutations perturb microtubule dynamics, kinesin interactions, and axon guidance.",
      journal: "Cell140: 74-87",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20074521"
    },
    {
      authors: "Powers SE, Taniguchi K, Yen W, Melhuish TA, Shen J, Walsh CA, Sutherland AE, Wotton D.",
      year: 2010,
      title: "Tgif1 and Tgif2 regulate Nodal signaling and are required for gastrulation.",
      journal: "Development137: 249-259.1",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20040491"
    },
    {
      authors: "Xie Z, Cahill ME, Penzes P.",
      year: 2010,
      title: "Kalirin loss results in cortical morphological alterations.",
      journal: "Mol Cell Neurosci",
      volume: "43: 81-89.5",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/19800004"
    }
  ],
  "2009": [
    {
      authors: "Zhang Y, Molday LL, Molday RS, Sarfare SS, Woodruff ML, Fain GL, Kraft TW, Pittler SJ.",
      year: 2009,
      title: "Knockout of GARPs and the beta-subunit of the rod cGMP-gated channel disrupts disk morphogenesis and rod outer segment structural integrity.",
      journal: "J Cell Sci122: 1192-1200",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/19339551"
    },
    {
      authors: "Weinreich MA, Takada K, Skon C, Reiner SL, Jameson SC, Hogquist KA.",
      year: 2009,
      title: "KLF2 transcription-factor deficiency in T cells results in unrestrained cytokine production and upregulation of bystander chemokine receptors.",
      journal: "Immunity31: 122-130",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/19592277"
    },
    {
      authors: "Uchimura A, Hidaka Y, Hirabayashi T, Hirabayashi M, Yagi T.",
      year: 2009,
      title: "DNA polymerase delta is required for early mammalian embryogenesis.",
      journal: "PLoS One4: e4184",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/19145245"
    },
    {
      authors: "Saint Fleur S, Hoshino A, Kondo K, Egawa T, Fujii H.",
      year: 2009,
      title: "Regulation of Fas-mediated immune homeostasis by an activation-induced protein, Cyclon.",
      journal: "Blood114: 1355-1365",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/19528538"
    },
    {
      authors: "Robling AG, Childress P, Yu J, Cotte J, Heller A, Philip BK, Bidwell JP.",
      year: 2009,
      title: "Nmp4/CIZ suppresses parathyroid hormone-induced increases in trabecular bone.",
      journal: "J Cell Physiol219: 734-743",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/19189321"
    },
    {
      authors: "Miyagoe-Suzuki Y, Masubuchi N, Miyamoto K, Wada MR, Yuasa S, Saito F, Matsumura K, Kanesaki H, Kudo A, Manya H, Endo T, Takeda S.",
      year: 2009,
      title: "Reduced proliferative activity of primary POMGnT1-null myoblasts in vitro.",
      journal: "Mech Dev126: 107-116",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/19114101"
    },
    {
      authors: "Liu J, Zhang H, Li Z, Hailemariam TK, Chakraborty M, Jiang K, Qiu D, Bui HH, Peake DA, Kuo MS, Wadgaonkar R, Cao G, Jiang XC.",
      year: 2009,
      title: "Sphingomyelin synthase 2 is one of the determinants for plasma and liver sphingomyelin levels in mice.",
      journal: "Arterioscler Thromb Vasc Biol29: 850-856",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/19286635"
    },
    {
      authors: "Hoover RG, Gullickson G, Kornbluth J.",
      year: 2009,
      title: "Impaired NK cytolytic activity and enhanced tumor growth in NK lytic-associated molecule-deficient mice.",
      journal: "J Immunol183: 6913-6921",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/19915045"
    },
    {
      authors: "Festing MH, Speer MY, Yang HY, Giachelli CM.",
      year: 2009,
      title: "Generation of mouse conditional and null alleles of the type III sodium-dependent phosphate cotransporter PiT-1.",
      journal: "Genesis47: 858-863",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/19882669"
    },
    {
      authors: "Amleh A, Nair SJ, Sun J, Sutherland A, Hasty P, Li R.",
      year: 2009,
      title: "Mouse cofactor of BRCA1 (Cobra1) is required for early embryogenesis.",
      journal: "PLoS One4: e5034",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/19340312"
    }
  ],
  "2008": [
    {
      authors: "Zhang J, Li J, Huang C, Xue L, Peng Y, Fu Q, Gao L, Zhang J, Li W.",
      year: 2008,
      title: "Targeted knockout of the mouse betaB2-crystallin gene (Crybb2) induces age-related cataract.",
      journal: "Invest Ophthalmol Vis Sci49: 5476-5483",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/18719080"
    },
    {
      authors: "Makino CL, Peshenko IV, Wen XH, Olshevskaya EV, Barrett R, Dizhoor AM.",
      year: 2008,
      title: "A role for GCAP2 in regulating the photoresponse. Guanylyl cyclase activation and rod electrophysiology in GUCA1B knock-out mice.",
      journal: "J Biol Chem283: 29135-29143",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/18723510"
    },
    {
      authors: "Yang G, Wu L, Jiang B, Yang W, Qi J, Cao K, Meng Q, Mustafa AK, Mu W, Zhang S et al.",
      year: 2008,
      title: "H2S as a physiologic vasorelaxant: hypertension in mice with deletion of cystathionine gamma-lyase.",
      journal: "Science322: 587-590",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/18948540"
    },
    {
      authors: "Maeda A, Maeda T, Golczak M, Palczewski K.",
      year: 2008,
      title: "Retinopathy in mice induced by disrupted all-trans-retinal clearance.",
      journal: "J Biol Chem283: 26684-26693",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/18658157"
    },
    {
      authors: "Imanishi Y, Sun W, Maeda T, Maeda A, Palczewski K.",
      year: 2008,
      title: "Retinyl ester homeostasis in the adipose differentiation-related protein-deficient retina.",
      journal: "J Biol Chem283: 25091-25102",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/18606814"
    },
    {
      authors: "Nikonov SS, Brown BM, Davis JA, Zuniga FI, Bragin A, Pugh EN, Jr., Craft CM.",
      year: 2008,
      title: "Mouse cones require an arrestin for normal inactivation of phototransduction",
      journal: "Neuron",
      volume: "59(3): 462-74",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/18701071"
    },
    {
      authors: "Hailemariam TK, Huan C, Liu J, Li Z, Roman C, Kalbfeisch M, Bui HH, Peake DA, Kuo MS, Cao G, Wadgaonkar R, Jiang XC.",
      year: 2008,
      title: "Sphingomyelin synthase 2 deficiency attenuates NFkappaB activation.",
      journal: "Arterioscler Thromb Vasc Biol28: 1519-1526",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/18566297"
    },
    {
      authors: "Suzuki Y, Kovacs CS, Takanaga H, Peng JB, Landowski CP, Hediger MA.",
      year: 2008,
      title: "Calcium channel TRPV6 is involved in murine maternal-fetal calcium transport.",
      journal: "J Bone Miner Res23: 1249-1256",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/18348695"
    },
    {
      authors: "Luke Y, Zaim H, Karakesisoglou I, Jaeger VM, Sellin L, Lu W, Schneider M, Neumann S, Beijer A, Munck M, Padmakumar VC, Gloy J, Walz G, Noegel AA.",
      year: 2008,
      title: "Nesprin-2 Giant (NUANCE) maintains nuclear envelope architecture and composition in skin.",
      journal: "J Cell Sci121: 1887-1898",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/18477613"
    },
    {
      authors: "Nakashima A, Kawamoto T, Honda KK, Ueshima T, Noshiro M, Iwata T, Fujimoto K, Kubo H, Honma S, Yorioka N,Kohno N, Kato Y.",
      year: 2008,
      title: "DEC1 modulates the circadian phase of clock gene expression.",
      journal: "Mol Cell Biol28: 4080-4092",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/18411297"
    },
    {
      authors: "Arikketh D, Nelson R, Vance JE.",
      year: 2008,
      title: "Defining the importance of phosphatidylserine synthase-1 (PSS1): unexpected viability of PSS1-deficient mice.",
      journal: "J Biol Chem283: 12888-12897",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/18343815"
    },
    {
      authors: "Joesting MS, Cheever TR, Volzing KG, Yamaguchi TP, Wolf V, Naf D, Rubin JS, Marker PC.",
      year: 2008,
      title: "Secreted frizzled related protein 1 is a paracrine modulator of epithelial branching morphogenesis, proliferation, and secretory gene expression in the prostate.",
      journal: "Dev Biol317: 161-173",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/18371946"
    },
    {
      authors: "Golczak M, Maeda A, Bereta G, Maeda T, Kiser PD, Hunzelmann S, von Lintig J, Blaner WS, Palczewski K.",
      year: 2008,
      title: "Metabolic basis of visual cycle inhibition by retinoid and nonretinoid compounds in the vertebrate retina",
      journal: "J Biol Chem",
      volume: "283(15): 9543-54",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/18195010"
    },
    {
      authors: "Monks J, Smith-Steinhart C, Kruk ER, Fadok VA, Henson PM.",
      year: 2008,
      title: "Epithelial cells remove apoptotic epithelial cells during post-lactation involution of the mouse mammary gland.",
      journal: "Biol Reprod78: 586-594",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/18057312"
    },
    {
      authors: "Jordan MS, Smith JE, Burns JC, Austin JE, Nichols KE, Aschenbrenner AC, Koretzky GA.",
      year: 2008,
      title: "Complementation in trans of altered thymocyte development in mice expressing mutant forms of the adaptor molecule SLP76.",
      journal: "Immunity28: 359-369",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/18342008"
    },
    {
      authors: "Edwin F, Patel TB.",
      year: 2008,
      title: "A novel role of Sprouty 2 in regulating cellular apoptosis.",
      journal: "J Biol Chem",
      volume: "283: 3181-3190",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/18070883"
    },
    {
      authors: "Beliakoff J, Lee J, Ueno H, Aiyer A, Weissman IL, Barsh GS, Cardiff RD, Sun Z.",
      year: 2008,
      title: "The PIAS-like protein Zimp10 is essential for embryonic viability and proper vascular development.",
      journal: "Mol Cell Biol28: 282-292",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/17967885"
    }
  ],
  "2007": [
    {
      authors: "Anderson GR, Lujan R, Semenov A, Pravetoni M, Posokhova EN, Song JH, Uversky V, Chen CK, Wickman K, Martemyanov KA.",
      year: 2007,
      title: "Expression and localization of RGS9-2/G 5/R7BP complex in vivo is set by dynamic control of its constitutive degradation by cellular cysteine proteases.",
      journal: "J Neurosci27: 14117-14127",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/18094251"
    },
    {
      authors: "Baertschi S, Zhuang L, Trueb B.",
      year: 2007,
      title: "Mice with a targeted disruption of the Fgfrl1 gene die at birth due to alterations in the diaphragm.",
      journal: "FEBS J274: 6241-6253",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/17986259"
    },
    {
      authors: "Malicdan MC, Noguchi S, Nonaka I, Hayashi YK, Nishino I.",
      year: 2007,
      title: "A Gne knockout mouse expressing human GNE D176V mutation develops features similar to distal myopathy with rimmed vacuoles or hereditary inclusion body myopathy.",
      journal: "Hum Mol Genet16: 2669-2682",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/17704511"
    },
    {
      authors: "Ding C, Liu Y, Wang Y, Park BK, Wang CY, Zheng P, Liu Y.",
      year: 2007,
      title: "Siglecg limits the size of B1a B cell lineage by down-regulating NFkappaB activation.",
      journal: "PLoS One2: e997",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/17912374"
    },
    {
      authors: "Krispel CM, Sokolov M, Chen YM, Song H, Herrmann R, Arshavsky VY, Burns ME.",
      year: 2007,
      title: "Phosducin regulates the expression of transducin betagamma subunits in rod photoreceptors and does not contribute to phototransduction adaptation.",
      journal: "J Gen Physiol130: 303-312",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/17724163"
    },
    {
      authors: "Garcia-Gonzalez MA, Menezes LF, Piontek KB, Kaimori J, Huso DL, Watnick T, Onuchic LF, Guay-Woodford LM, Germino GG.",
      year: 2007,
      title: "Genetic interaction studies link autosomal dominant and recessive polycystic kidney disease in a common pathway.",
      journal: "Hum Mol Genet16: 1940-1950",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/17575307"
    },
    {
      authors: "Chen H, McCaffery JM, Chan DC.",
      year: 2007,
      title: "Mitochondrial fusion protects against neurodegeneration in the cerebellum.",
      journal: "Cell130: 548-562",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/17693261"
    },
    {
      authors: "Mei Y, Thompson MD, Shiraishi Y, CoheLu J, Lian G, Lenkinski R, De Grand A, Vaid RR, Bryce T, Stasenko M, Boskey A, Walsh C, Sheen V. 2007. [Filamin B mutations cause chondrocyte defects in skeletal development.](https://www.ncbi.nlm.nih.gov/pubmed/17510210)Hum Mol Genet16: 1661-1675.n RA, Tong X. 2014.",
      year: 2007,
      title: "Sarcoplasmic/endoplasmic reticulum Ca2+ ATPase C674 promotes ischemia- and hypoxia-induced angiogenesis via coordinated endothelial cell and macrophage function.",
      journal: "J Mol Cell Cardiol",
      volume: "76: 275-282",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25260714"
    },
    {
      authors: "Fullerton MD, Hakimuddin F, Bakovic M.",
      year: 2007,
      title: "Developmental and metabolic effects of disruption of the mouse CTP:phosphoethanolamine cytidylyltransferase gene (Pcyt2).",
      journal: "Mol Cell Biol27: 3327-3336",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/17325045"
    }
  ],
  "2006": [
    {
      authors: "Zhang S, Shi M, Hui CC, Rommens JM.",
      year: 2006,
      title: "Loss of the mouse ortholog of the shwachman-diamond syndrome gene (Sbds) results in early embryonic lethality.",
      journal: "Mol Cell Biol26: 6656-6663",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/16914746"
    },
    {
      authors: "Xu J, Lee WN, Phan J, Saad MF, Reue K, Kurland IJ.",
      year: 2006,
      title: "Lipin deficiency impairs diurnal metabolic fuel switching.",
      journal: "Diabetes",
      volume: "55: 3429-3438",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/17130489"
    },
    {
      authors: "Vives V, Su J, Zhong S, Ratnayaka I, Slee E, Goldin R, Lu X.",
      year: 2006,
      title: "ASPP2 is a haploinsufficient tumor suppressor that cooperates with p53 to suppress tumor growth.",
      journal: "Genes Dev",
      volume: "20: 1262-1267",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/16702401"
    },
    {
      authors: "Vasireddy V, Jablonski MM, Mandal MN, Raz-Prag D, Wang XF, Nizol L, Iannaccone A, Musch DC, Bush RA, Salem N, Jr., Sieving PA, Ayyagari R.",
      year: 2006,
      title: "Elovl4 5-bp-deletion knock-in mice develop progressive photoreceptor degeneration.",
      journal: "Invest Ophthalmol Vis Sci47: 4558-4568",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/17003453"
    },
    {
      authors: "Park JM, Kohn MJ, Bruinsma MW, Vech C, Intine RV, Fuhrmann S, Grinberg A, Mukherjee I, Love PE, Ko MS, DePamphilis ML, Maraia RJ.",
      year: 2006,
      title: "The multifunctional RNA-binding protein La is required for mouse development and for the establishment of embryonic stem cells.",
      journal: "Mol Cell Biol26: 1445-1451",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/16449655"
    },
    {
      authors: "Nanda A, Karim B, Peng Z, Liu G, Qiu W, Gan C, Vogelstein B, St Croix B, Kinzler KW, Huso DL.",
      year: 2006,
      title: "Tumor endothelial marker 1 (Tem1) functions in the growth and progression of abdominal tumors.",
      journal: "Proc Natl Acad Sci U S A103: 3351-3356",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/16492758"
    },
    {
      authors: "McVay LD, Keilbaugh SA, Wong TM, Kierstein S, Shin ME, Lehrke M, Lefterova MI, Shifflett DE, Barnes SL, Cominelli F, Cohn SM, Hecht G, Lazar MA, Haczku A, Wu GD.",
      year: 2006,
      title: "Absence of bacterially induced RELMbeta reduces injury in the dextran sodium sulfate model of colitis.",
      journal: "J Clin Invest116: 2914-2923",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/17024245"
    },
    {
      authors: "Maeda A, Maeda T, Imanishi Y, Sun W, Jastrzebska B, Hatala DA, Winkens HJ, Hofmann KP, Janssen JJ, Baehr W, Driessen CA, Palczewski K.",
      year: 2006,
      title: "Retinol dehydrogenase (RDH12) protects photoreceptors from light-induced degeneration in mice.",
      journal: "J Biol Chem281: 37697-37704",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/17032653"
    },
    {
      authors: "Kim KI, Yan M, Malakhova O, Luo JK, Shen MF, Zou W, de la Torre JC, Zhang DE.",
      year: 2006,
      title: "Ube1L and protein ISGylation are not essential for alpha/beta interferon signaling.",
      journal: "Mol Cell Biol26: 472-479",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/16382139"
    },
    {
      authors: "Faria AM, Levay A, Wang Y, Kamphorst AO, Rosa ML, Nussenzveig DR, Balkan W, Chook YM, Levy DE, Fontoura BM.",
      year: 2006,
      title: "The nucleoporin Nup96 is required for proper expression of interferon-regulated proteins and functions.",
      journal: "Immunity24: 295-304",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/16546098"
    },
    {
      authors: "Dalkilic I, Schienda J, Thompson TG, Kunkel LM.",
      year: 2006,
      title: "Loss of FilaminC (FLNc) results in severe defects in myogenesis and myotube structure.",
      journal: "Mol Cell Biol26: 6522-6534",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/16914736"
    }
  ],
  "2005": [
    {
      authors: "Shen J, Walsh CA.",
      year: 2005,
      title: "Targeted disruption of Tgif, the mouse ortholog of a human holoprosencephaly gene, does not result in holoprosencephaly in mice.",
      journal: "Mol Cell Biol25: 3639-3647",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/15831469"
    },
    {
      authors: "Chesney J, Telang S, Yalcin A, Clem A, Wallis N, Bucala R.",
      year: 2005,
      title: "Targeted disruption of inducible 6-phosphofructo-2-kinase results in embryonic lethality.",
      journal: "Biochem Biophys Res Commun331: 139-146",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/15845370"
    }
  ],
  "2004": [
    {
      authors: "Zeng Y, Takada Y, Kjellstrom S, Hiriyanna K, Tanikawa A, Wawrousek E, Smaoui N, Caruso R, Bush RA, Sieving PA.",
      year: 2004,
      title: "RS-1 Gene Delivery to an Adult Rs1h Knockout Mouse Model Restores ERG b-Wave with Reversal of the Electronegative Waveform of X-Linked Retinoschisis.",
      journal: "Invest Ophthalmol Vis Sci45: 3279-3285",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/15326152"
    },
    {
      authors: "Utku N, Boerner A, Tomschegg A, Bennai-Sanfourche F, Bulwin GC, Heinemann T, Loehler J, Blumberg RS, Volk HD.",
      year: 2004,
      title: "TIRC7 deficiency causes in vitro and in vivo augmentation of T and B cell activation and cytokine response.",
      journal: "J Immunol173: 2342-2352",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/15294947"
    },
    {
      authors: "Uda M, Ottolenghi C, Crisponi L, Garcia JE, Deiana M, Kimber W, Forabosco A, Cao A, Schlessinger D, Pilia G.",
      year: 2004,
      title: "Foxl2 disruption causes mouse ovarian failure by pervasive blockage of follicle development.",
      journal: "Hum Mol Genet13: 1171-1181",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/15056605"
    },
    {
      authors: "Sokolov M, Strissel KJ, Leskov IB, Michaud NA, Govardovskii VI, Arshavsky VY.",
      year: 2004,
      title: "Phosducin facilitates light-driven transducin translocation in rod photoreceptors. Evidence from the phosducin knockout mouse.",
      journal: "J Biol Chem279: 19149-19156",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/14973130"
    },
    {
      authors: "Ogg SL, Weldon AK, Dobbie L, Smith AJ, Mather IH.",
      year: 2004,
      title: "Expression of butyrophilin (Btn1a1) in lactating mammary gland is essential for the regulated secretion of milk-lipid droplets.",
      journal: "Proc Natl Acad Sci U S A101: 10084-10089",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/15226505"
    },
    {
      authors: "Batten ML, Imanishi Y, Maeda T, Tu DC, Moise AR, Bronson D, Possin D, Van Gelder RN, Baehr W, Palczewski K.",
      year: 2004,
      title: "Lecithin-retinol acyltransferase is essential for accumulation of all-trans-retinyl esters in the eye and in the liver.",
      journal: "J Biol Chem279: 10422-10432",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/14684738"
    }
  ],
  "2003": [
    {
      authors: "Muller AJ, Baker JF, DuHadaway JB, Ge K, Farmer G, Donover PS, Meade R, Reid C, Grzanna R, Roach AH, Shah N, Soler AP, Prendergast GC.",
      year: 2003,
      title: "Targeted disruption of the murine Bin1/Amphiphysin II gene does not disable endocytosis but results in embryonic cardiomyopathy with aberrant myofibril formation.",
      journal: "Mol Cell Biol23: 4295-4306",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/12773571"
    }
  ],
  "2001": [
    {
      authors: "Peterson EJ, Woods ML, Dmowski SA, Derimanov G, Jordan MS, Wu JN, Myung PS, Liu QH, Pribila JT, Freedman BD, Shimizu Y, Koretzky GA.",
      year: 2001,
      title: "Coupling of the TCR to integrin activation by Slap-130/Fyb.",
      journal: "Science293: 2263-2265",
      volume: "",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/11567141"
    }
  ],
};

// Helper functions
export function getAllPublications(): Publication[] {
  return Object.values(publicationsByYear).flat();
}

export function getPublicationsByYear(year: string): Publication[] {
  return publicationsByYear[year] || [];
}

export function getYears(): string[] {
  return Object.keys(publicationsByYear).sort((a, b) => parseInt(b) - parseInt(a));
}

export function getTotalPublications(): number {
  return getAllPublications().length;
}

// Alias for backward compatibility
export const getTotalPublicationCount = getTotalPublications;
