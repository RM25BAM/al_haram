import { WasteType } from '../types/index.js';

/**
 * Service for managing waste types data with comprehensive collection tracking
 */
export class WasteTypesService {
  private wasteTypes: WasteType[] = [
    {
      type: 'Plastic',
      amount: 4850, // Total collected this month (kg)
      percentage: 54.2,
      color: 'bg-blue-500',
      dailyAverage: 161.7, // 4850 / 30 days
      binCount: 8,
      weeklyTrend: [
        { day: 'Mon', amount: 165 },
        { day: 'Tue', amount: 152 },
        { day: 'Wed', amount: 178 },
        { day: 'Thu', amount: 159 },
        { day: 'Fri', amount: 184 },
        { day: 'Sat', amount: 171 },
        { day: 'Sun', amount: 142 },
      ],
      monthlyTrend: [
        { month: 'Jan', amount: 4420 },
        { month: 'Feb', amount: 4180 },
        { month: 'Mar', amount: 4650 },
        { month: 'Apr', amount: 4320 },
        { month: 'May', amount: 4890 },
        { month: 'Jun', amount: 4720 },
        { month: 'Jul', amount: 4850 }, // Current month
      ],
      collectionRecords: [
        // Recent collections (July 19-20, 2025)
        { date: '2025-07-20T10:30:00Z', amount: 45, binId: 'PL-A01', truckId: 'TRUCK001' },
        { date: '2025-07-20T08:15:00Z', amount: 32, binId: 'PL-A02', truckId: 'TRUCK003' },
        { date: '2025-07-20T13:20:00Z', amount: 18, binId: 'PL-A03', truckId: 'TRUCK003' },
        { date: '2025-07-20T16:45:00Z', amount: 15, binId: 'PL-M01', truckId: 'TRUCK001' },
        { date: '2025-07-20T09:45:00Z', amount: 17, binId: 'PL-M02L', truckId: 'TRUCK003' },
        { date: '2025-07-20T11:15:00Z', amount: 19, binId: 'PL-M02R', truckId: 'TRUCK001' },
        { date: '2025-07-20T14:30:00Z', amount: 21, binId: 'PL-M03', truckId: 'TRUCK001' },
        { date: '2025-07-20T12:30:00Z', amount: 44, binId: 'PL-A04', truckId: 'TRUCK001' },
        
        // July 19 collections
        { date: '2025-07-19T10:30:00Z', amount: 42, binId: 'PL-A01', truckId: 'TRUCK001' },
        { date: '2025-07-19T08:15:00Z', amount: 29, binId: 'PL-A02', truckId: 'TRUCK003' },
        { date: '2025-07-19T13:20:00Z', amount: 21, binId: 'PL-A03', truckId: 'TRUCK003' },
        { date: '2025-07-19T16:45:00Z', amount: 17, binId: 'PL-M01', truckId: 'TRUCK001' },
        { date: '2025-07-19T09:45:00Z', amount: 19, binId: 'PL-M02L', truckId: 'TRUCK003' },
        { date: '2025-07-19T11:15:00Z', amount: 21, binId: 'PL-M02R', truckId: 'TRUCK001' },
        { date: '2025-07-19T14:30:00Z', amount: 24, binId: 'PL-M03', truckId: 'TRUCK001' },
        { date: '2025-07-19T12:30:00Z', amount: 48, binId: 'PL-A04', truckId: 'TRUCK001' },

        // July 18 collections
        { date: '2025-07-18T10:30:00Z', amount: 38, binId: 'PL-A01', truckId: 'TRUCK003' },
        { date: '2025-07-18T13:30:00Z', amount: 34, binId: 'PL-A02', truckId: 'TRUCK001' },
        { date: '2025-07-18T16:10:00Z', amount: 16, binId: 'PL-A03', truckId: 'TRUCK001' },
        { date: '2025-07-18T11:30:00Z', amount: 14, binId: 'PL-M01', truckId: 'TRUCK001' },
        { date: '2025-07-18T15:20:00Z', amount: 16, binId: 'PL-M02L', truckId: 'TRUCK003' },
        { date: '2025-07-18T14:30:00Z', amount: 18, binId: 'PL-M02R', truckId: 'TRUCK001' },
        { date: '2025-07-18T10:45:00Z', amount: 22, binId: 'PL-M03', truckId: 'TRUCK001' },
        { date: '2025-07-18T09:20:00Z', amount: 46, binId: 'PL-A04', truckId: 'TRUCK001' },

        // July 17 collections
        { date: '2025-07-17T14:20:00Z', amount: 47, binId: 'PL-A01', truckId: 'TRUCK001' },
        { date: '2025-07-17T10:45:00Z', amount: 31, binId: 'PL-A02', truckId: 'TRUCK003' },
        { date: '2025-07-17T08:45:00Z', amount: 19, binId: 'PL-A03', truckId: 'TRUCK001' },
        { date: '2025-07-17T14:20:00Z', amount: 16, binId: 'PL-M01', truckId: 'TRUCK001' },
        { date: '2025-07-17T10:30:00Z', amount: 18, binId: 'PL-M02L', truckId: 'TRUCK003' },
        { date: '2025-07-17T09:20:00Z', amount: 20, binId: 'PL-M02R', truckId: 'TRUCK001' },
        { date: '2025-07-17T15:20:00Z', amount: 23, binId: 'PL-M03', truckId: 'TRUCK001' },
        { date: '2025-07-17T14:15:00Z', amount: 43, binId: 'PL-A04', truckId: 'TRUCK001' },
      ],
      peakHours: [
        { hour: '11:00', volume: 28.5 },
        { hour: '14:00', volume: 31.2 },
        { hour: '16:00', volume: 26.8 },
        { hour: '09:00', volume: 24.1 },
      ],
      efficiency: {
        collectionRate: 94.2, // Percentage of scheduled collections completed
        avgCollectionTime: 8.5, // Minutes per bin
        equipmentUtilization: 87.3, // Truck utilization percentage
        costPerKg: 0.85, // SAR per kg
      },
      environmentalImpact: {
        carbonSaved: 1420.5, // kg CO2 equivalent saved this month
        energyRecovered: 2425.0, // kWh equivalent
        landfillDiverted: 4850, // kg diverted from landfill
        recyclingRate: 78.2, // Percentage successfully recycled
      },
    },
    {
      type: 'Organic',
      amount: 4100, // Total collected this month (kg)
      percentage: 45.8,
      color: 'bg-green-500',
      dailyAverage: 136.7, // 4100 / 30 days
      binCount: 8,
      weeklyTrend: [
        { day: 'Mon', amount: 142 },
        { day: 'Tue', amount: 128 },
        { day: 'Wed', amount: 155 },
        { day: 'Thu', amount: 134 },
        { day: 'Fri', amount: 161 },
        { day: 'Sat', amount: 148 },
        { day: 'Sun', amount: 115 },
      ],
      monthlyTrend: [
        { month: 'Jan', amount: 3850 },
        { month: 'Feb', amount: 3620 },
        { month: 'Mar', amount: 4240 },
        { month: 'Apr', amount: 3890 },
        { month: 'May', amount: 4320 },
        { month: 'Jun', amount: 4050 },
        { month: 'Jul', amount: 4100 }, // Current month
      ],
      collectionRecords: [
        // Recent collections (July 19-20, 2025)
        { date: '2025-07-20T14:20:00Z', amount: 38, binId: 'OR-KA01', truckId: 'TRUCK002' },
        { date: '2025-07-20T09:30:00Z', amount: 35, binId: 'OR-KA02', truckId: 'TRUCK002' },
        { date: '2025-07-20T11:20:00Z', amount: 22, binId: 'OR-KA03', truckId: 'TRUCK002' },
        { date: '2025-07-20T14:45:00Z', amount: 26, binId: 'OR-KA04', truckId: 'TRUCK002' },
        { date: '2025-07-20T15:15:00Z', amount: 25, binId: 'OR-KF01', truckId: 'TRUCK002' },
        { date: '2025-07-20T08:00:00Z', amount: 33, binId: 'OR-KF02', truckId: 'TRUCK002' },
        { date: '2025-07-20T12:20:00Z', amount: 28, binId: 'OR-KF03', truckId: 'TRUCK002' },
        { date: '2025-07-20T16:45:00Z', amount: 41, binId: 'OR-KF04', truckId: 'TRUCK002' },

        // July 19 collections
        { date: '2025-07-19T14:20:00Z', amount: 42, binId: 'OR-KA01', truckId: 'TRUCK002' },
        { date: '2025-07-19T13:15:00Z', amount: 37, binId: 'OR-KA02', truckId: 'TRUCK002' },
        { date: '2025-07-19T14:45:00Z', amount: 25, binId: 'OR-KA03', truckId: 'TRUCK002' },
        { date: '2025-07-19T10:30:00Z', amount: 29, binId: 'OR-KA04', truckId: 'TRUCK002' },
        { date: '2025-07-19T11:30:00Z', amount: 27, binId: 'OR-KF01', truckId: 'TRUCK002' },
        { date: '2025-07-19T12:45:00Z', amount: 35, binId: 'OR-KF02', truckId: 'TRUCK002' },
        { date: '2025-07-19T08:45:00Z', amount: 30, binId: 'OR-KF03', truckId: 'TRUCK002' },
        { date: '2025-07-19T12:30:00Z', amount: 43, binId: 'OR-KF04', truckId: 'TRUCK002' },

        // July 18 collections
        { date: '2025-07-18T11:45:00Z', amount: 39, binId: 'OR-KA01', truckId: 'TRUCK002' },
        { date: '2025-07-18T10:45:00Z', amount: 33, binId: 'OR-KA02', truckId: 'TRUCK002' },
        { date: '2025-07-18T09:30:00Z', amount: 21, binId: 'OR-KA03', truckId: 'TRUCK002' },
        { date: '2025-07-18T15:15:00Z', amount: 27, binId: 'OR-KA04', truckId: 'TRUCK002' },
        { date: '2025-07-18T14:45:00Z', amount: 24, binId: 'OR-KF01', truckId: 'TRUCK002' },
        { date: '2025-07-18T16:30:00Z', amount: 32, binId: 'OR-KF02', truckId: 'TRUCK002' },
        { date: '2025-07-18T13:30:00Z', amount: 27, binId: 'OR-KF03', truckId: 'TRUCK002' },
        { date: '2025-07-18T14:15:00Z', amount: 40, binId: 'OR-KF04', truckId: 'TRUCK002' },

        // July 17 collections
        { date: '2025-07-17T16:30:00Z', amount: 41, binId: 'OR-KA01', truckId: 'TRUCK002' },
        { date: '2025-07-17T15:20:00Z', amount: 36, binId: 'OR-KA02', truckId: 'TRUCK002' },
        { date: '2025-07-17T16:15:00Z', amount: 24, binId: 'OR-KA03', truckId: 'TRUCK002' },
        { date: '2025-07-17T11:45:00Z', amount: 28, binId: 'OR-KA04', truckId: 'TRUCK002' },
        { date: '2025-07-17T09:20:00Z', amount: 26, binId: 'OR-KF01', truckId: 'TRUCK002' },
        { date: '2025-07-17T10:15:00Z', amount: 34, binId: 'OR-KF02', truckId: 'TRUCK002' },
        { date: '2025-07-17T17:15:00Z', amount: 29, binId: 'OR-KF03', truckId: 'TRUCK002' },
        { date: '2025-07-17T09:45:00Z', amount: 42, binId: 'OR-KF04', truckId: 'TRUCK002' },
      ],
      peakHours: [
        { hour: '12:00', volume: 32.1 },
        { hour: '15:00', volume: 35.4 },
        { hour: '10:00', volume: 28.7 },
        { hour: '14:00', volume: 30.2 },
      ],
      efficiency: {
        collectionRate: 91.8, // Percentage of scheduled collections completed
        avgCollectionTime: 12.3, // Minutes per bin (longer due to grinder operations)
        equipmentUtilization: 82.1, // Truck utilization percentage
        costPerKg: 1.15, // SAR per kg (higher due to grinder maintenance)
      },
      environmentalImpact: {
        carbonSaved: 1845.0, // kg CO2 equivalent saved this month
        energyRecovered: 820.0, // kWh equivalent from biogas
        landfillDiverted: 4100, // kg diverted from landfill
        recyclingRate: 85.6, // Percentage successfully processed
      },
    },
  ];

