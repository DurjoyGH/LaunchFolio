import type { Metadata } from "next";
import "./globals.css";
import ToastProvider from "@/components/ui/ToastProvider";

export const metadata: Metadata = {
  title: "LaunchFolio — AI-Powered Portfolio Generator",
  description:
    "Build and deploy a stunning portfolio website in minutes using AI. LaunchFolio analyzes your skills and generates a fully deployed portfolio.",
  keywords: ["portfolio", "AI", "generator", "developer", "Next.js", "Vercel"],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "LaunchFolio — AI-Powered Portfolio Generator",
    description: "Build and deploy a stunning portfolio website in minutes using AI.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
