"use client";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import {
  OrganicTrashIcon,
  PlasticTrashIcon,
  TrashIcon,
} from "@/components/icons/trash-bin-icons";
import type { TWasteBin } from "@/types";
import {
  useWasteBinTranslations,
  useCommonTranslations,
} from "@/hooks/use-translations";

interface WasteBinCardViewProps {
  bins: TWasteBin[];
  onBinSelect: (bin: TWasteBin) => void;
  calculatePriority: (bin: TWasteBin) => number;
  formatDate: (dateString: string) => string;
  formatHealthStatus: (status: string) => string;
  formatGrinderStatus: (status?: string) => string;
  getStatusColor: (status: string) => string;
  getTypeColor: (type: string) => string;
  getHealthStatusColor: (healthStatus: string) => string;
  getGrinderStatusColor: (grinderStatus?: string) => string;
  getPriorityColor: (priority: number) => string;
  getPriorityText: (priority: number) => string;
}

export function WasteBinCardView({
  bins,
  onBinSelect,
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
}: WasteBinCardViewProps) {
  const tWasteBins = useWasteBinTranslations();
  const tCommon = useCommonTranslations();

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

  const getTranslatedWasteType = (wasteType: string) => {
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

  const getTranslatedStatus = (status: string) => {
    switch (status) {
      case "needs_collection":
        return tWasteBins("needsCollection");
      case "critical":
        return tWasteBins("critical");
      case "normal":
        return tWasteBins("normal");
      case "empty":
        return tWasteBins("empty");
      case "low":
        return tWasteBins("low");
      case "medium":
        return tWasteBins("medium");
      case "high":
        return tWasteBins("high");
      case "full":
        return tWasteBins("full");
      case "overflowing":
        return tWasteBins("overflowing");
      default:
        return status;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
      {bins.map((bin) => {
        const priority = calculatePriority(bin);
        return (
          <Card
            key={bin.id}
            className="hover:shadow-lg active:shadow-xl transition-all duration-200 cursor-pointer border hover:border-blue-200 active:border-blue-300 bg-white"
            onClick={() => onBinSelect(bin)}
          >
            {/* Header with Bin ID and Type */}
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getBinIcon(bin.wasteType, "w-8 h-8")}
                  <CardTitle className="text-lg font-bold text-gray-900">
                    {bin.id}
                  </CardTitle>
                </div>
                <Badge
                  variant="outline"
                  className={`text-sm font-medium ${getTypeColor(
                    bin.wasteType
                  )}`}
                >
                  {getTranslatedWasteType(bin.wasteType)}
                </Badge>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 mt-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">{bin.location}</span>
              </div>
            </CardHeader>

            {/* Content with Fill Level and Status */}
            <CardContent className="space-y-4">
              {/* Fill Level Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {tWasteBins("fillLevel")}
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {bin.fillLevel}%
                  </span>
                </div>
                <Progress value={bin.fillLevel} className="w-full h-2" />
                <div className="text-xs text-gray-500">
                  {tWasteBins("avgRate")}: {bin.averageFillRate}%/
                  {tWasteBins("day")}
                </div>
              </div>

              {/* Status and Priority Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {tCommon("status")}
                  </span>
                  <Badge
                    variant="outline"
                    className={`w-full justify-center text-sm ${getStatusColor(
                      bin.status
                    )}`}
                  >
                    {getTranslatedStatus(bin.status)}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {tWasteBins("priority")}
                  </span>
                  <Badge
                    variant="outline"
                    className={`w-full justify-center text-sm ${getPriorityColor(
                      priority
                    )}`}
                  >
                    {getPriorityText(priority)}
                  </Badge>
                </div>
              </div>

              {/* Health Status */}
              <div className="space-y-1">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {tWasteBins("healthStatus")}
                </span>
                <Badge
                  variant="outline"
                  className={`w-full justify-center text-sm ${getHealthStatusColor(
                    bin.healthStatus
                  )}`}
                >
                  {formatHealthStatus(bin.healthStatus)}
                </Badge>
              </div>

              {/* Additional Information */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {tWasteBins("lastCollected")}:
                  </span>
                  <span className="font-medium text-gray-700">
                    {formatDate(bin.lastCollection)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {tWasteBins("lastMaintenance")}:
                  </span>
                  <span className="font-medium text-gray-700">
                    {formatDate(bin.lastMaintenance)}
                  </span>
                </div>
                {bin.grinderStatus &&
                  bin.grinderStatus !== "not_applicable" &&
                  bin.fillLevel >= 70 &&
                  bin.fillLevel <= 80 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">
                        {tWasteBins("grinder")}:
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getGrinderStatusColor(
                          bin.grinderStatus
                        )}`}
                      >
                        {formatGrinderStatus(bin.grinderStatus)}
                      </Badge>
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
