"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  MapPin,
  Activity,
  Zap,
  Calendar,
  Recycle,
  Leaf,
  Loader2,
} from "lucide-react";
import { fetchMonthlyReport } from "@/lib/api";
import type { TMonthlyReportData } from "@/types";

export function MonthlyReport() {
  const t = useTranslations("reports");
  const locale = useLocale();
  const [monthlyData, setMonthlyData] = useState<TMonthlyReportData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("5"); // Default to May (Ramadan peak)

  // Available months for 2024
  const availableMonths = [
    { value: "1", label: t("january2024") },
    { value: "2", label: t("february2024") },
    { value: "3", label: t("march2024") },
    { value: "4", label: t("april2024") },
    { value: "5", label: t("may2024") },
    { value: "6", label: t("june2024") },
    { value: "7", label: t("july2024") },
    { value: "8", label: t("august2024") },
    { value: "9", label: t("september2024") },
    { value: "10", label: t("october2024") },
    { value: "11", label: t("november2024") },
    { value: "12", label: t("december2024") },
  ];

  const fetchData = async (year: string, month: string) => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchMonthlyReport(
        parseInt(year),
        parseInt(month),
        locale
      );
      setMonthlyData(data);
    } catch (err) {
      console.error("Failed to fetch monthly report:", err);
      setError(t("failedToLoadReportData"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth, locale]);

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-primary">{t("loadingMonthlyReport")}</span>
        </div>
      </div>
    );
  }

  if (error || !monthlyData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="p-6 bg-surface-300 border-surface-400">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-primary">
              {t("unableToLoadReport")}
            </h3>
            <p className="text-primary/70">
              {error || t("noDataAvailableError")}
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir={locale === "ar" ? "rtl" : "ltr"}>
      {/* Cover Page */}
      <Card className="bg-surface-300  border-surface-400">
        <CardHeader className="relative flex justify-center p-6">
          {/* This div is now perfectly centered by the parent's flex properties */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Calendar className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold text-primary">
              {monthlyData.coverPage.title}
            </CardTitle>
            <div className="mt-4 text-sm text-primary/70 space-y-1">
              <p className="font-medium">
                {monthlyData.coverPage.systemName}
              </p>
              <p>
                {t("generated")}: {monthlyData.coverPage.generatedDate}
              </p>
            </div>
          </div>

          {/* This div is positioned absolutely in the top right corner */}
          <div className="absolute top-6 right-6 flex items-center gap-3">
            <div className="text-sm text-primary">
              <span className="font-medium">{t("selectMonth")}</span>
            </div>
            <Select value={selectedMonth} onValueChange={handleMonthChange}>
              <SelectTrigger className="w-48 bg-surface-200 border-surface-400">
                <SelectValue placeholder={t("selectMonthPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {availableMonths.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {/* Summary Section */}
      <Card className="bg-surface border-surface-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Activity className="h-5 w-5 text-primary" />
            {t("summary")} - {t("briefOverview")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-surface-200 rounded-lg border border-surface-400">
              <p className="text-2xl font-bold text-primary">
                {monthlyData.summary.totalWasteKg.toLocaleString()} kg
              </p>
              <p className="text-sm text-primary/70">
                {t("totalWasteCollected")}
              </p>
            </div>
            <div className="text-center p-4 bg-surface-200 rounded-lg border border-surface-400">
              <p className="text-2xl font-bold text-primary">
                {monthlyData.summary.topWasteZone}
              </p>
              <p className="text-sm text-primary/70">
                {t("topPerformingZone")}
              </p>
            </div>
            <div className="text-center p-4 bg-surface-200 rounded-lg border border-surface-400">
              <p className="text-2xl font-bold text-primary">
                {monthlyData.summary.systemPerformance}
              </p>
              <p className="text-sm text-primary/70">
                {t("systemPerformance")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Key Highlights */}
            <Card className="border border-surface-400 bg-surface-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h4 className="font-medium text-primary">
                    {t("keyHighlights")}
                  </h4>
                </div>
                <ul className="space-y-3 text-sm text-primary/80 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span className="leading-relaxed">
                      {t("totalWasteCollection")}{" "}
                      {monthlyData.summary.percentChangeFromLastMonth > 0
                        ? t("increased")
                        : t("decreased")}{" "}
                      {t("by")}{" "}
                      <span className="font-semibold text-primary">
                        {Math.abs(
                          monthlyData.summary.percentChangeFromLastMonth
                        )}
                        %
                      </span>{" "}
                      {t("comparedToLastMonth")}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary font-bold">•</span>
                    <span className="leading-relaxed">
                      <span className="font-semibold text-secondary">
                        {monthlyData.summary.topWasteZone}
                      </span>{" "}
                      {t("continuesTo")} {t("beTheHighestWasteGeneratingZone")}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span className="leading-relaxed">
                      {t("systemOperating")} {t("atOptimalPerformance")}{" "}
                      <span className="font-semibold text-primary">
                        {monthlyData.summary.systemPerformance.toLowerCase()}
                      </span>{" "}
                      {t("withUptime")} {monthlyData.systemHealth.uptime}%
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary font-bold">•</span>
                    <span className="leading-relaxed">
                      <span className="font-semibold text-primary">
                        {t("plasticWaste")}:{" "}
                        {monthlyData.summary.plasticWasteKg} kg
                      </span>{" "}
                      |{" "}
                      <span className="font-semibold text-secondary">
                        {t("organicWaste")}:{" "}
                        {monthlyData.summary.organicWasteKg} kg
                      </span>
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Top 3 Waste Zones */}
            <Card className="border border-surface-400 bg-surface-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h4 className="font-medium text-primary">
                    {t("topWasteZones")}
                  </h4>
                </div>
                <div className="space-y-3">
                  {monthlyData.zonePerformance
                    .slice(0, 3)
                    .map((zone, index) => (
                      <div
                        key={zone.name}
                        className="flex items-center justify-between p-3 bg-surface rounded-lg border border-surface-400"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${index === 0
                                ? "bg-primary border-2 border-primary/20"
                                : index === 1
                                  ? "bg-secondary border-2 border-secondary/20"
                                  : "bg-orange-500 border-2 border-orange-200"
                              }`}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-sm text-primary">
                              {zone.name}
                            </p>
                            <p className="text-xs text-primary/70">
                              {zone.percentage}% {t("ofTotal")}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm text-primary">
                            {zone.amount.toLocaleString()} kg
                          </p>
                          <Badge
                            variant="secondary"
                            className={`text-xs ${zone.trend === "increasing"
                                ? "text-primary bg-primary/10"
                                : zone.trend === "decreasing"
                                  ? "text-secondary bg-secondary/10"
                                  : "text-primary/70 bg-surface"
                              }`}
                          >
                            {zone.trend}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Card className="bg-surface border-surface-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <BarChart3 className="h-5 w-5 text-primary" />
            {t("keyMetrics")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-primary bg-surface-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-primary/70">
                      {t("totalWaste")}
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {monthlyData.keyMetrics.totalWaste.value.toLocaleString()}{" "}
                      {monthlyData.keyMetrics.totalWaste.unit}
                    </p>
                    <p className="text-sm text-primary">
                      {monthlyData.keyMetrics.totalWaste.change > 0 ? "+" : ""}
                      {monthlyData.keyMetrics.totalWaste.change}%{" "}
                      {t("changeFromLastMonth")}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-full border border-surface-400">
                    <BarChart3 className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-secondary bg-surface-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-primary/70">
                      {t("plasticWaste")}
                    </p>
                    <p className="text-2xl font-bold text-secondary">
                      {monthlyData.keyMetrics.plasticWaste.value.toLocaleString()}{" "}
                      {monthlyData.keyMetrics.plasticWaste.unit}
                    </p>
                    <p className="text-sm text-primary/70">
                      {monthlyData.keyMetrics.plasticWaste.percentage}%{" "}
                      {t("ofTotal")}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full border border-surface-400">
                    <Recycle className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary bg-surface-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-primary/70">
                      {t("organicWaste")}
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {monthlyData.keyMetrics.organicWaste.value.toLocaleString()}{" "}
                      {monthlyData.keyMetrics.organicWaste.unit}
                    </p>
                    <p className="text-sm text-primary/70">
                      {monthlyData.keyMetrics.organicWaste.percentage}%{" "}
                      {t("ofTotal")}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full border border-surface-400">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-secondary bg-surface-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-primary/70">
                      {t("topZone")}
                    </p>
                    <p className="text-lg font-bold text-secondary">
                      {monthlyData.keyMetrics.topZone.name}
                    </p>
                    <p className="text-sm text-primary/70">
                      {monthlyData.keyMetrics.topZone.amount.toLocaleString()}{" "}
                      {monthlyData.keyMetrics.topZone.unit}
                    </p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-full border border-surface-400">
                    <MapPin className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Zone Performance Analysis */}
      <Card className="bg-surface border-surface-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <MapPin className="h-5 w-5" />
            {t("zonePerformanceAnalysis")}
          </CardTitle>
          <CardDescription className="text-primary/70">
            {t("detailedBreakdownOfWasteCollectionByZone")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {monthlyData.zonePerformance.map((zone, index) => (
              <Card
                key={zone.name}
                className="border border-surface-400 bg-surface-200 shadow-sm"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center border border-surface-400">
                        <span className="text-primary font-bold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-primary">
                          {zone.name}
                        </h4>
                        <p className="text-xs text-primary/70">
                          {zone.percentage}% من إجمالي النفايات
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${zone.trend === "increasing"
                          ? "bg-primary/10 text-primary border-primary/20"
                          : zone.trend === "decreasing"
                            ? "bg-destructive/10 text-destructive border-destructive/20"
                            : "bg-surface text-primary/70 border-surface-400"
                        }`}
                    >
                      {zone.trend === "increasing"
                        ? "↗"
                        : zone.trend === "decreasing"
                          ? "↘"
                          : "→"}{" "}
                      {zone.trend}
                    </Badge>
                  </div>

                  <div className="mb-3">
                    <p className="text-2xl font-bold text-primary">
                      {zone.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-primary/70">
                      kg {t("collected")}
                    </p>
                  </div>

                  <div className="w-full bg-surface rounded-full h-2 border border-surface-400">
                    <div
                      className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${zone.percentage}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Waste Trends & System Health */}
      <Card className="bg-surface border-surface-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <TrendingUp className="h-5 w-5" />
            {t("wasteTrendsSystemHealth")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* System Health */}
            <Card className="border border-surface-400 bg-surface-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg text-primary">
                    {t("systemHealth")}
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-surface rounded-lg border border-surface-400">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium text-primary">
                        {t("operationalBins")}
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-primary text-white"
                    >
                      {monthlyData.systemHealth.operationalBins}%
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-surface rounded-lg border border-surface-400">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium text-primary">
                        {t("grinderIssuesLabel")}
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-primary text-white"
                    >
                      {monthlyData.systemHealth.grinderIssues.pending}{" "}
                      {t("pending")}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-surface rounded-lg border border-surface-400">
                    <div className="flex items-center gap-3">
                      <Activity className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium text-primary">
                        {t("systemUptimeLabel")}
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      {monthlyData.systemHealth.uptime}%
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-surface rounded-lg border border-surface-400">
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-secondary" />
                      <span className="text-sm font-medium text-primary">
                        {t("maintenanceCompletedLabel")}
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-secondary/10 text-secondary border-secondary/20"
                    >
                      {monthlyData.systemHealth.maintenanceCompleted}{" "}
                      {t("tasks")}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-surface rounded-lg border border-surface-400">
                    <div className="flex items-center gap-3">
                      <Activity className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium text-primary">
                        {t("odorSensorStatusLabel")}
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      {monthlyData.systemHealth.odorSensorStatus}
                    </Badge>
                  </div>

                  {/* Grinder Issues Breakdown */}
                  <div className="mt-4 p-3 bg-surface rounded-lg border border-surface-400">
                    <h4 className="text-sm font-medium text-primary mb-2">
                      {t("grinderIssuesBreakdown")}
                    </h4>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-primary/70">
                          {t("resolved")}:
                        </span>
                      </div>
                      <span className="font-medium text-primary">
                        {monthlyData.systemHealth.grinderIssues.resolved}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-primary/70">{t("pending")}:</span>
                      </div>
                      <span className="font-medium text-orange-500">
                        {monthlyData.systemHealth.grinderIssues.pending}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Waste Trends */}
            <Card className="border border-surface-400 bg-surface-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg text-primary">
                    {t("wasteTrends")}
                  </h3>
                </div>
                <div className="space-y-4">
                  {monthlyData.wasteTrends.weeklyTotals.map((week, index) => (
                    <div
                      key={week.week}
                      className="flex items-center justify-between p-3 bg-surface rounded-lg border border-surface-400"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold border border-surface-400">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-sm text-primary">
                            {week.week}
                          </p>
                          <p className="text-xs text-primary/70">
                            {t("plastic")}: {week.plastic}kg | {t("organic")}:{" "}
                            {week.organic}
                            kg
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm text-primary">
                          {week.amount.toLocaleString()} kg
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Treatment Impact */}
      <Card className="bg-surface border-surface-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Zap className="h-5 w-5" />
            {t("treatmentImpact")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-primary bg-surface-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-primary/70">
                    {t("energyGenerationLabel")}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {monthlyData.treatmentImpact.energyGeneration.value.toLocaleString()}{" "}
                    {monthlyData.treatmentImpact.energyGeneration.unit}
                  </p>
                  <p className="text-xs text-primary/70 mt-1">
                    {monthlyData.treatmentImpact.energyGeneration.source}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-secondary bg-surface-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-primary/70">
                    {t("estimatedRevenue")}
                  </p>
                  <p className="text-2xl font-bold text-green-500">
                    $
                    {monthlyData.treatmentImpact.revenueGeneration.value.toLocaleString()}
                  </p>
                  <p className="text-xs text-primary/70 mt-1">
                    {monthlyData.treatmentImpact.revenueGeneration.source}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary bg-surface-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-primary/70">
                    {t("carbonFootprintReductionLabel")}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {monthlyData.treatmentImpact.carbonFootprint.value}{" "}
                    {monthlyData.treatmentImpact.carbonFootprint.unit}
                  </p>
                  <p className="text-xs text-primary/70 mt-1">
                    {monthlyData.treatmentImpact.carbonFootprint.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Comparison to Previous Month */}
      <Card className="bg-surface border-surface-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <BarChart3 className="h-5 w-5" />
            {t("comparisonToPreviousPeriod")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-surface-400 bg-surface-200">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Current vs Previous Values */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <p className="text-xs text-primary/70 mb-1">
                          {t("thisMonth")}
                        </p>
                        <p className="text-lg font-bold text-primary">
                          {monthlyData.comparisonToPrevious.thisMonth.toLocaleString()}{" "}
                          kg
                        </p>
                      </div>
                      <div className="text-primary/70">vs</div>
                      <div className="text-center">
                        <p className="text-xs text-primary/70 mb-1">
                          {t("lastMonth")}
                        </p>
                        <p className="text-lg font-bold text-primary/70">
                          {monthlyData.comparisonToPrevious.lastMonth.toLocaleString()}{" "}
                          kg
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`${monthlyData.comparisonToPrevious.changePercent >= 0
                          ? "bg-primary text-white"
                          : "bg-destructive text-destructive-foreground"
                        }`}
                    >
                      {monthlyData.comparisonToPrevious.changePercent >= 0
                        ? "+"
                        : ""}
                      {monthlyData.comparisonToPrevious.changePercent}%
                    </Badge>
                  </div>

                  {/* Change Indicator */}
                  <div className="text-center">
                    <p className="text-sm text-primary/70">
                      {Math.abs(monthlyData.comparisonToPrevious.changePercent)}
                      %
                      {monthlyData.comparisonToPrevious.changePercent >= 0
                        ? ` ${t("increase")}`
                        : ` ${t("decrease")}`}{" "}
                      {t("fromPreviousMonth")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-surface-400 bg-surface-200">
              <CardContent className="p-4">
                <h4 className="font-medium text-primary mb-3">
                  {t("keyChanges")}
                </h4>
                <div className="space-y-2">
                  {monthlyData.comparisonToPrevious.keyChanges.map(
                    (change, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-surface rounded border border-surface-400"
                      >
                        <span className="text-sm text-primary">
                          {change.metric}
                        </span>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="bg-primary/10 text-primary"
                          >
                            {change.change}
                          </Badge>
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div className="mt-4 p-3 bg-surface rounded-lg border border-surface-400">
                  <h5 className="text-sm font-medium mb-2 text-primary">
                    {t("reasonForChanges")}
                  </h5>
                  <div className="space-y-1">
                    {monthlyData.comparisonToPrevious.keyChanges.map(
                      (change, index) => (
                        <p key={index} className="text-xs text-primary/70">
                          <span className="font-medium">{change.metric}:</span>{" "}
                          {change.reason}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-surface border-surface-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <FileText className="h-5 w-5" />
            {t("recommendations")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {monthlyData.recommendations.map((recommendation, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-surface-200 rounded-lg border border-surface-400"
              >
                <Badge
                  variant="secondary"
                  className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                >
                  {index + 1}
                </Badge>
                <p className="text-sm text-primary/70 leading-relaxed">
                  {recommendation}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
