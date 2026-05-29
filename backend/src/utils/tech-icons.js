/**
 * Maps technology/skill names to react-icons Simple Icons (Si) component names.
 * Handles normalization of similar terms (OOP, OOPS, Object Oriented → same icon).
 */

// Normalize skill name to lowercase, remove dots, spaces, special chars
const normalize = (name) => name.toLowerCase().replace(/[.\-_\s]/g, "").replace(/js$/, "").replace(/\.js$/, "");

const TECH_ICON_MAP = {
  // Frontend
  react: "SiReact",
  reactjs: "SiReact",
  reactnative: "SiReact",
  nextjs: "SiNextdotjs",
  next: "SiNextdotjs",
  vue: "SiVuedotjs",
  vuejs: "SiVuedotjs",
  angular: "SiAngular",
  svelte: "SiSvelte",
  html: "SiHtml5",
  html5: "SiHtml5",
  css: "SiCss",
  css3: "SiCss",
  sass: "SiSass",
  scss: "SiSass",
  tailwind: "SiTailwindcss",
  tailwindcss: "SiTailwindcss",
  bootstrap: "SiBootstrap",
  jquery: "SiJquery",
  redux: "SiRedux",
  gatsby: "SiGatsby",
  astro: "SiAstro",
  vite: "SiVite",
  webpack: "SiWebpack",

  // Backend & Runtime
  node: "SiNodedotjs",
  nodejs: "SiNodedotjs",
  nodej: "SiNodedotjs",
  express: "SiExpress",
  expressjs: "SiExpress",
  django: "SiDjango",
  flask: "SiFlask",
  fastapi: "SiFastapi",
  spring: "SiSpring",
  springboot: "SiSpringboot",
  laravel: "SiLaravel",
  rails: "SiRubyonrails",
  rubyonrails: "SiRubyonrails",
  nestjs: "SiNestjs",
  nest: "SiNestjs",
  deno: "SiDeno",
  bun: "SiBun",
  graphql: "SiGraphql",

  // Languages
  javascript: "SiJavascript",
  js: "SiJavascript",
  typescript: "SiTypescript",
  ts: "SiTypescript",
  python: "SiPython",
  java: "SiOpenjdk",
  c: "SiC",
  cplusplus: "SiCplusplus",
  "c++": "SiCplusplus",
  cpp: "SiCplusplus",
  csharp: "SiCsharp",
  "c#": "SiCsharp",
  go: "SiGo",
  golang: "SiGo",
  rust: "SiRust",
  ruby: "SiRuby",
  php: "SiPhp",
  swift: "SiSwift",
  kotlin: "SiKotlin",
  dart: "SiDart",
  r: "SiR",
  lua: "SiLua",
  perl: "SiPerl",
  scala: "SiScala",
  elixir: "SiElixir",
  haskell: "SiHaskell",
  clojure: "SiClojure",

  // Databases
  mongodb: "SiMongodb",
  mongo: "SiMongodb",
  mysql: "SiMysql",
  postgresql: "SiPostgresql",
  postgres: "SiPostgresql",
  redis: "SiRedis",
  firebase: "SiFirebase",
  supabase: "SiSupabase",
  sqlite: "SiSqlite",
  mariadb: "SiMariadb",
  cassandra: "SiApachecassandra",
  dynamodb: "FaAws",
  prisma: "SiPrisma",
  mongoose: "SiMongodb",

  // DevOps & Cloud
  docker: "SiDocker",
  kubernetes: "SiKubernetes",
  k8s: "SiKubernetes",
  aws: "FaAws",
  amazonwebservices: "FaAws",
  gcp: "SiGooglecloud",
  googlecloud: "SiGooglecloud",
  azure: "SiMicrosoftazure",
  vercel: "SiVercel",
  netlify: "SiNetlify",
  heroku: "SiHeroku",
  digitalocean: "SiDigitalocean",
  nginx: "SiNginx",
  apache: "SiApache",
  terraform: "SiTerraform",
  ansible: "SiAnsible",
  jenkins: "SiJenkins",
  githubactions: "SiGithubactions",
  cicd: "SiGithubactions",
  "ci/cd": "SiGithubactions",

  // Tools
  git: "SiGit",
  github: "SiGithub",
  gitlab: "SiGitlab",
  bitbucket: "SiBitbucket",
  figma: "SiFigma",
  postman: "SiPostman",
  jira: "SiJira",
  slack: "SiSlack",
  vscode: "SiVisualstudiocode",
  linux: "SiLinux",
  ubuntu: "SiUbuntu",
  windows: "SiWindows",
  macos: "SiApple",

  // Mobile
  flutter: "SiFlutter",
  ionic: "SiIonic",
  expo: "SiExpo",
  android: "SiAndroid",
  ios: "SiApple",

  // Testing
  jest: "SiJest",
  cypress: "SiCypress",
  selenium: "SiSelenium",
  playwright: "SiPlaywright",
  mocha: "SiMocha",
  vitest: "SiVitest",

  // AI/ML
  tensorflow: "SiTensorflow",
  pytorch: "SiPytorch",
  opencv: "SiOpencv",
  pandas: "SiPandas",
  numpy: "SiNumpy",
  scikitlearn: "SiScikitlearn",

  // Others
  threejs: "SiThreedotjs",
  three: "SiThreedotjs",
  electron: "SiElectron",
  socketio: "SiSocketdotio",
  rabbitmq: "SiRabbitmq",
  kafka: "SiApachekafka",
  elasticsearch: "SiElasticsearch",
  solidity: "SiSolidity",
  web3: "SiWeb3dotjs",
  blockchain: "SiWeb3dotjs",
  wordpress: "SiWordpress",
  shopify: "SiShopify",
  stripe: "SiStripe",
};

