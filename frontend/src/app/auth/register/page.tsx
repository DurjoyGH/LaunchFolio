"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Registration failed");
      if (data.data?.token) localStorage.setItem("token", data.data.token);
      router.push("/generate");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12"
        style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.08))" }}>
        <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-hero)" }} />
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5 mb-16">
            <Image src="/logo.png" alt="LaunchFolio" width={32} height={32} className="rounded-lg" />
            <span className="text-lg font-bold text-white">LaunchFolio</span>
          </Link>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Your portfolio,<br /><span className="gradient-text">live in minutes.</span>
          </h2>
          <p style={{ color: "var(--color-text-secondary)" }}>
            AI-powered. Component-based. Automatically deployed to Vercel.
          </p>
        </div>
        <div className="relative z-10 space-y-4">
          {["AI layout & content generation", "Automatic GitHub + Vercel deploy", "Custom themes & color palettes"].map((text) => (
            <div key={text} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                style={{ background: "var(--gradient-brand)" }}>✓</div>
              <span className="text-sm text-white">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12" style={{ background: "var(--color-bg-primary)" }}>
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <Image src="/logo.png" alt="LaunchFolio" width={28} height={28} className="rounded-md" />
            <span className="font-bold text-white">LaunchFolio</span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
          <p className="mb-8" style={{ color: "var(--color-text-secondary)" }}>
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium" style={{ color: "var(--color-brand-primary)" }}>
              Sign in
            </Link>
          </p>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl text-sm text-red-400 border border-red-500/20 bg-red-500/10">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Alex Johnson"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="alex@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              hint="At least 8 characters"
            />

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Create Account
            </Button>
          </form>

          <p className="text-xs text-center mt-6" style={{ color: "var(--color-text-muted)" }}>
            By signing up, you agree to our{" "}
            <a href="#" className="underline hover:text-white transition-colors">Terms</a> and{" "}
            <a href="#" className="underline hover:text-white transition-colors">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
