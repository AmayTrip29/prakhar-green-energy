import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const FROM_ADDRESS =
  process.env.EMAIL_FROM_ADDRESS ?? "Prakhar Green Energy <leads@prakhargreenenergy.com>";
const NOTIFY_TO = process.env.LEAD_NOTIFICATION_EMAIL ?? siteConfig.email;

interface LeadNotificationPayload {
  fullName: string;
  phone: string;
  email?: string | null;
  pincode: string;
  monthlyBill?: number | null;
  propertyType: string;
  source: string;
  message?: string | null;
}

/**
 * Sends an internal notification email when a new lead comes in.
 * Returns false (does not throw) on failure so a transient email outage
 * never blocks lead capture — the lead is always saved to the database
 * first, regardless of email delivery success. See API route for ordering.
 */
export async function sendLeadNotificationEmail(
  lead: LeadNotificationPayload
): Promise<boolean> {
  if (!resend) {
    console.warn(
      "[email] RESEND_API_KEY not configured — skipping lead notification email."
    );
    return false;
  }

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: NOTIFY_TO,
      subject: `New Lead: ${lead.fullName} (${lead.pincode})`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto;">
          <div style="background:#0B2E1F; padding: 24px; border-radius: 12px 12px 0 0;">
            <h2 style="color:#F2B229; margin:0;">New Solar Lead</h2>
          </div>
          <div style="background:#F6F8F5; padding: 24px; border-radius: 0 0 12px 12px;">
            <table style="width:100%; font-size: 14px; color:#10241A;">
              <tr><td style="padding:6px 0; font-weight:600; width:140px;">Name</td><td>${escapeHtml(lead.fullName)}</td></tr>
              <tr><td style="padding:6px 0; font-weight:600;">Phone</td><td><a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(lead.phone)}</a></td></tr>
              ${lead.email ? `<tr><td style="padding:6px 0; font-weight:600;">Email</td><td>${escapeHtml(lead.email)}</td></tr>` : ""}
              <tr><td style="padding:6px 0; font-weight:600;">Pincode</td><td>${escapeHtml(lead.pincode)}</td></tr>
              ${lead.monthlyBill ? `<tr><td style="padding:6px 0; font-weight:600;">Monthly Bill</td><td>₹${lead.monthlyBill}</td></tr>` : ""}
              <tr><td style="padding:6px 0; font-weight:600;">Property Type</td><td>${escapeHtml(lead.propertyType)}</td></tr>
              <tr><td style="padding:6px 0; font-weight:600;">Source</td><td>${escapeHtml(lead.source)}</td></tr>
              ${lead.message ? `<tr><td style="padding:6px 0; font-weight:600;">Message</td><td>${escapeHtml(lead.message)}</td></tr>` : ""}
            </table>
            <p style="margin-top:20px; font-size:12px; color:#4B5D55;">
              Reply to this customer within 24 hours for best conversion.
              View and manage all leads in the <a href="${siteConfig.url}/admin/dashboard/leads">Admin Dashboard</a>.
            </p>
          </div>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error("[email] Failed to send lead notification:", error);
    return false;
  }
}

/**
 * Sends a confirmation email to the customer who submitted a lead form,
 * if they provided an email address.
 */
export async function sendLeadConfirmationEmail(
  toEmail: string,
  fullName: string
): Promise<boolean> {
  if (!resend) return false;
  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: toEmail,
      subject: "We've received your request — Prakhar Green Energy Solutions",
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto;">
          <div style="background:#0B2E1F; padding: 24px; border-radius: 12px 12px 0 0;">
            <h2 style="color:#F2B229; margin:0;">PRAKHAR</h2>
            <p style="color:#9AC8AE; margin:4px 0 0;">Green Energy Solutions</p>
          </div>
          <div style="background:#F6F8F5; padding: 24px; border-radius: 0 0 12px 12px; color:#10241A;">
            <p>Hi ${escapeHtml(fullName)},</p>
            <p>Thank you for reaching out to Prakhar Green Energy Solutions. Our solar consultant
            will call you within 24 hours to schedule your free rooftop survey and 3D solar design.</p>
            <p>In the meantime, you can reach us directly at
            <a href="tel:${siteConfig.phone}">${siteConfig.phoneDisplay}</a>.</p>
            <p style="margin-top: 24px;">Power Smarter. Live Greener.<br/>— Team Prakhar</p>
          </div>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error("[email] Failed to send confirmation email:", error);
    return false;
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
