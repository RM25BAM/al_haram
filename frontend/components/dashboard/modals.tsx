"use client";

import { BinDetailModal } from "@/components/bin-detail-modal";
import { TruckDetailModal } from "@/components/truck-detail-modal";
import { WasteTypeDetailModal } from "@/components/waste-type-detail-modal";
import { TreatmentMethodsDialog } from "@/components/dashboard/dialogs/treatment-methods-dialog";
import { useTreatmentMethods } from "@/hooks/use-treatment-methods";
import { useDashboardSelections, useDashboardUIStore, useTreatmentMethodsDialog } from "@/lib/store/dashboardUIStore";
import { useSocketData } from "@/lib/store/socketStore";

export function DashboardModals() {
  const { selectedBinId, selectedTruck, selectedWasteType } = useDashboardSelections();
  const { clearBin, clearTruck, clearWasteType, closeTreatmentMethodsDialog } = useDashboardUIStore();
  const treatmentDialog = useTreatmentMethodsDialog();
  const { bins: wasteBins } = useSocketData();
  const { allMethods: treatmentMethods } = useTreatmentMethods();

  return (
    <>
      <BinDetailModal
        binId={selectedBinId}
        isOpen={!!selectedBinId}
        onClose={clearBin}
        treatmentMethodsData={treatmentMethods}
      />

      <TruckDetailModal
        truck={selectedTruck}
        isOpen={!!selectedTruck}
        onClose={clearTruck}
      />

      <WasteTypeDetailModal
        wasteType={selectedWasteType}
        bins={wasteBins}
        isOpen={!!selectedWasteType}
        onClose={clearWasteType}
      />

      <TreatmentMethodsDialog
        isOpen={treatmentDialog.isOpen}
        wasteType={treatmentDialog.wasteType}
        amount={treatmentDialog.amount}
        onClose={closeTreatmentMethodsDialog}
      />
    </>
  );
}