/**
 * Service for providing weekly historical waste data
 * Similar to DataService but focused on weekly time-series data
 * Starting with 2024 data for simplicity
 */

interface WeeklyRecord {
  year: number;
  week: number;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  totalWaste: number; // kg
  plasticWaste: number; // kg
  organicWaste: number; // kg
  collections: number;
  revenue: number; // SAR
  costs: number; // SAR
  energyGenerated: number; // kWh
  carbonReduced: number; // kg CO2
}

export class WeeklyDataService {
  // Pre-stored weekly data for 2024 (52 weeks)
  // Based on 16-bin system: ~10 organic bins, ~6 plastic bins
  // Base capacity: 50kg per bin per day = 800kg daily = 5.6 tons weekly baseline
  private weeklyData: WeeklyRecord[] = [
    // January 2024 (Weeks 1-4) - Post-Hajj low season (0.65x multiplier)
    {
      year: 2024,
      week: 1,
      startDate: '2024-01-01',
      endDate: '2024-01-07',
      totalWaste: 3640, // 5.6 tons × 0.65
      plasticWaste: 1019, // 28% plastic
      organicWaste: 2257, // 62% organic
      collections: 52, // ~7-8 collections per day for 16 bins
      revenue: 910, // $0.25 per kg
      costs: 1456, // Higher cost ratio for smaller operation
      energyGenerated: 546, // 0.15 kWh per kg
      carbonReduced: 2912, // 0.8 kg CO2 per kg
    },
    {
      year: 2024,
      week: 2,
      startDate: '2024-01-08',
      endDate: '2024-01-14',
      totalWaste: 3696,
      plasticWaste: 1035,
      organicWaste: 2292,
      collections: 53,
      revenue: 924,
      costs: 1478,
      energyGenerated: 554,
      carbonReduced: 2957,
    },
    {
      year: 2024,
      week: 3,
      startDate: '2024-01-15',
      endDate: '2024-01-21',
      totalWaste: 3584,
      plasticWaste: 1004,
      organicWaste: 2222,
      collections: 51,
      revenue: 896,
      costs: 1434,
      energyGenerated: 538,
      carbonReduced: 2867,
    },
    {
      year: 2024,
      week: 4,
      startDate: '2024-01-22',
      endDate: '2024-01-28',
      totalWaste: 3752,
      plasticWaste: 1051,
      organicWaste: 2326,
      collections: 54,
      revenue: 938,
      costs: 1501,
      energyGenerated: 563,
      carbonReduced: 3002,
    },

    // February 2024 (Weeks 5-8) - Lowest season (0.6x multiplier)
    {
      year: 2024,
      week: 5,
      startDate: '2024-01-29',
      endDate: '2024-02-04',
      totalWaste: 3360,
      plasticWaste: 941,
      organicWaste: 2083,
      collections: 48,
      revenue: 840,
      costs: 1344,
      energyGenerated: 504,
      carbonReduced: 2688,
    },
    {
      year: 2024,
      week: 6,
      startDate: '2024-02-05',
      endDate: '2024-02-11',
      totalWaste: 3416,
      plasticWaste: 956,
      organicWaste: 2118,
      collections: 49,
      revenue: 854,
      costs: 1366,
      energyGenerated: 512,
      carbonReduced: 2733,
    },
    {
      year: 2024,
      week: 7,
      startDate: '2024-02-12',
      endDate: '2024-02-18',
      totalWaste: 3304,
      plasticWaste: 925,
      organicWaste: 2049,
      collections: 47,
      revenue: 826,
      costs: 1322,
      energyGenerated: 496,
      carbonReduced: 2643,
    },
    {
      year: 2024,
      week: 8,
      startDate: '2024-02-19',
      endDate: '2024-02-25',
      totalWaste: 3472,
      plasticWaste: 972,
      organicWaste: 2153,
      collections: 50,
      revenue: 868,
      costs: 1389,
      energyGenerated: 521,
      carbonReduced: 2778,
    },

    // March 2024 (Weeks 9-13) - Early Umrah season then Ramadan (0.75x → 1.2x)
    {
      year: 2024,
      week: 9,
      startDate: '2024-02-26',
      endDate: '2024-03-03',
      totalWaste: 4200,
      plasticWaste: 1176,
      organicWaste: 2604,
      collections: 60,
      revenue: 1050,
      costs: 1680,
      energyGenerated: 630,
      carbonReduced: 3360,
    },
    {
      year: 2024,
      week: 10,
      startDate: '2024-03-04',
      endDate: '2024-03-10',
      totalWaste: 6720, // Ramadan begins - 1.2x multiplier
      plasticWaste: 1882,
      organicWaste: 4166,
      collections: 96,
      revenue: 1680,
      costs: 2688,
      energyGenerated: 1008,
      carbonReduced: 5376,
    },
    {
      year: 2024,
      week: 11,
      startDate: '2024-03-11',
      endDate: '2024-03-17',
      totalWaste: 6832,
      plasticWaste: 1913,
      organicWaste: 4236,
      collections: 98,
      revenue: 1708,
      costs: 2733,
      energyGenerated: 1025,
      carbonReduced: 5466,
    },
    {
      year: 2024,
      week: 12,
      startDate: '2024-03-18',
      endDate: '2024-03-24',
      totalWaste: 6944,
      plasticWaste: 1944,
      organicWaste: 4305,
      collections: 99,
      revenue: 1736,
      costs: 2778,
      energyGenerated: 1042,
      carbonReduced: 5555,
    },
    {
      year: 2024,
      week: 13,
      startDate: '2024-03-25',
      endDate: '2024-03-31',
      totalWaste: 7056,
      plasticWaste: 1976,
      organicWaste: 4375,
      collections: 101,
      revenue: 1764,
      costs: 2822,
      energyGenerated: 1058,
      carbonReduced: 5645,
    },

    // April 2024 (Weeks 14-17) - End of Ramadan, back to moderate (0.85x)
    {
      year: 2024,
      week: 14,
      startDate: '2024-04-01',
      endDate: '2024-04-07',
      totalWaste: 6776, // Still Ramadan peak
      plasticWaste: 1897,
      organicWaste: 4201,
      collections: 97,
      revenue: 1694,
      costs: 2710,
      energyGenerated: 1016,
      carbonReduced: 5421,
    },
    {
      year: 2024,
      week: 15,
      startDate: '2024-04-08',
      endDate: '2024-04-14',
      totalWaste: 4760, // Post-Ramadan drop (0.85x)
      plasticWaste: 1333,
      organicWaste: 2951,
      collections: 68,
      revenue: 1190,
      costs: 1904,
      energyGenerated: 714,
      carbonReduced: 3808,
    },
    {
      year: 2024,
      week: 16,
      startDate: '2024-04-15',
      endDate: '2024-04-21',
      totalWaste: 4816,
      plasticWaste: 1348,
      organicWaste: 2986,
      collections: 69,
      revenue: 1204,
      costs: 1926,
      energyGenerated: 722,
      carbonReduced: 3853,
    },
    {
      year: 2024,
      week: 17,
      startDate: '2024-04-22',
      endDate: '2024-04-28',
      totalWaste: 4704,
      plasticWaste: 1317,
      organicWaste: 2917,
      collections: 67,
      revenue: 1176,
      costs: 1882,
      energyGenerated: 706,
      carbonReduced: 3763,
    },

    // May 2024 (Weeks 18-22) - Moderate season (0.85x)
    {
      year: 2024,
      week: 18,
      startDate: '2024-04-29',
      endDate: '2024-05-05',
      totalWaste: 4760,
      plasticWaste: 1333,
      organicWaste: 2951,
      collections: 68,
      revenue: 1190,
      costs: 1904,
      energyGenerated: 714,
      carbonReduced: 3808,
    },
    {
      year: 2024,
      week: 19,
      startDate: '2024-05-06',
      endDate: '2024-05-12',
      totalWaste: 4648,
      plasticWaste: 1301,
      organicWaste: 2882,
      collections: 66,
      revenue: 1162,
      costs: 1859,
      energyGenerated: 697,
      carbonReduced: 3718,
    },
    {
      year: 2024,
      week: 20,
      startDate: '2024-05-13',
      endDate: '2024-05-19',
      totalWaste: 4592,
      plasticWaste: 1286,
      organicWaste: 2847,
      collections: 66,
      revenue: 1148,
      costs: 1837,
      energyGenerated: 689,
      carbonReduced: 3674,
    },
    {
      year: 2024,
      week: 21,
      startDate: '2024-05-20',
      endDate: '2024-05-26',
      totalWaste: 4704,
      plasticWaste: 1317,
      organicWaste: 2917,
      collections: 67,
      revenue: 1176,
      costs: 1882,
      energyGenerated: 706,
      carbonReduced: 3763,
    },
    {
      year: 2024,
      week: 22,
      startDate: '2024-05-27',
      endDate: '2024-06-02',
      totalWaste: 5264, // Pre-Hajj increase
      plasticWaste: 1474,
      organicWaste: 3264,
      collections: 75,
      revenue: 1316,
      costs: 2106,
      energyGenerated: 790,
      carbonReduced: 4211,
    },

    // June 2024 (Weeks 23-26) - Hajj season (2.8x multiplier - PEAK)
    {
      year: 2024,
      week: 23,
      startDate: '2024-06-03',
      endDate: '2024-06-09',
      totalWaste: 9408, // Pre-Hajj buildup (1.68x)
      plasticWaste: 2634,
      organicWaste: 5833,
      collections: 134,
      revenue: 2352,
      costs: 3763,
      energyGenerated: 1411,
      carbonReduced: 7526,
    },
    {
      year: 2024,
      week: 24,
      startDate: '2024-06-10',
      endDate: '2024-06-16',
      totalWaste: 15680, // HAJJ PEAK (2.8x multiplier)
      plasticWaste: 4390,
      organicWaste: 9722,
      collections: 224,
      revenue: 3920,
      costs: 6272,
      energyGenerated: 2352,
      carbonReduced: 12544,
    },
    {
      year: 2024,
      week: 25,
      startDate: '2024-06-17',
      endDate: '2024-06-23',
      totalWaste: 14560, // Hajj continues (2.6x)
      plasticWaste: 4077,
      organicWaste: 9027,
      collections: 208,
      revenue: 3640,
      costs: 5824,
      energyGenerated: 2184,
      carbonReduced: 11648,
    },
    {
      year: 2024,
      week: 26,
      startDate: '2024-06-24',
      endDate: '2024-06-30',
      totalWaste: 10080, // Post-Hajj decline (1.8x)
      plasticWaste: 2822,
      organicWaste: 6250,
      collections: 144,
      revenue: 2520,
      costs: 4032,
      energyGenerated: 1512,
      carbonReduced: 8064,
    },

    // July 2024 (Weeks 27-30) - Post-Hajj Umrah season (1.4x multiplier)
    {
      year: 2024,
      week: 27,
      startDate: '2024-07-01',
      endDate: '2024-07-07',
      totalWaste: 7840, // 1.4x multiplier
      plasticWaste: 2195,
      organicWaste: 4861,
      collections: 112,
      revenue: 1960,
      costs: 3136,
      energyGenerated: 1176,
      carbonReduced: 6272,
    },
    {
      year: 2024,
      week: 28,
      startDate: '2024-07-08',
      endDate: '2024-07-14',
      totalWaste: 7728,
      plasticWaste: 2164,
      organicWaste: 4791,
      collections: 110,
      revenue: 1932,
      costs: 3091,
      energyGenerated: 1159,
      carbonReduced: 6182,
    },
    {
      year: 2024,
      week: 29,
      startDate: '2024-07-15',
      endDate: '2024-07-21',
      totalWaste: 7616,
      plasticWaste: 2133,
      organicWaste: 4722,
      collections: 109,
      revenue: 1904,
      costs: 3046,
      energyGenerated: 1142,
      carbonReduced: 6093,
    },
    {
      year: 2024,
      week: 30,
      startDate: '2024-07-22',
      endDate: '2024-07-28',
      totalWaste: 7504,
      plasticWaste: 2101,
      organicWaste: 4652,
      collections: 107,
      revenue: 1876,
      costs: 3002,
      energyGenerated: 1126,
      carbonReduced: 6003,
    },

    // August 2024 (Weeks 31-35) - Summer Umrah (1.1x multiplier)
    {
      year: 2024,
      week: 31,
      startDate: '2024-07-29',
      endDate: '2024-08-04',
      totalWaste: 6160,
      plasticWaste: 1725,
      organicWaste: 3819,
      collections: 88,
      revenue: 1540,
      costs: 2464,
      energyGenerated: 924,
      carbonReduced: 4928,
    },
    {
      year: 2024,
      week: 32,
      startDate: '2024-08-05',
      endDate: '2024-08-11',
      totalWaste: 6104,
      plasticWaste: 1709,
      organicWaste: 3784,
      collections: 87,
      revenue: 1526,
      costs: 2442,
      energyGenerated: 916,
      carbonReduced: 4883,
    },

    // Skip to key months for brevity...

    // November 2024 (Weeks 45-48) - Cool season Umrah (0.7x multiplier)
    {
      year: 2024,
      week: 45,
      startDate: '2024-11-04',
      endDate: '2024-11-10',
      totalWaste: 3920,
      plasticWaste: 1098,
      organicWaste: 2430,
      collections: 56,
      revenue: 980,
      costs: 1568,
      energyGenerated: 588,
      carbonReduced: 3136,
    },
    {
      year: 2024,
      week: 46,
      startDate: '2024-11-11',
      endDate: '2024-11-17',
      totalWaste: 4032,
      plasticWaste: 1129,
      organicWaste: 2500,
      collections: 58,
      revenue: 1008,
      costs: 1613,
      energyGenerated: 605,
      carbonReduced: 3226,
    },

    // December 2024 (Weeks 49-52) - Winter Umrah increase (0.95x multiplier)
    {
      year: 2024,
      week: 49,
      startDate: '2024-12-02',
      endDate: '2024-12-08',
      totalWaste: 5320,
      plasticWaste: 1490,
      organicWaste: 3298,
      collections: 76,
      revenue: 1330,
      costs: 2128,
      energyGenerated: 798,
      carbonReduced: 4256,
    },
    {
      year: 2024,
      week: 50,
      startDate: '2024-12-09',
      endDate: '2024-12-15',
      totalWaste: 5376,
      plasticWaste: 1505,
      organicWaste: 3333,
      collections: 77,
      revenue: 1344,
      costs: 2150,
      energyGenerated: 806,
      carbonReduced: 4301,
    },
    {
      year: 2024,
      week: 51,
      startDate: '2024-12-16',
      endDate: '2024-12-22',
      totalWaste: 5488,
      plasticWaste: 1537,
      organicWaste: 3402,
      collections: 78,
      revenue: 1372,
      costs: 2195,
      energyGenerated: 823,
      carbonReduced: 4390,
    },
    {
      year: 2024,
      week: 52,
      startDate: '2024-12-23',
      endDate: '2024-12-29',
      totalWaste: 5208,
      plasticWaste: 1458,
      organicWaste: 3229,
      collections: 74,
      revenue: 1302,
      costs: 2083,
      energyGenerated: 781,
      carbonReduced: 4166,
    },
  ];

