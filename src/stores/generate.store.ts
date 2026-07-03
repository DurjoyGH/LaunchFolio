import { create } from "zustand";
import { portfolioApi } from "@/api/portfolio-api";

export type Skill = { name: string; level?: string };
export type Education = {
  institution: string; degree: string; field: string;
  startYear: string; endYear: string; description: string;
};
export type Project = {
  title: string; description: string; techStack: string[];
  liveUrl: string; githubUrl: string; image: string;
};
export type Service = { title: string; description: string; price: string };
export type Testimonial = { name: string; role: string; text: string };
export type GalleryItem = { url: string; caption: string };
export type Hobby = { name: string; emoji: string; description: string };
export type Achievement = { title: string; year: string; description: string };

export type FormData = {
  userType: "nonit";
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  phone: string;
  profileImage: string;
  resumeUrl: string;
  customDomain: string;
  skills: Skill[];
  education: Education[];
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  gallery: GalleryItem[];
  hobbies: Hobby[];
  achievements: Achievement[];
  selectedSections: string[];
  social: Record<string, string>;
  designPreferences: {
    theme: string; style: string; primaryColor: string; fontPreference: string;
    buttonColor: string; buttonTextColor: string;
    navBgColor: string; navLinkColor: string;
    textColor: string; heroAnimation: string; logoStyle: string;
    palette: string;
  };
};

export const INITIAL_FORM: FormData = {
  userType: "nonit",
  name: "", title: "", bio: "", email: "", location: "", phone: "",
  profileImage: "", resumeUrl: "", customDomain: "",
  skills: [], education: [], projects: [],
  services: [], testimonials: [], gallery: [], hobbies: [], achievements: [],
  selectedSections: [],
  social: {},
  designPreferences: {
    theme: "dark", style: "creative", primaryColor: "#ffffff", fontPreference: "Black Ops One",
    buttonColor: "", buttonTextColor: "", navBgColor: "", navLinkColor: "",
    textColor: "", heroAnimation: "fadeUp", logoStyle: "initial", palette: "",
  },
};

type GenerateState = {
  step: number;
  formData: FormData;
  submitting: boolean;
  prefilled: boolean;
  
  setStep: (step: number) => void;
  update: (partial: Partial<FormData>) => void;
  loadLastInput: () => Promise<void>;
  generatePortfolio: () => Promise<string | null>;
};

export const useGenerateStore = create<GenerateState>((set, get) => ({
  step: 1,
  formData: INITIAL_FORM,
  submitting: false,
  prefilled: false,

  setStep: (step) => set({ step }),
  
  update: (partial) => set((state) => ({ 
    formData: { ...state.formData, ...partial } 
  })),

  loadLastInput: async () => {
    try {
      const res = await portfolioApi.getLastInput();
      const input = res?.data?.input;
      if (input) {
        set((state) => {
          const f = state.formData;
          return {
            formData: {
              ...f,
              name: input.name || f.name,
              title: input.title || f.title,
              bio: input.bio || f.bio,
              email: input.email || f.email,
              phone: input.phone || f.phone,
              location: input.location || f.location,
              profileImage: input.profileImage || f.profileImage,
              resumeUrl: input.resumeUrl || f.resumeUrl,
              customDomain: input.customDomain || f.customDomain,
              skills: input.skills?.length ? input.skills : f.skills,
              education: input.education?.length ? input.education : f.education,
              projects: input.projects?.length ? input.projects : f.projects,
              services: input.services?.length ? input.services : f.services,
              testimonials: input.testimonials?.length ? input.testimonials : f.testimonials,
              gallery: input.gallery?.length ? input.gallery : f.gallery,
              hobbies: input.hobbies?.length ? input.hobbies : f.hobbies,
              achievements: input.achievements?.length ? input.achievements : f.achievements,
              selectedSections: input.selectedSections?.length ? input.selectedSections : f.selectedSections,
              social: { ...f.social, ...input.social },
              designPreferences: { ...f.designPreferences, ...input.designPreferences },
            },
            prefilled: true,
          };
        });
      }
    } catch {
      // ignore errors
    }
  },

  generatePortfolio: async () => {
    set({ submitting: true });
    try {
      const { formData } = get();
      const data = await portfolioApi.generate(formData);
      set({ submitting: false });
      const payload = data.data || data;
      return payload?.portfolioId || null;
    } catch (err) {
      set({ submitting: false });
      throw err;
    }
  }
}));
