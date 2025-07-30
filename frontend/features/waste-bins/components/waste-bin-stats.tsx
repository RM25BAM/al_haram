"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { TWasteBin } from "@/types";
import { useWasteBinTranslations } from "@/hooks/use-translations";

interface WasteBinStatsProps {
  bins: TWasteBin[];
}

export function WasteBinStats({ bins }: WasteBinStatsProps) {
  const t = useWasteBinTranslations();

  const normalBins = bins.filter((bin) => bin.status === "normal").length;
  const needsCollectionBins = bins.filter(
    (bin) => bin.status === "needs_collection"
  ).length;
  const criticalBins = bins.filter((bin) => bin.fillLevel >= 90).length;
  const averageFillLevel =
    bins.length > 0
      ? Math.round(
          bins.reduce((sum, bin) => sum + bin.fillLevel, 0) / bins.length
        )
      : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t("normal")}</p>
              <p className="text-2xl font-bold text-green-600">{normalBins}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <div className="w-6 h-6 text-green-600">✓</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-yellow-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                {t("needsCollection")}
              </p>
              <p className="text-2xl font-bold text-yellow-600">
                {needsCollectionBins}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <div className="w-6 h-6 text-yellow-600">⚠</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-red-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                {t("critical")}
              </p>
              <p className="text-2xl font-bold text-red-600">
                {criticalBins}/{normalBins}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <div className="w-6 h-6 text-red-600">🚨</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                {t("avgRate")}
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {averageFillLevel}%
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <div className="w-6 h-6 text-blue-600">📊</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
