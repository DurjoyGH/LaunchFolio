import { apiClient } from "./base";

export const authApi = {
  login: async (credentials: Record<string, string>) => {
    return apiClient("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  register: async (data: Record<string, string>) => {
    return apiClient("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  me: async () => {
    return apiClient("/auth/me", {
      method: "GET",
    });
  },
  logout: async () => {
    return apiClient("/auth/logout", {
      method: "POST",
    });
  }
};
