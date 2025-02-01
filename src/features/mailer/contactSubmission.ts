"use server";

import { keystaticReader } from "@/lib/reader";
import { sendEmail } from ".";

export const contactSubmission = async ({
  email,
  name,
  message,
}: {
  email: string;
  name: string;
  message: string;
}) => {
  if (!email || !name || !message) throw new Error("All fields are required.");
  const toEmail = (await (await keystaticReader()).singletons.settings.read())
    ?.contact.email;
  if (!toEmail) throw Error("No receiver email found");
  return sendEmail({
    to: [toEmail],
    html: `Name: ${name}<br/>Email: ${email}<br/>Message: ${message}`,
    subject: "New Contact Form Submission",
  });
};
