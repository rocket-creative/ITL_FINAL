# Manual Test Instructions for Publications Page

## Step-by-Step Testing Guide

### 1. Open the Publications Page
Navigate to: **http://localhost:3000/publications**

### 2. Open Browser Console
- **Chrome/Edge**: Press `F12` or `Ctrl+Shift+J` (Windows) / `Cmd+Option+J` (Mac)
- **Firefox**: Press `F12` or `Ctrl+Shift+K` (Windows) / `Cmd+Option+K` (Mac)
- **Safari**: Press `Cmd+Option+C` (Mac) - you may need to enable Developer menu first

### 3. Check Console Logs
Look for these specific console messages (they have emoji prefixes):

```
📅 All years from data: [array of years]
📊 Total years count: [number]
📚 Publications by year keys: [array of years]
📖 Sample year data - 2014: [number] publications
📖 Sample year data - 2010: [number] publications
🔍 Filtering for years: [array of years being shown]
📋 Filtered publications years: [array of years with publications]
📊 Filtered publications count: [number] years visible
```

**Copy ALL of these messages exactly as they appear!**

### 4. Check Year Dropdown
1. Scroll to the "Filter by year:" dropdown (near top, after search bar)
2. Click on the dropdown to open it
3. Scroll through ALL options
4. Count how many year options there are (excluding "All Years")
5. Note the **oldest year** visible in the dropdown
6. Check specifically for these years:
   - ✓ 2014
   - ✓ 2013
   - ✓ 2012
   - ✓ 2011
   - ✓ 2010

### 5. Check Year Sections on Page
1. Make sure "All Years" is selected in dropdown
2. Scroll down the page
3. List ALL year section headers you can see (they have teal/blue backgrounds)
4. Note which years are expanded vs collapsed
5. Count total year sections visible

### 6. Test Specific Year Selection
1. Select "2014" from the dropdown
2. Check if publications from 2014 appear
3. Check console for new log messages

### 7. Test "Expand All" Button
1. Select "All Years" again
2. Click the "Expand All" button
3. Scroll through the page
4. Check if years before 2015 appear as expanded sections

### 8. Take Screenshots
Take screenshots showing:
- The year dropdown opened with all options visible
- The page scrolled to show year sections (especially pre-2015 years)
- The browser console with all the emoji log messages

## Expected Results

**Based on code analysis:**
- Dropdown should show **24 year options** (2025 to 2001, excluding 2002)
- Oldest year should be **2001**
- Years before 2015 that should appear: **2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2001**
- Console should show all 24 years in the logs
- When "All Years" is selected, all 24 year sections should be visible (though many collapsed)

## Report Back

Please provide:
1. ✅ All console log messages (copy/paste the emoji ones)
2. ✅ Number of year options in dropdown
3. ✅ Oldest year in dropdown
4. ✅ List of all year sections visible on page
5. ✅ Whether years before 2015 are working correctly
6. ✅ Screenshots

## If Years Before 2015 Are Missing

If you DON'T see years before 2015, check:
- Are there any JavaScript errors in the console?
- What do the console logs show for "Total years count"?
- Does the dropdown have a scrollbar? (Maybe years are there but need scrolling)
- Are year sections for pre-2015 visible on the page but just not in dropdown?
