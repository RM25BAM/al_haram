import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, MapPin } from "lucide-react";
import { useCommonTranslations, useDashboardTranslations } from "@/hooks/use-translations";
import { useSocketData } from "@/lib/store/socketStore";

interface CriticalBinsDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CriticalBinsDialog({ open, onClose }: CriticalBinsDialogProps) {
  const tDashboard = useDashboardTranslations();
  const tCommon = useCommonTranslations();
  const {
    stats: { criticalBins },
  } = useSocketData();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto border-0 shadow-xl bg-primary">
        <DialogHeader className="border-b border-surface/30 pb-6">
          <DialogTitle className="flex items-center gap-3 text-surface text-xl font-semibold">
            <div className="p-3 rounded-lg bg-surface">
              <AlertTriangle className="h-5 w-5 text-primary" />
            </div>
            {tDashboard("criticalBins")} ({criticalBins.length})
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 pt-6 pb-2">
          {criticalBins.length === 0 ? (
            <div className="text-center py-8 text-surface/70">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-surface/50" />
              <p>{tDashboard("noCriticalBins")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {criticalBins.map((bin) => (
                <div
                  key={bin.id}
                  className="flex items-center justify-between p-5 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md bg-surface border-2 border-surface-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg shadow-sm bg-surface-200">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-primary text-lg">
                        {tDashboard("binId")}: {bin.id}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-primary/70">
                        <MapPin className="h-3 w-3" />
                        {tDashboard("location")}: {bin.location}
                      </div>
                      <div className="text-sm text-primary/70">
                        {tDashboard("fillLevel")}: {bin.fillLevel}% • {tDashboard("type")}: {tCommon(bin.wasteType.toLowerCase())}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center px-4 py-2 rounded-full text-sm font-bold text-primary shadow-sm bg-surface-200">
                    {tCommon("critical")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
