

## Problem

The "Forgot Password" button uses `window.open()` to open Gmail compose directly. This fails inside the Lovable preview iframe because `mail.google.com` refuses to load in embedded contexts (X-Frame-Options). Even outside the iframe, popup blockers can prevent it.

## Solution

Change the approach to use `window.location.href` with a `mailto:` link as the primary method, with Gmail compose as a fallback opened via `window.open`. This ensures:
1. The device default mail app opens reliably (works everywhere, including embedded previews)
2. If the user prefers Gmail, they can still access it

### Implementation

**Files to modify:** `src/pages/Login.tsx`, `src/pages/LandingPage.tsx`

In both files, replace the `window.open(gmail_url)` call with:

```typescript
const gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=connect@jguni.in&su=...&body=...";
const mailtoUrl = "mailto:connect@jguni.in?subject=...&body=...";

// Try mailto first (works everywhere), then offer Gmail as alternative
window.location.href = mailtoUrl;
```

This uses `window.location.href = "mailto:..."` which:
- Opens the default mail app on desktop/mobile
- Works inside iframes and embedded previews
- Pre-fills the To, Subject, and Body fields identically to the current Gmail compose URL
- Falls back gracefully if no mail client is configured

A toast notification will also appear confirming the action and offering a direct Gmail link as an alternative.

### Changes Summary

| File | Change |
|------|--------|
| `src/pages/Login.tsx` (lines 101-105) | Replace `window.open(gmail)` with `window.location.href = mailto` + toast with Gmail link |
| `src/pages/LandingPage.tsx` (lines 328-332) | Same change |

