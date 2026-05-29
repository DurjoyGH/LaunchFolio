"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  const router = useRouter();

  const handleGenerate = () => {
    const token = localStorage.getItem("token");
    router.push(token ? "/generate" : "/auth/register");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background gradients */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-5 blur-3xl"
        style={{ background: "var(--gradient-brand)" }} />

      {/* Floating orbs */}
      <div className="absolute top-32 right-20 w-64 h-64 rounded-full opacity-10 blur-2xl anim-float"
        style={{ background: "var(--color-brand-primary)" }} />
      <div className="absolute bottom-32 left-20 w-48 h-48 rounded-full opacity-8 blur-2xl anim-float"
        style={{ background: "var(--color-brand-secondary)", animationDelay: "2s" }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 anim-fade-up"
          style={{ borderColor: "rgba(99,102,241,0.3)", backgroundColor: "rgba(99,102,241,0.08)" }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--color-brand-accent)" }} />
          <span className="text-sm font-medium" style={{ color: "var(--color-brand-accent)" }}>
            Powered by Smart AI
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight anim-fade-up"
          style={{ animationDelay: "0.1s" }}>
          Build Your Portfolio<br />
          <span className="gradient-text">With AI Magic</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed anim-fade-up"
          style={{ color: "var(--color-text-secondary)", animationDelay: "0.2s" }}>
          Fill in your details. Our AI crafts a stunning portfolio. You get a live URL.
          <br />
          <strong className="text-white">No code. No design skills. Minutes — not days.</strong>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center anim-fade-up"
          style={{ animationDelay: "0.3s" }}>
          <Button size="lg" onClick={handleGenerate}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Generate My Portfolio
          </Button>
          <a href="#how-it-works">
            <Button variant="ghost" size="lg">See How It Works</Button>
          </a>
        </div>

        {/* Social proof */}
        <p className="text-sm mt-10 anim-fade-up" style={{ color: "var(--color-text-muted)", animationDelay: "0.4s" }}>
          ✓ Free to start &nbsp;·&nbsp; ✓ Deployed to Vercel &nbsp;·&nbsp; ✓ Custom domain ready
        </p>

        {/* Preview mockup */}
        <div className="mt-16 relative anim-fade-up" style={{ animationDelay: "0.5s" }}>
          <div className="glass rounded-2xl border p-2 overflow-hidden" style={{ borderColor: "var(--color-border-subtle)" }}>
            <div className="rounded-xl overflow-hidden bg-gray-900 aspect-[16/9] flex items-center justify-center relative">
              {/* Mock browser chrome */}
              <div className="absolute top-0 left-0 right-0 h-8 flex items-center gap-1.5 px-3"
                style={{ background: "var(--color-bg-secondary)" }}>
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                <div className="flex-1 mx-4 h-4 rounded bg-white/5 flex items-center px-2">
                  <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                    your-name.vercel.app
                  </span>
                </div>
              </div>
              {/* Mock portfolio preview */}
              <div className="pt-8 w-full h-full flex flex-col items-center justify-center gap-3 p-8">
                <div className="w-16 h-16 rounded-full" style={{ background: "var(--gradient-brand)" }} />
                <div className="h-4 w-40 rounded" style={{ background: "var(--color-border-hover)" }} />
                <div className="h-3 w-64 rounded" style={{ background: "var(--color-border-subtle)" }} />
                <div className="flex gap-2 mt-2">
                  <div className="h-8 w-24 rounded-full" style={{ background: "var(--gradient-brand)" }} />
                  <div className="h-8 w-24 rounded-full border" style={{ borderColor: "var(--color-border-hover)" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
