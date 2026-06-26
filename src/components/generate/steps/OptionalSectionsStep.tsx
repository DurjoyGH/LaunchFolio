"use client";

import type { FormData } from "@/stores/generate.store";
import { useGenerateStore } from "@/stores/generate.store";
import ServicesStep from "./ServicesStep";
import TestimonialsStep from "./TestimonialsStep";
import GalleryStep from "./GalleryStep";
import ProjectsStep from "./ProjectsStep";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface Props {
  formData: FormData;
  update: (data: Partial<FormData>) => void;
}

// ----- HOBBIES COMPONENT -----
function HobbiesSection({ formData, update }: Props) {
  const [adding, setAdding] = useState(false);
  const [current, setCurrent] = useState({ name: "", emoji: "", description: "" });

  const handleAdd = () => {
    if (!current.name.trim()) return;
    update({ hobbies: [...formData.hobbies, current] });
    setCurrent({ name: "", emoji: "", description: "" });
    setAdding(false);
  };

  const remove = (index: number) => {
    update({ hobbies: formData.hobbies.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white">Hobbies & Interests</h3>
      <div className="space-y-2">
        {formData.hobbies.map((h, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5 group">
            <div className="flex items-center gap-3">
              <span className="text-xl">{h.emoji}</span>
              <div>
                <p className="font-semibold text-white text-sm">{h.name}</p>
                {h.description && <p className="text-xs text-gray-400">{h.description}</p>}
              </div>
            </div>
            <button onClick={() => remove(i)} className="text-xs text-white/70 opacity-0 group-hover:opacity-100">Remove</button>
          </div>
        ))}
      </div>
      {adding ? (
        <div className="p-4 border border-white/10 rounded-lg space-y-3">
          <div className="flex gap-3">
            <div className="w-16">
              <Input label="Emoji" placeholder="🎸" value={current.emoji} onChange={(e) => setCurrent({ ...current, emoji: e.target.value })} />
            </div>
            <div className="flex-1">
              <Input label="Hobby Name *" placeholder="Playing Guitar" value={current.name} onChange={(e) => setCurrent({ ...current, name: e.target.value })} />
            </div>
          </div>
          <Input label="Brief Description (optional)" placeholder="I love playing acoustic fingerstyle..." value={current.description} onChange={(e) => setCurrent({ ...current, description: e.target.value })} />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setAdding(false)}>Cancel</Button>
            <Button size="sm" onClick={handleAdd}>Add Hobby</Button>
          </div>
        </div>
      ) : (
        <Button variant="ghost" className="w-full border-dashed" onClick={() => setAdding(true)}>+ Add Hobby</Button>
      )}
    </div>
  );
}

// ----- ACHIEVEMENTS COMPONENT -----
function AchievementsSection({ formData, update }: Props) {
  const [adding, setAdding] = useState(false);
  const [current, setCurrent] = useState({ title: "", year: "", description: "" });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAdd = () => {
    if (!current.title.trim()) return;
    if (editingIndex !== null) {
      const updated = [...formData.achievements];
      updated[editingIndex] = current;
      update({ achievements: updated });
      setEditingIndex(null);
    } else {
      update({ achievements: [...formData.achievements, current] });
    }
    setCurrent({ title: "", year: "", description: "" });
    setAdding(false);
  };

  const remove = (index: number) => {
    update({ achievements: formData.achievements.filter((_, i) => i !== index) });
  };

  const openEdit = (index: number) => {
    setCurrent(formData.achievements[index]);
    setEditingIndex(index);
    setAdding(true);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white">Achievements</h3>
      <div className="space-y-2">
        {formData.achievements.map((a, i) => (
          <div key={i} className="flex items-start justify-between p-3 rounded-lg border border-white/10 bg-white/5 group">
            <div>
              <p className="font-semibold text-white text-sm">{a.title} {a.year && <span className="text-xs text-white/70 ml-2">{a.year}</span>}</p>
              {a.description && <p className="text-xs text-gray-400 mt-1">{a.description}</p>}
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100">
              <button onClick={() => openEdit(i)} className="text-xs text-white/70 hover:text-white">Edit</button>
              <button onClick={() => remove(i)} className="text-xs text-white/70">Remove</button>
            </div>
          </div>
        ))}
      </div>
      {adding ? (
        <div className="p-4 border border-white/10 rounded-lg space-y-3">
          <Input label="Title/Award Name *" placeholder="Employee of the Year" value={current.title} onChange={(e) => setCurrent({ ...current, title: e.target.value })} />
          <Input label="Year (optional)" placeholder="2024" value={current.year} onChange={(e) => setCurrent({ ...current, year: e.target.value })} />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
              Description (optional)
            </label>
            <textarea
              rows={3}
              className="input resize-none"
              placeholder="Awarded for outstanding performance..."
              value={current.description}
              onChange={(e) => setCurrent({ ...current, description: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => { setAdding(false); setEditingIndex(null); setCurrent({ title: "", year: "", description: "" }); }}>Cancel</Button>
            <Button size="sm" onClick={handleAdd}>{editingIndex !== null ? "Save Changes" : "Add Achievement"}</Button>
          </div>
        </div>
      ) : (
        <Button variant="ghost" className="w-full border-dashed" onClick={() => setAdding(true)}>+ Add Achievement</Button>
      )}
    </div>
  );
}

// ----- SKILLS COMPONENT (inline in OptionalSectionsStep) -----
function SkillsInlineSection({ formData, update }: Props) {
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    const val = skillInput.trim();
    if (!val) return;
    if (formData.skills.some((s) => s.name.toLowerCase() === val.toLowerCase())) {
      setSkillInput("");
      return;
    }
    update({ skills: [...formData.skills, { name: val }] });
    setSkillInput("");
  };

  const removeSkill = (index: number) => {
    update({ skills: formData.skills.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white">Skills</h3>
      <p className="text-sm text-white/60">Add your core competencies and skills.</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {formData.skills.map((s, i) => (
          <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-white flex items-center gap-2">
            {s.name}
            <button onClick={() => removeSkill(i)} className="text-white/70 hover:text-white ml-1">✕</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Skill name (e.g. Graphic Design)"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
        />
        <Button onClick={addSkill}>Add</Button>
      </div>
    </div>
  );
}

// ----- MAIN STEP COMPONENT -----
export default function OptionalSectionsStep() {
  const { formData, update } = useGenerateStore();
  const selected = formData.selectedSections;

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Section Details</h2>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Fill in the details for the optional sections you selected.
        </p>
      </div>

      <div className="space-y-12 divide-y divide-white/10">
        {selected.includes("gallery") && (
          <div className="pt-8 first:pt-0"><GalleryStep /></div>
        )}
        {selected.includes("projects") && (
          <div className="pt-8 first:pt-0"><ProjectsStep /></div>
        )}
        {selected.includes("services") && (
          <div className="pt-8 first:pt-0"><ServicesStep /></div>
        )}
        {selected.includes("testimonials") && (
          <div className="pt-8 first:pt-0"><TestimonialsStep /></div>
        )}
        {selected.includes("hobbies") && (
          <div className="pt-8 first:pt-0"><HobbiesSection formData={formData} update={update} /></div>
        )}
        {selected.includes("achievements") && (
          <div className="pt-8 first:pt-0"><AchievementsSection formData={formData} update={update} /></div>
        )}
        {selected.includes("skills") && (
          <div className="pt-8 first:pt-0"><SkillsInlineSection formData={formData} update={update} /></div>
        )}
      </div>
    </div>
  );
}
