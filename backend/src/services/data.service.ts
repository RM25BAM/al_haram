import { WasteTypesService } from './waste-types.service.js';
import { WasteBinsService } from './waste-bins.service.js';
import { TrucksService } from './trucks.service.js';
import { LocationsService } from './locations.service.js';
import { TreatmentMethodsService } from './treatment-methods.service.js';
import { CampaignsService } from './campaigns.service.js';
import { WasteBin, Truck, WasteType, Location, TreatmentMethod, Campaign } from '../types/index.js';
import { SimulationService } from './simulation.service.js';

/**
 * Main data service that coordinates all specialized services
 * This service acts as a facade pattern to provide unified access to all data services
 */
export class DataService {
  private wasteTypesService: WasteTypesService;
  private wasteBinsService: WasteBinsService;
  private trucksService: TrucksService;
  private locationsService: LocationsService;
  private treatmentMethodsService: TreatmentMethodsService;
  private campaignsService: CampaignsService;
  private simulationService: SimulationService;

  constructor() {
    this.wasteTypesService = new WasteTypesService();
    this.wasteBinsService = new WasteBinsService(this.wasteTypesService); // Pass shared instance
    this.trucksService = new TrucksService();
    this.locationsService = new LocationsService();
    this.treatmentMethodsService = new TreatmentMethodsService();
    this.campaignsService = new CampaignsService();
    this.simulationService = new SimulationService(
      this.wasteBinsService,
      this.trucksService,
      this.wasteTypesService,
      this.campaignsService
    );

    // Initialize the system with proper validations
    this.initializeDataService();
  }

  // Waste Types methods
  getWasteTypes(): WasteType[] {
    return this.wasteTypesService.getWasteTypes();
  }

  getWasteTypeById(type: string): WasteType | undefined {
    return this.wasteTypesService.getWasteTypeById(type);
  }

  // Waste Bins methods
  getWasteBins(): WasteBin[] {
    return this.wasteBinsService.getWasteBins();
  }

  getWasteBinById(id: string): WasteBin | undefined {
    return this.wasteBinsService.getWasteBinById(id);
  }

  getWasteBinsByType(wasteType: string): WasteBin[] {
    return this.wasteBinsService.getWasteBinsByType(wasteType);
  }

  getWasteBinsByStatus(status: string): WasteBin[] {
    return this.wasteBinsService.getWasteBinsByStatus(status);
  }

  // Trucks methods
  getTrucks(): Truck[] {
    return this.trucksService.getTrucks();
  }

  getTruckById(id: string): Truck | undefined {
    return this.trucksService.getTruckById(id);
  }

  getTrucksByStatus(status: string): Truck[] {
    return this.trucksService.getTrucksByStatus(status);
  }

  getTrucksByWasteType(wasteType: string): Truck[] {
    return this.trucksService.getTrucksByWasteType(wasteType);
  }

  getSpecializedTrucks(wasteType: string): Truck[] {
    return this.trucksService.getSpecializedTrucks(wasteType);
  }

  getAssignedBinsForTruck(truckId: string): WasteBin[] {
    return this.trucksService.getAssignedBinsForTruck(truckId, this.getWasteBins());
  }

  getTruckAssignmentSummary() {
    return this.trucksService.getTruckAssignmentSummary();
  }

  // Locations methods
  getLocations(): Location[] {
    return this.locationsService.getLocations();
  }

  getLocationById(id: string): Location | undefined {
    return this.locationsService.getLocationById(id);
  }

  getLocationsByType(type: string): Location[] {
    return this.locationsService.getLocationsByType(type);
  }

  getLocationsByAccessibilityLevel(level: string): Location[] {
    return this.locationsService.getLocationsByAccessibilityLevel(level);
  }

  getLocationsByStatus(status: string): Location[] {
    return this.locationsService.getLocationsByStatus(status);
  }

  // Treatment Methods methods
  getTreatmentMethods(): TreatmentMethod[] {
    return this.treatmentMethodsService.getTreatmentMethods();
  }

