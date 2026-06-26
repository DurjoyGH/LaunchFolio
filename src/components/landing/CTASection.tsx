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
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className="mono-panel p-8 sm:p-16 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(0,0,0,0.78))",
          }}
        >
          <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:40px_40px]" />

          <div className="relative z-10">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to launch your <span className="gradient-text">portfolio?</span>
            </h2>
            <p className="text-base sm:text-lg mb-8 sm:mb-10" style={{ color: "var(--color-text-secondary)" }}>
              Join developers who use LaunchFolio to build stunning portfolios — deployed live in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleGenerate} className="gap-1.5">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="flex items-center gap-1">
                  <span className="whitespace-nowrap">Generate My Portfolio</span>
                  <span className="hidden sm:inline whitespace-nowrap">— Free</span>
                </span>
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
