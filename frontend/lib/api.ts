import type {
  TWasteBin,
  TTruck,
  TWasteType,
  TTreatmentMethod,
  TCarbonFilterApiResponse,
  TWeeklyReportData,
  TWeeklyReportPeriod,
  TMonthlyReportData,
  TMonthlyReportPeriod,
  TAnnualReportData,
  TAnnualReportPeriod,
  TCampaign,
  TCampaignAnalytics,
} from "@/types";

let API_BASE_URL: string;
if (process.env.NODE_ENV === "development")
  API_BASE_URL =
    process.env.NEXT_PUBLIC_DEV_API_URL || "http://localhost:8000/api";
else
  API_BASE_URL =
    process.env.NEXT_PUBLIC_PROD_API_URL || "http://localhost:8000/api";
interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  error?: string;
}

interface LocationsData {
  bins: TWasteBin[];
  trucks: TTruck[];
}

interface LocationsCount {
  bins: number;
  trucks: number;
}

interface LocationsResponse {
  success: boolean;
  data: LocationsData;
  count: LocationsCount;
  error?: string;
}

// Generic API call function
async function apiCall<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache", // Ensure fresh data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
}

// Waste Bins API
export async function fetchWasteBins(): Promise<TWasteBin[]> {
  const response = await apiCall<TWasteBin[]>("/waste-bins");
  if (!response.success) {
    throw new Error(response.error || "Failed to fetch waste bins");
  }
  return response.data;
}

// Trucks API
export async function fetchTrucks(): Promise<TTruck[]> {
  const response = await apiCall<TTruck[]>("/trucks");
  if (!response.success) {
    throw new Error(response.error || "Failed to fetch trucks");
  }
  return response.data;
}

// Waste Types API
export async function fetchWasteTypes(): Promise<TWasteType[]> {
  const response = await apiCall<TWasteType[]>("/waste-types");
  if (!response.success) {
    throw new Error(response.error || "Failed to fetch waste types");
  }
  return response.data;
}

