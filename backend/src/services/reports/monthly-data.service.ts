import type { MonthlyReportData } from '../../types/index.js';
import { TranslationService, type SupportedLocale } from '../translation.service.js';

/**
 * Service for generating monthly waste data
 * Provides base data that can be used by various report generators
 */
export class MonthlyDataService {
  /**
   * Generate monthly waste data for a specific year and month
   * Provides different data for each month of 2024
   */
  public async generateMonthlyData(
    year: number,
    month: number,
    locale: SupportedLocale = 'en'
  ): Promise<MonthlyReportData> {
    // Validate input parameters
    if (year !== 2024 || month < 1 || month > 12) {
      throw new Error('Data is only available for year 2024, months 1-12');
    }

    // Generate month-specific data based on the month parameter
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const monthName = monthNames[month - 1];

    // Realistic seasonal patterns based on Islamic calendar and pilgrimage seasons
    // Values account for 16 bins capacity and actual visitor patterns
    const seasonalMultipliers = [
      0.65, // January - Post-Hajj low season
      0.6, // February - Lowest visitor season
      0.75, // March - Early Umrah season
      0.85, // April - Pre-Ramadan moderate season
      1.2, // May - Ramadan peak (varies yearly, 2024: March 10 - April 9)
      2.8, // June - Hajj season 2024 (June 14-19) - PEAK MONTH
      1.4, // July - Post-Hajj, high Umrah season
      1.1, // August - Summer Umrah season
      0.9, // September - Moderate season
      0.8, // October - Lower season
      0.7, // November - Cool season, moderate Umrah
      0.95, // December - Winter Umrah increase
    ];

    // Base waste generation: 16 bins with average 50kg capacity per day per bin
    // During normal operations: ~800kg/day, ~24 tons/month
    const baseBinCapacity = 50; // kg per bin per day
    const totalBins = 16;
    const daysInMonth = new Date(year, month, 0).getDate();
    const baseWasteMonthly = baseBinCapacity * totalBins * daysInMonth; // ~24 tons/month baseline

    const multiplier = seasonalMultipliers[month - 1];
    const totalWaste = Math.round(baseWasteMonthly * multiplier);

    // Realistic waste composition for religious site: more organic (food), some plastic bottles
    // Organic bins: ~10 bins, Plastic bins: ~6 bins
    const organicPercentage = 0.62; // 62% organic (food waste, paper, biodegradable)
    const plasticPercentage = 0.28; // 28% plastic (bottles, packaging)
    // Remaining 10% is other materials (mixed waste, handled in total calculations)

    const organicWaste = Math.round(totalWaste * organicPercentage);
    const plasticWaste = Math.round(totalWaste * plasticPercentage);

    // Calculate growth compared to previous month
    const prevMultiplier = month === 1 ? seasonalMultipliers[11] : seasonalMultipliers[month - 2];
    const growthPercent = Math.round(((multiplier - prevMultiplier) / prevMultiplier) * 100);

    // Generate zone performance based on month
    const zoneData = this.generateZonePerformance(totalWaste, month, locale);

    const monthlyData: MonthlyReportData = {
      coverPage: {
        title: `${TranslationService.translateSystem('Monthly Waste Report', locale)} – ${TranslationService.translateMonth(monthName, locale)} ${year}`,
        systemName: TranslationService.translateSystem('Al-Haram Waste Management System', locale),
        generatedDate: TranslationService.getLocalizedDate(new Date(), locale),
      },
      summary: {
        totalWasteKg: totalWaste,
        plasticWasteKg: plasticWaste,
        organicWasteKg: organicWaste,
        percentChangeFromLastMonth: growthPercent,
        topWasteZone: zoneData[0].name,
        systemPerformance: TranslationService.translateStatus(
          multiplier > 1.1 ? 'High Load' : multiplier < 0.9 ? 'Optimal' : 'Normal',
          locale
        ),
      },
      keyMetrics: {
        totalWaste: { value: totalWaste, unit: 'kg', change: growthPercent },
        plasticWaste: {
          value: plasticWaste,
          unit: 'kg',
          percentage: Math.round(plasticPercentage * 100),
        },
        organicWaste: {
          value: organicWaste,
          unit: 'kg',
          percentage: Math.round(organicPercentage * 100),
        },
        topZone: { name: zoneData[0].name, amount: zoneData[0].amount, unit: 'kg' },
      },
      wasteTrends: this.generateWeeklyTrends(totalWaste, month, locale),
      zonePerformance: zoneData,
      systemHealth: this.generateSystemHealth(multiplier, month, locale),
      treatmentImpact: this.generateTreatmentImpact(totalWaste, locale),
      comparisonToPrevious: this.generateComparison(
        totalWaste,
        prevMultiplier * baseWasteMonthly,
        month,
        locale
      ),
      recommendations: this.generateRecommendations(multiplier, month, locale),
    };

    return monthlyData;
  }

