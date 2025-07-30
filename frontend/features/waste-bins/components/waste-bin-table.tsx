"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { WasteBinTableFilters } from "./waste-bin-table-filters";
import { WasteBinCardView } from "./waste-bin-card-view";
import { WasteBinTableView } from "./waste-bin-table-view";
import {
  calculatePriority,
  formatDate,
  formatHealthStatus,
  formatGrinderStatus,
  getStatusColor,
  getTypeColor,
  getHealthStatusColor,
  getGrinderStatusColor,
  getPriorityColor,
  getPriorityText,
  exportToCSV,
  exportToPDF,
  generateDetailedReport,
} from "../utils/waste-bin-utils";
import type { TWasteBin } from "@/types";
import { useWasteBinTranslations } from "@/hooks/use-translations";

interface WasteBinTableProps {
  bins: TWasteBin[];
  onBinSelect: (bin: TWasteBin) => void;
  onGenerateReport: () => void;
  filters: {
    binStatusFilter: string;
    binTypeFilter: string;
    binFillLevelFilter: string;
    binLocationFilter: string;
    searchQuery: string;
  };
  setters: {
    setBinStatusFilter: (value: string) => void;
    setBinTypeFilter: (value: string) => void;
    setBinFillLevelFilter: (value: string) => void;
    setBinLocationFilter: (value: string) => void;
    setSearchQuery: (value: string) => void;
  };
  clearFilters: () => void;
  totalBins: number;
}

type ViewMode = "card" | "table";
type SortField =
  | "id"
  | "fillLevel"
  | "status"
  | "location"
  | "lastCollected"
  | "healthStatus"
  | "averageFillRate"
  | "lastMaintenance"
  | "priority";
type SortDirection = "asc" | "desc";

export function WasteBinTable({
  bins,
  onBinSelect,
  onGenerateReport,
  filters,
  setters,
  clearFilters,
  totalBins,
}: WasteBinTableProps) {
  const [sortField, setSortField] = useState<SortField>("id");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const tWasteBins = useWasteBinTranslations();

  // Load view mode from localStorage on component mount
  useEffect(() => {
    const savedViewMode = localStorage.getItem(
      "waste-bin-view-mode"
    ) as ViewMode;
    if (
      savedViewMode &&
      (savedViewMode === "card" || savedViewMode === "table")
    ) {
      setViewMode(savedViewMode);
    }
  }, []);

  // Save view mode to localStorage when it changes
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem("waste-bin-view-mode", mode);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedBins = [...bins].sort((a, b) => {
    let aValue: any, bValue: any;

    switch (sortField) {
      case "fillLevel":
      case "averageFillRate":
        aValue = a[sortField];
        bValue = b[sortField];
        break;
      case "lastCollected":
        aValue = new Date(a.lastCollection);
        bValue = new Date(b.lastCollection);
        break;
      case "lastMaintenance":
        aValue = new Date(a.lastMaintenance);
        bValue = new Date(b.lastMaintenance);
        break;
      case "priority":
        aValue = calculatePriority(a);
        bValue = calculatePriority(b);
        break;
      default:
        aValue = a[sortField];
        bValue = b[sortField];
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Export/Report handlers
  const handleExportToCSV = () => exportToCSV(sortedBins);
  const handleExportToPDF = () => exportToPDF(sortedBins);
  const handleGenerateDetailedReport = () => generateDetailedReport(sortedBins);

  return (
    <Card className="overflow-hidden">
      <WasteBinTableFilters
        filters={filters}
        setters={setters}
        clearFilters={clearFilters}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        onExportToCSV={handleExportToCSV}
        onExportToPDF={handleExportToPDF}
        onGenerateDetailedReport={handleGenerateDetailedReport}
        onGenerateReport={onGenerateReport}
        totalBins={totalBins}
        filteredBins={bins.length}
      />

      {/* Conditional View Rendering */}
      {bins.length === 0 ? (
        <div className="p-8">
          <div className="text-center text-gray-500">
            <div className="text-lg font-medium">
              {tWasteBins("noBinsFound")}
            </div>
            <div className="text-sm">{tWasteBins("adjustFilters")}</div>
          </div>
        </div>
      ) : viewMode === "card" ? (
        <WasteBinCardView
          bins={sortedBins}
          onBinSelect={onBinSelect}
          calculatePriority={calculatePriority}
          formatDate={formatDate}
          formatHealthStatus={formatHealthStatus}
          formatGrinderStatus={formatGrinderStatus}
          getStatusColor={getStatusColor}
          getTypeColor={getTypeColor}
          getHealthStatusColor={getHealthStatusColor}
          getGrinderStatusColor={getGrinderStatusColor}
          getPriorityColor={getPriorityColor}
          getPriorityText={getPriorityText}
        />
      ) : (
        <WasteBinTableView
          bins={sortedBins}
          onBinSelect={onBinSelect}
          onSort={handleSort}
          calculatePriority={calculatePriority}
          formatDate={formatDate}
          formatHealthStatus={formatHealthStatus}
          getStatusColor={getStatusColor}
          getTypeColor={getTypeColor}
          getHealthStatusColor={getHealthStatusColor}
          getPriorityColor={getPriorityColor}
          getPriorityText={getPriorityText}
        />
      )}
    </Card>
  );
}