// Generic concepts that don't have brand icons → use lucide icon name
const GENERIC_CONCEPTS = {
  oop: "Boxes",
  oops: "Boxes",
  objectorientedprogramming: "Boxes",
  objectoriented: "Boxes",
  dsa: "Binary",
  datastructures: "Binary",
  datastructuresandalgorithms: "Binary",
  algorithms: "Binary",
  api: "Plug",
  restapi: "Plug",
  rest: "Plug",
  microservices: "Network",
  designpatterns: "Puzzle",
  agile: "Kanban",
  scrum: "Kanban",
  machinelearning: "Brain",
  ml: "Brain",
  deeplearning: "Brain",
  ai: "Brain",
  artificialintelligence: "Brain",
  nlp: "MessageSquare",
  naturallanguageprocessing: "MessageSquare",
  datascience: "BarChart3",
  analytics: "BarChart3",
  devops: "Container",
  cloudcomputing: "Cloud",
  cloud: "Cloud",
  cybersecurity: "Shield",
  security: "Shield",
  testing: "TestTube2",
  unittesting: "TestTube2",
  problemsolving: "Lightbulb",
  competitiveprogramming: "Trophy",
  cp: "Trophy",
  softwareengineering: "Code2",
  webdevelopment: "Globe",
  frontenddevelopment: "Layout",
  backenddevelopment: "Server",
  fullstackdevelopment: "Layers",
  fullstack: "Layers",
  mobileappdevelopment: "Smartphone",
  mobiledevelopment: "Smartphone",
  embedded: "Cpu",
  embeddedsystems: "Cpu",
  operatingsystems: "Monitor",
  os: "Monitor",
  networking: "Network",
  computernetworks: "Network",
  database: "Database",
  databases: "Database",
  sql: "Database",
  systemdesign: "Settings2",
  softwaredevelopment: "Code2",
  versioncontrol: "GitBranch",
  responsive: "Tablet",
  responsivedesign: "Tablet",
  uiux: "Palette",
  ui: "Palette",
  ux: "Users",
  animation: "Sparkles",
};

/**
 * Given a skill name, returns { type: "si" | "lucide" | "fa", icon: "ComponentName" }
 * or null if no icon found.
 */
const getSkillIcon = (skillName) => {
  const key = normalize(skillName);

  if (TECH_ICON_MAP[key]) {
    const iconName = TECH_ICON_MAP[key];
    const type = iconName.startsWith("Fa") ? "fa" : "si";
    return { type, icon: iconName };
  }

  if (GENERIC_CONCEPTS[key]) {
    return { type: "lucide", icon: GENERIC_CONCEPTS[key] };
  }

  return null;
};

/**
 * Given an array of skill names, returns:
 * - siImports: Set of Si icon names to import
 * - faImports: Set of Fa icon names to import
 * - lucideImports: Set of lucide icon names to import
 * - iconMap: { skillName: { type, icon } }
 */
const resolveSkillIcons = (skills) => {
  const siImports = new Set();
  const faImports = new Set();
  const iconMap = {};

  for (const skill of skills) {
    const name = typeof skill === "string" ? skill : skill.name;
    const result = getSkillIcon(name);
    if (result) {
      if (result.type === "si") siImports.add(result.icon);
      else if (result.type === "fa") faImports.add(result.icon);
      else continue;

      iconMap[name] = result;
    }
  }

  return { siImports, faImports, iconMap };
};

module.exports = { getSkillIcon, resolveSkillIcons, normalize };
