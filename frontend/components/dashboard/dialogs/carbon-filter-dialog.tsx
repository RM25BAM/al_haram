import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Filter, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import {
  useDashboardTranslations,
  useTruckTranslations,
  useCommonTranslations,
} from "@/hooks/use-translations";
import { useCarbonFilterCountdown } from "@/hooks/use-carbon-filter-countdown";

interface CarbonFilterDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CarbonFilterDialog({ open, onClose }: CarbonFilterDialogProps) {
  const tDashboard = useDashboardTranslations();
  const tTruck = useTruckTranslations();
  const tCommon = useCommonTranslations();
  const carbonFilter = useCarbonFilterCountdown();

  const getStatusIcon = () => {
    if (carbonFilter.isExpired) return AlertTriangle;
    if (carbonFilter.isCritical) return AlertTriangle;
    if (carbonFilter.isNearExpiry) return Clock;
    return CheckCircle;
  };

  const getStatusText = () => {
    if (carbonFilter.isLoading) return "Loading...";
    if (carbonFilter.error) return "Error loading data";
    if (carbonFilter.isExpired) return tDashboard("filterExpired");
    if (carbonFilter.isCritical) return tDashboard("criticalReplacementNeeded");
    if (carbonFilter.isNearExpiry) return tDashboard("nearExpiry");
    return tDashboard("goodCondition");
  };

  const StatusIcon = getStatusIcon();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg border-0 shadow-xl bg-primary">
        <DialogHeader className="border-b border-surface/30 pb-6">
          <DialogTitle className="flex items-center gap-3 text-surface text-xl font-semibold">
            <div className="p-3 rounded-lg bg-surface">
              <Filter className="h-5 w-5 text-primary" />
            </div>
            {tDashboard("carbonFilterCountdown")} {tTruck("details")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-6 pb-2">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between p-5 rounded-xl shadow-sm bg-surface border-2 border-surface-200">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg shadow-sm bg-surface-200">
                  <StatusIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-primary text-lg">
                    {tDashboard("filterStatus")}
                  </div>
                  <div className="text-sm text-primary/70">
                    {getStatusText()}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center px-4 py-2 rounded-full text-sm font-bold shadow-sm bg-surface-200 text-primary">
                {carbonFilter.isLoading
                  ? "Loading..."
                  : carbonFilter.formattedTimeRemaining}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl border border-surface-200 shadow-sm bg-surface">
                <div className="text-xs text-primary/70 uppercase tracking-wide">
                  {tDashboard("daysRemaining")}
                </div>
                <div className="text-xl font-bold text-primary">
                  {carbonFilter.isLoading ? "..." : carbonFilter.daysRemaining}
                </div>
              </div>
              <div className="p-4 rounded-xl border border-surface-200 shadow-sm bg-surface">
                <div className="text-xs text-primary/70 uppercase tracking-wide">
                  {tDashboard("hoursRemaining")}
                </div>
                <div className="text-xl font-bold text-primary">
                  {carbonFilter.isLoading ? "..." : carbonFilter.hoursRemaining}
                </div>
              </div>
              <div className="p-4 rounded-xl border border-surface-200 shadow-sm bg-surface">
                <div className="text-xs text-primary/70 uppercase tracking-wide">
                  {tDashboard("minutesRemaining")}
                </div>
                <div className="text-xl font-bold text-primary">
                  {carbonFilter.isLoading
                    ? "..."
                    : carbonFilter.minutesRemaining}
                </div>
              </div>
              <div className="p-4 rounded-xl border border-surface-200 shadow-sm bg-surface">
                <div className="text-xs text-primary/70 uppercase tracking-wide">
                  {tDashboard("totalMinutes")}
                </div>
                <div className="text-xl font-bold text-primary">
                  {carbonFilter.isLoading
                    ? "..."
                    : carbonFilter.totalMinutesRemaining}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-surface-200 shadow-sm bg-surface">
              <div className="text-xs text-primary/70 uppercase tracking-wide mb-1">
                {tDashboard("maintenanceNotes")}
              </div>
              <div className="text-sm text-primary/80">
                {carbonFilter.isExpired
                  ? tDashboard("filterExpiredTooltip")
                  : carbonFilter.isCritical
                    ? tDashboard("filterCriticalTime", {
                        time: carbonFilter.formattedTimeRemaining,
                      })
                    : carbonFilter.isNearExpiry
                      ? tDashboard("filterNearExpiryTime", {
                          time: carbonFilter.formattedTimeRemaining,
                        })
                      : tDashboard("filterGoodConditionTime", {
                          time: carbonFilter.formattedTimeRemaining,
                        })}
              </div>
            </div>

            <div className="text-xs text-surface/70 text-center">
              {tCommon("lastUpdated")}:{" "}
              {carbonFilter.lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
