import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { TWasteBin, TTruck, TWasteType } from '@/types';

interface SocketState {
  // Connection state
  isConnected: boolean;
  connectionError: string | null;
  lastUpdated: Date | null;
  
  // Data state
  bins: TWasteBin[];
  trucks: TTruck[];
  wasteTypes: TWasteType[];
  
  // Computed stats (memoized)
  stats: {
    totalBins: number;
    criticalBins: TWasteBin[];
    needsCollectionBins: TWasteBin[];
    activeTrucks: TTruck[];
  };
}

interface SocketActions {
  // Connection actions
  setConnected: (connected: boolean) => void;
  setConnectionError: (error: string | null) => void;
  
  // Data actions
  setBins: (bins: TWasteBin[]) => void;
  setTrucks: (trucks: TTruck[]) => void;
  setWasteTypes: (wasteTypes: TWasteType[]) => void;
  updateLastUpdated: () => void;
  
  // Computed actions
  computeStats: () => void;
}

const computeStatsFromData = (bins: TWasteBin[], trucks: TTruck[]) => ({
  totalBins: bins.length,
  criticalBins: bins.filter((bin) => bin.fillLevel >= 90),
  needsCollectionBins: bins.filter((bin) => bin.status === "needs_collection"),
  activeTrucks: trucks.filter((truck) => truck.status !== "available" && truck.status !== "maintenance"),
});

export const useSocketStore = create<SocketState & SocketActions>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    isConnected: false,
    connectionError: null,
    lastUpdated: null,
    bins: [],
    trucks: [],
    wasteTypes: [],
    stats: {
      totalBins: 0,
      criticalBins: [],
      needsCollectionBins: [],
      activeTrucks: [],
    },

    // Connection actions
    setConnected: (connected) => set({ isConnected: connected }),
    setConnectionError: (error) => set({ connectionError: error }),

    // Data actions
    setBins: (bins) => {
      const trucks = get().trucks;
      const stats = computeStatsFromData(bins, trucks);
      set({ 
        bins, 
        stats,
        lastUpdated: new Date() 
      });
    },
    
    setTrucks: (trucks) => {
      const bins = get().bins;
      const stats = computeStatsFromData(bins, trucks);
      set({ 
        trucks, 
        stats,
        lastUpdated: new Date() 
      });
    },

    setWasteTypes: (wasteTypes) => set({ wasteTypes }),

    updateLastUpdated: () => set({ lastUpdated: new Date() }),

    computeStats: () => {
      const { bins, trucks } = get();
      const stats = computeStatsFromData(bins, trucks);
      set({ stats });
    },
  }))
);

// Selectors
export const useSocketData = () => {
  const bins = useSocketStore((state) => state.bins);
  const trucks = useSocketStore((state) => state.trucks);
  const wasteTypes = useSocketStore((state) => state.wasteTypes);
  const stats = useSocketStore((state) => state.stats);
  const lastUpdated = useSocketStore((state) => state.lastUpdated);
  
  return { bins, trucks, wasteTypes, stats, lastUpdated };
};

export const useConnectionState = () => {
  const isConnected = useSocketStore((state) => state.isConnected);
  const connectionError = useSocketStore((state) => state.connectionError);
  
  return { isConnected, connectionError };
};

export const useDashboardStats = () => useSocketStore((state) => state.stats);

export const useIsConnected = () => useSocketStore((state) => state.isConnected);
export const useConnectionError = () => useSocketStore((state) => state.connectionError);
export const useBins = () => useSocketStore((state) => state.bins);
export const useTrucks = () => useSocketStore((state) => state.trucks);
export const useWasteTypes = () => useSocketStore((state) => state.wasteTypes);
export const useLastUpdated = () => useSocketStore((state) => state.lastUpdated);