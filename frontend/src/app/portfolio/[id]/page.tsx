"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

type PortfolioStatus = "queued" | "generating" | "building" | "deploying" | "deployed" | "failed";

const STATUS_CONFIG: Record<
  PortfolioStatus,
  { label: string; badge: "warning" | "info" | "success" | "error" | "default"; description: string }
> = {
  queued: { label: "Queued", badge: "default", description: "We are preparing your request..." },
  generating: { label: "Planning", badge: "info", description: "We are tailoring your portfolio content and layout..." },
  building: { label: "Building", badge: "info", description: "We are assembling your portfolio..." },
  deploying: { label: "Publishing", badge: "warning", description: "We are publishing your portfolio online..." },
  deployed: { label: "Live!", badge: "success", description: "Your portfolio is live and ready to share!" },
  failed: { label: "Failed", badge: "error", description: "Something went wrong during generation." },
};

const STEPS_ORDER: PortfolioStatus[] = ["queued", "generating", "building", "deploying", "deployed"];

export default function PortfolioStatusPage() {
  const { id } = useParams<{ id: string }>();
  const [status, setStatus] = useState<PortfolioStatus>("queued");
  const [deployUrl, setDeployUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!id) return;
    const poll = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/portfolio/${id}/status`,
          { headers: { Authorization: `Bearer ${token}` }, credentials: "include" }
        );
        const data = await res.json();
        if (data.success) {
          setStatus(data.data.status);
          setDeployUrl(data.data.deployUrl);
          setErrorMsg(data.data.error);
        }
      } catch {
        // keep polling
      } finally {
        setChecking(false);
      }
    };

    poll();
    const interval = setInterval(() => {
      if (status !== "deployed" && status !== "failed") poll();
    }, 8000);

    return () => clearInterval(interval);
  }, [id, status]);

  const config = STATUS_CONFIG[status] || STATUS_CONFIG.queued;
  const currentIdx = STEPS_ORDER.indexOf(status);
  const isDone = status === "deployed";
  const isFailed = status === "failed";

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12" style={{ background: "var(--color-bg-primary)" }}>
      <div className="absolute inset-0 opacity-20" style={{ background: "var(--gradient-hero)" }} />

      <div className="relative z-10 w-full max-w-xl">
        <div className="card p-10 text-center">
          {/* Animated icon */}
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl ${isDone ? "" : isFailed ? "" : "animate-pulse"}`}
            style={{
              background: isFailed ? "rgba(255,255,255,0.08)" : "linear-gradient(135deg, #ffffff, #bdbdbd)",
              color: "#000000",
              border: isFailed ? "1px solid rgba(255,255,255,0.3)" : "none",
            }}>
            {isDone ? "🚀" : isFailed ? "✕" : "✦"}
          </div>

          <Badge variant={config.badge} className="mb-4">{config.label}</Badge>
          <h1 className="text-2xl font-bold text-white mb-3">
            {isDone ? "Your portfolio is live!" : isFailed ? "Generation failed" : "Building your portfolio..."}
          </h1>
          <p className="leading-relaxed mb-8" style={{ color: "var(--color-text-secondary)" }}>
            {config.description}
          </p>

          {/* Progress steps */}
          {!isFailed && (
            <div className="flex items-center justify-between mb-8">
              {STEPS_ORDER.map((s, i) => {
                const done = i < currentIdx || isDone;
                const active = i === currentIdx && !isDone;
                return (
                  <div key={s} className="flex flex-col items-center gap-1 flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${done ? "step-done" : active ? "step-active" : "step-idle"}`}
                    >
                      {done ? "✓" : i + 1}
                    </div>
                    <span className="text-xs hidden sm:block capitalize" style={{ color: active ? "var(--color-text-primary)" : "var(--color-text-muted)" }}>
                      {STATUS_CONFIG[s].label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Actions */}
          {isDone && deployUrl && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl border text-sm font-mono break-all" style={{ borderColor: "rgba(255,255,255,0.3)", color: "#ffffff", background: "rgba(255,255,255,0.06)" }}>
                {deployUrl}
              </div>
              <a href={deployUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full">
                  Open Live Portfolio →
                </Button>
              </a>
              <Link href="/dashboard" className="block mt-4">
                <Button variant="ghost" className="w-full">Back to Dashboard</Button>
              </Link>
            </div>
          )}

          {isFailed && (
            <div className="space-y-3">
              {errorMsg && (
                <div className="p-3 rounded-xl text-sm text-white border border-white/20 bg-white/5">
                  {errorMsg}
                </div>
              )}
              <Link href="/generate">
                <Button className="w-full">Try Again</Button>
              </Link>
            </div>
          )}

          {!isDone && !isFailed && (
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              Checking status every 8 seconds • Usually completes in 2–5 minutes
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
