import { WeeklyDataService } from './weekly-data.service.js';
import { TranslationService, type SupportedLocale } from '../translation.service.js';
import {
  WeeklyReportData,
  ReportCoverPage,
  ReportSummary,
  KeyMetrics,
  WasteBreakdown,
  WasteZone,
  SystemAlert,
  WeeklyComparison,
} from '@/types/index.js';

/**
 * Service for generating weekly reports
 */
export class WeeklyReportsService {
  private weeklyDataService: WeeklyDataService;

  constructor() {
    this.weeklyDataService = new WeeklyDataService();
  }

  /**
   * Generate weekly report data
   */
  async generateWeeklyReport(
    year: number,
    week: number,
    locale: SupportedLocale = 'en'
  ): Promise<WeeklyReportData> {
    const weekData = this.weeklyDataService.getWeeklyData(year, week);

    if (!weekData) {
      throw new Error(`No data found for year ${year}, week ${week}`);
    }

    const weekOverWeekChange = this.weeklyDataService.getWeekOverWeekChange(year, week);

    const coverPage: ReportCoverPage = {
      title:
        locale === 'ar'
          ? `التقرير الأسبوعي للنفايات – الأسبوع ${week}، ${year}`
          : `Weekly Waste Report – Week ${week}, ${year}`,
      systemName: TranslationService.translateSystem('Al-Haram Waste Management System', locale),
      generatedDate: new Date().toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      period: `${weekData.startDate} to ${weekData.endDate}`,
    };

    const summary: ReportSummary = {
      totalWasteKg: weekData.totalWaste,
      plasticWasteKg: weekData.plasticWaste,
      organicWasteKg: weekData.organicWaste,
      percentChangeFromLastWeek: weekOverWeekChange,
      topWasteZone: TranslationService.translateZone('Mataf Area', locale),
      systemStatus: TranslationService.translateStatus('Operational', locale),
    };

    const keyMetrics: KeyMetrics = {
      totalWaste: { value: weekData.totalWaste, unit: 'kg' },
      plasticWaste: {
        value: weekData.plasticWaste,
        unit: 'kg',
        percentage: Math.round((weekData.plasticWaste / weekData.totalWaste) * 100),
      },
      organicWaste: {
        value: weekData.organicWaste,
        unit: 'kg',
        percentage: Math.round((weekData.organicWaste / weekData.totalWaste) * 100),
      },
      topZone: {
        name: TranslationService.translateZone('Mataf Area', locale),
        amount: Math.round(weekData.totalWaste * 0.26),
        unit: 'kg',
      },
    };

    const wasteBreakdown: WasteBreakdown = {
      plastic: {
        amount: weekData.plasticWaste,
        percentage: Math.round((weekData.plasticWaste / weekData.totalWaste) * 100),
        color: 'bg-blue-500',
      },
      organic: {
        amount: weekData.organicWaste,
        percentage: Math.round((weekData.organicWaste / weekData.totalWaste) * 100),
        color: 'bg-green-500',
      },
      total: weekData.totalWaste,
    };

    const topWasteZones: WasteZone[] = [
      {
        name: TranslationService.translateZone('Mataf Area', locale),
        amount: Math.round(weekData.totalWaste * 0.26),
        percentage: 26,
      },
      {
        name: TranslationService.translateZone('King Abdul Aziz Gate', locale),
        amount: Math.round(weekData.totalWaste * 0.21),
        percentage: 21,
      },
      {
        name: TranslationService.translateZone('Safa and Marwa Galleries', locale),
        amount: Math.round(weekData.totalWaste * 0.17),
        percentage: 17,
      },
      {
        name: TranslationService.translateZone("Prophet's Gate", locale),
        amount: Math.round(weekData.totalWaste * 0.16),
        percentage: 16,
      },
      {
        name: TranslationService.translateZone('Al-Salam Gate', locale),
        amount: Math.round(weekData.totalWaste * 0.11),
        percentage: 11,
      },
      {
        name: TranslationService.translateZone('Maqam Ibrahim Area', locale),
        amount: Math.round(weekData.totalWaste * 0.09),
        percentage: 9,
      },
    ];

    const systemAlerts: SystemAlert[] = this.generateSystemAlerts(
      week,
      weekData,
      weekOverWeekChange,
      locale
    );

    // Get previous week data for comparison
    const prevWeekData =
      week > 1
        ? this.weeklyDataService.getWeeklyData(year, week - 1)
        : this.weeklyDataService.getWeeklyData(year - 1, 52);

    const weekToWeekComparison: WeeklyComparison = {
      thisWeek: weekData.totalWaste,
      lastWeek: prevWeekData?.totalWaste || 0,
      change: weekOverWeekChange,
      dailyBreakdown: this.generateDailyBreakdown(weekData, prevWeekData),
    };

    return {
      coverPage,
      summary,
      keyMetrics,
      wasteBreakdown,
      topWasteZones,
      systemAlerts,
      weekToWeekComparison,
    };
  }