  // Getter methods
  getWasteTypes(): WasteType[] {
    return this.wasteTypes;
  }

  getWasteTypeById(type: string): WasteType | undefined {
    return this.wasteTypes.find(wasteType => wasteType.type.toLowerCase() === type.toLowerCase());
  }

  // Method to update collection records
  updateCollectionRecords(truckAssignments: Map<string, string[]>): void {
    this.wasteTypes.forEach(wasteType => {
      if (wasteType.collectionRecords) {
        wasteType.collectionRecords = wasteType.collectionRecords.map(record => {
          // Find the truck that should have collected this bin based on assignments
          for (const [truckId, binIds] of truckAssignments) {
            if (binIds.includes(record.binId)) {
              record.truckId = truckId;
              break;
            }
          }
          return record;
        });
      }
    });
  }

  // Method to add new collection record when bins are collected
  addCollectionRecord(wasteType: string, binId: string, truckId: string, amount: number): void {
    const wasteTypeIndex = this.wasteTypes.findIndex(wt => wt.type.toLowerCase() === wasteType.toLowerCase());
    
    if (wasteTypeIndex >= 0) {
      const wasteTypeData = { ...this.wasteTypes[wasteTypeIndex] };
      
      const newRecord = {
        date: new Date().toISOString(),
        amount,
        binId,
        truckId
      };

      // Initialize collectionRecords if it doesn't exist
      if (!wasteTypeData.collectionRecords) {
        wasteTypeData.collectionRecords = [];
      }

      wasteTypeData.collectionRecords = [...wasteTypeData.collectionRecords, newRecord];
      
      // Keep only last 50 records to prevent memory bloat
      if (wasteTypeData.collectionRecords.length > 50) {
        wasteTypeData.collectionRecords = wasteTypeData.collectionRecords.slice(-50);
      }

      // Update totals
      wasteTypeData.amount += amount;
      wasteTypeData.dailyAverage = wasteTypeData.amount / 30; // Assuming 30-day month

      // Update current month in monthly trend to reflect new total
      if (wasteTypeData.monthlyTrend) {
        wasteTypeData.monthlyTrend = wasteTypeData.monthlyTrend.map(trend => 
          trend.month === 'Jul' 
            ? { ...trend, amount: wasteTypeData.amount }
            : trend
        );
      }

      // Update environmental impact - landfill diverted should match collected amount
      if (wasteTypeData.environmentalImpact) {
        const growthFactor = wasteTypeData.amount / (wasteTypeData.amount - amount);
        wasteTypeData.environmentalImpact = {
          ...wasteTypeData.environmentalImpact,
          landfillDiverted: wasteTypeData.amount,
          carbonSaved: wasteTypeData.environmentalImpact.carbonSaved * growthFactor,
          energyRecovered: wasteTypeData.environmentalImpact.energyRecovered * growthFactor
        };
      }
      this.wasteTypes[wasteTypeIndex] = wasteTypeData;
      this.recalculatePercentages();
    } else {
      console.error(`❌ Waste type '${wasteType}' not found`);
    }
  }

