import { NextRequest, NextResponse } from 'next/server';

// Email configuration - set these in Vercel Environment Variables
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = process.env.QUOTE_TO_EMAIL || 'inquiry@genetargeting.com';
const FROM_EMAIL = process.env.QUOTE_FROM_EMAIL || 'quotes@genetargeting.com';

interface CatalogInquiryData {
  name: string;
  email: string;
  phone: string;
  institution: string;
  modelName: string;
  modelNumber: string;
  geneSymbol: string;
  modelCategory: string;
  strainBackground: string;
  quantity: string;
  deliverable: string;
  urgency: string;
  additionalNotes: string;
  preferredContact: string;
  requestType: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: CatalogInquiryData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.modelName) {
      return NextResponse.json(
        { error: 'Name, email, and model name are required' },
        { status: 400 }
      );
    }

    // Format the email content
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #008080 0%, #006666 100%); color: white; padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 12px; font-size: 12px; margin-top: 8px; }
    .content { background: #f7f7f7; padding: 30px; }
    .section { background: white; padding: 20px; margin-bottom: 20px; border-left: 4px solid #008080; }
    .section h2 { color: #0a253c; font-size: 16px; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px; }
    .field { margin-bottom: 12px; }
    .label { font-weight: 600; color: #0a253c; display: inline-block; min-width: 180px; }
    .value { color: #333; }
    .highlight { background: #e6f7f7; padding: 15px; border-left: 4px solid #008080; margin-top: 10px; }
    .notes { background: #fff8e1; padding: 15px; border-left: 4px solid #ffc107; margin-top: 20px; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    .urgency-rush { color: #dc2626; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📦 Catalog Model Inquiry</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">ingenious targeting laboratory</p>
      <span class="badge">CATALOG ORDER REQUEST</span>
    </div>
    
    <div class="content">
      <div class="section">
        <h2>Contact Information</h2>
        <div class="field"><span class="label">Name:</span> <span class="value">${data.name || 'Not provided'}</span></div>
        <div class="field"><span class="label">Email:</span> <span class="value">${data.email || 'Not provided'}</span></div>
        <div class="field"><span class="label">Phone:</span> <span class="value">${data.phone || 'Not provided'}</span></div>
        <div class="field"><span class="label">Institution/Company:</span> <span class="value">${data.institution || 'Not provided'}</span></div>
        <div class="field"><span class="label">Preferred Contact:</span> <span class="value">${data.preferredContact || 'Not specified'}</span></div>
      </div>
      
      <div class="section">
        <h2>Model Information</h2>
        <div class="highlight">
          <div class="field"><span class="label">Model Name:</span> <span class="value" style="font-weight: 600; color: #008080;">${data.modelName || 'Not provided'}</span></div>
          <div class="field"><span class="label">Model/Stock Number:</span> <span class="value">${data.modelNumber || 'Not provided'}</span></div>
          <div class="field"><span class="label">Gene Symbol:</span> <span class="value">${data.geneSymbol || 'Not provided'}</span></div>
        </div>
        <div class="field" style="margin-top: 15px;"><span class="label">Model Category:</span> <span class="value">${data.modelCategory || 'Not provided'}</span></div>
        <div class="field"><span class="label">Strain Background:</span> <span class="value">${data.strainBackground || 'Not provided'}</span></div>
      </div>
      
      <div class="section">
        <h2>Order Details</h2>
        <div class="field"><span class="label">Quantity Needed:</span> <span class="value">${data.quantity || 'Not provided'}</span></div>
        <div class="field"><span class="label">Deliverable Type:</span> <span class="value">${data.deliverable || 'Not provided'}</span></div>
        <div class="field"><span class="label">Timeline/Urgency:</span> <span class="value ${data.urgency?.toLowerCase().includes('rush') ? 'urgency-rush' : ''}">${data.urgency || 'Not provided'}</span></div>
      </div>
      
      ${data.additionalNotes ? `
      <div class="notes">
        <h2 style="color: #0a253c; font-size: 14px; margin: 0 0 10px 0;">Additional Notes</h2>
        <p style="margin: 0; white-space: pre-wrap;">${data.additionalNotes}</p>
      </div>
      ` : ''}
    </div>
    
    <div class="footer">
      <p>This catalog inquiry was submitted via the ITL website.</p>
      <p>Submitted on ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'full', timeStyle: 'short' })} ET</p>
    </div>
  </div>
</body>
</html>
    `;

    const emailText = `
CATALOG MODEL INQUIRY - ingenious targeting laboratory
======================================================

CONTACT INFORMATION
-------------------
Name: ${data.name || 'Not provided'}
Email: ${data.email || 'Not provided'}
Phone: ${data.phone || 'Not provided'}
Institution/Company: ${data.institution || 'Not provided'}
Preferred Contact: ${data.preferredContact || 'Not specified'}

MODEL INFORMATION
-----------------
Model Name: ${data.modelName || 'Not provided'}
Model/Stock Number: ${data.modelNumber || 'Not provided'}
Gene Symbol: ${data.geneSymbol || 'Not provided'}
Model Category: ${data.modelCategory || 'Not provided'}
Strain Background: ${data.strainBackground || 'Not provided'}

ORDER DETAILS
-------------
Quantity Needed: ${data.quantity || 'Not provided'}
Deliverable Type: ${data.deliverable || 'Not provided'}
Timeline/Urgency: ${data.urgency || 'Not provided'}

${data.additionalNotes ? `ADDITIONAL NOTES\n----------------\n${data.additionalNotes}` : ''}

---
Submitted on ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'full', timeStyle: 'short' })} ET
    `;

    // Determine subject line based on urgency
    const isRush = data.urgency?.toLowerCase().includes('rush') || data.urgency?.toLowerCase().includes('priority');
    const subjectPrefix = isRush ? '🚨 RUSH - ' : '';

    // Check if Resend API key is configured
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      // In development/testing, log the submission instead
      console.log('Catalog Inquiry Received:', data);
      console.log('Email would be sent to:', TO_EMAIL);
      
      // Return success for testing purposes, but log warning
      return NextResponse.json(
        { 
          success: true, 
          message: 'Form received (email not configured - check server logs)',
          warning: 'RESEND_API_KEY not set'
        },
        { status: 200 }
      );
    }

    // Send email via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: data.email,
        subject: `${subjectPrefix}Catalog Inquiry: ${data.modelName || 'Model Request'} - ${data.name}`,
        html: emailHtml,
        text: emailText,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Resend API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to send email', details: errorData },
        { status: 500 }
      );
    }

    const result = await response.json();
    
    return NextResponse.json(
      { success: true, message: 'Catalog inquiry submitted successfully', id: result.id },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing catalog inquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
