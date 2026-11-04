/**
 * Lab Signals article body: Optogenetics and Chemogenetics: How Mouse Models Help Test Neuronal Function.
 * Imported by newsletterArticles.ts. Client-approved copy preserved verbatim.
 */
export const optogeneticsChemogeneticsArticleBody = `<p>What keeps a memory available after a sensory cue disappears? Why does multiple sclerosis often become less active during pregnancy? And which neurons contribute to the effects of psychedelic drugs?</p>

<p>These questions concern different aspects of brain function, but answering them requires more than observing which neurons are active. Researchers also need to test what changes when a particular population is activated or inhibited. Optogenetics and chemogenetics make those experiments possible. <sup>[1,2]</sup></p>

<p>Optogenetics uses genetically encoded, light-sensitive proteins to activate or inhibit cells. Chemogenetics uses engineered receptors that respond to administered compounds. Among the most widely used are designer receptors exclusively activated by designer drugs, or DREADDs. Mouse genetics and local viral delivery help determine which cells express these proteins. Light or a receptor-activating compound then allows researchers to alter their activity. <sup>[1,2]</sup></p>

<p>Three studies published in 2026 illustrate different ways to combine mouse genetics with neuronal manipulation. One tests when a neuronal population is needed for working memory, another asks whether activating brainstem neurons can suppress autoimmune disease development, and a third develops tools for investigating serotonin receptor biology. Together, they show how the biological question shapes the targeting strategy and the experiment. <sup>[3,4,6]</sup></p>

<h3>Keeping information in mind</h3>

<p>Working memory allows an animal to retain information briefly and use it to make a decision. But how does the brain keep that information available after the original stimulus disappears? Bhattacharjee and colleagues investigated the claustrum, a thin brain structure with extensive connections to the cortex, to understand its contribution to this process. <sup>[3]</sup></p>

<p>The researchers trained mice on a simple memory task. Each mouse received a sensory cue, waited, and then received a second cue. In one task, the cues were odors; in another, they were gentle air puffs to the left or right whisker pad. Mice learned to lick a water-delivery tube when the two cues differed and withhold licking when they matched. To respond correctly, they had to remember the first cue during the wait. <sup>[3]</sup></p>

<p>To observe claustrum activity, the researchers injected a viral vector carrying the gene for GCaMP6f, a fluorescent calcium-sensing protein. Neurons that produced this protein became brighter as calcium levels rose during neuronal activity, allowing the team to record those changes with a miniature microscope. <sup>[3]</sup></p>

<p>The researchers then tested whether claustrum activity during the delay retained information about the first cue. A decoder trained on labeled neuronal recordings identified cue identity in separate recordings above chance, with information remaining decodable up to about 30 seconds later. <sup>[3]</sup></p>

<p>The next step was to test whether that activity mattered for memory. One targeting strategy used Smim32-Cre mice, engineered to produce the enzyme Cre in a population that includes claustrum neurons. Cre does not inhibit neurons itself; it acts as a genetic switch, enabling them to produce an inhibitory protein from a separately supplied gene. For chemogenetic inhibition, the researchers bred these mice with a line carrying a Cre-dependent gene for the inhibitory DREADD hM4Di. For optogenetic inhibition, they injected a viral vector carrying a Cre-dependent gene for a light-sensitive inhibitory protein into the claustrum. These combinations allowed the team to reduce the targeted neurons’ activity using a drug or light. <sup>[3]</sup></p>

<p>Chemogenetics allowed the team to reduce neuronal excitability over a testing session by administering clozapine N-oxide, or CNO, to activate an inhibitory DREADD. Optogenetics used light-sensitive inhibitory proteins to briefly reduce activity during particular stages of the task. With claustrum activity reduced, mice answered fewer trials correctly, including more failures to lick when the cues differed. Control experiments did not point to problems with sensation, movement, arousal, or inhibitory control as the explanation. <sup>[3]</sup></p>

<p>Importantly, performance also declined when light briefly interrupted claustrum activity during the wait, when neither cue was present. Together, the imaging and inhibition experiments supported a role for the claustrum in maintaining information between cues. Although the study did not model a particular cognitive disorder, it identified a contribution to working memory that disease-focused research can examine more directly. <sup>[3]</sup></p>

<h3>A brain–immune connection in MS</h3>

<p>The ability to manipulate a defined neuronal population is also useful outside conventional behavioral neuroscience. In multiple sclerosis, immune cells enter the central nervous system and contribute to inflammation and damage to myelin and neurons. Yet inflammatory disease activity often decreases during pregnancy. Understanding that change could reveal biological processes that restrain autoimmunity. <sup>[4]</sup></p>

<p>Sonner and colleagues investigated one possible contributor: growth/differentiation factor-15, or GDF-15, a circulating protein whose concentration rises during pregnancy. In their human observations, lower GDF-15 concentrations were associated with relapse activity among pregnant participants with MS. The association suggested a question for the mouse experiments: could GDF-15 limit autoimmune inflammation through its effects on the nervous system? <sup>[4]</sup></p>

<p>The connection was worth investigating because the GDF-15 receptor, GFRAL, is expressed predominantly in brainstem neurons, including those in the area postrema and nucleus tractus solitarius. These regions can detect circulating molecules. If GDF-15 influenced peripheral immunity through those neurons, directly activating them would test the hypothesis that their activity was sufficient to suppress autoimmune inflammation. <sup>[4]</sup></p>

<p>To do so, the researchers crossed GFRAL-Cre mice with mice carrying a conditional hM3Dq DREADD allele. The DREADD sequence was already present in the inherited allele, but a DNA STOP cassette prevented its expression. In cells producing Cre, the cassette was removed, allowing those cells to produce hM3Dq. The team confirmed receptor expression in the relevant brainstem neurons. <sup>[4]</sup></p>

<p>The engineered receptor gave the neurons an additional way to respond to a drug. When the researchers administered CNO, the hM3Dq system activated Gq-coupled signaling in the targeted neurons, providing a means of stimulating them without adding GDF-15. Cre-negative littermates also received CNO, allowing comparison with animals that lacked the targeted DREADD expression. <sup>[1,4]</sup></p>

<p>The next question was whether this neuronal activation changed autoimmune disease development. The researchers induced experimental autoimmune encephalomyelitis, or EAE, rather than relying on the mice to develop disease spontaneously. EAE induction involved immunization against a fragment of myelin oligodendrocyte glycoprotein, a myelin-associated protein, with immune-stimulating treatment. This produces autoimmune neuroinflammation that reproduces selected features relevant to MS, not the full human disease. <sup>[4]</sup></p>

<p>CNO administration began three days before immunization. Under those conditions, activating the GFRAL-expressing neurons prevented clinical disease signs and spinal-cord immune-cell infiltration. The researchers also measured increased norepinephrine in the spleen and reduced expression of LFA-1, an adhesion molecule involved in T-cell trafficking. These findings connected the brainstem manipulation with changes in peripheral immune regulation. <sup>[4]</sup></p>

<p>The DREADD experiment therefore helped test a specific part of the proposed pathway: activation of GFRAL-expressing neurons was sufficient to protect against EAE development in that experimental setting. It was not a demonstration of reversing established MS, but it strengthened the evidence that neuronal regulation can influence autoimmune inflammation. <sup>[4]</sup></p>

<h3>Identifying cells involved in psychedelic drug effects</h3>

<p>In the MS study, a known receptor helped identify the neuronal population to manipulate. A related targeting problem arises in psychedelic research: knowing which receptor a drug binds does not explain which receptor-expressing cells contribute to its effects.</p>

<p>Clinical studies have investigated psilocybin for treatment-resistant depression. Those studies can measure symptom changes, but explaining the underlying biology requires complementary experiments on receptors, cells, and circuits. The serotonin 2A receptor is a major target of classical psychedelics, making the neurons that express it an important population to investigate. <sup>[5,6]</sup></p>

<p>Chiu and colleagues developed three knockin mouse lines at Htr2a, the gene encoding the mouse serotonin 2A receptor. Their designs included Htr2a-EGFP-CreERT2 mice, a humanized Htr2a-A242S-EGFP-Cre line, and constitutive Htr2a-Cre mice. Across the lines, the researchers could visualize tagged receptors, genetically identify receptor-expressing cells, and investigate the humanizing A242S receptor substitution. <sup>[6]</sup></p>

<p>The researchers also assessed behavioral responses to psychedelic drugs. Drug-induced head-twitch responses across the engineered lines supported preserved serotonin 2A receptor function and their usefulness for studying psychedelic drug actions. <sup>[6]</sup></p>

<p>The value of Cre in these models is that it permits additional experimental proteins to be introduced into Htr2a-defined cells. The team’s receptor-mapping experiments identified prominent expression in cortical pyramidal neurons, particularly in layer 5a. In the medial prefrontal cortex, labeling was concentrated in the dorsal prelimbic region rather than uniformly distributed across its subdivisions. To demonstrate chemogenetic manipulation, the researchers used the constitutive Htr2a-Cre line and delivered a Cre-dependent viral construct encoding the activating DREADD hM3Dq into the medial prefrontal cortex. The mouse supplied Cre in Htr2a-defined neurons; the virus supplied the DREADD sequence locally, allowing neurons with Cre in the injected region to produce the engineered receptor. <sup>[6]</sup></p>

<p>Before using such a combination to interpret behavior, it is important to establish that the targeted cells respond as intended. The team tested this in brain slices by applying deschloroclozapine, or DCZ, a DREADD-activating compound. Electrical measurements showed depolarization of the targeted neurons, whereas cells expressing a control fluorescent protein did not show that response. <sup>[6]</sup></p>

<p>The chemogenetic experiment demonstrated that the mouse line could support manipulation of locally targeted, Htr2a-defined neurons in the medial prefrontal cortex. It did not establish that activating those neurons reproduced a psychedelic experience or an antidepressant effect. Instead, it provided a way to ask more specific questions about the contribution of serotonin 2A receptor-expressing populations, beyond the combined effects of a drug acting throughout the brain. <sup>[6]</sup></p>

<h3>From model design to biological insight</h3>

<p>Each study used mouse genetics for a different purpose. In the working-memory study, genetic targeting and local viral expression allowed researchers to inhibit claustrum neurons and test when their activity mattered. In the neuroinflammation study, breeding combined a GFRAL-Cre driver with an inherited DREADD allele to examine whether activating a brainstem population affected autoimmune disease development. In the psychedelic study, new Htr2a knockin lines made receptor-expressing cells available for functional experiments, including local DREADD expression. <sup>[3,4,6]</sup></p>

<p>For researchers considering these approaches, the studies highlight several questions: Which cells need to be targeted? Will the experimental protein come from an inherited allele or local viral delivery? Does the question require a brief interruption during a defined task phase or a manipulation spanning a testing session? And what evidence will show that the targeted cells respond as intended? <sup>[3,4,6]</sup></p>

<p>These differences explain why the complete model matters as much as the choice between light and a receptor-activating compound. The genetic driver identifies cells, the introduced protein allows their activity to be altered, and the experiment relates that change to a biological outcome. In these examples, that meant clarifying a contribution to memory, testing a brain–immune pathway, and developing tools to investigate psychedelic receptor biology. <sup>[1–4,6]</sup> Together, these approaches give researchers a way to test how defined neuronal populations contribute to processes relevant to disease, helping build the mechanistic evidence needed to identify and evaluate potential therapeutic targets. <sup>[3,4,6]</sup></p>

<p>For information about custom genetically engineered mouse models, visit ingenious targeting laboratory at <a href="https://www.genetargeting.com" target="_blank" rel="noopener noreferrer">https://www.genetargeting.com</a> or contact <a href="mailto:inquiry@genetargeting.com">inquiry@genetargeting.com</a>.</p>

<div class="lab-signals-references"><p><strong>References</strong></p><ol>
<li>Roth BL. DREADDs for Neuroscientists. <em>Neuron.</em> 2016;89(4):683–694. <a href="https://doi.org/10.1016/j.neuron.2016.01.040" target="_blank" rel="noopener noreferrer">doi:10.1016/j.neuron.2016.01.040</a>.</li>
<li>Madisen L, Mao T, Koch H, et al. A toolbox of Cre-dependent optogenetic transgenic mice for light-induced activation and silencing. <em>Nature Neuroscience.</em> 2012;15(5):793–802. <a href="https://doi.org/10.1038/nn.3078" target="_blank" rel="noopener noreferrer">doi:10.1038/nn.3078</a>.</li>
<li>Bhattacharjee AS, Juventin M, Huber C, et al. The claustrum contributes to working memory maintenance in mice. <em>Nature Communications.</em> Published online October 14, 2026. Peer-reviewed accepted article. <a href="https://doi.org/10.1038/s41467-026-78363-6" target="_blank" rel="noopener noreferrer">doi:10.1038/s41467-026-78363-6</a>.</li>
<li>Sonner JK, Kahn A, Binkle-Ladisch L, et al. A GDF-15–GFRAL axis controls autoimmune T cell responses during neuroinflammation. <em>Nature Immunology.</em> 2026;27:503–515. <a href="https://doi.org/10.1038/s41590-025-02406-1" target="_blank" rel="noopener noreferrer">doi:10.1038/s41590-025-02406-1</a>.</li>
<li>Goodwin GM, Aaronson ST, Alvarez O, et al. Single-Dose Psilocybin for a Treatment-Resistant Episode of Major Depression. <em>New England Journal of Medicine.</em> 2022;387:1637–1648. <a href="https://doi.org/10.1056/NEJMoa2206443" target="_blank" rel="noopener noreferrer">doi:10.1056/NEJMoa2206443</a>.</li>
<li>Chiu YT, Deutch AY, Wang W, et al. A suite of engineered mice for interrogating psychedelic drug actions. <em>Nature Neuroscience.</em> 2026;29:2341–2354. <a href="https://doi.org/10.1038/s41593-026-02375-0" target="_blank" rel="noopener noreferrer">doi:10.1038/s41593-026-02375-0</a>.</li>
</ol></div>`;
