const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(express.static('.'));

// ═══════════════════════════════════════════════════════════
// 🔧 ADMIN EMAIL CONFIGURATION (Modify these values)
// ═══════════════════════════════════════════════════════════
const EMAIL_CONFIG = {
  // Gmail account credentials - read from environment variables
  ADMIN_GMAIL: process.env.ADMIN_GMAIL || 'excelmindpulse@gmail.com',
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD || 'rygfziryurpcsgvb',
  
  // Admin email where reports will be sent
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'excelmindpulse@gmail.com',
  
  // Email subject and footer
  EMAIL_SUBJECT: 'New Psychometric Assessment Report',
  EMAIL_FOOTER: 'This is an automated email from the Psychometric Analysis System.'
};

// ═══════════════════════════════════════════════════════════
// Email transporter configuration (Gmail)
// ═══════════════════════════════════════════════════════════
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_CONFIG.ADMIN_GMAIL,
    pass: EMAIL_CONFIG.GMAIL_PASSWORD
  }
});

// ═══════════════════════════════════════════════════════════
// 📧 ENDPOINT: Send PDF Report via Email
// ═══════════════════════════════════════════════════════════
app.post('/api/send-report', async (req, res) => {
  try {
    const { pdfBase64, fileName, userName, userEmail, reportData } = req.body;

    // Validate required fields
    if (!pdfBase64 || !fileName || !userName) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: pdfBase64, fileName, or userName' 
      });
    }

    // Convert base64 to buffer
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');

    // Email content
    const emailContent = `
      <h2>New Assessment Report Submitted</h2>
      <p><strong>Candidate Name:</strong> ${userName}</p>
      ${userEmail ? `<p><strong>Email:</strong> ${userEmail}</p>` : ''}
      ${reportData ? `<p><strong>Summary:</strong> Test completed and PDF generated</p>` : ''}
      <hr>
      <p>${EMAIL_CONFIG.EMAIL_FOOTER}</p>
    `;

    // Mail options
    const mailOptions = {
      from: EMAIL_CONFIG.ADMIN_GMAIL,
      to: EMAIL_CONFIG.ADMIN_EMAIL,
      subject: `${EMAIL_CONFIG.EMAIL_SUBJECT} - ${userName}`,
      html: emailContent,
      attachments: [
        {
          filename: fileName,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    };

    // Send email with timeout
    try {
      await Promise.race([
        transporter.sendMail(mailOptions),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Email send timeout')), 10000)
        )
      ]);
      console.log(`✅ Email sent to ${EMAIL_CONFIG.ADMIN_EMAIL}`);
    } catch (emailError) {
      console.warn(`⚠️ Email sending failed (non-blocking): ${emailError.message}`);
      // Don't fail the entire request - email is optional
    }

    // Always return success for the report submission
    res.json({ 
      success: true, 
      message: `Report received successfully` 
    });

  } catch (error) {
    console.error('❌ Report endpoint error:', error.message);
    res.status(500).json({ 
      success: false, 
      message: `Error: ${error.message}` 
    });
  }
});

// ═══════════════════════════════════════════════════════════
// Health check endpoint
// ═══════════════════════════════════════════════════════════
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    adminEmail: EMAIL_CONFIG.ADMIN_EMAIL 
  });
});

// Serve main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'MindScopeV3.html'));
});

// ═══════════════════════════════════════════════════════════
// Start server
// ═══════════════════════════════════════════════════════════
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  const usingEnvVars = process.env.ADMIN_GMAIL || process.env.GMAIL_PASSWORD || process.env.ADMIN_EMAIL;
  
  console.log(`\n✅ Server running at http://localhost:${PORT}`);
  console.log(`📧 Reports will be sent to: ${EMAIL_CONFIG.ADMIN_EMAIL}`);
  console.log('\n⚙️  EMAIL CONFIGURATION:');
  console.log(`   Gmail Account: ${EMAIL_CONFIG.ADMIN_GMAIL}`);
  console.log(`   Admin Email: ${EMAIL_CONFIG.ADMIN_EMAIL}`);
  console.log(`   Using Environment Variables: ${usingEnvVars ? '✅ YES' : '❌ NO (using defaults)'}\n`);
});
