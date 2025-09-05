import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, { 
        status: 204,
        headers: corsHeaders
      });
    }

    if (req.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405,
        headers: corsHeaders
      });
    }

    // Get auth token and verify user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }), 
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: getUserError } = await supabase.auth.getUser(token);

    if (getUserError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }), 
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const { clientId, clientEmail, clientName, accessUrl, password } = await req.json();

    if (!clientId || !clientEmail || !clientName || !accessUrl || !password) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }), 
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Verify client belongs to user
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select('*')
      .eq('id', clientId)
      .eq('user_id', user.id)
      .single();

    if (clientError || !client) {
      return new Response(
        JSON.stringify({ error: 'Client not found or access denied' }), 
        { 
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Send email via Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      console.log('RESEND_API_KEY not configured, skipping email send');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Client access configured successfully. Email service not available - please share the link manually.',
          emailSent: false
        }), 
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #10b981, #3b82f6); border-radius: 16px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
            <span style="color: white; font-size: 24px;">🎯</span>
          </div>
          <h1 style="color: #1e293b; margin: 0; font-size: 28px; font-weight: 700;">OnPathFlow</h1>
          <p style="color: #64748b; margin: 8px 0 0 0; font-size: 16px;">by Freedom Lab</p>
        </div>
        
        <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 24px;">Hi ${clientName},</h2>
          <p style="color: #475569; margin: 0 0 16px 0; font-size: 16px; line-height: 1.6;">
            I've set up your personal goal tracking dashboard! You can now view your progress and update milestones anytime.
          </p>
        </div>
        
        <div style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h3 style="color: #1e293b; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">🔗 Your Dashboard Access</h3>
          
          <div style="margin-bottom: 16px;">
            <p style="color: #64748b; margin: 0 0 8px 0; font-size: 14px; font-weight: 500;">Dashboard Link:</p>
            <a href="${accessUrl}" style="color: #3b82f6; text-decoration: none; font-size: 16px; word-break: break-all;">${accessUrl}</a>
          </div>
          
          <div style="margin-bottom: 16px;">
            <p style="color: #64748b; margin: 0 0 8px 0; font-size: 14px; font-weight: 500;">Access Code:</p>
            <code style="background: #f1f5f9; padding: 8px 12px; border-radius: 6px; font-family: 'SF Mono', Monaco, monospace; font-size: 18px; color: #1e293b; font-weight: 600;">${password}</code>
          </div>
        </div>
        
        <div style="background: linear-gradient(135deg, #10b981, #3b82f6); border-radius: 12px; padding: 24px; margin-bottom: 24px; color: white;">
          <h3 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">✨ What you can do:</h3>
          <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
            <li>View your goal progress in real-time</li>
            <li>Mark milestones as complete when you achieve them</li>
            <li>Add your own notes and progress updates</li>
            <li>Track your journey toward your goal</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin-bottom: 24px;">
          <a href="${accessUrl}" style="background: #10b981; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block;">Access My Dashboard</a>
        </div>
        
        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
          <p style="color: #64748b; margin: 0; font-size: 14px;">
            Questions? Just reply to this email and I'll help you get started!
          </p>
          <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 12px;">
            Powered by OnPathFlow by Freedom Lab
          </p>
        </div>
      </div>
    `;

    const emailText = `Hi ${clientName},

I've set up your personal goal tracking dashboard! You can now view your progress and update milestones anytime.

🔗 Your Dashboard: ${accessUrl}
🔑 Access Code: ${password}

Simply visit the link above and enter your access code to see your goal progress. You can mark milestones as complete and add your own notes about your progress.

What you can do:
• View your goal progress in real-time
• Mark milestones as complete when you achieve them  
• Add your own notes and progress updates
• Track your journey toward your goal

Questions? Just reply to this email and I'll help you get started!

Best regards,
OnPathFlow by Freedom Lab`;

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'OnPathFlow <info@freedomlab.ai>',
        to: [clientEmail],
        subject: `Your Goal Dashboard is Ready - ${client.goal}`,
        html: emailHtml,
        text: emailText,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error('Resend API error:', errorData);
      return new Response(
        JSON.stringify({ error: 'Failed to send email' }), 
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const emailResult = await emailResponse.json();
    console.log('Email sent successfully:', emailResult);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        emailId: emailResult.id 
      }), 
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('Error sending client access email:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});