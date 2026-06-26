import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async ({ to, subject, html }: { to: string; subject: string; html: string }) => {
  try {
    await transporter.sendMail({
      from: `"LaunchFolio" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
  } catch (err: any) {
    console.error("Email send failed:", err.message);
  }
};

const buildEmailTemplate = ({ title, heading, body, ctaText, ctaUrl }: { title: string; heading: string; body: string; ctaText?: string; ctaUrl?: string }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; background: #0f0f14; font-family: 'Arial', sans-serif; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #1a1a2e; border-radius: 16px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 32px 40px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 26px; letter-spacing: -0.5px; }
    .header span { color: rgba(255,255,255,0.7); font-size: 13px; }
    .content { padding: 40px; color: #e2e8f0; }
    .content h2 { color: #fff; font-size: 20px; margin-top: 0; }
    .content p { line-height: 1.7; color: #94a3b8; margin: 0 0 20px; }
    .cta { text-align: center; margin: 32px 0; }
    .cta a {
      display: inline-block; background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: #fff; text-decoration: none; padding: 14px 36px;
      border-radius: 50px; font-weight: 600; font-size: 15px;
    }
    .footer { padding: 24px 40px; background: #16162a; text-align: center; color: #4a5568; font-size: 12px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>LaunchFolio</h1>
      <span>AI-Powered Portfolio Platform</span>
    </div>
    <div class="content">
      <h2>${heading}</h2>
      ${body}
      ${ctaText && ctaUrl ? `<div class="cta"><a href="${ctaUrl}">${ctaText}</a></div>` : ""}
    </div>
    <div class="footer">© ${new Date().getFullYear()} LaunchFolio. All rights reserved.</div>
  </div>
</body>
</html>
`;

export const welcomeEmail = (name: string) =>
  buildEmailTemplate({
    title: "Welcome to LaunchFolio",
    heading: `Welcome aboard, ${name}! 🚀`,
    body: `
      <p>Your LaunchFolio account is ready. You can now start building your AI-powered portfolio.</p>
      <p>LaunchFolio analyzes your skills and experience then assembles a stunning portfolio website — deployed live within minutes.</p>
    `,
    ctaText: "Get Started",
    ctaUrl: `${process.env.FRONTEND_URL || "http://localhost:3000"}/generate`,
  });

export const portfolioReadyEmail = (name: string, deployUrl: string) =>
  buildEmailTemplate({
    title: "Your Portfolio is Live!",
    heading: `Your portfolio is live, ${name}! 🎉`,
    body: `
      <p>Your AI-powered portfolio has been successfully generated and deployed to Vercel.</p>
      <p>Share your new portfolio link with the world:</p>
      <p><strong style="color:#6366f1">${deployUrl}</strong></p>
    `,
    ctaText: "View Your Portfolio",
    ctaUrl: deployUrl,
  });

export const generationFailedEmail = (name: string) =>
  buildEmailTemplate({
    title: "Portfolio Generation Failed",
    heading: `We ran into an issue, ${name}`,
    body: `
      <p>Unfortunately, your portfolio generation failed. Our team has been notified.</p>
      <p>Please try again or contact support if the problem persists.</p>
    `,
    ctaText: "Try Again",
    ctaUrl: `${process.env.FRONTEND_URL || "http://localhost:3000"}/generate`,
  });
