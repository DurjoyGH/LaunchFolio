"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import PersonalInfoStep from "@/components/generate/steps/PersonalInfoStep";
import SkillsStep from "@/components/generate/steps/SkillsStep";
import ProjectsStep from "@/components/generate/steps/ProjectsStep";
import EducationStep from "@/components/generate/steps/EducationStep";
import DesignStep from "@/components/generate/steps/DesignStep";
import NonITDesignStep from "@/components/generate/steps/NonITDesignStep";
import SectionPickerStep from "@/components/generate/steps/SectionPickerStep";
import OptionalSectionsStep from "@/components/generate/steps/OptionalSectionsStep";
import ReviewStep from "@/components/generate/steps/ReviewStep";

export type Skill = { name: string; level: string };
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
  userType: "it" | "nonit" | "";
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

const INITIAL_FORM: FormData = {
  userType: "",
  name: "", title: "", bio: "", email: "", location: "", phone: "",
  profileImage: "", resumeUrl: "", customDomain: "",
  skills: [], education: [], projects: [],
  services: [], testimonials: [], gallery: [], hobbies: [], achievements: [],
  selectedSections: [],
  social: {},
  designPreferences: {
    theme: "dark", style: "creative", primaryColor: "#6366f1", fontPreference: "Inter",
    buttonColor: "", buttonTextColor: "", navBgColor: "", navLinkColor: "",
    textColor: "", heroAnimation: "fadeUp", logoStyle: "initial", palette: "",
  },
};

type StepDef = { id: number; label: string; icon: string; key: string };

function getSteps(userType: string, selectedSections: string[]): StepDef[] {
  if (userType === "it") {
    return [
      { id: 1, label: "Personal Info", icon: "◎", key: "personal" },
      { id: 2, label: "Skills", icon: "⬡", key: "skills" },
      { id: 3, label: "Education", icon: "◆", key: "education" },
      { id: 4, label: "Projects", icon: "◈", key: "projects" },
      { id: 5, label: "Design", icon: "✦", key: "design-it" },
      { id: 6, label: "Review", icon: "→", key: "review" },
    ];
  }
  // Non-IT flow
  const steps: StepDef[] = [
    { id: 1, label: "Personal Info", icon: "◎", key: "personal" },
    { id: 2, label: "Education", icon: "◆", key: "education" },
    { id: 3, label: "Design", icon: "✦", key: "design-nonit" },
    { id: 4, label: "Sections", icon: "◈", key: "section-picker" },
  ];
  if (selectedSections.length > 0) {
    steps.push({ id: 5, label: "Section Details", icon: "⬡", key: "optional-sections" });
    steps.push({ id: 6, label: "Review", icon: "→", key: "review" });
  } else {
    steps.push({ id: 5, label: "Review", icon: "→", key: "review" });
  }
  return steps;
}

