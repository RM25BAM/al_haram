import { useState, useMemo } from "react";
import { useSocketData } from "@/lib/store/socketStore";

export function useTrucks() {
  const { trucks, bins } = useSocketData();

  const [truckStatusFilter, setTruckStatusFilter] = useState<string>("");
  const [truckRouteFilter, setTruckRouteFilter] = useState<string>("");
  const [truckDriverFilter, setTruckDriverFilter] = useState<string>("");
  const [truckCapacityFilter, setTruckCapacityFilter] = useState<string>("");
  const [truckTypeFilter, setTruckTypeFilter] = useState<string>(""); // New filter for waste type
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Validate that trucks are only assigned to bins of the same waste type
  const validatedTrucks = useMemo(() => {
    return trucks.map((truck) => {
      const validBins = truck.assignedBins.filter((binId) => {
        const bin = bins.find((b) => b.id === binId);
        if (!bin) return false;

        // Ensure plastic trucks only have plastic bins, organic trucks only have organic bins
        return (
          (truck.wasteType === "plastic" && bin.wasteType === "Plastic") ||
          (truck.wasteType === "organic" && bin.wasteType === "Organic")
        );
      });

      return {
        ...truck,
        assignedBins: validBins,
      };
    });
  }, [trucks, bins]);

  const filteredTrucks = useMemo(() => {
    return validatedTrucks.filter((truck) => {
      const statusMatch =
        !truckStatusFilter || truck.status === truckStatusFilter;
      const routeMatch = !truckRouteFilter || truck.route === truckRouteFilter;
      const driverMatch =
        !truckDriverFilter || truck.driver === truckDriverFilter;
      const typeMatch = !truckTypeFilter || truck.wasteType === truckTypeFilter;

      let capacityMatch = true;
      if (truckCapacityFilter) {
        const [min, max] = truckCapacityFilter.split("-").map(Number);
        capacityMatch = truck.capacity >= min && truck.capacity <= max;
      }

      // Search functionality
      const searchMatch =
        !searchQuery ||
        truck.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        truck.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
        truck.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
        truck.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        truck.wasteType.toLowerCase().includes(searchQuery.toLowerCase());

      return (
        statusMatch &&
        routeMatch &&
        driverMatch &&
        capacityMatch &&
        typeMatch &&
        searchMatch
      );
    });
  }, [
    validatedTrucks,
    truckStatusFilter,
    truckRouteFilter,
    truckDriverFilter,
    truckCapacityFilter,
    truckTypeFilter,
    searchQuery,
  ]);

  // Separate trucks by type for easier access
  const plasticTrucks = filteredTrucks.filter(
    (truck) => truck.wasteType === "plastic"
  );
  const organicTrucks = filteredTrucks.filter(
    (truck) => truck.wasteType === "organic"
  );

  const clearFilters = () => {
    setTruckStatusFilter("");
    setTruckRouteFilter("");
    setTruckDriverFilter("");
    setTruckCapacityFilter("");
    setTruckTypeFilter("");
    setSearchQuery("");
  };

  return {
    trucks: validatedTrucks,
    filteredTrucks,
    plasticTrucks,
    organicTrucks,
    filters: {
      truckStatusFilter,
      truckRouteFilter,
      truckDriverFilter,
      truckCapacityFilter,
      truckTypeFilter,
      searchQuery,
    },
    setters: {
      setTruckStatusFilter,
      setTruckRouteFilter,
      setTruckDriverFilter,
      setTruckCapacityFilter,
      setTruckTypeFilter,
      setSearchQuery,
    },
    clearFilters,
  };
}
