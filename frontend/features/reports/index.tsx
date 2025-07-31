"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Calendar,
  TrendingUp,
  BarChart3,
  Download,
  Activity,
  Clock,
} from "lucide-react";
import { WeeklyReport } from "./components/weekly-report";
import { MonthlyReport } from "./components/monthly-report";
import { AnnualReport } from "./components/annual-report";

type ReportType = "weekly" | "monthly" | "annual";

interface ReportsFeatureProps {
  onTypeClick?: (type: any) => void;
}

export function ReportsFeature({ onTypeClick }: ReportsFeatureProps) {
  const t = useTranslations("reports");
  const commonT = useTranslations("common");

  const [selectedReportType, setSelectedReportType] =
    useState<ReportType>("weekly");
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    {
      value: "weekly",
      label: t("weeklyReport"),
      icon: Calendar,
      description: t("weeklyReportDescription"),
    },
    {
      value: "monthly",
      label: t("monthlyReport"),
      icon: TrendingUp,
      description: t("monthlyReportDescription"),
    },
    {
      value: "annual",
      label: t("annualReport"),
      icon: BarChart3,
      description: t("annualReportDescription"),
    },
  ];

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    // TODO: Implement actual report generation logic
    setTimeout(() => {
      setIsGenerating(false);
      // Simulate report generation
      console.log(`Generating ${selectedReportType} report...`);
    }, 2000);
  };

  const selectedReport = reportTypes.find(
    (r) => r.value === selectedReportType
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            {t("title")}
          </h2>
          <p className="text-muted-foreground mt-2">{t("description")}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <Activity className="h-4 w-4 animate-spin" />
                {t("generating")}
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                {t("generateReport")}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Report Type Selection */}
      <Card className="bg-surface border-surface-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <FileText className="h-5 w-5" />
            {t("selectReportType")}
          </CardTitle>
          <CardDescription className="text-primary/70">
            {t("selectReportTypeDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <Card
                  key={report.value}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md border-surface-400 ${
                    selectedReportType === report.value
                      ? "border-primary bg-primary/5"
                      : "bg-surface-200 hover:bg-surface"
                  }`}
                  onClick={() =>
                    setSelectedReportType(report.value as ReportType)
                  }
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-2 rounded-lg ${
                          selectedReportType === report.value
                            ? "bg-primary text-white"
                            : "bg-surface border border-surface-400"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary">
                          {report.label}
                        </h4>
                        {selectedReportType === report.value && (
                          <Badge className="mt-1 bg-primary text-white hover:bg-primary/90">
                            {t("selected")}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-primary/70">
                      {report.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Report Preview/Content */}
      <Card className="bg-surface border-surface-400">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center mb-4">
            <div>
              {selectedReportType === "weekly" && (
                <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-professional bg-clip-text text-transparent mb-2 tracking-tight">
                  {t("weeklyWasteReportTitle")}
                </h1>
              )}
              {selectedReportType === "monthly" && (
                <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-professional bg-clip-text text-transparent mb-2 tracking-tight">
                  {t("monthlyWasteReportTitle")}
                </h1>
              )}
              {selectedReportType === "annual" && (
                <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-professional bg-clip-text text-transparent mb-2 tracking-tight">
                  {t("annualWasteReportTitle")}
                </h1>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedReportType === "weekly" && <WeeklyReport />}
          {selectedReportType === "monthly" && <MonthlyReport />}
          {selectedReportType === "annual" && <AnnualReport />}
        </CardContent>
      </Card>
    </div>
  );
}