  /**
   * Get available periods for weekly reports
   */
  async getAvailableWeeklyPeriods(): Promise<{
    years: number[];
    weeks: { year: number; week: number; start_date: string; end_date: string }[];
  }> {
    const years = this.weeklyDataService.getAvailableYears();
    const weeks: { year: number; week: number; start_date: string; end_date: string }[] = [];

    for (const year of years) {
      const yearWeeks = this.weeklyDataService.getAvailableWeeks(year);
      weeks.push(
        ...yearWeeks.map(w => ({
          year,
          week: w.week,
          start_date: w.startDate,
          end_date: w.endDate,
        }))
      );
    }

    return { years, weeks };
  }

  /**
   * Generate system alerts based on week data and patterns
   */
  private generateSystemAlerts(
    week: number,
    weekData: any,
    weekOverWeekChange: number,
    locale: SupportedLocale = 'en'
  ): SystemAlert[] {
    const alerts: SystemAlert[] = [];

    // Always include collections completed
    alerts.push({
      type: 'info',
      zone: TranslationService.translateZone('System-wide', locale),
      issue: `${weekData.collections} ${TranslationService.translateAlert('successful waste collections completed', locale)}`,
      status: TranslationService.translateStatus('completed', locale),
    });

    // High waste weeks (above 70kg) - capacity warnings
    if (weekData.totalWaste > 70000) {
      alerts.push({
        type: 'warning',
        zone: TranslationService.translateZone('Mataf Area', locale),
        issue: TranslationService.translateAlert(
          'Bin capacity at 95% - collection priority required',
          locale
        ),
        status: TranslationService.translateStatus('pending', locale),
      });

      alerts.push({
        type: 'info',
        zone: TranslationService.translateZone('Operations Center', locale),
        issue: TranslationService.translateAlert(
          'Additional collection crews deployed for high-volume period',
          locale
        ),
        status: TranslationService.translateStatus('completed', locale),
      });
    }

    // Hajj period specific alerts (weeks 24-26)
    if (week >= 24 && week <= 26) {
      alerts.push({
        type: 'resolved',
        zone: TranslationService.translateZone('King Abdul Aziz Gate', locale),
        issue: TranslationService.translateAlert(
          'Emergency grinder unit activated for increased plastic load',
          locale
        ),
        status: TranslationService.translateStatus('resolved', locale),
      });

      alerts.push({
        type: 'warning',
        zone: TranslationService.translateZone('Safa and Marwa Galleries', locale),
        issue: TranslationService.translateAlert(
          'Overflow sensors detected - immediate attention required',
          locale
        ),
        status: TranslationService.translateStatus('pending', locale),
      });

      alerts.push({
        type: 'info',
        zone: TranslationService.translateZone('Transportation', locale),
        issue: TranslationService.translateAlert(
          '24/7 collection schedule implemented during Hajj period',
          locale
        ),
        status: TranslationService.translateStatus('completed', locale),
      });
    }

    // Ramadan period alerts (weeks 10-14)
    if (week >= 10 && week <= 14) {
      alerts.push({
        type: 'resolved',
        zone: TranslationService.translateZone("Prophet's Gate", locale),
        issue: TranslationService.translateAlert(
          'Iftar waste surge managed - extra bins deployed',
          locale
        ),
        status: TranslationService.translateStatus('resolved', locale),
      });

      alerts.push({
        type: 'info',
        zone: TranslationService.translateZone('Al-Salam Gate', locale),
        issue: TranslationService.translateAlert(
          'Night shift collection teams increased for Taraweeh period',
          locale
        ),
        status: TranslationService.translateStatus('completed', locale),
      });
    }

    // High change weeks - monitoring alerts
    if (Math.abs(weekOverWeekChange) > 50) {
      const unusualType =
        weekOverWeekChange > 0
          ? TranslationService.translateAlert('Unusual increase', locale)
          : TranslationService.translateAlert('Unusual decrease', locale);

      alerts.push({
        type: 'warning',
        zone: TranslationService.translateZone('Data Analytics', locale),
        issue: `${unusualType} ${locale === 'ar' ? 'بنسبة' : 'of'} ${Math.abs(weekOverWeekChange)}% ${TranslationService.translateAlert('detected - monitoring closely', locale)}`,
        status: TranslationService.translateStatus('pending', locale),
      });
    }

    // Regular maintenance alerts (every 4-6 weeks)
    if (week % 5 === 0) {
      alerts.push({
        type: 'resolved',
        zone: TranslationService.translateZone('Maqam Ibrahim Area', locale),
        issue: TranslationService.translateAlert(
          'Scheduled maintenance on waste compactors completed',
          locale
        ),
        status: TranslationService.translateStatus('resolved', locale),
      });
    }

    // Equipment-specific alerts based on week patterns
    if (week % 7 === 1) {
      alerts.push({
        type: 'info',
        zone: TranslationService.translateZone('Equipment Management', locale),
        issue: TranslationService.translateAlert(
          'Weekly sensor calibration and cleaning completed',
          locale
        ),
        status: TranslationService.translateStatus('completed', locale),
      });
    }

    // Seasonal alerts
    if (week >= 27 && week <= 35) {
      // Summer period
      alerts.push({
        type: 'info',
        zone: TranslationService.translateZone('Environmental Control', locale),
        issue: TranslationService.translateAlert(
          'Enhanced odor control systems activated for summer period',
          locale
        ),
        status: TranslationService.translateStatus('completed', locale),
      });
    }

    // Technology alerts
    if (week % 8 === 3) {
      alerts.push({
        type: 'resolved',
        zone: TranslationService.translateZone('IT Systems', locale),
        issue: TranslationService.translateAlert(
          'IoT sensor network optimization completed',
          locale
        ),
        status: TranslationService.translateStatus('resolved', locale),
      });
    }

    // Energy efficiency alerts
    if (weekData.energyGenerated > 12000) {
      alerts.push({
        type: 'info',
        zone: TranslationService.translateZone('Energy Recovery', locale),
        issue: `${TranslationService.translateAlert('High energy recovery', locale)}: ${weekData.energyGenerated.toLocaleString()} ${TranslationService.translateAlert('kWh generated from organic waste', locale)}`,
        status: TranslationService.translateStatus('completed', locale),
      });
    }

    // Critical capacity warnings for very high weeks
    if (weekData.totalWaste > 100000) {
      alerts.push({
        type: 'warning',
        zone: TranslationService.translateZone('Operations Control', locale),
        issue: TranslationService.translateAlert(
          'System operating at maximum capacity - emergency protocols activated',
          locale
        ),
        status: TranslationService.translateStatus('pending', locale),
      });
    }

    // Return maximum of 6 alerts to avoid overcrowding
    return alerts.slice(0, 6);
  }

  /**
   * Generate daily breakdown (simulated from weekly data)
   */
  private generateDailyBreakdown(currentWeek: any, previousWeek: any) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dailyAvgCurrent = Math.round(currentWeek.totalWaste / 7);
    const dailyAvgPrevious = previousWeek ? Math.round(previousWeek.totalWaste / 7) : 0;

    return days.map(day => ({
      day,
      thisWeek: dailyAvgCurrent + Math.round((Math.random() - 0.5) * 2000), // Add some variation
      lastWeek: dailyAvgPrevious + Math.round((Math.random() - 0.5) * 2000),
    }));
  }
}
