require('dotenv').config();
const express = require('express');
const cors = require('cors');
const formData = require('form-data');
const Mailgun = require('mailgun.js');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Mailgun with debugging
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
  url: 'https://api.mailgun.net/v3'
});
const nodemailer = require('nodemailer');

// Log Mailgun configuration on startup
console.log('Mailgun Configuration:', {
  apiKeyLength: process.env.MAILGUN_API_KEY?.length,
  domain: process.env.MAILGUN_DOMAIN,
  fromEmail: process.env.MAILGUN_FROM_EMAIL
});

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Newsletter subscription route
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  // Validation
  if (!email) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email is required' 
    });
  }

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid email format' 
    });
  }

  const messageData = {
    from: process.env.MAILGUN_FROM_EMAIL,
    to: email,
    subject: 'Welcome to DEV@Deakin!',
    text: 'Thanks for joining DEV@Deakin! We are glad to have you.',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <h2 style="color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px;">Welcome to DEV@Deakin!</h2>
        <p style="font-size: 16px; color: #34495e; line-height: 1.6;">
          Thank you for subscribing to our newsletter. We are thrilled to have you as part of our community!
        </p>
        <p style="font-size: 16px; color: #34495e; line-height: 1.6;">
          You will receive updates about:
        </p>
        <ul style="font-size: 14px; color: #34495e; line-height: 1.8;">
          <li>Latest development tutorials</li>
          <li>Community events and workshops</li>
          <li>Expert insights and tips</li>
          <li>Project showcases</li>
        </ul>
        <p style="font-size: 16px; color: #34495e; line-height: 1.6;">
          Stay tuned for exciting content!
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #7f8c8d; text-align: center;">
          © 2025 DEV@Deakin. All rights reserved.
        </p>
      </div>
    `
  };

  try {
    // If Mailgun is not configured, simulate success for local development
    if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN || !process.env.MAILGUN_FROM_EMAIL) {
      console.warn('⚠️ Mailgun not configured. Skipping actual send and returning simulated success.');
      console.log(`✅ (Simulated) Welcome email sent to: ${email}`);
      return res.json({ 
        success: true, 
        message: 'Successfully subscribed! (Simulated - Mail not actually sent in development.)' 
      });
    }

        // For sandbox domains, inform about verification requirement
    if (process.env.MAILGUN_DOMAIN.includes('sandbox')) {
      console.log(`⚠️ Using sandbox domain. Ensure ${email} is verified in Mailgun dashboard.`);
    }

    await mg.messages.create(process.env.MAILGUN_DOMAIN, messageData);
    console.log(`✅ Welcome email sent to: ${email}`);
    return res.json({ 
      success: true, 
      message: 'Successfully subscribed! Check your email.' 
    });
  } catch (error) {
    // Log the full error details for debugging
    console.error('❌ Mailgun Error Details:', {
      error: error,
      message: error?.message,
      details: error?.response?.body,
      statusCode: error?.response?.statusCode
    });

    console.warn('Falling back to nodemailer Ethereal preview due to mailgun error.');
    try {
      // Create test account and send via Ethereal for development
      const testAccount = await nodemailer.createTestAccount();
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });

      const info = await transporter.sendMail({
        from: process.env.MAILGUN_FROM_EMAIL,
        to: email,
        subject: messageData.subject,
        text: messageData.text,
        html: messageData.html
      });

      console.log('Ethereal preview URL: %s', nodemailer.getTestMessageUrl(info));
      return res.json({
        success: true,
        message: 'Subscribed successfully (sent via Ethereal preview).',
        previewUrl: nodemailer.getTestMessageUrl(info)
      });
    } catch (ethError) {
      console.error('Ethereal fallback error:', ethError);
      // Return detailed error for debugging
      return res.status(502).json({
        success: false,
        message: 'Failed to send welcome email',
        details: {
          mailgun: error?.response?.body || error?.message,
          ethereal: ethError?.message || ethError
        }
      });
    }
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Mailgun configured: ${process.env.MAILGUN_API_KEY ? 'Yes' : 'No'}`);
  console.log(`📮 Mailgun domain: ${process.env.MAILGUN_DOMAIN || 'Not set'}`);
});
