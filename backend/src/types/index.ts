/**
 * Type definitions for the waste management system
 * These types match the frontend expectations
 */

export interface WasteBin {
  id: string;
  location: string;
  fillLevel: number;
  weight: number; // Current weight in kg
  wasteType: string;
  lastCollection: string;
  status: 'normal' | 'needs_collection' | 'critical';
  coordinates: { lat: number; lng: number };
  averageFillRate: number;
  healthStatus: 'good' | 'needs_cleaning' | 'maintenance_required';
  lastMaintenance: string;
  grinderStatus?: 'active' | 'inactive' | 'maintenance' | 'not_applicable';
  timeToFill?: string;
  note?: string;
  odorLevel?: 'low' | 'moderate' | 'high' | 'critical';
  collectionHistory: {
    date: string;
    amount: number;
    truckId: string;
    wasteType: string;
  }[];
}

export interface Truck {
  id: string;
  driver: string;
  location: string;
  status: 'available' | 'collecting' | 'en_route' | 'maintenance';
  capacity: number;
  route: string;
  estimatedCompletion: string | null;
  coordinates: { lat: number; lng: number };
  nextPickup?: string;
  fuelLevel: number;
  totalDistance: number;
  collectionsToday: number;
  wasteType: string;
  assignedBins: string[];
  routeHistory: {
    date: string;
    route: string;
    distance: number;
    collections: number;
  }[];
}

export interface WasteType {
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
  monthlyTrend?: {
    month: string;
    amount: number;
  }[];
  collectionRecords?: {
    date: string;
    amount: number;
    binId: string;
    truckId: string;
  }[];
  peakHours?: {
    hour: string;
    volume: number;
  }[];
  efficiency?: {
    collectionRate: number;
    avgCollectionTime: number;
    equipmentUtilization: number;
    costPerKg: number;
  };
  environmentalImpact?: {
    carbonSaved: number;
    energyRecovered: number;
    landfillDiverted: number;
    recyclingRate: number;
  };
}

export interface Location {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  type: string;
  description: string;
  wasteCapacity: number;
  currentWasteLevel: number;
  status: 'operational' | 'inactive' | 'maintenance';
  lastCleaning: string;
  accessibilityLevel: 'public' | 'restricted' | 'staff_only';
  binCount: number;
  specialRequirements: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  error?: string;
  message?: string;
}

export interface LocationsData {
  bins: WasteBin[];
  trucks: Truck[];
}

export interface LocationsResponse {
  success: boolean;
  data: LocationsData;
  count: {
    bins: number;
    trucks: number;
  };
}

export interface TreatmentMethod {
  id: string;
  name: string;
  type: string; // 'plastic' | 'organic'
  energyOutput: number; // kWh per kg
  financialGain: number; // SAR per kg
  carbonReduction: number; // kg CO2 per kg waste
  efficiency: number; // percentage
  description: string;
}

// Weekly Report Types
export interface ReportCoverPage {
  title: string;
  period?: string;
  reportingPeriod?: string;
  generatedDate: string;
  systemName: string;
}

export interface ReportSummary {
  totalWasteKg: number;
  plasticWasteKg: number;
  organicWasteKg: number;
  percentChangeFromLastWeek?: number;
  percentChangeFromLastMonth?: number;
  topWasteZone: string;
  systemStatus?: string;
  systemPerformance?: string;
}

export interface KeyMetric {
  value: number;
  unit: string;
  change?: number;
  percentage?: number;
}

export interface KeyMetrics {
  totalWaste: KeyMetric;
  plasticWaste: KeyMetric;
  organicWaste: KeyMetric;
  topZone: { name: string; amount: number; unit: string };
}

export interface WasteBreakdown {
  plastic: { amount: number; percentage: number; color: string };
  organic: { amount: number; percentage: number; color: string };
  total: number;
}

export interface WasteZone {
  name: string;
  amount: number;
  percentage: number;
  trend?: 'increasing' | 'decreasing' | 'stable';
}

export interface SystemAlert {
  type: 'warning' | 'resolved' | 'info';
  zone: string;
  issue: string;
  status: string; // Allow any string to support translations
}

export interface DailyComparison {
  day: string;
  thisWeek: number;
  lastWeek: number;
}

export interface WeeklyComparison {
  thisWeek: number;
  lastWeek: number;
  change: number;
  dailyBreakdown: DailyComparison[];
}

// Weekly Report Interface
export interface WeeklyReportData {
  coverPage: ReportCoverPage;
  summary: ReportSummary;
  keyMetrics: KeyMetrics;
  wasteBreakdown: WasteBreakdown;
  topWasteZones: WasteZone[];
  systemAlerts: SystemAlert[];
  weekToWeekComparison: WeeklyComparison;
}

// Monthly Report Types
export interface MonthlyReportCoverPage {
  title: string;
  systemName: string;
  generatedDate: string;
}

