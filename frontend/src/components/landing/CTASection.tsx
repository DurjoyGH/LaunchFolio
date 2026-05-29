"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function CTASection() {
  const router = useRouter();

  const handleGenerate = () => {
    const token = localStorage.getItem("token");
    router.push(token ? "/generate" : "/auth/register");
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className="rounded-3xl p-16 relative overflow-hidden border"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))",
            borderColor: "rgba(99,102,241,0.2)",
          }}
        >
          {/* Glow blobs */}
          <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full opacity-20 blur-3xl"
            style={{ background: "var(--color-brand-primary)" }} />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full opacity-15 blur-2xl"
            style={{ background: "var(--color-brand-secondary)" }} />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to launch your <span className="gradient-text">portfolio?</span>
            </h2>
            <p className="text-lg mb-10" style={{ color: "var(--color-text-secondary)" }}>
              Join developers who use LaunchFolio to build stunning portfolios — deployed live in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleGenerate}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate My Portfolio — Free
              </Button>
              <Link href="/auth/login">
                <Button variant="ghost" size="lg">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
