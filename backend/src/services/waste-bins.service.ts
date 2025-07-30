import { WasteBin } from '../types/index.js';
import { WasteTypesService } from './waste-types.service.js';

/**
 * Service for managing waste bins data
 */
export class WasteBinsService {
  private wasteTypesService: WasteTypesService;

  constructor(wasteTypesService?: WasteTypesService) {
    this.wasteTypesService = wasteTypesService || new WasteTypesService();
  }

  private wasteBins: WasteBin[] = [
    // 🔵 Plastic Bins in Abbasid Riwaq:
    {
      id: 'PL-A01',
      location: 'NW-G-AbbasidCol01',
      fillLevel: 72,
      weight: 36, // kg - calculated from fillLevel * capacity (50kg) / 100
      wasteType: 'Plastic',
      lastCollection: '2025-07-18T10:30:00Z',
      status: 'normal',
      coordinates: { lat: 21.4231, lng: 39.8265 },
      averageFillRate: 18,
      healthStatus: 'good',
      lastMaintenance: '2025-07-15T09:00:00Z',
      grinderStatus: 'not_applicable',
      timeToFill: '4.7 days',
      note: 'Northwest corner of Abbasid Riwaq - High pilgrim traffic area',
      collectionHistory: [
        { date: '2025-07-18T10:30:00Z', amount: 45, truckId: 'TRUCK001', wasteType: 'Plastic' },
        { date: '2025-07-17T14:20:00Z', amount: 42, truckId: 'TRUCK001', wasteType: 'Plastic' },
        { date: '2025-07-16T09:15:00Z', amount: 38, truckId: 'TRUCK003', wasteType: 'Plastic' },
        { date: '2025-07-15T16:45:00Z', amount: 47, truckId: 'TRUCK001', wasteType: 'Plastic' },
        { date: '2025-07-14T11:30:00Z', amount: 41, truckId: 'TRUCK001', wasteType: 'Plastic' },
      ],
    },
    {
      id: 'PL-A02',
      location: 'SW-G-AbbasidCol02',
      fillLevel: 45,
      weight: 22.5, // kg - calculated from fillLevel * capacity (50kg) / 100
      wasteType: 'Plastic',
      lastCollection: '2025-07-19T08:15:00Z',
      status: 'normal',
      coordinates: { lat: 21.4228, lng: 39.8255 },
      averageFillRate: 12,
      healthStatus: 'good',
      lastMaintenance: '2025-07-17T10:00:00Z',
      grinderStatus: 'not_applicable',
      timeToFill: '3.8 days',
      note: 'Southwest corner of Abbasid Riwaq - Moderate traffic, excellent accessibility',
      collectionHistory: [
        { date: '2025-07-19T08:15:00Z', amount: 32, truckId: 'TRUCK003', wasteType: 'Plastic' },
        { date: '2025-07-18T13:30:00Z', amount: 29, truckId: 'TRUCK001', wasteType: 'Plastic' },
        { date: '2025-07-17T10:45:00Z', amount: 34, truckId: 'TRUCK003', wasteType: 'Plastic' },
        { date: '2025-07-16T15:20:00Z', amount: 31, truckId: 'TRUCK003', wasteType: 'Plastic' },
        { date: '2025-07-15T07:30:00Z', amount: 28, truckId: 'TRUCK001', wasteType: 'Plastic' },
      ],
    },
    {
      id: 'PL-A03',
      location: 'SE-G-AbbasidCol03',
      fillLevel: 68,
      weight: 34, // kg - calculated from fillLevel * capacity (50kg) / 100
      wasteType: 'Plastic',
      lastCollection: '2025-07-19T13:20:00Z',
      status: 'normal',
      coordinates: { lat: 21.4219, lng: 39.8264 },
      averageFillRate: 7,
      healthStatus: 'good',
      lastMaintenance: '2025-07-10T15:00:00Z',
      grinderStatus: 'not_applicable',
      timeToFill: '5.5 days',
      note: 'Southeast corner of Abbasid Riwaq - Lower traffic, requires maintenance attention',
      collectionHistory: [
        { date: '2025-07-19T13:20:00Z', amount: 18, truckId: 'TRUCK003', wasteType: 'Plastic' },
        { date: '2025-07-18T16:10:00Z', amount: 21, truckId: 'TRUCK002', wasteType: 'Plastic' },
        { date: '2025-07-17T08:45:00Z', amount: 16, truckId: 'TRUCK001', wasteType: 'Plastic' },
        { date: '2025-07-16T12:30:00Z', amount: 19, truckId: 'TRUCK003', wasteType: 'Plastic' },
        { date: '2025-07-15T14:15:00Z', amount: 22, truckId: 'TRUCK002', wasteType: 'Plastic' },
      ],
    },
    {
      id: 'PL-A04',
      location: 'NE-G-AbbasidCol04',
      fillLevel: 91,
      weight: 45.5, // kg - calculated from fillLevel * capacity (50kg) / 100
      wasteType: 'Plastic',
      lastCollection: '2025-07-17T12:30:00Z',
      status: 'critical',
      coordinates: { lat: 21.4222, lng: 39.8256 },
      averageFillRate: 20,
      healthStatus: 'good',
      lastMaintenance: '2025-07-15T08:00:00Z',
      grinderStatus: 'not_applicable',
      timeToFill: '3.9 days',
      note: 'Northeast corner of Abbasid Riwaq - URGENT: High fill rate, needs immediate collection',
      collectionHistory: [
        { date: '2025-07-17T12:30:00Z', amount: 44, truckId: 'TRUCK001', wasteType: 'Plastic' },
        { date: '2025-07-16T09:20:00Z', amount: 48, truckId: 'TRUCK002', wasteType: 'Plastic' },
        { date: '2025-07-15T14:15:00Z', amount: 46, truckId: 'TRUCK001', wasteType: 'Plastic' },
        { date: '2025-07-14T11:45:00Z', amount: 43, truckId: 'TRUCK003', wasteType: 'Plastic' },
        { date: '2025-07-13T16:30:00Z', amount: 49, truckId: 'TRUCK001', wasteType: 'Plastic' },
      ],
    },
    // 🟢 Plastic Bins in Al-Masaa (corridor from Safa to Marwa):
    {
      id: 'PL-M01',
      location: 'E-G-MasaaStartNearSafa',
      fillLevel: 23,
      weight: 11.5, // kg - calculated from fillLevel * capacity (50kg) / 100
      wasteType: 'Plastic',
      lastCollection: '2025-07-19T16:45:00Z',
      status: 'normal',
      coordinates: { lat: 21.4233, lng: 39.8272 },
      averageFillRate: 8,
      healthStatus: 'good',
      lastMaintenance: '2025-07-18T15:00:00Z',
      grinderStatus: 'not_applicable',
      timeToFill: '5.2 days',
      note: 'Beginning of Mas\'aa – near Safa - Strategic location for Sa\'i ritual start',
      collectionHistory: [
        { date: '2025-07-19T16:45:00Z', amount: 15, truckId: 'TRUCK001', wasteType: 'Plastic' },
        { date: '2025-07-18T11:30:00Z', amount: 17, truckId: 'TRUCK002', wasteType: 'Plastic' },
        { date: '2025-07-17T14:20:00Z', amount: 14, truckId: 'TRUCK001', wasteType: 'Plastic' },
        { date: '2025-07-16T09:15:00Z', amount: 16, truckId: 'TRUCK003', wasteType: 'Plastic' },
        { date: '2025-07-15T13:45:00Z', amount: 18, truckId: 'TRUCK002', wasteType: 'Plastic' },
      ],
    },
    {
      id: 'PL-M02L',
      location: 'E-G-MasaaMidpointLeft',
      fillLevel: 41,
      weight: 20.5, // kg - calculated from fillLevel * capacity (50kg) / 100
      wasteType: 'Plastic',
      lastCollection: '2025-07-19T09:45:00Z',
      status: 'normal',
      coordinates: { lat: 21.4234, lng: 39.8274 },
      averageFillRate: 8,
      healthStatus: 'good',
      lastMaintenance: '2025-07-16T13:00:00Z',
      grinderStatus: 'not_applicable',
      timeToFill: '6.2 days',
      note: 'Left side of Mas\'aa (middle point) - Wheelchair accessible zone',
      collectionHistory: [
        { date: '2025-07-19T09:45:00Z', amount: 17, truckId: 'TRUCK002', wasteType: 'Plastic' },
        { date: '2025-07-18T15:20:00Z', amount: 19, truckId: 'TRUCK001', wasteType: 'Plastic' },
        { date: '2025-07-17T10:30:00Z', amount: 16, truckId: 'TRUCK002', wasteType: 'Plastic' },
        { date: '2025-07-16T14:45:00Z', amount: 18, truckId: 'TRUCK003', wasteType: 'Plastic' },
        { date: '2025-07-15T08:15:00Z', amount: 15, truckId: 'TRUCK001', wasteType: 'Plastic' },
      ],
    },
    {
      id: 'PL-M02R',
      location: 'E-G-MasaaMidpointRight',
      fillLevel: 34,
      weight: 17, // kg - calculated from fillLevel * capacity (50kg) / 100
      wasteType: 'Plastic',
      lastCollection: '2025-07-19T11:15:00Z',
      status: 'normal',
      coordinates: { lat: 21.4240, lng: 39.8271 },
      averageFillRate: 9,
      healthStatus: 'good',
      lastMaintenance: '2025-07-17T08:45:00Z',
      grinderStatus: 'not_applicable',
      timeToFill: '5.8 days',
      note: 'Right side of Mas\'aa (middle point) - High visibility area',
      collectionHistory: [
        { date: '2025-07-19T11:15:00Z', amount: 19, truckId: 'TRUCK002', wasteType: 'Plastic' },
        { date: '2025-07-18T14:30:00Z', amount: 21, truckId: 'TRUCK003', wasteType: 'Plastic' },
        { date: '2025-07-17T09:20:00Z', amount: 18, truckId: 'TRUCK001', wasteType: 'Plastic' },
        { date: '2025-07-16T16:15:00Z', amount: 20, truckId: 'TRUCK002', wasteType: 'Plastic' },
        { date: '2025-07-15T11:45:00Z', amount: 17, truckId: 'TRUCK003', wasteType: 'Plastic' },
      ],
    },
    {
      id: 'PL-M03',
      location: 'E-G-MasaaEndNearMarwa',
      fillLevel: 58,
      weight: 29, // kg - calculated from fillLevel * capacity (50kg) / 100
      wasteType: 'Plastic',
      lastCollection: '2025-07-19T14:30:00Z',
      status: 'normal',
      coordinates: { lat: 21.4223, lng: 39.8273 },
      averageFillRate: 12,
      healthStatus: 'good',
      lastMaintenance: '2025-07-16T11:20:00Z',
      grinderStatus: 'not_applicable',
      timeToFill: '4.9 days',
      note: 'End of Mas\'aa – near Marwa - Completion point for Sa\'i ritual',
      collectionHistory: [
        { date: '2025-07-19T14:30:00Z', amount: 21, truckId: 'TRUCK001', wasteType: 'Plastic' },
        { date: '2025-07-18T10:45:00Z', amount: 24, truckId: 'TRUCK002', wasteType: 'Plastic' },
        { date: '2025-07-17T15:20:00Z', amount: 22, truckId: 'TRUCK001', wasteType: 'Plastic' },
        { date: '2025-07-16T08:30:00Z', amount: 23, truckId: 'TRUCK003', wasteType: 'Plastic' },
        { date: '2025-07-15T12:15:00Z', amount: 20, truckId: 'TRUCK002', wasteType: 'Plastic' },
      ],
    },
    // 🔵 Organic Waste Bins – King Abdullah Expansion:
    {
      id: 'OR-KA01',
      location: 'SW-G-KingAbdullahZone01',
      fillLevel: 92,
      weight: 46, // kg - calculated from fillLevel * capacity (50kg) / 100
      wasteType: 'Organic',
      lastCollection: '2025-07-17T14:20:00Z',
      status: 'critical',
      coordinates: { lat: 21.4222, lng: 39.8240 },
      averageFillRate: 22,
      healthStatus: 'needs_cleaning',
      lastMaintenance: '2025-07-13T13:00:00Z',
      grinderStatus: 'active',
      timeToFill: '4.2 days',
      note: 'CRITICAL: King Abdullah Expansion entry - Grinder working overtime, odor detected',
      odorLevel: 'critical',
      collectionHistory: [
        { date: '2025-07-17T14:20:00Z', amount: 38, truckId: 'TRUCK002', wasteType: 'Organic' },
        { date: '2025-07-16T11:45:00Z', amount: 42, truckId: 'TRUCK001', wasteType: 'Organic' },
        { date: '2025-07-15T16:30:00Z', amount: 39, truckId: 'TRUCK002', wasteType: 'Organic' },
        { date: '2025-07-14T09:15:00Z', amount: 41, truckId: 'TRUCK003', wasteType: 'Organic' },
        { date: '2025-07-13T14:45:00Z', amount: 44, truckId: 'TRUCK001', wasteType: 'Organic' },
      ],
    },
    {
      id: 'OR-KA02',
      location: 'W-G-KingAbdullahZone02',
      fillLevel: 85,
      weight: 42.5, // kg - calculated from fillLevel * capacity (50kg) / 100
      wasteType: 'Organic',
      lastCollection: '2025-07-18T09:30:00Z',
      status: 'needs_collection',
      coordinates: { lat: 21.4208, lng: 39.8245 },
      averageFillRate: 16,
      healthStatus: 'good',
      lastMaintenance: '2025-07-16T14:30:00Z',
      grinderStatus: 'active',
      timeToFill: '4.5 days',
      note: 'Abdullah side aisle - Efficient grinder operation, regular maintenance needed',
      odorLevel: 'high',
      collectionHistory: [
        { date: '2025-07-18T09:30:00Z', amount: 35, truckId: 'TRUCK003', wasteType: 'Organic' },
        { date: '2025-07-17T13:15:00Z', amount: 37, truckId: 'TRUCK002', wasteType: 'Organic' },
        { date: '2025-07-16T10:45:00Z', amount: 33, truckId: 'TRUCK001', wasteType: 'Organic' },
        { date: '2025-07-15T15:20:00Z', amount: 36, truckId: 'TRUCK003', wasteType: 'Organic' },
        { date: '2025-07-14T08:30:00Z', amount: 34, truckId: 'TRUCK002', wasteType: 'Organic' },
      ],
    },
    {
      id: 'OR-KA03',
      location: 'SW-G-KingAbdullahZone03',
      fillLevel: 56,
      weight: 28, // kg - calculated from fillLevel * capacity (50kg) / 100
      wasteType: 'Organic',
      lastCollection: '2025-07-18T11:20:00Z',
      status: 'normal',
      coordinates: { lat: 21.4205, lng: 39.8236 },
      averageFillRate: 10,
      healthStatus: 'good',
      lastMaintenance: '2025-07-15T09:00:00Z',
      grinderStatus: 'inactive',
      timeToFill: '4.8 days',
      note: 'Upper east gate exit - Lower traffic, grinder on standby mode',
      odorLevel: 'moderate',
      collectionHistory: [
        { date: '2025-07-18T11:20:00Z', amount: 22, truckId: 'TRUCK002', wasteType: 'Organic' },
        { date: '2025-07-17T14:45:00Z', amount: 25, truckId: 'TRUCK001', wasteType: 'Organic' },
        { date: '2025-07-16T09:30:00Z', amount: 21, truckId: 'TRUCK003', wasteType: 'Organic' },
        { date: '2025-07-15T16:15:00Z', amount: 24, truckId: 'TRUCK002', wasteType: 'Organic' },
        { date: '2025-07-14T12:00:00Z', amount: 23, truckId: 'TRUCK001', wasteType: 'Organic' },
      ],
    },
    {
      id: 'OR-KA04',
      location: 'S-G-KingAbdullahZone04',
      fillLevel: 79,
      weight: 39.5, // kg - calculated from fillLevel * capacity (50kg) / 100
      wasteType: 'Organic',
      lastCollection: '2025-07-18T14:45:00Z',
      status: 'needs_collection',
      coordinates: { lat: 21.4219, lng: 39.8234 },
      averageFillRate: 14,
      healthStatus: 'needs_cleaning',
      lastMaintenance: '2025-07-13T12:00:00Z',
      grinderStatus: 'active',
      timeToFill: '4.1 days',
      note: 'Southern courtyard edge - Requires cleaning, grinder performance optimal',
      odorLevel: 'high',
      collectionHistory: [
        { date: '2025-07-18T14:45:00Z', amount: 26, truckId: 'TRUCK001', wasteType: 'Organic' },
        { date: '2025-07-17T10:30:00Z', amount: 29, truckId: 'TRUCK002', wasteType: 'Organic' },
        { date: '2025-07-16T15:15:00Z', amount: 27, truckId: 'TRUCK003', wasteType: 'Organic' },
        { date: '2025-07-15T11:45:00Z', amount: 28, truckId: 'TRUCK001', wasteType: 'Organic' },
        { date: '2025-07-14T14:30:00Z', amount: 25, truckId: 'TRUCK002', wasteType: 'Organic' },
      ],
    },
    // 🔵 Organic Waste Bins – King Fahad Expansion:
    {
      id: 'OR-KF01',
      location: 'NE-G-KingFahadZone01',
      fillLevel: 62,
      weight: 31, // kg - calculated from fillLevel * capacity (50kg) / 100
      wasteType: 'Organic',
      lastCollection: '2025-07-18T15:15:00Z',
      status: 'normal',
      coordinates: { lat: 21.4243, lng: 39.8231 },
      averageFillRate: 11,
      healthStatus: 'good',
      lastMaintenance: '2025-07-14T14:00:00Z',
      grinderStatus: 'inactive',
      timeToFill: '5.1 days',
      note: 'King Fahad main gate - Premium location, excellent maintenance record',
      odorLevel: 'low',
      collectionHistory: [
        { date: '2025-07-18T15:15:00Z', amount: 25, truckId: 'TRUCK003', wasteType: 'Organic' },
        { date: '2025-07-17T11:30:00Z', amount: 27, truckId: 'TRUCK002', wasteType: 'Organic' },
        { date: '2025-07-16T14:45:00Z', amount: 24, truckId: 'TRUCK001', wasteType: 'Organic' },
        { date: '2025-07-15T09:20:00Z', amount: 26, truckId: 'TRUCK003', wasteType: 'Organic' },
        { date: '2025-07-14T16:00:00Z', amount: 23, truckId: 'TRUCK002', wasteType: 'Organic' },
      ],
    },
    {
      id: 'OR-KF02',
      location: 'N-G-KingFahadZone02',
      fillLevel: 87,
      weight: 43.5, // kg - calculated from fillLevel * capacity (50kg) / 100
      wasteType: 'Organic',
      lastCollection: '2025-07-18T08:00:00Z',
      status: 'needs_collection',
      coordinates: { lat: 21.4255, lng: 39.8224 },
      averageFillRate: 17,
      healthStatus: 'good',
      lastMaintenance: '2025-07-15T10:30:00Z',
      grinderStatus: 'active',
      timeToFill: '3.8 days',
      note: 'King Fahad left wall - High efficiency grinder, approaching capacity',
      odorLevel: 'high',
      collectionHistory: [
        { date: '2025-07-18T08:00:00Z', amount: 33, truckId: 'TRUCK001', wasteType: 'Organic' },
        { date: '2025-07-17T12:45:00Z', amount: 35, truckId: 'TRUCK002', wasteType: 'Organic' },
        { date: '2025-07-16T16:30:00Z', amount: 32, truckId: 'TRUCK003', wasteType: 'Organic' },
        { date: '2025-07-15T10:15:00Z', amount: 34, truckId: 'TRUCK001', wasteType: 'Organic' },
        { date: '2025-07-14T13:45:00Z', amount: 31, truckId: 'TRUCK002', wasteType: 'Organic' },
      ],
    },
    {
      id: 'OR-KF03',
      location: 'NE-G-KingFahadZone03',
      fillLevel: 76,
      weight: 38, // kg - calculated from fillLevel * capacity (50kg) / 100
      wasteType: 'Organic',
      lastCollection: '2025-07-18T12:20:00Z',
      status: 'needs_collection',
      coordinates: { lat: 21.4255, lng: 39.8245 },
      averageFillRate: 15,
      healthStatus: 'good',
      lastMaintenance: '2025-07-14T16:00:00Z',
      grinderStatus: 'active',
      timeToFill: '4.3 days',
      note: 'Southwest corner zone - Steady performance, regular collection schedule',
      odorLevel: 'moderate',
      collectionHistory: [
        { date: '2025-07-18T12:20:00Z', amount: 28, truckId: 'TRUCK003', wasteType: 'Organic' },
        { date: '2025-07-17T08:45:00Z', amount: 30, truckId: 'TRUCK001', wasteType: 'Organic' },
        { date: '2025-07-16T13:30:00Z', amount: 27, truckId: 'TRUCK002', wasteType: 'Organic' },
        { date: '2025-07-15T17:15:00Z', amount: 29, truckId: 'TRUCK003', wasteType: 'Organic' },
        { date: '2025-07-14T10:45:00Z', amount: 26, truckId: 'TRUCK001', wasteType: 'Organic' },
      ],
    },
    {
      id: 'OR-KF04',
      location: 'NE-G-KingFahadZone04',
      fillLevel: 94,
      weight: 47, // kg - calculated from fillLevel * capacity (50kg) / 100
      wasteType: 'Organic',
      lastCollection: '2025-07-17T16:45:00Z',
      status: 'critical',
      coordinates: { lat: 21.4259, lng: 39.8248 },
      averageFillRate: 19,
      healthStatus: 'needs_cleaning',
      lastMaintenance: '2025-07-12T13:30:00Z',
      grinderStatus: 'active',
      timeToFill: '3.7 days',
      note: 'CRITICAL: Facing Mataf - IMMEDIATE ATTENTION REQUIRED! Highest traffic area',
      odorLevel: 'critical',
      collectionHistory: [
        { date: '2025-07-17T16:45:00Z', amount: 41, truckId: 'TRUCK002', wasteType: 'Organic' },
        { date: '2025-07-16T12:30:00Z', amount: 43, truckId: 'TRUCK001', wasteType: 'Organic' },
        { date: '2025-07-15T14:15:00Z', amount: 40, truckId: 'TRUCK003', wasteType: 'Organic' },
        { date: '2025-07-14T09:45:00Z', amount: 42, truckId: 'TRUCK002', wasteType: 'Organic' },
        { date: '2025-07-13T15:30:00Z', amount: 39, truckId: 'TRUCK001', wasteType: 'Organic' },
      ],
    },
  ];

