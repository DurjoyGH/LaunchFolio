export type PortfolioSectionType =
  | "navbar"
  | "hero"
  | "about"
  | "skills"
  | "education"
  | "projects"
  | "gallery"
  | "services"
  | "testimonials"
  | "hobbies"
  | "achievements"
  | "contact"
  | "footer";

export type PortfolioSection = {
  type: PortfolioSectionType;
  variant?: string;
};

export type PortfolioBlueprint = {
  theme?: "dark" | "light";
  font?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  personality?: string;
  designTokens?: {
    spacing?: "compact" | "comfortable" | "spacious";
    radius?: "none" | "sm" | "md" | "lg" | "full";
    shadow?: "none" | "soft" | "medium" | "dramatic";
    animation?: "none" | "subtle" | "smooth" | "energetic";
  };
  sections?: PortfolioSection[];
  content?: Record<string, unknown>;
};

export type Skill = { name?: string; level?: string };
export type Education = {
  institution?: string;
  degree?: string;
  field?: string;
  startYear?: string;
  endYear?: string;
  description?: string;
};
export type Project = {
  title?: string;
  description?: string;
  techStack?: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
};
export type Service = { title?: string; description?: string; price?: string };
export type Testimonial = { name?: string; role?: string; text?: string };
export type GalleryItem = { url?: string; caption?: string };
export type Hobby = { name?: string; emoji?: string; description?: string };
export type Achievement = { title?: string; year?: string; description?: string };

export type PortfolioInput = {
  name?: string;
  title?: string;
  bio?: string;
  email?: string;
  location?: string;
  phone?: string;
  profileImage?: string;
  resumeUrl?: string;
  skills?: Skill[];
  education?: Education[];
  projects?: Project[];
  services?: Service[];
  testimonials?: Testimonial[];
  gallery?: GalleryItem[];
  hobbies?: Hobby[];
  achievements?: Achievement[];
  social?: Record<string, string>;
  designPreferences?: Record<string, string>;
};

export type PortfolioTemplateData = {
  input: PortfolioInput;
  blueprint: PortfolioBlueprint;
  content?: Record<string, unknown>;
};

export type SectionProps = PortfolioTemplateData & {
  section?: PortfolioSection;
};
