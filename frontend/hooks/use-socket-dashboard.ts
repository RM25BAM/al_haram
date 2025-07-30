"use client";

import { useSocketData, useDashboardStats, useConnectionState } from "@/lib/store/socketStore";
import { useDashboardUIStore, useDashboardSelections } from "@/lib/store/dashboardUIStore";

/**
 * Enhanced dashboard hook that uses separate stores for better performance
 * - Socket data is handled by socketStore
 * - UI state is handled by dashboardUIStore
 * - Components can subscribe to specific parts of state
 */
export function useSocketDashboard() {
  // Socket data (bins, trucks, stats)
  const { bins, trucks, stats, lastUpdated } = useSocketData();
  const { isConnected } = useConnectionState();
  
  // UI state (selections, modals, filters)
  const { selectedBinId, selectedTruck, selectedWasteType } = useDashboardSelections();
  const uiActions = useDashboardUIStore((state) => ({
    setBinId: state.setBinId,
    setTruck: state.setTruck,
    setWasteType: state.setWasteType,
    clearBin: state.clearBin,
    clearTruck: state.clearTruck,
    clearWasteType: state.clearWasteType,
    clearSelections: state.clearSelections,
    openBinModal: state.openBinModal,
    openTruckModal: state.openTruckModal,
    openWasteTypeModal: state.openWasteTypeModal,
    closeBinModal: state.closeBinModal,
    closeTruckModal: state.closeTruckModal,
    closeWasteTypeModal: state.closeWasteTypeModal,
    closeAllModals: state.closeAllModals,
  }));

  // Backward compatibility actions
  const actions = {
    setBinId: uiActions.setBinId,
    setTruck: uiActions.setTruck,
    setWasteType: uiActions.setWasteType,
    clearBin: uiActions.clearBin,
    clearTruck: uiActions.clearTruck,
    clearWasteType: uiActions.clearWasteType,
    clearSelections: uiActions.clearSelections,
  };

  return {
    // Data
    wasteBins: bins,
    trucks,
    dashboardStats: stats,
    lastUpdated,
    
    // Connection
    isConnected,
    
    // UI State
    selectedBinId,
    selectedTruck,
    selectedWasteType,
    
    // Actions
    actions,
    
    // Modal actions
    modals: {
      openBinModal: uiActions.openBinModal,
      openTruckModal: uiActions.openTruckModal,
      openWasteTypeModal: uiActions.openWasteTypeModal,
      closeBinModal: uiActions.closeBinModal,
      closeTruckModal: uiActions.closeTruckModal,
      closeWasteTypeModal: uiActions.closeWasteTypeModal,
      closeAllModals: uiActions.closeAllModals,
    },
  };
}

/**
 * Lightweight hook for components that only need stats
 */
export const useDashboardStatsOnly = () => {
  const stats = useDashboardStats();
  const { isConnected } = useConnectionState();
  
  return {
    dashboardStats: stats,
    isConnected,
  };
}

/**
 * Hook for components that only need bin data
 */
export const useBinData = () => {
  const { bins } = useSocketData();
  return { bins };
}

/**
 * Hook for components that only need truck data
 */
export const useTruckData = () => {
  const { trucks } = useSocketData();
  return { trucks };
}