  // Getter methods
  getWasteBins(): WasteBin[] {
    return this.wasteBins;
  }

  getWasteBinById(id: string): WasteBin | undefined {
    return this.wasteBins.find(bin => bin.id === id);
  }

  getWasteBinsByType(wasteType: string): WasteBin[] {
    return this.wasteBins.filter(bin => bin.wasteType === wasteType);
  }

  getWasteBinsByStatus(status: string): WasteBin[] {
    return this.wasteBins.filter(bin => bin.status === status);
  }

  // Simulation method to update bin fill levels
  updateBinFillLevels(): void {
    // Standard bin capacity for weight calculations
    const STANDARD_BIN_CAPACITY = 50; // kg

    // Available truck IDs by waste type (from trucks.service.ts)
    const availableTrucks = {
      plastic: ['TRUCK001', 'TRUCK003'], // Plastic waste trucks
      organic: ['TRUCK002']             // Organic waste truck
    };

    this.wasteBins.forEach(bin => {
      // Simulate fill level increase based on average fill rate
      const hourlyIncrease = bin.averageFillRate / 24;
      let newFillLevel = bin.fillLevel + hourlyIncrease;
      // If bin reaches 100%, simulate collection and reset
      if (newFillLevel >= 100) {
        // Select appropriate truck based on waste type
        const truckType = bin.wasteType.toLowerCase() === 'plastic' ? 'plastic' : 'organic';
        const availableTrucksForType = availableTrucks[truckType];
        const selectedTruck = availableTrucksForType[Math.floor(Math.random() * availableTrucksForType.length)];

        // Use the actual weight that was in the bin as the collected amount
        const collectedWeight = Math.round((newFillLevel * STANDARD_BIN_CAPACITY / 100) * 100) / 100;

        // Add collection record to history with actual collected weight
        const collectionRecord = {
          date: new Date().toISOString(),
          amount: collectedWeight,
          truckId: selectedTruck,
          wasteType: bin.wasteType,
        };
        
        // Keep collection history manageable (max 10 records)
        bin.collectionHistory.push(collectionRecord);
        if (bin.collectionHistory.length > 10) {
          bin.collectionHistory.shift(); // Remove oldest record
        }

        this.wasteTypesService.addCollectionRecord(
          bin.wasteType,
          bin.id,
          selectedTruck,
          collectedWeight
        );
        
        // Reset fill level to a realistic post-collection level (15-25%)
        newFillLevel = 15 + (Math.random() * 10); // 15-25% random variation
        bin.lastCollection = new Date().toISOString();

        // Update maintenance-related fields after collection
        if (bin.wasteType === 'Organic' && bin.grinderStatus === 'active') {
          // Organic bins with active grinders may need more frequent cleaning
          if (Math.random() < 0.3) { // 30% chance
            bin.healthStatus = 'needs_cleaning';
          }
        }
      }

      // Ensure fill level doesn't exceed 100%
      bin.fillLevel = Math.round(Math.min(100, Math.max(0, newFillLevel)) * 100) / 100;

      // Calculate weight based on fill level and bin capacity
      bin.weight = Math.round((bin.fillLevel * STANDARD_BIN_CAPACITY / 100) * 100) / 100;

      // Update status based on fill level with more realistic thresholds
      if (bin.fillLevel >= 90) {
        bin.status = 'critical';
      } else if (bin.fillLevel >= 75) {
        bin.status = 'needs_collection';
      } else {
        bin.status = 'normal';
      }

      // Update time to fill estimation based on current fill rate
      const remainingCapacity = 100 - bin.fillLevel;
      const hoursToFill = remainingCapacity / (bin.averageFillRate / 24);
      const daysToFill = hoursToFill / 24;
      
      if (daysToFill < 1) {
        bin.timeToFill = `${Math.round(hoursToFill)} hours`;
      } else {
        bin.timeToFill = `${Math.round(daysToFill * 10) / 10} days`;
      }

      // Update odor level for organic bins only
      if (bin.wasteType === 'Organic') {
        // Calculate odor level based on multiple factors
        let odorScore = 0;

        // Factor 1: Fill level (higher fill = more odor potential)
        if (bin.fillLevel >= 90) {
          odorScore += 3;
        } else if (bin.fillLevel >= 75) {
          odorScore += 2;
        } else if (bin.fillLevel >= 50) {
          odorScore += 1;
        }

        // Factor 2: Health status
        if (bin.healthStatus === 'needs_cleaning') {
          odorScore += 2;
        } else if (bin.healthStatus === 'maintenance_required') {
          odorScore += 1;
        }

        // Factor 3: Time since last collection (longer time = more odor)
        const timeSinceCollection = new Date().getTime() - new Date(bin.lastCollection).getTime();
        const daysSinceCollection = timeSinceCollection / (1000 * 60 * 60 * 24);
        
        if (daysSinceCollection > 3) {
          odorScore += 2;
        } else if (daysSinceCollection > 2) {
          odorScore += 1;
        }

        // Factor 4: Grinder status (active grinders may help reduce odor)
        if (bin.grinderStatus === 'active') {
          odorScore -= 1; // Active grinder reduces odor
        } else if (bin.grinderStatus === 'maintenance') {
          odorScore += 1; // Broken grinder increases odor
        }

        // Add some randomness (±1)
        odorScore += Math.random() > 0.5 ? 1 : -1;

        // Determine odor level based on score
        let newOdorLevel: 'low' | 'moderate' | 'high' | 'critical';
        
        if (odorScore >= 6) {
          newOdorLevel = 'critical';
        } else if (odorScore >= 4) {
          newOdorLevel = 'high';
        } else if (odorScore >= 2) {
          newOdorLevel = 'moderate';
        } else {
          newOdorLevel = 'low';
        }

        // Apply the new odor level
        bin.odorLevel = newOdorLevel;

        // After collection, reset odor level to low (this happens when newFillLevel was >= 100)
        if (newFillLevel < bin.fillLevel && bin.fillLevel < 30) {
          bin.odorLevel = 'low';
        }
      }
    });
  }
}