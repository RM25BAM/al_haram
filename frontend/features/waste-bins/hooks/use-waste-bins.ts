import { useState, useMemo } from "react";
import { useSocketData } from "@/lib/store/socketStore";

export function useWasteBins() {
  const { bins } = useSocketData();

  const [binStatusFilter, setBinStatusFilter] = useState<string>("all");
  const [binTypeFilter, setBinTypeFilter] = useState<string>("all");
  const [binFillLevelFilter, setBinFillLevelFilter] = useState<string>("all");
  const [binLocationFilter, setBinLocationFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Memoized filtered bins for performance
  const filteredBins = useMemo(() => {
    return bins.filter((bin) => {
      const statusMatch =
        !binStatusFilter ||
        binStatusFilter === "all" ||
        bin.status === binStatusFilter;
      const typeMatch =
        !binTypeFilter ||
        binTypeFilter === "all" ||
        bin.wasteType === binTypeFilter;
      const locationMatch =
        !binLocationFilter ||
        binLocationFilter === "all" ||
        bin.location.toLowerCase().includes(binLocationFilter.toLowerCase());

      let fillLevelMatch = true;
      if (binFillLevelFilter && binFillLevelFilter !== "all") {
        const [min, max] = binFillLevelFilter.split("-").map(Number);
        fillLevelMatch = bin.fillLevel >= min && bin.fillLevel <= max;
      }

      // Search functionality
      const searchMatch =
        !searchQuery ||
        bin.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bin.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bin.wasteType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bin.status.toLowerCase().includes(searchQuery.toLowerCase());

      return (
        statusMatch && typeMatch && locationMatch && fillLevelMatch && searchMatch
      );
    });
  }, [bins, binStatusFilter, binTypeFilter, binFillLevelFilter, binLocationFilter, searchQuery]);

  const clearFilters = () => {
    setBinStatusFilter("all");
    setBinTypeFilter("all");
    setBinFillLevelFilter("all");
    setBinLocationFilter("all");
    setSearchQuery("");
  };

  return {
    bins,
    filteredBins,
    filters: {
      binStatusFilter,
      binTypeFilter,
      binFillLevelFilter,
      binLocationFilter,
      searchQuery,
    },
    setters: {
      setBinStatusFilter,
      setBinTypeFilter,
      setBinFillLevelFilter,
      setBinLocationFilter,
      setSearchQuery,
    },
    clearFilters,
  };
}
