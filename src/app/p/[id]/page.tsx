"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { portfolioApi } from "@/api/portfolio-api";
import { PortfolioRenderer } from "@/components/portfolio-template/PortfolioRenderer";

export default function PublicPortfolioPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<{ input: any; blueprint: any; content: any } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const response = await portfolioApi.getPublic(id);
        setData(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to load portfolio");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-indigo-500 border-indigo-500/30 rounded-full animate-spin mb-4" />
          <p className="text-gray-400">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-gray-400">{error || "Portfolio not found or not ready."}</p>
        </div>
      </div>
    );
  }

  return (
    <PortfolioRenderer 
      input={data.input} 
      blueprint={data.blueprint} 
      content={data.content} 
    />
  );
}
