import { NextRequest, NextResponse } from 'next/server';

// Email configuration - set these in Vercel Environment Variables
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = process.env.QUOTE_TO_EMAIL || 'inquiry@genetargeting.com';
const FROM_EMAIL = process.env.QUOTE_FROM_EMAIL || 'quotes@genetargeting.com';

interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  institution: string;
  department: string;
  geneSymbol: string;
  modificationType: string;
  modelType: string;
  strainBackground: string;
  timelineRequirements: string;
  cohortNeeds: string;
  additionalNotes: string;
  preferredContact: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: QuoteFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
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
    .header { background: linear-gradient(135deg, #0a253c 0%, #1a4a6e 50%, #008080 100%); color: white; padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #f7f7f7; padding: 30px; }
    .section { background: white; padding: 20px; margin-bottom: 20px; border-left: 4px solid #008080; }
    .section h2 { color: #0a253c; font-size: 16px; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px; }
    .field { margin-bottom: 12px; }
    .label { font-weight: 600; color: #0a253c; display: inline-block; min-width: 180px; }
    .value { color: #333; }
    .notes { background: #fff8e1; padding: 15px; border-left: 4px solid #ffc107; margin-top: 20px; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🧬 New Quote Request</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">ingenious targeting laboratory</p>
    </div>
    
    <div class="content">
      <div class="section">
        <h2>Contact Information</h2>
        <div class="field"><span class="label">Name:</span> <span class="value">${data.name || 'Not provided'}</span></div>
        <div class="field"><span class="label">Email:</span> <span class="value">${data.email || 'Not provided'}</span></div>
        <div class="field"><span class="label">Phone:</span> <span class="value">${data.phone || 'Not provided'}</span></div>
        <div class="field"><span class="label">Institution/Company:</span> <span class="value">${data.institution || 'Not provided'}</span></div>
        <div class="field"><span class="label">Department:</span> <span class="value">${data.department || 'Not provided'}</span></div>
        <div class="field"><span class="label">Preferred Contact:</span> <span class="value">${data.preferredContact || 'Not specified'}</span></div>
      </div>
      
      <div class="section">
        <h2>Project Details</h2>
        <div class="field"><span class="label">Gene Symbol:</span> <span class="value">${data.geneSymbol || 'Not provided'}</span></div>
        <div class="field"><span class="label">Modification Type:</span> <span class="value">${data.modificationType || 'Not provided'}</span></div>
        <div class="field"><span class="label">Model Type:</span> <span class="value">${data.modelType || 'Not provided'}</span></div>
        <div class="field"><span class="label">Strain Background:</span> <span class="value">${data.strainBackground || 'Not provided'}</span></div>
        <div class="field"><span class="label">Timeline Requirements:</span> <span class="value">${data.timelineRequirements || 'Not provided'}</span></div>
        <div class="field"><span class="label">Cohort Needs:</span> <span class="value">${data.cohortNeeds || 'Not provided'}</span></div>
      </div>
      
      ${data.additionalNotes ? `
      <div class="notes">
        <h2 style="color: #0a253c; font-size: 14px; margin: 0 0 10px 0;">Additional Notes</h2>
        <p style="margin: 0; white-space: pre-wrap;">${data.additionalNotes}</p>
      </div>
      ` : ''}
    </div>
    
    <div class="footer">
      <p>This quote request was submitted via the ITL website.</p>
      <p>Submitted on ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'full', timeStyle: 'short' })} ET</p>
    </div>
  </div>
</body>
</html>
    `;

    const emailText = `
NEW QUOTE REQUEST - ingenious targeting laboratory
================================================

CONTACT INFORMATION
-------------------
Name: ${data.name || 'Not provided'}
Email: ${data.email || 'Not provided'}
Phone: ${data.phone || 'Not provided'}
Institution/Company: ${data.institution || 'Not provided'}
Department: ${data.department || 'Not provided'}
Preferred Contact: ${data.preferredContact || 'Not specified'}

PROJECT DETAILS
---------------
Gene Symbol: ${data.geneSymbol || 'Not provided'}
Modification Type: ${data.modificationType || 'Not provided'}
Model Type: ${data.modelType || 'Not provided'}
Strain Background: ${data.strainBackground || 'Not provided'}
Timeline Requirements: ${data.timelineRequirements || 'Not provided'}
Cohort Needs: ${data.cohortNeeds || 'Not provided'}

${data.additionalNotes ? `ADDITIONAL NOTES\n----------------\n${data.additionalNotes}` : ''}

---
Submitted on ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'full', timeStyle: 'short' })} ET
    `;

    // Check if Resend API key is configured
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      // In development/testing, log the submission instead
      console.log('Quote Request Received:', data);
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
        subject: `Quote Request: ${data.geneSymbol || 'New Project'} - ${data.name}`,
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
      { success: true, message: 'Quote request submitted successfully', id: result.id },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing quote request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
