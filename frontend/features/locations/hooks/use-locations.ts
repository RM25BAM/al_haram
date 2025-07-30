import { useState, useMemo } from "react";
import { useSocketData } from "@/lib/store/socketStore";

export function useLocations() {
  const { bins, trucks } = useSocketData();
  
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [fillLevelFilter, setFillLevelFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");

  // Memoized filtered bins for performance
  const filteredBins = useMemo(() => {
    return bins.filter((bin) => {
      // Search filter
      if (searchQuery) {
        const matchesSearch =
          bin.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bin.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bin.wasteType.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bin.status.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;
      }

      // Status filter
      if (statusFilter && statusFilter !== "all" && bin.status !== statusFilter) {
        return false;
      }

      // Type filter
      if (typeFilter && typeFilter !== "all" && bin.wasteType !== typeFilter) {
        return false;
      }

      // Fill level filter
      if (fillLevelFilter && fillLevelFilter !== "all") {
        const [min, max] = fillLevelFilter.split("-").map(Number);
        if (bin.fillLevel < min || bin.fillLevel > max) {
          return false;
        }
      }

      // Location filter
      if (locationFilter && locationFilter !== "all") {
        const matchesLocation = bin.location
          .toLowerCase()
          .includes(locationFilter.toLowerCase());
        if (!matchesLocation) return false;
      }

      return true;
    });
  }, [bins, searchQuery, statusFilter, typeFilter, fillLevelFilter, locationFilter]);

  // Memoized filtered trucks for performance
  const filteredTrucks = useMemo(() => {
    return trucks.filter((truck) => {
      if (!searchQuery) return true;

      return (
        truck.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        truck.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
        truck.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
        truck.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [trucks, searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setTypeFilter("all");
    setFillLevelFilter("all");
    setLocationFilter("all");
  };

  const hasActiveFilters = !!(
    searchQuery ||
    (statusFilter && statusFilter !== "all") ||
    (typeFilter && typeFilter !== "all") ||
    (fillLevelFilter && fillLevelFilter !== "all") ||
    (locationFilter && locationFilter !== "all")
  );

  return {
    bins,
    trucks,
    searchQuery,
    setSearchQuery,
    filteredBins,
    filteredTrucks,
    clearSearch,
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
  };
}
