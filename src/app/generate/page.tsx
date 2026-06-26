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

export type { Skill, Education, Project, Service, Testimonial, GalleryItem, Hobby, Achievement, FormData } from "@/stores/generate.store";
import { useGenerateStore } from "@/stores/generate.store";

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
  const { step, setStep, formData, update, submitting, prefilled, loadLastInput, generatePortfolio } = useGenerateStore();
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadLastInput();
  }, [loadLastInput]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-10 sm:py-12" style={{ background: "var(--color-bg-primary)" }}>
        <div className="w-8 h-8 rounded-full border-4 border-white/20 border-t-white animate-spin"></div>
      </div>
    );
  }

  const handleSubmit = async () => {
    setError("");
    try {
      const portfolioId = await generatePortfolio();
      if (!portfolioId) throw new Error("GENERATION_FAILED");
      
      toast.success("Generation started. Your live link is on the way.");
      router.push(`/portfolio/${portfolioId}`);
    } catch (err: any) {
      const message = "Failed to start generation. Please try again.";
      setError(message);
      toast.error(message);
    }
  };

  const currentSteps = getSteps(formData.selectedSections);
  const totalSteps = currentSteps.length;
  const currentKey = currentSteps[step - 1]?.key || "";

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

          {currentKey === "personal" && <PersonalInfoStep />}
          {currentKey === "education" && <EducationStep />}
          {currentKey === "design-nonit" && <NonITDesignStep />}
          {currentKey === "section-picker" && <SectionPickerStep />}
          {currentKey === "optional-sections" && <OptionalSectionsStep />}
          {currentKey === "review" && <ReviewStep />}

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
