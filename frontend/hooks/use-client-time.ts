"use client";

import { useState, useEffect } from "react";

export function useFormattedTime(date: Date | null): string {
  const [formattedTime, setFormattedTime] = useState<string>("");

  useEffect(() => {
    if (!date) {
      setFormattedTime("N/A");
      return;
    }
    // Only format time on client side to avoid hydration mismatch
    setFormattedTime(date.toLocaleTimeString());
  }, [date]);

  return formattedTime;
}

export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

// Safe time formatting utility that works in SSR
export function formatTimeSSR(
  dateString: string | null | Date,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!dateString) return "N/A";

  // Handle both string and Date inputs
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;

  // Default safe options for consistent formatting
  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC", // Use UTC to ensure consistency
  };

  try {
    return date.toLocaleTimeString("en-US", { ...defaultOptions, ...options });
  } catch (error) {
    // Fallback to ISO string format if locale formatting fails
    return date.toISOString().substr(11, 5);
  }
}