  /**
   * Generate zone performance data based on total waste and month
   */
  private generateZonePerformance(totalWaste: number, month: number, locale: SupportedLocale) {
    const zones = [
      { name: 'Mataf Area', basePercentage: 26 },
      { name: 'King Abdul Aziz Gate', basePercentage: 21 },
      { name: 'Safa and Marwa Galleries', basePercentage: 17 },
      { name: "Prophet's Gate", basePercentage: 16 },
      { name: 'Al-Salam Gate', basePercentage: 11 },
      { name: 'Maqam Ibrahim Area', basePercentage: 9 },
    ];

    // Adjust percentages slightly based on month (seasonal variations)
    const seasonalAdjustments =
      month > 4 && month < 7
        ? [0, -2, 1, 1, 0, 0] // Ramadan season - Mataf stable, galleries busier
        : [1, 0, -1, 0, 0, 0]; // Normal season

    const trends = ['increasing', 'stable', 'decreasing'];

    return zones.map((zone, index) => {
      const adjustedPercentage = Math.max(0, zone.basePercentage + seasonalAdjustments[index]);
      const amount = Math.round((totalWaste * adjustedPercentage) / 100);
      const trendValue = trends[index % 3] as 'increasing' | 'stable' | 'decreasing';

      return {
        name: TranslationService.translateZone(zone.name, locale),
        amount,
        percentage: adjustedPercentage,
        trend: TranslationService.translateStatus(trendValue, locale), // Translate trend values
      };
    });
  }

  /**
   * Generate weekly trends data
   */
  private generateWeeklyTrends(totalWaste: number, month: number, locale: SupportedLocale) {
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    const weeklyDistribution =
      month === 6 // June (Hajj month) has different pattern
        ? [0.15, 0.25, 0.35, 0.25] // Peak during Hajj week
        : month === 5 // Ramadan has increasing pattern
          ? [0.22, 0.24, 0.26, 0.28] // Increasing throughout month
          : [0.24, 0.25, 0.26, 0.25]; // More balanced

    // Realistic waste composition for 16-bin system
    const organicPercentage = 0.62;
    const plasticPercentage = 0.28;

    return {
      weeklyTotals: weeks.map((week, index) => {
        const amount = Math.round(totalWaste * weeklyDistribution[index]);
        const organic = Math.round(amount * organicPercentage);
        const plastic = Math.round(amount * plasticPercentage);

        return {
          week: TranslationService.translateWeek(week, locale),
          amount,
          organic,
          plastic,
        };
      }),
    };
  }

  /**
   * Generate system health data
   */
  private generateSystemHealth(multiplier: number, _month: number, locale: SupportedLocale) {
    const isHighLoad = multiplier > 1.5; // Adjusted threshold for realistic 16-bin system
    const uptime = isHighLoad ? 96.5 + Math.random() * 2 : 98.2 + Math.random() * 1.5;

    return {
      operationalBins: Math.round(14 + Math.random() * 2), // Out of 16 total bins
      grinderIssues: {
        resolved: Math.round(2 + Math.random() * 4), // Smaller scale operation
        pending: isHighLoad ? Math.round(1 + Math.random() * 2) : Math.round(0 + Math.random() * 1),
      },
      odorSensorStatus: TranslationService.translateStatus('All Clear', locale),
      maintenanceCompleted: Math.round(3 + Math.random() * 5), // Realistic for 16-bin system
      uptime: Math.round(uptime * 10) / 10,
    };
  }

  /**
   * Generate treatment impact data
   */
  private generateTreatmentImpact(totalWaste: number, locale: SupportedLocale) {
    // Realistic rates for organic waste processing and plastic recycling
    const energyPerKg = 0.15; // kWh per kg (lower for smaller scale operation)
    const revenuePerKg = 0.25; // USD per kg (conservative estimate for mixed waste)
    const carbonPerKg = 0.0008; // tons CO2 per kg (realistic for waste processing)

    return {
      energyGeneration: {
        value: Math.round(totalWaste * energyPerKg),
        unit: 'kWh',
        source: TranslationService.translateSource('organic waste processing', locale),
      },
      revenueGeneration: {
        value: Math.round(totalWaste * revenuePerKg),
        unit: 'USD',
        source: TranslationService.translateSource(
          'plastic recycling & organic processing',
          locale
        ),
      },
      carbonFootprint: {
        value: Math.round(totalWaste * carbonPerKg * 100) / 100,
        unit: 'tons CO2',
        description: TranslationService.translateStatus(
          'reduction through proper waste management',
          locale
        ),
      },
    };
  }

  /**
   * Generate comparison data
   */
  private generateComparison(
    thisMonth: number,
    lastMonth: number,
    _month: number,
    locale: SupportedLocale
  ) {
    const changePercent = Math.round(((thisMonth - lastMonth) / lastMonth) * 100);

    const reason =
      changePercent > 10
        ? 'Increased pilgrimage activity'
        : changePercent < -10
          ? 'Decreased activity or improved efficiency'
          : 'Normal operational variation';

    return {
      thisMonth,
      lastMonth,
      changePercent,
      keyChanges: [
        {
          metric: TranslationService.translateComparison('Total Waste', locale),
          change: `${changePercent}%`,
          reason: TranslationService.translateComparison(reason, locale),
        },
      ],
    };
  }

