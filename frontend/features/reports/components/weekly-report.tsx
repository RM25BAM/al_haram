"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  MapPin,
  Activity,
  Calendar,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { fetchWeeklyReport, fetchWeeklyReportPeriods } from "@/lib/api";
import type { TWeeklyReportData, TWeeklyReportPeriod } from "@/types";

export function WeeklyReport() {
  const t = useTranslations("reports");
  const tCommon = useTranslations("common");
  const tError = useTranslations("errors");
  const locale = useLocale();

  // Helper function to normalize status values for comparison
  const normalizeStatus = (status: string): string => {
    const statusMap: Record<string, string> = {
      pending: "pending",
      معلق: "pending",
      resolved: "resolved",
      محلول: "resolved",
      completed: "completed",
      مكتمل: "completed",
    };
    return statusMap[status] || status;
  };

  // State management
  const [weeklyData, setWeeklyData] = useState<TWeeklyReportData | null>(null);
  const [availablePeriods, setAvailablePeriods] = useState<
    TWeeklyReportPeriod[]
  >([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch available periods on component mount
  useEffect(() => {
    const loadAvailablePeriods = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const periods = await fetchWeeklyReportPeriods();
        setAvailablePeriods(periods);

        // Auto-select the most recent period (last in array)
        if (periods.length > 0) {
          const mostRecent = periods[periods.length - 1];
          const selectedPeriodValue = `${mostRecent.year}-${mostRecent.week}`;
          setSelectedPeriod(selectedPeriodValue);
        }
      } catch (err) {
        console.error("❌ Failed to load available periods:", err);
        setError(tError("general"));
      } finally {
        setIsLoading(false);
      }
    };

    loadAvailablePeriods();
  }, []);

  // Fetch weekly report data when period changes
  useEffect(() => {
    if (!selectedPeriod) {
      return;
    }

    const loadWeeklyReport = async () => {
      try {
        setIsRefreshing(true);
        setError(null);
        const [year, week] = selectedPeriod.split("-").map(Number);
        const reportData = await fetchWeeklyReport(year, week, locale);
        setWeeklyData(reportData);
      } catch (err) {
        console.error("❌ Failed to load weekly report:", err);
        setError(tError("general"));
      } finally {
        setIsRefreshing(false);
      }
    };

    loadWeeklyReport();
  }, [selectedPeriod]);

  // Handle refresh
  const handleRefresh = async () => {
    if (!selectedPeriod) return;

    try {
      setIsRefreshing(true);
      setError(null);
      const [year, week] = selectedPeriod.split("-").map(Number);
      const reportData = await fetchWeeklyReport(year, week, locale);
      setWeeklyData(reportData);
    } catch (err) {
      console.error("Failed to refresh weekly report:", err);
      setError(tError("general"));
    } finally {
      setIsRefreshing(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-primary/70">{t("loadingReport")}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md bg-surface border-outline">
          <CardContent className="p-6 text-center space-y-4">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto" />
            <div>
              <h3 className="font-semibold text-primary">{t("errorReport")}</h3>
              <p className="text-sm text-primary/70 mt-2">{error}</p>
            </div>
            <Button onClick={() => window.location.reload()} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              {tCommon("refresh")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // No data state
  if (!weeklyData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <BarChart3 className="h-8 w-8 mx-auto text-primary/70" />
          <p className="text-primary/70">{t("noDataAvailable")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <Card className="bg-surface border-outline">
        <CardHeader>
          <div className="flex flex-col gap-1 md:flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-primary">
              <Calendar className="h-5 w-5" />
              {t("weeklyReport")} - {weeklyData.coverPage.title}
            </CardTitle>
            <div className="flex items-center gap-3">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[200px] bg-surface-200 border-outline">
                  <SelectValue
                    placeholder={`${tCommon("filter")} ${t("weeklyReport").toLowerCase()}...`}
                  />
                </SelectTrigger>
                <SelectContent>
                  {availablePeriods.map((period) => (
                    <SelectItem
                      key={`${period.year}-${period.week}`}
                      value={`${period.year}-${period.week}`}
                    >
                      {period.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                disabled={isRefreshing}
                className="bg-surface-200 border-outline hover:bg-surface hover:text-primary"
              >
                {isRefreshing ? (
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                ) : (
                  <RefreshCw className="h-4 w-4 text-primary" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-primary/70">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {t("reportPeriod")}:{" "}
              {weeklyData.coverPage.period ||
                weeklyData.coverPage.reportingPeriod}
            </span>
            <span className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              {t("generated")}: {weeklyData.coverPage.generatedDate}
            </span>
            <span className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              {tCommon("name")}: {weeklyData.coverPage.systemName}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Summary Section */}
      <Card className="bg-surface border-outline">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Activity className="h-5 w-5" />
            {t("summary")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-surface-200 rounded-lg border border-outline">
              <p className="text-2xl font-bold text-primary">
                {weeklyData.summary.totalWasteKg?.toLocaleString() || 0} kg
              </p>
              <p className="text-sm text-primary/70">
                {t("totalWasteCollected")}
              </p>
            </div>
            <div className="text-center p-4 bg-surface-200 rounded-lg border border-outline">
              <p className="text-2xl font-bold text-secondary">
                {weeklyData.summary.topWasteZone || "N/A"}
              </p>
              <p className="text-sm text-primary/70">
                {t("topWasteGeneratingZone")}
              </p>
            </div>
            <div className="text-center p-4 bg-surface-200 rounded-lg border border-outline">
              <p className="text-2xl font-bold text-primary">
                {weeklyData.summary.systemStatus ||
                  weeklyData.summary.systemPerformance ||
                  t("operationalStatus")}
              </p>
              <p className="text-sm text-primary/70">{t("systemStatus")}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Key Highlights */}
            <Card className="border border-outline bg-surface-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h4 className="font-medium text-primary">{t("summary")}</h4>
                </div>
                <ul className="space-y-3 text-sm text-primary/80 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span className="leading-relaxed">
                      {t("totalWasteCollected").toLowerCase()}{" "}
                      {weeklyData.summary.percentChangeFromLastWeek
                        ? weeklyData.summary.percentChangeFromLastWeek > 0
                          ? t("increased")
                          : t("decreased")
                        : t("changed")}{" "}
                      {t("comparisonToPrevious")}{" "}
                      <span className="font-semibold text-primary">
                        {Math.abs(
                          weeklyData.summary.percentChangeFromLastWeek || 0
                        )}
                        %
                      </span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary font-bold">•</span>
                    <span className="leading-relaxed">
                      <span className="font-semibold text-secondary">
                        {weeklyData.summary.topWasteZone || "N/A"}
                      </span>{" "}
                      {t("continuesToBeHighest")}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span className="leading-relaxed">
                      {t("systemOperatingAt")}{" "}
                      <span className="font-semibold text-primary">
                        {t("optimalCapacity")}
                      </span>{" "}
                      {t("withMinimalDisruptions")}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary font-bold">•</span>
                    <span className="leading-relaxed">
                      <span className="font-semibold text-primary">
                        {t("plasticWaste")}:{" "}
                        {weeklyData.summary.plasticWasteKg?.toLocaleString() ||
                          0}{" "}
                        kg
                      </span>{" "}
                      |{" "}
                      <span className="font-semibold text-secondary">
                        {t("organicWaste")}:{" "}
                        {weeklyData.summary.organicWasteKg?.toLocaleString() ||
                          0}{" "}
                        kg
                      </span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span className="leading-relaxed">
                      <span className="font-semibold text-primary">
                        {weeklyData.weekToWeekComparison?.dailyBreakdown?.reduce(
                          (max, day) =>
                            day.thisWeek > max.thisWeek ? day : max,
                          { day: "Friday", thisWeek: 0 }
                        )?.day || "Friday"}{" "}
                        {t("recordedHighestCollection")}
                      </span>{" "}
                      {t("with")}{" "}
                      {weeklyData.weekToWeekComparison?.dailyBreakdown?.reduce(
                        (max, day) => (day.thisWeek > max.thisWeek ? day : max),
                        { thisWeek: 0 }
                      )?.thisWeek || 0}{" "}
                      kg
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary font-bold">•</span>
                    <span className="leading-relaxed">
                      <span className="font-semibold text-secondary">
                        2 {t("systemAlertsResolved")}
                      </span>{" "}
                      {t("efficiently")}, {t("maintaining")} 98%{" "}
                      {t("operationalUptime")}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span className="leading-relaxed">
                      <span className="font-semibold text-primary">
                        {t("energyRecovery")}: 512 {t("kWhGenerated")}
                      </span>{" "}
                      {t("fromOrganicWasteProcessing")}
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Top 3 Waste Zones - Mini Leaderboard */}
            <Card className="border border-outline bg-surface-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h4 className="font-medium text-primary">
                    {t("topWasteZones")}
                  </h4>
                </div>
                <div className="space-y-3">
                  {(weeklyData.topWasteZones || [])
                    .slice(0, 3)
                    .map((zone, index) => (
                      <div
                        key={zone.name}
                        className="flex items-center justify-between p-3 bg-surface rounded-lg border border-outline"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${
                              index === 0
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
                              {zone.percentage}% {t("ofTotalWaste")}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm text-primary">
                            {zone.amount.toLocaleString()} kg
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

      {/* Key Metrics at a Glance */}
      <Card className="bg-surface border-outline">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <BarChart3 className="h-5 w-5" />
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
                      {weeklyData.keyMetrics.totalWaste.value.toLocaleString()}{" "}
                      {weeklyData.keyMetrics.totalWaste.unit}
                    </p>
                    <p className="text-sm text-primary">
                      {weeklyData.keyMetrics.totalWaste.change
                        ? `${
                            weeklyData.keyMetrics.totalWaste.change > 0
                              ? "+"
                              : ""
                          }${
                            weeklyData.keyMetrics.totalWaste.change
                          }% ${t("percentChangeFromLast")}`
                        : t("noDataAvailable")}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-full border border-outline">
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
                      {weeklyData.keyMetrics.plasticWaste.value.toLocaleString()}{" "}
                      {weeklyData.keyMetrics.plasticWaste.unit}
                    </p>
                    <p className="text-sm text-primary/70">
                      {weeklyData.keyMetrics.plasticWaste.percentage || 0}%{" "}
                      {t("ofTotalWaste")}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full border border-outline">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
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
                      {weeklyData.keyMetrics.organicWaste.value.toLocaleString()}{" "}
                      {weeklyData.keyMetrics.organicWaste.unit}
                    </p>
                    <p className="text-sm text-primary/70">
                      {weeklyData.keyMetrics.organicWaste.percentage || 0}%{" "}
                      {t("ofTotalWaste")}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full border border-outline">
                    <Activity className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-secondary bg-surface-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-primary/70">
                      {t("topWasteGeneratingZone")}
                    </p>
                    <p className="text-xl font-bold text-secondary">
                      {weeklyData.keyMetrics.topZone.name}
                    </p>
                    <p className="text-sm text-primary/70">
                      {weeklyData.keyMetrics.topZone.amount}{" "}
                      {weeklyData.keyMetrics.topZone.unit}
                    </p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-full border border-outline">
                    <MapPin className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* System Status & Performance Analysis */}
      <Card className="bg-surface border-outline">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Activity className="h-5 w-5" />
            {t("systemHealth")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* System Alerts */}
            <div className="p-4 rounded-lg border border-outline bg-surface-200">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-primary" />
                <h4 className="font-medium text-primary">
                  {t("systemAlerts")}
                </h4>
              </div>
              <div className="space-y-3">
                {(weeklyData.systemAlerts || []).map((alert, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      alert.type === "warning"
                        ? "bg-orange-50 border-l-4 border-orange-500"
                        : alert.type === "resolved"
                          ? "bg-primary/5 border-l-4 border-primary"
                          : "bg-surface border-l-4 border-secondary"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {alert.type === "warning" && (
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                      )}
                      {alert.type === "resolved" && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                      {alert.type === "info" && (
                        <Activity className="h-5 w-5 text-secondary" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium text-primary">{alert.zone}</p>
                      <p className="text-sm text-primary/70">{alert.issue}</p>
                    </div>
                    <Badge
                      variant={
                        normalizeStatus(alert.status) === "pending"
                          ? "destructive"
                          : normalizeStatus(alert.status) === "resolved"
                            ? "secondary"
                            : "default"
                      }
                      className={
                        normalizeStatus(alert.status) === "resolved"
                          ? "bg-primary text-white"
                          : normalizeStatus(alert.status) === "pending"
                            ? "bg-red-500 text-white"
                            : "bg-secondary text-white"
                      }
                    >
                      {alert.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Week-to-Week Comparison */}
            <div className="bg-surface-200 p-4 rounded-lg border border-outline">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-primary" />
                <h4 className="font-medium text-primary">
                  {t("weekToWeekComparison")}
                </h4>
              </div>
              <div className="space-y-4">
                {/* Compact weekly summary */}
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center p-3 bg-surface rounded-lg border border-outline">
                    <p className="text-xl font-bold text-primary">
                      {weeklyData.weekToWeekComparison.thisWeek.toLocaleString()}{" "}
                      kg
                    </p>
                    <p className="text-xs text-primary/70">
                      {tCommon("thisWeek")}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-surface rounded-lg border border-outline">
                    <p className="text-xl font-bold text-secondary">
                      {weeklyData.weekToWeekComparison.lastWeek.toLocaleString()}{" "}
                      kg
                    </p>
                    <p className="text-xs text-primary/70">
                      {tCommon("previous")} {t("weeklyReport").toLowerCase()}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    <h5 className="font-medium text-sm text-primary">
                      {t("wasteBreakdown")} {t("comparisonToPrevious")}
                    </h5>
                  </div>

                  <div className="space-y-2">
                    {(weeklyData.weekToWeekComparison.dailyBreakdown || [])
                      .reduce((pairs: any[], day, index) => {
                        if (index % 2 === 0) {
                          pairs.push([
                            day,
                            weeklyData.weekToWeekComparison.dailyBreakdown[
                              index + 1
                            ],
                          ]);
                        }
                        return pairs;
                      }, [])
                      .map((dayPair: any[], pairIndex: number) => {
                        const maxValue = Math.max(
                          ...(
                            weeklyData.weekToWeekComparison.dailyBreakdown || []
                          ).map((d) => Math.max(d.thisWeek, d.lastWeek))
                        );

                        return (
                          <div
                            key={pairIndex}
                            className="grid grid-cols-1 md:grid-cols-2 gap-3"
                          >
                            {dayPair.map((day: any, dayIndex: number) => {
                              if (!day) return null;

                              const change =
                                ((day.thisWeek - day.lastWeek) / day.lastWeek) *
                                100;
                              const isIncrease = change > 0;

                              return (
                                <div
                                  key={day.day}
                                  className="bg-surface rounded-lg p-2 border border-outline shadow-sm"
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shadow-lg border-2 border-outline">
                                        <span className="text-primary font-bold text-sm">
                                          {day.day.slice(0, 3)}
                                        </span>
                                      </div>
                                      <div className="text-xs space-y-1">
                                        <div className="flex items-center gap-2">
                                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                                          <span className="font-medium text-primary">
                                            {day.thisWeek} kg
                                          </span>
                                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                            {tCommon("thisWeek")}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <div className="w-2 h-2 bg-secondary rounded-full"></div>
                                          <span className="font-medium text-secondary">
                                            {day.lastWeek} kg
                                          </span>
                                          <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">
                                            {tCommon("previous")}{" "}
                                            {t("weeklyReport").toLowerCase()}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className={`text-xs font-medium ${
                                        isIncrease
                                          ? "text-primary"
                                          : "text-red-600"
                                      }`}
                                    >
                                      {isIncrease ? "↗" : "↘"}
                                      {Math.abs(change).toFixed(1)}%
                                    </div>
                                  </div>

                                  <div className="flex gap-2">
                                    <div className="flex-grow bg-primary/10 rounded-full h-1.5 relative">
                                      <div
                                        className="bg-primary h-1.5 rounded-full"
                                        style={{
                                          width: `${
                                            (day.thisWeek / maxValue) * 100
                                          }%`,
                                        }}
                                      />
                                    </div>
                                    <div className="flex-grow bg-secondary/10 rounded-full h-1.5 relative">
                                      <div
                                        className="bg-secondary h-1.5 rounded-full"
                                        style={{
                                          width: `${
                                            (day.lastWeek / maxValue) * 100
                                          }%`,
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
