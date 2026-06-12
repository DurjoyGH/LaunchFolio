"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import PersonalInfoStep from "@/components/generate/steps/PersonalInfoStep";
import EducationStep from "@/components/generate/steps/EducationStep";
import NonITDesignStep from "@/components/generate/steps/NonITDesignStep";
import SectionPickerStep from "@/components/generate/steps/SectionPickerStep";
import OptionalSectionsStep from "@/components/generate/steps/OptionalSectionsStep";
import ReviewStep from "@/components/generate/steps/ReviewStep";

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

const INITIAL_FORM: FormData = {
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

type StepDef = { id: number; label: string; icon: string; key: string };

function getSteps(selectedSections: string[]): StepDef[] {
  const steps: StepDef[] = [
    { id: 1, label: "Personal Info", icon: "◎", key: "personal" },
    { id: 2, label: "Education", icon: "🎓", key: "education" },
    { id: 3, label: "Design", icon: "✦", key: "design-nonit" },
    { id: 4, label: "Sections", icon: "◈", key: "section-picker" },
  ];
  if (selectedSections.length > 0) {
    steps.push({ id: 5, label: "Details", icon: "⬡", key: "optional-sections" });
    steps.push({ id: 6, label: "Review", icon: "→", key: "review" });
  } else {
    steps.push({ id: 5, label: "Review", icon: "→", key: "review" });
  }
  return steps;
}

export default function GeneratePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
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
            name: prev.name || f.name,
            title: prev.title || f.title,
            bio: prev.bio || f.bio,
            email: prev.email || f.email,
            phone: prev.phone || f.phone,
            location: prev.location || f.location,
            profileImage: prev.profileImage || f.profileImage,
            resumeUrl: prev.resumeUrl || f.resumeUrl,
            customDomain: prev.customDomain || f.customDomain,
            skills: prev.skills?.length ? prev.skills : f.skills,
            education: prev.education?.length ? prev.education : f.education,
            projects: prev.projects?.length ? prev.projects : f.projects,
            services: prev.services?.length ? prev.services : f.services,
            testimonials: prev.testimonials?.length ? prev.testimonials : f.testimonials,
            gallery: prev.gallery?.length ? prev.gallery : f.gallery,
            hobbies: prev.hobbies?.length ? prev.hobbies : f.hobbies,
            achievements: prev.achievements?.length ? prev.achievements : f.achievements,
            selectedSections: prev.selectedSections?.length ? prev.selectedSections : f.selectedSections,
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
      if (!data.success) throw new Error("GENERATION_FAILED");
      toast.success("Generation started. Your live link is on the way.");
      router.push(`/portfolio/${data.data.portfolioId}`);
    } catch {
      const message = "Failed to start generation. Please try again.";
      setError(message);
      toast.error(message);
      setSubmitting(false);
    }
  };

  const currentSteps = getSteps(formData.selectedSections);
  const totalSteps = currentSteps.length;
  const currentKey = currentSteps[step - 1]?.key || "";
  const stepProps = { formData, update };

  const hasSocialLink = Object.values(formData.social || {}).some((v) => (v || "").trim());

  const getStepError = () => {
    if (currentKey === "personal") {
      const missing = [
        { key: "name", label: "Full Name" },
        { key: "title", label: "Professional Title" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "location", label: "Location" },
        { key: "bio", label: "Bio" },
      ] as const;
      const emptyFields = missing.filter((f) => !String(formData[f.key] || "").trim());
      if (emptyFields.length > 0) return `Please fill: ${emptyFields.map((m) => m.label).join(", ")}.`;
    }

    if (currentKey === "education") {
      if (formData.education.length === 0) return "Please add at least one education entry.";
    }

    if (currentKey === "design-nonit") {
      if (!formData.designPreferences.palette) return "Please select a color palette.";
      if (!formData.designPreferences.fontPreference) return "Please select a font.";
      if (!hasSocialLink) return "Please add at least one social link.";
    }

    if (currentKey === "optional-sections") {
      if (formData.selectedSections.includes("gallery")) {
        const hasEmptyCaption = formData.gallery.some((g) => !(g.caption || "").trim());
        if (hasEmptyCaption) return "Please add a description for each gallery photo.";
      }
    }

    return "";
  };

  const stepError = getStepError();

  return (
    <div className="min-h-screen px-4 sm:px-6 py-10 sm:py-12" style={{ background: "var(--color-bg-primary)" }}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">← Back to Dashboard</Button>
          </Link>
        </div>
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">Generate Your Portfolio</h1>
          <p className="text-sm sm:text-base" style={{ color: "var(--color-text-secondary)" }}>Fill in your details — AI does the rest.</p>
          {prefilled && (
            <p className="text-xs mt-2 px-3 py-1 inline-block rounded-full bg-white/10 text-white border border-white/20">
              ✓ Pre-filled from your last portfolio
            </p>
          )}
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between mb-8 sm:mb-12 relative">
          <div className="absolute top-4 sm:top-5 left-0 right-0 h-px" style={{ background: "var(--color-border-subtle)" }} />
          {currentSteps.map((s) => (
            <div key={s.id} className="relative flex flex-col items-center gap-1 sm:gap-2">
              <button
                onClick={() => s.id < step && setStep(s.id)}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all z-10 ${
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

        <div className="card p-4 sm:p-8">
          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl text-sm text-white border border-white/20 bg-white/10">
              {error}
            </div>
          )}

          {currentKey === "personal" && <PersonalInfoStep {...stepProps} />}
          {currentKey === "education" && <EducationStep {...stepProps} />}
          {currentKey === "design-nonit" && <NonITDesignStep {...stepProps} />}
          {currentKey === "section-picker" && <SectionPickerStep {...stepProps} />}
          {currentKey === "optional-sections" && <OptionalSectionsStep {...stepProps} />}
          {currentKey === "review" && <ReviewStep formData={formData} />}

          <div className="flex justify-between gap-3 mt-8 pt-6 border-t" style={{ borderColor: "var(--color-border-subtle)" }}>
            <Button variant="ghost" size="sm" onClick={() => step > 1 && setStep(step - 1)} disabled={step === 1}>
              ← Back
            </Button>
            {step < totalSteps ? (
              <Button
                size="sm"
                onClick={() => {
                  if (stepError) {
                    setError(stepError);
                    toast.error(stepError);
                    return;
                  }
                  setError("");
                  setStep(step + 1);
                }}
                disabled={!!stepError}
              >
                Continue →
              </Button>
            ) : (
              <Button size="sm" onClick={handleSubmit} loading={submitting}>
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
