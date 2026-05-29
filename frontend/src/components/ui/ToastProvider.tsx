"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: "var(--color-bg-card)",
          color: "var(--color-text-primary)",
          border: "1px solid var(--color-border-subtle)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
          padding: "12px 14px",
        },
        success: {
          iconTheme: {
            primary: "#10b981",
            secondary: "var(--color-bg-card)",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "var(--color-bg-card)",
          },
        },
      }}
    />
  );
}
