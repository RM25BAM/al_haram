import { WasteBinsService } from './waste-bins.service.js';
import { TrucksService } from './trucks.service.js';
import { WasteTypesService } from './waste-types.service.js';
import { CampaignsService } from './campaigns.service.js';

/**
 * Service for coordinating simulations and operations across all data services
 */
export class SimulationService {
  private wasteBinsService: WasteBinsService;
  private trucksService: TrucksService;
  private wasteTypesService: WasteTypesService;
  private campaignsService: CampaignsService;

  constructor(
    wasteBinsService: WasteBinsService,
    trucksService: TrucksService,
    wasteTypesService: WasteTypesService,
    campaignsService?: CampaignsService
  ) {
    this.wasteBinsService = wasteBinsService;
    this.trucksService = trucksService;
    this.wasteTypesService = wasteTypesService;
    this.campaignsService = campaignsService || new CampaignsService();
  }

  // Method to simulate a complete collection cycle
  simulateCollectionCycle(): void {
    // 1. Update bin fill levels
    this.updateBinFillLevels();
    
    // 2. Reassign bins to trucks if needed
    this.reassignBinsToTrucks();
    
    // 3. Update truck positions
    this.updateTruckPositions();
    
    // 4. Update collection records
    this.updateCollectionRecords();

    // 5. Update campaign metrics
    this.updateCampaignMetrics();
  }

  // Update bin fill levels using the WasteBinsService
  updateBinFillLevels(): void {
    this.wasteBinsService.updateBinFillLevels();
  }

  // Update truck positions using the TrucksService
  updateTruckPositions(): void {
    const wasteBins = this.wasteBinsService.getWasteBins();
    this.trucksService.updateTruckPositions(wasteBins);
  }

  // Reassign bins to trucks using the TrucksService
  reassignBinsToTrucks(): void {
    const wasteBins = this.wasteBinsService.getWasteBins();
    this.trucksService.reassignBinsToTrucks(wasteBins);
  }

  // Validate truck assignments using the TrucksService
  validateTruckAssignments(): { valid: boolean; errors: string[] } {
    const wasteBins = this.wasteBinsService.getWasteBins();
    return this.trucksService.validateTruckAssignments(wasteBins);
  }

  // Update collection records to match current truck assignments
  private updateCollectionRecords(): void {
    // Get current truck assignments
    const trucks = this.trucksService.getTrucks();
    const truckAssignments = new Map<string, string[]>();
    
    trucks.forEach(truck => {
      truckAssignments.set(truck.id, truck.assignedBins);
    });

    // Update waste types collection records
    this.wasteTypesService.updateCollectionRecords(truckAssignments);
  }

  // Update campaign metrics
  updateCampaignMetrics(): void {
    this.campaignsService.updateCampaignMetrics();
  }

  // Method to get system health overview
  getSystemHealthOverview(): {
    totalBins: number;
    criticalBins: number;
    needsCollectionBins: number;
    activeTrucks: number;
    systemEfficiency: number;
    lastSimulation: string;
  } {
    const wasteBins = this.wasteBinsService.getWasteBins();
    const trucks = this.trucksService.getTrucks();

    const criticalBins = wasteBins.filter(bin => bin.status === 'critical').length;
    const needsCollectionBins = wasteBins.filter(bin => bin.status === 'needs_collection').length;
    const activeTrucks = trucks.filter(truck => truck.status !== 'available').length;
    
    // Calculate system efficiency based on bin status distribution
    const normalBins = wasteBins.filter(bin => bin.status === 'normal').length;
    const systemEfficiency = Math.round((normalBins / wasteBins.length) * 100);

    return {
      totalBins: wasteBins.length,
      criticalBins,
      needsCollectionBins,
      activeTrucks,
      systemEfficiency,
      lastSimulation: new Date().toISOString(),
    };
  }

  // Method to simulate carbon filter status with realistic countdown logic
  simulateCarbonFilterStatus(): {
    daysRemaining: number;
    hoursRemaining: number;
    minutesRemaining: number;
    totalMinutesRemaining: number;
    isExpired: boolean;
    isNearExpiry: boolean;
    isCritical: boolean;
    lastUpdated: Date;
    formattedTimeRemaining: string;
  } {
    // Filter starts with 2 days (48 hours = 2880 minutes) and counts down minute by minute
    const filterLifespanMinutes = 2 * 24 * 60; // 2 days in minutes
    const filterInstallDate = new Date('2025-07-15T00:00:00'); // Starting date
    const now = new Date();

    const minutesSinceInstall = Math.floor(
      (now.getTime() - filterInstallDate.getTime()) / (1000 * 60)
    );

    // Calculate remaining minutes in current cycle
    const cyclePosition = minutesSinceInstall % filterLifespanMinutes;
    let totalMinutesRemaining = filterLifespanMinutes - cyclePosition;

    // Handle reset: when filter expires (reaches 0), reset to full 2 days
    if (totalMinutesRemaining === 0) {
      totalMinutesRemaining = filterLifespanMinutes; // Reset to 2 days (2880 minutes)
    }

    // Convert to days, hours, minutes
    const daysRemaining = Math.floor(totalMinutesRemaining / (24 * 60));
    const hoursRemaining = Math.floor((totalMinutesRemaining % (24 * 60)) / 60);
    const minutesRemaining = totalMinutesRemaining % 60;

    // Adjust display: if we have less than 24 hours but more than 0, show as 1 day
    let displayDays = daysRemaining;
    let displayHours = hoursRemaining;

    if (daysRemaining === 0 && (hoursRemaining > 0 || minutesRemaining > 0)) {
      displayDays = 1;
      displayHours = hoursRemaining;
    }

    // Format the time remaining
    const formattedTimeRemaining = `${displayDays}d ${displayHours}h ${minutesRemaining}m`;

    const isExpired = totalMinutesRemaining <= 0;
    const isCritical = totalMinutesRemaining <= 6 * 60 && totalMinutesRemaining > 0; // 6 hours
    const isNearExpiry = totalMinutesRemaining <= 24 * 60 && totalMinutesRemaining > 6 * 60; // 24 hours

    return {
      daysRemaining: displayDays,
      hoursRemaining: displayHours,
      minutesRemaining,
      totalMinutesRemaining,
      isExpired,
      isNearExpiry,
      isCritical,
      lastUpdated: now,
      formattedTimeRemaining,
    };
  }
}