  // Method to get collection statistics for a specific period
  getCollectionStats(wasteType: string, days: number = 7): {
    totalCollected: number;
    averagePerDay: number;
    collectionsCount: number;
    topPerformingBins: Array<{ binId: string; amount: number; collections: number }>;
    topPerformingTrucks: Array<{ truckId: string; amount: number; collections: number }>;
  } {
    const wasteTypeData = this.getWasteTypeById(wasteType);
    if (!wasteTypeData || !wasteTypeData.collectionRecords) {
      return {
        totalCollected: 0,
        averagePerDay: 0,
        collectionsCount: 0,
        topPerformingBins: [],
        topPerformingTrucks: []
      };
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const recentRecords = wasteTypeData.collectionRecords.filter(
      record => new Date(record.date) >= cutoffDate
    );

    const totalCollected = recentRecords.reduce((sum, record) => sum + record.amount, 0);
    const collectionsCount = recentRecords.length;
    const averagePerDay = totalCollected / days;

    // Calculate bin performance
    const binStats = new Map<string, { amount: number; collections: number }>();
    const truckStats = new Map<string, { amount: number; collections: number }>();

    recentRecords.forEach(record => {
      // Bin stats
      const binStat = binStats.get(record.binId) || { amount: 0, collections: 0 };
      binStat.amount += record.amount;
      binStat.collections += 1;
      binStats.set(record.binId, binStat);

      // Truck stats
      const truckStat = truckStats.get(record.truckId) || { amount: 0, collections: 0 };
      truckStat.amount += record.amount;
      truckStat.collections += 1;
      truckStats.set(record.truckId, truckStat);
    });

    const topPerformingBins = Array.from(binStats.entries())
      .map(([binId, stats]) => ({ binId, ...stats }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    const topPerformingTrucks = Array.from(truckStats.entries())
      .map(([truckId, stats]) => ({ truckId, ...stats }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    return {
      totalCollected,
      averagePerDay,
      collectionsCount,
      topPerformingBins,
      topPerformingTrucks
    };
  }

  // Method to recalculate percentages when amounts change
  private recalculatePercentages(): void {
    const totalAmount = this.wasteTypes.reduce((sum, wt) => sum + wt.amount, 0);
    this.wasteTypes.forEach(wasteType => {
      wasteType.percentage = totalAmount > 0 ? 
        Math.round((wasteType.amount / totalAmount) * 100 * 10) / 10 : 0;
    });
  }

  // Method to get efficiency comparison between waste types
  getEfficiencyComparison(): {
    mostEfficient: string;
    leastEfficient: string;
    avgCollectionRate: number;
    avgCostPerKg: number;
    comparisonData: Array<{
      type: string;
      collectionRate: number;
      costPerKg: number;
      utilizationRate: number;
      environmentalScore: number; // Composite score
    }>;
  } {
    const comparisonData = this.wasteTypes.map(wt => {
      const environmentalScore = (
        (wt.environmentalImpact?.recyclingRate || 0) * 0.4 +
        (wt.efficiency?.collectionRate || 0) * 0.3 +
        (wt.efficiency?.equipmentUtilization || 0) * 0.3
      );

      return {
        type: wt.type,
        collectionRate: wt.efficiency?.collectionRate || 0,
        costPerKg: wt.efficiency?.costPerKg || 0,
        utilizationRate: wt.efficiency?.equipmentUtilization || 0,
        environmentalScore
      };
    });

    const sortedByEfficiency = [...comparisonData].sort((a, b) => 
      (b.collectionRate + b.utilizationRate - b.costPerKg) - 
      (a.collectionRate + a.utilizationRate - a.costPerKg)
    );

    const avgCollectionRate = comparisonData.reduce((sum, data) => 
      sum + data.collectionRate, 0) / comparisonData.length;
    
    const avgCostPerKg = comparisonData.reduce((sum, data) => 
      sum + data.costPerKg, 0) / comparisonData.length;

    return {
      mostEfficient: sortedByEfficiency[0]?.type || '',
      leastEfficient: sortedByEfficiency[sortedByEfficiency.length - 1]?.type || '',
      avgCollectionRate,
      avgCostPerKg,
      comparisonData
    };
  }

  // Method to get environmental impact summary
  getEnvironmentalImpactSummary(): {
    totalCarbonSaved: number;
    totalEnergyRecovered: number;
    totalLandfillDiverted: number;
    avgRecyclingRate: number;
    impactByType: Array<{
      type: string;
      carbonSaved: number;
      energyRecovered: number;
      recyclingRate: number;
    }>;
  } {
    const totalCarbonSaved = this.wasteTypes.reduce((sum, wt) => 
      sum + (wt.environmentalImpact?.carbonSaved || 0), 0);
    
    const totalEnergyRecovered = this.wasteTypes.reduce((sum, wt) => 
      sum + (wt.environmentalImpact?.energyRecovered || 0), 0);
    
    const totalLandfillDiverted = this.wasteTypes.reduce((sum, wt) => 
      sum + (wt.environmentalImpact?.landfillDiverted || 0), 0);
    
    const avgRecyclingRate = this.wasteTypes.reduce((sum, wt) => 
      sum + (wt.environmentalImpact?.recyclingRate || 0), 0) / this.wasteTypes.length;

    const impactByType = this.wasteTypes.map(wt => ({
      type: wt.type,
      carbonSaved: wt.environmentalImpact?.carbonSaved || 0,
      energyRecovered: wt.environmentalImpact?.energyRecovered || 0,
      recyclingRate: wt.environmentalImpact?.recyclingRate || 0
    }));

    return {
      totalCarbonSaved,
      totalEnergyRecovered,
      totalLandfillDiverted,
      avgRecyclingRate,
      impactByType
    };
  }
}