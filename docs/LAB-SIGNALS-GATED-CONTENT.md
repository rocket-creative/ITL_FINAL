# Lab Signals Gated Content System

## Overview

Lab Signals articles are gated content that requires newsletter subscription for access. This system integrates with Flodesk to manage subscribers and deliver biweekly newsletters.

## How It Works

### User Flow

1. **New Visitor** lands on Lab Signals article
   - Sees blurred preview (first ~500 characters)
   - Presented with subscription form (Flodesk embedded)

2. **Subscription Process**
   - User fills out Flodesk form (name + email)
   - Flodesk captures subscriber data
   - On successful submission, content unlocks immediately
   - Cookie set for 90 days (`itl_labsignals_access`)

3. **Returning Subscriber**
   - If cookie exists → instant access
   - If cookie expired → "Sign in with email" option
   - Enter email → verify → regain access + new cookie

4. **Biweekly Newsletter**
   - Managed automatically by Flodesk
   - Subscribers receive research insights every 2 weeks
   - All subscriber data stored in Flodesk

## Technical Implementation

### Components

**NewsletterGate Component**
- Location: `src/components/UXUIDC/NewsletterGate.tsx`
- Wraps article content
- Manages access state
- Embeds Flodesk form
- Listens for form submission via postMessage

**Key Features:**
- Cookie-based access control
- Flodesk form integration
- Returning user verification
- Preview content with blur effect
- Responsive design

### Cookie Management

```typescript
Cookie Name: itl_labsignals_access
Value: "true"
Duration: 90 days
Path: /
SameSite: Lax
```

### Flodesk Integration

**Form Embed:**
- Embedded via iframe
- Form ID: `689e278b40db38a14e1ffe6b`
- PostMessage listener for submission events

**Event Detection:**
The component listens for these postMessage events:
```javascript
event.data.type === 'fd-form-submit'
event.data.event === 'submit'
event.data.formSubmitted (from Flodesk origin)
```

### API Endpoints

**`/api/verify-subscriber` (POST)**
- Verifies returning subscriber email
- Currently accepts any valid email format
- Ready for Flodesk API integration

Request:
```json
{
  "email": "user@example.com"
}
```

Response:
```json
{
  "verified": true,
  "message": "Access granted"
}
```

## Configuration

### Environment Variables

Add to `.env.local`:

```bash
# Flodesk Form ID (already configured)
NEXT_PUBLIC_FLODESK_FORM_ID=689e278b40db38a14e1ffe6b

# Optional: Flodesk API key for subscriber verification
FLODESK_API_KEY=your_api_key_here
```

### Flodesk Setup

1. **Get Form ID:**
   - Login to Flodesk
   - Navigate to Forms
   - Select "Lab Signals" form
   - Copy form ID from embed code

2. **Configure Form:**
   - Required fields: Name, Email
   - Success redirect: Optional
   - Form styling: Match Lab Signals brand (gold/black/white)

3. **Newsletter Automation:**
   - Create workflow in Flodesk
   - Trigger: New subscriber to "Lab Signals" segment
   - Action: Send biweekly newsletter
   - Frequency: Every 2 weeks

## Usage in Pages

### Article Pages

```tsx
import { NewsletterGate } from '@/components/UXUIDC';

export default function ArticlePage() {
  const previewContent = <p>First 500 characters...</p>;
  
  return (
    <NewsletterGate previewContent={previewContent}>
      <article>
        {/* Full article content */}
      </article>
    </NewsletterGate>
  );
}
```

### Props

```typescript
interface NewsletterGateProps {
  children: React.ReactNode;        // Full article content
  articleTitle?: string;             // Article title (optional)
  previewContent?: React.ReactNode;  // Preview shown before signup
}
```

## Security Considerations

### Current Implementation

✅ **Strengths:**
- Cookie-based access control
- Legitimate email collection via Flodesk
- No sensitive data stored client-side
- GDPR-compliant (Flodesk handles consent)

