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

  // /app/globals.css
  write(outputPath, "app/globals.css", `@import "tailwindcss";

@theme inline {
  --color-primary: ${primaryColor};
  --color-secondary: ${secondaryColor};
  --color-accent: ${accentColor};
}

@layer base {
  html { scroll-behavior: smooth; }

  body {
    background: ${theme === "dark" ? "#0a0a0f" : "#fafafa"};
    color: ${theme === "dark" ? "#e2e8f0" : "#1a202c"};
    font-family: var(--font-body), system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
}
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
