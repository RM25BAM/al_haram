"use client";

import { useState, useEffect } from "react";
import { fetchCarbonFilterStatus } from "@/lib/api";
import type { TCarbonFilterStatus } from "@/types";

interface CarbonFilterState {
  daysRemaining: number;
  hoursRemaining: number;
  minutesRemaining: number;
  totalMinutesRemaining: number;
  isExpired: boolean;
  isNearExpiry: boolean;
  isCritical: boolean;
  lastUpdated: Date;
  formattedTimeRemaining: string;
  isLoading: boolean;
  error: string | null;
}

export function useCarbonFilterCountdown() {
  const [filterState, setFilterState] = useState<CarbonFilterState>({
    daysRemaining: 0,
    hoursRemaining: 0,
    minutesRemaining: 0,
    totalMinutesRemaining: 0,
    isExpired: false,
    isNearExpiry: false,
    isCritical: false,
    lastUpdated: new Date(),
    formattedTimeRemaining: "0d 0h 0m",
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        setFilterState((prev) => ({ ...prev, isLoading: true, error: null }));

        const data = await fetchCarbonFilterStatus();

        const newState: CarbonFilterState = {
          ...data,
          lastUpdated: new Date(data.lastUpdated),
          isLoading: false,
          error: null,
        };

        setFilterState(newState);
      } catch (error) {
        setFilterState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to fetch carbon filter data",
        }));
      }
    };

    // Fetch immediately
    fetchFilterData();

    // Set up interval to fetch every minute
    const interval = setInterval(fetchFilterData, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    if (filterState.isExpired) return "bg-red-500 text-white border-red-600";
    if (filterState.isCritical)
      return "bg-yellow-500 text-white border-yellow-600";
    if (filterState.isNearExpiry)
      return "bg-orange-500 text-white border-orange-600";
    return "bg-green-500 text-white border-green-600";
  };

  const getStatusVariant = () => {
    if (filterState.isExpired) return "destructive";
    if (filterState.isCritical) return "warning";
    if (filterState.isNearExpiry) return "secondary";
    return "default";
  };

  return {
    ...filterState,
    getStatusColor,
    getStatusVariant,
  };
}
