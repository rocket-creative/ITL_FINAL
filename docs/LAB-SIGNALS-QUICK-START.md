# Lab Signals Gated Content - Quick Start Guide

## What Was Built

✅ **Flodesk-Integrated Gated Content System**
- Newsletter subscription required to read Lab Signals articles
- Automatic subscriber management via Flodesk
- Cookie-based access for returning visitors
- Sign-in option for existing subscribers
- 90-day access persistence

## How It Works (Simple Version)

1. **First-Time Visitor:**
   - Sees blurred article preview
   - Fills Flodesk form (name + email)
   - Flodesk captures subscriber → adds to biweekly newsletter
   - Content unlocks instantly
   - Cookie saves access for 90 days

2. **Returning Visitor:**
   - Cookie detected → instant access
   - No cookie → can "sign in" with email

3. **Newsletter Management:**
   - All handled by Flodesk
   - Subscribers automatically receive biweekly emails
   - You manage content and delivery in Flodesk dashboard

## Files Modified

```
src/components/UXUIDC/NewsletterGate.tsx  ← Main gate component
src/app/api/verify-subscriber/route.ts    ← Verification API (NEW)
.env.example                               ← Added Flodesk config
docs/LAB-SIGNALS-GATED-CONTENT.md         ← Full documentation (NEW)
```

## Test It Now

### Local Testing

```bash
# Start dev server
npm run dev

# Visit any Lab Signals article
http://localhost:3000/lab-signals/building-better-floxed-alleles-for-conditional-knockout-mice

# You should see:
# 1. Blurred preview
# 2. Flodesk form
# 3. After submitting → content unlocks
```

### What to Check

✅ Preview shows first ~500 characters (blurred)
✅ Flodesk form loads in modal
✅ After form submission → content unlocks
✅ Browser cookie is set (`itl_labsignals_access`)
✅ Refresh page → still has access
✅ Clear cookies → gate appears again
✅ "Sign in with email" button works

## Flodesk Setup (Already Done)

Your Flodesk form is already configured:
- **Form ID:** `689e278b40db38a14e1ffe6b`
- **Fields:** Name, Email
- **Segment:** Lab Signals subscribers

### To Verify in Flodesk:

1. Login to Flodesk
2. Go to Forms → Find "Lab Signals" form
3. Check that form ID matches: `689e278b40db38a14e1ffe6b`
4. Verify automation sends biweekly newsletter

## Customize If Needed

### Change Cookie Duration

In `src/components/UXUIDC/NewsletterGate.tsx`:

```typescript
const COOKIE_DAYS = 90; // Change to 30, 60, 180, etc.
```

### Use Different Flodesk Form

In `src/components/UXUIDC/NewsletterGate.tsx`:

```typescript
const FLODESK_FORM_ID = 'your_form_id_here';
```

### Modify Preview Length

In `src/app/lab-signals/[slug]/LabSignalsArticleClient.tsx`:

```typescript
const createPreview = () => {
  const textContent = article.body
    .replace(/<[^>]+>/g, ' ')
    .trim()
    .slice(0, 500); // Change 500 to desired character count
  // ...
};
```

## FAQ

**Q: Where is subscriber data stored?**
A: In Flodesk. Access via Flodesk dashboard → Subscribers

**Q: How do I export subscriber emails?**
A: Flodesk dashboard → Subscribers → Export

**Q: Can I change the form design?**
A: Yes, edit in Flodesk → Forms → [Your Form] → Design

**Q: What if Flodesk is down?**
A: Form won't load, but existing cookie holders still have access

**Q: Can people bypass the gate?**
A: Technically yes (manually set cookie), but low risk for newsletter content

**Q: How do I remove gating?**
A: Remove `<NewsletterGate>` wrapper from article pages

## Production Deployment

### Before Going Live

1. ✅ Verify Flodesk form ID in production
2. ✅ Test signup flow on staging
3. ✅ Confirm biweekly newsletter automation
4. ✅ Add analytics tracking (see full docs)
5. ✅ Test cookie persistence across devices

### Deploy

```bash
# Build
npm run build

# Deploy to Vercel
git push origin ITL_MAIN
```

### After Deployment

1. Visit production URL: `https://www.genetargeting.com/lab-signals/[article]`
2. Test complete signup flow
3. Check Flodesk for new subscriber
4. Wait 1 hour, refresh page → should still have access

## Monitor Performance

**Weekly Checks:**
- Flodesk subscriber count growth
- Article access rate
- Cookie persistence (Analytics)

**Monthly Reviews:**
- Newsletter open rates (in Flodesk)
- Conversion rate (gate → signup)
- Returning visitor access patterns

## Get Help

- **Full Documentation:** `/docs/LAB-SIGNALS-GATED-CONTENT.md`
- **Flodesk Support:** https://help.flodesk.com
- **Technical Issues:** Check browser console for errors

## Next Steps (Optional)

If you want stronger security or features:

1. **Database Integration**
   - Store verified subscribers in Vercel Postgres
   - Check against database on each visit

2. **Flodesk API Integration**
   - Verify subscriber status server-side
   - Auto-remove access when unsubscribed

3. **Advanced Analytics**
   - Track conversion funnel
   - A/B test gate copy
   - Optimize preview length

See full docs for implementation details.

---

**Ready to test?** Start dev server and visit any Lab Signals article!