// Locations API (returns both bins and trucks)
export async function fetchLocationsData(): Promise<LocationsData> {
  const response = await fetch(`${API_BASE_URL}/locations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: LocationsResponse = await response.json();
  if (!data.success) {
    throw new Error(data.error || "Failed to fetch locations data");
  }
  return data.data;
}

// Dashboard Stats API (derived from waste bins and trucks)
export async function fetchDashboardStats() {
  const [wasteBins, trucks] = await Promise.all([
    fetchWasteBins(),
    fetchTrucks(),
  ]);

  const criticalBins = wasteBins.filter((bin) => bin.fillLevel >= 90).length;
  const needsCollectionBins = wasteBins.filter(
    (bin) => bin.status === "needs_collection"
  ).length;
  const activeTrucks = trucks.filter(
    (truck) => truck.status !== "available"
  ).length;

  return {
    totalBins: wasteBins.length,
    criticalBins,
    needsCollectionBins,
    activeTrucks,
  };
}

// Carbon Filter API
export async function fetchCarbonFilterStatus(): Promise<TCarbonFilterApiResponse> {
  const response = await apiCall<TCarbonFilterApiResponse>(
    "/simulation/carbon-filter"
  );
  if (!response.success) {
    throw new Error(response.error || "Failed to fetch carbon filter status");
  }
  return response.data;
}

// Treatment Methods API
export async function fetchTreatmentMethods(): Promise<TTreatmentMethod[]> {
  const response = await apiCall<TTreatmentMethod[]>("/treatment-methods");
  if (!response.success) {
    throw new Error(response.error || "Failed to fetch treatment methods");
  }
  return response.data;
}

// Get treatment methods by waste type
export async function fetchTreatmentMethodsByType(
  wasteType: string
): Promise<TTreatmentMethod[]> {
  const response = await apiCall<TTreatmentMethod[]>(
    `/treatment-methods/type/${wasteType}`
  );
  if (!response.success) {
    throw new Error(
      response.error || "Failed to fetch treatment methods by type"
    );
  }
  return response.data;
}

// Get treatment recommendations for a waste type
export async function fetchTreatmentRecommendations(
  wasteType: string
): Promise<{
  mostEfficient: TTreatmentMethod | null;
  mostProfitable: TTreatmentMethod | null;
  mostEcoFriendly: TTreatmentMethod | null;
  bestOverall: TTreatmentMethod | null;
  allMethods: TTreatmentMethod[];
}> {
  const methods = await fetchTreatmentMethodsByType(wasteType);

  if (methods.length === 0) {
    return {
      mostEfficient: null,
      mostProfitable: null,
      mostEcoFriendly: null,
      bestOverall: null,
      allMethods: [],
    };
  }

  // Calculate recommendations client-side
  const mostEfficient = methods.reduce((best, current) =>
    current.efficiency > best.efficiency ? current : best
  );

  const mostProfitable = methods.reduce((best, current) =>
    current.financialGain > best.financialGain ? current : best
  );

  const mostEcoFriendly = methods.reduce((best, current) =>
    current.carbonReduction > best.carbonReduction ? current : best
  );

  // Calculate best overall using weighted scoring
  // Weights: efficiency (25%), profitability (25%), environmental impact (35%), energy generation (15%)
  const bestOverall = methods.reduce((best, current) => {
    // Normalize values to 0-100 scale for comparison
    const maxEfficiency = Math.max(...methods.map((m) => m.efficiency));
    const maxFinancial = Math.max(...methods.map((m) => m.financialGain));
    const maxCarbon = Math.max(...methods.map((m) => m.carbonReduction));
    const maxEnergy = Math.max(...methods.map((m) => m.energyOutput));

    // Calculate normalized scores
    const currentScore =
      (current.efficiency / maxEfficiency) * 0.25 +
      (current.financialGain / maxFinancial) * 0.25 +
      (current.carbonReduction / maxCarbon) * 0.35 +
      (current.energyOutput / maxEnergy) * 0.15;

    const bestScore =
      (best.efficiency / maxEfficiency) * 0.25 +
      (best.financialGain / maxFinancial) * 0.25 +
      (best.carbonReduction / maxCarbon) * 0.35 +
      (best.energyOutput / maxEnergy) * 0.15;

    return currentScore > bestScore ? current : best;
  });

  return {
    mostEfficient,
    mostProfitable,
    mostEcoFriendly,
    bestOverall,
    allMethods: methods,
  };
}

// Calculate treatment impact
export async function calculateTreatmentImpact(
  treatmentMethodId: string,
  wasteAmount: number
): Promise<{
  energyGenerated: number;
  financialGain: number;
  carbonReduced: number;
  wasteProcessed: number;
}> {
  const response = await fetch(
    `${API_BASE_URL}/treatment-methods/${treatmentMethodId}/impact`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wasteAmount }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.data;
}

// Calculate baseline potential for waste (untreated)
export async function calculateBaselinePotential(
  wasteType: string,
  wasteAmount: number
): Promise<{
  wasteType: string;
  wasteAmount: number;
  energyGenerated: number;
  financialGain: number;
  carbonReduced: number;
  description: string;
}> {
  const response = await fetch(
    `${API_BASE_URL}/treatment-methods/baseline-potential`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wasteType, wasteAmount }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.data;
}

// Weekly Reports API
export async function fetchWeeklyReport(
  year: number,
  week: number,
  locale: string = "en"
): Promise<TWeeklyReportData> {
  const response = await apiCall<TWeeklyReportData>(
    `/reports/weekly?year=${year}&week=${week}&locale=${locale}`
  );
  if (!response.success) {
    throw new Error(response.error || "Failed to fetch weekly report");
  }
  return response.data;
}

export async function fetchWeeklyReportPeriods(): Promise<
  TWeeklyReportPeriod[]
> {
  const response = await apiCall<{
    years: number[];
    weeks: {
      year: number;
      week: number;
      start_date: string;
      end_date: string;
    }[];
  }>("/reports/weekly/periods");

  if (!response.success) {
    throw new Error(response.error || "Failed to fetch weekly report periods");
  }

  // Transform the backend response to frontend format
  return response.data.weeks.map((week) => ({
    year: week.year,
    week: week.week,
    startDate: week.start_date,
    endDate: week.end_date,
    label: `Week ${week.week}, ${week.year} (${week.start_date} - ${week.end_date})`,
  }));
}

// Monthly Reports API
export async function fetchMonthlyReport(
  year: number,
  month: number,
  locale?: string
): Promise<TMonthlyReportData> {
  const localeParam = locale ? `&locale=${locale}` : "";
  const response = await apiCall<TMonthlyReportData>(
    `/reports/monthly?year=${year}&month=${month}${localeParam}`
  );
  if (!response.success) {
    throw new Error(response.error || "Failed to fetch monthly report");
  }
  return response.data;
}

export async function fetchMonthlyReportPeriods(): Promise<
  TMonthlyReportPeriod[]
> {
  const response = await apiCall<{
    years: number[];
    months: {
      year: number;
      month: number;
      start_date: string;
      end_date: string;
    }[];
  }>("/reports/monthly/periods");

  if (!response.success) {
    throw new Error(response.error || "Failed to fetch monthly report periods");
  }

  // Transform the backend response to frontend format
  return response.data.months.map((month) => ({
    year: month.year,
    month: month.month,
    startDate: month.start_date,
    endDate: month.end_date,
    label: `${getMonthName(month.month)} ${month.year} (${month.start_date} - ${
      month.end_date
    })`,
  }));
}

// Helper function to get month name
function getMonthName(month: number): string {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[month - 1] || "Unknown";
}

// Annual Reports API
export async function fetchAnnualReport(
  year: number,
  locale?: string
): Promise<TAnnualReportData> {
  const localeParam = locale ? `&locale=${locale}` : "";
  const response = await apiCall<TAnnualReportData>(
    `/reports/annual?year=${year}${localeParam}`
  );
  if (!response.success) {
    throw new Error(response.error || "Failed to fetch annual report");
  }
  return response.data;
}

export async function fetchAnnualReportPeriods(): Promise<
  TAnnualReportPeriod[]
> {
  const response = await apiCall<{
    years: number[];
    availableYears: {
      year: number;
      startDate: string;
      endDate: string;
    }[];
  }>("/reports/annual/periods");

  if (!response.success) {
    throw new Error(response.error || "Failed to fetch annual report periods");
  }

  // Transform the backend response to frontend format
  return response.data.availableYears.map((yearData) => ({
    year: yearData.year,
    startDate: yearData.startDate,
    endDate: yearData.endDate,
    label: `Annual Report ${yearData.year} (${yearData.startDate} - ${yearData.endDate})`,
  }));
}

// Campaign API functions
export async function fetchCampaigns(): Promise<TCampaign[]> {
  const response = await apiCall<TCampaign[]>("/campaigns");
  if (!response.success) {
    throw new Error(response.error || "Failed to fetch campaigns");
  }
  return response.data;
}

export async function fetchCampaignAnalytics(): Promise<TCampaignAnalytics> {
  const response = await apiCall<TCampaignAnalytics>("/campaigns/analytics");
  if (!response.success) {
    throw new Error(response.error || "Failed to fetch campaign analytics");
  }
  return response.data;
}

export async function fetchCampaignById(id: string): Promise<TCampaign> {
  const response = await apiCall<TCampaign>(`/campaigns/${id}`);
  if (!response.success) {
    throw new Error(response.error || "Failed to fetch campaign");
  }
  return response.data;
}
