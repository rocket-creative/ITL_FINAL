# Publications Page Testing Guide

## Changes Made

### 1. Added Diagnostic Logging
Added comprehensive console logging to track data loading and filtering:
- `📅 All years from data` - Shows all years extracted from data
- `📊 Total years count` - Number of years (should be 25)
- `📚 Publications by year keys` - All year keys in the data object
- `📖 Sample year data` - Sample counts for 2014 and 2010
- `🔍 Filtering for years` - Which years are being filtered
- `📋 Filtered publications years` - Which years have publications after filtering
- `📊 Filtered publications count` - How many years are visible

### 2. Fixed Missing Year 2002
Added empty array for year 2002 to maintain chronological integrity (no publications existed for that year).

## Testing Instructions

### Step 1: Open the Page
1. Make sure dev server is running: http://localhost:3000/publications
2. Open your browser to that URL
3. Press **F12** (or **Cmd+Option+I** on Mac) to open Developer Tools
4. Click the **Console** tab

### Step 2: Check Console Logs
Look for the emoji console messages. You should see:

```
📅 All years from data: (25) ['2025', '2024', '2023', ..., '2001']
📊 Total years count: 25
📚 Publications by year keys: (25) ['2001', '2003', '2004', ..., '2025']
📖 Sample year data - 2014: 8 publications
📖 Sample year data - 2010: 5 publications
🔍 Filtering for years: 25 years
🔍 Years to filter: (25) ['2025', '2024', ..., '2001']
📋 Filtered publications years: (25) ['2025', '2024', ..., '2001']
📊 Filtered publications count: 25 years visible
```

**✅ If you see all 25 years, the data is loading correctly!**

### Step 3: Check Year Dropdown
1. Look for the section with "Filter by year:" text
2. Click on the dropdown menu
3. Scroll through ALL the options

**You should see:**
- "All Years" (at top)
- 2025
- 2024
- ... (all years down to)
- **2014** ← Important!
- **2013** ← Important!
- **2012** ← Important!
- ... down to
- **2001** ← Oldest year

**✅ Total options: 26 (1 "All Years" + 25 year options)**

### Step 4: Test Year Selection
1. Select "2014" from the dropdown
2. Check console - should show: `🔍 Years to filter: ['2014']`
3. You should see "2014 Publications" header appear
4. Click to expand it - should show **8 publications**

### Step 5: Test "All Years" View
1. Select "All Years" from dropdown
2. Scroll down the page
3. You should see year section headers for:
   - 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015
   - **2014** ← Should be visible!
   - **2013** ← Should be visible!
   - **2012** ← Should be visible!
   - ... down to
   - **2001** ← Should be visible!

### Step 6: Test Expand/Collapse
1. Click "Expand All" button (top right)
2. All year sections should expand showing publications
3. Verify years before 2015 expand correctly
4. Click "Collapse All" button
5. All sections should collapse

## Expected Results

### ✅ Success Criteria
- [ ] Console shows 25 years loaded
- [ ] Dropdown contains 26 options (All Years + 25 years)
- [ ] Dropdown shows years 2025 down to 2001
- [ ] Selecting "All Years" displays all 25 year sections
- [ ] Years before 2015 are visible on the page
- [ ] Can select and view individual years (e.g., 2014)
- [ ] Expand All/Collapse All works for all years

### ❌ If Years Before 2015 Still Don't Appear

**Check these:**

1. **Console Errors**: Look for red error messages in console
2. **Years Count**: If console shows less than 25 years, there's a data loading issue
3. **Filtered Count**: If "Filtered publications count" is less than 25, filtering logic has a bug
4. **Browser Cache**: Try hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
5. **React DevTools**: Install React DevTools and check component state

## Verified Data Structure

The data file contains **25 years** with publications:
- **2025**: 17 pubs
- **2024**: 26 pubs
- **2023**: 11 pubs
- **2022**: 6 pubs
- **2021**: 38 pubs
- **2020**: 46 pubs
- **2019**: 35 pubs
- **2018**: 42 pubs
- **2017**: 21 pubs
- **2016**: 19 pubs
- **2015**: 15 pubs
- **2014**: 8 pubs ← Before 2015
- **2013**: 4 pubs ← Before 2015
- **2012**: 2 pubs ← Before 2015
- **2011**: 7 pubs ← Before 2015
- **2010**: 5 pubs ← Before 2015
- **2009**: 10 pubs ← Before 2015
- **2008**: 17 pubs ← Before 2015
- **2007**: 9 pubs ← Before 2015
- **2006**: 11 pubs ← Before 2015
- **2005**: 2 pubs ← Before 2015
- **2004**: 6 pubs ← Before 2015
- **2003**: 1 pubs ← Before 2015
- **2002**: 0 pubs ← Before 2015 (empty year)
- **2001**: 1 pubs ← Before 2015

**Total: 358 publications across 25 years**

## What to Report Back

Please test and report:
1. What do the console logs show? (copy/paste the emoji ones)
2. How many options in the year dropdown?
3. What's the oldest year in the dropdown?
4. When "All Years" is selected, which year sections are visible on the page?
5. Can you select and view 2014 publications?

This will help diagnose if the issue is with data loading, rendering, or something else!
