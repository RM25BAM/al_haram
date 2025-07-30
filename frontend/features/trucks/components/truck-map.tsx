"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InteractiveMap } from "@/components/map";
import { TruckMapLegend } from "@/components/map/truck-map-legend";
import { useTrucks } from "../hooks/use-trucks";
import { useTranslations } from "next-intl";
import { AlertTriangle } from "lucide-react";
import type { TTruck } from "@/types";

interface TruckMapProps {
  onTruckSelect: (truck: TTruck) => void;
}

export function TruckMap({ onTruckSelect }: TruckMapProps) {
  const t = useTranslations("trucks");
  const tCommon = useTranslations("common");

  const { trucks, filteredTrucks } = useTrucks();

  const criticalTrucks = filteredTrucks.filter(
    (truck) => truck.capacity >= 90 || truck.fuelLevel <= 25
  );

  const translateStatus = (status: string) => {
    switch (status) {
      case "available":
        return t("available");
      case "collecting":
        return t("collecting");
      case "en_route":
        return t("enRoute");
      case "maintenance":
        return t("maintenance");
      default:
        return status.replace("_", " ");
    }
  };

  const translateWasteType = (wasteType: string) => {
    switch (wasteType.toLowerCase()) {
      case "plastic":
        return t("plastic");
      case "organic":
        return t("organic");
      default:
        return wasteType;
    }
  };

  return (
    <Card className="overflow-hidden bg-surface border-outline">
      {/* Header */}
      <div className="bg-surface border-b border-outline px-3 sm:px-4 py-3">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-primary text-base sm:text-lg lg:text-xl">
            {t("truckMap")}
          </h3>
          <span className="text-sm sm:text-base text-primary/70">
            {filteredTrucks.length} {tCommon("of")} {trucks.length}
          </span>
        </div>
      </div>

      <CardContent className="px-3 sm:px-6 pt-6 bg-surface">
        <div className="relative">
          <InteractiveMap
            bins={[]} // No bins for truck map
            trucks={filteredTrucks}
            isTruckMap
            className="h-[400px] sm:h-[500px] lg:h-[600px] w-full"
          />

          {/* Truck Map Legend */}
          {/* <TruckMapLegend className="absolute top-4 right-4 z-1000 w-48 bg-white/95 backdrop-blur-sm" /> */}
        </div>

        {/* Critical Trucks Alert */}
        {criticalTrucks.length > 0 && (
          <div className="mt-6 p-4 bg-surface-200 border border-outline rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <h4 className="font-semibold text-primary text-base sm:text-lg">
                {t("criticalTrucksAlert")}
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {criticalTrucks.map((truck) => (
                <div
                  key={truck.id}
                  className="p-3 bg-surface rounded-lg border border-outline cursor-pointer hover:bg-surface-200 transition-colors"
                  onClick={() => onTruckSelect(truck)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm sm:text-base text-primary">
                        {truck.id}
                      </p>
                      <p className="text-xs sm:text-sm text-primary/70">
                        {truck.driver}
                      </p>
                      <p className="text-xs sm:text-sm text-primary">
                        {translateWasteType(truck.wasteType)}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          truck.capacity >= 90 ? "destructive" : "default"
                        }
                        className="text-xs sm:text-sm"
                      >
                        {truck.capacity >= 90
                          ? `${truck.capacity}%`
                          : `${truck.fuelLevel}% fuel`}
                      </Badge>
                      <p className="text-xs text-primary/70 mt-1">
                        {translateStatus(truck.status)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
