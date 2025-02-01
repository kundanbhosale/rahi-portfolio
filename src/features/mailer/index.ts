import "server-only";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export const sendEmail = (opts: {
  to: string[];
  subject: string;
  html: string;
  replyTo: string;
}) => {
  return resend.emails.send({
    from: "Rahi's Notifier <notify@rahigurav.com>",
    ...opts,
  });
};
