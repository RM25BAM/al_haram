"use client";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className = "" }: DashboardLayoutProps) {
  return (
    <div className={`min-h-screen relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

interface DashboardMainProps {
  children: ReactNode;
  className?: string;
}

export function DashboardMain({ children, className = "" }: DashboardMainProps) {
  return (
    <main className={`relative z-10 w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 ${className}`}>
      {/* Subtle background pattern */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-5">
        <img
          src="/1.svg"
          alt="Pattern"
          className="w-full h-full"
        />
      </div>

      {children}
    </main>
  );
}
