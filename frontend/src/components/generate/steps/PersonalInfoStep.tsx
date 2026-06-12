"use client";

import { useState, useRef } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import type { FormData } from "@/app/generate/page";

interface Props {
  formData: FormData;
  update: (partial: Partial<FormData>) => void;
}

export default function PersonalInfoStep({ formData, update }: Props) {
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const photoRef = useRef<HTMLInputElement>(null);
  const resumeRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File, endpoint: string, fieldName: string) => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const fd = new window.FormData();
    fd.append(fieldName, file);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/${endpoint}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Upload failed");
    return data.data.url;
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhoto(true);
    try {
      const url = await uploadFile(file, "profile", "image");
      if (url) update({ profileImage: url });
    } catch (err) {
      console.error("Photo upload failed:", err);
    }
    setUploadingPhoto(false);
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingResume(true);
    try {
      const url = await uploadFile(file, "resume", "file");
      if (url) update({ resumeUrl: url });
    } catch (err) {
      console.error("Resume upload failed:", err);
    }
    setUploadingResume(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Personal Information</h2>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          This is the core info that will appear on your portfolio.
        </p>
      </div>

      {/* Profile Photo Upload */}
      <div className="flex items-center gap-4">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden border-2 border-dashed cursor-pointer hover:border-white/30 transition-colors"
          style={{ borderColor: "var(--color-border-subtle)", background: "var(--color-bg-card)" }}
          onClick={() => photoRef.current?.click()}
        >
          {formData.profileImage ? (
            <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl" style={{ color: "var(--color-text-muted)" }}>📷</span>
          )}
        </div>
        <div>
          <button
            onClick={() => photoRef.current?.click()}
            className="text-sm font-medium text-white hover:underline"
            disabled={uploadingPhoto}
          >
            {uploadingPhoto ? "Uploading..." : formData.profileImage ? "Change Photo" : "Upload Photo"}
          </button>
          <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>JPG, PNG — max 5MB</p>
        </div>
        <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name *"
          placeholder="Alex Johnson"
          value={formData.name}
          onChange={(e) => update({ name: e.target.value })}
          required
        />
        <Input
          label="Professional Title *"
          placeholder="Full Stack Developer"
          value={formData.title}
          onChange={(e) => update({ title: e.target.value })}
          required
        />
        <Input
          label="Email *"
          type="email"
          placeholder="alex@example.com"
          value={formData.email}
          onChange={(e) => update({ email: e.target.value })}
          required
        />
        <Input
          label="Phone *"
          type="tel"
          placeholder="+880 1234 567890"
          value={formData.phone}
          onChange={(e) => update({ phone: e.target.value })}
          required
        />
        <Input
          label="Location *"
          placeholder="Dhaka, Bangladesh"
          value={formData.location}
          onChange={(e) => update({ location: e.target.value })}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>Bio *</label>
        <textarea
          rows={4}
          placeholder="Write a short bio..."
          value={formData.bio}
          onChange={(e) => update({ bio: e.target.value })}
          className="input resize-none"
          required
        />
      </div>

      {/* Resume Upload */}
      <div className="flex items-center gap-4 p-4 rounded-xl border" style={{ borderColor: "var(--color-border-subtle)", background: "var(--color-bg-card)" }}>
        <span className="text-2xl">📄</span>
        <div className="flex-1">
          <p className="text-sm font-medium text-white">Resume / CV</p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            {formData.resumeUrl ? "Resume uploaded ✓" : "Upload PDF — visitors can download it"}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => resumeRef.current?.click()} loading={uploadingResume}>
          {formData.resumeUrl ? "Replace" : "Upload"}
        </Button>
        <input ref={resumeRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleResumeUpload} />
      </div>
    </div>
  );
}
