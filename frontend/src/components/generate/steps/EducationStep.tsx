"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import type { FormData, Education } from "@/app/generate/page";

const EMPTY_EDU: Education = {
  institution: "",
  degree: "",
  field: "",
  startYear: "",
  endYear: "",
  description: "",
};

interface Props {
  formData: FormData;
  update: (partial: Partial<FormData>) => void;
}

export default function EducationStep({ formData, update }: Props) {
  const [editing, setEditing] = useState<Education | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isCurrent, setIsCurrent] = useState(false);

  const openNew = () => {
    setEditing({ ...EMPTY_EDU });
    setEditingIndex(null);
    setIsCurrent(false);
  };

  const openEdit = (i: number) => {
    setEditing({ ...formData.education[i] });
    setEditingIndex(i);
    setIsCurrent(!formData.education[i].endYear);
  };

  const save = () => {
    if (!editing?.institution || !editing?.degree) return;
    const nextEditing = { ...editing, endYear: isCurrent ? "" : editing.endYear };
    if (editingIndex !== null) {
      const updated = [...formData.education];
      updated[editingIndex] = nextEditing;
      update({ education: updated });
    } else {
      update({ education: [...formData.education, nextEditing] });
    }
    setEditing(null);
    setEditingIndex(null);
    setIsCurrent(false);
  };

  const remove = (i: number) => {
    update({ education: formData.education.filter((_, idx) => idx !== i) });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Education</h2>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Add your academic background — degrees, certifications, courses.
        </p>
      </div>

      {/* Education list */}
      <div className="space-y-3">
        {formData.education.map((edu, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-xl border" style={{ borderColor: "var(--color-border-subtle)", background: "var(--color-bg-card)" }}>
            <div>
              <p className="font-medium text-white">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                {edu.institution} • {edu.startYear}{edu.endYear ? ` — ${edu.endYear}` : " — Present"}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(i)} className="text-xs px-3 py-1 rounded-lg border hover:border-white/20 transition-colors" style={{ borderColor: "var(--color-border-subtle)", color: "var(--color-text-secondary)" }}>Edit</button>
              <button onClick={() => remove(i)} className="text-xs px-3 py-1 rounded-lg text-white/70 border border-white/20 hover:bg-white/10 transition-colors">Remove</button>
            </div>
          </div>
        ))}
      </div>

      <Button variant="ghost" onClick={openNew} className="w-full">+ Add Education</Button>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="card w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white">{editingIndex !== null ? "Edit Education" : "Add Education"}</h3>

            <input className="input" placeholder="Institution *" value={editing.institution} onChange={(e) => setEditing({ ...editing, institution: e.target.value })} />
            <input className="input" placeholder="Degree * (e.g. B.Sc)" value={editing.degree} onChange={(e) => setEditing({ ...editing, degree: e.target.value })} />
            <input className="input" placeholder="Field of Study (e.g. Computer Science)" value={editing.field} onChange={(e) => setEditing({ ...editing, field: e.target.value })} />

            <div className="grid grid-cols-2 gap-4">
              <input className="input" placeholder="Start Year (e.g. 2020)" value={editing.startYear} onChange={(e) => setEditing({ ...editing, startYear: e.target.value })} />
              <input
                className="input"
                placeholder="End Year (or leave blank)"
                value={isCurrent ? "Present" : editing.endYear}
                onChange={(e) => setEditing({ ...editing, endYear: e.target.value })}
                disabled={isCurrent}
              />
            </div>

            <label className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
              <input
                type="checkbox"
                checked={isCurrent}
                onChange={(e) => setIsCurrent(e.target.checked)}
              />
              Currently running
            </label>

            <textarea rows={3} className="input resize-none" placeholder="Description (optional)" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />

            <div className="flex gap-3 pt-2">
              <Button onClick={save} className="flex-1">Save</Button>
              <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
