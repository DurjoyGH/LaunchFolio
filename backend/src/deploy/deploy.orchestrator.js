const { publishToGitHub } = require("./github.service");
const { createDeployment, waitForDeployment } = require("./vercel.service");

/**
 * Full deployment pipeline:
 * 1. Push to GitHub (for source backup)
 * 2. Deploy to Vercel via file upload
 * 3. Poll until live
 *
 * @param {Object} params
 * @param {string} params.portfolioId
 * @param {string} params.userName
 * @param {string} params.localPath
 * @returns {{ repoUrl, deployUrl, vercelProjectId, vercelDeployId }}
 */
const deployPortfolio = async ({ portfolioId, userName, localPath, customDomain }) => {
  // 1. Push to GitHub (source backup — non-blocking on failure)
  let repoUrl = "";
  try {
    const github = await publishToGitHub({ portfolioId, userName, localPath });
    repoUrl = github.repoUrl;
  } catch (err) {
    console.error("[Deploy] GitHub push failed (non-fatal):", err.message);
  }

  // 2. Deploy to Vercel via file upload
  // Use user's custom domain if provided, otherwise generate one
  const projectName = customDomain
    ? customDomain.toLowerCase().replace(/[^a-z0-9-]/g, "")
    : `launchfolio-${portfolioId.slice(-8)}`;
  const deploy = await createDeployment({ projectName, localPath });
  console.log(`[Deploy] Vercel deployment created: ${deploy.id}`);

  // 3. Wait for live URL
  const { url } = await waitForDeployment(deploy.id);
  console.log(`[Deploy] Live at: ${url}`);

  return {
    repoUrl,
    deployUrl: url,
    vercelProjectId: projectName,
    vercelDeployId: deploy.id,
  };
};

module.exports = { deployPortfolio };
