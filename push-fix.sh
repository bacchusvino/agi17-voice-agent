#!/bin/bash
# Add GitHub remote and push the Supabase key fix

cd ~/Desktop/agi17-voice-agent-main

# Add GitHub remote
git remote add origin https://github.com/bacchusivno/agi17-voice-agent.git

# Verify remote was added
echo "Current remotes:"
git remote -v

echo ""
echo "Staging the Supabase key fix..."
git add js/supabase.js

echo "Committing the fix..."
git commit -m "fix: update Supabase API key to correct publishable key"

echo ""
echo "Ready to push. When you're ready, run:"
echo "git push -u origin main"
