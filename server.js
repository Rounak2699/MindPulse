const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(express.static('.'));

// ═══════════════════════════════════════════════════════════
// 🔧 EMAIL CONFIGURATION (using SendGrid)
// ═══════════════════════════════════════════════════════════
const EMAIL_CONFIG = {
  // SendGrid API Key
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || '',
  
  // Email configuration
  FROM_EMAIL: process.env.FROM_EMAIL || 'noreply@mindpulse.com',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'excelmindpulse@gmail.com',
  
  // Email subject and footer
  EMAIL_SUBJECT: 'New Psychometric Assessment Report',
  EMAIL_FOOTER: 'This is an automated email from the Psychometric Analysis System.'
};

// Initialize SendGrid
sgMail.setApiKey(EMAIL_CONFIG.SENDGRID_API_KEY);

// Verify SendGrid configuration at startup
if (!EMAIL_CONFIG.SENDGRID_API_KEY) {
  console.warn('⚠️ SendGrid API Key not configured. Email sending will fail.');
} else {
  console.log('✅ SendGrid configured and ready');
}

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

    // Send email with timeout
    try {
      if (!EMAIL_CONFIG.SENDGRID_API_KEY) {
        throw new Error('SendGrid API Key not configured');
      }

      console.log(`📤 Attempting to send email from ${EMAIL_CONFIG.FROM_EMAIL} to ${EMAIL_CONFIG.ADMIN_EMAIL}`);
      
      const msg = {
        to: EMAIL_CONFIG.ADMIN_EMAIL,
        from: EMAIL_CONFIG.FROM_EMAIL,
        subject: `${EMAIL_CONFIG.EMAIL_SUBJECT} - ${userName}`,
        html: emailContent,
        attachments: [
          {
            filename: fileName,
            content: pdfBase64,
            type: 'application/pdf',
            disposition: 'attachment'
          }
        ]
      };

      await Promise.race([
        sgMail.send(msg),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Email send timeout')), 10000)
        )
      ]);
      console.log(`✅ Email sent successfully to ${EMAIL_CONFIG.ADMIN_EMAIL}`);
    } catch (emailError) {
      console.error(`❌ Email error details:`, {
        message: emailError.message,
        code: emailError.code,
        status: emailError.status
      });
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

// ═══════════════════════════════════════════════════════════
// Diagnostic endpoint (for debugging)
// ═══════════════════════════════════════════════════════════
app.get('/api/debug', (req, res) => {
  res.json({ 
    status: 'running',
    environment: {
      node_env: process.env.NODE_ENV || 'not set',
      port: process.env.PORT || '3000'
    },
    email_config: {
      from_email: EMAIL_CONFIG.FROM_EMAIL,
      admin_email: EMAIL_CONFIG.ADMIN_EMAIL,
      sendgrid_api_key_length: EMAIL_CONFIG.SENDGRID_API_KEY.length,
      env_vars_loaded: {
        SENDGRID_API_KEY: !!process.env.SENDGRID_API_KEY,
        FROM_EMAIL: !!process.env.FROM_EMAIL,
        ADMIN_EMAIL: !!process.env.ADMIN_EMAIL
      }
    }
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
  const hasApiKey = !!process.env.SENDGRID_API_KEY;
  
  console.log(`\n✅ Server running at http://localhost:${PORT}`);
  console.log(`📧 Reports will be sent to: ${EMAIL_CONFIG.ADMIN_EMAIL}`);
  console.log('\n⚙️  EMAIL CONFIGURATION (SendGrid):');
  console.log(`   From Email: ${EMAIL_CONFIG.FROM_EMAIL}`);
  console.log(`   Admin Email: ${EMAIL_CONFIG.ADMIN_EMAIL}`);
  console.log(`   SendGrid API Key Configured: ${hasApiKey ? '✅ YES' : '❌ NO'}`);
  console.log(`\n🔍 Debug endpoint available at: /api/debug\n`);
});
