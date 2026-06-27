# WhatsApp Notification Setup (Meta Cloud API)

The website is wired to send a WhatsApp notification every time a new lead
comes in, **but the actual Meta Business setup must be done by you** — it
requires identity verification that no code can automate.

Without this setup, the site still works perfectly: leads are saved to the
database and an email notification is sent regardless. WhatsApp is an
additional notification channel, not a dependency.

## Step-by-step setup

1. **Create a Meta Business Account**
   Go to [business.facebook.com](https://business.facebook.com) and create
   or use an existing Business Account for Prakhar Green Energy Solutions.

2. **Create a WhatsApp Business App**
   Go to [developers.facebook.com](https://developers.facebook.com) →
   My Apps → Create App → choose "Business" type → add the **WhatsApp**
   product to it.

3. **Add and verify a phone number**
   Under WhatsApp → API Setup, add the number that should send
   notifications (this can be a different number from your customer-facing
   `+91 7007629710` if you prefer a dedicated notifications line, or the
   same number if Meta allows it for your account type).

4. **Generate a permanent access token**
   Temporary tokens (the default shown in API Setup) expire in 24 hours.
   For production, go to **System Users** under Business Settings, create a
   system user, assign it to your WhatsApp app, and generate a
   **permanent** token with `whatsapp_business_messaging` permission.

5. **Create and submit a message template**
   Business-initiated messages (i.e. your server messaging your own phone
   to alert you of a new lead) require a pre-approved template — free-form
   text only works within 24 hours of the *customer* messaging you first,
   which doesn't apply here.

   Go to WhatsApp Manager → Message Templates → Create Template:
   - Name: `new_lead_alert` (must match `WHATSAPP_TEMPLATE_NAME` in `.env`)
   - Category: Utility
   - Body (use exactly 4 variables, matching the order in `src/lib/whatsapp.ts`):
     ```
     New solar lead: {{1}}
     Phone: {{2}}
     Pincode: {{3}}
     Monthly Bill: {{4}}
     ```
   - Submit for review. Approval usually takes a few hours to 1-2 days.

6. **Set environment variables**
   Once approved, set in Vercel:
   - `WHATSAPP_ACCESS_TOKEN` — your permanent system-user token
   - `WHATSAPP_PHONE_NUMBER_ID` — found in API Setup (not the phone number itself, a separate ID)
   - `WHATSAPP_NOTIFY_NUMBER` — the number that should *receive* alerts, in international format with no `+` or spaces (e.g. `917007629710`)
   - `WHATSAPP_TEMPLATE_NAME` — `new_lead_alert` (or whatever you named it)

7. **Redeploy** on Vercel for the new env vars to take effect.

## Testing

Submit a test lead through the "Schedule a FREE Visit" form on the live
site. Check your Vercel function logs (Project → Deployments → [latest] →
Functions) for `[whatsapp]` log lines if the message doesn't arrive — the
most common issues are an unapproved template or an incorrect phone number ID.
