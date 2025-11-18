#!/bin/bash

# Firebase Hosting Deployment Script

echo "🔥 Setting up Firebase Hosting..."

# Install Firebase CLI if not installed
if ! command -v firebase &> /dev/null; then
    echo "Installing Firebase CLI..."
    npm install -g firebase-tools
fi

# Login to Firebase
echo "Logging in to Firebase..."
firebase login

# Initialize Firebase (if not already done)
if [ ! -f firebase.json ]; then
    echo "Initializing Firebase..."
    firebase init hosting
fi

# Copy standalone app as index.html
cp standalone-app.html public/index.html

# Deploy
echo "Deploying to Firebase Hosting..."
firebase deploy --only hosting

echo ""
echo "✅ Deployment complete!"
echo "Your app is live at: https://<your-project>.web.app"
echo ""
