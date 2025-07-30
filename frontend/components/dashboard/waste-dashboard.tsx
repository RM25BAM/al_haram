"use client";

import { Leaf, Recycle, Trash2 } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useSocketData } from "@/lib/store/socketStore";
import { useTreatmentMethods } from "@/hooks/use-treatment-methods";
import { WasteCard } from "./waste-card";
import { WasteCalculator } from "../waste-calculator";
import { useDashboardUIStore } from "@/lib/store/dashboardUIStore";
import { useDashboardTranslations } from "@/hooks/use-translations";

interface WasteMetrics {
  totalWaste: number;
  plasticWaste: number;
  organicWaste: number;
  estimatedEnergy: number;
  financialGain: number;
  carbonReduction: number;
}

export function WasteDashboard() {
  const { bins, wasteTypes } = useSocketData();
  const { getRecommendations } = useTreatmentMethods();
  const { openTreatmentMethodsDialog } = useDashboardUIStore();
  const t = useDashboardTranslations();
  const [metrics, setMetrics] = useState<WasteMetrics>({
    totalWaste: 0,
    plasticWaste: 0,
    organicWaste: 0,
    estimatedEnergy: 0,
    financialGain: 0,
    carbonReduction: 0,
  });

  // Calculate metrics using collected waste data from waste types (not current bin weights)
  useEffect(() => {
    const calculateMetrics = async () => {
      // Get collected amounts from waste types service
      const plasticType = wasteTypes.find((type) =>
        type.type.toLowerCase().includes("plastic")
      );
      const organicType = wasteTypes.find((type) =>
        type.type.toLowerCase().includes("organic")
      );

      // Use the total collected amounts from waste types (not current bin weights)
      const plasticAmount = plasticType?.amount || 0;
      const organicAmount = organicType?.amount || 0;
      const totalAmount = plasticAmount + organicAmount;

      // Get treatment recommendations and calculate impacts based on collected amounts
      let plasticEnergy = 0,
        plasticFinancial = 0,
        plasticCarbon = 0;
      let organicEnergy = 0,
        organicFinancial = 0,
        organicCarbon = 0;

      try {
        if (plasticAmount > 0) {
          const plasticRecs = await getRecommendations("plastic");
          if (plasticRecs?.bestOverall) {
            // Use the best overall method for calculations (weighted scoring)
            const method = plasticRecs.bestOverall;
            const processedAmount = (plasticAmount * method.efficiency) / 100;
            plasticEnergy = processedAmount * method.energyOutput;
            plasticFinancial = processedAmount * method.financialGain;
            plasticCarbon = processedAmount * method.carbonReduction;
          }
        }

        if (organicAmount > 0) {
          const organicRecs = await getRecommendations("organic");
          if (organicRecs?.bestOverall) {
            // Use the best overall method for calculations (weighted scoring)
            const method = organicRecs.bestOverall;
            const processedAmount = (organicAmount * method.efficiency) / 100;
            organicEnergy = processedAmount * method.energyOutput;
            organicFinancial = processedAmount * method.financialGain;
            organicCarbon = processedAmount * method.carbonReduction;
          }
        }
      } catch (error) {
        console.error("Error calculating treatment metrics:", error);
        // Fallback to basic calculations if API fails
        plasticEnergy = plasticAmount * 2.5; // Basic fallback
        plasticFinancial = plasticAmount * 0.15;
        plasticCarbon = plasticAmount * 1.8;

        organicEnergy = organicAmount * 0.3;
        organicFinancial = organicAmount * 0.25;
        organicCarbon = organicAmount * 1.5;
      }

      setMetrics({
        totalWaste: totalAmount,
        plasticWaste: plasticAmount,
        organicWaste: organicAmount,
        estimatedEnergy: plasticEnergy + organicEnergy,
        financialGain: plasticFinancial + organicFinancial,
        carbonReduction: plasticCarbon + organicCarbon,
      });
    };

    calculateMetrics();
  }, [wasteTypes, getRecommendations]);

  // Calculate real-time bin stats from socket data
  const binStats = useMemo(() => {
    const plasticBins = bins.filter((bin) =>
      bin.wasteType.toLowerCase().includes("plastic")
    );
    const organicBins = bins.filter((bin) =>
      bin.wasteType.toLowerCase().includes("organic")
    );

    return {
      totalBins: bins.length,
      plasticBins: plasticBins.length,
      organicBins: organicBins.length,
      criticalBins: bins.filter((bin) => bin.status === "critical").length,
      needsCollectionBins: bins.filter(
        (bin) => bin.status === "needs_collection"
      ).length,
      averageFillLevel:
        bins.length > 0
          ? Math.round(
              bins.reduce((sum, bin) => sum + bin.fillLevel, 0) / bins.length
            )
          : 0,

      // Calculate actual waste amounts from bin data
      plasticWasteInBins: plasticBins.reduce((sum, bin) => sum + bin.weight, 0),
      organicWasteInBins: organicBins.reduce((sum, bin) => sum + bin.weight, 0),
    };
  }, [bins]);

  const handleCardClick = (type: "plastic" | "organic") => {
    const amount =
      type === "plastic" ? metrics.plasticWaste : metrics.organicWaste;
    openTreatmentMethodsDialog(type, amount);
  };

  return (
    <div className="space-y-6 p-4 rounded-lg bg-surface-200">
      <div className="flex flex-col md:flex-row gap-6">
        <WasteCard
          title={t("wasteDashboard.totalWaste")}
          icon={Trash2}
          amount={metrics.totalWaste}
          badgeText={`${binStats.totalBins} ${t("wasteDashboard.totalBins")}`}
          description={t("wasteDashboard.descriptions.total")}
          energyValue={metrics.estimatedEnergy}
          financialValue={metrics.financialGain}
          carbonValue={metrics.carbonReduction}
          variant="total"
        />

        <WasteCard
          title={t("wasteDashboard.totalPlasticWaste")}
          icon={Recycle}
          amount={metrics.plasticWaste}
          badgeText={`${binStats.plasticBins} ${t("wasteDashboard.bins")} • ${binStats.plasticWasteInBins.toFixed(0)}${t("wasteDashboard.kgInBins")}`}
          description={t("wasteDashboard.descriptions.plastic")}
          energyValue={
            metrics.plasticWaste > 0
              ? (metrics.estimatedEnergy * metrics.plasticWaste) /
                metrics.totalWaste
              : 0
          }
          financialValue={
            metrics.plasticWaste > 0
              ? (metrics.financialGain * metrics.plasticWaste) /
                metrics.totalWaste
              : 0
          }
          carbonValue={
            metrics.plasticWaste > 0
              ? (metrics.carbonReduction * metrics.plasticWaste) /
                metrics.totalWaste
              : 0
          }
          onClick={() => handleCardClick("plastic")}
          variant="plastic"
        />

        <WasteCard
          title={t("wasteDashboard.totalOrganicWaste")}
          icon={Leaf}
          amount={metrics.organicWaste}
          badgeText={`${binStats.organicBins} ${t("wasteDashboard.bins")} • ${binStats.organicWasteInBins.toFixed(0)}${t("wasteDashboard.kgInBins")}`}
          description={t("wasteDashboard.descriptions.organic")}
          energyValue={
            metrics.organicWaste > 0
              ? (metrics.estimatedEnergy * metrics.organicWaste) /
                metrics.totalWaste
              : 0
          }
          financialValue={
            metrics.organicWaste > 0
              ? (metrics.financialGain * metrics.organicWaste) /
                metrics.totalWaste
              : 0
          }
          carbonValue={
            metrics.organicWaste > 0
              ? (metrics.carbonReduction * metrics.organicWaste) /
                metrics.totalWaste
              : 0
          }
          onClick={() => handleCardClick("organic")}
          variant="organic"
        />
      </div>
      <WasteCalculator />
    </div>
  );
}
