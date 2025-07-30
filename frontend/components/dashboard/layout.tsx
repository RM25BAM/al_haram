"use client";

import { PatternSvg } from "@/public/pattern";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className = "" }: DashboardLayoutProps) {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
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
    <main className={`w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 ${className}`}>
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-0">
        {/* <PatternSvg fillColor="#000000" /> */}
      </div>
      {children}
    </main>
  );
}