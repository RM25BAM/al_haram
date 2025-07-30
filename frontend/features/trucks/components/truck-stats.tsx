import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { TruckIcon, Check, Navigation, RotateCcw, Package } from "lucide-react";
import { useSocketData } from "@/lib/store/socketStore";

export function TruckStats() {
  const t = useTranslations("trucks");
  const { trucks } = useSocketData();

  const activeTrucks = trucks.filter(
    (truck) => truck.status !== "available"
  ).length;
  const availableTrucks = trucks.filter(
    (truck) => truck.status === "available"
  ).length;
  const enRouteTrucks = trucks.filter(
    (truck) => truck.status === "en_route"
  ).length;
  const collectingTrucks = trucks.filter(
    (truck) => truck.status === "collecting"
  ).length;
  const totalCollections = trucks.reduce(
    (sum, truck) => sum + truck.collectionsToday,
    0
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      <Card className="border-l-4 border-l-secondary bg-surface border border-outline">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-primary/70">
                {t("activeVehicles")}
              </p>
              <p className="text-xl font-bold text-primary">{activeTrucks}</p>
            </div>
            <div className="p-2 bg-gray-100 rounded-full">
              <TruckIcon className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-secondary bg-surface border border-outline">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-primary/70">
                {t("available")}
              </p>
              <p className="text-xl font-bold text-primary">
                {availableTrucks}
              </p>
            </div>
            <div className="p-2 bg-green-50 rounded-full">
              <Check className="w-4 h-4 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-secondary bg-surface border border-outline">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-primary/70">
                {t("enRoute")}
              </p>
              <p className="text-xl font-bold text-primary">{enRouteTrucks}</p>
            </div>
            <div className="p-2 bg-blue-50 rounded-full">
              <Navigation className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-secondary bg-surface border border-outline">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-primary/70">
                {t("collecting")}
              </p>
              <p className="text-xl font-bold text-primary">
                {collectingTrucks}
              </p>
            </div>
            <div className="p-2 bg-amber-50 rounded-full">
              <RotateCcw className="w-4 h-4 text-amber-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-secondary bg-surface border border-outline">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-primary/70">
                {t("totalCollections")}
              </p>
              <p className="text-xl font-bold text-primary">
                {totalCollections}
              </p>
            </div>
            <div className="p-2 bg-slate-50 rounded-full">
              <Package className="w-4 h-4 text-slate-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
