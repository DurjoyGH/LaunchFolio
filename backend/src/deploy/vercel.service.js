const axios = require("axios");
const fs = require("fs");
const path = require("path");

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_API = "https://api.vercel.com";

const getHeaders = () => ({ Authorization: `Bearer ${VERCEL_TOKEN}` });

/**
 * Recursively collect all files from a directory.
 * Returns array of { file: relative path, data: base64 content }
 */
const collectFiles = (dir, baseDir = dir) => {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(baseDir, fullPath);

    // Skip .git, node_modules
    if (entry.name === ".git" || entry.name === "node_modules" || entry.name === ".next") continue;

    if (entry.isDirectory()) {
      results.push(...collectFiles(fullPath, baseDir));
    } else {
      const content = fs.readFileSync(fullPath);
      results.push({
        file: relPath,
        data: content.toString("base64"),
        encoding: "base64",
      });
    }
  }
  return results;
};

/**
 * Deploy a local directory to Vercel using file upload API.
 * This does NOT require GitHub-Vercel integration.
 *
 * @param {Object} params
 * @param {string} params.projectName
 * @param {string} params.localPath
 * @returns {{ id: string, url: string, readyState: string }}
 */
const createDeployment = async ({ projectName, localPath }) => {
  const files = collectFiles(localPath);
  console.log(`[Vercel] Uploading ${files.length} files for project "${projectName}"...`);

  const res = await axios.post(
    `${VERCEL_API}/v13/deployments`,
    {
      name: projectName,
      files,
      target: "production",
      projectSettings: {
        framework: "nextjs",
        installCommand: "npm install",
        buildCommand: "npm run build",
        outputDirectory: ".next",
      },
    },
    { headers: getHeaders() }
  );

  return res.data;
};

/**
 * Poll Vercel until deployment is READY or ERROR.
 * @param {string} deploymentId
 * @param {number} maxAttempts
 * @returns {{ url: string, state: string }}
 */
const waitForDeployment = async (deploymentId, maxAttempts = 30) => {
  for (let i = 0; i < maxAttempts; i++) {
    await sleep(15000);
    try {
      const res = await axios.get(
        `${VERCEL_API}/v13/deployments/${deploymentId}`,
        { headers: getHeaders() }
      );
      const { readyState, url, alias } = res.data;
      console.log(`[Vercel] Deploy ${deploymentId}: ${readyState}`);

      if (readyState === "READY") {
        // Prefer the production alias (clean URL) over the deployment URL (hash URL)
        const productionUrl = alias?.length > 0 ? `https://${alias[0]}` : `https://${url}`;
        console.log(`[Vercel] Production URL: ${productionUrl}`);
        return { url: productionUrl, state: "ready" };
      }
      if (readyState === "ERROR" || readyState === "CANCELED") {
        throw new Error(`Vercel deployment ${readyState.toLowerCase()}`);
      }
    } catch (err) {
      if (err.message?.includes("deployment")) throw err; // re-throw our own errors
      if (i === maxAttempts - 1) throw err;
    }
  }
  throw new Error("Deployment timed out after 7.5 minutes");
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

module.exports = { createDeployment, waitForDeployment };
