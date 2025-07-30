import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Trash2, Package2, Leaf } from "lucide-react";
import { useDashboardTranslations } from "@/hooks/use-translations";
import { useSocketData } from "@/lib/store/socketStore";

interface TotalBinsDialogProps {
  open: boolean;
  onClose: () => void;
}

export function TotalBinsDialog({ open, onClose }: TotalBinsDialogProps) {
  const tDashboard = useDashboardTranslations();
  const { bins } = useSocketData();

  // Calculate data only when dialog is open
  const totalBins = bins.length;
  const plasticBins = bins.filter((bin) =>
    bin.wasteType.toLowerCase().includes("plastic")
  ).length;
  const organicBins = bins.filter((bin) =>
    bin.wasteType.toLowerCase().includes("organic")
  ).length;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg border-0 shadow-xl bg-primary">
        <DialogHeader className="border-b border-surface/30 pb-6">
          <DialogTitle className="flex items-center gap-3 text-surface text-xl font-semibold">
            <div className="p-3 rounded-lg bg-surface">
              <Trash2 className="h-5 w-5 text-primary" />
            </div>
            {tDashboard("totalBins")} {tDashboard("details")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 pt-6 pb-2">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center justify-between p-5 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md bg-surface border-2 border-surface-200">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg shadow-sm bg-surface-200">
                  <Trash2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-primary text-lg">
                    {tDashboard("totalBins")}
                  </div>
                  <div className="text-sm text-primary/70">
                    {tDashboard("allWaste")}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-14 h-14 rounded-full text-xl font-bold text-primary shadow-sm bg-surface-200">
                {totalBins}
              </div>
            </div>

            <div className="flex items-center justify-between p-5 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md bg-surface border-2 border-surface-200">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg shadow-sm bg-surface-200">
                  <Package2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-primary text-lg">
                    {tDashboard("plasticBins")}
                  </div>
                  <div className="text-sm text-primary/70">
                    {tDashboard("forPlastic")}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-14 h-14 rounded-full text-xl font-bold text-primary shadow-sm bg-surface-200">
                {plasticBins}
              </div>
            </div>

            <div className="flex items-center justify-between p-5 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md bg-surface border-2 border-surface-200">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg shadow-sm bg-surface-200">
                  <Leaf className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-primary text-lg">
                    {tDashboard("organicBins")}
                  </div>
                  <div className="text-sm text-primary/70">
                    {tDashboard("forOrganic")}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-14 h-14 rounded-full text-xl font-bold text-primary shadow-sm bg-surface-200">
                {organicBins}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
