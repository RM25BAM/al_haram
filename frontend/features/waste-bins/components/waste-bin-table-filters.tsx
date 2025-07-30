"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Download,
  FileText,
  Search,
  X,
  Filter,
  Grid3X3,
  Table as TableIcon,
  ChevronDown,
  FileSpreadsheet,
} from "lucide-react";
import {
  useWasteBinTranslations,
  useCommonTranslations,
} from "@/hooks/use-translations";

type ViewMode = "card" | "table";

interface WasteBinTableFiltersProps {
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
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onExportToCSV: () => void;
  onExportToPDF: () => void;
  onGenerateDetailedReport: () => void;
  onGenerateReport: () => void;
  totalBins: number;
  filteredBins: number;
}

export function WasteBinTableFilters({
  filters,
  setters,
  clearFilters,
  viewMode,
  onViewModeChange,
  onExportToCSV,
  onExportToPDF,
  onGenerateDetailedReport,
  onGenerateReport,
  totalBins,
  filteredBins,
}: WasteBinTableFiltersProps) {
  const tWasteBins = useWasteBinTranslations();
  const tCommon = useCommonTranslations();

  const hasActiveFilters =
    (filters.binStatusFilter && filters.binStatusFilter !== "all") ||
    (filters.binTypeFilter && filters.binTypeFilter !== "all") ||
    (filters.binFillLevelFilter && filters.binFillLevelFilter !== "all") ||
    (filters.binLocationFilter && filters.binLocationFilter !== "all") ||
    filters.searchQuery;

  return (
    <div className="bg-gray-50/50 border-b">
      {/* Top Row: Title + View Toggle + Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-4 py-2 gap-2 sm:gap-0 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
          <h3 className="font-semibold text-gray-900 text-base sm:text-lg lg:text-xl">
            {tWasteBins("title")}
          </h3>
          <span className="text-sm sm:text-base text-gray-500">
            {filteredBins} {tCommon("of")} {totalBins}
          </span>
          <Badge
            variant="outline"
            className="text-xs bg-blue-50 text-blue-700 border-blue-200"
          >
            {viewMode === "card"
              ? tWasteBins("cardView")
              : tWasteBins("tableView")}
          </Badge>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* View Toggle */}
          <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
            <Button
              variant={viewMode === "card" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("card")}
              className="h-8 px-3 rounded-none border-0"
            >
              <Grid3X3 className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">{tWasteBins("cards")}</span>
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("table")}
              className="h-8 px-3 rounded-none border-0"
            >
              <TableIcon className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">{tWasteBins("table")}</span>
            </Button>
          </div>

          {/* Export/Report Buttons */}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 sm:h-9 lg:h-10 text-sm sm:text-base px-3 sm:px-4"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {tCommon("export")}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onExportToCSV}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  {tWasteBins("exportAsCSV")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onExportToPDF}>
                  <FileText className="h-4 w-4 mr-2" />
                  {tWasteBins("exportAsPDF")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 sm:h-9 lg:h-10 text-sm sm:text-base px-3 sm:px-4"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {tWasteBins("reports")}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onGenerateDetailedReport}>
                  <FileText className="h-4 w-4 mr-2" />
                  {tWasteBins("detailedReport")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onGenerateReport}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  {tWasteBins("summaryReport")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Search and Filter Row */}
      <div className="px-3 sm:px-4 py-3 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={tWasteBins("searchPlaceholder")}
              value={filters.searchQuery}
              onChange={(e) => setters.setSearchQuery(e.target.value)}
              className="pl-10 h-9 sm:h-10 text-sm sm:text-base"
            />
            {filters.searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setters.setSearchQuery("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="h-9 sm:h-10 px-3 sm:px-4 text-sm sm:text-base whitespace-nowrap"
            >
              <X className="h-4 w-4 mr-2" />
              {tCommon("clearFilters")}
            </Button>
          )}
        </div>

        {/* Filter Selects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Status Filter */}
          <Select
            value={filters.binStatusFilter}
            onValueChange={setters.setBinStatusFilter}
          >
            <SelectTrigger className="h-9 sm:h-10 text-sm sm:text-base">
              <SelectValue placeholder={tWasteBins("statusFilter")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{tWasteBins("statusFilter")}</SelectItem>
              <SelectItem value="normal">{tWasteBins("normal")}</SelectItem>
              <SelectItem value="needs_collection">
                {tWasteBins("needsCollection")}
              </SelectItem>
              <SelectItem value="critical">{tWasteBins("critical")}</SelectItem>
            </SelectContent>
          </Select>

          {/* Type Filter */}
          <Select
            value={filters.binTypeFilter}
            onValueChange={setters.setBinTypeFilter}
          >
            <SelectTrigger className="h-9 sm:h-10 text-sm sm:text-base">
              <SelectValue placeholder={tWasteBins("typeFilter")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{tWasteBins("typeFilter")}</SelectItem>
              <SelectItem value="Organic">{tWasteBins("organic")}</SelectItem>
              <SelectItem value="Plastic">{tWasteBins("plastic")}</SelectItem>
              {/* <SelectItem value="General">{tWasteBins("general")}</SelectItem>
              <SelectItem value="Recycling">
                {tWasteBins("recycling")}
              </SelectItem>
              <SelectItem value="Hazardous">
                {tWasteBins("hazardous")}
              </SelectItem> */}
            </SelectContent>
          </Select>

          {/* Fill Level Filter */}
          <Select
            value={filters.binFillLevelFilter}
            onValueChange={setters.setBinFillLevelFilter}
          >
            <SelectTrigger className="h-9 sm:h-10 text-sm sm:text-base">
              <SelectValue placeholder={tWasteBins("fillLevelFilter")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {tWasteBins("fillLevelFilter")}
              </SelectItem>
              <SelectItem value="0-25">
                {tWasteBins("fillRange0to25")}
              </SelectItem>
              <SelectItem value="26-50">
                {tWasteBins("fillRange26to50")}
              </SelectItem>
              <SelectItem value="51-75">
                {tWasteBins("fillRange51to75")}
              </SelectItem>
              <SelectItem value="76-100">
                {tWasteBins("fillRange76to100")}
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Location Filter */}
          <Select
            value={filters.binLocationFilter}
            onValueChange={setters.setBinLocationFilter}
          >
            <SelectTrigger className="h-9 sm:h-10 text-sm sm:text-base">
              <SelectValue placeholder={tWasteBins("locationFilter")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {tWasteBins("locationFilter")}
              </SelectItem>
              <SelectItem value="Mataf">Mataf Area</SelectItem>
              <SelectItem value="King Abdul Aziz Gate">
                King Abdul Aziz Gate
              </SelectItem>
              <SelectItem value="Safa and Marwa">
                Safa and Marwa Galleries
              </SelectItem>
              <SelectItem value="Prophet's Gate">Prophet's Gate</SelectItem>
              <SelectItem value="Al-Salam Gate">Al-Salam Gate</SelectItem>
              <SelectItem value="Maqam Ibrahim">Maqam Ibrahim Area</SelectItem>
              <SelectItem value="Ajyad">Ajyad Expansion Area</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
