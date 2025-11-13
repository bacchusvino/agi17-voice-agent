#!/bin/bash
# Test Supabase API key validity

SUPABASE_URL="https://tyrwkeqavitwkffjcznj.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5cndrZXFhdml0d2tmZmpjem5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5OTA5MzcsImV4cCI6MjA3NDU2NjkzN30.XlP3j-5SQjje7nfv2jvtccQMJtlbSI22vqQtfEj7Nc4"

echo "🔐 Testing Supabase API Key Validity"
echo "===================================="
echo ""

# Test 1: Health/Auth check
echo "Test 1: Checking authentication..."
RESPONSE=$(curl -s -X GET "${SUPABASE_URL}/rest/v1/" \
  -H "Authorization: Bearer ${SUPABASE_KEY}" \
  -H "Content-Type: application/json" \
  -w "\n%{http_code}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "404" ]; then
  echo "✅ Authentication: WORKING (HTTP $HTTP_CODE)"
else
  echo "❌ Authentication: FAILED (HTTP $HTTP_CODE)"
  echo "Response: $BODY"
fi

echo ""

# Test 2: Check if leads table exists
echo "Test 2: Checking 'leads' table..."
RESPONSE=$(curl -s -X GET "${SUPABASE_URL}/rest/v1/leads?limit=1" \
  -H "Authorization: Bearer ${SUPABASE_KEY}" \
  -H "Content-Type: application/json" \
  -w "\n%{http_code}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ Leads table: EXISTS (HTTP $HTTP_CODE)"
  echo "Sample response: ${BODY:0:100}..."
elif [ "$HTTP_CODE" = "404" ]; then
  echo "⚠️  Leads table: NOT FOUND (HTTP 404)"
else
  echo "❌ Leads table query: FAILED (HTTP $HTTP_CODE)"
  echo "Response: $BODY"
fi

echo ""

# Test 3: Try to insert a test lead
echo "Test 3: Attempting to create a test lead..."
TEST_DATA="{\"name\":\"Test Lead\",\"email\":\"test@example.com\",\"phone\":\"+15551234567\",\"source\":\"api_test\",\"status\":\"new\",\"notes\":\"API key validation test\"}"

RESPONSE=$(curl -s -X POST "${SUPABASE_URL}/rest/v1/leads" \
  -H "Authorization: Bearer ${SUPABASE_KEY}" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d "$TEST_DATA" \
  -w "\n%{http_code}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "201" ]; then
  echo "✅ Create lead: SUCCESS (HTTP 201)"
  LEAD_ID=$(echo "$BODY" | grep -o '"id":[0-9]*' | head -1 | cut -d: -f2)
  if [ ! -z "$LEAD_ID" ]; then
    echo "   Created lead ID: $LEAD_ID"
  fi
elif [ "$HTTP_CODE" = "409" ]; then
  echo "⚠️  Create lead: CONFLICT (might already exist)"
else
  echo "❌ Create lead: FAILED (HTTP $HTTP_CODE)"
  echo "Response: $BODY"
fi

echo ""
echo "===================================="
echo "Summary:"
echo "- URL: $SUPABASE_URL"
echo "- Key status: Check results above"
echo ""
