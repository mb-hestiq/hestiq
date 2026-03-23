import nodemailer from "nodemailer";

if (process.env.NODE_ENV !== "production") {
  import('dotenv').then(dotenv => dotenv.config());
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default transporter;