/**
 * Generates a branded HTML email template.
 */
const buildEmailTemplate = ({ title, heading, body, ctaText, ctaUrl }) => `
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

module.exports = { buildEmailTemplate };
