#!/bin/bash

# GitHub Pages Deployment Script for Expense Tracker

echo "🚀 Deploying to GitHub Pages..."

# Check if git is initialized
if [ ! -d .git ]; then
    echo "Initializing git repository..."
    git init
    git branch -M main
fi

# Copy standalone-app.html as index.html for GitHub Pages
cp standalone-app.html index.html

# Add files
git add index.html standalone-app.html

# Commit
git commit -m "Deploy expense tracker to GitHub Pages"

echo ""
echo "✅ Files prepared!"
echo ""
echo "📝 Next steps:"
echo "1. Create a new repository on GitHub"
echo "2. Run: git remote add origin <your-repo-url>"
echo "3. Run: git push -u origin main"
echo "4. Go to repo Settings → Pages → Select 'main' branch"
echo "5. Your app will be live at: https://<username>.github.io/<repo-name>"
echo ""
