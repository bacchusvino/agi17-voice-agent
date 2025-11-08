#!/bin/bash
# Deploy QualiFy to Netlify
# This script commits fixes and prepares for deployment

set -e

echo "🚀 QualiFy Deployment Script"
echo "============================"
echo ""

# Check git status
echo "📋 Checking git status..."
git status

echo ""
echo "📝 Staging changes..."
git add -A

echo ""
echo "📊 Changes to be committed:"
git diff --cached --name-only

echo ""
read -p "⚠️  Continue with commit? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "✅ Committing changes..."
    git commit -m "fix: correct Supabase URL and deploy fixes for form submission

- Fixed Supabase URL in index.html (tyrwkeqavitw4fjfcnj → tyrwkeqavitwkffjcznj)
- Updated env.example with correct URL
- Verified all HTML files have proper credentials
- Ready for Netlify deployment"
    
    echo ""
    echo "📤 Pushing to GitHub..."
    git push
    
    echo ""
    echo "✅ Push complete!"
    echo ""
    echo "🌐 Next steps for Netlify deployment:"
    echo "1. Go to https://app.netlify.com"
    echo "2. Select the qualifyleads site"
    echo "3. Deploys should auto-trigger from main branch"
    echo "4. Check deployment status in Netlify dashboard"
else
    echo "❌ Deployment cancelled"
fi
