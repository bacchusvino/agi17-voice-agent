#!/bin/bash

# Navigate to project directory
cd /Users/joschapirtle/agi17-voice-agent

# Add all new files
git add TEST_INSTRUCTIONS.md
git add VOICE_AI_SCRIPT.md
git add END_TO_END_TEST_REPORT.md
git add DEMO_VIDEO_SCRIPT.md
git add TEAM_UPDATE_OCT_6.md

# Commit with descriptive message
git commit -m "Add complete documentation: test instructions, voice AI script, test report, demo script, and team update"

# Push to GitHub
git push origin main

echo "✅ All documentation committed and pushed to GitHub!"
echo ""
echo "Next steps:"
echo "1. Share TEAM_UPDATE_OCT_6.md with the team"
echo "2. Send VOICE_AI_SCRIPT.md to MAG"
echo "3. Check in with Ismoil/Piyush on N8N progress"
