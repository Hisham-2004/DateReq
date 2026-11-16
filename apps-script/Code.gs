/**
 * Zebra Raisu Date Invitation — Google Apps Script
 *
 * 1) Create a Google Apps Script project while signed in as
 *    abrarhisham2004@gmail.com.
 * 2) Paste this file into Code.gs.
 * 3) Deploy as a Web app: Execute as "Me"; access "Anyone".
 * 4) Authorize Gmail permissions when prompted.
 *
 * The script sends the submitted date plan to both configured inboxes.
 */

const YOUR_EMAIL = "abrarhisham2004@gmail.com";
const HER_EMAIL = "raisanithiya@gmail.com";

// Basic abuse controls. The form also includes a honeypot field.
// This is a lightweight personal invitation, not a hardened public mail API.
const COOLDOWN_SECONDS = 60;

function doPost(e) {
  try {
    const p = (e && e.parameter) || {};

    // Reject submissions from bots that fill the hidden honeypot.
    if (String(p.website || "").trim() !== "") {
      return json_({ success: false, error: "Invalid submission." });
    }

    const date = clean_(p.date, 100);
    const time = clean_(p.time, 50);
    const place = clean_(p.place, 200);
    const note = clean_(p.note, 500);

    if (!date || !place) {
      return json_({ success: false, error: "Date and place are required." });
    }

    // Prevent rapid repeated sends from the public endpoint.
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const props = PropertiesService.getScriptProperties();
      const lastSent = Number(props.getProperty("LAST_SENT_AT") || "0");
      const now = Date.now();
      if (now - lastSent < COOLDOWN_SECONDS * 1000) {
        return json_({ success: false, error: "Please wait a minute before trying again." });
      }
      props.setProperty("LAST_SENT_AT", String(now));
    } finally {
      lock.releaseLock();
    }

    const subject = "A little date plan from Zebra Raisu 💗";
    const body =
      "A date plan has been submitted!\n\n" +
      "Date: " + date + "\n" +
      "Time: " + (time || "To be decided") + "\n" +
      "Place: " + place + "\n" +
      "Note: " + (note || "No extra note") + "\n\n" +
      "Hope you both have a lovely time. 💗";

    // Send each message from the Gmail account that owns this Apps Script.
    GmailApp.sendEmail(YOUR_EMAIL, subject, body, {
      name: "Abrar"
    });
    GmailApp.sendEmail(HER_EMAIL, subject, body, {
      name: "Abrar"
    });

    return json_({ success: true });
  } catch (err) {
    console.error(err);
    return json_({ success: false, error: "Email sending failed." });
  }
}

function clean_(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Run this function once from the Apps Script editor to trigger Gmail
// permission authorization before deploying.
function authorizeGmail() {
  GmailApp.getRemainingDailyQuota();
}
