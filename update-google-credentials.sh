#!/bin/bash

# Script to update Google Service Account credentials in .env file
# Usage: ./update-google-credentials.sh <path-to-new-credentials.json>

if [ $# -eq 0 ]; then
    echo "Usage: $0 <path-to-new-credentials.json>"
    echo "Example: $0 ~/Downloads/nth-cumulus-465703-r7-abc123.json"
    exit 1
fi

CREDENTIALS_FILE="$1"

if [ ! -f "$CREDENTIALS_FILE" ]; then
    echo "Error: Credentials file not found: $CREDENTIALS_FILE"
    exit 1
fi

echo "Updating Google Service Account credentials..."

# Extract values from JSON file
CLIENT_EMAIL=$(grep -o '"client_email": "[^"]*"' "$CREDENTIALS_FILE" | cut -d'"' -f4)
PRIVATE_KEY=$(grep -o '"private_key": "[^"]*"' "$CREDENTIALS_FILE" | cut -d'"' -f4)

if [ -z "$CLIENT_EMAIL" ] || [ -z "$PRIVATE_KEY" ]; then
    echo "Error: Could not extract client_email or private_key from credentials file"
    exit 1
fi

echo "Found client_email: $CLIENT_EMAIL"

# Create backup of current .env file
cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
echo "Created backup of .env file"

# Update .env file
sed -i.tmp "s|GOOGLE_CLIENT_EMAIL=.*|GOOGLE_CLIENT_EMAIL=$CLIENT_EMAIL|" .env
sed -i.tmp "s|GOOGLE_PRIVATE_KEY=.*|GOOGLE_PRIVATE_KEY=\"$PRIVATE_KEY\"|" .env

# Clean up temporary file
rm .env.tmp

echo "Updated .env file with new credentials"
echo "Testing connection..."

# Test the connection
if curl -s http://localhost:5057/api/email/verify > /dev/null; then
    echo "✅ Connection test passed"
else
    echo "⚠️  Connection test failed - you may need to restart the server"
fi

echo "Done! You can now delete the credentials file: $CREDENTIALS_FILE"
