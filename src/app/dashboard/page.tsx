"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

import { useAuthStore } from "@/stores/auth.store";
import { usePortfolioStore, Portfolio, Status } from "@/stores/portfolio.store";

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
  const { user, fetchUser, logout } = useAuthStore();
  const { portfolios, loading, fetchPortfolios, deletePortfolio } = usePortfolioStore();
  const [deleteTarget, setDeleteTarget] = useState<Portfolio | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await fetchUser();
        await fetchPortfolios();
      } finally {
        setIsInitializing(false);
      }
    };
    initAuth();
  }, [fetchUser, fetchPortfolios]);

  useEffect(() => {
    if (!isInitializing && !user) {
      router.push("/auth/login");
    }
  }, [isInitializing, user, router]);

  // If we are still initializing, or if we don't have a user (meaning we are about to redirect),
  // we can just render nothing or a full screen loader.
  if (isInitializing || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--color-bg-primary)" }}>
        <div className="w-8 h-8 rounded-full border-4 border-white/20 border-t-white animate-spin"></div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const success = await deletePortfolio(deleteTarget._id);
    if (success) {
      toast.success("Portfolio deleted.");
    } else {
      toast.error("Failed to delete. Please try again.");
    }
    setDeleting(false);
    setDeleteTarget(null);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg-primary)" }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: "var(--color-border-subtle)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <Image src="/logo.png" alt="LaunchFolio" width={400} height={100} className="h-14 w-auto object-contain scale-125 origin-left -translate-y-1.4" priority />
          </Link>
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-end">
            <span className="text-sm hidden sm:block" style={{ color: "var(--color-text-secondary)" }}>
              {user?.name && `Hello, ${user.name.split(" ")[0]} 👋`}
            </span>
              <Link href="/">
                <Button variant="ghost" size="sm">Home</Button>
              </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout}>Sign Out</Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">My Portfolios</h1>
            <p className="text-sm sm:text-base" style={{ color: "var(--color-text-secondary)" }}>All your AI-generated portfolios in one place.</p>
          </div>
          <Link href="/generate" className="flex-shrink-0">
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
                      <h3 className="font-semibold text-white transition-colors">
                        {p.input.name}
                      </h3>
                      <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>{p.input.title}</p>
                    </div>
                    <Badge variant={statusVariant[p.status]}>{p.status}</Badge>
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteTarget(p);
                  }}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-1 rounded-lg text-white hover:bg-white/10 border border-white/20"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ background: "rgba(7, 7, 15, 0.8)" }}>
          <div className="card w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Delete portfolio?</h3>
            <p className="text-sm mb-6" style={{ color: "var(--color-text-secondary)" }}>
              This will permanently remove {deleteTarget.input.name}. This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="ghost" onClick={() => setDeleteTarget(null)} disabled={deleting}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete} loading={deleting}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
