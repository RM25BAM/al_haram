export type TWasteBin = {
  id: string;
  location: string;
  fillLevel: number;
  weight: number; // Current weight in kg
  wasteType: string;
  lastCollection: string;
  status: "normal" | "needs_collection" | "critical";
  coordinates: { lat: number; lng: number };
  averageFillRate: number;
  healthStatus: "good" | "needs_cleaning" | "maintenance_required";
  lastMaintenance: string;
  grinderStatus?: "active" | "inactive" | "maintenance" | "not_applicable";
  isGrinding?: boolean; // New field to track if bin is currently grinding
  grindingStartTime?: string; // When grinding started
  timeToFill?: string; // Time it took to fill the bin
  odorLevel?: "low" | "moderate" | "high" | "critical";
  collectionHistory: {
    date: string;
    amount: number;
    truckId: string;
    wasteType: string;
  }[];
};

export type TTruck = {
  id: string;
  driver: string;
  location: string;
  status: "available" | "collecting" | "en_route" | "maintenance";
  capacity: number;
  route: string;
  estimatedCompletion: string | null;
  coordinates: { lat: number; lng: number };
  nextPickup?: string;
  fuelLevel: number;
  totalDistance: number;
  collectionsToday: number;
  wasteType: "plastic" | "organic"; // Truck type for waste collection
  assignedBins: string[];
  routeHistory: {
    date: string;
    route: string;
    distance: number;
    collections: number;
  }[];
};

export type TWasteType = {
  type: string;
  amount: number;
  percentage: number;
  color: string;
  dailyAverage: number;
  binCount: number;
  weeklyTrend: {
    day: string;
    amount: number;
  }[];
  // Add collection records to track individual amounts with dates
  collectionRecords?: {
    date: string;
    amount: number;
    binId: string;
    truckId: string;
  }[];
};

export type TLocation = {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  binCount: number;
};

// Map related types
export type TMapCoordinates = {
  lat: number;
  lng: number;
};

export type TMapBounds = {
  north: number;
  south: number;
  east: number;
  west: number;
};

export enum WasteFilter {
  ALL = "all",
  PLASTIC = "plastic",
  ORGANIC = "organic",
}

export enum BinFillStatus {
  LOW = "low", // 0-74%
  MEDIUM = "medium", // 75-89%
  HIGH = "high", // 90-100%
  CRITICAL = "critical", // > 95%
}

export type TMapMarkerProps = {
  id: string;
  position: TMapCoordinates;
  fillLevel: number;
  wasteType: string;
  status: BinFillStatus;
  onClick?: (binId: string) => void;
};

export type TTruckRoute = {
  id: string;
  path: TMapCoordinates[];
  color: string;
  truckId: string;
};

export type TMapSettings = {
  center: TMapCoordinates;
  zoom: number;
  selectedFilter: WasteFilter;
};

export type TMapControlsProps = {
  selectedFilter: WasteFilter;
  onFilterChange: (filter: WasteFilter) => void;
  bins?: TWasteBin[]; // Optional bins data for counts
};

// Treatment Analysis Types
export type TTreatmentMethod = {
  id: string;
  name: string;
  type: string; // 'plastic' | 'organic'
  energyOutput: number; // kWh per kg
  financialGain: number; // SAR per kg
  carbonReduction: number; // kg CO2 per kg waste
  efficiency: number; // percentage
  description: string;
};

export type TWasteCalculation = {
  energyOutput: number;
  financialGain: number;
  carbonReduction: number;
  weight: number;
  wasteType: "plastic" | "organic";
};

// Campaign Analytics Types
export type TCampaignMetrics = {
  id: string;
  name: string;
  platform: "instagram" | "tiktok" | "x";
  contentType: "image" | "video";
  category: "emotional" | "educational";
  engagementRate: number;
  reach: number;
  startDate: string;
  endDate: string;
  region: string;
  language: "ar" | "en";
};

export type TTimeAnalytics = {
  hour: number;
  engagement: number;
  reach: number;
};

export type TPlatformComparison = {
  platform: string;
  totalEngagement: number;
  averageReach: number;
  bestPerformingContent: string;
};

// Calculator Types
export interface CalculatorResult {
  energyOutput: number;
  financialGain: number;
  carbonReduction: number;
  unit: "kWh" | "SAR" | "kg CO₂e";
  additionalData?: {
    litersOfOil?: number;
    energySaved?: number;
  };
}

export interface CalculatorInput {
  wasteType: "plastic" | "organic";
  weight: number;
  treatmentMethod?: PlasticTreatmentMethod | OrganicTreatmentMethod;
}

