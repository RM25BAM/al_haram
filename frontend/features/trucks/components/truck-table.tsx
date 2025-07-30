import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TTruck } from "@/types";
import { getTranslatedRoutes } from "@/lib/utils";

interface TruckTableProps {
  trucks: TTruck[];
  onTruckSelect: (truck: TTruck) => void;
  onExport: () => void;
  onGenerateReport: () => void;
}

export function TruckTable({
  trucks,
  onTruckSelect,
  onExport,
  onGenerateReport,
}: TruckTableProps) {
  const t = useTranslations("trucks");
  const tRoutes = useTranslations("routes");

  return (
    <Card className="bg-surface border border-outline">
      <CardHeader className="border-b border-outline bg-surface">
        <div className="flex flex-col md:flex-row justify-between items-center gap-1">
          <div>
            <CardTitle className="text-primary">
              {t("vehicleFleetOverview")}
            </CardTitle>
            <CardDescription className="text-primary/70">
              {t("vehicleFleetDescription")}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={onExport}
              className="bg-secondary text-surface hover:bg-secondary/80"
            >
              {t("exportData")}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={onGenerateReport}
              className="bg-secondary text-surface hover:bg-secondary/80"
            >
              {t("fleetReport")}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="bg-surface p-0">
        <div className="w-full" style={{
          overflowX: "auto",
        }}>
          <table className="w-full border-collapse min-w-[1200px]">
            <thead>
              <tr className="border-b bg-secondary">
                <th className="text-left p-2 sm:p-4 font-bold text-surface text-sm sm:text-base w-[100px] min-w-[100px]">
                  {t("vehicleId")}
                </th>
                <th className="text-left p-2 sm:p-4 font-bold text-surface text-sm sm:text-base w-[120px] min-w-[120px]">
                  {t("driver")}
                </th>
                <th className="text-left p-2 sm:p-4 font-bold text-surface text-sm sm:text-base w-[100px] min-w-[100px]">
                  {t("status")}
                </th>
                <th className="text-left p-2 sm:p-4 font-bold text-surface text-sm sm:text-base w-[120px] min-w-[120px]">
                  {t("route")}
                </th>
                <th className="text-left p-2 sm:p-4 font-bold text-surface text-sm sm:text-base w-[100px] min-w-[100px]">
                  {t("wasteType")}
                </th>
                <th className="text-left p-2 sm:p-4 font-bold text-surface text-sm sm:text-base w-[120px] min-w-[120px]">
                  {t("capacity")}
                </th>
                <th className="text-left p-2 sm:p-4 font-bold text-surface text-sm sm:text-base w-[120px] min-w-[120px]">
                  {t("fuelLevel")}
                </th>
                <th className="text-left p-2 sm:p-4 font-bold text-surface text-sm sm:text-base w-[100px] min-w-[100px]">
                  {t("collections")}
                </th>
                <th className="text-left p-2 sm:p-4 font-bold text-surface text-sm sm:text-base w-[100px] min-w-[100px]">
                  {t("eta")}
                </th>
                <th className="text-left p-2 sm:p-4 font-bold text-surface text-sm sm:text-base w-[100px] min-w-[100px]">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {trucks.map((truck) => (
                <tr
                  key={truck.id}
                  className="border-b border-outline hover:bg-surface-200 transition-colors"
                >
                  <td className="p-2 sm:p-4 font-medium text-primary text-sm whitespace-nowrap">{truck.id}</td>
                  <td className="p-2 sm:p-4 text-primary text-sm whitespace-nowrap">{truck.driver}</td>
                  <td className="p-2 sm:p-4">
                    <Badge
                      variant={
                        truck.status === "available"
                          ? "secondary"
                          : truck.status === "collecting"
                            ? "default"
                            : truck.status === "en_route"
                              ? "outline"
                              : "destructive"
                      }
                      className={`capitalize text-xs whitespace-nowrap ${
                        truck.status === "collecting"
                          ? "bg-secondary text-surface"
                          : truck.status === "available"
                            ? "bg-surface-200 text-primary"
                            : truck.status === "en_route"
                              ? "bg-surface border-outline text-primary"
                              : ""
                      }`}
                    >
                      {t(truck.status.replace("_", "") as keyof typeof t)}
                    </Badge>
                  </td>
                  <td className="p-2 sm:p-4 text-primary text-sm whitespace-nowrap">
                    {getTranslatedRoutes(truck.route, tRoutes)}
                  </td>
                  <td className="p-2 sm:p-4">
                    <Badge
                      variant="outline"
                      className="bg-surface-200 text-primary border-outline text-xs whitespace-nowrap"
                    >
                      {t(truck.wasteType.toLowerCase())}
                    </Badge>
                  </td>
                  <td className="p-2 sm:p-4">
                    <div className="flex items-center gap-2 min-w-[100px]">
                      <div className="w-12 sm:w-16 bg-surface-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            truck.capacity >= 90
                              ? "bg-red-500"
                              : truck.capacity >= 70
                                ? "bg-yellow-500"
                                : "bg-secondary"
                          }`}
                          style={{ width: `${truck.capacity}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-primary whitespace-nowrap">
                        {truck.capacity}%
                      </span>
                    </div>
                  </td>
                  <td className="p-2 sm:p-4">
                    <div className="flex items-center gap-2 min-w-[100px]">
                      <div className="w-12 sm:w-16 bg-surface-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            truck.fuelLevel >= 50
                              ? "bg-secondary"
                              : truck.fuelLevel >= 25
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${truck.fuelLevel}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-primary whitespace-nowrap">
                        {truck.fuelLevel}%
                      </span>
                    </div>
                  </td>
                  <td className="p-2 sm:p-4">
                    <div className="text-center">
                      <div className="text-sm sm:text-lg font-bold text-primary">
                        {truck.collectionsToday}
                      </div>
                      <div className="text-xs text-primary/70">
                        {t("today")}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 sm:p-4 text-primary text-sm whitespace-nowrap">
                    {truck.estimatedCompletion
                      ? new Date(truck.estimatedCompletion).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "--:--"}
                  </td>
                  <td className="p-2 sm:p-4">
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onTruckSelect(truck)}
                        className="text-primary hover:text-primary hover:bg-surface-200 text-xs whitespace-nowrap"
                      >
                        {t("details")}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
