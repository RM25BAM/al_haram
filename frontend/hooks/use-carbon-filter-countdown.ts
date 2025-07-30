"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchCarbonFilterStatus } from "@/lib/api";
import type { TCarbonFilterStatus } from "@/types";

export function useCarbonFilterCountdown() {
  const [filterState, setFilterState] = useState<TCarbonFilterStatus>({
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

  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);
  const [initialTotalMinutes, setInitialTotalMinutes] = useState<number>(0);

  // Calculate current remaining time based on initial fetch and elapsed time
  const updateCountdown = useCallback(() => {
    if (!lastFetchTime || initialTotalMinutes === 0) return;

    const now = new Date();
    const elapsedMinutes = Math.floor((now.getTime() - lastFetchTime.getTime()) / (1000 * 60));
    const currentTotalMinutes = Math.max(0, initialTotalMinutes - elapsedMinutes);

    if (currentTotalMinutes === 0) {
      setFilterState(prev => ({
        ...prev,
        daysRemaining: 0,
        hoursRemaining: 0,
        minutesRemaining: 0,
        totalMinutesRemaining: 0,
        isExpired: true,
        isCritical: false,
        isNearExpiry: false,
        formattedTimeRemaining: "Expired",
        lastUpdated: now,
      }));
      return;
    }

    const days = Math.floor(currentTotalMinutes / (24 * 60));
    const hours = Math.floor((currentTotalMinutes % (24 * 60)) / 60);
    const minutes = currentTotalMinutes % 60;

    // Determine status based on remaining time
    const isExpired = currentTotalMinutes <= 0;
    const isCritical = !isExpired && currentTotalMinutes <= 1440; // Less than 1 day
    const isNearExpiry = !isExpired && !isCritical && currentTotalMinutes <= 10080; // Less than 7 days

    setFilterState(prev => ({
      ...prev,
      daysRemaining: days,
      hoursRemaining: hours,
      minutesRemaining: minutes,
      totalMinutesRemaining: currentTotalMinutes,
      isExpired,
      isCritical,
      isNearExpiry,
      formattedTimeRemaining: `${days}d ${hours}h ${minutes}m`,
      lastUpdated: now,
    }));
  }, [lastFetchTime, initialTotalMinutes]);

  // Fetch filter data from API (only once on mount)
  const fetchFilterData = useCallback(async () => {
    try {
      setFilterState(prev => ({ ...prev, isLoading: true, error: null }));

      const data = await fetchCarbonFilterStatus();
      const fetchTime = new Date();

      // Store the initial values for local countdown calculation
      setLastFetchTime(fetchTime);
      setInitialTotalMinutes(data.totalMinutesRemaining);

      // Set the initial state with API response data
      setFilterState({
        ...data,
        lastUpdated: new Date(data.lastUpdated),
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setFilterState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to fetch carbon filter data",
      }));
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchFilterData();
  }, [fetchFilterData]);

  // Update countdown every minute for real-time display
  useEffect(() => {
    if (!lastFetchTime || initialTotalMinutes === 0) return;

    // Update immediately
    updateCountdown();

    // Update every minute
    const interval = setInterval(updateCountdown, 60 * 1000);

    return () => clearInterval(interval);
  }, [lastFetchTime, initialTotalMinutes, updateCountdown]);

  const getStatusColor = () => {
    if (filterState.isExpired) return "bg-red-500 text-white border-red-600";
    if (filterState.isCritical) return "bg-yellow-500 text-white border-yellow-600";
    if (filterState.isNearExpiry) return "bg-orange-500 text-white border-orange-600";
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
    refresh: fetchFilterData,
  };
}
