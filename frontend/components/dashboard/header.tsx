"use client";

import { Badge } from "@/components/ui/badge";
import { useConnectionState, useSocketData } from "@/lib/store/socketStore";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Recycle } from "lucide-react";
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
    <header className="sticky top-0 z-50 bg-background w-full border-b border-primary shadow-md">
      <div className="w-full px-3 sm:px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 sm:py-4 gap-3 sm:gap-0">
          {/* Logo and Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-lg shadow-sm">
              <img src="/logo.svg" className="h-10 w-10 sm:h-12 sm:w-12" />
            </div>
            <div>
              <h1 className="text-mg sm:text-lg lg:text-xl font-semibold text-white font-arabic">
                {tDashboard("title")}
              </h1>
            </div>
          </div>

          {/* Controls */}
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
