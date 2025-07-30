"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchTreatmentMethods, fetchTreatmentRecommendations } from "@/lib/api";
import type { TTreatmentMethod } from "@/types";

interface TreatmentRecommendations {
  mostEfficient: TTreatmentMethod | null;
  mostProfitable: TTreatmentMethod | null;
  mostEcoFriendly: TTreatmentMethod | null;
  bestOverall: TTreatmentMethod | null;
  allMethods: TTreatmentMethod[];
}

interface UseTreatmentMethodsState {
  allMethods: TTreatmentMethod[];
  loading: boolean;
  error: string | null;
  lastFetched: Date | null;
  refetchCount: number;
}

export function useTreatmentMethods() {
  const [state, setState] = useState<UseTreatmentMethodsState>({
    allMethods: [],
    loading: true,
    error: null,
    lastFetched: null,
    refetchCount: 0,
  });

  // Fetch all treatment methods with optimized error handling
  const fetchAll = useCallback(async (isRetry = false) => {
    try {
      if (!isRetry) {
        setState(prev => ({ ...prev, loading: true, error: null }));
      }

      const methods = await fetchTreatmentMethods();
      
      setState(prev => ({
        ...prev,
        allMethods: methods,
        loading: false,
        error: null,
        lastFetched: new Date(),
        refetchCount: prev.refetchCount + 1,
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch treatment methods';
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
        refetchCount: prev.refetchCount + 1,
      }));
      
      console.error('Error loading treatment methods:', err);
    }
  }, []);

  // Retry function for error states
  const retry = useCallback(() => {
    fetchAll(true);
  }, [fetchAll]);

  // Refresh function (can be called manually)
  const refresh = useCallback(() => {
    fetchAll();
  }, [fetchAll]);

  // Get methods by type (filtered from already loaded data) - memoized for performance
  const getMethodsByType = useCallback((wasteType: string): TTreatmentMethod[] => {
    return state.allMethods.filter(method => 
      method.type.toLowerCase() === wasteType.toLowerCase()
    );
  }, [state.allMethods]);

  // Get recommendations for a waste type with error handling
  const getRecommendations = useCallback(async (wasteType: string): Promise<TreatmentRecommendations | null> => {
    try {
      const recommendations = await fetchTreatmentRecommendations(wasteType);
      return recommendations;
    } catch (err) {
      console.error('Failed to fetch recommendations:', err);
      return null;
    }
  }, []);

  // Memoized grouped methods by type for better performance
  const methodsByType = useMemo(() => {
    const grouped = new Map<string, TTreatmentMethod[]>();
    
    state.allMethods.forEach(method => {
      const type = method.type.toLowerCase();
      if (!grouped.has(type)) {
        grouped.set(type, []);
      }
      grouped.get(type)!.push(method);
    });
    
    return grouped;
  }, [state.allMethods]);

  // Load all methods on mount
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    allMethods: state.allMethods,
    methodsByType,
    loading: state.loading,
    error: state.error,
    lastFetched: state.lastFetched,
    fetchAll,
    retry,
    refresh,
    getMethodsByType,
    getRecommendations,
    refetchCount: state.refetchCount,
  };
}