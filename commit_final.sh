#!/bin/bash

# Add sample data tool and updated landing page
cd /Users/joschapirtle/agi17-voice-agent

git add index.html
git add add-sample-data.html
git add ADD_SAMPLE_DATA_README.md

git commit -m "Add phone field to landing page and sample data generation tool"

git push origin main

echo "✅ Changes committed and pushed!"
echo ""
echo "Next steps:"
echo "1. Test phone field: http://localhost:8000/index.html"
echo "2. Add sample data: http://localhost:8000/add-sample-data.html"
echo "3. View dashboard: http://localhost:8000/dashboard.html"
