import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, MapPin, Calendar } from "lucide-react";
import type { TWasteType, TWasteBin } from "@/types";

interface WasteTypeDetailModalProps {
  wasteType: TWasteType | null;
  bins: TWasteBin[];
  isOpen: boolean;
  onClose: () => void;
}

export function WasteTypeDetailModal({
  wasteType,
  bins,
  isOpen,
  onClose,
}: WasteTypeDetailModalProps) {
  if (!wasteType) return null;

  const relatedBins = bins.filter((bin) => bin.wasteType === wasteType.type);
  const criticalBins = relatedBins.filter((bin) => bin.fillLevel >= 90);
  const averageFillLevel =
    relatedBins.reduce((sum, bin) => sum + bin.fillLevel, 0) /
    relatedBins.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-surface border-outline">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <div className={`w-4 h-4 rounded-full ${wasteType.color}`} />
            {wasteType.type} Waste Analytics
          </DialogTitle>
          <DialogDescription className="text-primary/80">
            Detailed breakdown and analytics for {wasteType.type} waste category
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overview Stats */}
          <Card className="bg-surface-200 border-outline">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-primary">
                <BarChart3 className="h-5 w-5" />
                Overview Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-surface rounded-lg border border-outline">
                  <div className="text-2xl font-bold text-primary">
                    {wasteType.amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-primary/70">Total Kg</div>
                </div>
                <div className="text-center p-3 bg-surface rounded-lg border border-outline">
                  <div className="text-2xl font-bold text-primary">
                    {wasteType.percentage}%
                  </div>
                  <div className="text-sm text-primary/70">Of Total Waste</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-primary/70">Daily Average:</span>
                  <span className="font-medium text-primary">
                    {wasteType.dailyAverage} kg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/70">Active Bins:</span>
                  <span className="font-medium text-primary">
                    {wasteType.binCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/70">Average Fill Level:</span>
                  <span className="font-medium text-primary">
                    {averageFillLevel.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-green-600 bg-green-50 p-2 rounded">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">+8% increase this month</span>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Weekly Collection Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {wasteType.weeklyTrend.map((day, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{day.day}</span>
                      <span className="font-medium">{day.amount} kg</span>
                    </div>
                    <Progress
                      value={
                        (day.amount /
                          Math.max(
                            ...wasteType.weeklyTrend.map((d) => d.amount)
                          )) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Related Bins */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Related Bins ({relatedBins.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {criticalBins.length > 0 && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="font-medium text-red-800 mb-2">
                    Critical Bins Requiring Attention ({criticalBins.length})
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {criticalBins.map((bin) => (
                      <div
                        key={bin.id}
                        className="flex justify-between items-center p-2 bg-white rounded border"
                      >
                        <div>
                          <div className="font-medium">{bin.id}</div>
                          <div className="text-sm text-gray-500">
                            {bin.location}
                          </div>
                        </div>
                        <Badge variant="destructive">
                          {bin.fillLevel}% full
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {relatedBins.map((bin) => (
                  <div
                    key={bin.id}
                    className="p-3 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">{bin.id}</div>
                        <div className="text-sm text-gray-500">
                          {bin.location}
                        </div>
                      </div>
                      <Badge
                        variant={
                          bin.fillLevel >= 90
                            ? "destructive"
                            : bin.status === "needs_collection"
                              ? "secondary"
                              : "default"
                        }
                        className={
                          bin.status === "normal" ? "bg-green-500" : ""
                        }
                      >
                        {bin.fillLevel}%
                      </Badge>
                    </div>
                    <Progress
                      value={bin.fillLevel}
                      className={`h-2 ${
                        bin.fillLevel > 80
                          ? "[&>div]:bg-red-500"
                          : bin.fillLevel > 60
                            ? "[&>div]:bg-yellow-500"
                            : "[&>div]:bg-green-500"
                      }`}
                    />
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
