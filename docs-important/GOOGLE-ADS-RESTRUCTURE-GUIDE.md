# Google Ads Budget Restructure Guide

**Budget:** $500/mo → $250/mo (other $250 goes to AdRoll retargeting)

---

## Step 1: Log into Google Ads

Go to: https://ads.google.com

---

## Step 2: Reduce Overall Budget

1. Click **Campaigns** in the left sidebar
2. For each campaign, click the budget amount
3. Reduce to new target (total across all campaigns = $250/mo)

---

## Step 3: Pause Underperforming Campaigns

Review last 90 days data:
1. Go to **Campaigns**
2. Sort by **Conversions** (lowest first)
3. Pause campaigns with:
   - Zero conversions AND high spend
   - Cost per conversion > $500
   - Low quality score keywords (< 5)

---

## Step 4: Create Dynamic Search Ads Campaign

This leverages your site's metadata automatically.

### Create New Campaign

1. Click **+ New Campaign**
2. Goal: **Leads** or **Website Traffic**
3. Campaign type: **Search**
4. Click **Continue**

### Configure DSA Settings

1. Campaign name: `ITL - Dynamic Search Ads`
2. Networks: **Search Network only** (uncheck Display)
3. Locations: **United States** (add UK/EU if relevant)
4. Languages: **English**
5. Budget: **$4/day** (~$120/mo for DSA portion)

### Set Up Dynamic Ad Targets

1. Under "Dynamic ad targets", click **Add dynamic ad target**
2. Choose ONE of these options:

**Option A: All Web Pages (Recommended for start)**
- Target: "All web pages"
- This lets Google match any page on your site

**Option B: Specific Categories**
- URL contains: `/knockout` (for knockout pages)
- URL contains: `/knockin` (for knockin pages)  
- URL contains: `/humanized` (for humanized pages)
- URL contains: `-mouse-models` (for disease models)

### Write Ad Descriptions

Headlines are auto-generated from your page titles. You only write descriptions.

**Description 1 (90 chars max):**
```
Custom mouse models since 1998. 2,500+ projects. ES cell & CRISPR technology.
```

**Description 2 (90 chars max):**
```
Request a free consultation. Expert design team. Fast turnaround times.
```

**Description 3 (90 chars max):**
```
Trusted by leading research institutions. Guaranteed germline transmission.
```

**Description 4 (90 chars max):**
```
Full project management. From design to breeding. Get your quote today.
```

### Set Bid Strategy

1. Bidding: **Maximize conversions** (if you have conversion tracking)
   - OR **Maximize clicks** (if no conversion data yet)
2. Set a max CPC limit: **$15** (prevents runaway costs)

### Launch

1. Review settings
2. Click **Publish Campaign**

---

## Step 5: Restructure Existing Campaigns

Keep only highest-performing campaigns. Suggested structure:

### Campaign 1: Core Services ($100/mo, ~$3.30/day)

**Ad Group: Knockout Services**
Keywords (phrase match):
- "knockout mouse"
- "knockout mouse model"
- "custom knockout mouse"
- "gene knockout mouse"

**Ad Group: Knockin Services**
Keywords (phrase match):
- "knockin mouse"
- "knockin mouse model"
- "custom knockin mouse"
- "gene knockin"

**Ad Group: Custom Models**
Keywords (phrase match):
- "custom mouse model"
- "transgenic mouse services"
- "mouse model company"
- "genetically modified mouse"

### Campaign 2: Disease Models ($30/mo, ~$1/day)

**Ad Group: Oncology**
Keywords:
- "oncology mouse model"
- "cancer mouse model"
- "tumor mouse model"

**Ad Group: Immunology**
Keywords:
- "immunology mouse model"
- "immune checkpoint mouse"
- "humanized immune mouse"

---

## Step 6: Add Negative Keywords

Add these at the ACCOUNT level to apply everywhere:

1. Go to **Tools & Settings** (wrench icon)
2. Click **Negative keyword lists**
3. Create list: "ITL Exclusions"
4. Add keywords:

```
jobs
careers
salary
hiring
employment
free
DIY
home
pet
wild
pest
exterminator
trap
poison
cartoon
mickey
minnie
```

5. Apply list to all campaigns

---

## Step 7: Set Up Conversion Tracking (If Not Done)

1. Go to **Tools & Settings** → **Conversions**
2. Click **+ New conversion action**
3. Select **Website**

### Create Quote Form Conversion

- Name: `Quote Request`
- Category: **Submit lead form**
- Value: Use same value for each conversion → $100
- Count: **One** (per click)

### Create Contact Form Conversion

- Name: `Contact Form`
- Category: **Submit lead form**  
- Value: $50
- Count: **One**

### Get Conversion Labels

After creating, click on each conversion:
1. Click **Tag setup**
2. Click **Use Google Tag Manager** or **Install tag yourself**
3. Copy the conversion label (e.g., `AbCdEfGhIj`)
4. Add to your `.env.local`:

```
NEXT_PUBLIC_GOOGLE_ADS_QUOTE_LABEL=your_quote_label_here
NEXT_PUBLIC_GOOGLE_ADS_CONTACT_LABEL=your_contact_label_here
```

---

## Step 8: Set Ad Schedule

Researchers are most active during work hours:

1. Go to **Campaigns** → select a campaign
2. Click **Ad schedule** in left menu
3. Click **+ Ad schedule**
4. Set:
   - Monday-Friday: 7:00 AM - 7:00 PM
   - Saturday-Sunday: Paused OR reduced bid (-50%)

---

## Budget Summary

| Campaign | Daily Budget | Monthly Budget |
|----------|--------------|----------------|
| Dynamic Search Ads | $4.00 | ~$120 |
| Core Services | $3.30 | ~$100 |
| Disease Models | $1.00 | ~$30 |
| **Total** | **$8.30** | **~$250** |

---

## Monitoring Checklist

Weekly:
- [ ] Check search terms report - add negatives for irrelevant queries
- [ ] Review DSA auto-generated headlines - exclude poor performers
- [ ] Monitor cost per conversion

Monthly:
- [ ] Pause keywords with 0 conversions and 100+ clicks
- [ ] Increase bids on high-converting keywords
- [ ] Test new ad copy variations

---

## Next: Enable AdRoll Retargeting

Once Google Ads is restructured, set up AdRoll to retarget your website visitors.

See: `ADROLL-SETUP-GUIDE.md`
