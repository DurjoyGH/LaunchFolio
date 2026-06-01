import { useState, useRef } from "react";
import Input from "@/components/ui/Input";
import type { FormData } from "@/app/generate/page";

interface Props {
  formData: FormData;
  update: (partial: Partial<FormData>) => void;
}

export default function GalleryStep({ formData, update }: Props) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [draftCaptions, setDraftCaptions] = useState<Record<number, string>>({});
  const [savedIndex, setSavedIndex] = useState<number | null>(null);

  const uploadFile = async (file: File) => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const fd = new window.FormData();
    fd.append("image", file);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/profile`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Upload failed");
    return data.data.url;
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const url = await uploadFile(files[i]);
        if (url) {
          update({ gallery: [...formData.gallery, { url, caption: "" }] });
        }
      }
    } catch (err) {
      console.error("Gallery upload failed:", err);
    }
    setUploading(false);
  };

  const updateCaption = (index: number, caption: string) => {
    setDraftCaptions((prev) => ({ ...prev, [index]: caption }));
  };

  const saveCaption = (index: number) => {
    const newGallery = [...formData.gallery];
    const nextCaption = (draftCaptions[index] ?? newGallery[index].caption).trim();
    newGallery[index].caption = nextCaption;
    update({ gallery: newGallery });
    setDraftCaptions((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
    setSavedIndex(index);
    window.setTimeout(() => {
      setSavedIndex((current) => (current === index ? null : current));
    }, 1200);
  };

  const removeImage = (index: number) => {
    update({ gallery: formData.gallery.filter((_, i) => i !== index) });
    setDraftCaptions((prev) => {
      const next: Record<number, string> = {};
      Object.keys(prev).forEach((key) => {
        const idx = Number(key);
        if (idx < index) next[idx] = prev[idx];
        if (idx > index) next[idx - 1] = prev[idx];
      });
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white">Gallery</h3>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Add a short description for each photo.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {formData.gallery.map((g, i) => (
          <div key={i} className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--color-border-subtle)", background: "var(--color-bg-card)" }}>
            <div className="relative aspect-square">
              <img src={g.url} alt="Gallery item" className="w-full h-full object-cover" />
              <button
                onClick={() => removeImage(i)}
                className="absolute top-2 right-2 text-red-400 hover:text-white bg-black/60 rounded-full w-7 h-7 flex items-center justify-center"
                aria-label="Remove image"
              >
                ✕
              </button>
            </div>
            <div className="p-3 space-y-2">
              <Input
                label="Description"
                placeholder="Short description"
                value={draftCaptions[i] ?? g.caption}
                onChange={(e) => updateCaption(i, e.target.value)}
              />
              <div className="flex justify-end">
                {savedIndex === i ? (
                  <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Saved</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => saveCaption(i)}
                    className="text-xs px-3 py-1 rounded-full border transition-colors"
                    style={{ borderColor: "var(--color-border-subtle)", color: "var(--color-text-secondary)" }}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        <div
          onClick={() => !uploading && fileRef.current?.click()}
          className={`rounded-xl aspect-square border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${
            uploading ? "opacity-50" : "hover:border-white/30"
          }`}
          style={{ borderColor: "var(--color-border-subtle)", background: "var(--color-bg-card)" }}
        >
          <span className="text-2xl mb-2" style={{ color: "var(--color-text-muted)" }}>+</span>
          <span className="text-xs text-center px-2" style={{ color: "var(--color-text-secondary)" }}>
            {uploading ? "Uploading..." : "Add Images"}
          </span>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleUpload}
          />
        </div>
      </div>
    </div>
  );
}
