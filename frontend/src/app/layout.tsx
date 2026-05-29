import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ui/ToastProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LaunchFolio — AI-Powered Portfolio Generator",
  description:
    "Build and deploy a stunning portfolio website in minutes using AI. LaunchFolio analyzes your skills and generates a fully deployed portfolio.",
  keywords: ["portfolio", "AI", "generator", "developer", "Next.js", "Vercel"],
  openGraph: {
    title: "LaunchFolio — AI-Powered Portfolio Generator",
    description: "Build and deploy a stunning portfolio website in minutes using AI.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
