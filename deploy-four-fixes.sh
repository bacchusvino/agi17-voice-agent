#!/bin/bash
# Deploy all 4 fixes to production

cd ~/Desktop/agi17-voice-agent-main

echo "📦 Staging files..."
git add agent-dashboard.html supabase/migrations/20251112_fix_agent_signup_rls.sql FOUR_FIXES_APPLIED_NOV12.md

echo "📝 Committing..."
git commit -m "feat: Apply final 4 fixes (RLS, Home nav, Filters, n8n webhook) - Demo ready"

echo "🚀 Pushing to GitHub..."
git push origin main

echo "✅ All files deployed!"
echo ""
echo "Next steps:"
echo "1. Run RLS policy in Supabase SQL Editor"
echo "2. Get n8n webhook URL from Mandar"
echo "3. Update line 520 in agent-dashboard.html"
echo ""
echo "Netlify will auto-deploy in ~1 min"
