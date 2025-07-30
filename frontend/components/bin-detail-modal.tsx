import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Clock,
  Activity,
  AlertTriangle,
  CheckCircle,
  Wrench,
  Truck,
  Calendar,
  TrendingUp,
  BarChart3,
  Navigation,
  Phone,
  Wind,
} from "lucide-react";
import type { TTreatmentMethod } from "@/types";
import { useSocketData } from "@/lib/store/socketStore";
import { TreatmentAnalysis } from "@/components/treatment-analysis";
import { useTranslations } from "next-intl";
import { useCommonTranslations } from "@/hooks/use-translations";

interface BinDetailModalProps {
  binId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onScheduleCollection?: (binId: string) => void;
  onReportIssue?: (binId: string) => void;
  onNavigate?: (coordinates: { lat: number; lng: number }) => void;
  treatmentMethodsData: TTreatmentMethod[];
}

export function BinDetailModal({
  binId,
  isOpen,
  onClose,
  onScheduleCollection,
  onReportIssue,
  onNavigate,
  treatmentMethodsData = [],
}: BinDetailModalProps) {
  const t = useTranslations("binDetail");
  const tCommon = useCommonTranslations();
  // Get the latest bin data from socket store using the binId
  const { bins } = useSocketData();
  const bin = bins.find((b) => b.id === binId);

  if (!bin) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-500";
      case "needs_collection":
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  const getFillLevelColor = (fillLevel: number) => {
    if (fillLevel >= 95) return "bg-red-600";
    if (fillLevel >= 90) return "bg-red-500";
    if (fillLevel >= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getHealthStatusIcon = (health: string) => {
    switch (health) {
      case "needs_cleaning":
        return <Wrench className="h-4 w-4" />;
      case "maintenance_required":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getOdorLevelColor = (odorLevel: string) => {
    switch (odorLevel) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "moderate":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Calculate estimated time until full
  const getEstimatedTimeUntilFull = () => {
    const remainingCapacity = 100 - bin.fillLevel;
    const daysUntilFull = remainingCapacity / bin.averageFillRate;

    if (daysUntilFull < 1) {
      const hoursUntilFull = daysUntilFull * 24;
      return `${Math.round(hoursUntilFull)} hours`;
    }
    return `${Math.round(daysUntilFull)} day`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-5xl max-h-[90vh] overflow-y-auto bg-surface border-outline"
        style={{ zIndex: 9999 }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-primary">
            <div className="flex items-center gap-3">
              <span className="text-xl">🗑️ {t("title", { binId: bin.id })}</span>
              <Badge className={`${getStatusColor(bin.status)} text-white`}>
                {t(bin.status as keyof typeof t).toUpperCase()}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              {onNavigate && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate(bin.coordinates)}
                  className="flex items-center gap-2 bg-surface hover:bg-surface-200 border-outline text-primary hover:text-primary"
                >
                  <Navigation className="h-4 w-4" />
                  {t("navigate")}
                </Button>
              )}
              {onReportIssue && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onReportIssue(bin.id)}
                  className="flex items-center gap-2 bg-surface hover:bg-surface-200 border-outline text-primary hover:text-primary"
                >
                  <Phone className="h-4 w-4" />
                  {t("reportIssue")}
                </Button>
              )}
              {onScheduleCollection && bin.fillLevel >= 75 && (
                <Button
                  size="sm"
                  onClick={() => onScheduleCollection(bin.id)}
                  className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white"
                >
                  <Truck className="h-4 w-4" />
                  {t("scheduleCollection")}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="ml-2 h-8 w-8 p-0 text-primary hover:text-primary hover:bg-surface-200"
              >
                <span className="sr-only">{t("close")}</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </div>
          </DialogTitle>
          <DialogDescription className="text-primary/80">
            {t("description", { binId: bin.id, location: bin.location })}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Fill Level & Status - Primary Info */}
          <Card className="lg:col-span-1 bg-surface-200 border-outline">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-primary">
                <BarChart3 className="h-5 w-5" />
                {t("currentStatus")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 text-primary">
                  {bin.fillLevel}%
                </div>
                <Progress
                  value={bin.fillLevel}
                  className={`h-4 [&>div]:${getFillLevelColor(bin.fillLevel)}`}
                />
                <div className="text-sm text-primary/70 mt-2">{t("fillLevel")}</div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary/70">{t("wasteType")}:</span>
                  <Badge
                    variant="outline"
                    className="border-outline text-primary"
                  >
                    {tCommon(bin.wasteType.toLowerCase())}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary/70">
                    {t("healthStatus")}:
                  </span>
                  <div className="flex items-center gap-2">
                    {getHealthStatusIcon(bin.healthStatus)}
                    <Badge
                      variant={
                        bin.healthStatus === "good" ? "default" : "destructive"
                      }
                      className={
                        bin.healthStatus === "good" ? "bg-green-500" : ""
                      }
                    >
                      {t(bin.healthStatus as keyof typeof t)}
                    </Badge>
                  </div>
                </div>

                {bin.odorLevel && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-primary/70">
                      {t("odorLevel")}:
                    </span>
                    <div className="flex items-center gap-2">
                      <Wind className="h-4 w-4" />
                      <Badge
                        variant={
                          bin.odorLevel === "critical"
                            ? "destructive"
                            : bin.odorLevel === "high"
                              ? "secondary"
                              : "default"
                        }
                        className={getOdorLevelColor(bin.odorLevel)}
                      >
                        {t(bin.odorLevel as keyof typeof t)}
                      </Badge>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary/70">{t("fillRate")}:</span>
                  <span className="font-medium text-primary">
                    {bin.averageFillRate}%/day
                  </span>
                </div>

                {bin.grinderStatus &&
                  bin.fillLevel >= 70 &&
                  bin.fillLevel <= 80 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-primary/70">
                        {t("grinderStatus")}:
                      </span>
                      <Badge
                        variant={
                          bin.grinderStatus === "active"
                            ? "default"
                            : bin.grinderStatus === "maintenance"
                              ? "destructive"
                              : "outline"
                        }
                        className={
                          bin.grinderStatus === "active"
                            ? "bg-green-500"
                            : bin.grinderStatus === "maintenance"
                              ? "bg-red-500"
                              : "border-outline text-primary"
                        }
                      >
                        {t(bin.grinderStatus as keyof typeof t)}
                      </Badge>
                    </div>
                  )}

                {bin.timeToFill && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-primary/70">
                      {t("timeToFill")}:
                    </span>
                    <span className="font-medium text-primary">
                      {bin.timeToFill}
                    </span>
                  </div>
                )}

                {bin.fillLevel < 95 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-primary/70">
                      {t("estimatedFullIn")}:
                    </span>
                    <span className="font-medium text-primary">
                      {getEstimatedTimeUntilFull()}
                    </span>
                  </div>
                )}
              </div>

              {(bin.fillLevel >= 90 || bin.healthStatus !== "good") && (
                <div className="p-3 bg-surface border border-outline rounded-lg">
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-medium">{t("attentionRequired")}</span>
                  </div>
                  <p className="text-sm text-primary/70 mt-1">
                    {bin.fillLevel >= 95
                      ? t("criticallyFull")
                      : bin.fillLevel >= 90
                        ? t("approachingCapacity")
                        : bin.healthStatus !== "good"
                          ? bin.healthStatus === "needs_cleaning"
                            ? t("cleaningRequired")
                            : t("maintenanceRequired")
                          : ""}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Location & Details */}
          <Card className="lg:col-span-1 bg-surface-200 border-outline">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-primary">
                <MapPin className="h-5 w-5" />
                {t("locationDetails")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-primary/70 mb-1">{t("address")}</div>
                <div className="font-medium text-primary">{bin.location}</div>
              </div>

              <div>
                <div className="text-sm text-primary/70 mb-1">{t("coordinates")}</div>
                <div className="font-mono text-sm bg-surface border border-outline p-2 rounded text-primary">
                  {bin.coordinates.lat.toFixed(6)},{" "}
                  {bin.coordinates.lng.toFixed(6)}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary/70" />
                  <div className="flex-1">
                    <div className="text-sm text-primary/70">
                      {t("lastCollection")}
                    </div>
                    <div className="font-medium text-primary">
                      {formatDate(bin.lastCollection)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary/70" />
                  <div className="flex-1">
                    <div className="text-sm text-primary/70">
                      {t("lastMaintenance")}
                    </div>
                    <div className="font-medium text-primary">
                      {formatDate(bin.lastMaintenance)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Collection History */}
          <Card className="lg:col-span-1 bg-surface-200 border-outline">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-primary">
                <TrendingUp className="h-5 w-5" />
                {t("recentActivity")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bin.collectionHistory.slice(0, 5).map((collection, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 bg-surface border border-outline rounded"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium text-primary">
                        {formatDateShort(collection.date)}
                      </div>
                      <div className="text-xs text-primary/70">
                        {t("collectedBy", { truckId: collection.truckId, amount: collection.amount })}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs border-outline text-primary"
                    >
                      {tCommon(collection.wasteType.toLowerCase())}
                    </Badge>
                  </div>
                ))}

                {bin.collectionHistory.length === 0 && (
                  <div className="text-center py-4 text-primary/70">
                    <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <div className="text-sm">
                      {t("noCollectionHistory")}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Full Collection History */}
        {bin.collectionHistory.length > 5 && (
          <Card className="mt-6 bg-surface-200 border-outline">
            <CardHeader>
              <CardTitle className="text-lg text-primary">
                {t("completeCollectionHistory")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {bin.collectionHistory.map((collection, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-surface border border-outline rounded-lg hover:bg-surface-200 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-primary">
                        {formatDate(collection.date)}
                      </div>
                      <div className="text-sm text-primary/70">
                        {t("collectedBy", { truckId: collection.truckId, amount: collection.amount })}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-outline text-primary"
                    >
                      {tCommon(collection.wasteType.toLowerCase())}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}