  getTreatmentMethodsByType(wasteType: string): TreatmentMethod[] {
    return this.treatmentMethodsService.getTreatmentMethodsByType(wasteType);
  }

  getTreatmentMethodById(id: string): TreatmentMethod | undefined {
    return this.treatmentMethodsService.getTreatmentMethodById(id);
  }

  getMostEfficientTreatmentMethod(wasteType: string): TreatmentMethod | undefined {
    return this.treatmentMethodsService.getMostEfficientTreatmentMethod(wasteType);
  }

  getMostProfitableTreatmentMethod(wasteType: string): TreatmentMethod | undefined {
    return this.treatmentMethodsService.getMostProfitableTreatmentMethod(wasteType);
  }

  getMostEcoFriendlyTreatmentMethod(wasteType: string): TreatmentMethod | undefined {
    return this.treatmentMethodsService.getMostEcoFriendlyTreatmentMethod(wasteType);
  }

  calculateTreatmentImpact(treatmentMethodId: string, wasteAmount: number) {
    return this.treatmentMethodsService.calculateTreatmentImpact(treatmentMethodId, wasteAmount);
  }

  getTreatmentRecommendations(wasteType: string) {
    return this.treatmentMethodsService.getTreatmentRecommendations(wasteType);
  }

  simulateTreatmentPerformance(treatmentMethodId: string, days: number = 30) {
    return this.treatmentMethodsService.simulateTreatmentPerformance(treatmentMethodId, days);
  }

  // Campaigns methods
  getCampaigns(): Campaign[] {
    return this.campaignsService.getCampaigns();
  }

  getCampaignById(id: string): Campaign | undefined {
    return this.campaignsService.getCampaignById(id);
  }

  getCampaignsByPlatform(platform: string): Campaign[] {
    return this.campaignsService.getCampaignsByPlatform(platform);
  }

  getCampaignsByStatus(status: string): Campaign[] {
    return this.campaignsService.getCampaignsByStatus(status);
  }

  getCampaignsByRegion(region: string): Campaign[] {
    return this.campaignsService.getCampaignsByRegion(region);
  }

  getCampaignAnalytics() {
    return this.campaignsService.getCampaignAnalytics();
  }

  getCampaignsSorted(sortField?: keyof Campaign, sortDirection?: 'asc' | 'desc') {
    return this.campaignsService.getCampaignsSorted(sortField, sortDirection);
  }

  updateCampaignMetrics(): void {
    this.campaignsService.updateCampaignMetrics();
  }

  // Simulation methods
  simulateCollectionCycle(): void {
    this.simulationService.simulateCollectionCycle();
  }

  updateBinFillLevels(): void {
    this.simulationService.updateBinFillLevels();
  }

  updateTruckPositions(): void {
    this.simulationService.updateTruckPositions();
  }

  reassignBinsToTrucks(): void {
    this.simulationService.reassignBinsToTrucks();
  }

  validateTruckAssignments(): { valid: boolean; errors: string[] } {
    return this.simulationService.validateTruckAssignments();
  }

  getSystemHealthOverview() {
    return this.simulationService.getSystemHealthOverview();
  }

  simulateCarbonFilterStatus() {
    return this.simulationService.simulateCarbonFilterStatus();
  }

  // Initialization and coordination methods
  private initializeDataService(): void {
    // Validate truck assignments
    const validation = this.validateTruckAssignments();
    if (!validation.valid) {
      console.warn('Truck assignment validation failed:', validation.errors);
      this.reassignBinsToTrucks();
      console.log('Bins reassigned to trucks based on waste type compatibility');
    }

    // Update collection records to match current truck assignments
    this.updateCollectionRecords();
  }

  private updateCollectionRecords(): void {
    // Get current truck assignments
    const truckAssignments = new Map<string, string[]>();
    this.getTrucks().forEach(truck => {
      truckAssignments.set(truck.id, truck.assignedBins);
    });

    // Update waste types collection records
    this.wasteTypesService.updateCollectionRecords(truckAssignments);
  }
}
