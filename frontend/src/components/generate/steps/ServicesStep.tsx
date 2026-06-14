import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import type { FormData, Service } from "@/stores/generate.store";
import { useGenerateStore } from "@/stores/generate.store";

export default function ServicesStep() {
  const { formData, update } = useGenerateStore();
  const [adding, setAdding] = useState(false);
  const [current, setCurrent] = useState<Service>({ title: "", description: "", price: "" });

  const handleAdd = () => {
    if (!current.title.trim()) return;
    update({ services: [...formData.services, current] });
    setCurrent({ title: "", description: "", price: "" });
    setAdding(false);
  };

  const removeService = (index: number) => {
    update({ services: formData.services.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {formData.services.map((s, i) => (
          <div key={i} className="p-4 rounded-xl border flex items-start justify-between gap-4 group" style={{ borderColor: "var(--color-border-subtle)", background: "var(--color-bg-card)" }}>
            <div>
              <h3 className="font-bold text-white">{s.title}</h3>
              <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>{s.description}</p>
              {s.price && <p className="text-xs font-mono mt-2" style={{ color: "var(--color-text-primary)" }}>{s.price}</p>}
            </div>
            <button onClick={() => removeService(i)} className="text-white/70 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
              Remove
            </button>
          </div>
        ))}
      </div>

      {adding ? (
        <div className="p-4 rounded-xl border space-y-4" style={{ borderColor: "var(--color-border-subtle)" }}>
          <Input label="Service Title *" value={current.title} onChange={(e) => setCurrent({ ...current, title: e.target.value })} placeholder="e.g., Portrait Photography" />
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">Description</label>
            <textarea
              className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-white/30"
              rows={3}
              value={current.description}
              onChange={(e) => setCurrent({ ...current, description: e.target.value })}
            />
          </div>
          <Input label="Pricing (Optional)" value={current.price} onChange={(e) => setCurrent({ ...current, price: e.target.value })} placeholder="e.g., Starting at $500" />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setAdding(false)}>Cancel</Button>
            <Button size="sm" onClick={handleAdd}>Add Service</Button>
          </div>
        </div>
      ) : (
        <Button variant="ghost" className="w-full border-dashed" onClick={() => setAdding(true)}>
          + Add Service
        </Button>
      )}
    </div>
  );
}
