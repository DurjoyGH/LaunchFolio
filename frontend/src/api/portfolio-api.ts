import { apiClient } from "./base";

export const portfolioApi = {
  getAll: async () => {
    return apiClient("/portfolio", {
      method: "GET",
    });
  },
  getLastInput: async () => {
    return apiClient("/portfolio/last-input", {
      method: "GET",
    });
  },
  generate: async (data: Record<string, any>) => {
    return apiClient("/portfolio", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  getStatus: async (id: string) => {
    return apiClient(`/portfolio/${id}/status`, {
      method: "GET",
    });
  },
  delete: async (id: string) => {
    return apiClient(`/portfolio/${id}`, {
      method: "DELETE",
    });
  },
};
