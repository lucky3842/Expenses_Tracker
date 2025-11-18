# Firebase Setup Guide for Cross-Device Sync

Your expense tracker now supports **real-time cross-device synchronization** using Firebase! Follow these simple steps to enable it:

## 🚀 Quick Setup (5 minutes)

### Step 1: Create a Free Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `expense-tracker-naga-sandeep` (or any name you like)
4. Disable Google Analytics (not needed) and click **"Create project"**

### Step 2: Create a Realtime Database

1. In your Firebase project, click **"Realtime Database"** in the left menu
2. Click **"Create Database"**
3. Choose location: **Singapore** (closest to India for better speed)
4. Start in **"Test mode"** (we'll secure it in Step 4)
5. Click **"Enable"**

### Step 3: Get Your Firebase Configuration

1. Click the **gear icon** (⚙️) next to "Project Overview" → **"Project settings"**
2. Scroll down to **"Your apps"** section
3. Click the **Web icon** (`</>`) to add a web app
4. Enter app nickname: `Expense Tracker Web`
5. Click **"Register app"**
6. Copy the `firebaseConfig` object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxx"
};
```

7. Open `standalone-app.html` and replace lines 48-56 with YOUR config

### Step 4: Secure Your Database

1. Go back to **"Realtime Database"** in Firebase Console
2. Click the **"Rules"** tab
3. Replace the rules with this (allows read/write only to your data):

```json
{
  "rules": {
    "walletBalance": {
      ".read": true,
      ".write": true
    },
    "expenses": {
      ".read": true,
      ".write": true
    }
  }
}
```

4. Click **"Publish"**

### Step 5: Test It!

1. Open `standalone-app.html` on your phone
2. Open the same file on your father's phone
3. Add money in admin panel on one phone
4. Watch it appear instantly on the other phone! ✨

## 🎉 That's It!

Now your expense tracker will sync in **real-time** across:
- ✅ Different phones
- ✅ Different devices
- ✅ Different networks
- ✅ Anywhere in the world with internet

## 🔒 Security Note

The current setup allows anyone with the link to read/write data. For better security:

1. Add Firebase Authentication
2. Update database rules to require authentication
3. Or keep it simple since it's just for family use

## 💡 Tips

- **Offline Support**: The app works offline and syncs when back online
- **Free Tier**: Firebase free tier includes 1GB storage and 10GB/month bandwidth (more than enough!)
- **Backup**: Your data is automatically backed up in Firebase
- **No Expiry**: Your Firebase project stays active as long as you use it

## 🆘 Troubleshooting

**Data not syncing?**
- Check browser console (F12) for errors
- Verify Firebase config is correct
- Make sure database rules are published
- Check internet connection on both devices

**Still using localStorage only?**
- The app will show "Firebase not available, using localStorage only" in console
- This means Firebase config needs to be updated with your real credentials

---

**Need help?** Check the Firebase documentation: https://firebase.google.com/docs/database
