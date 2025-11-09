#!/bin/bash

# Initialize git repository
git init

# Configure git
git config user.email "joscha@example.com"
git config user.name "Joscha Pirtle"

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: AIG-17 voice agent codebase"

echo "✅ Git repository initialized"
echo "Current branch: $(git rev-parse --abbrev-ref HEAD)"
echo "Total commits: $(git rev-list --count HEAD)"
