# InfinityFree Deployment Guide

Perfect! Since you're already hosting on InfinityFree, here's how to enable cross-device sync:

## 📤 Upload These Files to InfinityFree

You need to upload **2 files** to your InfinityFree hosting:

### 1. `index.html` (Main app file)
- This is your expense tracker app
- Upload to: `htdocs/` or `public_html/` folder

### 2. `data.php` (Backend for data storage)
- This stores data on the server so both phones can access it
- Upload to the **same folder** as index.html

## 🚀 Step-by-Step Upload Instructions

### Using File Manager (Easiest):

1. **Login to InfinityFree Control Panel**
   - Go to your InfinityFree dashboard
   - Click on "File Manager" or "Online File Manager"

2. **Navigate to public folder**
   - Open `htdocs/` or `public_html/` folder
   - This is where your website files go

3. **Upload the files**
   - Click "Upload" button
   - Select `index.html` from your computer
   - Select `data.php` from your computer
   - Wait for upload to complete

4. **Set Permissions** (Important!)
   - Right-click on `data.php`
   - Click "Change Permissions" or "CHMOD"
   - Set to `644` or `755`
   - This allows PHP to create the data file

### Using FTP (Alternative):

1. **Get FTP credentials from InfinityFree**
   - FTP Hostname: `ftpupload.net` (or similar)
   - Username: Your InfinityFree username
   - Password: Your FTP password

2. **Use FileZilla or any FTP client**
   - Connect using credentials above
   - Navigate to `htdocs/` folder
   - Drag and drop `index.html` and `data.php`

## ✅ Testing Cross-Device Sync

1. **Open on Phone 1** (User)
   - Go to: `http://your-site.infinityfreeapp.com`
   - Add an expense

2. **Open on Phone 2** (Admin - Your Father)
   - Go to: Same URL
   - Click "Admin Panel" → Login
   - Add balance

3. **Check Phone 1**
   - Wait 3 seconds
   - Balance should update automatically! ✨

## 🔧 Troubleshooting

### Problem: "Data not syncing"

**Check 1: File Permissions**
```
data.php should be 644 or 755
The folder should allow PHP to create files
```

**Check 2: PHP Errors**
- Open browser console (F12)
- Look for error messages
- Check if `data.php` is accessible: `http://your-site.infinityfreeapp.com/data.php`

**Check 3: Data File Created**
- Go to File Manager
- Check if `expense_data.json` was created
- If not, PHP doesn't have write permissions

### Problem: "Permission Denied"

**Solution:**
1. Go to File Manager
2. Right-click on the folder containing data.php
3. Set permissions to `755`
4. Try again

### Problem: "500 Internal Server Error"

**Solution:**
1. Check if PHP version is compatible (PHP 7.0+)
2. Check data.php for syntax errors
3. Look at error logs in control panel

## 📱 How It Works

```
Phone 1 (User)          Server (InfinityFree)          Phone 2 (Admin)
     |                           |                            |
     |--- Add Expense ---------> |                            |
     |                           | (Saves to expense_data.json)|
     |                           |                            |
     |                           | <--- Check for updates ----|
     |                           |                            |
     | <--- Auto-sync (3 sec) ---| --- Send new data -------> |
     |                           |                            |
```

- Every 3 seconds, both phones check the server for updates
- When one phone makes a change, the other sees it within 3 seconds
- Data is stored in `expense_data.json` on your server

## 🎯 Important Notes

1. **Same URL for Both Devices**
   - Both you and your father must use the SAME website URL
   - Example: `http://your-site.infinityfreeapp.com`

2. **Internet Required**
   - Both phones need internet connection
   - Sync happens through the server

3. **3-Second Delay**
   - Changes appear on other device within 3 seconds
   - This is normal and prevents server overload

4. **Data Backup**
   - Your data is stored in `expense_data.json` on the server
   - Download this file regularly as backup
   - You can restore by uploading it back

## 🔒 Security Tips

1. **Change Admin Password**
   - Open `index.html` in a text editor
   - Find line with: `username === 'sandeep' && password === 'Adithi@2013'`
   - Change the password to something secure

2. **Use HTTPS** (if available)
   - InfinityFree provides free SSL
   - Enable it in control panel
   - Access via `https://` instead of `http://`

## 📊 File Structure on Server

```
htdocs/
├── index.html          (Your expense tracker app)
├── data.php            (Backend API)
└── expense_data.json   (Auto-created, stores your data)
```

## ✨ That's It!

Once uploaded, your expense tracker will automatically sync between all devices accessing the same URL!

**Your Website URL:** `http://your-site.infinityfreeapp.com`

Share this URL with your father, and you're all set! 🎉

---

**Need Help?**
- Check InfinityFree documentation: https://forum.infinityfree.net/
- Make sure PHP is enabled on your account
- Check file permissions are correct
