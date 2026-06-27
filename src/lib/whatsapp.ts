/**
 * WhatsApp notifications via Meta's WhatsApp Cloud API.
 *
 * SETUP REQUIRED (cannot be done by code alone — see docs/WHATSAPP_SETUP.md):
 *   1. Create a Meta Business account + WhatsApp Business app at
 *      developers.facebook.com.
 *   2. Get a permanent access token + Phone Number ID.
 *   3. Create and get approval for a message template (templates are
 *      required for business-initiated messages — free-form text only
 *      works within 24h of the customer messaging you first).
 *   4. Set WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID,
 *      WHATSAPP_NOTIFY_NUMBER and WHATSAPP_TEMPLATE_NAME in .env.
 *
 * Until configured, this safely no-ops and logs a warning — it never
 * blocks lead capture, which always saves to the database first.
 */

const WHATSAPP_API_VERSION = "v20.0";

interface LeadWhatsAppPayload {
  fullName: string;
  phone: string;
  pincode: string;
  monthlyBill?: number | null;
}

export async function sendLeadWhatsAppNotification(
  lead: LeadWhatsAppPayload
): Promise<boolean> {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const notifyNumber = process.env.WHATSAPP_NOTIFY_NUMBER; // e.g. 917007629710
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME ?? "new_lead_alert";

  if (!accessToken || !phoneNumberId || !notifyNumber) {
    console.warn(
      "[whatsapp] WhatsApp Cloud API not configured — skipping notification. See docs/WHATSAPP_SETUP.md"
    );
    return false;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: notifyNumber,
          type: "template",
          template: {
            name: templateName,
            language: { code: "en" },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: lead.fullName },
                  { type: "text", text: lead.phone },
                  { type: "text", text: lead.pincode },
                  {
                    type: "text",
                    text: lead.monthlyBill ? `₹${lead.monthlyBill}` : "Not provided",
                  },
                ],
              },
            ],
          },
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("[whatsapp] API error:", response.status, errorBody);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[whatsapp] Failed to send notification:", error);
    return false;
  }
}
