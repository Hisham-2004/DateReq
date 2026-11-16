# Zebra Raisu — Gmail-powered Date Invitation

This updated version replaces the previous Resend/Node email backend with **Google Apps Script + your Gmail account**. No custom domain, Resend account, or Gmail password in the website is needed.

## Recipients already configured

- Sender account / your notification: `abrarhisham2004@gmail.com`
- Her confirmation: `raisanithiya@gmail.com`
- Both emails are sent by the Gmail account that owns the Apps Script project.

## Setup

### A. Create the Google Apps Script

1. Sign in to Google as `abrarhisham2004@gmail.com`.
2. Open https://script.google.com/ and choose **New project**.
3. Name it `Zebra Date Invitation`.
4. Open `Code.gs`, remove the starter code, and paste the complete contents of `apps-script/Code.gs` from this ZIP.
5. Save the project.
6. In the function selector, choose `authorizeGmail` and click **Run**.
7. Review the requested Gmail permission and allow it for your account.

### B. Deploy as a web app

1. Click **Deploy → New deployment**.
2. Choose the gear icon / deployment type **Web app**.
3. Set **Execute as: Me**.
4. Set **Who has access: Anyone** (if this option is available for your Google account).
5. Click **Deploy** and complete any authorization prompt.
6. Copy the Web app URL. It should look like `https://script.google.com/macros/s/.../exec`.

Google may change its deployment screens. Use the current Web app deployment option.

### C. Add the URL to the website

1. Open `public/index.html` in a text editor.
2. Find this line:

   `const GOOGLE_APPS_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";`

3. Replace the text inside the quotes with the Web app URL you copied. Keep the quotation marks.
4. Save the file.

### D. Publish the website

Upload the contents of the `public` folder to a static website host that provides an HTTPS URL, or test locally with a simple static server. Share the hosted `index.html` page URL with her.

## Email behavior

When the date form is submitted, the browser posts the form fields to Apps Script. Apps Script sends two separate emails from the Gmail account that owns the script:

- To `abrarhisham2004@gmail.com`
- To `raisanithiya@gmail.com`

The subject is `A little date plan from Zebra Raisu 💗`.

## Important limitations and safety

- This ZIP is updated, but it is **not yet connected or deployed**. You must create/deploy the Apps Script and paste its URL into `public/index.html`.
- The browser uses a hidden form target because Apps Script's cross-origin response is not readable from a normal website. The page acknowledges submission, but cannot verify actual inbox delivery. Check Gmail's Sent folder and both inboxes during testing.
- A public Apps Script web app URL can be abused by others. The script includes a honeypot and a one-minute global cooldown, but these are basic safeguards, not strong authentication. Only share the invitation with the intended recipient and consider disabling the deployment after the date is arranged.
- Do not paste Gmail passwords or API keys into the website.
- The first screen's name question is playful, not identity verification or a security barrier.
- Apps Script quotas and Google account policies apply. Google may restrict public web-app access on some managed accounts.

## Project structure

- `public/index.html` — the invitation website
- `apps-script/Code.gs` — the Gmail sending backend
- `README.md` — this guide
