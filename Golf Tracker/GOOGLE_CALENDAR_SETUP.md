# 📅 Google Calendar Setup Guide

To enable Google Calendar integration in your Golf Lesson Tracker, follow these steps:

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: "Golf Lesson Tracker"
4. Click "Create"

### Step 2: Enable Calendar API
1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google Calendar API"
3. Click on it and press "Enable"

### Step 3: Create Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy your API Key (save it somewhere safe)
4. Click "Create Credentials" → "OAuth 2.0 Client ID"
5. If prompted, configure OAuth consent screen:
   - Choose "External" user type
   - Fill in required fields (App name: "Golf Lesson Tracker")
   - Add your email as a test user
6. For OAuth 2.0 Client ID:
   - Application type: "Web application"
   - Name: "Golf Lesson Tracker"
   - Authorized origins: Add `http://localhost:3000` and `file://`
7. Copy your Client ID

### Step 4: Update Your App
1. Open `simple-golf-tracker.html` in VS Code
2. Find these lines near the top of the `<script>` section:
   ```javascript
   const CLIENT_ID = 'your-google-client-id.apps.googleusercontent.com';
   const API_KEY = 'your-google-api-key';
   ```
3. Replace with your actual values:
   ```javascript
   const CLIENT_ID = 'YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com';
   const API_KEY = 'YOUR_ACTUAL_API_KEY';
   ```

### Step 5: Test It Out!
1. Open `simple-golf-tracker.html` in your browser
2. Click "Connect Google Calendar"
3. Sign in with your Google account
4. Grant permissions
5. Start syncing your golf lessons! 🏌️

## ✨ Features You'll Get

- **Two-way sync**: Import golf events from calendar, export lessons to calendar
- **Smart detection**: Automatically finds golf-related events
- **Rich details**: Syncs lesson notes, skills, ratings to calendar descriptions
- **Easy management**: View and manage everything in one place

## 🔒 Security Notes

- Your API credentials are only used in your browser
- No data is sent to third parties
- All lesson data stays on your device and Google account

## 🆘 Troubleshooting

**"Authentication failed"**
- Make sure your Client ID and API Key are correct
- Check that Calendar API is enabled
- Verify authorized origins include your domain

**"No golf events found"**
- Make sure you have events with keywords like "golf", "lesson", "practice"
- Events must be within 30 days (past or future)

**Need help?**
- Double-check all setup steps
- Make sure you're using the correct credentials
- Try refreshing the page and reconnecting

## 🎯 Pro Tips

1. **Create test events**: Add a calendar event with "Golf Lesson" in the title to test
2. **Use descriptive titles**: Events with "golf", "lesson", "practice" are auto-detected
3. **Regular sync**: Check the Calendar Sync tab regularly to keep everything in sync

That's it! Your golf lesson tracker now has full Google Calendar integration. 🏌️‍♂️📅
