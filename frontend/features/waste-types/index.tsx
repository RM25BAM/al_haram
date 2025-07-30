import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ExportDialog, ExportFormat } from "@/components/ui/export-dialog";
import { useTranslations } from "next-intl";
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Download,
  AlertTriangle,
  CheckCircle,
  Activity,
  Target,
  Calendar,
  Filter,
  Settings,
  LineChart as LineChartIcon,
  AreaChart as AreaChartIcon,
  RefreshCw,
  Clock,
} from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { DateRange } from "react-day-picker";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format as dateFormat } from "date-fns";
import { useWasteTypes } from "./hooks/use-waste-types";
import { WasteTypeSearch } from "./components/waste-type-search";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "@/components/ui/page-states";
import type { TWasteType } from "@/types";

interface WasteTypesFeatureProps {
  onTypeClick: (wasteType: TWasteType) => void;
}

export function WasteTypesFeature({ onTypeClick }: WasteTypesFeatureProps) {
  const t = useTranslations("wasteTypes");
  const commonT = useTranslations("common");

  const {
    wasteTypes,
    filteredWasteTypes,
    searchQuery,
    setSearchQuery,
    clearSearch,
    loading,
    error,
    lastFetched,
    retry,
    refresh,
    stats,
  } = useWasteTypes();

  if (loading) {
    return <LoadingState message={t("loadingAnalytics")} />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={retry} isRetrying={loading} />;
  }

  // Export functionality
  const handleExportReport = (
    dateRange: DateRange | undefined,
    format: ExportFormat
  ) => {
    let filteredData = wasteTypes.map((type) => {
      if (!dateRange?.from || !dateRange?.to || !type.collectionRecords) {
        return type;
      }

      // Filter collection records within the date range
      const filteredRecords = type.collectionRecords.filter((record) => {
        const recordDate = new Date(record.date);
        return recordDate >= dateRange.from! && recordDate <= dateRange.to!;
      });

      // Calculate totals for the filtered period
      const filteredAmount = filteredRecords.reduce(
        (sum, record) => sum + record.amount,
        0
      );
      const daysInRange =
        Math.ceil(
          (dateRange.to!.getTime() - dateRange.from!.getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1;
      const filteredDailyAverage = filteredAmount / daysInRange;

      // Get unique bins that contributed to this waste type in the date range
      const uniqueBins = new Set(filteredRecords.map((r) => r.binId));
      const filteredBinCount = uniqueBins.size;

      return {
        ...type,
        amount: filteredAmount,
        dailyAverage: filteredDailyAverage,
        binCount: filteredBinCount,
        collectionRecords: filteredRecords,
        percentage: 0, // Will be calculated below
      };
    });

    // Recalculate percentages for filtered data
    const totalFilteredAmount = filteredData.reduce(
      (sum, type) => sum + type.amount,
      0
    );
    filteredData = filteredData.map((type) => ({
      ...type,
      percentage:
        totalFilteredAmount > 0
          ? Math.round((type.amount / totalFilteredAmount) * 100)
          : 0,
    }));

    // Calculate statistics for the filtered data
    const filteredStats = {
      totalWaste: totalFilteredAmount,
      avgDailyWaste: filteredData.reduce(
        (sum, type) => sum + type.dailyAverage,
        0
      ),
      categoriesCount: filteredData.filter((type) => type.amount > 0).length,
      highestCategory: filteredData.reduce(
        (max, type) => (type.amount > max.amount ? type : max),
        filteredData[0]
      ),
      lowestCategory: filteredData.reduce(
        (min, type) => (type.amount < min.amount ? type : min),
        filteredData[0]
      ),
      highVolumeCount: filteredData.filter((t) => t.percentage > 25).length,
      normalVolumeCount: filteredData.filter((t) => t.percentage <= 25).length,
    };

    const reportData = {
      generatedAt: new Date().toISOString(),
      dateRange: dateRange
        ? {
            from: dateRange.from?.toISOString(),
            to: dateRange.to?.toISOString(),
          }
        : null,
      summary: {
        totalWaste: filteredStats.totalWaste,
        avgDailyWaste: filteredStats.avgDailyWaste,
        categoriesCount: filteredStats.categoriesCount,
        highestCategory: filteredStats.highestCategory?.type,
        lowestCategory: filteredStats.lowestCategory?.type,
        reportPeriod: dateRange
          ? `${dateFormat(dateRange.from || new Date(), "PPP")} - ${dateFormat(
              dateRange.to || new Date(),
              "PPP"
            )}`
          : "All time",
      },
      wasteTypes: filteredData.map((type) => ({
        category: type.type,
        amount: type.amount,
        percentage: type.percentage,
        dailyAverage: type.dailyAverage,
        binCount: type.binCount,
        collectionsCount: type.collectionRecords?.length || 0,
        status: type.percentage > 25 ? "High Volume" : "Normal",
        color: type.color,
        weeklyTrend: type.weeklyTrend, // Include weekly trend data
        collectionRecords: type.collectionRecords || [], // Include actual collection records
      })),
    };

    if (format === "csv") {
      // Create CSV content using reportData
      const csvContent = [
        // Header with report info
        [`Waste Types Report - ${reportData.summary.reportPeriod}`],
        [`Generated: ${dateFormat(new Date(reportData.generatedAt), "PPpp")}`],
        [`Total Waste: ${reportData.summary.totalWaste.toLocaleString()} kg`],
        [`Categories: ${reportData.summary.categoriesCount}`],
        [`Daily Average: ${reportData.summary.avgDailyWaste.toFixed(1)} kg`],
        [], // Empty row
        // Data headers
        [
          "Category",
          "Amount (kg)",
          "Percentage (%)",
          "Daily Average (kg)",
          "Bin Count",
          "Collections",
          "Status",
        ],
        // Data rows
        ...reportData.wasteTypes.map((type) => [
          type.category,
          type.amount.toString(),
          type.percentage.toString(),
          type.dailyAverage.toFixed(1),
          type.binCount.toString(),
          type.collectionsCount.toString(),
          type.status,
        ]),
      ]
        .map((row) => row.join(","))
        .join("\n");

      // Download CSV
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `waste-types-report-${dateFormat(
        new Date(),
        "yyyy-MM-dd"
      )}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } else if (format === "pdf") {
      // Create PDF content using reportData
      const doc = new jsPDF();

      // Title
      doc.setFontSize(20);
      doc.text("Waste Types Report", 14, 20);

      // Report details
      doc.setFontSize(12);
      doc.text(`Period: ${reportData.summary.reportPeriod}`, 14, 35);
      doc.text(
        `Generated: ${dateFormat(new Date(reportData.generatedAt), "PPpp")}`,
        14,
        45
      );

      // Summary statistics
      doc.setFontSize(14);
      doc.text("Summary Statistics", 14, 60);
      doc.setFontSize(10);
      doc.text(
        `Total Waste Volume: ${reportData.summary.totalWaste.toLocaleString()} kg`,
        14,
        70
      );
      doc.text(
        `Daily Average: ${reportData.summary.avgDailyWaste.toFixed(1)} kg`,
        14,
        80
      );
      doc.text(
        `Number of Categories: ${reportData.summary.categoriesCount}`,
        14,
        90
      );
      if (reportData.summary.highestCategory) {
        doc.text(
          `Highest Category: ${reportData.summary.highestCategory}`,
          14,
          100
        );
      }

      // Data table
      autoTable(doc, {
        head: [
          [
            "Category",
            "Amount (kg)",
            "Percentage (%)",
            "Daily Average (kg)",
            "Bin Count",
            "Collections",
            "Status",
          ],
        ],
        body: reportData.wasteTypes.map((type) => [
          type.category,
          type.amount.toLocaleString(),
          `${type.percentage}%`,
          `${type.dailyAverage.toFixed(1)} kg`,
          type.binCount.toString(),
          type.collectionsCount.toString(),
          type.status,
        ]),
        startY: 110,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [66, 139, 202] },
        alternateRowStyles: { fillColor: [240, 240, 240] },
      });

      doc.save(
        `waste-types-report-${dateFormat(new Date(), "yyyy-MM-dd")}.pdf`
      );
    } else if (format === "json") {
      // JSON export using reportData
      const jsonContent = JSON.stringify(reportData, null, 2);
      const blob = new Blob([jsonContent], {
        type: "application/json;charset=utf-8;",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `waste-types-report-${dateFormat(
        new Date(),
        "yyyy-MM-dd"
      )}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  };

  // Chart data preparation
  const pieChartData = filteredWasteTypes.map((type, index) => ({
    name: type.type,
    value: type.percentage,
    amount: type.amount,
    fill: `hsl(${(index * 360) / filteredWasteTypes.length}, 70%, 50%)`,
  }));

  const barChartData = filteredWasteTypes.map((type) => ({
    category: type.type,
    dailyAverage: type.dailyAverage,
    amount: type.amount,
  }));

  // Line chart data for trend analysis
  const lineChartData = filteredWasteTypes.map((type, index) => ({
    category: type.type,
    currentMonth: type.amount,
    lastMonth: type.amount * (0.8 + Math.random() * 0.4), // Simulated previous month data
    trend: type.percentage > 25 ? "increasing" : "stable",
  }));

  // Area chart data for volume comparison
  const areaChartData = filteredWasteTypes.slice(0, 5).map((type) => ({
    category: type.type.substring(0, 8), // Shortened names for better display
    volume: type.amount,
    target: type.amount * 1.2, // Simulated target values
  }));

  const chartConfig = {
    amount: {
      label: "Amount (kg)",
      color: "hsl(var(--chart-1))",
    },
    dailyAverage: {
      label: "Daily Average (kg)",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <div className="space-y-6">
      {/* Header Section with Last Updated Info */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            {t("title")}
          </h2>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-gray-600">{t("description")}</p>
            {lastFetched && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>
                  {commonT("lastUpdated")}: {lastFetched.toLocaleTimeString()}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={refresh}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {commonT("refresh")}
          </Button>
          <ExportDialog
            title={t("exportReport")}
            description={t("exportReportDescription")}
            onExport={handleExportReport}
          />
        </div>
      </div>

      {/* Search and KPI Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-2">
          <WasteTypeSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            clearSearch={clearSearch}
            totalTypes={wasteTypes.length}
            filteredCount={filteredWasteTypes.length}
          />
        </div>

        {/* KPI Cards */}
        <div className="xl:col-span-3">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">
                      {t("totalWasteVolume")}
                    </p>
                    <p className="text-xl lg:text-2xl font-bold text-blue-600 truncate">
                      {stats.totalWaste.toLocaleString()} kg
                    </p>
                    <p className="text-xs lg:text-sm text-gray-500 mt-1 truncate">
                      {stats.avgDailyWaste.toFixed(1)} {t("kgDayAverage")}
                    </p>
                  </div>
                  <div className="p-2 lg:p-3 bg-blue-100 rounded-full flex-shrink-0 ml-3">
                    <BarChart3 className="h-4 w-4 lg:h-6 lg:w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">
                      {t("highestCategory")}
                    </p>
                    <p className="text-lg lg:text-xl font-bold text-green-600 truncate">
                      {stats.highestCategory?.type || "N/A"}
                    </p>
                    <p className="text-xs lg:text-sm text-gray-500 mt-1 truncate">
                      {stats.highestCategory?.amount.toLocaleString()} kg (
                      {stats.highestCategory?.percentage}%)
                    </p>
                  </div>
                  <div className="p-2 lg:p-3 bg-green-100 rounded-full flex-shrink-0 ml-3">
                    <TrendingUp className="h-4 w-4 lg:h-6 lg:w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">
                      {t("categories")}
                    </p>
                    <p className="text-xl lg:text-2xl font-bold text-orange-600">
                      {stats.categoriesCount}
                    </p>
                    <p className="text-xs lg:text-sm text-gray-500 mt-1 truncate">
                      {t("activeWasteTypes")}
                    </p>
                  </div>
                  <div className="p-2 lg:p-3 bg-orange-100 rounded-full flex-shrink-0 ml-3">
                    <PieChart className="h-4 w-4 lg:h-6 lg:w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pie Chart Card */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <PieChart className="h-3 w-3" />
              {t("distribution")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 px-2 pb-2">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[300px] md:max-h-[250px] lg:max-h-[250px] min-h-[200px]"
            >
              <RechartsPieChart>
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => `${value}`}
                      formatter={(value: any, name: any) => [
                        `${value}%`,
                        "Percentage",
                      ]}
                    />
                  }
                />
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  outerRadius="65%"
                  fill="#8884d8"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Legend
                  wrapperStyle={{ fontSize: "12px", lineHeight: "1.2" }}
                  iconSize={10}
                  verticalAlign="bottom"
                  height={36}
                />
              </RechartsPieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Bar Chart Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-3 w-3" />
              {t("dailyAverages")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 px-2 pb-2">
            <ChartContainer config={chartConfig} className="max-h-[180px]">
              <RechartsBarChart
                data={barChartData}
                margin={{
                  top: 5,
                  right: 5,
                  left: 5,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 9 }}
                  angle={-45}
                  textAnchor="end"
                  height={25}
                />
                <YAxis tick={{ fontSize: 9 }} width={25} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value: any, name: any) => [
                        `${value} kg/day`,
                        "Daily Average",
                      ]}
                    />
                  }
                />
                <Bar
                  dataKey="dailyAverage"
                  fill="#10b981"
                  radius={[1, 1, 0, 0]}
                />
              </RechartsBarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Line Chart Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <LineChartIcon className="h-3 w-3" />
              {t("trends")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 px-2 pb-2">
            <ChartContainer config={chartConfig} className="max-h-[180px]">
              <LineChart
                data={lineChartData}
                margin={{
                  top: 5,
                  right: 5,
                  left: 5,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 9 }}
                  angle={-45}
                  textAnchor="end"
                  height={25}
                />
                <YAxis tick={{ fontSize: 9 }} width={25} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value: any, name: any) => [
                        `${value.toLocaleString()} kg`,
                        name === "currentMonth" ? "Current" : "Previous",
                      ]}
                    />
                  }
                />
                <Line
                  type="monotone"
                  dataKey="currentMonth"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="lastMonth"
                  stroke="#94a3b8"
                  strokeWidth={1}
                  strokeDasharray="3 3"
                  dot={{ r: 1 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Area Chart Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AreaChartIcon className="h-3 w-3" />
              {t("volumeVsTarget")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 px-2 pb-2">
            <ChartContainer config={chartConfig} className="max-h-[180px]">
              <AreaChart
                data={areaChartData}
                margin={{
                  top: 5,
                  right: 5,
                  left: 5,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 9 }}
                  angle={-45}
                  textAnchor="end"
                  height={25}
                />
                <YAxis tick={{ fontSize: 9 }} width={25} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value: any, name: any) => [
                        `${value.toLocaleString()} kg`,
                        name === "volume" ? "Current Volume" : "Target",
                      ]}
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stackId="1"
                  stroke="#f59e0b"
                  fill="#fef3c7"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stackId="2"
                  stroke="#059669"
                  fill="#d1fae5"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Waste Categories Grid */}
        <div className="lg:col-span-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold">
                    {t("wasteCategoriesOverview")}
                  </CardTitle>
                  <CardDescription>
                    {t("wasteCategoriesDescription")}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {stats.categoriesCount} {t("categories")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredWasteTypes.map((type) => (
                  <Card
                    key={type.type}
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4 hover:border-l-blue-500"
                    onClick={() => onTypeClick(type)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${type.color}`}
                          />
                          <h4 className="font-semibold text-lg text-gray-900">
                            {type.type}
                          </h4>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-gray-100 text-gray-700"
                        >
                          {type.percentage}%
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-baseline mb-2">
                            <span className="text-sm font-medium text-gray-600">
                              {t("totalVolume")}
                            </span>
                            <span className="text-2xl font-bold text-gray-900">
                              {type.amount.toLocaleString()} kg
                            </span>
                          </div>
                          <Progress value={type.percentage} className="h-2" />
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t">
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {t("dailyAverage")}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {type.dailyAverage} {t("kgDay")}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Analytics */}
        <div className="lg:col-span-4 space-y-6">
          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {t("performanceSummary")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">
                    {t("efficientCategories")}
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700"
                >
                  {stats.normalVolumeCount}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <span className="text-sm font-medium">
                    {t("highVolumeCategories")}
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-yellow-100 text-yellow-700"
                >
                  {stats.highVolumeCount}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Top Performer */}
          {stats.highestCategory && (
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-900">
                  {t("topPerformingCategory")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-4 h-4 rounded-full ${stats.highestCategory.color}`}
                  />
                  <h4 className="font-semibold text-blue-900">
                    {stats.highestCategory.type}
                  </h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">{t("volume")}</span>
                    <span className="text-sm font-medium text-blue-900">
                      {stats.highestCategory.amount.toLocaleString()} kg
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-700">{t("share")}</span>
                    <span className="text-sm font-medium text-blue-900">
                      {stats.highestCategory.percentage}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
