# Fixes Applied - October 12, 2025

## Text Visibility & Contrast Issues - FIXED ✅

### Problems Identified:
1. **Hero subtitle invisible** - "QualiFy captures, qualifies, and books local buyers/sellers for you." was gray (#666) text on purple gradient background
2. **Button text low contrast** - "Watch 60 second demo" and "Start Voice Capture" buttons had blue text on purple background
3. **Font rendering** - Text wasn't as crisp as it could be

### Solutions Applied:
- Added `#hero p` override to force white text color in hero section
- Changed `.btn-secondary` to use white text/border instead of blue (for better contrast on purple background)
- Changed `.btn-outline-primary` to use white text/border 
- Added `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` for crisper text

## FAQ Toggle Functionality - FIXED ✅

### Problem:
- FAQ accordion wasn't opening when clicking the "+" buttons
- `toggleFaq()` function was scoped inside ES6 module, making it inaccessible to inline `onclick` handlers

### Solution:
- Changed `function toggleFaq(index)` to `window.toggleFaq = function(index)` to expose it globally

## Action Items 🚨

### URGENT - Missing Demo Video
**The "Watch 60-sec Demo" button links to #proof section, but we don't have an actual 60-second demo video yet.**

**Options:**
1. Record a quick 60-second demo showing the product in action
2. Change button text to something else (e.g., "See Social Proof", "View Results")
3. Remove the button entirely until we have a video

**Recommendation:** Post this on WhatsApp since the team hasn't checked GitHub in a while.

---

## Files Modified:
- `index.html` (text contrast, FAQ toggle, font smoothing)

## Testing:
- [x] Text visibility on hero section
- [x] Button contrast and readability  
- [x] FAQ accordion expand/collapse
- [ ] 60-second demo video (DOES NOT EXIST YET)

---
*Fixes by: Joscha (via Claude AI)*
*Date: October 12, 2025*
