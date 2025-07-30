"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X, Filter } from "lucide-react";
import {
  useWasteBinTranslations,
  useCommonTranslations,
} from "@/hooks/use-translations";

interface WasteBinFiltersProps {
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
  filteredCount: number;
}

export function WasteBinFilters({
  filters,
  setters,
  clearFilters,
  totalBins,
  filteredCount,
}: WasteBinFiltersProps) {
  const t = useWasteBinTranslations();
  const common = useCommonTranslations();

  const hasActiveFilters =
    (filters.binStatusFilter && filters.binStatusFilter !== "all") ||
    (filters.binTypeFilter && filters.binTypeFilter !== "all") ||
    (filters.binFillLevelFilter && filters.binFillLevelFilter !== "all") ||
    (filters.binLocationFilter && filters.binLocationFilter !== "all") ||
    filters.searchQuery;

  return (
    <div className="bg-surface border-outline border rounded-lg overflow-hidden">
      {/* Super Compact Filter Bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-surface border-b border-outline">
        {/* Title and Count */}
        <div className="flex items-center gap-2 min-w-0">
          <Filter className="h-4 w-4 text-primary/50 flex-shrink-0" />
          <h3 className="font-semibold text-primary text-sm">{t("title")}</h3>
          <span className="text-xs text-primary/70 whitespace-nowrap">
            {filteredCount} {common("of")} {totalBins}
          </span>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/50 h-4 w-4" />
          <Input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={filters.searchQuery}
            onChange={(e) => setters.setSearchQuery(e.target.value)}
            className="pl-10 h-8 text-xs bg-surface-200 border-outline text-primary placeholder:text-primary/50"
          />
        </div>

        {/* Inline Filter Dropdowns */}
        <div className="flex items-center gap-2">
          <Select
            value={filters.binStatusFilter}
            onValueChange={setters.setBinStatusFilter}
          >
            <SelectTrigger className="h-8 w-[80px] bg-surface-200 border-outline text-primary [&>span]:text-primary [&[data-placeholder]>span]:text-primary/50">
              <SelectValue placeholder={t("statusFilter")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("statusFilter")}</SelectItem>
              <SelectItem value="normal">{t("normal")}</SelectItem>
              <SelectItem value="needs_collection">
                {t("needsCollection")}
              </SelectItem>
              <SelectItem value="critical">{t("critical")}</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.binTypeFilter}
            onValueChange={setters.setBinTypeFilter}
          >
            <SelectTrigger className="h-8 w-[80px] bg-surface-200 border-outline text-primary [&>span]:text-primary [&[data-placeholder]>span]:text-primary/50">
              <SelectValue placeholder={t("typeFilter")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("typeFilter")}</SelectItem>
              <SelectItem value="Plastic">{t("plastic")}</SelectItem>
              {/* <SelectItem value="Organic">{t("organic")}</SelectItem>
              <SelectItem value="General">{t("general")}</SelectItem>
              <SelectItem value="Recycling">{t("recycling")}</SelectItem>
              <SelectItem value="Hazardous">{t("hazardous")}</SelectItem> */}
            </SelectContent>
          </Select>

          <Select
            value={filters.binFillLevelFilter}
            onValueChange={setters.setBinFillLevelFilter}
          >
            <SelectTrigger className="h-8 w-[90px] bg-surface-200 border-outline text-primary [&>span]:text-primary [&[data-placeholder]>span]:text-primary/50">
              <SelectValue placeholder={t("fillLevelFilter")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("fillLevelFilter")}</SelectItem>
              <SelectItem value="0-25">{t("fillRange0to25")}</SelectItem>
              <SelectItem value="26-50">{t("fillRange26to50")}</SelectItem>
              <SelectItem value="51-75">{t("fillRange51to75")}</SelectItem>
              <SelectItem value="76-100">{t("fillRange76to100")}</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.binLocationFilter}
            onValueChange={setters.setBinLocationFilter}
          >
            <SelectTrigger className="h-8 w-[100px] bg-surface-200 border-outline text-primary [&>span]:text-primary [&[data-placeholder]>span]:text-primary/50">
              <SelectValue placeholder={t("locationFilter")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("locationFilter")}</SelectItem>
              <SelectItem value="Gate 1">{t("gate1")}</SelectItem>
              <SelectItem value="Gate 2">{t("gate2")}</SelectItem>
              <SelectItem value="Gate 3">{t("gate3")}</SelectItem>
              <SelectItem value="Courtyard">{t("courtyard")}</SelectItem>
              <SelectItem value="Prayer Hall">{t("prayerHall")}</SelectItem>
              <SelectItem value="Parking">{t("parking")}</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-8 px-2 text-xs text-primary/70 hover:text-primary hover:bg-surface-200"
            >
              <X className="h-3 w-3 mr-1" />
              {common("clearFilters")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
