import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { TWasteType, TTruck } from '@/types';

interface DashboardUIState {
  // Selection state
  selectedBinId: string | null;
  selectedTruck: TTruck | null;
  selectedWasteType: TWasteType | null;
  
  // Modal state
  isBinModalOpen: boolean;
  isTruckModalOpen: boolean;
  isWasteTypeModalOpen: boolean;
  
  // Treatment methods dialog state
  treatmentMethodsDialog: {
    isOpen: boolean;
    wasteType: 'plastic' | 'organic' | null;
    amount: number;
  };
  
  // View state
  activeTab: 'bins' | 'trucks' | 'locations' | 'wasteTypes';
  viewMode: 'cards' | 'table' | 'map';
  
  // Filter state
  filters: {
    status: string[];
    type: string[];
    location: string[];
    fillLevel: string[];
  };
  
  // Search state
  searchQuery: string;
  isSearching: boolean;
}

interface DashboardUIActions {
  // Selection actions
  setBinId: (binId: string | null) => void;
  setTruck: (truck: TTruck | null) => void;
  setWasteType: (wasteType: TWasteType | null) => void;
  clearSelections: () => void;
  clearBin: () => void;
  clearTruck: () => void;
  clearWasteType: () => void;
  
  // Modal actions
  openBinModal: (binId: string) => void;
  openTruckModal: (truck: TTruck) => void;
  openWasteTypeModal: (wasteType: TWasteType) => void;
  closeBinModal: () => void;
  closeTruckModal: () => void;
  closeWasteTypeModal: () => void;
  closeAllModals: () => void;
  
  // Treatment methods dialog actions
  openTreatmentMethodsDialog: (wasteType: 'plastic' | 'organic', amount: number) => void;
  closeTreatmentMethodsDialog: () => void;
  
  // View actions
  setActiveTab: (tab: DashboardUIState['activeTab']) => void;
  setViewMode: (mode: DashboardUIState['viewMode']) => void;
  
  // Filter actions
  setFilters: (filters: Partial<DashboardUIState['filters']>) => void;
  clearFilters: () => void;
  addFilter: (type: keyof DashboardUIState['filters'], value: string) => void;
  removeFilter: (type: keyof DashboardUIState['filters'], value: string) => void;
  
  // Search actions
  setSearchQuery: (query: string) => void;
  setIsSearching: (searching: boolean) => void;
  clearSearch: () => void;
}

const initialFilters = {
  status: [],
  type: [],
  location: [],
  fillLevel: [],
};

