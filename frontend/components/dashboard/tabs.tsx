"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { TWasteType, TTruck } from "@/types";
import { MapPin, FileText, TruckIcon, Trash2, Megaphone } from "lucide-react";
import { useNavigationTranslations } from "@/hooks/use-translations";
import { useDashboardUIStore } from "@/lib/store/dashboardUIStore";
import { LocationsFeature, TrucksFeature, ReportsFeature, AwarenessFeature } from "@/features";
import { WasteDashboard } from "./waste-dashboard";

export function DashboardTabs() {
  const tNav = useNavigationTranslations();
  const { setTruck, setWasteType } = useDashboardUIStore();

  const handleTruckSelect = (truck: TTruck | null) => {
    setTruck(truck);
  };

  const handleWasteTypeSelect = (wasteType: TWasteType | null) => {
    setWasteType(wasteType);
  };

  return (
    <Tabs defaultValue="waste-dashboard" className="mt-4 sm:mt-6 lg:mt-8">
      <TabsList
        className="grid w-full grid-cols-5 h-auto p-1 gap-1 rounded-lg shadow-sm bg-primary"
      >
        <TabsTrigger
          value="waste-dashboard"
          className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:p-3 data-[state=active]:bg-secondary data-[state=active]:text-surface-200 data-[state=inactive]:bg-surface-200 data-[state=inactive]:text-primary data-[state=inactive]:hover:bg-surface transition-all duration-200"
        >
          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>{tNav("wasteDashboard")}</span>
        </TabsTrigger>
        <TabsTrigger
          value="bin-tracker"
          className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:p-3 data-[state=active]:bg-secondary data-[state=active]:text-surface-200 data-[state=inactive]:bg-surface-200 data-[state=inactive]:text-primary data-[state=inactive]:hover:bg-surface transition-all duration-200"
        >
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>{tNav("binTracker")}</span>
        </TabsTrigger>
        <TabsTrigger
          value="trucks"
          className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:p-3 data-[state=active]:bg-secondary data-[state=active]:text-surface-200 data-[state=inactive]:bg-surface-200 data-[state=inactive]:text-primary data-[state=inactive]:hover:bg-surface transition-all duration-200"
        >
          <TruckIcon className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>{tNav("trucks")}</span>
        </TabsTrigger>
        <TabsTrigger
          value="reports"
          className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:p-3 data-[state=active]:bg-secondary data-[state=active]:text-surface-200 data-[state=inactive]:bg-surface-200 data-[state=inactive]:text-primary data-[state=inactive]:hover:bg-surface transition-all duration-200"
        >
          <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">{tNav("reports")}</span>
          <span className="sm:hidden">{tNav("reportsShort")}</span>
        </TabsTrigger>
        <TabsTrigger
          value="awareness"
          className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm p-2 sm:p-3 data-[state=active]:bg-secondary data-[state=active]:text-surface-200 data-[state=inactive]:bg-surface-200 data-[state=inactive]:text-primary data-[state=inactive]:hover:bg-surface transition-all duration-200"
        >
          <Megaphone className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden md:inline">{tNav("awarenessCampaigns")}</span>
          <span className="md:hidden">{tNav("campaignsShort")}</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="waste-dashboard" className="mt-6 fade-in">
        <WasteDashboard />
      </TabsContent>

      <TabsContent value="bin-tracker" className="mt-6 fade-in">
        <LocationsFeature />
      </TabsContent>

      <TabsContent value="trucks" className="mt-6 fade-in">
        <TrucksFeature onTruckSelect={handleTruckSelect} />
      </TabsContent>

      <TabsContent value="reports" className="mt-6 fade-in">
        <ReportsFeature onTypeClick={handleWasteTypeSelect} />
      </TabsContent>

      <TabsContent value="awareness" className="mt-6 fade-in">
        <AwarenessFeature />
      </TabsContent>
    </Tabs>
  );
}
