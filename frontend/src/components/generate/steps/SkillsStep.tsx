"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import type { FormData, Skill } from "@/app/generate/page";

const SKILL_LEVELS = ["beginner", "intermediate", "advanced", "expert"];

interface Props {
  formData: FormData;
  update: (partial: Partial<FormData>) => void;
}

export default function SkillsStep({ formData, update }: Props) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("intermediate");

  const addSkill = () => {
    if (!name.trim()) return;
    update({ skills: [...formData.skills, { name: name.trim(), level }] });
    setName("");
  };

  const removeSkill = (i: number) => {
    update({ skills: formData.skills.filter((_, idx) => idx !== i) });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Your Skills</h2>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Add your technical and professional skills. Minimum 3 recommended.
        </p>
      </div>

      {/* Add skill */}
      <div className="flex gap-3 flex-wrap">
        <input
          className="input flex-1 min-w-48"
          placeholder="e.g. React, Python, Figma"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
        />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="input w-44"
        >
          {SKILL_LEVELS.map((l) => (
            <option key={l} value={l} style={{ background: "#111121" }}>
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </option>
          ))}
        </select>
        <Button onClick={addSkill} variant="ghost">+ Add</Button>
      </div>

      {/* Skills list */}
      {formData.skills.length === 0 ? (
        <div className="text-center py-8 rounded-xl border border-dashed" style={{ borderColor: "var(--color-border-subtle)" }}>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>No skills added yet. Add some above!</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {formData.skills.map((skill, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm group"
              style={{ borderColor: "rgba(99,102,241,0.3)", backgroundColor: "rgba(99,102,241,0.08)" }}
            >
              <span className="text-white font-medium">{skill.name}</span>
              <span style={{ color: "var(--color-text-muted)" }}>· {skill.level}</span>
              <button
                onClick={() => removeSkill(i)}
                className="text-gray-600 hover:text-red-400 transition-colors ml-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="p-4 rounded-xl border" style={{ borderColor: "rgba(6,182,212,0.2)", backgroundColor: "rgba(6,182,212,0.05)" }}>
        <p className="text-xs" style={{ color: "var(--color-brand-accent)" }}>
          💡 <strong>Tip:</strong> Add both technical skills (React, Node.js) and soft skills (Leadership, Communication) for a well-rounded profile.
        </p>
      </div>
    </div>
  );
}
