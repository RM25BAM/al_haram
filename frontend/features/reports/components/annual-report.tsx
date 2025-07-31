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
  Calendar,
  TrendingUp,
  DollarSign,
  Zap,
  Leaf,
  Activity,
  Settings,
  Target,
  Award,
  BarChart3,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { fetchAnnualReport } from "@/lib/api";
import type { TAnnualReportData } from "@/types";

export function AnnualReport() {
  const t = useTranslations("reports");
  const locale = useLocale();
  const [annualData, setAnnualData] = useState<TAnnualReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch current year data (2024 for demonstration, could be dynamic)
        const currentYear = 2024; // You can make this dynamic based on user selection

        const data = await fetchAnnualReport(currentYear, locale);
        setAnnualData(data);
      } catch (err) {
        console.error("Failed to fetch annual report:", err);
        setError(t("failedToLoadReportData"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-primary">{t("loadingAnnualReport")}</span>
        </div>
      </div>
    );
  }

  if (error || !annualData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="p-6  border-surface-400">
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
    <div className="space-y-6">
      {/* Cover Page */}
      <Card className="bg-surface-300 border-surface-400">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary">
            {annualData.coverPage.title}
          </CardTitle>
          <div className="mt-4 text-sm text-primary/80 space-y-1">
            <p className="font-medium">{annualData.coverPage.systemName}</p>
            <p>
              {t("reportingPeriod")}: {annualData.coverPage.reportingPeriod}
            </p>
            <p>
              {t("generated")}: {annualData.coverPage.generatedDate}
            </p>
          </div>
        </CardHeader>
      </Card>

      {/* Annual Waste Summary */}
      <Card className="bg-surface border-surface-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <BarChart3 className="h-5 w-5" />
            {t("annualWasteSummary")} - {t("overviewYear", { year: "2024" })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-surface-200 rounded-lg border border-surface-400">
              <p className="text-3xl font-bold text-primary">
                {annualData.annualWasteSummary.totalWaste.value.toLocaleString()}
              </p>
              <p className="text-sm text-primary/70">
                {t("totalWaste")} (
                {annualData.annualWasteSummary.totalWaste.unit})
              </p>
            </div>
            <div className="text-center p-4 bg-surface-200 rounded-lg border border-surface-400">
              <p className="text-3xl font-bold text-primary">
                {annualData.annualWasteSummary.monthlyAverage.value.toLocaleString()}
              </p>
              <p className="text-sm text-primary/70">
                {t("monthlyAverage")} (
                {annualData.annualWasteSummary.monthlyAverage.unit})
              </p>
            </div>
            <div className="text-center p-4 bg-surface-200 rounded-lg border border-surface-400">
              <p className="text-3xl font-bold text-primary">
                +{annualData.annualWasteSummary.yearOverYearGrowth.value}%
              </p>
              <p className="text-sm text-primary/70">
                {t("yearOverYearGrowth")}
              </p>
            </div>
            <div className="text-center p-4 bg-surface-200 rounded-lg border border-surface-400">
              <p className="text-3xl font-bold text-primary">
                {annualData.annualWasteSummary.peakMonth.amount.toLocaleString()}
              </p>
              <p className="text-sm text-primary/70">
                {t("peakMonth")} (
                {annualData.annualWasteSummary.peakMonth.month})
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-l-4 border-l-primary bg-surface-200 border-surface-400">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2 text-primary">
                  {t("plasticWaste")}
                </h4>
                <p className="text-2xl font-bold text-primary">
                  {annualData.annualWasteSummary.plasticWaste.value.toLocaleString()}{" "}
                  {annualData.annualWasteSummary.plasticWaste.unit}
                </p>
                <p className="text-sm text-primary/70">
                  {annualData.annualWasteSummary.plasticWaste.percentage}%{" "}
                  {t("ofTotalWaste")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-secondary bg-surface-200 border-surface-400">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2 text-primary">
                  {t("organicWaste")}
                </h4>
                <p className="text-2xl font-bold text-primary">
                  {annualData.annualWasteSummary.organicWaste.value.toLocaleString()}{" "}
                  {annualData.annualWasteSummary.organicWaste.unit}
                </p>
                <p className="text-sm text-primary/70">
                  {annualData.annualWasteSummary.organicWaste.percentage}%{" "}
                  {t("ofTotalWaste")}
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Breakdown */}
      <Card className="bg-surface-300 border-surface-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <TrendingUp className="h-5 w-5" />
            {t("monthlyWasteBreakdown")} - {t("year2024")}
          </CardTitle>
          <CardDescription className="flex items-center gap-4 text-primary/70">
            <span>{t("detailedMonthlyProgression")}</span>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-primary">{t("plastic")}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span className="text-secondary">{t("organic")}</span>
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Column - Jan to Jun */}
            <div className="space-y-3">
              {annualData.monthlyBreakdown.slice(0, 6).map((month, index) => (
                <div
                  key={month.month}
                  className="flex items-center gap-4 p-3 bg-surface-200 rounded-lg border border-surface-400 shadow-sm"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-md border-2 border-surface-400e">
                    <span className="text-primary font-bold text-xs drop-shadow-sm">
                      {month.month}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="font-medium text-primary">
                          {month.total.toLocaleString()} {t("kg")}
                        </span>
                        <div className="flex gap-3 text-sm mt-1">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-primary font-medium">
                              {t("plasticShort")}:{" "}
                              {month.plastic.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-secondary rounded-full"></div>
                            <span className="text-secondary font-medium">
                              {t("organicShort")}:{" "}
                              {month.organic.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-grow bg-surface-200 rounded-full h-2 relative">
                        <div
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                          style={{ width: `${(month.total / 18750) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={month.growth > 0 ? "default" : "secondary"}
                    className={
                      month.growth > 0
                        ? "bg-primary text-white border-primary"
                        : "bg-secondary text-white border-secondary"
                    }
                  >
                    {month.growth > 0 ? "+" : ""}
                    {month.growth}%
                  </Badge>
                </div>
              ))}
            </div>

            {/* Second Column - Jul to Dec */}
            <div className="space-y-3">
              {annualData.monthlyBreakdown.slice(6, 12).map((month) => (
                <div
                  key={month.month}
                  className="flex items-center gap-4 p-3 bg-surface-200 rounded-lg border border-surface-400 shadow-sm"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center shadow-md border-2 border-surface-400">
                    <span className="text-primary font-bold text-xs drop-shadow-sm">
                      {month.month}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="font-medium text-primary">
                          {month.total.toLocaleString()} {t("kg")}
                        </span>
                        <div className="flex gap-3 text-sm mt-1">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-primary font-medium">
                              {t("plasticShort")}:{" "}
                              {month.plastic.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-secondary rounded-full"></div>
                            <span className="text-secondary font-medium">
                              {t("organicShort")}:{" "}
                              {month.organic.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-grow bg-surface-200 rounded-full h-2 relative">
                        <div
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                          style={{ width: `${(month.total / 18750) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={month.growth > 0 ? "default" : "secondary"}
                    className={
                      month.growth > 0
                        ? "bg-primary text-white border-primary"
                        : "bg-secondary text-white border-secondary"
                    }
                  >
                    {month.growth > 0 ? "+" : ""}
                    {month.growth}%
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Outcomes */}
      <Card className="bg-surface border-surface-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <DollarSign className="h-5 w-5" />
            {t("financialOutcomes")} - {t("revenueProfitability")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-surface-200 rounded-lg border border-surface-400">
              <p className="text-2xl font-bold text-primary">
                $
                {annualData.financialOutcomes.totalRevenue.value.toLocaleString()}
              </p>
              <p className="text-sm text-primary/70">{t("totalRevenue")}</p>
            </div>
            <div className="text-center p-4 bg-surface-200 rounded-lg border border-surface-400">
              <p className="text-2xl font-bold text-primary">
                $
                {annualData.financialOutcomes.operationalCosts.value.toLocaleString()}
              </p>
              <p className="text-sm text-primary/70">{t("operationalCosts")}</p>
            </div>
            <div className="text-center p-4 bg-surface-200 rounded-lg border border-surface-400">
              <p className="text-2xl font-bold text-primary">
                ${annualData.financialOutcomes.netProfit.value.toLocaleString()}
              </p>
              <p className="text-sm text-primary/70">{t("netProfit")}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-l-4 border-l-primary bg-surface-200 border-surface-400">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2 text-primary">
                  {t("plasticRecyclingRevenue")}
                </h4>
                <p className="text-xl font-bold text-primary">
                  $
                  {annualData.financialOutcomes.plasticRecycling.value.toLocaleString()}
                </p>
                <p className="text-sm text-primary/70">
                  {annualData.financialOutcomes.plasticRecycling.percentage}%{" "}
                  {t("ofTotalRevenue")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-secondary bg-surface-200 border-surface-400">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2 text-primary">
                  {t("energyGenerationRevenue")}
                </h4>
                <p className="text-xl font-bold text-primary">
                  $
                  {annualData.financialOutcomes.energyGeneration.value.toLocaleString()}
                </p>
                <p className="text-sm text-primary/70">
                  {annualData.financialOutcomes.energyGeneration.percentage}%{" "}
                  {t("ofTotalRevenue")}
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Energy Generation */}
      <Card className="bg-surface border-surface-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Zap className="h-5 w-5" />
            {t("energyGeneration")} - {t("renewableEnergyOutput")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-primary bg-surface-200 border-surface-400">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-primary/70">
                      {t("totalEnergyGenerated")}
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {annualData.energyGeneration.totalEnergy.value.toLocaleString()}{" "}
                      {annualData.energyGeneration.totalEnergy.unit}
                    </p>
                  </div>
                  <Zap className="h-8 w-8 text-amber-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-secondary bg-surface-200 border-surface-400">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-primary/70">
                      {t("monthlyAverage")}
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {annualData.energyGeneration.monthlyAverage.value.toLocaleString()}{" "}
                      {annualData.energyGeneration.monthlyAverage.unit}
                    </p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary bg-surface-200 border-surface-400">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-primary/70">
                      {t("equivalentHouseholds")}
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {annualData.energyGeneration.equivalentHouseholds.value}
                    </p>
                  </div>
                  <Award className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Environmental Impact */}
      <Card className="bg-surface border-surface-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Leaf className="h-5 w-5" />
            {t("environmentalImpact")} - {t("sustainabilityMetrics")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-surface-200 border-surface-400">
              <CardContent className="p-4">
                <div className="text-center">
                  <Leaf className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary">
                    {annualData.environmentalImpact.totalCarbonReduction.value}{" "}
                    {annualData.environmentalImpact.totalCarbonReduction.unit}
                  </p>
                  <p className="text-sm text-primary/70">
                    {t("carbonReduction")}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-surface-200 border-surface-400">
              <CardContent className="p-4">
                <div className="text-center">
                  <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary">
                    {annualData.environmentalImpact.plasticRecycled.value}{" "}
                    {annualData.environmentalImpact.plasticRecycled.unit}
                  </p>
                  <p className="text-sm text-primary/70">
                    {t("plasticRecycled")}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-surface-200 border-surface-400">
              <CardContent className="p-4">
                <div className="text-center">
                  <Target className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary">
                    {annualData.environmentalImpact.wasteFromLandfill.value}{" "}
                    {annualData.environmentalImpact.wasteFromLandfill.unit}
                  </p>
                  <p className="text-sm text-primary/70">
                    {t("wasteDiverted")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Report Summaries */}
      <Card className="bg-surface border-surface-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Settings className="h-5 w-5" />
            {t("maintenanceReportSummaries")} - {t("systemReliability")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-surface-200 rounded-lg border border-surface-400">
              <p className="text-2xl font-bold text-primary">
                {annualData.maintenanceReportSummaries.totalMaintenanceHours.toLocaleString()}
              </p>
              <p className="text-sm text-primary/70">
                {t("totalMaintenanceHours")}
              </p>
            </div>
            <div className="text-center p-4 bg-surface-200 rounded-lg border border-surface-400">
              <p className="text-2xl font-bold text-primary">
                {annualData.maintenanceReportSummaries.scheduledMaintenance}
              </p>
              <p className="text-sm text-primary/70">
                {t("scheduledMaintenance")}
              </p>
            </div>
            <div className="text-center p-4 bg-surface-200 rounded-lg border border-surface-400">
              <p className="text-2xl font-bold text-primary">
                {annualData.maintenanceReportSummaries.emergencyRepairs}
              </p>
              <p className="text-sm text-primary/70">{t("emergencyRepairs")}</p>
            </div>
            <div className="text-center p-4 bg-surface-200 rounded-lg border border-surface-400">
              <p className="text-2xl font-bold text-primary">
                {annualData.maintenanceReportSummaries.systemUptime}%
              </p>
              <p className="text-sm text-primary/70">{t("systemUptime")}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-primary">
              {t("maintenanceCategories")}:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {annualData.maintenanceReportSummaries.maintenanceCategories.map(
                (category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-surface-200 rounded-lg border border-surface-400"
                  >
                    <div>
                      <p className="font-medium text-primary">
                        {category.category}
                      </p>
                      <p className="text-sm text-primary/70">
                        {category.count} {t("incidents")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">
                        {category.hours} {t("hours")}
                      </p>
                      <p className="text-sm text-primary/70">
                        {Math.round(category.hours / category.count)}{" "}
                        {t("hrsIncident")}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quarterly Performance */}
      <Card className="bg-surface border-surface-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <BarChart3 className="h-5 w-5" />
            {t("quarterlyPerformanceSummary")}
          </CardTitle>
          <CardDescription className="text-primary/70">
            {t("yearOverYearPerformanceAnalysis")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {annualData.quarterlyPerformance.map((quarter, index) => (
              <Card
                key={quarter.quarter}
                className="relative overflow-hidden bg-surface-200 border-surface-400 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <CardContent className="p-6">
                  {/* Quarter Header */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-primary font-bold text-lg">
                          {quarter.quarter}
                        </span>
                      </div>
                      <div className="text-center">
                        <h3 className="font-semibold text-primary">
                          {quarter.quarter} {t("year2024")}
                        </h3>
                        <p className="text-xs text-primary/70">
                          {t("quarter")} {index + 1}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-4">
                    {/* Waste Volume */}
                    <div className="flex items-center justify-between p-3 bg-surface rounded-lg border border-surface-400">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="text-sm font-medium text-primary">
                          {t("waste")}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-primary">
                          {quarter.waste.toLocaleString()}
                        </p>
                        <p className="text-xs text-primary/70">{t("kg")}</p>
                      </div>
                    </div>

                    {/* Revenue */}
                    <div className="flex items-center justify-between p-3 bg-surface rounded-lg border border-surface-400">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-secondary rounded-full"></div>
                        <span className="text-sm font-medium text-primary">
                          {t("revenue")}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-primary">
                          ${quarter.revenue.toLocaleString()}
                        </p>
                        <p className="text-xs text-primary/70">{t("earned")}</p>
                      </div>
                    </div>

                    {/* System Uptime */}
                    <div className="flex items-center justify-between p-3 bg-surface rounded-lg border border-surface-400">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="text-sm font-medium text-primary">
                          {t("uptime")}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-primary">
                          {quarter.uptime}%
                        </p>
                        <p className="text-xs text-primary/70">
                          {t("operational")}
                        </p>
                      </div>
                    </div>

                    {/* Efficiency */}
                    <div className="flex items-center justify-between p-3 bg-surface rounded-lg border border-surface-400">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-secondary rounded-full"></div>
                        <span className="text-sm font-medium text-primary">
                          {t("efficiency")}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-primary">
                          {quarter.efficiency}%
                        </p>
                        <p className="text-xs text-primary/70">
                          {t("achieved")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Performance Indicator */}
                  <div className="mt-6 pt-4 border-t border-surface-400">
                    <div className="flex items-center justify-between text-xs text-primary/70 mb-3">
                      <span>{t("overallScore")}</span>
                      <span className="font-medium">
                        {Math.round((quarter.uptime + quarter.efficiency) / 2)}%
                      </span>
                    </div>
                    <div className="w-full bg-surface-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.round(
                            (quarter.uptime + quarter.efficiency) / 2
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-surface border-surface-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Target className="h-5 w-5" />
            {t("recommendations")} - {t("strategicActionsFor2025")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {annualData.recommendations.map((recommendation, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-gradient-to-r from-surface to-surface-200 rounded-lg border border-surface-400"
              >
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                </div>
                <p className="text-sm text-primary/80">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
