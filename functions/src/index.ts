import {onDocumentCreated} from "firebase-functions/v2/firestore";
import {defineSecret} from "firebase-functions/params";
import * as logger from "firebase-functions/logger";
import * as nodemailer from "nodemailer";
import {initializeApp} from "firebase-admin/app";

initializeApp();

const gmailEmail = defineSecret("GMAIL_EMAIL");
const gmailAppPassword = defineSecret("GMAIL_APP_PASSWORD");
const contactReceiverEmail = defineSecret("CONTACT_RECEIVER_EMAIL");
const DEFAULT_CONTACT_RECEIVER_EMAIL = "mdmashuk042@gmail.com";

function escapeHtml(value: unknown): string {
  const stringValue = String(value ?? "");
  return stringValue
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const sendContactEmail = onDocumentCreated(
  {
    document: "enquiries/{enquiryId}",
    secrets: [gmailEmail, gmailAppPassword, contactReceiverEmail],
  },
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      logger.warn("No data associated with the event");
      return;
    }

    const data = snapshot.data();
    if (data.deliveryProvider === "resend") {
      logger.info("Skipping Gmail send because Resend already handled delivery.");
      return;
    }

    const fromEmail = gmailEmail.value();
    const appPassword = gmailAppPassword.value();
    const toEmail =
      contactReceiverEmail.value()?.trim() || DEFAULT_CONTACT_RECEIVER_EMAIL;

    if (!fromEmail || !appPassword) {
      logger.error("Missing required email secrets for sender auth.");
      return;
    }

    const mailTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: fromEmail,
        pass: appPassword,
      },
    });

    const senderName = escapeHtml(data.name || "Website Visitor");
    const senderEmail = escapeHtml(data.email || "Not provided");
    const senderPhone = escapeHtml(data.phone || "Not provided");
    const senderMessage = escapeHtml(data.message || "");
    const replyTo = String(data.email || fromEmail).replace(/[\r\n]/g, "");

    const mailOptions = {
      from: `"${senderName}" <${fromEmail}>`,
      to: toEmail,
      replyTo,
      subject: `New Portfolio Message: ${senderName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #6C4CE5;">New Enquiry Received</h2>
          <p><strong>Name:</strong> ${senderName}</p>
          <p><strong>Email:</strong> ${senderEmail}</p>
          <p><strong>Phone:</strong> ${senderPhone}</p>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p><strong>Message:</strong></p>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${senderMessage}</p>
        </div>
      `,
    };

    try {
      await mailTransport.sendMail(mailOptions);
      logger.info("Contact email sent successfully for:", senderName);
    } catch (error) {
      logger.error("Error sending email:", error);
    }
  }
);
