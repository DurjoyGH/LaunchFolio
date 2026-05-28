const { buildEmailTemplate } = require("./email.template");

const welcomeEmail = (name) =>
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

const portfolioReadyEmail = (name, deployUrl) =>
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

const generationFailedEmail = (name) =>
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

module.exports = { welcomeEmail, portfolioReadyEmail, generationFailedEmail };
