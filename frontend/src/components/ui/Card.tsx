import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`card p-6 ${hover ? "hover:-translate-y-1 cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
