"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

type Status = "queued" | "generating" | "building" | "deploying" | "deployed" | "failed";

interface Portfolio {
  _id: string;
  status: Status;
  input: { name: string; title: string };
  deployment: { deployUrl?: string };
  createdAt: string;
}

const statusVariant: Record<Status, "default" | "info" | "warning" | "success" | "error"> = {
  queued: "default",
  generating: "info",
  building: "info",
  deploying: "warning",
  deployed: "success",
  failed: "error",
};

export default function DashboardPage() {
  const router = useRouter();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/auth/login"); return; }

    const fetchData = async () => {
      try {
        const [meRes, portRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, { headers: { Authorization: `Bearer ${token}` }, credentials: "include" }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolio`, { headers: { Authorization: `Bearer ${token}` }, credentials: "include" }),
        ]);
        const meData = await meRes.json();
        const portData = await portRes.json();
        if (meData.success) setUserName(meData.data.user.name);
        if (portData.success) setPortfolios(portData.data.portfolios);
      } catch { /* handled */ } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, { method: "POST", credentials: "include" });
    router.push("/");
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg-primary)" }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: "var(--color-border-subtle)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="LaunchFolio" width={28} height={28} className="rounded-md" />
            <span className="font-bold text-white">LaunchFolio</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm hidden sm:block" style={{ color: "var(--color-text-secondary)" }}>
              {userName && `Hello, ${userName.split(" ")[0]} 👋`}
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>Sign Out</Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">My Portfolios</h1>
            <p style={{ color: "var(--color-text-secondary)" }}>All your AI-generated portfolios in one place.</p>
          </div>
          <Link href="/generate">
            <Button>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Portfolio
            </Button>
          </Link>
        </div>

        {/* Portfolio grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-6 animate-pulse">
                <div className="h-5 w-32 rounded mb-2" style={{ background: "var(--color-border-subtle)" }} />
                <div className="h-4 w-20 rounded mb-6" style={{ background: "var(--color-border-subtle)" }} />
                <div className="h-8 w-full rounded" style={{ background: "var(--color-border-subtle)" }} />
              </div>
            ))}
          </div>
        ) : portfolios.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-6"
              style={{ background: "var(--gradient-brand)" }}>✦</div>
            <h2 className="text-xl font-bold text-white mb-2">No portfolios yet</h2>
            <p className="mb-6" style={{ color: "var(--color-text-secondary)" }}>
              Generate your first AI-powered portfolio in minutes.
            </p>
            <Link href="/generate">
              <Button size="lg">Generate My First Portfolio</Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((p) => (
              <div key={p._id} className="card p-6 hover:-translate-y-1 group relative">
                <Link href={`/portfolio/${p._id}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                        {p.input.name}
                      </h3>
                      <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>{p.input.title}</p>
                    </div>
                    <Badge variant={statusVariant[p.status]} dot>{p.status}</Badge>
                  </div>

                  {p.status === "deployed" && p.deployment?.deployUrl && (
                    <p className="text-xs font-mono truncate mb-4" style={{ color: "var(--color-brand-primary)" }}>
                      {p.deployment.deployUrl}
                    </p>
                  )}

                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                    {new Date(p.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </Link>

                {/* Delete button */}
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    if (!confirm("Delete this portfolio? This cannot be undone.")) return;
                    try {
                      const token = localStorage.getItem("token");
                      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolio/${p._id}`, {
                        method: "DELETE",
                        headers: { Authorization: `Bearer ${token}` },
                      });
                      setPortfolios((prev) => prev.filter((x) => x._id !== p._id));
                    } catch { /* ignore */ }
                  }}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-1 rounded-lg text-red-400 hover:bg-red-500/10 border border-red-500/20"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
