# Content Security Policy - Flodesk Integration

## Issue
Flodesk forms were being blocked by Content Security Policy (CSP) headers:
```
Framing 'https://link.flodesk.com/' violates the following 
Content Security Policy directive: "frame-src ..."
```

## Solution
Updated `next.config.ts` to whitelist Flodesk domains in CSP directives.

## Changes Made

### CSP Directives Updated

**1. frame-src** (allows iframe embedding)
```
Added: https://*.flodesk.com https://link.flodesk.com
```

**2. script-src** (allows JavaScript execution)
```
Added: https://*.flodesk.com https://link.flodesk.com
```

**3. connect-src** (allows API calls)
```
Added: https://*.flodesk.com https://link.flodesk.com https://api.flodesk.com
```

**4. style-src** (allows CSS loading)
```
Added: https://*.flodesk.com https://link.flodesk.com
```

**5. form-action** (allows form submissions)
```
Added: https://api.flodesk.com https://*.flodesk.com
```

## Testing

After changes, the Flodesk form should:
- ✅ Load inside iframe without CSP errors
- ✅ Display form fields properly
- ✅ Allow form submission
- ✅ Send data to Flodesk API
- ✅ Trigger postMessage events on success

## Verification

1. Clear browser cache
2. Reload page
3. Open DevTools Console
4. Check for CSP errors (should be none)
5. Verify Flodesk iframe loads
6. Test form submission

## Security Notes

- Flodesk domains are now whitelisted
- Only Flodesk can be embedded (not arbitrary domains)
- All other CSP restrictions remain in place
- This follows security best practices for third-party integrations

## Rollback

If needed, remove Flodesk from these CSP directives in `next.config.ts`:
- frame-src
- script-src
- connect-src
- style-src
- form-action

## Related Files

- `next.config.ts` - CSP configuration
- `src/components/UXUIDC/NewsletterGate.tsx` - Flodesk iframe implementation
- `src/components/UXUIDC/FlodeskForm.tsx` - Flodesk form component
