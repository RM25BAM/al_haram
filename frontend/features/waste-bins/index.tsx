"use client";

import { useWasteBins } from "./hooks/use-waste-bins";
import { WasteBinTable } from "./components/waste-bin-table";
import { generateBinsReport } from "./utils/export-utils";
import type { TWasteBin } from "@/types";

interface WasteBinsFeatureProps {
  onBinSelect: (bin: TWasteBin) => void;
}

export function WasteBinsFeature({ onBinSelect }: WasteBinsFeatureProps) {
  const { bins, filteredBins, filters, setters, clearFilters } = useWasteBins();

  const handleGenerateReport = () => {
    generateBinsReport(filteredBins);
  };

  return (
    <div>
      <WasteBinTable
        bins={filteredBins}
        onBinSelect={onBinSelect}
        onGenerateReport={handleGenerateReport}
        filters={filters}
        setters={setters}
        clearFilters={clearFilters}
        totalBins={bins.length}
      />
    </div>
  );
}
