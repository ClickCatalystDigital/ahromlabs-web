# WhatsApp Cloud API setup (for a client or our own CRM)

How we connect a business number to Meta's WhatsApp Cloud API so a system (our CRM, a client's ERP) can receive and
send WhatsApp messages directly, with no partner (BSP) in between. Written after setting up the Ahrom CRM number on
19 Oct 2026; the screen names are Meta's as of then and change often. The code side is the same everywhere:
`ahrom-crm/src/lib/whatsapp.ts` (ported from shanti-ops): webhook with signature check, inbox, the 24-hour rule,
templates, opt-in, spend. About 1–2 hours with the client on a call, plus Meta's review of the display name.

## Before the call: what the client must have

- **A number that is not on WhatsApp at all** (neither the app nor the WhatsApp Business app). Meta refuses a number
  that is already registered. Either a new SIM, or delete the WhatsApp account on that phone first (WhatsApp →
  Settings → Account → Delete account; wait a few minutes). The SIM only has to receive one SMS (or a voice call).
  The business's existing WhatsApp Business app number usually stays where it is; the Cloud API number is separate.
- **Their own Meta Business portfolio** (business.facebook.com), with them as admin and us added as a partner or
  admin. Use the client's portfolio, never ours: the number, its quality rating and the bill belong to them.
- **Business verification** of that portfolio if possible (Security centre → Business verification: GST/registration
  documents, a few days). Not required to start, but it lifts limits (see below) and helps the display name.
- A privacy policy URL on their website, a square logo (1024×1024 PNG/JPG), a business email and website.
- A card for the payment method (only for messages the business starts; see Costs). The client enters it.

## Steps, in order

1. **Meta app** (developers.facebook.com → My Apps → Create app): type Business, use case **Connect with customers
   through WhatsApp**, linked to the client's portfolio. Accept the WhatsApp terms when asked.
2. **Webhook** (app → Use cases → Connect on WhatsApp → Step 2. Production setup → Configure webhooks): callback
   `https://<their system>/api/whatsapp`, a verify token we generate (Worker secret `WA_VERIFY_TOKEN`), subscribe to
   **messages**. The URL must be reachable without login: on Cloudflare Access, add a Bypass policy for that path
   only; the code accepts only posts signed with the app secret.
3. **Add the number** (same page → Register your WhatsApp phone number → Add phone number): country **IN +91** (it
   defaults to US +1; easy to miss), the number, verify by text message, pick the portfolio and the messaging account.
   Meta shows "Registered" and two IDs: **Phone number ID** and **Messaging (WhatsApp) account ID**.
4. **Subscribe webhooks** on that messaging account: the toggle next to its name on the same page. Off = messages
   never arrive.
5. **Save the IDs** as Worker secrets `WA_PHONE_NUMBER_ID` and `WA_WABA_ID` (not secret, we can do these).
6. **Permanent token** (Business settings → Users → System users): a portfolio without full verification allows only
   **one Admin system user**; if one exists, add an **Employee** system user instead (works the same for this). Then:
   - give it the assets from each asset's own page: the **app** (Assign assets → Apps → Full control) and the
     **messaging account** (Settings → Accounts → **Messaging accounts**, formerly "WhatsApp accounts" → the account →
     Assign people → the system user → Full control);
   - Generate token: the app, expiry **Never**, permissions `whatsapp_business_messaging` +
     `whatsapp_business_management`. Shown once. The client (or we, on their screen) pastes it straight into
     `npx wrangler secret put WA_TOKEN`; it never goes in chat, email or a file.
7. **App secret** (app → App settings → Basic → App secret → Show): `npx wrangler secret put WA_APP_SECRET`.
8. **Connect the number** (our Settings → WhatsApp → Connect number): registers it with a **6-digit PIN** the client
   chooses and keeps (Meta asks for it if the number is ever moved), and subscribes the app. Until this is done other
   people's WhatsApp shows "Invite to WhatsApp" for the number.
9. **Publish the app** (app → Publish). Needs in App settings → Basic: **app icon 1024×1024, privacy policy URL,
   category** (Business and pages). Unpublished apps don't receive real customer messages.
10. **Business profile** (WhatsApp Manager → Phone numbers → the number → Profile): photo, category (Professional
    services or theirs), description (512 characters), address, email, website. **Display name**: Edit → submit; Meta
    reviews it (1–2 days); until approved people see the old name and the field shows "unavailable".
11. **Payment method** (Business settings → Messaging accounts → the account → Payment settings → Add payment
    method). Choose **INR** if asked for a currency: it can't be changed later.
12. **Templates** (from our WhatsApp → Templates, submitted to Meta; approval usually minutes to a day), then the
    click-to-chat link `https://wa.me/91XXXXXXXXXX` in email signatures and on the website.

## Test (every time)

- From any phone: send "hi" to the number (on a phone, not WhatsApp Web; or `wa.me/91…` in the phone's browser).
  A freshly connected number can show "Invite" for a few minutes: phones cache "not on WhatsApp"; refresh contacts.
- It must appear in the inbox, marked opted in ("wrote to us first").
- Reply from the system; the message status must go sent → delivered → **read** (that proves the status webhooks).
- WhatsApp Manager → Phone numbers shows **Connected**; our Settings → WhatsApp shows the number, quality, limit.

## Business verification and limits

- Unverified portfolio: 2 numbers, 250 new chats started by the business per day, one Admin system user.
- Verified: up to 20 numbers, and the daily limit grows automatically with good quality (1k → 10k → 100k → unlimited);
  limits are now counted per portfolio, not per number. Display names are easier to get approved.
- Quality rating (shown as UNKNOWN at first) drops when people block or report the number: only message people who
  agreed, keep templates useful, and stop on "stop".

## Costs (check Meta's current rate card for India)

- **Free:** everything people send to the business; the business's replies (free text) within 24 hours of the
  person's last message; utility templates sent inside that 24-hour window.
- **Paid, per message delivered:** templates the business starts: marketing (most expensive, roughly ₹0.8 each in
  2025–26), utility and authentication (a fraction of that). Billed to the card on the messaging account, monthly or at
  thresholds. No message is charged unless it is a template the business sent.
- Control: our CRM sends business-started messages only to people who agreed, within a daily cap (`wa_daily_max`) and
  a send window, so the bill is bounded: e.g. 50 marketing messages a day ≈ ₹40/day ≈ ₹1,200/month at most.

## Gotchas we hit

- A number already on WhatsApp (even on a relative's phone) is refused at step 3.
- The country code defaults to US +1 in the add-number dialog.
- "Maximum number of admin system users" → use an Employee system user (step 6).
- "WhatsApp accounts" is now called **Messaging accounts** in Business settings.
- The app can't be published until it has an icon, privacy URL and category.
- `business.facebook.com/wa/manage/...` links can land on "content isn't available"; start from the app's
  Use cases → Connect on WhatsApp page, or WhatsApp Manager with `business_id` and `asset_id` in the URL.

## Handover to the client

- They own: the portfolio, the number, the PIN, the card, the token (they can revoke it: System users → Revoke
  tokens) and the app.
- Write down in their project README: phone number ID, messaging account ID, app ID, system user name, which Worker
  holds the secrets, and what was tested on which date.
