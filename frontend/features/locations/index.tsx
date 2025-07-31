"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InteractiveMap } from "@/components/map";
import { useLocations } from "./hooks/use-locations";
import { LoadingState, ErrorState } from "@/components/ui/page-states";
import { useConnectionState } from "@/lib/store/socketStore";
import { Filter, Search, X, AlertTriangle } from "lucide-react";
import {
  useLocationTranslations,
  useCommonTranslations,
  useWasteBinTranslations,
  useDashboardTranslations,
} from "@/hooks/use-translations";

export function LocationsFeature() {
  const tLocations = useLocationTranslations();
  const tCommon = useCommonTranslations();
  const tWasteBins = useWasteBinTranslations();
  const tDashboard = useDashboardTranslations();

  const {
    bins,
    searchQuery,
    setSearchQuery,
    filteredBins,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    fillLevelFilter,
    setFillLevelFilter,
    locationFilter,
    setLocationFilter,
    clearFilters,
    hasActiveFilters,
  } = useLocations();

  const { isConnected, connectionError } = useConnectionState();

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
    return <LoadingState message={tLocations("connectingToServer")} />;
  }

  // Show loading state if no data available yet
  if (bins.length === 0) {
    return <LoadingState message={tLocations("loadingLocationData")} />;
  }

  const criticalBinsForMap = filteredBins.filter((bin) => bin.fillLevel >= 90);

  const translateWasteType = (wasteType: string) => {
    switch (wasteType.toLowerCase()) {
      case "organic":
        return tWasteBins("organic");
      case "plastic":
        return tWasteBins("plastic");
      case "recycling":
        return tWasteBins("recycling");
      case "hazardous":
        return tWasteBins("hazardous");
      case "general":
        return tWasteBins("general");
      default:
        return wasteType;
    }
  };

  const translateStatus = (status: string) => {
    switch (status) {
      case "needs_collection":
        return tWasteBins("needsCollection");
      case "critical":
        return tWasteBins("critical");
      case "normal":
        return tWasteBins("normal");
      default:
        return status.replace("_", " ");
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Interactive Map */}
      <Card className="overflow-hidden bg-surface border-surface-400">
        {/* Ultra-Compact Header with Integrated Filters */}
        <div className="bg-surface border-b border-surface-400">
          {/* Top Row: Title + View Toggle + Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-4 py-2 gap-2 sm:gap-0 border-b border-surface-400/50">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <h3 className="font-semibold text-primary text-base sm:text-lg lg:text-xl">
                {tLocations("title")}
              </h3>
              <span className="text-sm sm:text-base text-primary/70">
                {filteredBins.length} {tCommon("of")} {bins.length}
              </span>
            </div>
          </div>

          {/* Bottom Row: All Filters in Responsive Layout */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4 px-3 sm:px-4 py-3">
            {/* Search - Takes half the width on lg screens */}
            <div className="relative flex-1 lg:flex-[0.5]">
              <Search
                style={{ left: "0.75rem" }}
                className="absolute top-1/2 transform -translate-y-1/2 text-primary/50 h-4 w-4"
              />
              <Input
                style={{ paddingLeft: "2.5rem" }}
                type="text"
                placeholder={tLocations("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 text-sm border-surface-400 bg-surface-200 text-primary placeholder:text-primary/50 focus:ring-2 focus:ring-secondary"
              />
            </div>

            {/* Filter Grid - Takes other half on lg screens */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 flex-1 lg:flex-[0.5]">
              {/* Compact Filter Dropdowns */}
              <Select
                value={!!statusFilter ? statusFilter : "all"}
                onValueChange={(value) =>
                  setStatusFilter(value === "all" ? "" : value)
                }
              >
                <SelectTrigger className="h-10 w-full bg-surface-200 border-surface-400 text-primary">
                  <SelectValue placeholder={tLocations("allStatus")} />
                </SelectTrigger>
                <SelectContent className="bg-surface border-surface-400">
                  <SelectItem
                    value="all"
                    className="text-primary hover:bg-surface-200"
                  >
                    {tLocations("allStatus")}
                  </SelectItem>
                  <SelectItem
                    value="normal"
                    className="text-primary hover:bg-surface-200"
                  >
                    {tWasteBins("normal")}
                  </SelectItem>
                  <SelectItem
                    value="needs_collection"
                    className="text-primary hover:bg-surface-200"
                  >
                    {tWasteBins("needsCollection")}
                  </SelectItem>
                  <SelectItem
                    value="critical"
                    className="text-primary hover:bg-surface-200"
                  >
                    {tWasteBins("critical")}
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={!!typeFilter ? typeFilter : "all"}
                onValueChange={(value) =>
                  setTypeFilter(value === "all" ? "" : value)
                }
              >
                <SelectTrigger className="h-10 w-full bg-surface-200 border-surface-400 text-primary">
                  <SelectValue placeholder={tLocations("allTypes")} />
                </SelectTrigger>
                <SelectContent className="bg-surface border-surface-400">
                  <SelectItem
                    value="all"
                    className="text-primary hover:bg-surface-200"
                  >
                    {tLocations("allTypes")}
                  </SelectItem>
                  <SelectItem
                    value="Plastic"
                    className="text-primary hover:bg-surface-200"
                  >
                    {tWasteBins("plastic")}
                  </SelectItem>
                  <SelectItem
                    value="Organic"
                    className="text-primary hover:bg-surface-200"
                  >
                    {tWasteBins("organic")}
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={!!fillLevelFilter ? fillLevelFilter : "all"}
                onValueChange={(value) =>
                  setFillLevelFilter(value === "all" ? "" : value)
                }
              >
                <SelectTrigger className="h-10 w-full bg-surface-200 border-surface-400 text-primary">
                  <SelectValue placeholder={tLocations("allFillLevels")} />
                </SelectTrigger>
                <SelectContent className="bg-surface border-surface-400">
                  <SelectItem
                    value="all"
                    className="text-primary hover:bg-surface-200"
                  >
                    {tLocations("allFillLevels")}
                  </SelectItem>
                  <SelectItem
                    value="0-25"
                    className="text-primary hover:bg-surface-200"
                  >
                    {tWasteBins("fillRange0to25")}
                  </SelectItem>
                  <SelectItem
                    value="26-50"
                    className="text-primary hover:bg-surface-200"
                  >
                    {tWasteBins("fillRange26to50")}
                  </SelectItem>
                  <SelectItem
                    value="51-75"
                    className="text-primary hover:bg-surface-200"
                  >
                    {tWasteBins("fillRange51to75")}
                  </SelectItem>
                  <SelectItem
                    value="76-100"
                    className="text-primary hover:bg-surface-200"
                  >
                    {tWasteBins("fillRange76to100")}
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={!!locationFilter ? locationFilter : "all"}
                onValueChange={(value) =>
                  setLocationFilter(value === "all" ? "" : value)
                }
              >
                <SelectTrigger className="h-10 w-full bg-surface-200 border-surface-400 text-primary">
                  <SelectValue placeholder={tLocations("allLocations")} />
                </SelectTrigger>
                <SelectContent className="bg-surface border-surface-400">
                  <SelectItem
                    value="all"
                    className="text-primary hover:bg-surface-200"
                  >
                    {tLocations("allLocations")}
                  </SelectItem>
                  <SelectItem
                    value="Mataf"
                    className="text-primary hover:bg-surface-200"
                  >
                    {tLocations("mataf")}
                  </SelectItem>
                  <SelectItem
                    value="Safa"
                    className="text-primary hover:bg-surface-200"
                  >
                    {tLocations("safaMarwa")}
                  </SelectItem>
                  <SelectItem
                    value="Gates"
                    className="text-primary hover:bg-surface-200"
                  >
                    {tLocations("gates")}
                  </SelectItem>
                  <SelectItem
                    value="Maqam"
                    className="text-primary hover:bg-surface-200"
                  >
                    {tLocations("maqamIbrahim")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters - Separate row on mobile, inline on lg */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-10 px-4 text-sm text-primary/70 hover:text-primary hover:bg-surface-200 lg:ml-2"
              >
                <X className="h-4 w-4 mr-2" />
                {tCommon("clearFilters")}
              </Button>
            )}
          </div>
        </div>

        <CardContent className="px-3 sm:px-6 pt-6 bg-surface">
          <InteractiveMap
            bins={filteredBins}
            trucks={[]}
            className="h-[400px] sm:h-[500px] lg:h-[700px] w-full"
          />

          {/* Critical Bins Alert - Integrated within Map Card */}
          {criticalBinsForMap.length > 0 && (
            <div className="mt-6 p-4 bg-surface-200 border border-surface-400 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                <h4 className="font-medium text-primary">
                  {tLocations("criticalBinsAlert")}
                </h4>
              </div>
              <p className="text-primary/70 text-sm mt-1">
                {criticalBinsForMap.length}{" "}
                {tDashboard("criticalBins").toLowerCase()}{" "}
                {tCommon("available")}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
