# URGENT: N8N Duplicate Call Fix

## Problem
Two Retell calls are being triggered for each new lead submission, 30 seconds apart.

## Root Cause
You have TWO n8n workflows both watching for `status="new"` in the leads table and triggering Retell.

## Fix Steps

### Step 1: Find Duplicate Workflows
1. Open your n8n dashboard
2. Go to "Workflows" 
3. Look for ALL workflows that:
   - Watch the Supabase `leads` table
   - Trigger when `status="new"`
   - Call Retell API to initiate calls

You probably have names like:
- "Qualify Lead → Retell Call"
- "New FSBO Lead → Voice Call"
- "Lead Qualification Automation"
- Or similar

### Step 2: Identify Which to Keep
- Keep the NEWEST/MOST COMPLETE workflow
- DISABLE/DELETE the old/duplicate one

### Step 3: Add Duplicate Prevention
In the workflow you're KEEPING, add this check BEFORE calling Retell:

**Add a "Check if already contacted" node:**

```javascript
// Node: "Check Duplicate Call Prevention"
// Type: IF node or Filter node

const lead = $json;

// Skip if already contacted (prevents duplicate calls)
if (lead.contacted_at !== null) {
  return false; // Don't trigger call
}

// Skip if status is not "new"
if (lead.status !== 'new') {
  return false;
}

return true; // OK to call
```

### Step 4: Update Lead Status IMMEDIATELY

Right AFTER detecting a new lead, BEFORE calling Retell, update the lead:

```javascript
// Node: "Mark as Contacted"
// Type: Supabase Update

UPDATE leads 
SET 
  status = 'contacted',
  contacted_at = NOW()
WHERE 
  id = {{ $json.id }}
  AND contacted_at IS NULL  -- Only update if not already contacted
```

This prevents the second workflow from picking it up!

### Step 5: Test
1. Disable ALL workflows
2. Enable ONLY the one you fixed
3. Submit a test lead
4. Verify ONLY ONE call is made
5. Check Supabase - `contacted_at` should be set immediately

## Quick Fix Option
If you can't find the duplicate workflow:

**Temporarily disable ALL workflows that watch for new leads**

Then enable them ONE AT A TIME to find which one is working.

## Screenshot Request
Please send Josh screenshots of:
1. All active workflows (workflow list page)
2. The workflow you're keeping (show full flow)
3. Proof that duplicate is disabled

## Timeline
NEED THIS FIXED TODAY - Demo dry run is Monday (4 days away)

## Questions?
Message Josh or the core group immediately if stuck.
