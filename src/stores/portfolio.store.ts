import { create } from "zustand";
import { portfolioApi } from "@/api/portfolio-api";

export type Status = "queued" | "generating" | "building" | "deploying" | "deployed" | "failed";

export interface Portfolio {
  _id: string;
  status: Status;
  input: { name: string; title: string };
  deployment: { deployUrl?: string };
  createdAt: string;
}

type PortfolioState = {
  portfolios: Portfolio[];
  loading: boolean;
  error: string | null;

  currentStatus: Status;
  currentDeployUrl: string | null;
  currentErrorMsg: string | null;

  fetchPortfolios: () => Promise<void>;
  deletePortfolio: (id: string) => Promise<boolean>;
  pollStatus: (id: string) => Promise<boolean>;
  resetStatus: () => void;
};

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  portfolios: [],
  loading: false,
  error: null,

  currentStatus: "queued",
  currentDeployUrl: null,
  currentErrorMsg: null,

  fetchPortfolios: async () => {
    set({ loading: true, error: null });
    try {
      const data = await portfolioApi.getAll();
      const payload = data.data || data;
      set({ portfolios: payload.portfolios || [], loading: false });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : "Failed to fetch", loading: false });
    }
  },

  deletePortfolio: async (id: string) => {
    try {
      await portfolioApi.delete(id);
      set({ portfolios: get().portfolios.filter(p => p._id !== id) });
      return true;
    } catch (err) {
      return false;
    }
  },

  pollStatus: async (id: string) => {
    try {
      const data = await portfolioApi.getStatus(id);
      // data returned is from successResponse: { data: { status, deployUrl, error } }
      // apiClient returns the 'data' payload or the whole payload if no 'data' exists
      const payload = data.data || data;
      set({ 
        currentStatus: payload.status, 
        currentDeployUrl: payload.deployUrl || null, 
        currentErrorMsg: payload.error || null 
      });
      return payload.status === "deployed" || payload.status === "failed";
    } catch {
      return false; // keep polling
    }
  },

  resetStatus: () => {
    set({ currentStatus: "queued", currentDeployUrl: null, currentErrorMsg: null });
  }
}));
