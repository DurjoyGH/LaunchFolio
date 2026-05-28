"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import PersonalInfoStep from "@/components/generate/steps/PersonalInfoStep";
import SkillsStep from "@/components/generate/steps/SkillsStep";
import ProjectsStep from "@/components/generate/steps/ProjectsStep";
import DesignStep from "@/components/generate/steps/DesignStep";
import ReviewStep from "@/components/generate/steps/ReviewStep";

const STEPS = [
  { id: 1, label: "Personal Info", icon: "◎" },
  { id: 2, label: "Skills", icon: "⬡" },
  { id: 3, label: "Projects", icon: "◈" },
  { id: 4, label: "Design", icon: "✦" },
  { id: 5, label: "Review", icon: "→" },
];

export type Skill = { name: string; level: string };
export type Project = {
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
};

export type FormData = {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  phone: string;
  profileImage: string;
  skills: Skill[];
  projects: Project[];
  social: { github: string; linkedin: string; twitter: string; website: string };
  designPreferences: { theme: string; style: string; primaryColor: string; fontPreference: string };
};

const INITIAL_FORM: FormData = {
  name: "",
  title: "",
  bio: "",
  email: "",
  location: "",
  phone: "",
  profileImage: "",
  skills: [],
  projects: [],
  social: { github: "", linkedin: "", twitter: "", website: "" },
  designPreferences: { theme: "dark", style: "modern", primaryColor: "#6366f1", fontPreference: "Inter" },
};

export default function GeneratePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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
      if (!data.success) throw new Error(data.message || "Failed to start generation");
      router.push(`/portfolio/${data.data.portfolioId}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  const stepProps = { formData, update };

  return (
    <div className="min-h-screen px-6 py-12" style={{ background: "var(--color-bg-primary)" }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Generate Your Portfolio</h1>
          <p style={{ color: "var(--color-text-secondary)" }}>Fill in your details — AI does the rest.</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute top-5 left-0 right-0 h-px" style={{ background: "var(--color-border-subtle)" }} />
          {STEPS.map((s) => (
            <div key={s.id} className="relative flex flex-col items-center gap-2">
              <button
                onClick={() => s.id < step && setStep(s.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all z-10 ${
                  s.id === step ? "step-active scale-110" : s.id < step ? "step-done" : "step-idle"
                }`}
              >
                {s.id < step ? "✓" : s.icon}
              </button>
              <span className="text-xs hidden sm:block" style={{ color: s.id === step ? "var(--color-text-primary)" : "var(--color-text-muted)" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Form content */}
        <div className="card p-8">
          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl text-sm text-red-400 border border-red-500/20 bg-red-500/10">
              {error}
            </div>
          )}
          {step === 1 && <PersonalInfoStep {...stepProps} />}
          {step === 2 && <SkillsStep {...stepProps} />}
          {step === 3 && <ProjectsStep {...stepProps} />}
          {step === 4 && <DesignStep {...stepProps} />}
          {step === 5 && <ReviewStep formData={formData} />}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t" style={{ borderColor: "var(--color-border-subtle)" }}>
            <Button variant="ghost" onClick={() => step > 1 && setStep(step - 1)} disabled={step === 1}>
              ← Back
            </Button>
            {step < 5 ? (
              <Button onClick={() => setStep(step + 1)}>
                Continue →
              </Button>
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
