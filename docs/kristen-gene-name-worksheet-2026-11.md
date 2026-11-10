# Worksheet: truncated gene names and uppercase-derived orthologs

For Kristen. Written 2026-11-10 against Supabase `ITL_MOUSE`
(`wsnyzwfrosqqvmtdrnym`), tables `catalog_models`, `gene`, `gene_type_page`.

Every number here is measured, and §5 gives the SQL to re-derive it. Where a
judgement is mine rather than measured, it says so. **The calls in §2 and §3 are
yours, not mine** — a "no" is a bug report on something already live.

---

## 1. The mechanism (measured, not inferred)

`catalog_models.gene_name` is `model_abbreviation` cut at the **first hyphen**.
This holds for 18,539 of 18,540 rows, so it is the rule, not a tendency.

That cut is correct for the common case, where the hyphen separates the gene
from the allele:

| `model_abbreviation` | cut → `gene_name` | correct? |
|---|---|---|
| `Apoe-KO` | `Apoe` | yes |
| `Trp53-R172H` | `Trp53` | yes |
| `Pdgfb-T212*` | `Pdgfb` | yes |

It fails whenever the hyphen belongs to the **name** rather than the allele:

| `model_abbreviation` | cut → `gene_name` | what was lost |
|---|---|---|
| `hPD-1` | `hPD` | the receptor is PD-1 (PDCD1) |
| `h4-1BB(2)` | `h4` | the receptor is 4-1BB (TNFRSF9) |
| `hCTLA-4` | `hCTLA` | CTLA-4 |
| `H2-Aa-Flox` | `H2` | *H2-Aa* is the gene |
| `Hba-a2-Flox` | `Hba` | *Hba-a2* is the gene |
| `Nkx2-1-CreERT2` | `Nkx2` | *Nkx2-1* is the gene |
| `hALB(M-NSG)` | `hALB(M` | cut inside a parenthetical |
| `pAlb-hPCSK9` | `pAlb` | `pAlb` is a **promoter**, not a gene |
| `R26-hCD46-IRES-tdTomato` | `R26` | Rosa26 is a **locus** |

**Scale:** 144 distinct `gene_name` values are wrong this way, across 372
catalog rows. All 144 exist as rows in the `gene` table — the truncation
propagated out of the catalog and into the gene dimension. They carry 281
indexable pages.

A note on why this was hard to see: `gene.symbol` contains **no hyphens at all**
(0 of 11,105). The schema cannot represent *H2-Aa*, *Hba-a2* or *Hbb-bs*, so the
truncation is not a bug on top of a correct store — the store has no room for
the correct value.

## 2. The ortholog claim — I need to correct what I said earlier

I previously described this as "unverified on ~8,060 pages, demonstrably false
on ~46". That understated the mechanism. Measured:

- **11,105** gene rows. **All** have `mgi_id` null. Nothing is anchored to MGI.
- **8,073** have `has_human_ortholog = true`.
- **8,072** of those have `human_ortholog_symbol = upper(symbol)` exactly.
- **13** rows carry a real HGNC id.

So the human ortholog was not looked up and recorded — it was produced by
**uppercasing the mouse symbol**, for every row. It is right whenever mouse and
human nomenclature agree (*Apoe* → APOE), which is most of the time, and that is
why it reads as correct. It is wrong exactly where nomenclature diverges, and
wrong by construction where the symbol is a fragment or a locus.

### 2a. Where uppercasing produces something that is not an HGNC symbol

My reading, for you to confirm or reject. These are live.

| fragment | claims ortholog | my view | idx pages |
|---|---|---|---|
| `H11` | `H11` | Hipp11 is a safe-harbour **locus**; no human ortholog | 7 |
| `H2` | `H2` | mouse MHC; human is **HLA**, not "H2" | 7 |
| `R26` | `R26` | Rosa26 **locus** (326 alleles); no ortholog | 6 |
| `Nkx2` | `NKX2` | no bare NKX2; it is NKX2-1 / NKX2-5 | 6 |
| `Nkx3` | `NKX3` | no bare NKX3; it is NKX3-1 | 6 |
| `Hba` | `HBA` | human is **HBA1 / HBA2** | 6 |
| `Pd` | `PD` | "PD" is not a gene | 6 |
| `K14` | `K14` | keratin 14 is **KRT14** | 7 |
| `Krtap2` | `KRTAP2` | human is KRTAP2-1 … KRTAP2-4 | 7 |
| `Krtap4` | `KRTAP4` | human is KRTAP4-1 … | 7 |
| `Tigre` | `TIGRE` | targeting **locus**, not a gene | 6 |
| `Hbb` | `HBB` | mouse *Hbb-bs* → human HBB is arguable; bare `Hbb` is not a symbol | 5 |
| `Igh`, `Igkj`, `Ighj` | `IGH`, `IGKJ`, `IGHJ` | Ig **loci** — defensible as loci, your call | 5 each |

