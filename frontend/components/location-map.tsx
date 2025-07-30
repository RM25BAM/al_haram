"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Trash2 } from "lucide-react";
import React from "react";
import type { TLocation, TWasteBin } from "@/types";

interface LocationMapProps {
  locations: TLocation[];
  bins: TWasteBin[];
  onLocationClick: (locationName: string) => void;
  onBinClick: (bin: TWasteBin) => void;
  selectedLocation: string | null;
}

// Bin icon component with different colors based on fill level
const BinIcon = ({
  fillLevel,
  isSelected,
  onClick,
}: {
  fillLevel: number;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const getBinColor = () => {
    if (fillLevel >= 100) return "text-black"; // Black - completely full
    if (fillLevel >= 85) return "text-orange-600"; // Orange - crushing mode (85-99%)
    if (fillLevel >= 70) return "text-yellow-500"; // Yellow - 70-84%
    return "text-green-500"; // Green - below 70%
  };

  return (
    <div
      className={`relative transition-all duration-200 cursor-pointer ${
        isSelected ? "scale-125" : "hover:scale-110"
      }`}
      onClick={onClick}
    >
      {/* Bin Icon using Lucide */}
      <Trash2 size={24} className={`${getBinColor()} drop-shadow-md`} />

      {/* Fill level indicator */}
      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white border border-gray-300 flex items-center justify-center">
        <div
          className={`w-2 h-2 rounded-full ${getBinColor().replace(
            "text-",
            "bg-"
          )}`}
        ></div>
      </div>

      {/* Fill percentage label */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 bg-white px-1 rounded shadow-sm">
        {fillLevel}%
      </div>
    </div>
  );
};

export function LocationMap({
  locations,
  bins,
  onLocationClick,
  onBinClick,
  selectedLocation,
}: LocationMapProps) {
  // Calculate average fill level for each location
  const getLocationFillLevel = (locationName: string) => {
    const locationBins = bins.filter((bin) => bin.location === locationName);
    if (locationBins.length === 0) return 0;
    const totalFill = locationBins.reduce((sum, bin) => sum + bin.fillLevel, 0);
    return Math.round(totalFill / locationBins.length);
  };

  // Get location status for styling
  const getLocationStatus = (locationName: string) => {
    const locationBins = bins.filter((bin) => bin.location === locationName);
    const criticalBins = locationBins.filter((bin) => bin.fillLevel >= 90);
    const needsCollectionBins = locationBins.filter(
      (bin) => bin.status === "needs_collection"
    );

    if (criticalBins.length > 0) return "critical";
    if (needsCollectionBins.length > 0) return "needs_collection";
    return "normal";
  };

  // Get bins for a location
  const getLocationBins = (locationName: string) => {
    return bins.filter((bin) => bin.location === locationName);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5" />
          Masjid al-Haram Waste Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Simulated Map View */}
        <div className="relative bg-gray-100 rounded-lg h-96 mb-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
            {/* Grid pattern to simulate map */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 grid-rows-6 h-full">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border border-gray-300" />
                ))}
              </div>
            </div>

            {/* Area Labels for Masjid al-Haram */}
            <div className="absolute top-4 left-4 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow">
              Kaaba & Mataf
            </div>
            <div className="absolute top-20 right-8 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow">
              Safa & Marwa
            </div>
            <div className="absolute bottom-16 left-8 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow">
              Main Gates Area
            </div>
            <div className="absolute top-32 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow">
              Maqam Ibrahim
            </div>

            {/* Location markers */}
            {locations.map((location, index) => {
              const locationBins = getLocationBins(location.name);
              const fillLevel = getLocationFillLevel(location.name);
              const status = getLocationStatus(location.name);
              const isSelected = selectedLocation === location.name;

              // Position locations across the map area
              const positions = [
                { top: "20%", left: "25%" },
                { top: "35%", left: "60%" },
                { top: "50%", left: "30%" },
                { top: "65%", left: "70%" },
                { top: "75%", left: "20%" },
                { top: "25%", left: "80%" },
                { top: "45%", left: "15%" },
                { top: "60%", left: "45%" },
              ];

              const position = positions[index % positions.length];

              return (
                <div
                  key={location.id}
                  className="absolute"
                  style={{ top: position.top, left: position.left }}
                >
                  {/* Show individual bins for this location */}
                  {locationBins.map((bin, binIndex) => {
                    const binOffset = binIndex * 30; // Offset bins horizontally
                    return (
                      <div
                        key={bin.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${binOffset}px` }}
                        title={`${bin.id} - ${bin.fillLevel}% full`}
                      >
                        <BinIcon
                          fillLevel={bin.fillLevel}
                          isSelected={false}
                          onClick={() => onBinClick(bin)}
                        />
                      </div>
                    );
                  })}

                  {/* Location Name */}
                  <div
                    className="absolute top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-800 bg-white px-2 py-1 rounded shadow-sm whitespace-nowrap cursor-pointer hover:bg-gray-50"
                    onClick={() => onLocationClick(location.name)}
                  >
                    {location.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Location Details */}
        {selectedLocation && (
          <div className="mt-4">
            <h4 className="font-medium mb-3">Bins at {selectedLocation}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {getLocationBins(selectedLocation).map((bin) => (
                <div
                  key={bin.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => onBinClick(bin)}
                >
                  <div>
                    <div className="font-medium">{bin.id}</div>
                    <div className="text-sm text-gray-500">{bin.wasteType}</div>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={`${
                        bin.fillLevel >= 90
                          ? "bg-red-500"
                          : bin.status === "needs_collection"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      } text-white`}
                    >
                      {bin.fillLevel}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Map Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>Below 70% Full</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span>70-84% Full</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-600 rounded-full" />
            <span>🗜️ 85-99% Crushing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-black rounded-full" />
            <span>100% Full</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