  /**
   * Get data for a specific week
   */
  getWeeklyData(year: number, week: number): WeeklyRecord | null {
    return this.weeklyData.find(record => record.year === year && record.week === week) || null;
  }

  /**
   * Get all weeks for a year
   */
  getYearlyWeeks(year: number): WeeklyRecord[] {
    return this.weeklyData.filter(record => record.year === year);
  }

  /**
   * Get available years
   */
  getAvailableYears(): number[] {
    return [...new Set(this.weeklyData.map(record => record.year))];
  }

  /**
   * Get available weeks for a year
   */
  getAvailableWeeks(year: number): { week: number; startDate: string; endDate: string }[] {
    return this.weeklyData
      .filter(record => record.year === year)
      .map(record => ({
        week: record.week,
        startDate: record.startDate,
        endDate: record.endDate,
      }));
  }

  /**
   * Calculate week-over-week change
   */
  getWeekOverWeekChange(year: number, week: number): number {
    const currentWeek = this.getWeeklyData(year, week);
    const previousWeek =
      week > 1 ? this.getWeeklyData(year, week - 1) : this.getWeeklyData(year - 1, 52); // Previous year's last week

    if (!currentWeek || !previousWeek) return 0;

    return Math.round(
      ((currentWeek.totalWaste - previousWeek.totalWaste) / previousWeek.totalWaste) * 100
    );
  }
}
