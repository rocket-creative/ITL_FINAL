# Catalog Search Setup

Catalog search (used on **Catalog Mouse Models**, **All Catalog Mouse Models**, **Order Catalog Models**, and humanized checkpoint pages) fetches model data from a Google Sheet via the Google Sheets API. You must set **`GOOGLE_SHEETS_API_KEY`** for it to work.

## Quick fix

1. Get a [Google Sheets API key](https://console.cloud.google.com/apis/credentials) (create API key, enable **Google Sheets API**).
2. In `itl-website`, create or edit **`.env.local`** and add:
   ```bash
   GOOGLE_SHEETS_API_KEY=your-actual-api-key-here
   ```
3. Restart the dev server (`npm run dev`).

---

## 1. Create a Google Cloud API key

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a project.
3. **Enable the API**: **APIs & Services** → **Library** → search **“Google Sheets API”** → **Enable**.
4. **Create credentials**: **APIs & Services** → **Credentials** → **Create credentials** → **API key**.
5. Copy the API key. (Optional: restrict it to “Google Sheets API” and/or your domain under **API key restrictions**.)

## 2. Add the key to your environment

### Local development

Add to **`.env.local`** in the `itl-website` folder:

```bash
GOOGLE_SHEETS_API_KEY=your-actual-api-key-here
```

Restart the dev server (`npm run dev`) after changing env vars.

### Production (e.g. Vercel)

1. Open your project in **Vercel** → **Settings** → **Environment Variables**.
2. Add **`GOOGLE_SHEETS_API_KEY`** with your API key (exact name, no extra spaces).
3. Scope it to **Production** (and **Preview** if you use catalog search on preview deploys).
4. **Redeploy** (e.g. Deployments → ⋮ → Redeploy). Env vars are baked in at deploy time; changes only apply after a new deploy.

## 3. Verify

- Open a page with catalog search (e.g. `/catalog-mouse-models` or `/all-catalog-mouse-models`).
- The search box should load; searching should return results from the sheet.
- If you see **“GOOGLE_SHEETS_API_KEY is not set. Catalog search is unavailable.”**, the key is missing or not loaded. Check `.env.local` / Vercel env and restart or redeploy.

## Spreadsheet

The app uses a specific Google Sheet (ID and sheet name are set in `/api/catalog`). If you use your own sheet, update `src/app/api/catalog/route.ts` (`SPREADSHEET_ID`, `SHEET_NAME`) and ensure the sheet is readable by the API key (same Google account or shared appropriately).

## Troubleshooting

| Issue | Fix |
|-------|-----|
| “GOOGLE_SHEETS_API_KEY is not set” | Add the key to `.env.local` or Vercel env and restart/redeploy. |
| **Key is in Vercel but still “not set”** | 1) Use **exact** name `GOOGLE_SHEETS_API_KEY` (not `NEXT_PUBLIC_*`). 2) Scope the var to **Production** (and **Preview** if you use preview deploys). 3) **Redeploy** after adding/changing the var—Vercel injects env at deploy time. 4) No leading/trailing spaces in the value. |
| 403 / access denied | Enable **Google Sheets API** for the project and ensure the key can access the sheet. |
| No results / empty | Check that the sheet has a header row and data rows, and that `SHEET_NAME` in the API route matches the tab name. |

---

## Still not working? (key in Vercel, redeployed, still “not set”)

1. **Check status endpoint**  
   Open **`https://<your-vercel-domain>/api/catalog/status`** in a browser. You should see:
   - `{ "configured": true, "source": "GOOGLE_SHEETS_API_KEY" }` → app sees the key; if catalog still fails, the problem is elsewhere (e.g. Sheets API).
   - `{ "configured": false, "source": "none", "hint": "..." }` → app does **not** see the key. Continue below.

2. **Confirm project and scope**  
   - The env var must be on the **same Vercel project** that serves your app (not a different project or team).
   - **Environment**: if you use the **production** URL, the var must be enabled for **Production**. For **preview** URLs, it must be enabled for **Preview**. Match the env to the URL you’re testing.

3. **Delete and re-add the variable**  
   In Vercel → **Settings** → **Environment Variables**: remove `GOOGLE_SHEETS_API_KEY`, save, then add it again (exact name, no spaces). Redeploy.

4. **Check Vercel logs**  
   Vercel → **Logs** (or **Deployments** → your deploy → **Functions** / **Runtime Logs**). When catalog is used, we log `[api/catalog]` if the key is missing. That confirms the running function isn’t seeing the var.

5. **Redeploy correctly**  
   After any env change, use **Deployments** → **⋯** → **Redeploy** (or push a new commit). Avoid “Use existing build” if you changed env vars; do a full redeploy.

6. **Try a different variable name (sanity check)**  
   Add **`CATALOG_API_KEY`** in Vercel with the **same** API key value, scope to Production/Preview, then redeploy. The app checks `GOOGLE_SHEETS_API_KEY`, `NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY`, and **`CATALOG_API_KEY`**.  
   - If **`/api/catalog/status`** then shows `"source": "CATALOG_API_KEY"` and catalog works, the project can read env vars; something is wrong with `GOOGLE_SHEETS_API_KEY` (e.g. override, typo, or secret vs plain).  
   - You can keep using `CATALOG_API_KEY` if you prefer, or fix `GOOGLE_SHEETS_API_KEY` and remove `CATALOG_API_KEY` later.
