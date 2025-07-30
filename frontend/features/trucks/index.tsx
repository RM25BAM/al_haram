import { useTrucks } from "./hooks/use-trucks";
import { TruckFilters } from "./components/truck-filters";
import { TruckStats } from "./components/truck-stats";
import { TruckTable } from "./components/truck-table";
import { TruckMap } from "./components/truck-map";
import { exportTrucksToCSV, generateTrucksReport } from "./utils/export-utils";
import { LoadingState, ErrorState } from "@/components/ui/page-states";
import { useConnectionState } from "@/lib/store/socketStore";
import type { TTruck } from "@/types";
import { useCommonTranslations } from "@/hooks/use-translations";

interface TrucksFeatureProps {
  onTruckSelect: (truck: TTruck) => void;
}

export function TrucksFeature({ onTruckSelect }: TrucksFeatureProps) {
  const tCommon = useCommonTranslations();

  const {
    trucks,
    filteredTrucks,
    plasticTrucks,
    organicTrucks,
    filters,
    setters,
    clearFilters,
  } = useTrucks();

  const { isConnected, connectionError } = useConnectionState();

  const handleExport = () => {
    exportTrucksToCSV(filteredTrucks);
  };

  const handleGenerateReport = () => {
    generateTrucksReport(filteredTrucks);
  };

  // Show connection error if socket is disconnected
  if (!isConnected && connectionError) {
    return (
      <ErrorState
        error={`Connection Error: ${connectionError}`}
        onRetry={() => window.location.reload()}
        isRetrying={false}
      />
    );
  }

  // Show loading state if not connected yet
  if (!isConnected) {
    return <LoadingState message={tCommon("connectingToServer")} />;
  }

  return (
    <div className="space-y-6">
      <TruckFilters
        filters={filters}
        setters={setters}
        clearFilters={clearFilters}
        totalTrucks={trucks.length}
        filteredCount={filteredTrucks.length}
        trucksData={trucks}
        plasticTrucks={plasticTrucks}
        organicTrucks={organicTrucks}
      />

      <TruckStats />

      {/* Truck Map */}
      <TruckMap onTruckSelect={onTruckSelect} />

      <TruckTable
        trucks={filteredTrucks}
        onTruckSelect={onTruckSelect}
        onExport={handleExport}
        onGenerateReport={handleGenerateReport}
      />
    </div>
  );
}