export enum PlasticTreatmentMethod {
  UNTREATED = "untreated",
  INCINERATION = "incineration",
  PYROLYSIS = "pyrolysis",
  MECHANICAL_RECYCLING = "mechanical_recycling",
}

export enum OrganicTreatmentMethod {
  GENERAL = "general",
  COMPOSTING = "composting",
  ANAEROBIC_DIGESTION = "anaerobic_digestion",
  ANIMAL_FEED = "animal_feed",
}

export interface TreatmentMethodInfo {
  name: string;
  description: string;
  value: PlasticTreatmentMethod | OrganicTreatmentMethod;
}

export interface CalculatorFormData {
  wasteType: "plastic" | "organic";
  weight: string;
  treatmentMethod: string;
}

export interface TCarbonFilterApiResponse {
  daysRemaining: number;
  hoursRemaining: number;
  minutesRemaining: number;
  totalMinutesRemaining: number;
  isExpired: boolean;
  isNearExpiry: boolean;
  isCritical: boolean;
  lastUpdated: Date;
  formattedTimeRemaining: string;
}

export interface TCarbonFilterStatus extends TCarbonFilterApiResponse {
  isLoading: boolean;
  error: string | null;
}

// Weekly Report Types
export interface TReportCoverPage {
  title: string;
  period?: string;
  reportingPeriod?: string;
  generatedDate: string;
  systemName: string;
}

export interface TReportSummary {
  totalWasteKg: number;
  plasticWasteKg: number;
  organicWasteKg: number;
  percentChangeFromLastWeek?: number;
  percentChangeFromLastMonth?: number;
  topWasteZone: string;
  systemStatus?: string;
  systemPerformance?: string;
}

export interface TKeyMetric {
  value: number;
  unit: string;
  change?: number;
  percentage?: number;
}

export interface TKeyMetrics {
  totalWaste: TKeyMetric;
  plasticWaste: TKeyMetric;
  organicWaste: TKeyMetric;
  topZone: { name: string; amount: number; unit: string };
}

export interface TWasteBreakdown {
  plastic: { amount: number; percentage: number; color: string };
  organic: { amount: number; percentage: number; color: string };
  total: number;
}

export interface TWasteZone {
  name: string;
  amount: number;
  percentage: number;
  trend?: "increasing" | "decreasing" | "stable";
}

export interface TSystemAlert {
  type: "warning" | "resolved" | "info";
  zone: string;
  issue: string;
  status: "pending" | "resolved" | "completed";
}

export interface TDailyComparison {
  day: string;
  thisWeek: number;
  lastWeek: number;
}

export interface TWeeklyComparison {
  thisWeek: number;
  lastWeek: number;
  change: number;
  dailyBreakdown: TDailyComparison[];
}

export interface TWeeklyReportData {
  coverPage: TReportCoverPage;
  summary: TReportSummary;
  keyMetrics: TKeyMetrics;
  wasteBreakdown: TWasteBreakdown;
  topWasteZones: TWasteZone[];
  systemAlerts: TSystemAlert[];
  weekToWeekComparison: TWeeklyComparison;
}

export interface TWeeklyReportPeriod {
  year: number;
  week: number;
  startDate: string;
  endDate: string;
  label: string;
}

// Monthly Report Types
export interface TMonthlyReportCoverPage {
  title: string;
  systemName: string;
  generatedDate: string;
}

export interface TMonthlyReportSummary {
  totalWasteKg: number;
  plasticWasteKg: number;
  organicWasteKg: number;
  percentChangeFromLastMonth: number;
  topWasteZone: string;
  systemPerformance: string;
}

export interface TMonthlyKeyMetrics {
  totalWaste: { value: number; unit: string; change: number };
  plasticWaste: { value: number; unit: string; percentage: number };
  organicWaste: { value: number; unit: string; percentage: number };
  topZone: { name: string; amount: number; unit: string };
}

export interface TMonthlyWasteTrends {
  weeklyTotals: {
    week: string;
    amount: number;
    plastic: number;
    organic: number;
  }[];
}

export interface TMonthlyZonePerformance {
  name: string;
  amount: number;
  percentage: number;
  trend: "increasing" | "decreasing" | "stable";
}

export interface TMonthlySystemHealth {
  operationalBins: number;
  grinderIssues: { resolved: number; pending: number };
  odorSensorStatus: string;
  maintenanceCompleted: number;
  uptime: number;
}

export interface TMonthlyTreatmentImpact {
  energyGeneration: {
    value: number;
    unit: string;
    source: string;
  };
  revenueGeneration: {
    value: number;
    unit: string;
    source: string;
  };
  carbonFootprint: {
    value: number;
    unit: string;
    description: string;
  };
}

