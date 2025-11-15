#!/bin/bash
# Fix the GitHub remote with correct username and push

cd ~/Desktop/agi17-voice-agent-main

# Remove the old incorrect remote
git remote remove origin

# Add the correct remote
git remote add origin https://github.com/bacchusvino/agi17-voice-agent.git

echo "✅ Remote configured correctly:"
git remote -v

echo ""
echo "Checking git status..."
git status

echo ""
echo "Pushing to GitHub..."
git push -u origin main