### 2b. Cases where the gene name is right and only the model name is mangled

For these the fragment happens to equal the real symbol, because what the cut
discarded was a second gene or a construct. The ortholog is fine; the **model
name** shown to users is truncated. Lower priority, but it is what a customer
reads: `Fpr1` (from `Fpr1-Fpr2-Fpr3-KO`), `Htt` (`Htt-hHTT-Q145`), `Fcgr2b`
(`Fcgr2b-Fcgr3-Fcgr4-KO`), `Rab31`, `Cdk3`, `Apoc3`, `Col1a1`, `Lepr`, `Nr5a1`,
`Pln`, `Mefv`, `Tpm3`, `Ifnar2`, `Il18bp`, `Wap`, `Spem2`, `Pde6b`, `Mir103`,
`Mir24`, `Mir30c`, `Mir211`.

### 2c. A false lead I want to flag, so nobody re-finds it

I briefly thought `hPD` claimed ortholog **HPD** (4-hydroxyphenylpyruvate
dioxygenase) — alarming, since HPD has nothing to do with PD-1. That was **my
own error**: a case-insensitive join matched the truncated `hPD` to the real,
separate gene `Hpd`, where mouse *Hpd* → human HPD is correct. The actual `hPD`
row claims no ortholog. Same artifact for `TIGRE` vs `Tigre`.

## 3. The six calls, in priority order

1. **Is uppercasing ever acceptable as a stand-in?** If not, the 8,072 need a
   real HGNC/MGI join and the claim should be suppressed until then. The 13 rows
   with HGNC ids show the column exists and is simply unpopulated.
2. **§2a list** — which are genuinely wrong, and what should each say?
3. **Specific divergences** I flagged earlier and still need checking:
   *Qk* → QKI, *Hc* → C5, *Gh* → GH1, *H2* → HLA.
4. **The blanket humanization sentence** now on ~8,060 pages — is it accurate as
   a general statement, or does it over-claim for some model classes?
5. **Non-gene rows.** `pAlb`, `pThy1`, `pWap`, `CAG`, `CMV`, `M`, `huHSC`,
   `huPBMC`, `OT`, `NVG`, `MHC Class II (I` are promoters, strains, loci or
   grafts sitting in a table called `gene`. Should they be a separate entity
   type rather than genes with no ortholog?
6. **`Hbb` / `Hba` / `H2` families** — given the store cannot hold hyphens,
   what should a page for *Hbb-bs* vs *Hbb-bt* vs *Hbb-y* actually be? One page
   per family, or does the schema need to change?

## 4. What I did not change

Nothing in this document is fixed in code. I have only measured it. The real
remedy for §2 is populating `human_ortholog_hgnc` from HGNC/MGI (filled for 13
of 8,073 rows), which needs an authoritative mapping, not a string rule — and
the §2a rows need a human decision first.

## 5. Reproduction

```sql
-- the truncation rule
select count(*) filter (where gene_name = split_part(model_abbreviation,'-',1)) as holds,
       count(*) as total
from catalog_models where gene_name is not null and model_abbreviation is not null;

-- the ortholog mechanism
select count(*) as rows,
       count(*) filter (where mgi_id is null) as no_mgi,
       count(*) filter (where has_human_ortholog) as claims_ortholog,
       count(*) filter (where upper(symbol) = human_ortholog_symbol) as uppercased_self,
       count(*) filter (where human_ortholog_hgnc is not null) as real_hgnc
from gene;
```

The 144-name list is derived by cutting at the first hyphen and excluding
remainders whose first token is a known allele/construct suffix (KO, Flox, Cre,
reporters, strain parentheticals) or a point mutation (`^[A-Z][0-9]+`). That
suffix whitelist was built from the measured token distribution, not invented;
it is the one judgement call in the extraction, and widening it shrinks the 144.
