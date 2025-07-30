"use client";

import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export function MapFallback() {
  const t = useTranslations("mapFallback");

  return (
    <Card className="p-6">
      <div className="text-center space-y-4">
        <div className="text-6xl">🗺️</div>
        <h3 className="text-xl font-semibold">{t("interactiveMap")}</h3>
        <p className="text-gray-600 max-w-md mx-auto">{t("description")}</p>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {/* {wasteBinsData.length} */}0
            </div>
            <div className="text-sm text-gray-600">{t("smartBins")}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {/* {trucksData.length} */}0
            </div>
            <div className="text-sm text-gray-600">{t("activeTrucks")}</div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
          <p className="text-sm text-blue-800">{t("mapInfo")}</p>
        </div>
      </div>
    </Card>
  );
}
