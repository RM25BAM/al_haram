import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Building2, Clock, AlertTriangle } from "lucide-react";
import type { TWasteBin, TTruck } from "@/types";

interface LocationStatsProps {
  bins: TWasteBin[];
  trucks: TTruck[];
}

interface LocationData {
  name: string;
  binCount: number;
  truckCount: number;
  averageFillLevel: number;
  criticalBins: number;
  lastActivity: string;
}

export function LocationStats({ bins, trucks }: LocationStatsProps) {
  // Group bins by location
  const locationMap = new Map<string, LocationData>();

  bins.forEach((bin) => {
    const locationKey = bin.location;
    if (!locationMap.has(locationKey)) {
      locationMap.set(locationKey, {
        name: locationKey,
        binCount: 0,
        truckCount: 0,
        averageFillLevel: 0,
        criticalBins: 0,
        lastActivity: bin.lastCollection,
      });
    }

    const location = locationMap.get(locationKey)!;
    location.binCount += 1;
    location.averageFillLevel += bin.fillLevel;
    if (bin.status === "critical") {
      location.criticalBins += 1;
    }
    // Update last activity if more recent
    if (new Date(bin.lastCollection) > new Date(location.lastActivity)) {
      location.lastActivity = bin.lastCollection;
    }
  });

  // Add truck counts to locations
  trucks.forEach((truck) => {
    if (locationMap.has(truck.location)) {
      locationMap.get(truck.location)!.truckCount += 1;
    }
  });

  // Calculate averages
  locationMap.forEach((location) => {
    if (location.binCount > 0) {
      location.averageFillLevel = Math.round(
        location.averageFillLevel / location.binCount
      );
    }
  });

  const locations = Array.from(locationMap.values()).sort(
    (a, b) => b.binCount - a.binCount
  );

  const getLocationStatusColor = (location: LocationData) => {
    if (location.criticalBins > 0)
      return "bg-red-100 text-red-800 border-red-200";
    if (location.averageFillLevel > 75)
      return "bg-orange-100 text-orange-800 border-orange-200";
    if (location.averageFillLevel > 50)
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-green-100 text-green-800 border-green-200";
  };

  const getLocationStatus = (location: LocationData) => {
    if (location.criticalBins > 0) return "Critical";
    if (location.averageFillLevel > 75) return "High Fill";
    if (location.averageFillLevel > 50) return "Medium Fill";
    return "Normal";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {locations.map((location, index) => (
        <Card
          key={location.name}
          className="hover:shadow-lg transition-shadow duration-200 border hover:border-blue-200"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                {location.name}
              </CardTitle>
              <Badge
                variant="outline"
                className={`text-sm font-medium ${getLocationStatusColor(
                  location
                )}`}
              >
                {getLocationStatus(location)}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Bins
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {location.binCount}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Critical
                  </span>
                </div>
                <div className="text-2xl font-bold text-red-600">
                  {location.criticalBins}
                </div>
              </div>
            </div>

            {/* Average Fill Level */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Avg Fill Level
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {location.averageFillLevel}%
                </span>
              </div>
              <Progress
                value={location.averageFillLevel}
                className="w-full h-2"
              />
            </div>

            {/* Additional Info */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Last Activity:
                </span>
                <span className="font-medium text-gray-700">
                  {formatDate(location.lastActivity)}
                </span>
              </div>
              {location.truckCount > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Active Trucks:</span>
                  <Badge
                    variant="outline"
                    className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {location.truckCount}
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
