import type { AnnualReportData } from '../../types/index.js';
import { TranslationService, type SupportedLocale } from '../translation.service.js';

export class AnnualReportsService {
  /**
   * Generate annual report data for a specific year
   * Currently returns dummy data for demonstration purposes
   */
  public async generateAnnualReport(
    _year: number,
    locale: SupportedLocale = 'en'
  ): Promise<AnnualReportData> {
    // For now, we return the same dummy data regardless of year
    // In the future, this could be replaced with actual database queries

    const annualData: AnnualReportData = {
      coverPage: {
        title: TranslationService.translateAnnualReport('Annual Waste Report – 2024', locale),
        systemName: TranslationService.translateAnnualReport(
          'Al-Haram Waste Management System',
          locale
        ),
        reportingPeriod: 'January 1, 2024 - December 31, 2024',
        generatedDate: 'January 15, 2025',
      },
      annualWasteSummary: {
        totalWaste: { value: 124500, unit: TranslationService.translateAnnualReport('kg', locale) },
        plasticWaste: {
          value: 59760,
          unit: TranslationService.translateAnnualReport('kg', locale),
          percentage: 48,
        },
        organicWaste: {
          value: 64740,
          unit: TranslationService.translateAnnualReport('kg', locale),
          percentage: 52,
        },
        monthlyAverage: {
          value: 10375,
          unit: TranslationService.translateAnnualReport('kg', locale),
        },
        peakMonth: {
          month: TranslationService.translateAnnualReport('Ramadan', locale),
          amount: 18750,
          unit: TranslationService.translateAnnualReport('kg', locale),
        },
        topZone: {
          name: TranslationService.translateZone('Mataf Area', locale),
          amount: 32370,
          unit: TranslationService.translateAnnualReport('kg', locale),
        },
        yearOverYearGrowth: {
          value: 15.2,
          unit: TranslationService.translateAnnualReport('%', locale),
        },
      },
      monthlyBreakdown: [
        {
          month: TranslationService.translateAnnualReport('Jan', locale),
          total: 9500,
          plastic: 4560,
          organic: 4940,
          growth: 5.2,
        },
        {
          month: TranslationService.translateAnnualReport('Feb', locale),
          total: 8750,
          plastic: 4200,
          organic: 4550,
          growth: 2.1,
        },
        {
          month: TranslationService.translateAnnualReport('Mar', locale),
          total: 10200,
          plastic: 4896,
          organic: 5304,
          growth: 8.3,
        },
        {
          month: TranslationService.translateAnnualReport('Apr', locale),
          total: 11800,
          plastic: 5664,
          organic: 6136,
          growth: 12.1,
        },
        {
          month: TranslationService.translateAnnualReport('May', locale),
          total: 18750,
          plastic: 9000,
          organic: 9750,
          growth: 25.4,
        },
        {
          month: TranslationService.translateAnnualReport('Jun', locale),
          total: 12300,
          plastic: 5904,
          organic: 6396,
          growth: 9.8,
        },
        {
          month: TranslationService.translateAnnualReport('Jul', locale),
          total: 10800,
          plastic: 5184,
          organic: 5616,
          growth: 6.2,
        },
        {
          month: TranslationService.translateAnnualReport('Aug', locale),
          total: 9900,
          plastic: 4752,
          organic: 5148,
          growth: 4.1,
        },
        {
          month: TranslationService.translateAnnualReport('Sep', locale),
          total: 9200,
          plastic: 4416,
          organic: 4784,
          growth: 1.8,
        },
        {
          month: TranslationService.translateAnnualReport('Oct', locale),
          total: 8600,
          plastic: 4128,
          organic: 4472,
          growth: -2.3,
        },
        {
          month: TranslationService.translateAnnualReport('Nov', locale),
          total: 7800,
          plastic: 3744,
          organic: 4056,
          growth: -8.1,
        },
        {
          month: TranslationService.translateAnnualReport('Dec', locale),
          total: 6900,
          plastic: 3312,
          organic: 3588,
          growth: -12.4,
        },
      ],
      financialOutcomes: {
        totalRevenue: {
          value: 67800,
          unit: TranslationService.translateAnnualReport('USD', locale),
        },
        plasticRecycling: {
          value: 52340,
          unit: TranslationService.translateAnnualReport('USD', locale),
          percentage: 77,
        },
        energyGeneration: {
          value: 15460,
          unit: TranslationService.translateAnnualReport('USD', locale),
          percentage: 23,
        },
        operationalCosts: {
          value: 45200,
          unit: TranslationService.translateAnnualReport('USD', locale),
        },
        netProfit: { value: 22600, unit: TranslationService.translateAnnualReport('USD', locale) },
        roi: { value: 33.3, unit: TranslationService.translateAnnualReport('%', locale) },
      },
      energyGeneration: {
        totalEnergy: {
          value: 28750,
          unit: TranslationService.translateAnnualReport('kWh', locale),
        },
        monthlyAverage: {
          value: 2396,
          unit: TranslationService.translateAnnualReport('kWh', locale),
        },
        peakMonth: {
          month: TranslationService.translateAnnualReport('May', locale),
          amount: 4375,
          unit: TranslationService.translateAnnualReport('kWh', locale),
        },
        equivalentHouseholds: {
          value: 145,
          unit: TranslationService.translateAnnualReport('households', locale),
        },
        co2Saved: {
          value: 14.375,
          unit: TranslationService.translateAnnualReport('tons CO2', locale),
        },
      },
      environmentalImpact: {
        totalCarbonReduction: {
          value: 45.2,
          unit: TranslationService.translateAnnualReport('tons CO2', locale),
        },
        plasticRecycled: {
          value: 59.76,
          unit: TranslationService.translateAnnualReport('tons', locale),
        },
        organicWasteProcessed: {
          value: 64.74,
          unit: TranslationService.translateAnnualReport('tons', locale),
        },
        energyGenerated: {
          value: 28.75,
          unit: TranslationService.translateAnnualReport('MWh', locale),
        },
        wasteFromLandfill: {
          value: 124.5,
          unit: TranslationService.translateAnnualReport('tons diverted', locale),
        },
      },
      maintenanceReportSummaries: {
        totalMaintenanceHours: 1840,
        scheduledMaintenance: 156,
        emergencyRepairs: 23,
        systemUptime: 99.1,
        averageResponseTime: 15, // minutes
        maintenanceCategories: [
          {
            category: TranslationService.translateAnnualReport('Grinder Maintenance', locale),
            count: 45,
            hours: 720,
          },
          {
            category: TranslationService.translateAnnualReport('Sensor Calibration', locale),
            count: 34,
            hours: 272,
          },
          {
            category: TranslationService.translateAnnualReport('Pneumatic Systems', locale),
            count: 28,
            hours: 448,
          },
          {
            category: TranslationService.translateAnnualReport('Electrical Systems', locale),
            count: 18,
            hours: 252,
          },
          {
            category: TranslationService.translateAnnualReport('Cleaning & Servicing', locale),
            count: 54,
            hours: 148,
          },
        ],
      },
      quarterlyPerformance: [
        {
          quarter: TranslationService.translateAnnualReport('Q1', locale),
          waste: 28450,
          revenue: 15230,
          uptime: 98.7,
          efficiency: 92.3,
        },
        {
          quarter: TranslationService.translateAnnualReport('Q2', locale),
          waste: 42850,
          revenue: 22340,
          uptime: 99.2,
          efficiency: 94.7,
        },
        {
          quarter: TranslationService.translateAnnualReport('Q3', locale),
          waste: 29900,
          revenue: 16890,
          uptime: 99.3,
          efficiency: 95.1,
        },
        {
          quarter: TranslationService.translateAnnualReport('Q4', locale),
          waste: 23300,
          revenue: 13340,
          uptime: 99.1,
          efficiency: 93.8,
        },
      ],
      recommendations: [
        TranslationService.translateAnnualReport(
          'Invest in additional organic waste processing capacity to handle 20% growth projected for 2025',
          locale
        ),
        TranslationService.translateAnnualReport(
          'Implement AI-powered predictive maintenance to reduce emergency repairs by 40%',
          locale
        ),
        TranslationService.translateAnnualReport(
          'Expand plastic recycling partnerships to increase revenue by $15,000 annually',
          locale
        ),
        TranslationService.translateAnnualReport(
          'Install additional bins in Mataf Area to manage consistently high waste volumes',
          locale
        ),
        TranslationService.translateAnnualReport(
          'Develop seasonal adjustment protocols for Ramadan and Hajj periods',
          locale
        ),
        TranslationService.translateAnnualReport(
          'Consider upgrading to next-generation grinder systems for improved efficiency',
          locale
        ),
        TranslationService.translateAnnualReport(
          'Establish carbon credit program to monetize environmental impact',
          locale
        ),
        TranslationService.translateAnnualReport(
          'Implement real-time analytics dashboard for proactive system management',
          locale
        ),
      ],
    };

    return annualData;
  }

  /**
   * Get available annual report periods (years)
   * Currently returns a static list for demonstration purposes
   */
  public async getAvailableAnnualPeriods(): Promise<{
    years: number[];
    availableYears: {
      year: number;
      startDate: string;
      endDate: string;
    }[];
  }> {
    // For demonstration purposes, return last 5 years
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    const availableYears = years.map(year => ({
      year,
      startDate: `${year}-01-01`,
      endDate: `${year}-12-31`,
    }));

    return {
      years,
      availableYears,
    };
  }
}