  /**
   * Generate recommendations based on season and load
   */
  private generateRecommendations(multiplier: number, _month: number, locale: SupportedLocale) {
    const baseRecommendations = [
      'Monitor bin fill levels to optimize collection schedule',
      'Regular maintenance of organic and plastic separation systems',
    ];

    let recommendations: string[] = [];

    if (multiplier > 2.0) {
      // Extreme peak season (Hajj)
      recommendations = [
        'Deploy additional temporary bins during Hajj peak period',
        'Increase collection frequency to 3x daily during peak days',
        'Ensure all 16 bins are operational and properly labeled',
        'Coordinate with cleaning crews for immediate overflow response',
        ...baseRecommendations,
      ];
    } else if (multiplier > 1.1) {
      // High load months (Ramadan, Umrah peaks)
      recommendations = [
        'Increase bin monitoring frequency during peak visitor times',
        'Ensure proper segregation of organic and plastic waste',
        'Schedule additional maintenance checks for high-use bins',
        'Monitor capacity trends for future planning',
        ...baseRecommendations,
      ];
    } else if (multiplier < 0.8) {
      // Low load months
      recommendations = [
        'Conduct thorough cleaning and maintenance of all 16 bins',
        'Review and optimize bin placement locations',
        'Train staff on proper waste segregation procedures',
        'Plan preventive maintenance during low-demand periods',
        ...baseRecommendations,
      ];
    } else {
      // Normal load months
      recommendations = [
        'Maintain current operational procedures for 16-bin system',
        'Monitor organic vs plastic waste ratio trends',
        'Ensure consistent waste segregation quality',
        'Regular inspection of bin conditions and signage',
        ...baseRecommendations,
      ];
    }

    // Translate recommendations based on locale
    return recommendations.map(recommendation =>
      TranslationService.translateRecommendation(recommendation, locale)
    );
  }

  /**
   * Get monthly waste summary data
   * Returns just the summary portion of the monthly data
   */
  public async getMonthlySummary(
    year: number,
    month: number,
    locale: SupportedLocale = 'en'
  ): Promise<MonthlyReportData['summary']> {
    const data = await this.generateMonthlyData(year, month, locale);
    return data.summary;
  }

  /**
   * Get monthly waste trends data
   * Returns just the waste trends portion of the monthly data
   */
  public async getMonthlyWasteTrends(
    year: number,
    month: number,
    locale: SupportedLocale = 'en'
  ): Promise<MonthlyReportData['wasteTrends']> {
    const data = await this.generateMonthlyData(year, month, locale);
    return data.wasteTrends;
  }

  /**
   * Get monthly zone performance data
   * Returns just the zone performance portion of the monthly data
   */
  public async getMonthlyZonePerformance(
    year: number,
    month: number,
    locale: SupportedLocale = 'en'
  ): Promise<MonthlyReportData['zonePerformance']> {
    const data = await this.generateMonthlyData(year, month, locale);
    return data.zonePerformance;
  }

  /**
   * Get monthly system health data
   * Returns just the system health portion of the monthly data
   */
  public async getMonthlySystemHealth(
    year: number,
    month: number,
    locale: SupportedLocale = 'en'
  ): Promise<MonthlyReportData['systemHealth']> {
    const data = await this.generateMonthlyData(year, month, locale);
    return data.systemHealth;
  }

  /**
   * Get monthly treatment impact data
   * Returns just the treatment impact portion of the monthly data
   */
  public async getMonthlyTreatmentImpact(
    year: number,
    month: number,
    locale: SupportedLocale = 'en'
  ): Promise<MonthlyReportData['treatmentImpact']> {
    const data = await this.generateMonthlyData(year, month, locale);
    return data.treatmentImpact;
  }

  /**
   * Get comparison data to previous month
   * Returns just the comparison portion of the monthly data
   */
  public async getMonthlyComparison(
    year: number,
    month: number,
    locale: SupportedLocale = 'en'
  ): Promise<MonthlyReportData['comparisonToPrevious']> {
    const data = await this.generateMonthlyData(year, month, locale);
    return data.comparisonToPrevious;
  }

  /**
   * Get available months for which data is available
   * Returns all months of 2024 with available data
   */
  public async getAvailableMonths(): Promise<{
    months: { year: number; month: number; monthName: string; dataAvailable: boolean }[];
    totalMonths: number;
  }> {
    const months = [];
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    // Return all 12 months of 2024
    for (let i = 1; i <= 12; i++) {
      months.push({
        year: 2024,
        month: i,
        monthName: monthNames[i - 1],
        dataAvailable: true,
      });
    }

    return {
      months,
      totalMonths: months.length,
    };
  }
}
