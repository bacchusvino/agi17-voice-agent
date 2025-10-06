#!/bin/bash

# Quick commit script
cd /Users/joschapirtle/agi17-voice-agent

git add .
git commit -m "fix: Add Supabase credentials and create STATUS.md

- Fixed index.html with real Supabase credentials
- Fixed dashboard.html with real Supabase credentials  
- Created comprehensive STATUS.md with project status and next steps
- Everything ready for testing!"

git push origin main

echo "✅ Changes pushed to GitHub!"
echo "🎯 Next: Test the system (see STATUS.md)"
