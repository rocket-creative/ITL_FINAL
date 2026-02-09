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
      journal: "J Immunol",
      volume: "vkaf224",
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
      journal: "Exp Mol Med",
      volume: "6(57): 1283-1293",
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
      authors: "Zong P, Li CX, Feng J, Yue Z, Nethramangalath T, Xie Y, Qin X, Cicchetti M, Cai Y, Jellison E, Matsushita M, Runnels LW, Yue L.",
      year: 2025,
      title: "TRPM7 channel activity promotes the pathogenesis of abdominal aortic aneurysms",
      journal: "Nat Cardiovasc Res",
      volume: "4(2): 197-215.  ",
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
      volume: " ",
      link: "https://pubmed.ncbi.nlm.nih.gov/39868106/"
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
      authors: "S, Shah N, Youn A, Bennett L, Fontenard S, Gounder S, Gandhi A, Bowman M, O'Connor K, Zaroogian Z, Sánchez-Vela P, Martinez Benitez AR, Werewski M, Park Y, Csete IS, Krishnan A, Lee D, Boorady N, Potts CR, Jenkins MT, Cai SF, Carroll MP, Meyer SE, Miles LA, Ferrell PB Jr, Trowbridge JJ, Levine RL.",
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
      authors: "Doremalen N, Bushmaker T, Fischer RJ, Okumura A, Figueroa Acosta D M, McMinn RJ, Letko M, Scott D, Saturday G, Munster VJ.",
      year: 2024,
      title: "Transmission dynamics of MERS-CoV in a transgenic human DPP4 mouse model",
      journal: "npj viruses",
      volume: "2(36)",
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
      authors: "A,Zaroogian Z, Kim WJ, Fernández-Maestre I, Waarts MR, Nazir A, Xiao W,Codilupi T, Brodsky M, Farina M, Cai L, Cai SF, Wang B, An W, Yang JL,Mowla S, Eisman SE, Hanasoge Somasundara AV, Glass JL, Mishra T, Houston R, Guzzardi E, Martinez Benitez AR, Viny AD, Koche RP, Meyer SC, Landau DA, Levine RL.",
      year: 2024,
      title: "Jak2V617F Reversible Activation Shows Its Essential Requirement in Myeloproliferative Neoplasms",
      journal: "Cancer Discov",
      volume: "14(5): 737-751",
      link: "https://pubmed.ncbi.nlm.nih.gov/38230747/"
    },
    {
      authors: "Mizuno N, Morino H, Yoshimoto T, TZhu T, Liu S, Wang Z, Mayahara K, Iio K, Kondo K, Kondo T, Hayashi T, Coghlan S, Teno Y, Anh Phung Doan A, Levitan M, Choi RB, Matsuda S, Ouhara K, Wan J, Cassidy AM, Pelletier S, Nampoothiri S, Urtizberea AJ, Robling AG, Ono M, Kawakami H, Reichenberger EJ, Ueki Y.",
      year: 2024,
      title: "Loss-of-function OGFRL1 variants identified in autosomal recessive cherubism families",
      journal: "JBMR Plus",
      volume: "8(6): ziae050",
      link: "https://pubmed.ncbi.nlm.nih.gov/38699440/"
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
      journal: "eLife",
      volume: "12(RP89287)",
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
      authors: "Miyauchi S, Arimoto KI, Liu M, Zhang Y, Zhang DE.",
      year: 2023,
      title: "Reprogramming of tumor-associated macrophages via NEDD4-mediated CSF1R degradation by targeting USP18",
      journal: "Cell Rep",
      volume: "42(12): 113560",
      link: "https://pubmed.ncbi.nlm.nih.gov/38100351/"
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
      authors: "Haley M, Bertrand J, Anderson VT, Fuad M, Frenguelli BG, Corrêa SAL, Wall MJ.",
      year: 2023,
      title: "Arc expression regulates long-term potentiation magnitude and metaplasticity in area CA1 of the hippocampus in ArcKR mice",
      journal: "Eur J Neurosci",
      volume: "58(10): 4166-4180",
      link: "https://pubmed.ncbi.nlm.nih.gov/37821126/"
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
      authors: "Tworak A, Kolesnikov AV, Hong JD, Choi EH, Luu JC, Palczewska G, Dong Z, Lewandowski D, Brooks MJ, Campello L, Swaroop A, Kiser PD, Kefalov VJ, Palczewski K.",
      year: 2023,
      title: "Rapid RGR-dependent visual pigment recycling is mediated by the RPE and specialized Müller glia",
      journal: "Cell Rep",
      volume: "42(8): 112982",
      link: "https://pubmed.ncbi.nlm.nih.gov/37585292/"
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
      authors: "Fauteux-Daniel S, Merlo Pich LM, Girard-Guyonvarc’h C, Caruso A, Rodriguez E, Gabay C.",
      year: 2023,
      title: "The role of interleukin-18 and interleukin-18 binding protein in K/BxN serum transfer-induced arthritis",
      journal: "Front Immunol",
      volume: "14: 1215364",
      link: "https://pubmed.ncbi.nlm.nih.gov/37415987/"
    },
    {
      authors: "Chakrabarti S, Klich JD, Khallaf MA, Sánchez-Carranza O, Baran ZM, Rossi A, Tzu-Lun Huang A, Pohl T,  Fleischer R, Fürst C, Hammes A, Bégay V, Hörnberg H, Poole K, Lewin GR.",
      year: 2023,
      title: "Touch sensation requires the mechanically-gated ion channel Elkin1",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/2023.06.09.544247v1.article-info"
    },
    {
      authors: "Zapater LJ, Rodriguez-Fos E, Planas-Felix M, Lewis S, Cameron D, Demarest P, Nabila A, Zhao J, Bergin P, Reed C, Yamada M, Pagnozzi A, Nava C, Bourel-Ponchel E, Neilson DE, Dursun A, Özgül RK, Akar HT, Socci ND, Hayes M, Rabadan R, Torrents D, Kruer MC, Toth M, Kentsis A.",
      year: 2023,
      title: "A transposase-derived gene required for human brain development",
      journal: "bioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/2023.04.28.538770.abstract"
    }
  ],
  "2022": [
    {
      authors: "Verdone BM, Cicardi ME, Wen X, Sriramoji S, Russell K, Markandaiah SS, Jensen BK, Krishnamurthy K, Haeusler AR, Pasinelli P, Trotti D.",
      year: 2022,
      title: "A mouse model with widespread expression of the C9orf72-linked glycine-arginine dipeptide displays non-lethal ALS/FTD-like phenotypes",
      journal: "Sci Rep",
      volume: "12(1): 5644",
      link: "https://pubmed.ncbi.nlm.nih.gov/35379876/"
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
      journal: "Free Radic Biol Med",
      volume: "181: 241-250",
      link: "https://pubmed.ncbi.nlm.nih.gov/35158029/"
    },
    {
      authors: "Nan J, Lee JS, Moon JH, Lee SA, Park YJ, Lee DS, Chung SS, Park KS.",
      year: 2022,
      title: "SENP2 regulates mitochondrial function and insulin secretion in pancreatic β cells",
      journal: "Exp Mol Med",
      volume: "54(1): 72–80",
      link: "https://pubmed.ncbi.nlm.nih.gov/35064188/"
    }
  ],
  "2021": [
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
      journal: "Exp Neurol",
      volume: "346: 113856",
      link: "https://pubmed.ncbi.nlm.nih.gov/34474007/"
    },
    {
      authors: "Rosier K, McDevitt MT, Smet J, Floyd BJ, Verschoore M, Marcaida MJ, Bingman CA, Lemmens I, Dal Peraro M, Tavernier J, Cravatt BF, Gounko NV, Vints K, Monnens Y,  Bhalla K, Aerts L, Rashan EH, Vanlander AV, Van Coster R, Régal L, Pagliarini DJ, Creemers JWM.",
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
      authors: "Gao Y, Cardamone MD, Kwan J, Orofino J, Hekman R, Lyons S, Emili A, Perissi V.",
      year: 2021,
      title: "Inhibition of Mul1-mediated ubiquitination promotes mitochondria-associated translation",
      journal: "BioRxiv",
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
      journal: "Mol Metab",
      volume: "45: 101166",
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
      journal: "BioRxiv",
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
      journal: "Blood Cells Mol Dis",
      volume: "85: 102483",
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
      journal: "BioRxiv",
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
      journal: "Brain, Behavior, & Immunity – Health",
      volume: "7: 100116",
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
      journal: "US Patent Application",
      volume: "No.20200246488",
      link: "http://www.freepatentsonline.com/y2020/0246488.html"
    },
    {
      authors: "Ariizumi K, Cruz P.",
      year: 2020,
      title: "Anti-dc-hil antibodies for cancer diagnosis, prognosis and therapy",
      journal: "US Patent Application",
      volume: "No.US20200206343",
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
      journal: "Mol Cell Neurosci",
      volume: "13:103495",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/32298804"
    },
    {
      authors: "Taylor B, Adelaja A, Liu Y, Luecke S, Hoffmann A.",
      year: 2020,
      title: "Identification and physiological significance of temporal NFκB signaling codewords deployed by macrophages to classify immune threats",
      journal: "BioRxiv",
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
      journal: "Mol Metab",
      volume: "34:72-84",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/32180561"
    },
    {
      authors: "Bell BJ, Liu Q, Kim DW, Lee S, Liu Q, Blum I, Wang A, Bedont J, Chang A, Issa H, Cohen J, Blackshaw S, Wu MN.",
      year: 2020,
      title: "A Clock-Driven Neural Network Critical for Arousal",
      journal: "BioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/2020.03.12.989921v2"
    },
    {
      authors: "Kaku H, Rothstein TL.",
      year: 2020,
      title: "FAIM Is a Non-redundant Defender of Cellular Viability in the Face of Heat and Oxidative Stress and Interferes With Accumulation of Stress-Induced Protein Aggregates",
      journal: "Front Mol Biosci",
      volume: "7:32",
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
      journal: "Sci Immunol",
      volume: "5(44)",
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
      journal: "DNA Repair",
      volume: "85: 102737",
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
      authors: "Clarke BA, Majumder S, Zhu H, Lee YT, Kono M, Li C, Khanna C, Blain H, Schwartz R, Huso VL, Byrnes C, Tuymetova G, Dunn TM, Allende ML, Proia RL.",
      year: 2019,
      title: "The Ormdl genes regulate the sphingolipid synthesis pathway to ensure proper myelination and neurologic function in mice",
      journal: "Elife",
      volume: "8. pii: e51067",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/31880535"
    },
    {
      authors: "DelGiorno KE, Chung CY, Mauer HC, Novak SW, Giraddi RR, Wang D, Naeem RF, Fang L, Andrade LR, Lytle NK, Ali WH, Tsui C, Gubbala VB, Ridinger-Saison M, Ohmoto M, O’Connor C, Erikson GA, Shokhirev MN, Urade Y, Matsumoto I, Vavinskaya V, Singh PK, Manor U, Olive KP, Wahl GM.",
      year: 2019,
      title: "Tuft cells restrain pancreatic tumorigenesis through paracrine eicosanoid signaling",
      journal: "BioRxiv",
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
      journal: "Mitochondrion",
      volume: "49: 217-226",
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
      journal: "BioRxiv",
      volume: "",
      link: "https://www.biorxiv.org/content/10.1101/758151v1.abstract"
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
      authors: "Vila IK, Park MK, Setijono SR, Yao Y, Kim H, Badin PM, Choi S, Narkar V, Choi SW, Chung J, Moro C, Song SJ, Song MS.",
      year: 2019,
      title: "A muscle-specific UBE2O/AMPKα2 axis promotes insulin resistance and metabolic syndrome in obesity",
      journal: "JCI Insight",
      volume: "4(13). pii: 128269",
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
      journal: "BioRxiv",
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
      journal: "Metabolism",
      volume: "95:27-35",
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
      journal: "BioRxiv",
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
      journal: "JCI Insight",
      volume: "4(5). pii: 126663",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30721151"
    },
    {
      authors: "Hussain M, Mondal P, Song WJ.",
      year: 2019,
      title: "Compositions and methods for treating diabetes",
      journal: "US Patent",
      volume: "No.10220069B2",
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
      journal: "Free Radic Biol Med",
      volume: "133: 254-261",
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
      journal: "US Patent",
      volume: "No.10208049B2",
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
      journal: "US Patent Application",
      volume: "No.US2019/0029238 A1",
      link: "https://patentimages.storage.googleapis.com/7b/58/1e/b484814e486d8e/US20190029238A1.pdf"
    }
  ],
  "2018": [
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
      journal: "Sci Signal",
      volume: "11(560)",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/30538174"
    },
    {
      authors: "Pollak AJ, Liu C, Gudlur A, Mayfield JE, Dalton ND, Gu Y, Chen J, Heller Brown J, Hogan PG, Wiley SE, Peterson KL, Dixon JE.",
      year: 2018,
      title: "A secretory pathway kinase regulates sarcoplasmic reticulum Ca2+ homeostasis and protects against heart failure",
      journal: "Elife",
      volume: "7: e41378",
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
      authors: "Fazel Darbandi S, Robinson Schwartz SE, Qi Q, Catta-Preta R, Pai EL, Mandell JD,  Everitt A, Rubin A, Krasnoff RA, Katzman S, Tastad D, Nord AS, Willsey AJ, Chen B, State MW, Sohal VS, Rubenstein JLR.",
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
      journal: "BioRxiv",
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
      journal: "US Patent",
      volume: "No.10093932B2",
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
      journal: "US Patent",
      volume: "No.10,097,805 B2",
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
      journal: "US Patent Application",
      volume: "No.15/909322",
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
      authors: "Gale Jr MJ, Schnell G, Loo Y.",
      year: 2018,
      title: "Methods and Compositions for Activation of Innate Immune Responses Through RIG-I Like Receptor Signaling",
      journal: "US Patent Application",
      volume: "No.15/711934",
      link: "http://www.freepatentsonline.com/y2018/0104325.html"
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
      journal: "US Patent",
      volume: "No.20180064809A1",
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
      volume: "44:18091-18097",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28912269"
    },
    {
      authors: "Albertini E, Mayr E, Taferner A, Pircher H, Jansen-Duerr P, Von Grafenstein S, Kramer C, Liedl KR, Diener T, Metzger C.",
      year: 2017,
      title: "Uses of FAHD1",
      journal: "US Patent",
      volume: "No.20170312343A1",
      link: "https://patents.google.com/patent/US20170312343A1/en"
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
      authors: "Price NL, Rotllan N, Canfran-Duque A, Zhang X, Pati P, Arias N, Moen J, Mayr M, Ford DA, Baldan A,  Suárez Y, Fernández-Hernando C.",
      year: 2017,
      title: "Genetic Dissection of the Impact of miR-33a and miR-33b during the Progression of Atherosclerosis",
      journal: "Cell Rep",
      volume: "21: 1317-1330",
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
      journal: "Am J Physiol Renal Physiol",
      volume: "313(3) :F596-F602",
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
      authors: "Tischfield DJ, Saraswat DK, Furash A, Fowler SC, Fuccillo MV, Anderson SA.",
      year: 2017,
      title: "Loss of the neurodevelopmental gene Zswim6 alters striatal morphology and motor regulation",
      journal: "Neurobiol Dis",
      volume: "103: 174-183",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28433741"
    },
    {
      authors: "Bicker F, Vasic V, Horta G, Ortega F, Nolte H, Kavyanifar A, Keller S, Stankovic ND, Harter PN, Benedito R, Lutz B, Bauerle T, Hartwig J, Baumgart J, Kruger M, Radyushkin K, Alberi L, Berninger B, Schmidt MHH.",
      year: 2017,
      title: "Neurovascular EGFL7 regulates adult neurogenesis in the subventricular zone and thereby affects olfactory perception",
      journal: "Nat Commun",
      volume: "8: 15922",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28656980"
    },
    {
      authors: "Krivinko JM, Erickson SL, Abrahamson EE, Wills ZP, Ikonomovic MD, Penzes P, Sweet RA.",
      year: 2017,
      title: "Kalirin reduction rescues psychosis-associated behavioral deficits in APPswe/PSEN1dE9 transgenic mice",
      journal: "Neurobiol Aging",
      volume: "54: 59-70",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28319837"
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
      authors: "Tsvilovskyy V, Solis-Lopez A, Schumacher D, Medert R, Roers A, Kriebs U, Freichel M.",
      year: 2017,
      title: "Deletion of Orai2 augments endogenous CRAC currents and degranulation in mast cells leading to enhanced anaphylaxis",
      journal: "Cell Calcium",
      volume: "71: 24-33",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/29604961"
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
      authors: "Lentucci C, Belkina AC, Cederquist CT, Chan M, Johnson HE, Prasad S, Lopacinski A, Nikolajczyk BS, Monti S, Snyder-Cappione J, Tanasa B, Cardamone MD, Perissi V.",
      year: 2017,
      title: "Inhibition of Ubc13-mediated Ubiquitination by GPS2 Regulates Multiple Stages of B Cell Development",
      journal: "J Biol Chem",
      volume: "292(7): 2754-2772",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/28039360"
    }
  ],
  "2016": [
    {
      authors: "Shinohara K, Liu X, Morgan DA, Davis DR, Sequeira-Lopez ML, Cassell MD, Grobe JL, Rahmouni K, Sigmund CD.",
      year: 2016,
      title: "Selective Deletion of the Brain-Specific Isoform of Renin Causes Neurogenic Hypertension",
      journal: "Hypertension",
      volume: "68(6): 1385-1392",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27754863"
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
      authors: "Onaivi ES, Liu QR.",
      year: 2016,
      title: "Transgenic mice",
      journal: "WO Patent",
      volume: "No.2016137966A1",
      link: "https://patents.google.com/patent/WO2016137966A1/en"
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
      authors: "Legarda D, Justus SJ, Ang RL, Rikhi N, Li W, Moran TM, Zhang J, Mizoguchi E, Zelic M, Kelliher MA, Blander JM, Ting AT.",
      year: 2016,
      title: "CYLD Proteolysis Protects Macrophages from TNF-Mediated Auto-necroptosis Induced by LPS and Licensed by Type I IFN",
      journal: "Cell Rep",
      volume: "15(11): 2449-61",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27264187"
    },
    {
      authors: "Yang HQ, Foster MN, Jana K, Ho J, Rindler MJ, Coetzee WA.",
      year: 2016,
      title: "Plasticity of sarcolemmal KATP channel surface expression: relevance during ischemia and ischemic preconditioning",
      journal: "Am J Physiol Heart Circ Physiol",
      volume: "310H1558-66",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/27037371"
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
      authors: "Fujita Y, Makishima M, Bhawal UK.",
      year: 2016,
      title: "Differentiated embryo chondrocyte 1 (DEC1) is a novel negative regulator of hepatic fibroblast growth factor 21 (FGF21) in aging mice",
      journal: "Biochem Biophys Res Commun",
      volume: "269(3): 477-82",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26697751"
    },
    {
      authors: "Alavi MV, Mao M, PawKazerounian S, Ciarlini PD, Yuan D, Ghazvinian R, Alberich-Jorda M, Joshi M, Zhang H, Beggs AH, Gazda HT.",
      year: 2016,
      title: "Development of Soft Tissue Sarcomas in Ribosomal Proteins L5 and S24 Heterozygous Mice",
      journal: "J Cancer",
      volume: "7(1): 32-6",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26722357"
    }
  ],
  "2015": [
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
      authors: "Savant S, La Porta S, Budnik A, Busch K, Hu J, Tisch N, Korn C, Valls AF, Benest AV, Terhardt D, Qu X, Adams RH, Baldwin HS, Ruiz de Almodovar C, Rodewald HR, Augustin HG.",
      year: 2015,
      title: "The Orphan Receptor Tie1 Controls Angiogenesis and Vascular Remodeling by Differentially Regulating Tie2 in Tip and Stalk Cells",
      journal: "Cell Rep",
      volume: "12(11): 1761-73",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26344773"
    },
    {
      authors: "Huang L, Urtatiz O, Van Raamsdonk CD.",
      year: 2015,
      title: "Oncogenic G Protein GNAQ Induces Uveal Melanoma and Intravasation in Mice",
      journal: "Cancer Res",
      volume: "14:3229",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/26113083"
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
      authors: "Zhang N, Tsybovsky Y, Kolesnikov AV, Rozanowska M, Swider M, Schwartz SB, Stone EM, Palczewska G, Maeda A, Kefalov VJ, Jacobson SG, Cideciyan AV, Palczewski K.",
      year: 2015,
      title: "Protein misfolding and the pathogenesis of ABCA4-associated retinal degenerations",
      journal: "Hum Mol Genet",
      volume: "24(11): 3220-37",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25712131"
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
      authors: "Kevany BM, Zhang N, Jastrzebska B, Palczewski K.",
      year: 2015,
      title: "Animals deficient in C2Orf71, an autosomal recessive retinitis pigmentosa-associated locus, develop severe early-onset retinal degeneration",
      journal: "Hum Mol Genet",
      volume: "24(9): 2627-40",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25616964"
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
      authors: "Lindley LE, Curtis KM, Sanchez-Mejias A, Rieger ME, Robbins DJ, Briegel KJ.",
      year: 2015,
      title: "The WNT-controlled transcriptional regulator LBH is required for mammary stem cell expansion and maintenance of the basal lineage",
      journal: "Development",
      volume: "142(5): 893-904",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25655704"
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
      authors: "Kuper C, Beck FX, Neuhofer W.",
      year: 2015,
      title: "Generation of a conditional knockout allele for the NFAT5 gene in mice",
      journal: "Front Physiol",
      volume: "5: 507",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25601839"
    }
  ],
  "2014": [
    {
      authors: "Nishide K, Hirano T.",
      year: 2014,
      title: "Overlapping and non-overlapping functions of condensins I and II in neural stem cell divisions",
      journal: "PLoS Genet",
      volume: "10(12): e1004847",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25474630"
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
      authors: "Vaidya A, Mao Z, Tian X, Spencer B, Seluanov A, Gorbunova V.",
      year: 2014,
      title: "Knock-in reporter mice demonstrate that DNA repair by non-homologous end joining declines with age",
      journal: "PLoS Genet",
      volume: "10(7): e1l04511",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/25033455"
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
      authors: "Palczewski K, Maeda A, Golczak M.",
      year: 2014,
      title: "Compounds and methods of treating ocular disorders",
      journal: "US Patent",
      volume: "8722669B2",
      link: "https://patents.google.com/patent/US8722669B2/en"
    },
    {
      authors: "Ying G, Avasthi P, Irwin M, Gerstner CD, Frederick JM, Lucero MT, Baehr W.",
      year: 2014,
      title: "Centrin 2 is required for mouse olfactory ciliary trafficking and development of ependymal cilia planar polarity",
      journal: "J Neurosci",
      volume: "34(18): 6377-88",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24790208"
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
      authors: "Li L, Liu B, Wapinski OL, Tsai MC, Qu K, Zhang J, Carlson JC, Lin M, Fang F, Gupta RA, Helms JA, Chang HY.",
      year: 2013,
      title: "Targeted disruption of Hotair leads to homeotic transformation and gene derepression",
      journal: "Cell Rep",
      volume: "5(1): 3-12",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/24075995"
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
      authors: "Rahgozar K, Wright E, Carrithers LM, Carrithers MD.",
      year: 2013,
      title: "Mediation of protection and recovery from experimental autoimmune encephalomyelitis by macrophages expressing the human voltage-gated sodium channel NaV1.5",
      journal: "J Neuropathol Exp Neurol",
      volume: "72(6): 489-504",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/23656992"
    }
  ],
  "2012": [
    {
      authors: "Suthar MS, Ramos HJ, Brassil MM, Netland J, Chappell CP, Blahnik G, McMillan A, Diamond MS, Clark EA, Bevan MJ, Gale M Jr.",
      year: 2012,
      title: "The RIG-I-like receptor LGP2 controls CD8(+) T cell survival and fitness",
      journal: "Immunity",
      volume: "37(2): 235-48",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22841161"
    },
    {
      authors: "Rajadhyaksha AM, Ra S, Kishinevsky S, Lee AS, Romanienko P, DuBoff M, Yang C, Zupan B, Byrne M, Daruwalla ZR, Mark W, Kosofsky BE, Toth M, Higgins JJ.",
      year: 2012,
      title: "Behavioral characterization of cereblon forebrain-specific conditional null mice: a model for human non-syndromic intellectual disability",
      journal: "Behav Brain Res",
      volume: "226(2): 428-34",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21995942"
    }
  ],
  "2011": [
    {
      authors: "Milosevic I, Giovedi S, Lou X, Raimondi A, Collesi C, Shen H, Paradise S, O’Toole E, Ferguson S, Cremona O, De Camilli P.",
      year: 2011,
      title: "Recruitment of endophilin to clathrin-coated pit necks is required for efficient vesicle uncoating after fission",
      journal: "Neuron",
      volume: "72(4): 587-601",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/22099461"
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
      authors: "Sabharwal P, Lee C, Park S, Rao M, Sockanathan S.",
      year: 2011,
      title: "GDE2 regulates subtype-specific motor neuron generation through inhibition of Notch signaling",
      journal: "Neuron",
      volume: "71(6): 1058-70",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21943603"
    },
    {
      authors: "Chapman HA, Li X, Alexander JP, Brumwell A, Lorizio W, Tan K, Sonnenberg A, Wei Y, Vu TH.",
      year: 2011,
      title: "Integrin alpha6beta4 identifies an adult distal lung epithelial population with regenerative potential in mice",
      journal: "J Clin Invest",
      volume: "121: 2855-2862",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21701069"
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
      authors: "Suzuki-Hirano A, Ogawa M, Kataoka A, Yoshida AC, Itoh D, Ueno M, Blackshaw S, Shimogori T.",
      year: 2011,
      title: "Dynamic spatiotemporal gene expression in embryonic mouse thalamus",
      journal: "J Comp Neurol",
      volume: "519(3): 528-43",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21192082"
    },
    {
      authors: "de Beer MC, Ji A, Jahangiri A, Vaughan AM, de Beer FC, van der Westhuyzen DR, Webb NR.",
      year: 2011,
      title: "ATP binding cassette G1-dependent cholesterol efflux during inflammation",
      journal: "J Lipid Res",
      volume: "52(2): 345-53",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21138980"
    }
  ],
  "2010": [
    {
      authors: "Ryazanova LV, Rondon LJ, Zierler S, Hu Z, Galli J, Yamaguchi TP, Mazur A, Fleig A, Ryazanov AG.",
      year: 2010,
      title: "TRPM7 is essential for Mg(2+) homeostasis in mammals",
      journal: "Nat Commun",
      volume: "1: 109",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/21045827"
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
      authors: "Shridas P, Bailey WM, Gizard F, Oslund RC, Gelb MH, Bruemmer D, Webb NR.",
      year: 2010,
      title: "Group X secretory phospholipase A2 negatively regulates ABCA1 and ABCG1 expression and cholesterol efflux in macrophages",
      journal: "Arterioscler Thromb Vasc Biol",
      volume: "30(10): 2014-21",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20844270"
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
      authors: "Shridas P, Bailey WM, Boyanovsky BB, Oslund RC, Gelb MH, Webb NR.",
      year: 2010,
      title: "Group X secretory phospholipase A2 regulates the expression of steroidogenic acute regulatory protein (StAR) in mouse adrenal glands",
      journal: "J Biol Chem",
      volume: "285(26): 20031-9",
      link: "https://www.ncbi.nlm.nih.gov/pubmed/20421306"
    }
  ],
  "2009": [
    {
      authors: "Zhang Y, Molday LL, Molday RS, Sarfare SS, Woodruff ML, Fain GL, Kraft TW, Pittler SJ.",
      year: 2009,
      title: "Knockout of GARPs and the beta-subunit of the rod cGMP-gated channel disrupts disk morphogenesis and rod outer segment structural integrity",
      journal: "J Cell Sci",
      volume: "122: 1192-1200",
      link: "https://pubmed.ncbi.nlm.nih.gov/19339551/"
    },
    {
      authors: "Weinreich MA, Takada K, Skon C, Reiner SL, Jameson SC, Hogquist KA.",
      year: 2009,
      title: "KLF2 transcription-factor deficiency in T cells results in unrestrained cytokine production and upregulation of bystander chemokine receptors",
      journal: "Immunity",
      volume: "31: 122-130",
      link: "https://pubmed.ncbi.nlm.nih.gov/19592277/"
    },
    {
      authors: "Uchimura A, Hidaka Y, Hirabayashi T, Hirabayashi M, Yagi T.",
      year: 2009,
      title: "DNA polymerase delta is required for early mammalian embryogenesis",
      journal: "PLoS One",
      volume: "4: e4184",
      link: "https://pubmed.ncbi.nlm.nih.gov/19145245/"
    },
    {
      authors: "Saint Fleur S, Hoshino A, Kondo K, Egawa T, Fujii H.",
      year: 2009,
      title: "Regulation of Fas-mediated immune homeostasis by an activation-induced protein, Cyclon",
      journal: "Blood",
      volume: "114: 1355-1365",
      link: "https://pubmed.ncbi.nlm.nih.gov/19528538/"
    },
    {
      authors: "Robling AG, Childress P, Yu J, Cotte J, Heller A, Philip BK, Bidwell JP.",
      year: 2009,
      title: "Nmp4/CIZ suppresses parathyroid hormone-induced increases in trabecular bone",
      journal: "J Cell Physiol",
      volume: "219: 734-743",
      link: "https://pubmed.ncbi.nlm.nih.gov/19189321/"
    },
    {
      authors: "Miyagoe-Suzuki Y, Masubuchi N, Miyamoto K, Wada MR, Yuasa S, Saito F, Matsumura K, Kanesaki H, Kudo A, Manya H, Endo T, Takeda S.",
      year: 2009,
      title: "Reduced proliferative activity of primary POMGnT1-null myoblasts in vitro",
      journal: "Mech Dev",
      volume: "126: 107-116",
      link: "https://pubmed.ncbi.nlm.nih.gov/19114101/"
    },
    {
      authors: "Liu J, Zhang H, Li Z, Hailemariam TK, Chakraborty M, Jiang K, Qiu D, Bui HH, Peake DA, Kuo MS, Wadgaonkar R, Cao G, Jiang XC.",
      year: 2009,
      title: "Sphingomyelin synthase 2 is one of the determinants for plasma and liver sphingomyelin levels in mice",
      journal: "Arterioscler Thromb Vasc Biol",
      volume: "29: 850-856",
      link: "https://pubmed.ncbi.nlm.nih.gov/19286635/"
    },
    {
      authors: "Hoover RG, Gullickson G, Kornbluth J.",
      year: 2009,
      title: "Impaired NK cytolytic activity and enhanced tumor growth in NK lytic-associated molecule-deficient mice",
      journal: "J Immunol",
      volume: "183: 6913-6921",
      link: "https://pubmed.ncbi.nlm.nih.gov/19915045/"
    },
    {
      authors: "Festing MH, Speer MY, Yang HY, Giachelli CM.",
      year: 2009,
      title: "Generation of mouse conditional and null alleles of the type III sodium-dependent phosphate cotransporter PiT-1",
      journal: "Genesis",
      volume: "47: 858-863",
      link: "https://pubmed.ncbi.nlm.nih.gov/19882669/"
    },
    {
      authors: "Amleh A, Nair SJ, Sun J, Sutherland A, Hasty P, Li R.",
      year: 2009,
      title: "Mouse cofactor of BRCA1 (Cobra1) is required for early embryogenesis",
      journal: "PLoS One",
      volume: "4: e5034",
      link: "https://pubmed.ncbi.nlm.nih.gov/19340312/"
    }
  ],
  "2008": [
    {
      authors: "Zhang J, Li J, Huang C, Xue L, Peng Y, Fu Q, Gao L, Zhang J, Li W.",
      year: 2008,
      title: "Targeted knockout of the mouse betaB2-crystallin gene (Crybb2) induces age-related cataract",
      journal: "Invest Ophthalmol Vis Sci",
      volume: "49: 5476-5483",
      link: "https://pubmed.ncbi.nlm.nih.gov/18719080/"
    },
    {
      authors: "Makino CL, Peshenko IV, Wen XH, Olshevskaya EV, Barrett R, Dizhoor AM.",
      year: 2008,
      title: "A role for GCAP2 in regulating the photoresponse. Guanylyl cyclase activation and rod electrophysiology in GUCA1B knock-out mice",
      journal: "J Biol Chem",
      volume: "283: 29135-29143",
      link: "https://pubmed.ncbi.nlm.nih.gov/18723510/"
    },
    {
      authors: "Yang G, Wu L, Jiang B, Yang W, Qi J, Cao K, Meng Q, Mustafa AK, Mu W, Zhang S et al.",
      year: 2008,
      title: "H2S as a physiologic vasorelaxant: hypertension in mice with deletion of cystathionine gamma-lyase",
      journal: "Science",
      volume: "322: 587-590",
      link: "https://pubmed.ncbi.nlm.nih.gov/18948540/"
    },
    {
      authors: "Maeda A, Maeda T, Golczak M, Palczewski K.",
      year: 2008,
      title: "Retinopathy in mice induced by disrupted all-trans-retinal clearance",
      journal: "J Biol Chem",
      volume: "283: 26684-26693",
      link: "https://pubmed.ncbi.nlm.nih.gov/18658157/"
    },
    {
      authors: "Imanishi Y, Sun W, Maeda T, Maeda A, Palczewski K.",
      year: 2008,
      title: "Retinyl ester homeostasis in the adipose differentiation-related protein-deficient retina",
      journal: "J Biol Chem",
      volume: "283: 25091-25102",
      link: "https://pubmed.ncbi.nlm.nih.gov/18606814/"
    },
    {
      authors: "Nikonov SS, Brown BM, Davis JA, Zuniga FI, Bragin A, Pugh EN, Jr., Craft CM.",
      year: 2008,
      title: "Mouse cones require an arrestin for normal inactivation of phototransduction",
      journal: "Neuron",
      volume: "59(3): 462-74",
      link: "https://pubmed.ncbi.nlm.nih.gov/18701071/"
    },
    {
      authors: "Hailemariam TK, Huan C, Liu J, Li Z, Roman C, Kalbfeisch M, Bui HH, Peake DA, Kuo MS, Cao G, Wadgaonkar R, Jiang XC.",
      year: 2008,
      title: "Sphingomyelin synthase 2 deficiency attenuates NFkappaB activation",
      journal: "Arterioscler Thromb Vasc Biol",
      volume: "28: 1519-1526",
      link: "https://pubmed.ncbi.nlm.nih.gov/18566297/"
    },
    {
      authors: "Suzuki Y, Kovacs CS, Takanaga H, Peng JB, Landowski CP, Hediger MA.",
      year: 2008,
      title: "Calcium channel TRPV6 is involved in murine maternal-fetal calcium transport",
      journal: "J Bone Miner Res",
      volume: "23: 1249-1256",
      link: "https://pubmed.ncbi.nlm.nih.gov/18348695/"
    },
    {
      authors: "Luke Y, Zaim H, Karakesisoglou I, Jaeger VM, Sellin L, Lu W, Schneider M, Neumann S, Beijer A, Munck M, Padmakumar VC, Gloy J, Walz G, Noegel AA.",
      year: 2008,
      title: "Nesprin-2 Giant (NUANCE) maintains nuclear envelope architecture and composition in skin",
      journal: "J Cell Sci",
      volume: "121: 1887-1898",
      link: "https://pubmed.ncbi.nlm.nih.gov/18477613/"
    },
    {
      authors: "Nakashima A, Kawamoto T, Honda KK, Ueshima T, Noshiro M, Iwata T, Fujimoto K, Kubo H, Honma S, Yorioka N, Kohno N, Kato Y.",
      year: 2008,
      title: "DEC1 modulates the circadian phase of clock gene expression",
      journal: "Mol Cell Biol",
      volume: "28: 4080-4092",
      link: "https://pubmed.ncbi.nlm.nih.gov/18411297/"
    },
    {
      authors: "Arikketh D, Nelson R, Vance JE.",
      year: 2008,
      title: "Defining the importance of phosphatidylserine synthase-1 (PSS1): unexpected viability of PSS1-deficient mice",
      journal: "J Biol Chem",
      volume: "283: 12888-12897",
      link: "https://pubmed.ncbi.nlm.nih.gov/18343815/"
    },
    {
      authors: "Joesting MS, Cheever TR, Volzing KG, Yamaguchi TP, Wolf V, Naf D, Rubin JS, Marker PC.",
      year: 2008,
      title: "Secreted frizzled related protein 1 is a paracrine modulator of epithelial branching morphogenesis, proliferation, and secretory gene expression in the prostate",
      journal: "Dev Biol",
      volume: "317: 161-173",
      link: "https://pubmed.ncbi.nlm.nih.gov/18371946/"
    },
    {
      authors: "Golczak M, Maeda A, Bereta G, Maeda T, Kiser PD, Hunzelmann S, von Lintig J, Blaner WS, Palczewski K.",
      year: 2008,
      title: "Metabolic basis of visual cycle inhibition by retinoid and nonretinoid compounds in the vertebrate retina",
      journal: "J Biol Chem",
      volume: "283(15): 9543-54",
      link: "https://pubmed.ncbi.nlm.nih.gov/18195010/"
    },
    {
      authors: "Monks J, Smith-Steinhart C, Kruk ER, Fadok VA, Henson PM.",
      year: 2008,
      title: "Epithelial cells remove apoptotic epithelial cells during post-lactation involution of the mouse mammary gland",
      journal: "Biol Reprod",
      volume: "78: 586-594",
      link: "https://pubmed.ncbi.nlm.nih.gov/18057312/"
    },
    {
      authors: "Jordan MS, Smith JE, Burns JC, Austin JE, Nichols KE, Aschenbrenner AC, Koretzky GA.",
      year: 2008,
      title: "Complementation in trans of altered thymocyte development in mice expressing mutant forms of the adaptor molecule SLP76",
      journal: "Immunity",
      volume: "28: 359-369",
      link: "https://pubmed.ncbi.nlm.nih.gov/18342008/"
    },
    {
      authors: "Edwin F, Patel TB.",
      year: 2008,
      title: "A novel role of Sprouty 2 in regulating cellular apoptosis",
      journal: "J Biol Chem",
      volume: "283: 3181-3190",
      link: "https://pubmed.ncbi.nlm.nih.gov/18070883/"
    },
    {
      authors: "Beliakoff J, Lee J, Ueno H, Aiyer A, Weissman IL, Barsh GS, Cardiff RD, Sun Z.",
      year: 2008,
      title: "The PIAS-like protein Zimp10 is essential for embryonic viability and proper vascular development",
      journal: "Mol Cell Biol",
      volume: "28: 282-292",
      link: "https://pubmed.ncbi.nlm.nih.gov/17967885/"
    }
  ],
  "2007": [
    {
      authors: "Anderson GR, Lujan R, Semenov A, Pravetoni M, Posokhova EN, Song JH, Uversky V, Chen CK, Wickman K, Martemyanov KA.",
      year: 2007,
      title: "Expression and localization of RGS9-2/G 5/R7BP complex in vivo is set by dynamic control of its constitutive degradation by cellular cysteine proteases",
      journal: "J Neurosci",
      volume: "27: 14117-14127",
      link: "https://pubmed.ncbi.nlm.nih.gov/18094251/"
    },
    {
      authors: "Baertschi S, Zhuang L, Trueb B.",
      year: 2007,
      title: "Mice with a targeted disruption of the Fgfrl1 gene die at birth due to alterations in the diaphragm",
      journal: "FEBS J",
      volume: "274: 6241-6253",
      link: "https://pubmed.ncbi.nlm.nih.gov/17986259/"
    },
    {
      authors: "Malicdan MC, Noguchi S, Nonaka I, Hayashi YK, Nishino I.",
      year: 2007,
      title: "A Gne knockout mouse expressing human GNE D176V mutation develops features similar to distal myopathy with rimmed vacuoles or hereditary inclusion body myopathy",
      journal: "Hum Mol Genet",
      volume: "16: 2669-2682",
      link: "https://pubmed.ncbi.nlm.nih.gov/17704511/"
    },
    {
      authors: "Ding C, Liu Y, Wang Y, Park BK, Wang CY, Zheng P, Liu Y.",
      year: 2007,
      title: "Siglecg limits the size of B1a B cell lineage by down-regulating NFkappaB activation",
      journal: "PLoS One",
      volume: "2: e997",
      link: "https://pubmed.ncbi.nlm.nih.gov/17912374/"
    },
    {
      authors: "Krispel CM, Sokolov M, Chen YM, Song H, Herrmann R, Arshavsky VY, Burns ME.",
      year: 2007,
      title: "Phosducin regulates the expression of transducin betagamma subunits in rod photoreceptors and does not contribute to phototransduction adaptation",
      journal: "J Gen Physiol",
      volume: "130: 303-312",
      link: "https://pubmed.ncbi.nlm.nih.gov/17724163/"
    },
    {
      authors: "Garcia-Gonzalez MA, Menezes LF, Piontek KB, Kaimori J, Huso DL, Watnick T, Onuchic LF, Guay-Woodford LM, Germino GG.",
      year: 2007,
      title: "Genetic interaction studies link autosomal dominant and recessive polycystic kidney disease in a common pathway",
      journal: "Hum Mol Genet",
      volume: "16: 1940-1950",
      link: "https://pubmed.ncbi.nlm.nih.gov/17575307/"
    },
    {
      authors: "Chen H, McCaffery JM, Chan DC.",
      year: 2007,
      title: "Mitochondrial fusion protects against neurodegeneration in the cerebellum",
      journal: "Cell",
      volume: "130: 548-562",
      link: "https://pubmed.ncbi.nlm.nih.gov/17693261/"
    },
    {
      authors: "Mei Y, Thompson MD, Shiraishi Y, Cohen RA, Tong X, Lu J, Lian G, Lenkinski R, De Grand A, Vaid RR, Bryce T, Stasenko M, Boskey A, Walsh C, Sheen V.",
      year: 2007,
      title: "Filamin B mutations cause chondrocyte defects in skeletal development",
      journal: "Hum Mol Genet",
      volume: "16: 1661-1675",
      link: "https://pubmed.ncbi.nlm.nih.gov/17510210/"
    },
    {
      authors: "Fullerton MD, Hakimuddin F, Bakovic M.",
      year: 2007,
      title: "Developmental and metabolic effects of disruption of the mouse CTP:phosphoethanolamine cytidylyltransferase gene (Pcyt2)",
      journal: "Mol Cell Biol",
      volume: "27: 3327-3336",
      link: "https://pubmed.ncbi.nlm.nih.gov/17325045/"
    }
  ],
  "2006": [
    {
      authors: "Zhang S, Shi M, Hui CC, Rommens JM.",
      year: 2006,
      title: "Loss of the mouse ortholog of the shwachman-diamond syndrome gene (Sbds) results in early embryonic lethality",
      journal: "Mol Cell Biol",
      volume: "26: 6656-6663",
      link: "https://pubmed.ncbi.nlm.nih.gov/16914746/"
    },
    {
      authors: "Xu J, Lee WN, Phan J, Saad MF, Reue K, Kurland IJ.",
      year: 2006,
      title: "Lipin deficiency impairs diurnal metabolic fuel switching",
      journal: "Diabetes",
      volume: "55: 3429-3438",
      link: "https://pubmed.ncbi.nlm.nih.gov/17130489/"
    },
    {
      authors: "Vives V, Su J, Zhong S, Ratnayaka I, Slee E, Goldin R, Lu X.",
      year: 2006,
      title: "ASPP2 is a haploinsufficient tumor suppressor that cooperates with p53 to suppress tumor growth",
      journal: "Genes Dev",
      volume: "20: 1262-1267",
      link: "https://pubmed.ncbi.nlm.nih.gov/16702401/"
    },
    {
      authors: "Vasireddy V, Jablonski MM, Mandal MN, Raz-Prag D, Wang XF, Nizol L, Iannaccone A, Musch DC, Bush RA, Salem N, Jr., Sieving PA, Ayyagari R.",
      year: 2006,
      title: "Elovl4 5-bp-deletion knock-in mice develop progressive photoreceptor degeneration",
      journal: "Invest Ophthalmol Vis Sci",
      volume: "47: 4558-4568",
      link: "https://pubmed.ncbi.nlm.nih.gov/17003453/"
    },
    {
      authors: "Park JM, Kohn MJ, Bruinsma MW, Vech C, Intine RV, Fuhrmann S, Grinberg A, Mukherjee I, Love PE, Ko MS, DePamphilis ML, Maraia RJ.",
      year: 2006,
      title: "The multifunctional RNA-binding protein La is required for mouse development and for the establishment of embryonic stem cells",
      journal: "Mol Cell Biol",
      volume: "26: 1445-1451",
      link: "https://pubmed.ncbi.nlm.nih.gov/16449655/"
    },
    {
      authors: "Nanda A, Karim B, Peng Z, Liu G, Qiu W, Gan C, Vogelstein B, St Croix B, Kinzler KW, Huso DL.",
      year: 2006,
      title: "Tumor endothelial marker 1 (Tem1) functions in the growth and progression of abdominal tumors",
      journal: "Proc Natl Acad Sci U S A",
      volume: "103: 3351-3356",
      link: "https://pubmed.ncbi.nlm.nih.gov/16492758/"
    },
    {
      authors: "McVay LD, Keilbaugh SA, Wong TM, Kierstein S, Shin ME, Lehrke M, Lefterova MI, Shifflett DE, Barnes SL, Cominelli F, Cohn SM, Hecht G, Lazar MA, Haczku A, Wu GD.",
      year: 2006,
      title: "Absence of bacterially induced RELMbeta reduces injury in the dextran sodium sulfate model of colitis",
      journal: "J Clin Invest",
      volume: "116: 2914-2923",
      link: "https://pubmed.ncbi.nlm.nih.gov/17024245/"
    },
    {
      authors: "Maeda A, Maeda T, Imanishi Y, Sun W, Jastrzebska B, Hatala DA, Winkens HJ, Hofmann KP, Janssen JJ, Baehr W, Driessen CA, Palczewski K.",
      year: 2006,
      title: "Retinol dehydrogenase (RDH12) protects photoreceptors from light-induced degeneration in mice",
      journal: "J Biol Chem",
      volume: "281: 37697-37704",
      link: "https://pubmed.ncbi.nlm.nih.gov/17032653/"
    },
    {
      authors: "Kim KI, Yan M, Malakhova O, Luo JK, Shen MF, Zou W, de la Torre JC, Zhang DE.",
      year: 2006,
      title: "Ube1L and protein ISGylation are not essential for alpha/beta interferon signaling",
      journal: "Mol Cell Biol",
      volume: "26: 472-479",
      link: "https://pubmed.ncbi.nlm.nih.gov/16382139/"
    },
    {
      authors: "Faria AM, Levay A, Wang Y, Kamphorst AO, Rosa ML, Nussenzveig DR, Balkan W, Chook YM, Levy DE, Fontoura BM.",
      year: 2006,
      title: "The nucleoporin Nup96 is required for proper expression of interferon-regulated proteins and functions",
      journal: "Immunity",
      volume: "24: 295-304",
      link: "https://pubmed.ncbi.nlm.nih.gov/16546098/"
    },
    {
      authors: "Dalkilic I, Schienda J, Thompson TG, Kunkel LM.",
      year: 2006,
      title: "Loss of FilaminC (FLNc) results in severe defects in myogenesis and myotube structure",
      journal: "Mol Cell Biol",
      volume: "26: 6522-6534",
      link: "https://pubmed.ncbi.nlm.nih.gov/16914736/"
    }
  ],
  "2005": [
    {
      authors: "Shen J, Walsh CA.",
      year: 2005,
      title: "Targeted disruption of Tgif, the mouse ortholog of a human holoprosencephaly gene, does not result in holoprosencephaly in mice",
      journal: "Mol Cell Biol",
      volume: "25: 3639-3647",
      link: "https://pubmed.ncbi.nlm.nih.gov/15831469/"
    },
    {
      authors: "Chesney J, Telang S, Yalcin A, Clem A, Wallis N, Bucala R.",
      year: 2005,
      title: "Targeted disruption of inducible 6-phosphofructo-2-kinase results in embryonic lethality",
      journal: "Biochem Biophys Res Commun",
      volume: "331: 139-146",
      link: "https://pubmed.ncbi.nlm.nih.gov/15845370/"
    }
  ],
  "2004": [
    {
      authors: "Zeng Y, Takada Y, Kjellstrom S, Hiriyanna K, Tanikawa A, Wawrousek E, Smaoui N, Caruso R, Bush RA, Sieving PA.",
      year: 2004,
      title: "RS-1 Gene Delivery to an Adult Rs1h Knockout Mouse Model Restores ERG b-Wave with Reversal of the Electronegative Waveform of X-Linked Retinoschisis",
      journal: "Invest Ophthalmol Vis Sci",
      volume: "45: 3279-3285",
      link: "https://pubmed.ncbi.nlm.nih.gov/15326152/"
    },
    {
      authors: "Utku N, Boerner A, Tomschegg A, Bennai-Sanfourche F, Bulwin GC, Heinemann T, Loehler J, Blumberg RS, Volk HD.",
      year: 2004,
      title: "TIRC7 deficiency causes in vitro and in vivo augmentation of T and B cell activation and cytokine response",
      journal: "J Immunol",
      volume: "173: 2342-2352",
      link: "https://pubmed.ncbi.nlm.nih.gov/15294947/"
    },
    {
      authors: "Uda M, Ottolenghi C, Crisponi L, Garcia JE, Deiana M, Kimber W, Forabosco A, Cao A, Schlessinger D, Pilia G.",
      year: 2004,
      title: "Foxl2 disruption causes mouse ovarian failure by pervasive blockage of follicle development",
      journal: "Hum Mol Genet",
      volume: "13: 1171-1181",
      link: "https://pubmed.ncbi.nlm.nih.gov/15056605/"
    },
    {
      authors: "Sokolov M, Strissel KJ, Leskov IB, Michaud NA, Govardovskii VI, Arshavsky VY.",
      year: 2004,
      title: "Phosducin facilitates light-driven transducin translocation in rod photoreceptors. Evidence from the phosducin knockout mouse",
      journal: "J Biol Chem",
      volume: "279: 19149-19156",
      link: "https://pubmed.ncbi.nlm.nih.gov/14973130/"
    },
    {
      authors: "Ogg SL, Weldon AK, Dobbie L, Smith AJ, Mather IH.",
      year: 2004,
      title: "Expression of butyrophilin (Btn1a1) in lactating mammary gland is essential for the regulated secretion of milk-lipid droplets",
      journal: "Proc Natl Acad Sci U S A",
      volume: "101: 10084-10089",
      link: "https://pubmed.ncbi.nlm.nih.gov/15226505/"
    },
    {
      authors: "Batten ML, Imanishi Y, Maeda T, Tu DC, Moise AR, Bronson D, Possin D, Van Gelder RN, Baehr W, Palczewski K.",
      year: 2004,
      title: "Lecithin-retinol acyltransferase is essential for accumulation of all-trans-retinyl esters in the eye and in the liver",
      journal: "J Biol Chem",
      volume: "279: 10422-10432",
      link: "https://pubmed.ncbi.nlm.nih.gov/14684738/"
    }
  ],
  "2003": [
    {
      authors: "Muller AJ, Baker JF, DuHadaway JB, Ge K, Farmer G, Donover PS, Meade R, Reid C, Grzanna R, Roach AH, Shah N, Soler AP, Prendergast GC.",
      year: 2003,
      title: "Targeted disruption of the murine Bin1/Amphiphysin II gene does not disable endocytosis but results in embryonic cardiomyopathy with aberrant myofibril formation",
      journal: "Mol Cell Biol",
      volume: "23: 4295-4306",
      link: "https://pubmed.ncbi.nlm.nih.gov/12773571/"
    }
  ],
  "2001": [
    {
      authors: "Peterson EJ, Woods ML, Dmowski SA, Derimanov G, Jordan MS, Wu JN, Myung PS, Liu QH, Pribila JT, Freedman BD, Shimizu Y, Koretzky GA.",
      year: 2001,
      title: "Coupling of the TCR to integrin activation by Slap-130/Fyb",
      journal: "Science",
      volume: "293: 2263-2265",
      link: "https://pubmed.ncbi.nlm.nih.gov/11567141/"
    }
  ]
};

// Helper function to get all years sorted in descending order
export const getYears = (): string[] => {
  return Object.keys(publicationsByYear).sort((a, b) => parseInt(b) - parseInt(a));
};

// Helper function to get total publication count
export const getTotalPublicationCount = (): number => {
  return Object.values(publicationsByYear).reduce((total, pubs) => total + pubs.length, 0);
};

// Helper function to search publications
export const searchPublications = (query: string): Publication[] => {
  const lowerQuery = query.toLowerCase();
  const results: Publication[] = [];
  
  Object.values(publicationsByYear).forEach(pubs => {
    pubs.forEach(pub => {
      if (
        pub.authors.toLowerCase().includes(lowerQuery) ||
        pub.title.toLowerCase().includes(lowerQuery) ||
        pub.journal.toLowerCase().includes(lowerQuery)
      ) {
        results.push(pub);
      }
    });
  });
  
  return results;
};
