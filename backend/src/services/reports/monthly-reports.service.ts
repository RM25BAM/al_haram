import { MonthlyReportData } from '@/types/index.js';
import { MonthlyDataService } from './monthly-data.service.js';
import { SupportedLocale } from '../translation.service.js';

/**
 * Service for generating monthly reports
 * Uses MonthlyDataService to get the actual data for different months
 */
export class MonthlyReportsService {
  private monthlyDataService = new MonthlyDataService();

  /**
   * Generate monthly report data
   * Returns data for the specified year and month
   */
  async generateMonthlyReport(
    year: number,
    month: number,
    locale: SupportedLocale = 'en'
  ): Promise<MonthlyReportData> {
    return this.monthlyDataService.generateMonthlyData(year, month, locale);
  }

  /**
   * Get available periods for monthly reports
   * Returns available periods for 2024
   */
  async getAvailableMonthlyPeriods(): Promise<{
    years: number[];
    months: { year: number; month: number; start_date: string; end_date: string }[];
  }> {
    const months = [];

    // Generate months for 2024
    for (let month = 1; month <= 12; month++) {
      const startDate = new Date(2024, month - 1, 1);
      const endDate = new Date(2024, month, 0); // Last day of the month

      months.push({
        year: 2024,
        month,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
      });
    }

    return {
      years: [2024],
      months: months.reverse(), // Most recent first
    };
  }
}
