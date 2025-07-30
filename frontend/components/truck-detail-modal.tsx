import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, MapPin, Clock, Route, Fuel, Calendar, X } from "lucide-react";
import type { TTruck } from "@/types";
import { useTranslations } from "next-intl";
import { getTranslatedRoutes } from "@/lib/utils";

interface TruckDetailModalProps {
  truck: TTruck | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TruckDetailModal({
  truck,
  isOpen,
  onClose,
}: TruckDetailModalProps) {
  const t = useTranslations("truckDetail");
  const tRoutes = useTranslations("routes");
  
  if (!truck) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-primary text-white";
      case "collecting":
        return "bg-secondary text-white";
      case "en_route":
        return "bg-orange-500 text-white";
      case "maintenance":
        return "bg-red-500 text-white";
      default:
        return "bg-surface-200 text-primary";
    }
  };

  const formatTime = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-y-auto bg-surface border-outline [&>button]:hidden"
        style={{ zIndex: 9999 }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-primary">
            <span>{t("title", { truckId: truck.id })}</span>
            <div className="flex items-center gap-3">
              <Badge className={`${getStatusColor(truck.status)}`}>
                {t(truck.status as keyof typeof t).toUpperCase()}
              </Badge>
              <DialogClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none text-primary hover:text-primary/80">
                <X className="h-4 w-4" />
                <span className="sr-only">{t("close")}</span>
              </DialogClose>
            </div>
          </DialogTitle>
          <DialogDescription className="text-primary/80">
            {t("description", { truckId: truck.id })}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card className="bg-surface-200 border-outline">
            <CardHeader>
              <CardTitle className="text-lg text-primary">
                {t("vehicleInformation")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary/70" />
                <span className="font-medium text-primary">{t("driver")}:</span>
                <span className="text-primary">{truck.driver}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary/70" />
                <span className="font-medium text-primary">
                  {t("currentLocation")}:
                </span>
                <span className="text-primary">{truck.location}</span>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2 text-primary">
                  <span>{t("loadCapacity")}</span>
                  <span className="font-medium">{truck.capacity}%</span>
                </div>
                <Progress
                  value={truck.capacity}
                  className={`h-3 bg-surface-200 ${
                    truck.capacity > 80
                      ? "[&>div]:bg-red-500"
                      : "[&>div]:bg-secondary"
                  }`}
                />
              </div>

              <div className="flex items-center gap-2">
                <Route className="h-4 w-4 text-primary/70" />
                <span className="font-medium text-primary">{t("currentRoute")}:</span>
                <Badge
                  variant="outline"
                  className="border-primary/20 text-primary"
                >
                  {getTranslatedRoutes(truck.route, tRoutes)}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium text-primary">{t("wasteType")}:</span>
                <Badge
                  variant="outline"
                  className={`border-primary/20 ${
                    truck.wasteType === "plastic"
                      ? "bg-surface-200 text-primary"
                      : truck.wasteType === "organic"
                        ? "bg-surface-200 text-primary"
                        : "bg-surface-200 text-primary"
                  }`}
                >
                  {t(truck.wasteType.toLowerCase() as keyof typeof t)}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <Fuel className="h-4 w-4 text-primary/70" />
                <span className="font-medium text-primary">{t("fuelLevel")}:</span>
                <span className="text-primary">{truck.fuelLevel}%</span>
              </div>
            </CardContent>
          </Card>

          {/* Schedule Information */}
          <Card className="bg-surface-200 border-outline">
            <CardHeader>
              <CardTitle className="text-lg text-primary">
                {t("scheduleAndTiming")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {truck.nextPickup && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary/70" />
                  <span className="font-medium text-primary">{t("nextPickup")}:</span>
                  <span className="text-primary">{truck.nextPickup}</span>
                </div>
              )}

              {truck.estimatedCompletion && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary/70" />
                  <span className="font-medium text-primary">
                    {t("estimatedCompletion")}:
                  </span>
                  <span className="text-primary">
                    {formatTime(truck.estimatedCompletion)}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <span className="font-medium text-primary">
                  {t("totalDistanceToday")}:
                </span>
                <span className="text-primary">{truck.totalDistance} {t("km")}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium text-primary">
                  {t("collectionsToday")}:
                </span>
                <span className="text-primary">{truck.collectionsToday}</span>
              </div>
            </CardContent>
          </Card>

          {/* Assigned Bins */}
          <Card className="bg-surface-200 border-outline">
            <CardHeader>
              <CardTitle className="text-lg text-primary">
                {t("assignedBins")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {truck.assignedBins.map((binId, index) => (
                  <div
                    key={binId}
                    className="flex justify-between items-center p-2 bg-surface rounded border border-outline"
                  >
                    <span className="font-medium text-primary">{binId}</span>
                    <Badge
                      variant="outline"
                      className={`text-xs border-primary/20 ${
                        index < 2
                          ? "bg-primary text-white"
                          : "bg-surface-200 text-primary"
                      }`}
                    >
                      {index < 2 ? t("completed") : t("pending")}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Route History */}
          <Card className="bg-surface-200 border-outline">
            <CardHeader>
              <CardTitle className="text-lg text-primary">
                {t("recentRouteHistory")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {truck.routeHistory.map((route, index) => (
                  <div
                    key={`${route.date}-${index}`}
                    className="flex justify-between items-center p-3 bg-surface rounded-lg border border-outline"
                  >
                    <div>
                      <div className="font-medium text-primary">
                        {formatTime(route.date)}
                      </div>
                      <div className="text-sm text-primary/70">
                        {route.route} - {route.distance} {t("km")}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-primary/20 text-primary bg-surface-200"
                    >
                      {route.collections} {t("collections")}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
