#!/bin/bash
# Automated deployment for QualiFy - Run this to deploy

echo "🚀 QualiFy Automated Deployment"
echo "=================================="
echo ""
echo "Step 1: Checking repository status..."
git status

echo ""
echo "Step 2: Adding files..."
git add -A

echo ""
echo "Step 3: Displaying changes..."
git diff --cached --stat

echo ""
echo "Step 4: Committing changes..."
git commit -m "fix: correct Supabase URL typo for form submission

- Fixed index.html Supabase URL: tyrwkeqavitw4fjfcnj → tyrwkeqavitwkffjcznj
- Updated env.example with correct project reference
- Added comprehensive deployment documentation
- Form now correctly routes to tyrwkeqavitwkffjcznj.supabase.co

Files modified:
- index.html (line 702)
- env.example (line 12)
- deploy.sh (new)
- DEPLOYMENT_READY_OCT23.md (new)
- SUPABASE_FIX_OCT23.md (new)
- TEAM_STATUS_OCT23.md (new)

Ready for Netlify auto-deployment on git push."

echo ""
echo "Step 5: Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📡 Netlify will auto-deploy within 1-2 minutes"
echo "🔗 Monitor at: https://app.netlify.com"
echo "📊 Check Supabase: https://app.supabase.com/project/tyrwkeqavitwkffjcznj"
