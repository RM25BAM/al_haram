import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Truck, Leaf } from "lucide-react";
import { TTruck } from "@/types";

interface TruckFiltersProps {
  filters: {
    truckStatusFilter: string;
    truckRouteFilter: string;
    truckDriverFilter: string;
    truckCapacityFilter: string;
    truckTypeFilter: string;
    searchQuery: string;
  };
  setters: {
    setTruckStatusFilter: (value: string) => void;
    setTruckRouteFilter: (value: string) => void;
    setTruckDriverFilter: (value: string) => void;
    setTruckCapacityFilter: (value: string) => void;
    setTruckTypeFilter: (value: string) => void;
    setSearchQuery: (value: string) => void;
  };
  clearFilters: () => void;
  totalTrucks: number;
  filteredCount: number;
  trucksData: TTruck[];
  plasticTrucks: TTruck[];
  organicTrucks: TTruck[];
}

export function TruckFilters({
  filters,
  setters,
  clearFilters,
  totalTrucks,
  filteredCount,
  trucksData = [],
  plasticTrucks = [],
  organicTrucks = [],
}: TruckFiltersProps) {
  const t = useTranslations("trucks");
  const commonT = useTranslations("common");

  return (
    <Card className="bg-surface border-outline">
      <CardHeader className="pb-3 border-b border-outline bg-surface">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-primary">
              {t("fleetManagementConsole")}
            </CardTitle>
            <div className="flex items-center gap-4 mt-1 text-sm">
              <div className="flex items-center gap-1">
                <Truck className="h-4 w-4 text-primary" />
                <span className="text-primary">
                  {plasticTrucks.length} {commonT("plastic")}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Truck className="h-4 w-4 text-primary" />
                <Leaf className="h-3 w-3 text-primary" />
                <span className="text-primary">
                  {organicTrucks.length} {commonT("organic")}
                </span>
              </div>
            </div>
          </div>
          <div className="text-sm text-primary/70">
            {t("showingVehicles", {
              filtered: filteredCount,
              total: totalTrucks,
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
          {/* Search Bar */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/50 h-4 w-4 z-10" />
              <Input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={filters.searchQuery}
                onChange={(e) => setters.setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-9 border-outline bg-surface-200 text-primary placeholder:text-primary/50 focus:border-secondary focus:ring-secondary"
              />
            </div>
          </div>

          <div>
            <Select
              value={
                !!filters.truckStatusFilter ? filters.truckStatusFilter : "all"
              }
              onValueChange={(value) =>
                setters.setTruckStatusFilter(value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="w-full h-9 bg-surface-200 border-outline text-primary">
                <SelectValue placeholder={t("allVehicles")} />
              </SelectTrigger>
              <SelectContent className="bg-surface border-outline">
                <SelectItem
                  value="all"
                  className="text-primary hover:bg-surface-200"
                >
                  {t("allVehicles")}
                </SelectItem>
                <SelectItem
                  value="available"
                  className="text-primary hover:bg-surface-200"
                >
                  {t("available")}
                </SelectItem>
                <SelectItem
                  value="en_route"
                  className="text-primary hover:bg-surface-200"
                >
                  {t("enRoute")}
                </SelectItem>
                <SelectItem
                  value="collecting"
                  className="text-primary hover:bg-surface-200"
                >
                  {t("collecting")}
                </SelectItem>
                <SelectItem
                  value="maintenance"
                  className="text-primary hover:bg-surface-200"
                >
                  {t("maintenance")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              value={
                !!filters.truckTypeFilter ? filters.truckTypeFilter : "all"
              }
              onValueChange={(value) =>
                setters.setTruckTypeFilter(value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="w-full h-9 bg-surface-200 border-outline text-primary">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent className="bg-surface border-outline">
                <SelectItem
                  value="all"
                  className="text-primary hover:bg-surface-200"
                >
                  {t("allTypes")}
                </SelectItem>
                <SelectItem
                  value="plastic"
                  className="text-primary hover:bg-surface-200"
                >
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-primary" />
                    <span>{t("plastic")}</span>
                  </div>
                </SelectItem>
                <SelectItem
                  value="organic"
                  className="text-primary hover:bg-surface-200"
                >
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-primary" />
                    <Leaf className="h-3 w-3 text-primary" />
                    <span>{t("organic")}</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              value={
                !!filters.truckRouteFilter ? filters.truckRouteFilter : "all"
              }
              onValueChange={(value) =>
                setters.setTruckRouteFilter(value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="w-full h-9 bg-surface-200 border-outline text-primary">
                <SelectValue placeholder={t("allRoutes")} />
              </SelectTrigger>
              <SelectContent className="bg-surface border-outline">
                <SelectItem
                  value="all"
                  className="text-primary hover:bg-surface-200"
                >
                  {t("allRoutes")}
                </SelectItem>
                <SelectItem
                  value="Route A"
                  className="text-primary hover:bg-surface-200"
                >
                  {t("routeA")}
                </SelectItem>
                <SelectItem
                  value="Route B"
                  className="text-primary hover:bg-surface-200"
                >
                  {t("routeB")}
                </SelectItem>
                <SelectItem
                  value="Route C"
                  className="text-primary hover:bg-surface-200"
                >
                  {t("routeC")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Select
              value={
                !!filters.truckDriverFilter ? filters.truckDriverFilter : "all"
              }
              onValueChange={(value) =>
                setters.setTruckDriverFilter(value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="w-full h-9 bg-surface-200 border-outline text-primary">
                <SelectValue placeholder={t("allDrivers")} />
              </SelectTrigger>
              <SelectContent className="bg-surface border-outline">
                <SelectItem
                  value="all"
                  className="text-primary hover:bg-surface-200"
                >
                  {t("allDrivers")}
                </SelectItem>
                {trucksData.map((truck) => (
                  <SelectItem
                    key={truck.id}
                    value={truck.driver}
                    className="text-primary hover:bg-surface-200"
                  >
                    {truck.driver}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="h-9 px-3 bg-surface border-outline text-primary hover:bg-surface-200 hover:text-primary"
            >
              {commonT("clearFilters")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