export interface TMonthlyComparisonToPrevious {
  thisMonth: number;
  lastMonth: number;
  changePercent: number;
  keyChanges: {
    metric: string;
    change: string;
    reason: string;
  }[];
}

export interface TMonthlyReportData {
  coverPage: TMonthlyReportCoverPage;
  summary: TMonthlyReportSummary;
  keyMetrics: TMonthlyKeyMetrics;
  wasteTrends: TMonthlyWasteTrends;
  zonePerformance: TMonthlyZonePerformance[];
  systemHealth: TMonthlySystemHealth;
  treatmentImpact: TMonthlyTreatmentImpact;
  comparisonToPrevious: TMonthlyComparisonToPrevious;
  recommendations: string[];
}

export interface TMonthlyReportPeriod {
  year: number;
  month: number;
  startDate: string;
  endDate: string;
  label: string;
}

// Annual Report Types
export interface TAnnualReportCoverPage {
  title: string;
  systemName: string;
  reportingPeriod: string;
  generatedDate: string;
}

export interface TAnnualWasteSummary {
  totalWaste: { value: number; unit: string };
  plasticWaste: { value: number; unit: string; percentage: number };
  organicWaste: { value: number; unit: string; percentage: number };
  monthlyAverage: { value: number; unit: string };
  peakMonth: { month: string; amount: number; unit: string };
  topZone: { name: string; amount: number; unit: string };
  yearOverYearGrowth: { value: number; unit: string };
}

export interface TAnnualMonthlyBreakdown {
  month: string;
  total: number;
  plastic: number;
  organic: number;
  growth: number;
}

export interface TAnnualFinancialOutcomes {
  totalRevenue: { value: number; unit: string };
  plasticRecycling: { value: number; unit: string; percentage: number };
  energyGeneration: { value: number; unit: string; percentage: number };
  operationalCosts: { value: number; unit: string };
  netProfit: { value: number; unit: string };
  roi: { value: number; unit: string };
}

export interface TAnnualEnergyGeneration {
  totalEnergy: { value: number; unit: string };
  monthlyAverage: { value: number; unit: string };
  peakMonth: { month: string; amount: number; unit: string };
  equivalentHouseholds: { value: number; unit: string };
  co2Saved: { value: number; unit: string };
}

export interface TAnnualEnvironmentalImpact {
  totalCarbonReduction: { value: number; unit: string };
  plasticRecycled: { value: number; unit: string };
  organicWasteProcessed: { value: number; unit: string };
  energyGenerated: { value: number; unit: string };
  wasteFromLandfill: { value: number; unit: string };
}

export interface TAnnualMaintenanceCategory {
  category: string;
  count: number;
  hours: number;
}

export interface TAnnualMaintenanceReportSummaries {
  totalMaintenanceHours: number;
  scheduledMaintenance: number;
  emergencyRepairs: number;
  systemUptime: number;
  averageResponseTime: number;
  maintenanceCategories: TAnnualMaintenanceCategory[];
}

export interface TAnnualQuarterlyPerformance {
  quarter: string;
  waste: number;
  revenue: number;
  uptime: number;
  efficiency: number;
}

export interface TAnnualReportData {
  coverPage: TAnnualReportCoverPage;
  annualWasteSummary: TAnnualWasteSummary;
  monthlyBreakdown: TAnnualMonthlyBreakdown[];
  financialOutcomes: TAnnualFinancialOutcomes;
  energyGeneration: TAnnualEnergyGeneration;
  environmentalImpact: TAnnualEnvironmentalImpact;
  maintenanceReportSummaries: TAnnualMaintenanceReportSummaries;
  quarterlyPerformance: TAnnualQuarterlyPerformance[];
  recommendations: string[];
}

export interface TAnnualReportPeriod {
  year: number;
  startDate: string;
  endDate: string;
  label: string;
}

// Campaign Types for Awareness Feature
export interface TCampaign {
  id: string;
  title: string;
  platform: "Instagram" | "Twitter" | "TikTok";
  contentType: "Video" | "Image";
  messageType: "Educational" | "Emotional";
  region: "GCC" | "North America" | "Europe" | "Asia";
  engagementRate: number;
  reach: number;
  shares: number;
  timePosted: string;
  awarenessIncrease: number;
  status: "active" | "completed" | "draft";
}

export interface TCampaignAnalytics {
  totalCampaigns: number;
  avgAwarenessIncrease: number;
  bestPerformingCampaign: TCampaign;
  bestTimeSlot: { timeSlot: string; avgEngagement: number };
  platformStats: { platform: string; count: number; avgEngagement: number }[];
  regionStats: { region: string; count: number; avgEngagement: number }[];
}

// API Response Types
export interface TApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  error?: string;
  message?: string;
}
