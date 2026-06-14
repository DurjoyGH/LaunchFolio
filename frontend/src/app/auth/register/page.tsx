"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function RegisterPage() {
  const router = useRouter();
  const { register, loading, error } = useAuthStore();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(form.name, form.email, form.password);
    if (success) {
      toast.success("Account created. Let's build your portfolio.");
      router.push("/generate");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-12" style={{ background: "var(--color-bg-primary)" }}>
      <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-hero)" }} />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-6">
          <Link href="/" className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
            &larr; Back to Home
          </Link>
        </div>
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="LaunchFolio" width={280} height={70} className="h-14 w-auto object-contain scale-[1.75]" />
          </Link>
        </div>

        <div className="card p-5 sm:p-8">
          <h1 className="text-2xl font-bold text-white mb-1 text-center">Create your account</h1>
          <p className="text-sm text-center mb-8" style={{ color: "var(--color-text-secondary)" }}>
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium" style={{ color: "var(--color-brand-primary)" }}>
              Sign in
            </Link>
          </p>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl text-sm text-white border border-white/20 bg-white/10">
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
              type={showPassword ? "text" : "password"}
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              minLength={6}
              required
              hint="At least 6 characters"
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-xs text-white/60 hover:text-white transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              }
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
