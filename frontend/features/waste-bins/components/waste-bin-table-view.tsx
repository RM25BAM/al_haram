"use client";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Calendar, ArrowUpDown } from "lucide-react";
import {
  OrganicTrashIcon,
  PlasticTrashIcon,
  TrashIcon,
} from "@/components/icons/trash-bin-icons";
import type { TWasteBin } from "@/types";
import { useWasteBinTranslations } from "@/hooks/use-translations";

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

interface WasteBinTableViewProps {
  bins: TWasteBin[];
  onBinSelect: (bin: TWasteBin) => void;
  onSort: (field: SortField) => void;
  calculatePriority: (bin: TWasteBin) => number;
  formatDate: (dateString: string) => string;
  formatHealthStatus: (status: string) => string;
  getStatusColor: (status: string) => string;
  getTypeColor: (type: string) => string;
  getHealthStatusColor: (healthStatus: string) => string;
  getPriorityColor: (priority: number) => string;
  getPriorityText: (priority: number) => string;
}

export function WasteBinTableView({
  bins,
  onBinSelect,
  onSort,
  calculatePriority,
  formatDate,
  formatHealthStatus,
  getStatusColor,
  getTypeColor,
  getHealthStatusColor,
  getPriorityColor,
  getPriorityText,
}: WasteBinTableViewProps) {
  const t = useWasteBinTranslations();

  const translateWasteType = (wasteType: string) => {
    switch (wasteType.toLowerCase()) {
      case "general":
        return t("general");
      case "recycling":
        return t("recycling");
      case "organic":
        return t("organic");
      case "hazardous":
        return t("hazardous");
      case "plastic":
        return t("plastic");
      default:
        return wasteType;
    }
  };

  const translateStatus = (status: string) => {
    switch (status) {
      case "needs_collection":
        return t("needsCollection");
      case "critical":
        return t("critical");
      case "normal":
        return t("normal");
      default:
        return status;
    }
  };

  const translateLocation = (location: string) => {
    switch (location.toLowerCase()) {
      case "gate 1":
        return t("gate1");
      case "gate 2":
        return t("gate2");
      case "gate 3":
        return t("gate3");
      case "courtyard":
        return t("courtyard");
      case "prayer hall":
        return t("prayerHall");
      case "parking":
        return t("parking");
      default:
        return location;
    }
  };
  const getBinIcon = (wasteType: string, className?: string) => {
    switch (wasteType.toLowerCase()) {
      case "organic":
        return <OrganicTrashIcon />;
      case "plastic":
        return <PlasticTrashIcon />;
      default:
        return <TrashIcon />;
    }
  };

  const SortableHeader = ({
    field,
    children,
  }: {
    field: SortField;
    children: React.ReactNode;
  }) => (
    <button
      onClick={() => onSort(field)}
      className="flex items-center gap-1 text-left font-medium text-gray-600 hover:text-gray-900 transition-colors text-xs sm:text-sm lg:text-base"
    >
      {children}
      <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4" />
    </button>
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50/30 border-b">
          <tr>
            <th className="text-left py-3 px-4 font-medium text-sm border-r border-gray-200 last:border-r-0">
              <SortableHeader field="id">{t("binId")}</SortableHeader>
            </th>
            <th className="text-left py-3 px-4 font-medium text-sm border-r border-gray-200 last:border-r-0 hidden sm:table-cell">
              {t("binType")}
            </th>
            <th className="text-left py-3 px-4 font-medium text-sm border-r border-gray-200 last:border-r-0">
              <SortableHeader field="fillLevel">
                {t("fillLevel")}
              </SortableHeader>
            </th>
            <th className="text-left py-3 px-4 font-medium text-sm border-r border-gray-200 last:border-r-0">
              <SortableHeader field="status">
                {t("statusFilter")}
              </SortableHeader>
            </th>
            <th className="text-left py-3 px-4 font-medium text-sm border-r border-gray-200 last:border-r-0 hidden sm:table-cell">
              <SortableHeader field="location">
                {t("locationFilter")}
              </SortableHeader>
            </th>
            <th className="text-left py-3 px-4 font-medium text-sm border-r border-gray-200 last:border-r-0 hidden md:table-cell">
              <SortableHeader field="priority">{t("priority")}</SortableHeader>
            </th>
            <th className="text-left py-3 px-4 font-medium text-sm border-r border-gray-200 last:border-r-0 hidden lg:table-cell">
              <SortableHeader field="healthStatus">
                {t("healthStatus")}
              </SortableHeader>
            </th>
            <th className="text-left py-3 px-4 font-medium text-sm border-r border-gray-200 last:border-r-0 hidden xl:table-cell">
              <SortableHeader field="lastCollected">
                {t("lastCollected")}
              </SortableHeader>
            </th>
            <th className="text-left py-3 px-4 font-medium text-sm border-r border-gray-200 last:border-r-0 hidden xl:table-cell">
              <SortableHeader field="lastMaintenance">
                {t("lastMaintenance")}
              </SortableHeader>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {bins.map((bin) => {
            const priority = calculatePriority(bin);
            return (
              <tr
                key={bin.id}
                className="hover:bg-blue-50/50 active:bg-blue-100/50 transition-colors cursor-pointer border-l-2 border-transparent hover:border-blue-200 active:border-blue-300 border-b border-gray-200"
                onClick={() => onBinSelect(bin)}
              >
                {/* Bin ID Column */}
                <td className="py-3 px-4 border-r border-gray-200">
                  <div className="font-medium text-gray-900 text-base">
                    {bin.id}
                  </div>
                  {/* Mobile: Show type and location below ID */}
                  <div className="sm:hidden mt-1 space-y-1">
                    <div className="flex items-center gap-2">
                      {getBinIcon(bin.wasteType, "w-5 h-5")}
                      <Badge
                        variant="outline"
                        className={`text-xs ${getTypeColor(bin.wasteType)}`}
                      >
                        {translateWasteType(bin.wasteType)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">
                        {translateLocation(bin.location)}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Type Column */}
                <td className="py-3 px-4 hidden sm:table-cell border-r border-gray-200">
                  <div className="flex items-center gap-2">
                    {getBinIcon(bin.wasteType, "w-6 h-6")}
                    <Badge
                      variant="outline"
                      className={`text-sm ${getTypeColor(bin.wasteType)}`}
                    >
                      {translateWasteType(bin.wasteType)}
                    </Badge>
                  </div>
                </td>

                {/* Fill Level Column */}
                <td className="py-3 px-4 border-r border-gray-200">
                  <div className="flex items-center gap-3">
                    <Progress value={bin.fillLevel} className="w-20 h-2" />
                    <span className="text-base font-medium text-gray-600 min-w-[3rem]">
                      {bin.fillLevel}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {bin.averageFillRate}%/{t("day")}
                  </div>
                </td>

                {/* Status Column */}
                <td className="py-3 px-4 border-r border-gray-200">
                  <Badge
                    variant="outline"
                    className={`text-sm ${getStatusColor(bin.status)}`}
                  >
                    {translateStatus(bin.status)}
                  </Badge>
                </td>

                {/* Location Column */}
                <td className="py-3 px-4 hidden sm:table-cell border-r border-gray-200">
                  <div className="flex items-center gap-2 text-base text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate max-w-[120px]">
                      {translateLocation(bin.location)}
                    </span>
                  </div>
                </td>

                {/* Priority Column */}
                <td className="py-3 px-4 hidden md:table-cell border-r border-gray-200">
                  <Badge
                    variant="outline"
                    className={`text-sm ${getPriorityColor(priority)}`}
                  >
                    {getPriorityText(priority)}
                  </Badge>
                </td>

                {/* Health Status Column */}
                <td className="py-3 px-4 hidden lg:table-cell border-r border-gray-200">
                  <Badge
                    variant="outline"
                    className={`text-sm ${getHealthStatusColor(
                      bin.healthStatus
                    )}`}
                  >
                    {formatHealthStatus(bin.healthStatus)}
                  </Badge>
                </td>

                {/* Last Collected Column */}
                <td className="py-3 px-4 hidden xl:table-cell border-r border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {formatDate(bin.lastCollection)}
                  </div>
                </td>

                {/* Last Maintenance Column */}
                <td className="py-3 px-4 hidden xl:table-cell">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {formatDate(bin.lastMaintenance)}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
