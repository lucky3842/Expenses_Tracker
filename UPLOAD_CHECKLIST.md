# ✅ InfinityFree Upload Checklist

## Files to Upload (3 files)

Upload these files to your InfinityFree `htdocs/` or `public_html/` folder:

- [ ] **index.html** - Main expense tracker app
- [ ] **data.php** - Backend API for data storage  
- [ ] **.htaccess** - Server configuration (optional but recommended)

## Step-by-Step Upload Process

### Step 1: Access File Manager
- [ ] Login to InfinityFree control panel
- [ ] Click "File Manager" or "Online File Manager"
- [ ] Navigate to `htdocs/` folder

### Step 2: Upload Files
- [ ] Click "Upload" button
- [ ] Select and upload `index.html`
- [ ] Select and upload `data.php`
- [ ] Select and upload `.htaccess`
- [ ] Wait for all uploads to complete

### Step 3: Set Permissions
- [ ] Right-click on `data.php`
- [ ] Select "Change Permissions" or "CHMOD"
- [ ] Set to `644` or `755`
- [ ] Click "Save"

### Step 4: Test the App
- [ ] Open your website: `http://your-site.infinityfreeapp.com`
- [ ] Check if page loads correctly
- [ ] Open browser console (F12)
- [ ] Look for "Data loaded from server" message

### Step 5: Test Cross-Device Sync
- [ ] Open app on your phone
- [ ] Add an expense
- [ ] Open app on another phone (or browser)
- [ ] Wait 3 seconds
- [ ] Verify expense appears on second device

### Step 6: Test Admin Panel
- [ ] Click "Admin Panel"
- [ ] Login with credentials
- [ ] Add balance
- [ ] Check if it syncs to user panel

## Verification Checklist

After upload, verify:

- [ ] Website loads without errors
- [ ] Can add expenses
- [ ] Can access admin panel
- [ ] QR code displays when clicking "Pay"
- [ ] UPI ID is visible: `7337772694@ybl`
- [ ] Data syncs between devices (wait 3 seconds)
- [ ] File `expense_data.json` is created in htdocs folder

## Common Issues & Solutions

### ❌ "Data not saving"
**Solution:** Check data.php permissions (should be 644 or 755)

### ❌ "500 Internal Server Error"
**Solution:** Check if PHP is enabled on your InfinityFree account

### ❌ "Data not syncing between phones"
**Solution:** 
1. Both phones must use the SAME URL
2. Wait at least 3 seconds for sync
3. Check internet connection on both devices

### ❌ "expense_data.json not created"
**Solution:** 
1. Check folder permissions (should be 755)
2. Try adding an expense to trigger file creation
3. Check PHP error logs in control panel

## File Structure After Upload

```
htdocs/
├── index.html              ← Your app
├── data.php                ← Backend API
├── .htaccess               ← Server config
└── expense_data.json       ← Auto-created after first use
```

## Security Checklist

- [ ] Change admin password in index.html
- [ ] Enable HTTPS/SSL in InfinityFree control panel
- [ ] Backup `expense_data.json` regularly
- [ ] Don't share your website URL publicly

## Final Test

**On Phone 1 (User):**
1. Open website
2. Add expense: "Test Item" - ₹100
3. Note the wallet balance

**On Phone 2 (Admin - Your Father):**
1. Open same website URL
2. Go to Admin Panel
3. Login
4. Add balance: ₹500
5. Check expense history

**Back on Phone 1:**
1. Wait 3 seconds
2. Wallet balance should increase by ₹500 ✓
3. Refresh if needed

## Success! 🎉

If all checkboxes are ticked, your expense tracker is live and syncing across devices!

**Your Website:** `http://your-site.infinityfreeapp.com`

---

**Need Help?**
- See: `INFINITYFREE_DEPLOYMENT.md` for detailed guide
- Check: `README_INFINITYFREE.txt` for quick reference
- Forum: https://forum.infinityfree.net/
