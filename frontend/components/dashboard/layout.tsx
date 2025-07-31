"use client";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className = "" }: DashboardLayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col justify-between ${className}`}>
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
    <main className={`z-10 w-full px-3 sm:px-2 lg:px-4 sm:py-4 lg:py-6 ${className}`}>
      {children}

      {/* The background pattern image, with styles applied directly */}
    </main>
  );
}