⚠️ **Limitations:**
- Cookie can be manually set (low risk for newsletter content)
- No server-side subscriber validation yet
- Email verification is client-side

### Future Enhancements

If stronger security is needed:

1. **Database Integration:**
   - Store verified subscribers in Vercel Postgres
   - Sync with Flodesk via webhooks
   - Server-side verification on each request

2. **Flodesk API Integration:**
   - Use Flodesk API to verify subscribers
   - Check subscription status before granting access
   - Handle unsubscribes automatically

3. **Session Management:**
   - Replace cookies with JWT tokens
   - Implement refresh token flow
   - Add rate limiting

## Testing

### Manual Testing

1. **New Subscriber Flow:**
   ```
   ✓ Visit /lab-signals/[slug]
   ✓ See blurred preview
   ✓ Fill Flodesk form
   ✓ Content unlocks
   ✓ Cookie set
   ```

2. **Returning Subscriber:**
   ```
   ✓ Clear cookies
   ✓ Visit article
   ✓ Click "Sign in with email"
   ✓ Enter email
   ✓ Access granted
   ```

3. **Cookie Persistence:**
   ```
   ✓ Subscribe to article
   ✓ Close browser
   ✓ Reopen and visit article
   ✓ Instant access (no form)
   ```

### Development Mode

```bash
# Start dev server
npm run dev

# Test locally
open http://localhost:3000/lab-signals/[article-slug]
```

## Troubleshooting

### Content Not Unlocking After Signup

**Issue:** User submits form but content stays locked

**Solutions:**
1. Check browser console for postMessage events
2. Verify Flodesk form ID is correct
3. Ensure iframe has proper permissions
4. Check if cookie is being set (DevTools → Application → Cookies)

### Returning User Can't Sign In

**Issue:** Email verification fails

**Solutions:**
1. Check `/api/verify-subscriber` endpoint is accessible
2. Verify email format validation
3. Check network tab for API errors
4. Ensure API route has proper CORS headers

### Cookie Not Persisting

**Issue:** User loses access after closing browser

**Solutions:**
1. Check cookie expiry (should be 90 days)
2. Verify SameSite attribute is set to "Lax"
3. Ensure HTTPS in production (required for secure cookies)
4. Check if user has third-party cookies disabled

## Analytics Tracking

Track these events:

```javascript
// Newsletter gate shown
gtag('event', 'newsletter_gate_shown', {
  article_slug: '[slug]',
});

// Form submission
gtag('event', 'newsletter_signup', {
  article_slug: '[slug]',
  method: 'flodesk_form',
});

// Content unlocked
gtag('event', 'content_unlocked', {
  article_slug: '[slug]',
});

// Returning user signin
gtag('event', 'subscriber_signin', {
  article_slug: '[slug]',
});
```

## Maintenance

### Regular Tasks

**Weekly:**
- Monitor Flodesk subscriber count
- Check for form submission errors
- Review cookie analytics

**Monthly:**
- Audit article access patterns
- Review newsletter open rates
- Update article preview content if needed

**Quarterly:**
- Review security considerations
- Update Flodesk form styling
- Optimize conversion rates

## Support

### Common Questions

**Q: Can I change the cookie duration?**
A: Yes, modify `COOKIE_DAYS` in `NewsletterGate.tsx` (currently 90 days)

**Q: How do I customize the Flodesk form?**
A: Edit form in Flodesk dashboard, changes reflect automatically

**Q: Can users access without subscribing?**
A: No, unless they manually set the cookie (acceptable risk for newsletter content)

**Q: How do I export subscriber list?**
A: Login to Flodesk → Subscribers → Export to CSV

**Q: Can I use a different newsletter service?**
A: Yes, but requires code modifications to integrate new provider

## References

- Flodesk Documentation: https://help.flodesk.com
- Next.js API Routes: https://nextjs.org/docs/api-routes
- Cookie Management: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
- PostMessage API: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