export const useDashboardUIStore = create<DashboardUIState & DashboardUIActions>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    selectedBinId: null,
    selectedTruck: null,
    selectedWasteType: null,
    isBinModalOpen: false,
    isTruckModalOpen: false,
    isWasteTypeModalOpen: false,
    treatmentMethodsDialog: {
      isOpen: false,
      wasteType: null,
      amount: 0,
    },
    activeTab: 'bins',
    viewMode: 'cards',
    filters: initialFilters,
    searchQuery: '',
    isSearching: false,

    // Selection actions
    setBinId: (binId) => set({ selectedBinId: binId }),
    setTruck: (truck) => set({ selectedTruck: truck }),
    setWasteType: (wasteType) => set({ selectedWasteType: wasteType }),
    clearSelections: () => set({ 
      selectedBinId: null, 
      selectedTruck: null, 
      selectedWasteType: null 
    }),
    clearBin: () => set({ selectedBinId: null }),
    clearTruck: () => set({ selectedTruck: null }),
    clearWasteType: () => set({ selectedWasteType: null }),

    // Modal actions
    openBinModal: (binId) => set({ selectedBinId: binId, isBinModalOpen: true }),
    openTruckModal: (truck) => set({ selectedTruck: truck, isTruckModalOpen: true }),
    openWasteTypeModal: (wasteType) => set({ selectedWasteType: wasteType, isWasteTypeModalOpen: true }),
    closeBinModal: () => set({ selectedBinId: null, isBinModalOpen: false }),
    closeTruckModal: () => set({ selectedTruck: null, isTruckModalOpen: false }),
    closeWasteTypeModal: () => set({ selectedWasteType: null, isWasteTypeModalOpen: false }),
    closeAllModals: () => set({ 
      selectedBinId: null, 
      selectedTruck: null, 
      selectedWasteType: null,
      isBinModalOpen: false,
      isTruckModalOpen: false,
      isWasteTypeModalOpen: false
    }),

    // Treatment methods dialog actions
    openTreatmentMethodsDialog: (wasteType, amount) => set({ 
      treatmentMethodsDialog: { isOpen: true, wasteType, amount } 
    }),
    closeTreatmentMethodsDialog: () => set({ 
      treatmentMethodsDialog: { isOpen: false, wasteType: null, amount: 0 } 
    }),

    // View actions
    setActiveTab: (tab) => set({ activeTab: tab }),
    setViewMode: (mode) => set({ viewMode: mode }),

    // Filter actions
    setFilters: (filters) => set((state) => ({ 
      filters: { ...state.filters, ...filters } 
    })),
    clearFilters: () => set({ filters: initialFilters }),
    addFilter: (type, value) => set((state) => ({
      filters: {
        ...state.filters,
        [type]: [...state.filters[type], value]
      }
    })),
    removeFilter: (type, value) => set((state) => ({
      filters: {
        ...state.filters,
        [type]: state.filters[type].filter(v => v !== value)
      }
    })),

    // Search actions
    setSearchQuery: (query) => set({ searchQuery: query }),
    setIsSearching: (searching) => set({ isSearching: searching }),
    clearSearch: () => set({ searchQuery: '', isSearching: false }),
  }))
);

// Selectors
export const useDashboardSelections = () => {
  const selectedBinId = useDashboardUIStore((state) => state.selectedBinId);
  const selectedTruck = useDashboardUIStore((state) => state.selectedTruck);
  const selectedWasteType = useDashboardUIStore((state) => state.selectedWasteType);
  
  return { selectedBinId, selectedTruck, selectedWasteType };
};

export const useDashboardModals = () => {
  const isBinModalOpen = useDashboardUIStore((state) => state.isBinModalOpen);
  const isTruckModalOpen = useDashboardUIStore((state) => state.isTruckModalOpen);
  const isWasteTypeModalOpen = useDashboardUIStore((state) => state.isWasteTypeModalOpen);
  
  return { isBinModalOpen, isTruckModalOpen, isWasteTypeModalOpen };
};

export const useDashboardView = () => {
  const activeTab = useDashboardUIStore((state) => state.activeTab);
  const viewMode = useDashboardUIStore((state) => state.viewMode);
  
  return { activeTab, viewMode };
};

export const useDashboardFilters = () => {
  const filters = useDashboardUIStore((state) => state.filters);
  const searchQuery = useDashboardUIStore((state) => state.searchQuery);
  const isSearching = useDashboardUIStore((state) => state.isSearching);
  
  return { filters, searchQuery, isSearching };
};

export const useSelectedBinId = () => useDashboardUIStore((state) => state.selectedBinId);
export const useSelectedTruck = () => useDashboardUIStore((state) => state.selectedTruck);
export const useSelectedWasteType = () => useDashboardUIStore((state) => state.selectedWasteType);
export const useIsBinModalOpen = () => useDashboardUIStore((state) => state.isBinModalOpen);
export const useIsTruckModalOpen = () => useDashboardUIStore((state) => state.isTruckModalOpen);
export const useIsWasteTypeModalOpen = () => useDashboardUIStore((state) => state.isWasteTypeModalOpen);
export const useTreatmentMethodsDialog = () => useDashboardUIStore((state) => state.treatmentMethodsDialog);
export const useActiveTab = () => useDashboardUIStore((state) => state.activeTab);
export const useViewMode = () => useDashboardUIStore((state) => state.viewMode);
export const useDashboardSearchQuery = () => useDashboardUIStore((state) => state.searchQuery);
export const useIsSearching = () => useDashboardUIStore((state) => state.isSearching);