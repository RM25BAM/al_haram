"use client";

import { Badge } from "@/components/ui/badge";
import { useConnectionState } from "@/lib/store/socketStore";
import { useSocketData } from "@/lib/store/socketStore";
import { Recycle } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
  useDashboardTranslations,
  useCommonTranslations,
} from "@/hooks/use-translations";
import { useFormattedTime } from "@/hooks/use-client-time";

export function DashboardHeader() {
  const { isConnected } = useConnectionState();
  const { lastUpdated } = useSocketData();
  const tDashboard = useDashboardTranslations();
  const tCommon = useCommonTranslations();
  const formattedLastUpdated = useFormattedTime(lastUpdated);

  return (
    <header className="shadow-sm mt-4 mx-3 sm:mx-4 lg:mx-6 rounded-lg bg-secondary">
      <div className="w-full px-3 sm:px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 sm:py-4 gap-3 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-gradient-to-br from-makkah-olive-500 to-makkah-olive-600 p-1.5 sm:p-2 rounded-lg shadow-sm">
              <Recycle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white font-arabic">
                {tDashboard("title")}
              </h1>
              <p className="text-xs sm:text-sm text-gray-200">
                {tDashboard("subtitle")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <LanguageSwitcher />
            <Badge
              variant="outline"
              className={`text-xs sm:text-sm px-2 py-1 border ${
                isConnected
                  ? "bg-surface-200 text-primary border-outline"
                  : "bg-red-100 text-red-700 border-red-300"
              }`}
            >
              <span className="hidden sm:inline">
                {isConnected
                  ? `🟢 ${tCommon("liveConnection")}`
                  : tCommon("disconnected")}
              </span>
              <span className="sm:hidden">
                {isConnected ? `🟢 ${tCommon("live")}` : tCommon("offline")}
              </span>
            </Badge>
            {formattedLastUpdated && (
              <div className="text-xs text-gray-200 hidden sm:block">
                {tCommon("lastUpdated")}: {formattedLastUpdated}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
