"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error("CONTACT_FAILED");
      toast.success("Thanks for your feedback. We'll review it soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-brand-accent)" }}>
          Contact
        </p>
        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">Send us your feedback</h2>
        <p className="text-base sm:text-lg" style={{ color: "var(--color-text-secondary)" }}>
          Share feedback or questions. Our team will review and respond soon.
        </p>
        <p className="text-sm mt-4" style={{ color: "var(--color-text-muted)" }}>
          For any suggestion or feedback, email us at {" "}
          <a href="mailto:durjoy.dev.ai@gmail.com" className="font-medium" style={{ color: "var(--color-brand-primary)" }}>
            durjoy.dev.ai@gmail.com
          </a>
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="card p-5 sm:p-8 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Full Name *"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              label="Email *"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <Input
            label="Subject"
            placeholder="Feedback or question"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
              Message *
            </label>
            <textarea
              rows={5}
              className="input resize-none"
              placeholder="Write your feedback or query..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" loading={loading}>
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
