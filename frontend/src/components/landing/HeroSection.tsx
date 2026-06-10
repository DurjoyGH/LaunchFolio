"use client";

import Image from "next/image";
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
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:56px_56px]" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left: Logo + animated title */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Image
              src="/logo.png"
              alt="LaunchFolio"
              width={600}
              height={150}
              className="anim-fade-up w-auto h-24 md:h-32 object-contain"
              priority
            />
            <div className="mt-2 md:ml-4 anim-fade-up w-full flex justify-center md:justify-start" style={{ animationDelay: "0.2s" }}>
              <div className="relative inline-block">
                {/* Invisible text to prop open the exact width */}
                <strong className="text-white text-sm md:text-base invisible pointer-events-none">No code. No design skills. Minutes — not days.&nbsp;</strong>
                {/* Absolute text that animates from 0 to 100% width */}
                <strong className="absolute top-0 left-0 text-white text-sm md:text-base anim-typewriter block h-full overflow-hidden whitespace-nowrap">No code. No design skills. Minutes — not days.&nbsp;</strong>
              </div>
            </div>
          </div>

          {/* Right: Copy */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight anim-fade-up"
              style={{ animationDelay: "0.15s" }}>
              Build Your Portfolio
              <span className="gradient-text"> With AI</span>
            </h1>

            <p className="text-lg md:text-xl mb-8 leading-relaxed anim-fade-up"
              style={{ color: "var(--color-text-secondary)", animationDelay: "0.2s" }}>
              Fill in your details. Our AI crafts a stunning portfolio. You get a live URL.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start anim-fade-up"
              style={{ animationDelay: "0.3s" }}>
              <Button size="lg" onClick={handleGenerate} className="gap-1.5">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate My Portfolio
              </Button>
              <a href="#how-it-works">
                <Button variant="ghost" size="lg">See How It Works</Button>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-2 sm:gap-3 text-sm mt-8 anim-fade-up" style={{ color: "var(--color-text-muted)", animationDelay: "0.35s" }}>
              <span>✓ Free to start</span>
              <span className="hidden sm:inline">·</span>
              <span>✓ Deployed to Vercel</span>
              <span className="hidden sm:inline">·</span>
              <span>✓ Custom domain ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
