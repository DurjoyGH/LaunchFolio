const simpleIcons = require("simple-icons");

const SOCIAL_LABELS = {
  github: "GitHub",
  linkedin: "LinkedIn",
  twitter: "X",
  website: "Website",
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
  snapchat: "Snapchat",
  pinterest: "Pinterest",
  threads: "Threads",
};

const FALLBACK_ICON = simpleIcons.siLinktree;
const CUSTOM_ICONS = {
  linkedin: {
    path: "M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.476-.9 1.636-1.85 3.366-1.85 3.6 0 4.267 2.368 4.267 5.455v6.286zM5.337 7.433A2.065 2.065 0 1 1 5.337 3.3a2.065 2.065 0 0 1 0 4.133zM6.882 20.452H3.79V9h3.092v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0h.003z",
  },
};

const SOCIAL_ICON_MAP = {
  github: simpleIcons.siGithub,
  linkedin: simpleIcons.siLinkedin || CUSTOM_ICONS.linkedin || FALLBACK_ICON,
  twitter: simpleIcons.siX,
  website: simpleIcons.siLinktree,
  facebook: simpleIcons.siFacebook,
  instagram: simpleIcons.siInstagram,
  youtube: simpleIcons.siYoutube,
  tiktok: simpleIcons.siTiktok,
  snapchat: simpleIcons.siSnapchat,
  pinterest: simpleIcons.siPinterest,
  threads: simpleIcons.siThreads,
};

const getSocialLabel = (key) => SOCIAL_LABELS[key] || `${key.charAt(0).toUpperCase()}${key.slice(1)}`;

const getSocialIcon = (key) => SOCIAL_ICON_MAP[key] || FALLBACK_ICON;

const renderSimpleIcon = (icon, size = 16) => {
  if (!icon || !icon.path) return "";
  return `<svg width=\"${size}\" height=\"${size}\" viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"${icon.path}\"/></svg>`;
};

const buildSocialLinks = (social, cls, size = 16) => {
  const links = [];
  for (const [key, url] of Object.entries(social || {})) {
    if (!url || !url.trim()) continue;
    const label = getSocialLabel(key);
    const icon = renderSimpleIcon(getSocialIcon(key), size);
    links.push(`<a href=\"${url}\" target=\"_blank\" rel=\"noopener noreferrer\" className=\"flex items-center gap-2 ${cls}\">${icon}<span>${label}</span></a>`);
  }
  return links.join("\n            ");
};

module.exports = {
  buildSocialLinks,
  getSocialLabel,
  renderSimpleIcon,
  getSocialIcon,
};