export interface MonthlyReportSummary {
  totalWasteKg: number;
  plasticWasteKg: number;
  organicWasteKg: number;
  percentChangeFromLastMonth: number;
  topWasteZone: string;
  systemPerformance: string;
}

export interface MonthlyKeyMetrics {
  totalWaste: { value: number; unit: string; change: number };
  plasticWaste: { value: number; unit: string; percentage: number };
  organicWaste: { value: number; unit: string; percentage: number };
  topZone: { name: string; amount: number; unit: string };
}

export interface MonthlyWasteTrends {
  weeklyTotals: {
    week: string;
    amount: number;
    plastic: number;
    organic: number;
  }[];
}

export interface MonthlyZonePerformance {
  name: string;
  amount: number;
  percentage: number;
  trend: string; // Changed to string to support translations
}

export interface MonthlySystemHealth {
  operationalBins: number;
  grinderIssues: { resolved: number; pending: number };
  odorSensorStatus: string;
  maintenanceCompleted: number;
  uptime: number;
}

export interface MonthlyTreatmentImpact {
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

export interface MonthlyComparisonToPrevious {
  thisMonth: number;
  lastMonth: number;
  changePercent: number;
  keyChanges: {
    metric: string;
    change: string;
    reason: string;
  }[];
}

// Monthly Report Interface
export interface MonthlyReportData {
  coverPage: MonthlyReportCoverPage;
  summary: MonthlyReportSummary;
  keyMetrics: MonthlyKeyMetrics;
  wasteTrends: MonthlyWasteTrends;
  zonePerformance: MonthlyZonePerformance[];
  systemHealth: MonthlySystemHealth;
  treatmentImpact: MonthlyTreatmentImpact;
  comparisonToPrevious: MonthlyComparisonToPrevious;
  recommendations: string[];
}

// Annual Report Types
export interface AnnualReportCoverPage {
  title: string;
  systemName: string;
  reportingPeriod: string;
  generatedDate: string;
}

export interface AnnualWasteSummary {
  totalWaste: { value: number; unit: string };
  plasticWaste: { value: number; unit: string; percentage: number };
  organicWaste: { value: number; unit: string; percentage: number };
  monthlyAverage: { value: number; unit: string };
  peakMonth: { month: string; amount: number; unit: string };
  topZone: { name: string; amount: number; unit: string };
  yearOverYearGrowth: { value: number; unit: string };
}

export interface AnnualMonthlyBreakdown {
  month: string;
  total: number;
  plastic: number;
  organic: number;
  growth: number;
}

export interface AnnualFinancialOutcomes {
  totalRevenue: { value: number; unit: string };
  plasticRecycling: { value: number; unit: string; percentage: number };
  energyGeneration: { value: number; unit: string; percentage: number };
  operationalCosts: { value: number; unit: string };
  netProfit: { value: number; unit: string };
  roi: { value: number; unit: string };
}

export interface AnnualEnergyGeneration {
  totalEnergy: { value: number; unit: string };
  monthlyAverage: { value: number; unit: string };
  peakMonth: { month: string; amount: number; unit: string };
  equivalentHouseholds: { value: number; unit: string };
  co2Saved: { value: number; unit: string };
}

export interface AnnualEnvironmentalImpact {
  totalCarbonReduction: { value: number; unit: string };
  plasticRecycled: { value: number; unit: string };
  organicWasteProcessed: { value: number; unit: string };
  energyGenerated: { value: number; unit: string };
  wasteFromLandfill: { value: number; unit: string };
}

export interface AnnualMaintenanceCategory {
  category: string;
  count: number;
  hours: number;
}

export interface AnnualMaintenanceReportSummaries {
  totalMaintenanceHours: number;
  scheduledMaintenance: number;
  emergencyRepairs: number;
  systemUptime: number;
  averageResponseTime: number;
  maintenanceCategories: AnnualMaintenanceCategory[];
}

export interface AnnualQuarterlyPerformance {
  quarter: string;
  waste: number;
  revenue: number;
  uptime: number;
  efficiency: number;
}

// Annual Report Interface
export interface AnnualReportData {
  coverPage: AnnualReportCoverPage;
  annualWasteSummary: AnnualWasteSummary;
  monthlyBreakdown: AnnualMonthlyBreakdown[];
  financialOutcomes: AnnualFinancialOutcomes;
  energyGeneration: AnnualEnergyGeneration;
  environmentalImpact: AnnualEnvironmentalImpact;
  maintenanceReportSummaries: AnnualMaintenanceReportSummaries;
  quarterlyPerformance: AnnualQuarterlyPerformance[];
  recommendations: string[];
}

// Campaign Types for Awareness Feature
export interface Campaign {
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

export interface CampaignAnalytics {
  totalCampaigns: number;
  avgAwarenessIncrease: number;
  bestPerformingCampaign: Campaign;
  bestTimeSlot: { timeSlot: string; avgEngagement: number };
  platformStats: { platform: string; count: number; avgEngagement: number }[];
  regionStats: { region: string; count: number; avgEngagement: number }[];
}
