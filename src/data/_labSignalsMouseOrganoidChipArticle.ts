/**
 * Lab Signals article body: mouse models, organoids, and organ on chip (imported by newsletterArticles.ts).
 */
export const mouseOrganoidChipArticleBody = `<p>There is no dispute that organoids and organ on chip systems have earned their place in the preclinical toolkit. They bring human relevant biology to the bench and, in specific contexts, they outperform traditional cell culture by a wide margin. But a narrative has taken hold in some corners of the field that these platforms are poised to replace mouse models altogether. The recent literature tells a more nuanced story. The most robust strategies use all three, but recognize that <strong>in vivo</strong> models remain the only practical experimental whole organism.</p>

<p>When carefully looking at what organoids and chips have actually delivered in peer reviewed studies, and where they have hit hard limits, the picture that emerges is not one of displacement. It is one of complementarity, with <strong>in vivo</strong> models still doing the work that nothing else can. This post walks through recent, disease specific examples to make that case concrete.</p>

<h3>Three platforms: three levels of biology</h3>

<p>Before diving into the literature, here is a snapshot of what each platform can and cannot do today:</p>

<table><thead><tr><th>Preclinical need</th><th>Mouse models</th><th>Organoids</th><th>Organ on chip</th></tr></thead><tbody>
<tr><td>Whole body PK/PD and ADME</td><td>Yes – full organism</td><td>No</td><td>Partial (1 to 2 organs)</td></tr>
<tr><td>Multi organ toxicity</td><td>Yes – systemic</td><td>No</td><td>Very limited</td></tr>
<tr><td>Human specific cell biology</td><td>Indirect (humanized)</td><td>Yes</td><td>Yes</td></tr>
<tr><td>Chronic disease (months to years)</td><td>Yes</td><td>Limited (weeks)</td><td>Limited (days to weeks)</td></tr>
<tr><td>Throughput / screening</td><td>Low</td><td>Medium to high</td><td>Low to medium</td></tr>
<tr><td>Integrated immune response</td><td>Yes – full system</td><td>Partial (co culture)</td><td>Partial (circulating cells)</td></tr>
</tbody></table>

<h3>Organoids: powerful organ level models, not whole body systems</h3>

<p>Patient derived organoids have become genuinely useful for one specific task: predicting whether a given drug will work in a given patient’s tumor. The evidence is strongest in oncology.</p>

<p>The OPTIC trial, published in <em>Clinical Cancer Research</em> in 2025, was a multicenter prospective study that generated organoids from metastatic colorectal cancer biopsies, then screened them against a seven drug panel before patients started treatment. Organoid sensitivity predicted radiological tumor response and progression free survival, particularly for oxaliplatin based regimens.<sup>[1]</sup> This was a meaningful step forward; earlier PDO (patient derived organoid) studies were mostly retrospective and used surgical specimens rather than needle biopsies. OPTIC showed the approach works under realistic clinical conditions.</p>

<p>In neuro oncology, Peng <em>et al.</em> took a different route: they embedded fresh tumor explants into iPSC derived cerebral organoids to preserve the full tumor ecosystem, including stromal cells and vasculature. Published in <em>Cell Stem Cell</em> in 2025, these individualized patient tumor organoids (IPTOs) maintained the cellular diversity and molecular pathology of the parental tumors and, in a prospective component, predicted patient responses to chemotherapy and targeted therapy across adult glioblastoma multiforme, pediatric tumors, and brain metastases.<sup>[2]</sup></p>

<p>Hepatobiliary and pancreatic cancers have followed a similar trajectory. A 2025 review in the <em>World Journal of Gastroenterology</em> aggregated data showing PDO establishment rates above 70% for these cancers, with drug response predictive accuracy exceeding 90%.<sup>[3]</sup> For cancers with 5 year survival rates of 13 to 22%, the ability to screen drugs <em>ex vivo</em> before committing a patient to a regimen has obvious clinical value.</p>

<p>But here is the part that tends to get glossed over. Organoids still lack functional vasculature; once they grow beyond a few hundred microns, the interior becomes hypoxic and necrotic.<sup>[4]</sup> They lack intact immune compartments. They cannot model circulation, hormonal feedback, or the crosstalk between organs that shapes systemic drug exposure.<sup>[5]</sup> The FDA recognized organoids as New Alternative Methods under the Modernization Act 2.0 in 2022,<sup>[6]</sup> but that designation supplements, rather than replaces, <strong>in vivo</strong> requirements. Organoids answer patient level and organ level questions. They do not answer organism level ones.</p>

<h3>Organ on chip: microenvironment experts, not full body replacements</h3>

<p>Chips excel in a different niche: modeling the microenvironment of a specific organ under dynamic, physiologically relevant conditions. The strongest recent evidence comes from liver toxicology and respiratory infection.</p>

<p>Ewart <em>et al.</em> published one of the most, if not the most, comprehensive chip validation study to date in <em>Communications Medicine</em> (2022), analyzing 870 Liver Chips against IQ consortium benchmark compounds. With two human donors and protein binding corrections, the Liver Chip detected drug induced liver injury (DILI) with 87% sensitivity for compounds that conventional preclinical workflows had missed entirely.<sup>[7]</sup> In September 2024, the FDA’s ISTAND (Innovative Science and Technology Approaches for New Drugs) program accepted the first letter of intent for a Liver Chip as a drug development tool for DILI assessment.<sup>[8]</sup></p>

<p>During COVID 19, Si <em>et al.</em> demonstrated in <em>Nature Biomedical Engineering</em> (2021) that a human airway on chip could model SARS CoV 2 infection with greater fidelity than static cell lines. The chip recapitulated viral infection, strain dependent virulence, and immune cell recruitment. More importantly, it correctly showed that hydroxychloroquine, which looked promising in cell lines, did not inhibit infection at clinically relevant doses, while amodiaquine did.<sup>[9]</sup> That kind of pharmacologically grounded filtering is where chips add real value.</p>

<p>Meyer <em>et al.</em> (2024) pushed the durability envelope with a high throughput liver chip that maintained function for 28 days and detected hepatotoxicity from acetaminophen and fialuridine at micromolar concentrations rather than the millimolar levels needed in static culture.<sup>[10]</sup> That 28 day window matters, because idiosyncratic DILI often requires prolonged exposure for damage to be noticeable.</p>

<p>Still, the limitations are real. Most chip platforms remain low to medium throughput. Duration is typically days to weeks. Multi organ configurations exist, but they cannot reproduce the redundancy and feedback loops of a living system. A recent analysis in <em>Nature Communications</em> by Ingber and colleagues identified standardization, scalability, and cost as the primary barriers to broader adoption.<sup>[11]</sup> Chips refine mechanistic understanding within a defined organ context. They do not replicate systemic biology.</p>

<h3>Why mouse models remain essential: evidence from recent studies</h3>

<p>If the case for organoids and chips rests on what they can do within their scope, the case for mouse models rests on what nothing else can do at all. Three areas stand out in the recent literature.</p>

<h4>Neurodegeneration: the semaglutide story</h4>

<p>The GLP 1 (glucagon like peptide 1) agonist semaglutide offers a case study in why whole organism models matter for diseases that unfold across multiple systems over long time frames.</p>

<p>Wang <em>et al.</em> (2023) showed that semaglutide improved brain glucose uptake, restored spatial memory, and reduced amyloid β plaques and tau tangles in the 3xTg mouse model of Alzheimer’s disease.<sup>[12]</sup> A follow up study in APP/PS1/tau mice demonstrated that semaglutide shifted microglial polarization from pro inflammatory M1 to anti inflammatory M2 phenotypes, reducing neuroinflammation.<sup>[13]</sup> These are findings that require a living brain with intact neuroimmune circuitry, not something you can read out from a cortical organoid.</p>

<p>But here is where the <strong>in vivo</strong> story gets especially instructive. Forny Germano <em>et al.</em> (2024), published in <em>Molecular Metabolism</em>, found that semaglutide caused weight loss and improved glucose tolerance in two different Alzheimer’s disease mouse strains (5XFAD and APP/PS1) but did not reduce amyloid burden, inflammation, or cognitive deficits.<sup>[14]</sup> Same drug class, different models, contradictory results. That ambiguity turned out to be prophetic: the phase 3 EVOKE trials, reported at CTAD (Clinical Trials on Alzheimer’s Disease conference) in December 2025, showed semaglutide failed to slow clinical progression in early Alzheimer’s disease patients, despite modest biomarker improvements.<sup>[15]</sup></p>

<p>The point is not that the positive mouse studies were wrong. It is that the <strong>in vivo</strong> platform allowed the field to see the full complexity of the question: metabolic effects, immune modulation, amyloid clearance, cognitive endpoints, and the interactions among them before committing billions to clinical trials. No organoid or chip system can simultaneously measure brain glucose metabolism, microglial phenotype, synaptic function, and spatial learning in the same preparation over months.</p>

<h4>Immuno oncology: the irreplaceable <strong>in vivo</strong> immune system</h4>

<p>Checkpoint inhibitor development provides another domain where mouse models do something nothing else can. As Chuprin <em>et al.</em> reviewed in <em>Nature Reviews Clinical Oncology</em> (2023), humanized mouse models engrafted with human hematopoietic stem cells and patient derived tumors have become the standard preclinical platform for evaluating anti PD 1, anti CTLA 4, and bispecific antibodies.<sup>[16]</sup> These models allow researchers to study T cell infiltration, tumor immune dynamics, and immune related adverse events in a way that co culture systems fundamentally cannot.</p>

<p>Newer model refinements continue to improve translational accuracy. Takahashi <em>et al.</em> (2021) showed that NOG FcγR deficient mice eliminated confounding cross species Fc receptor interactions, enabling clearer evaluation of nivolumab’s anti tumor activity across multiple PD L1 positive tumor types.<sup>[17]</sup> The tumors that responded in this refined model aligned more closely with clinical experience than results from conventional humanized strains. For immuno oncology, where efficacy depends on a coordinated systemic immune response, <strong>in vivo</strong> models are not just useful, they are the only reliable option.</p>

<h4>Whole body pharmacology and chronic disease</h4>

<p>Some of the strongest arguments for mouse models are the least glamorous. Only a living animal captures the full complexity of absorption, distribution, metabolism, and excretion across all organs under physiological circulation.<sup>[18]</sup> That includes emergent off target effects that arise only with full body distribution, multi organ compensation and decompensation over time, and the pharmacokinetics of biologics whose exposure profiles depend on FcRn recycling, target mediated disposition, and immunogenicity, none of which can be modeled in static or even microfluidic systems.<sup>[19]</sup></p>

<p>Chronic diseases like fibrosis, autoimmunity, and metabolic syndrome unfold over months with evolving inflammation, tissue remodeling, and systemic adaptation. Organoids are stable for weeks at best; most chips for days to weeks. Mouse models support longitudinal dosing, repeated imaging, survival endpoints, and aging. These are not theoretical advantages. They are structural requirements for any program studying a chronic condition.<sup>[20]</sup></p>

<h3>An integrated, not either or, future</h3>

<p>The framing of mouse models versus alternatives misses what the literature actually shows. Each platform answers a different class of question:</p>

<ul>
<li><strong>Organoids</strong> are best deployed for patient specific drug sensitivity screening and human relevant organ level biology, particularly in oncology where PDO guided therapy selection is approaching clinical readiness.<sup>[1,2,3]</sup></li>
<li><strong>Organ on chip systems</strong> are best deployed for mechanistic toxicology, microenvironment dependent drug responses, and pharmacological filtering under physiologic conditions, especially for DILI and pulmonary drug evaluation.<sup>[7,9,10]</sup></li>
<li><strong>Mouse models</strong> are best deployed (and remain indispensable) for whole body pharmacology, chronic disease modeling, multi organ toxicity, integrated immune responses, and any question that requires an intact organism observed over time.<sup>[12,16,18]</sup></li>
</ul>

<p>The most rigorous preclinical programs today use organoids and chips early to generate mechanistic hypotheses and improve human relevance, then use well designed mouse studies to validate systemic efficacy and safety before entering the clinic. Far from being displaced by newer technologies, <strong>in vivo</strong> models serve as the bridge that connects reductionist insights to the complexity of real world biology. That bridge is not optional. It is where the decision to advance a candidate into humans actually gets made.</p>

<div class="lab-signals-references"><p><strong>References</strong></p><ol>
<li>Smabers LP, et al. Patient derived organoids predict treatment response in metastatic colorectal cancer. <em>Clin Cancer Res.</em> 2025;31:5015.</li>
<li>Peng D, et al. Individualized patient tumor organoids faithfully preserve human brain tumor ecosystems and predict patient response to therapy. <em>Cell Stem Cell.</em> 2025;32.</li>
<li>Hu JW, et al. Applications and challenges of patient derived organoids in hepatobiliary and pancreatic cancers. <em>World J Gastroenterol.</em> 2025;31:106747.</li>
<li>Wang Y, et al. Give them vasculature and immune cells: how to fill the gap of organoids. <em>Cells.</em> 2023;12:793.</li>
<li>Zhang YS, et al. Vascularized organoids on a chip: strategies for engineering organoids with functional vasculature. <em>Lab Chip.</em> 2021;21:473–488.</li>
<li>Tong WH, et al. Patient derived organoids in precision cancer medicine. <em>Med.</em> 2024;5. <a href="https://doi.org/10.1016/j.medj.2024.09.008" target="_blank" rel="noopener noreferrer">doi:10.1016/j.medj.2024.09.008</a></li>
<li>Ewart L, et al. Performance assessment and economic analysis of a human Liver Chip for predictive toxicology. <em>Commun Med.</em> 2022;2:154.</li>
<li>U.S. Food and Drug Administration. ISTAND Pilot Program accepts submission of first organ on a chip technology designed to predict human drug induced liver injury. <a href="https://www.fda.gov/drugs/drug-safety-and-availability/fdas-istand-pilot-program-accepts-submission-first-organ-chip-technology-designed-predict-human-drug" target="_blank" rel="noopener noreferrer">FDA.gov</a> (2024).</li>
<li>Si L, et al. A human airway on chip for the rapid identification of candidate antiviral therapeutics and prophylactics. <em>Nat Biomed Eng.</em> 2021;5:815–829.</li>
<li>Meyer SR, et al. A high throughput microphysiological liver chip system to model drug induced liver injury using human liver organoids. <em>Gastro Hep Adv.</em> 2024;3:1045–1053.</li>
<li>Ingber DE, et al. Roadblocks confronting widespread dissemination and deployment of organs on chips. <em>Nat Commun.</em> 2024;15:5118.</li>
<li>Wang ZJ, et al. Semaglutide ameliorates cognition and glucose metabolism dysfunction in the 3xTg mouse model of Alzheimer’s disease via the GLP 1R/SIRT1/GLUT4 pathway. <em>Neuropharmacology.</em> 2023;240:109716.</li>
<li>Wang ZJ, et al. Semaglutide promotes the transition of microglia from M1 to M2 type to reduce brain inflammation in APP/PS1/tau mice. <em>Neuroscience.</em> 2024;563:222–234.</li>
<li>Forny Germano L, et al. The GLP 1 medicines semaglutide and tirzepatide do not alter disease related pathology, behaviour or cognitive function in 5XFAD and APP/PS1 mice. <em>Mol Metab.</em> 2024;89:102019.</li>
<li>Novo Nordisk. Evoke phase 3 trials did not demonstrate a statistically significant reduction in Alzheimer’s disease progression. GlobeNewsWire (24 November 2025). <a href="https://www.globenewswire.com/news-release/2025/11/24/3193328/0/en/" target="_blank" rel="noopener noreferrer">Press release</a></li>
<li>Chuprin J, et al. Humanized mouse models for immuno oncology research. <em>Nat Rev Clin Oncol.</em> 2023;20:192–206.</li>
<li>Takahashi T, et al. Development of a novel humanized mouse model for improved evaluation of <em>in vivo</em> anti cancer effects of anti PD 1 antibody. <em>Sci Rep.</em> 2021;11:21087.</li>
<li>Mukherjee P, et al. Role of animal models in biomedical research: a review. <em>Lab Anim Res.</em> 2022;38:18.</li>
<li>Chu X, Bleasby K. ADME of biologics: what have we learned from small molecules? <em>AAPS J.</em> 2012;14:629–638.</li>
<li>Chang MCJ, Greider FB. The continued importance of animals in biomedical research. <em>Lab Anim (N Y).</em> 2024;53:265–266.</li>
</ol></div>`;
