# 📧 Email Report Configuration Guide

## ✅ What I Added

Your psychometric assessment tool now automatically sends PDF reports to an admin email when tests are completed:

1. **Backend Server** (`server.js`) - Express.js server with email functionality
2. **Email Module** - Nodemailer integration with Gmail
3. **Frontend Integration** - Automatic PDF sending when test completes
4. **Admin Configuration** - Easy-to-modify email settings

---

## 🔧 Setup Instructions

### Step 1: Install Dependencies

Open Terminal/PowerShell in your project folder and run:

```bash
npm install
```

This installs: `express`, `nodemailer`, `cors`

---

### Step 2: Configure Gmail (IMPORTANT!)

#### Option A: Use Gmail with App Password (Recommended)

1. Go to [Google Account](https://myaccount.google.com)
2. Click **Security** in the left menu
3. Enable **2-Step Verification** (if not already enabled)
4. Scroll down to **App passwords**
5. Select **Mail** and **Windows Computer** (or your device)
6. Copy the 16-character password shown
7. Open `server.js` and update:

```javascript
EMAIL_CONFIG = {
  ADMIN_GMAIL: 'your-email@gmail.com',      // ← Your Gmail address
  GMAIL_PASSWORD: 'xxxx xxxx xxxx xxxx',    // ← 16-character app password (no spaces)
  ADMIN_EMAIL: 'admin@example.com',         // ← Where to send reports
  EMAIL_SUBJECT: 'New Psychometric Assessment Report',
  EMAIL_FOOTER: 'This is an automated email from the Psychometric Analysis System.'
};
```

---

### Step 3: Run the Server

```bash
npm start
```

You should see:
```
✅ Server running at http://localhost:3000
📧 Reports will be sent to: admin@example.com
⚙️  EMAIL CONFIGURATION:
   Gmail Account: your-email@gmail.com
   Admin Email: admin@example.com
```

Open `http://localhost:3000` in your browser.

---

## 🚀 How It Works

1. **User completes the test** → Clicks "Start Assessment" and goes through all sections
2. **Test finishes** → System generates PDF report
3. **PDF is sent** → Automatically sent to the configured admin email
4. **User downloads** → PDF also downloads to user's device
5. **Admin receives** → Email with PDF attachment in admin inbox

---

## 📝 Configuration Options

Edit `server.js` lines **6-12** to customize:

| Setting | Purpose | Example |
|---------|---------|---------|
| `ADMIN_GMAIL` | Gmail account sending reports | `admin@gmail.com` |
| `GMAIL_PASSWORD` | App password (16 chars) | `abcd efgh ijkl mnop` |
| `ADMIN_EMAIL` | Where reports are sent | `director@school.edu` |
| `EMAIL_SUBJECT` | Email subject line | `Weekly Assessment Reports` |
| `EMAIL_FOOTER` | Email footer text | `Confidential` |

---

## ✅ Testing

1. Start the server: `npm start`
2. Open `http://localhost:3000`
3. Complete a test with sample data
4. Check the admin email inbox for the PDF report
5. Check console logs for confirmations

---

## 🔒 Security Best Practices

- ✅ Never commit `server.js` with real passwords to Git
- ✅ Use Gmail App Passwords, not your actual password
- ✅ Enable 2-factor authentication on Gmail
- ✅ For production, use environment variables:

```javascript
ADMIN_GMAIL: process.env.GMAIL_USER,
GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
ADMIN_EMAIL: process.env.ADMIN_EMAIL,
```

---

## 📍 File Changes Made

### New Files:
- `server.js` - Backend server with email functionality

### Modified Files:
- `package.json` - Added Express, Nodemailer, CORS dependencies
- `MindScopeV3.html` - Added `sendPdfToAdmin()` function and integrated with PDF generation

---

## 🆘 Troubleshooting

### Error: "Failed to send email"
- Check Gmail credentials in `server.js`
- Verify app password is exactly 16 characters
- Make sure 2-Step Verification is enabled

### Error: "Cannot connect to localhost:3000"
- Make sure server is running (`npm start`)
- Check if port 3000 is not blocked
- Try a different port in `server.js`: `const PORT = 3001;`

### PDF not arriving at email
- Check console logs in browser (F12 → Console)
- Check spam folder in admin email
- Verify `ADMIN_EMAIL` is correct in `server.js`

### Gmail shows "Less secure app" warning
- This is normal with App Passwords
- Your account is still secure with 2-factor authentication

---

## 📞 Support

For jsPDF issues: https://github.com/parallax/jsPDF
For Nodemailer help: https://nodemailer.com

---

**✨ Your email feature is ready! Start the server and test it out!**
