import { create } from "zustand";
import { authApi } from "@/api/auth-api";

type User = {
    name: string;
    email: string;
    [key: string]: any;
};

type AuthState = {
    loading: boolean;
    error: string | null;
    user: User | null;

    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    fetchUser: () => Promise<void>;
    logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
    loading: false,
    error: null,
    user: null,

    login: async (email, password) => {
        set({ loading: true, error: null });

        try {
            const data = await authApi.login({ email, password });

            set({
                user: data.data?.user ?? data?.user ?? null,
                loading: false,
            });

            return true;
        } catch (err) {
            const message = err instanceof Error ? err.message : "Something went wrong";

            set({
                error: message === "Request failed" ? "Invalid email or password" : message,
                loading: false,
            });

            return false;
        }
    },

    register: async (name, email, password) => {
        set({ loading: true, error: null });

        try {
            const data = await authApi.register({ name, email, password });

            set({
                user: data.data?.user ?? data?.user ?? null,
                loading: false,
            });

            return true;
        } catch (err) {
            const message = err instanceof Error ? err.message : "Something went wrong";
            let displayError = message;

            if (message === "Request failed") {
                displayError = "Registration failed";
            } else if (message.toLowerCase().includes("exists") || message.toLowerCase().includes("already")) {
                displayError = "An account already exists with this email.";
            }

            set({
                error: displayError,
                loading: false,
            });

            return false;
        }
    },

    fetchUser: async () => {
        try {
            const data = await authApi.me();
            set({ user: data.data?.user ?? data?.user ?? null });
        } catch {
            set({ user: null });
        }
    },

    logout: async () => {
        try {
            await authApi.logout();
        } catch (e) {} // Ignore error if logout fails
        set({ user: null });
    },
}));
