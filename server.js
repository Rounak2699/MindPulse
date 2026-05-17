const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// ═══════════════════════════════════════════════════════════
// Middleware
// ═══════════════════════════════════════════════════════════
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// Serve all static files (HTML, JS, CSS, images, etc.)
app.use(express.static(path.join(__dirname)));

// ═══════════════════════════════════════════════════════════
// 🔧 CONFIGURATION  — set these as Environment Variables in Render
//    RESEND_API_KEY  → your Resend API key  (re_xxxxxxxxxxxxxxxxx)
//    ADMIN_EMAIL     → where reports should be delivered
// ═══════════════════════════════════════════════════════════
const CONFIG = {
  RESEND_API_KEY: process.env.RESEND_API_KEY || 're_iTiNVEhg_CxLeGa1qBdDKczGUQGR7Zh6y',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'excelmindpulse@gmail.com',
  EMAIL_SUBJECT: 'New Psychometric Assessment Report',
  EMAIL_FOOTER: 'This is an automated email from the Excel MindPulse Assessment System.',
  // Resend requires a verified sender domain in production.
  // Until you verify a domain, use the Resend sandbox address below —
  // emails will arrive only to the address registered on your Resend account.
  FROM_ADDRESS: process.env.FROM_ADDRESS || 'onboarding@resend.dev'
};

// ═══════════════════════════════════════════════════════════
// Helper: send email via Resend REST API (no SMTP, works on Render)
// ═══════════════════════════════════════════════════════════
async function sendViaResend({ to, subject, html, attachments }) {
  if (!CONFIG.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not set.');
  }

  const body = {
    from: CONFIG.FROM_ADDRESS,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    attachments  // [{ filename, content (base64 string), content_type }]
  };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CONFIG.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Resend API error ${response.status}: ${JSON.stringify(data)}`);
  }

  return data; // { id: "..." }
}

// ═══════════════════════════════════════════════════════════
// 📧 POST /api/send-report — receive PDF and email to admin
// ═══════════════════════════════════════════════════════════
app.post('/api/send-report', async (req, res) => {
  try {
    const { pdfBase64, fileName, userName, userEmail, reportData } = req.body;

    if (!pdfBase64 || !fileName || !userName) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: pdfBase64, fileName, or userName'
      });
    }

    const emailHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e0e0e0;border-radius:8px;">
        <h2 style="color:#2b3340;">📋 New Assessment Report Submitted</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px 0;color:#6c7888;width:160px;">Candidate Name</td><td style="padding:6px 0;font-weight:bold;">${userName}</td></tr>
          ${userEmail ? `<tr><td style="padding:6px 0;color:#6c7888;">DOB / Email</td><td style="padding:6px 0;">${userEmail}</td></tr>` : ''}
          ${reportData ? `<tr><td style="padding:6px 0;color:#6c7888;">Status</td><td style="padding:6px 0;">✅ Test completed — PDF attached</td></tr>` : ''}
        </table>
        <hr style="margin:20px 0;border:none;border-top:1px solid #eee;">
        <p style="color:#9aa3b0;font-size:12px;">${CONFIG.EMAIL_FOOTER}</p>
      </div>`;

    try {
      console.log(`📤 Sending report for "${userName}" to ${CONFIG.ADMIN_EMAIL} via Resend…`);

      await sendViaResend({
        to: CONFIG.ADMIN_EMAIL,
        subject: `${CONFIG.EMAIL_SUBJECT} — ${userName}`,
        html: emailHtml,
        attachments: [{
          filename: fileName,
          content: pdfBase64,   // Resend accepts base64 directly
          content_type: 'application/pdf'
        }]
      });

      console.log(`✅ Email sent successfully.`);
    } catch (emailErr) {
      // Log but don't fail — the PDF was already downloaded by the user
      console.error('❌ Email send failed (non-blocking):', emailErr.message);
    }

    res.json({ success: true, message: 'Report received successfully.' });

  } catch (err) {
    console.error('❌ /api/send-report error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ═══════════════════════════════════════════════════════════
// GET /api/health — quick uptime check
// ═══════════════════════════════════════════════════════════
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    adminEmail: CONFIG.ADMIN_EMAIL,
    resendKeyPresent: !!CONFIG.RESEND_API_KEY,
    fromAddress: CONFIG.FROM_ADDRESS
  });
});

// ═══════════════════════════════════════════════════════════
// GET /api/debug — environment diagnostics
// ═══════════════════════════════════════════════════════════
app.get('/api/debug', (_req, res) => {
  res.json({
    status: 'running',
    node_env: process.env.NODE_ENV || 'not set',
    port: process.env.PORT || '3000',
    email: {
      RESEND_API_KEY_set: !!process.env.RESEND_API_KEY,
      ADMIN_EMAIL: CONFIG.ADMIN_EMAIL,
      FROM_ADDRESS: CONFIG.FROM_ADDRESS
    }
  });
});

// ═══════════════════════════════════════════════════════════
// Serve the main HTML for any non-API route (SPA fallback)
// ═══════════════════════════════════════════════════════════
app.get('*', (req, res) => {
  // Don't intercept API routes
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'Not found' });
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ═══════════════════════════════════════════════════════════
// Start
// ═══════════════════════════════════════════════════════════
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n✅ Server running on port ${PORT}`);
  console.log(`📧 Admin email : ${CONFIG.ADMIN_EMAIL}`);
  console.log(`📮 From address: ${CONFIG.FROM_ADDRESS}`);
  console.log(`🔑 Resend key  : ${CONFIG.RESEND_API_KEY ? '✅ Set' : '❌ NOT SET — emails will fail'}`);
  console.log(`\n🔍 Debug: /api/debug  |  Health: /api/health\n`);
});
