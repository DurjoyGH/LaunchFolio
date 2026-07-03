"use client";

import { useState, useRef } from "react";
import Button from "@/components/ui/Button";
import type { FormData, Project } from "@/stores/generate.store";
import { useGenerateStore } from "@/stores/generate.store";
import { uploadApi } from "@/api/upload-api";

const EMPTY_PROJECT: Project = {
  title: "",
  description: "",
  techStack: [],
  liveUrl: "",
  githubUrl: "",
  image: "",
};

export default function ProjectsStep() {
  const { formData, update } = useGenerateStore();
  const [editing, setEditing] = useState<Project | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [techInput, setTechInput] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);

  const openNew = () => {
    setEditing({ ...EMPTY_PROJECT });
    setEditingIndex(null);
  };

  const openEdit = (i: number) => {
    setEditing({ ...formData.projects[i] });
    setEditingIndex(i);
  };

  const save = () => {
    if (!editing?.title) return;
    if (editingIndex !== null) {
      const updated = [...formData.projects];
      updated[editingIndex] = editing;
      update({ projects: updated });
    } else {
      update({ projects: [...formData.projects, editing] });
    }
    setEditing(null);
    setEditingIndex(null);
  };

  const remove = (i: number) => {
    update({ projects: formData.projects.filter((_, idx) => idx !== i) });
  };

  const addTech = () => {
    if (!techInput.trim() || !editing) return;
    setEditing({ ...editing, techStack: [...editing.techStack, techInput.trim()] });
    setTechInput("");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploadingImage(true);
    try {
      const data = await uploadApi.uploadFile(file, "project", "image");
      setEditing({ ...editing, image: data.data.url });
    } catch (err) {
      console.error("Project image upload failed:", err);
    }
    setUploadingImage(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Your Projects</h2>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Showcase your best work. Add 2–4 projects for the best result.
        </p>
      </div>

      {/* Project list */}
      <div className="space-y-3">
        {formData.projects.map((p, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-xl border" style={{ borderColor: "var(--color-border-subtle)", background: "var(--color-bg-card)" }}>
            <div className="flex items-center gap-3">
              {p.image && <img src={p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover" />}
              <div>
                <p className="font-medium text-white">{p.title}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                  {p.techStack.slice(0, 3).join(", ")}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(i)} className="text-xs px-3 py-1 rounded-lg border hover:border-white/20 transition-colors" style={{ borderColor: "var(--color-border-subtle)", color: "var(--color-text-secondary)" }}>Edit</button>
              <button onClick={() => remove(i)} className="text-xs px-3 py-1 rounded-lg text-white/70 border border-white/20 hover:bg-white/10 transition-colors">Remove</button>
            </div>
          </div>
        ))}
      </div>

      <Button variant="ghost" onClick={openNew} className="w-full">+ Add Project</Button>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="card w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white">{editingIndex !== null ? "Edit Project" : "Add Project"}</h3>

            {/* Project image upload */}
            <div
              className="w-full h-32 rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer hover:border-white/30 transition-colors overflow-hidden"
              style={{ borderColor: "var(--color-border-subtle)", background: "var(--color-bg-card)" }}
              onClick={() => imageRef.current?.click()}
            >
              {editing.image ? (
                <img src={editing.image} alt="Project" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <span className="text-2xl block mb-1">🖼️</span>
                  <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                    {uploadingImage ? "Uploading..." : "Click to upload project image"}
                  </span>
                </div>
              )}
            </div>
            <input ref={imageRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />

            <input className="input" placeholder="Project Title *" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            <textarea rows={3} className="input resize-none" placeholder="Description" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />

            <div className="flex gap-2">
              <input className="input flex-1" placeholder="Add tech (e.g. React)" value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())} />
              <Button variant="ghost" size="sm" onClick={addTech}>+ Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {editing.techStack.map((t, i) => (
                <span key={i} className="flex items-center gap-1 px-3 py-1 rounded-full text-xs border" style={{ borderColor: "var(--color-border-subtle)", color: "var(--color-text-secondary)" }}>
                  {t}
                  <button onClick={() => setEditing({ ...editing, techStack: editing.techStack.filter((_, j) => j !== i) })} className="hover:text-white">×</button>
                </span>
              ))}
            </div>

            <input className="input" placeholder="Live URL (optional)" value={editing.liveUrl} onChange={(e) => setEditing({ ...editing, liveUrl: e.target.value })} />
            <input className="input" placeholder="GitHub URL (optional)" value={editing.githubUrl} onChange={(e) => setEditing({ ...editing, githubUrl: e.target.value })} />

            <div className="flex gap-3 pt-2">
              <Button onClick={save} className="flex-1">Save Project</Button>
              <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
