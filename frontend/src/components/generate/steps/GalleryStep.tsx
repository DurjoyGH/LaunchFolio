import { useState, useRef } from "react";
import type { FormData } from "@/app/generate/page";

interface Props {
  formData: FormData;
  update: (partial: Partial<FormData>) => void;
}

export default function GalleryStep({ formData, update }: Props) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

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
    const newGallery = [...formData.gallery];
    newGallery[index].caption = caption;
    update({ gallery: newGallery });
  };

  const removeImage = (index: number) => {
    update({ gallery: formData.gallery.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {formData.gallery.map((g, i) => (
          <div key={i} className="group relative rounded-xl overflow-hidden aspect-square border" style={{ borderColor: "var(--color-border-subtle)" }}>
            <img src={g.url} alt="Gallery item" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between">
              <button onClick={() => removeImage(i)} className="self-end text-red-400 hover:text-white bg-black/50 rounded-full w-6 h-6 flex items-center justify-center">
                ✕
              </button>
              <input
                type="text"
                value={g.caption}
                onChange={(e) => updateCaption(i, e.target.value)}
                placeholder="Add caption..."
                className="w-full text-xs bg-black/50 text-white border border-white/20 rounded px-2 py-1 outline-none focus:border-white/50"
              />
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