export default function GeneratePage() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0 = user type selection
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [prefilled, setPrefilled] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolio/last-input`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success && data.data.input) {
          const prev = data.data.input;
          setFormData((f) => ({
            ...f,
            // Core info
            name: prev.name || f.name,
            title: prev.title || f.title,
            bio: prev.bio || f.bio,
            email: prev.email || f.email,
            phone: prev.phone || f.phone,
            location: prev.location || f.location,
            profileImage: prev.profileImage || f.profileImage,
            resumeUrl: prev.resumeUrl || f.resumeUrl,
            customDomain: prev.customDomain || f.customDomain,
            // IT sections
            skills: prev.skills?.length ? prev.skills : f.skills,
            education: prev.education?.length ? prev.education : f.education,
            projects: prev.projects?.length ? prev.projects : f.projects,
            // Non-IT sections
            services: prev.services?.length ? prev.services : f.services,
            testimonials: prev.testimonials?.length ? prev.testimonials : f.testimonials,
            gallery: prev.gallery?.length ? prev.gallery : f.gallery,
            hobbies: prev.hobbies?.length ? prev.hobbies : f.hobbies,
            achievements: prev.achievements?.length ? prev.achievements : f.achievements,
            selectedSections: prev.selectedSections?.length ? prev.selectedSections : f.selectedSections,
            // Social (dynamic keys)
            social: { ...f.social, ...prev.social },
            designPreferences: { ...f.designPreferences, ...prev.designPreferences },
          }));
          setPrefilled(true);
        }
      } catch { /* ignore */ }
    };
    load();
  }, []);

  const update = useCallback((partial: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...partial }));
  }, []);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) { router.push("/auth/login"); return; }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolio`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        const msg = data.errors?.length
          ? `${data.message}: ${data.errors.join(", ")}`
          : data.message || "Failed to start generation";
        throw new Error(msg);
      }
      router.push(`/portfolio/${data.data.portfolioId}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  const currentSteps = formData.userType ? getSteps(formData.userType, formData.selectedSections) : [];
  const totalSteps = currentSteps.length;
  const currentKey = currentSteps[step - 1]?.key || "";
  const stepProps = { formData, update };

  // ===== STEP 0: User Type Selection =====
  if (step === 0) {
    return (
      <div className="min-h-screen px-6 py-12 flex items-center justify-center" style={{ background: "var(--color-bg-primary)" }}>
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Create Your Portfolio</h1>
          <p className="text-lg mb-12" style={{ color: "var(--color-text-secondary)" }}>
            Tell us about yourself so we can tailor the experience.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <button
              onClick={() => { update({ userType: "it" }); setStep(1); }}
              className="group p-8 rounded-2xl border-2 text-left transition-all hover:border-indigo-500/60 hover:bg-indigo-500/5"
              style={{ borderColor: "var(--color-border-subtle)", background: "var(--color-bg-card)" }}
            >
              <span className="text-4xl mb-4 block">💻</span>
              <h3 className="text-xl font-bold text-white mb-2">IT / Software</h3>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                CSE, Software Engineering, Developer, Designer, or any tech-related field.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-0.5 rounded text-xs bg-indigo-500/10 text-indigo-400">Skills</span>
                <span className="px-2 py-0.5 rounded text-xs bg-indigo-500/10 text-indigo-400">Projects</span>
                <span className="px-2 py-0.5 rounded text-xs bg-indigo-500/10 text-indigo-400">GitHub</span>
              </div>
            </button>

            <button
              onClick={() => { update({ userType: "nonit" }); setStep(1); }}
              className="group p-8 rounded-2xl border-2 text-left transition-all hover:border-emerald-500/60 hover:bg-emerald-500/5"
              style={{ borderColor: "var(--color-border-subtle)", background: "var(--color-bg-card)" }}
            >
              <span className="text-4xl mb-4 block">🎨</span>
              <h3 className="text-xl font-bold text-white mb-2">Non-IT / General</h3>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                Student, Doctor, Teacher, Artist, Freelancer, Business — anyone.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-400">Simple</span>
                <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-400">Beautiful</span>
                <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-400">No Code</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== MAIN WIZARD =====
  return (
    <div className="min-h-screen px-6 py-12" style={{ background: "var(--color-bg-primary)" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Generate Your Portfolio</h1>
          <p style={{ color: "var(--color-text-secondary)" }}>Fill in your details — AI does the rest.</p>
          {prefilled && (
            <p className="text-xs mt-2 px-3 py-1 inline-block rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
              ✓ Pre-filled from your last portfolio
            </p>
          )}
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute top-5 left-0 right-0 h-px" style={{ background: "var(--color-border-subtle)" }} />
          {currentSteps.map((s) => (
            <div key={s.id} className="relative flex flex-col items-center gap-2">
              <button
                onClick={() => s.id < step && setStep(s.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all z-10 ${
                  s.id === step ? "step-active scale-110" : s.id < step ? "step-done" : "step-idle"
                }`}
              >
                {s.id < step ? "✓" : s.icon}
              </button>
              <span className="text-xs hidden sm:block whitespace-nowrap" style={{ color: s.id === step ? "var(--color-text-primary)" : "var(--color-text-muted)" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div className="card p-8">
          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl text-sm text-red-400 border border-red-500/20 bg-red-500/10">
              {error}
            </div>
          )}

          {currentKey === "personal" && <PersonalInfoStep {...stepProps} />}
          {currentKey === "skills" && <SkillsStep {...stepProps} />}
          {currentKey === "education" && <EducationStep {...stepProps} />}
          {currentKey === "projects" && <ProjectsStep {...stepProps} />}
          {currentKey === "design-it" && <DesignStep {...stepProps} />}
          {currentKey === "design-nonit" && <NonITDesignStep {...stepProps} />}
          {currentKey === "section-picker" && <SectionPickerStep {...stepProps} />}
          {currentKey === "optional-sections" && <OptionalSectionsStep {...stepProps} />}
          {currentKey === "review" && <ReviewStep formData={formData} />}

          <div className="flex justify-between mt-8 pt-6 border-t" style={{ borderColor: "var(--color-border-subtle)" }}>
            <Button variant="ghost" onClick={() => { if (step === 1) { setStep(0); update({ userType: "" }); } else setStep(step - 1); }}>
              ← Back
            </Button>
            {step < totalSteps ? (
              <Button onClick={() => setStep(step + 1)}>Continue →</Button>
            ) : (
              <Button onClick={handleSubmit} loading={submitting}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Portfolio
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
