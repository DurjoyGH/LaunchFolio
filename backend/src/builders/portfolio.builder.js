const fs = require("fs");
const path = require("path");
const { SECTION_GENERATORS } = require("../templates/registry");

/**
 * Generates the complete Next.js portfolio project on disk.
 * @param {Object} params
 * @param {string} params.portfolioId
 * @param {Object} params.blueprint
 * @param {Object} params.userInput
 * @param {Object} params.content
 * @returns {string} outputPath
 */
const buildPortfolio = async ({ portfolioId, blueprint, userInput, content }) => {
  const outputPath = path.join(__dirname, "../../generated-sites", portfolioId);
  fs.mkdirSync(outputPath, { recursive: true });

  const ctx = { blueprint, userInput, content };

  // Generate section components
  const sectionFiles = {};
  for (const section of blueprint.sections) {
    const generator = SECTION_GENERATORS[section.type];
    if (!generator) continue;
    const code = generator(ctx);
    sectionFiles[section.type] = { variant: section.variant, code };
  }

  // Write all files
  await writeProjectFiles({ outputPath, blueprint, userInput, content, sectionFiles });

  return outputPath;
};

const writeProjectFiles = async ({ outputPath, blueprint, userInput, content, sectionFiles }) => {
  const { theme, font, primaryColor, secondaryColor, accentColor } = blueprint;

  // /app/page.tsx
  const sectionImports = Object.entries(sectionFiles)
    .map(([type]) => `import ${capitalize(type)} from "@/components/${type}";`)
    .join("\n");

  const sectionJSX = blueprint.sections
    .map(({ type }) => `      <${capitalize(type)} />`)
    .join("\n");

  write(outputPath, "app/page.tsx", `${sectionImports}

export default function Home() {
  return (
    <main>
${sectionJSX}
    </main>
  );
}
`);

  // /app/layout.tsx
  const googleFontVar = getFontImport(font);
  write(outputPath, "app/layout.tsx", `import type { Metadata } from "next";
import { ${font.replace(" ", "_")} } from "next/font/google";
import "./globals.css";

${googleFontVar}

export const metadata: Metadata = {
  title: "${userInput.name} | ${userInput.title}",
  description: "${content.bio?.slice(0, 155) || `Portfolio of ${userInput.name}`}",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.className}>
      <body>{children}</body>
    </html>
  );
}
`);

  // /app/globals.css — with design tokens
  const { designTokens = {} } = blueprint;
  const spacing = { compact: "3rem", comfortable: "5rem", spacious: "8rem" }[designTokens.spacing] || "5rem";
  const radius = { none: "0", sm: "0.5rem", md: "1rem", lg: "1.5rem", full: "9999px" }[designTokens.radius] || "1.5rem";
  const shadow = {
    none: "none",
    soft: "0 4px 20px rgba(0,0,0,0.1)",
    medium: "0 8px 30px rgba(0,0,0,0.2)",
    dramatic: "0 16px 60px rgba(0,0,0,0.4)",
  }[designTokens.shadow] || "0 4px 20px rgba(0,0,0,0.1)";
  const animDuration = { none: "0s", subtle: "0.15s", smooth: "0.3s", energetic: "0.5s" }[designTokens.animation] || "0.3s";

  const dp = userInput.designPreferences || {};
  
  // Resolve colors based on user preference or theme
  const isDark = theme === "dark";
  const textColor = dp.textColor || (isDark ? "#e2e8f0" : "#1a202c");
  const textMuted = isDark ? "#9ca3af" : "#6b7280";
  const btnBg = dp.buttonColor || primaryColor;
  const btnText = dp.buttonTextColor || "#ffffff";
  const navBg = dp.navBgColor || (isDark ? "rgba(10,10,15,0.9)" : "rgba(255,255,255,0.9)");
  const navLink = dp.navLinkColor || (isDark ? "#9ca3af" : "#4b5563");
  const navLinkHover = dp.textColor || (isDark ? "#ffffff" : "#111827");
  const cardBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
  const borderColor = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";

  write(outputPath, "app/globals.css", `@import "tailwindcss";

@theme inline {
  --color-primary: ${primaryColor};
  --color-secondary: ${secondaryColor};
  --color-accent: ${accentColor};
}

@layer base {
  :root {
    --section-spacing: ${spacing};
    --card-radius: ${radius};
    --card-shadow: ${shadow};
    --anim-duration: ${animDuration};
    
    --color-text-main: ${textColor};
    --color-text-muted: ${textMuted};
    --color-btn-bg: ${btnBg};
    --color-btn-text: ${btnText};
    --color-nav-bg: ${navBg};
    --color-nav-link: ${navLink};
    --color-nav-hover: ${navLinkHover};
    --color-card-bg: ${cardBg};
    --color-border: ${borderColor};
  }

  html { scroll-behavior: smooth; }

  body {
    background: ${isDark ? "#0a0a0f" : "#fafafa"};
    color: var(--color-text-main);
    font-family: var(--font-body), system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  .text-white { color: var(--color-text-main); }
  .text-gray-300 { color: var(--color-text-main); opacity: 0.9; }
  .text-gray-400 { color: var(--color-text-muted); }
  .text-gray-500 { color: var(--color-text-muted); opacity: 0.8; }
  
  .border-white\\/5, .border-white\\/10 { border-color: var(--color-border); }
  
  .nav-link {
    color: var(--color-nav-link);
    transition: color var(--anim-duration);
  }
  .nav-link:hover { color: var(--color-nav-hover); }

  .btn-primary {
    background: var(--color-btn-bg);
    color: var(--color-btn-text);
  }

  section { padding-top: var(--section-spacing); padding-bottom: var(--section-spacing); }

  ::selection {
    background: ${primaryColor}40;
    color: var(--color-text-main);
  }
}

/* Animations */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideIn {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes glowPulse {
  0% { text-shadow: 0 0 10px ${primaryColor}40; }
  50% { text-shadow: 0 0 25px ${primaryColor}80; }
  100% { text-shadow: 0 0 10px ${primaryColor}40; }
}

.anim-fadeUp { animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.anim-slideIn { animation: slideIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.anim-glow { animation: glowPulse 3s infinite; }
.anim-typewriter { overflow: hidden; white-space: nowrap; border-right: 2px solid ${primaryColor}; animation: typing 2s steps(40, end), blink-caret .75s step-end infinite; }

@keyframes typing { from { width: 0 } to { width: 100% } }
@keyframes blink-caret { from, to { border-color: transparent } 50% { border-color: ${primaryColor}; } }
`);

  // Write each section component
  for (const [type, { code }] of Object.entries(sectionFiles)) {
    write(outputPath, `components/${type}.tsx`, `"use client";\n${code}`);
  }

  // package.json
  write(outputPath, "package.json", JSON.stringify({
    name: `portfolio-${userInput.name.toLowerCase().replace(/\s+/g, "-")}`,
    version: "1.0.0",
    private: true,
    scripts: { dev: "next dev", build: "next build", start: "next start" },
    dependencies: {
      next: "15.5.18",
      react: "19.1.0",
      "react-dom": "19.1.0",
      "react-icons": "^5.0.1",
      "lucide-react": "^0.477.0"
    },
    devDependencies: {
      "@tailwindcss/postcss": "^4",
      "@types/node": "^20",
      "@types/react": "^19",
      "@types/react-dom": "^19",
      tailwindcss: "^4",
      typescript: "^5",
    },
  }, null, 2));

  // tsconfig.json
  write(outputPath, "tsconfig.json", JSON.stringify({
    compilerOptions: {
      target: "ES2017",
      lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: "esnext",
      moduleResolution: "bundler",
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: "preserve",
      incremental: true,
      plugins: [{ name: "next" }],
      paths: { "@/*": ["./*"] },
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    exclude: ["node_modules"],
  }, null, 2));

  // postcss.config.mjs
  write(outputPath, "postcss.config.mjs", `const config = { plugins: { "@tailwindcss/postcss": {} } };\nexport default config;\n`);

  // next.config.ts
  write(outputPath, "next.config.ts", `import type { NextConfig } from "next";\nconst nextConfig: NextConfig = { images: { unoptimized: true } };\nexport default nextConfig;\n`);

  // .gitignore
  write(outputPath, ".gitignore", `.next\nnode_modules\n.env\n.env.local\n`);
  
  // .npmrc to prevent peer dependency issues with React 19
  write(outputPath, ".npmrc", `legacy-peer-deps=true\n`);
};

// Helpers
const write = (base, relPath, content) => {
  const full = path.join(base, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const getFontImport = (font) => {
  const map = {
    Inter: "Inter",
    Poppins: "Poppins",
    Raleway: "Raleway",
    Roboto: "Roboto",
    "Space Grotesk": "Space_Grotesk",
  };
  const importName = map[font] || "Inter";
  const varName = importName.toLowerCase().replace("_", "");
  return `const font = ${importName}({ subsets: ["latin"], variable: "--font-body" });`;
};

module.exports = { buildPortfolio };
