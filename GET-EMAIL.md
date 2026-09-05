To receive and reply to emails as **hello@ahromlabs.com** directly inside your personal Gmail inbox for free, set up **Cloudflare Email Routing** (inbound) and pair it with a free SMTP service like **Brevo** (outbound).

---

**Part 1: Inbound Email Routing (Cloudflare)**

1. **Open Email Routing:**
* Go to your Cloudflare dashboard and select the **ahromlabs.com** zone.
* In the left sidebar, click **Email** > **Email Routing**.
* Click **Get started**.


2. **Add Destination Address:**
* Under **Destination addresses**, enter your personal Gmail address.
* Cloudflare will send a confirmation link to your Gmail. Open the email and click **Verify email address**.


3. **Create Custom Address Rule:**
* Under **Custom addresses**, click **Create address**.
* Custom address: `hello` (or `contact`) `@ahromlabs.com`.
* Action: **Send to**.
* Destination: Select your verified Gmail address.
* Click **Save**.


4. **Add DNS Records (1-Click):**
* Cloudflare will display the necessary MX and TXT (SPF) records.
* Click **Add records automatically**. Cloudflare will inject the proper DNS entries into your domain without breaking your website.



*At this point, any email sent to `hello@ahromlabs.com` immediately lands in your personal Gmail.*

---

**Part 2: Outbound Sending Setup (Gmail + Free SMTP)**

Gmail requires an SMTP server to send emails on behalf of a custom domain. **Brevo** (formerly Sendinblue) provides a free tier with 300 free outgoing emails per day.

1. **Create Free Brevo Account:**
* Sign up at [brevo.com](https://www.brevo.com) (select the Free plan).
* Verify your sender domain: Go to **Settings** > **Senders, Domains & Dedicated IPs** > **Domains** > **Add a domain**.
* Enter `ahromlabs.com` and follow Brevo's instructions to add the DKIM/TXT record to your Cloudflare DNS tab.


2. **Get SMTP Credentials:**
* In Brevo, click your account name in the top right > **SMTP & API**.
* Under the **SMTP** tab, note down:
* **SMTP Server:** `smtp-relay.brevo.com`
* **Port:** `587`
* **Login:** (Your Brevo account email)
* **Master Password / Key:** Click **Generate a new SMTP key** and copy it.




3. **Connect to Gmail ("Send mail as"):**
* Open your personal Gmail on a computer.
* Click the **Gear icon** (top right) > **See all settings** > **Accounts and Import**.
* Under **Send mail as**, click **Add another email address**.
* A pop-up window will appear:
* **Name:** Ahrom Labs (or your full name)
* **Email address:** `hello@ahromlabs.com`
* Leave **Treat as an alias** checked. Click **Next Step**.


* Enter the Brevo SMTP details:
* **SMTP Server:** `smtp-relay.brevo.com`
* **Port:** `587`
* **Username:** Your Brevo login email
* **Password:** The SMTP key you generated in Brevo
* Select **Secured connection using TLS**.
* Click **Add Account**.




4. **Verify in Gmail:**
* Gmail will send a confirmation code to `hello@ahromlabs.com`.
* Because Part 1 is active, this code will arrive in your Gmail inbox within seconds.
* Enter the verification code into the pop-up box and confirm.



---

**Part 3: Daily Usage in Gmail**

* In Gmail settings under **Accounts and Import** > **When replying to a message**, select **"Reply from the same address the message was sent to"**.
* When composing a new email, click the **From** dropdown to toggle between your personal Gmail address and `hello@ahromlabs.com`.