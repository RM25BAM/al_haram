"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Trash2,
  AlertTriangle,
  Truck,
  CheckCircle,
  Filter,
} from "lucide-react";
import { useDashboardTranslations } from "@/hooks/use-translations";
import { useDashboardStats } from "@/lib/store/socketStore";
import { useCarbonFilterCountdown } from "@/hooks/use-carbon-filter-countdown";
import type { TCarbonFilterStatus } from "@/types";
import {
  TotalBinsDialog,
  CriticalBinsDialog,
  NeedsCollectionDialog,
  ActiveTrucksDialog,
  CarbonFilterDialog,
} from "@/components/dashboard/dialogs";

type DialogType =
  | "total"
  | "critical"
  | "needsCollection"
  | "activeTrucks"
  | "carbonFilter"
  | null;

// Helper functions for carbon filter display logic
function getCarbonFilterDisplayValue(
  carbonFilter: TCarbonFilterStatus
): string {
  if (carbonFilter.isLoading) return "Loading...";
  if (carbonFilter.error) return "Error";
  return carbonFilter.formattedTimeRemaining;
}

function getCarbonFilterColors(carbonFilter: TCarbonFilterStatus): {
  color: string;
  bgColor: string;
} {
  if (carbonFilter.isLoading) {
    return {
      bgColor: "text-primary/70",
      color: "bg-surface-200",
    };
  }

  if (carbonFilter.isExpired) {
    return {
      bgColor: "text-red-600",
      color: "bg-red-100",
    };
  }

  if (carbonFilter.isCritical) {
    return {
      bgColor: "bg-orange-600",
      color: "text-orange-100",
    };
  }

  if (carbonFilter.isNearExpiry) {
    return {
      bgColor: "bg-yellow-600",
      color: "text-yellow-100",
    };
  }

  return {
    color: "text-green-600",
    bgColor: "bg-green-100",
  };
}

export function DashboardStats() {
  const tDashboard = useDashboardTranslations();
  const { totalBins, criticalBins, needsCollectionBins, activeTrucks } =
    useDashboardStats();
  const carbonFilter = useCarbonFilterCountdown();

  // Single state for dialog management
  const [activeDialog, setActiveDialog] = useState<DialogType>(null);

  const stats = [
    {
      title: tDashboard("totalBins"),
      borderColor: "border-gray-500",
      backGround: "bg-gray-400",
      value: totalBins,
      icon: Trash2,
      color: "text-white",
      bgColor: "bg-gray-400",
      onClick: () => setActiveDialog("total"),
    },
    {
      title: tDashboard("criticalBins"),
      borderColor: "border-red-600",
      backGround: "bg-red-500",
      value: `${criticalBins.length}/${totalBins}`,
      icon: AlertTriangle,
      color: "text-white",
      bgColor: "bg-red-500",
      onClick: () => setActiveDialog("critical"),
    },
    {
      title: tDashboard("needsCollection"),
      borderColor: "border-amber-600",
      backGround: "bg-amber-500",
      value: `${needsCollectionBins.length}/${totalBins}`,
      icon: CheckCircle,
      color: "text-white",
      bgColor: "bg-amber-500",
      onClick: () => setActiveDialog("needsCollection"),
    },
    {
      title: tDashboard("activeTrucks"),
      borderColor: "border-blue-900",
      backGround: "bg-blue-800",
      value: activeTrucks.length,
      icon: Truck,
      color: "text-white",
      bgColor: "border-0 shaodw-0",
      onClick: () => setActiveDialog("activeTrucks"),
    },
    {
      title: tDashboard("carbonFilterCountdown"),
      value: getCarbonFilterDisplayValue(carbonFilter),
      borderColor: "border-0",
      icon: Filter,
      ...getCarbonFilterColors(carbonFilter),
      onClick: () => setActiveDialog("carbonFilter"),
    },
  ];

  const closeDialog = () => setActiveDialog(null);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className={`hover:shadow-lg transition-all duration-200 ${stat.backGround || stat.bgColor} ${stat.borderColor} cursor-pointer hover:scale-[1.02]`}
            onClick={stat.onClick}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-4 lg:px-6 pt-3 sm:pt-4 lg:pt-6">
              <CardTitle className="text-md sm:text-lg font-mono font-semibold text-white leading-tight">
                {stat.title}
              </CardTitle>
              <div
                className={`p-1.5 sm:p-2 rounded-lg ${stat.bgColor} shadow-sm`}
              >
                <stat.icon className={`h-3 w-3 sm:h-4 sm:w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold font-mono text-white">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Conditionally render dialogs */}
      {activeDialog === "total" && (
        <TotalBinsDialog open={true} onClose={closeDialog} />
      )}

      {activeDialog === "critical" && (
        <CriticalBinsDialog open={true} onClose={closeDialog} />
      )}

      {activeDialog === "needsCollection" && (
        <NeedsCollectionDialog open={true} onClose={closeDialog} />
      )}

      {activeDialog === "activeTrucks" && (
        <ActiveTrucksDialog open={true} onClose={closeDialog} />
      )}

      {activeDialog === "carbonFilter" && (
        <CarbonFilterDialog open={true} onClose={closeDialog} />
      )}
    </>
  );
}
