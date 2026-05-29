import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import type { FormData, Testimonial } from "@/app/generate/page";

interface Props {
  formData: FormData;
  update: (partial: Partial<FormData>) => void;
}

export default function TestimonialsStep({ formData, update }: Props) {
  const [adding, setAdding] = useState(false);
  const [current, setCurrent] = useState<Testimonial>({ name: "", role: "", text: "" });

  const handleAdd = () => {
    if (!current.name.trim() || !current.text.trim()) return;
    update({ testimonials: [...formData.testimonials, current] });
    setCurrent({ name: "", role: "", text: "" });
    setAdding(false);
  };

  const removeTestimonial = (index: number) => {
    update({ testimonials: formData.testimonials.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {formData.testimonials.map((t, i) => (
          <div key={i} className="p-4 rounded-xl border flex items-start justify-between gap-4 group" style={{ borderColor: "var(--color-border-subtle)", background: "var(--color-bg-card)" }}>
            <div>
              <h3 className="font-bold text-white">{t.name} <span className="text-sm font-normal text-gray-500">({t.role})</span></h3>
              <p className="text-sm mt-2 italic" style={{ color: "var(--color-text-secondary)" }}>"{t.text}"</p>
            </div>
            <button onClick={() => removeTestimonial(i)} className="text-red-400 hover:text-red-300 transition-colors opacity-0 group-hover:opacity-100">
              Remove
            </button>
          </div>
        ))}
      </div>

      {adding ? (
        <div className="p-4 rounded-xl border space-y-4" style={{ borderColor: "var(--color-border-subtle)" }}>
          <Input label="Client Name *" value={current.name} onChange={(e) => setCurrent({ ...current, name: e.target.value })} placeholder="e.g., Jane Doe" />
          <Input label="Role / Company (Optional)" value={current.role} onChange={(e) => setCurrent({ ...current, role: e.target.value })} placeholder="e.g., CEO at Startup" />
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Testimonial Text *</label>
            <textarea
              className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-white/30"
              rows={4}
              value={current.text}
              onChange={(e) => setCurrent({ ...current, text: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setAdding(false)}>Cancel</Button>
            <Button size="sm" onClick={handleAdd}>Add Testimonial</Button>
          </div>
        </div>
      ) : (
        <Button variant="ghost" className="w-full border-dashed" onClick={() => setAdding(true)}>
          + Add Testimonial
        </Button>
      )}
    </div>
  );
}
