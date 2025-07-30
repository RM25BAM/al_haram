import { useState, useCallback, useMemo } from "react";
import { useWasteTypes as useSocketWasteTypes } from "@/lib/store/socketStore";
import { TWasteType } from "@/types";

interface WasteTypesState {
  wasteTypes: TWasteType[];
  loading: boolean;
  error: string | null;
  lastFetched: Date | null;
}

export function useWasteTypes() {
  const socketWasteTypes = useSocketWasteTypes(); // Use socket data instead of API
  const [searchQuery, setSearchQuery] = useState("");

  // Create state that mirrors the old structure but uses socket data
  const state: WasteTypesState = {
    wasteTypes: socketWasteTypes,
    loading: false, // Socket data is always available once connected
    error: null,
    lastFetched: new Date(), // Always current since it's real-time
  };

  // Retry function (no-op since we're using socket data)
  const retry = useCallback(() => {
    // No need to retry with socket data - it's real-time
  }, []);

  // Refresh function (no-op since we're using socket data)
  const refresh = useCallback(() => {
    // No need to refresh with socket data - it's real-time
  }, []);

  // Memoized filtered waste types based on search
  const filteredWasteTypes = useMemo(() => {
    if (!searchQuery.trim()) {
      return state.wasteTypes;
    }

    return state.wasteTypes.filter((wasteType) =>
      wasteType.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [state.wasteTypes, searchQuery]);

  // Memoized search functions
  const setSearchQueryOptimized = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  // Memoized computed statistics
  const stats = useMemo(() => {
    const filtered = filteredWasteTypes;
    const total = filtered.reduce((sum, type) => sum + type.amount, 0);
    const avgDaily = filtered.reduce((sum, type) => sum + type.dailyAverage, 0);
    const highest =
      filtered.length > 0
        ? filtered.reduce(
            (max, type) => (type.amount > max.amount ? type : max),
            filtered[0]
          )
        : null;
    const lowest =
      filtered.length > 0
        ? filtered.reduce(
            (min, type) => (type.amount < min.amount ? type : min),
            filtered[0]
          )
        : null;

    return {
      totalWaste: total,
      avgDailyWaste: avgDaily,
      categoriesCount: filtered.length,
      highestCategory: highest,
      lowestCategory: lowest,
      highVolumeCount: filtered.filter((t) => t.percentage > 25).length,
      normalVolumeCount: filtered.filter((t) => t.percentage <= 25).length,
    };
  }, [filteredWasteTypes]);

  return {
    wasteTypes: state.wasteTypes,
    filteredWasteTypes,
    searchQuery,
    setSearchQuery: setSearchQueryOptimized,
    clearSearch,
    loading: state.loading,
    error: state.error,
    lastFetched: state.lastFetched,
    retry,
    refresh,
    stats,
  };
}
