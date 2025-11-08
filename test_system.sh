#!/bin/bash

echo "🧪 QualiFy Quick Test Script"
echo "=============================="
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Run this from the agi17-voice-agent directory"
    exit 1
fi

echo "✅ Found project files"
echo ""

# Start local server in background
echo "🚀 Starting local web server on port 8000..."
python3 -m http.server 8000 > /dev/null 2>&1 &
SERVER_PID=$!
echo "✅ Server started (PID: $SERVER_PID)"
echo ""

sleep 2

# Open pages
echo "📱 Opening landing page in browser..."
open http://localhost:8000/index.html
echo "✅ Landing page opened"
echo ""

sleep 3

echo "📊 Opening dashboard in browser..."
open http://localhost:8000/dashboard.html
echo "✅ Dashboard opened"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 MANUAL TEST STEPS:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1️⃣  In LANDING PAGE:"
echo "   - Fill out the form"
echo "   - Name: Test Lead"
echo "   - Email: test@example.com"
echo "   - Click 'Join the Pilot'"
echo "   - You should see: 'Thanks! We'll reach out shortly.'"
echo ""
echo "2️⃣  In DASHBOARD:"
echo "   - Wait 2-3 seconds"
echo "   - Your test lead should appear!"
echo "   - Click the ✓ button to mark as Qualified"
echo "   - Status should update immediately"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✋ When done testing, press Ctrl+C to stop server"
echo ""

# Wait for user to stop
trap "kill $SERVER_PID 2>/dev/null; echo ''; echo '✅ Server stopped'; exit 0" INT TERM

wait $SERVER_PID
