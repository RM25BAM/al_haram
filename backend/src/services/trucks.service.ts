import { Truck, WasteBin } from '../types/index.js';

/**
 * Service for managing trucks data and operations
 */
export class TrucksService {
  private trucks: Truck[] = [
    {
      id: 'TRUCK001',
      driver: 'Mohammed Ali',
      location: 'Mataf Collection Point',
      status: 'collecting',
      capacity: 82, // Current load percentage
      route: 'Central Mosque Route',
      estimatedCompletion: '2025-07-20T15:30:00Z',
      coordinates: { lat: 21.4224, lng: 39.8267 }, // Near Mataf area
      nextPickup: 'Safa-Marwa Galleries',
      fuelLevel: 68,
      totalDistance: 24.5,
      collectionsToday: 12,
      wasteType: 'Plastic',
      assignedBins: ['PL-A01', 'PL-M01', 'PL-A04', 'PL-M03'],
      routeHistory: [
        {
          date: '2025-07-20T06:00:00Z',
          route: 'Central Mosque Route',
          distance: 24.5,
          collections: 12,
        },
        {
          date: '2025-07-19T06:00:00Z',
          route: 'Central Mosque Route',
          distance: 28.2,
          collections: 14,
        },
        {
          date: '2025-07-18T06:00:00Z',
          route: 'Central Mosque Route',
          distance: 22.8,
          collections: 11,
        },
        {
          date: '2025-07-17T06:00:00Z',
          route: 'Gates & Entrances Route',
          distance: 19.3,
          collections: 9,
        },
        {
          date: '2025-07-16T06:00:00Z',
          route: 'Central Mosque Route',
          distance: 26.1,
          collections: 13,
        },
        {
          date: '2025-07-15T06:00:00Z',
          route: 'Abbasid Riwaq Focus',
          distance: 18.7,
          collections: 8,
        },
        {
          date: '2025-07-14T06:00:00Z',
          route: 'Central Mosque Route',
          distance: 25.4,
          collections: 12,
        },
      ],
    },
    {
      id: 'TRUCK002',
      driver: 'Omar Shah',
      location: 'King Abdullah Expansion',
      status: 'collecting',
      capacity: 65, // Current load percentage
      route: 'Organic Waste Circuit',
      estimatedCompletion: '2025-07-20T16:45:00Z',
      coordinates: { lat: 21.4215, lng: 39.824 }, // Abdullah expansion area
      nextPickup: 'King Fahad Expansion',
      fuelLevel: 78,
      totalDistance: 31.8,
      collectionsToday: 9,
      wasteType: 'Organic',
      assignedBins: ['OR-KA01', 'OR-KA02', 'OR-KA04', 'OR-KF02', 'OR-KF04'],
      routeHistory: [
        {
          date: '2025-07-20T05:30:00Z',
          route: 'Organic Waste Circuit',
          distance: 31.8,
          collections: 9,
        },
        {
          date: '2025-07-19T05:30:00Z',
          route: 'Organic Waste Circuit',
          distance: 34.2,
          collections: 11,
        },
        {
          date: '2025-07-18T05:30:00Z',
          route: 'King Abdullah Focus',
          distance: 28.5,
          collections: 8,
        },
        {
          date: '2025-07-17T05:30:00Z',
          route: 'Organic Waste Circuit',
          distance: 32.7,
          collections: 10,
        },
        {
          date: '2025-07-16T05:30:00Z',
          route: 'King Fahad Focus',
          distance: 25.9,
          collections: 7,
        },
        {
          date: '2025-07-15T05:30:00Z',
          route: 'Organic Waste Circuit',
          distance: 33.1,
          collections: 10,
        },
        {
          date: '2025-07-14T05:30:00Z',
          route: 'Critical Bins Priority',
          distance: 29.4,
          collections: 9,
        },
      ],
    },
    {
      id: 'TRUCK003',
      driver: 'Ahmed Kareem',
      location: 'Masaa Corridor',
      status: 'en_route',
      capacity: 38, // Current load percentage
      route: 'Masaa & Outer Areas',
      estimatedCompletion: '2025-07-20T14:20:00Z',
      coordinates: { lat: 21.4235, lng: 39.8273 }, // Near Masaa corridor
      nextPickup: 'Abbasid Riwaq Southeast',
      fuelLevel: 85,
      totalDistance: 18.6,
      collectionsToday: 7,
      wasteType: 'Plastic',
      assignedBins: ['PL-A02', 'PL-A03', 'PL-M02L', 'PL-M02R'],
      routeHistory: [
        {
          date: '2025-07-20T07:00:00Z',
          route: 'Masaa & Outer Areas',
          distance: 18.6,
          collections: 7,
        },
        {
          date: '2025-07-19T07:00:00Z',
          route: 'Masaa & Outer Areas',
          distance: 21.3,
          collections: 8,
        },
        {
          date: '2025-07-18T07:00:00Z',
          route: 'Expansion Areas Focus',
          distance: 16.8,
          collections: 6,
        },
        {
          date: '2025-07-17T07:00:00Z',
          route: 'Masaa & Outer Areas',
          distance: 19.7,
          collections: 7,
        },
        {
          date: '2025-07-16T07:00:00Z',
          route: 'Abbasid Support Route',
          distance: 15.2,
          collections: 5,
        },
        {
          date: '2025-07-15T07:00:00Z',
          route: 'Masaa & Outer Areas',
          distance: 20.1,
          collections: 8,
        },
        {
          date: '2025-07-14T07:00:00Z',
          route: 'Backup Coverage',
          distance: 23.4,
          collections: 9,
        },
      ],
    },
  ];

  // Getter methods
  getTrucks(): Truck[] {
    return this.trucks;
  }

  getTruckById(id: string): Truck | undefined {
    return this.trucks.find(truck => truck.id === id);
  }

  getTrucksByStatus(status: string): Truck[] {
    return this.trucks.filter(truck => truck.status === status);
  }

  getTrucksByWasteType(wasteType: string): Truck[] {
    return this.trucks.filter(truck => truck.wasteType === wasteType);
  }

  getSpecializedTrucks(wasteType: string): Truck[] {
    return this.trucks.filter(truck => truck.wasteType === wasteType);
  }

  // Method to get assigned bins for a truck (ensures they match waste type)
  getAssignedBinsForTruck(truckId: string, wasteBins: WasteBin[]): WasteBin[] {
    const truck = this.getTruckById(truckId);
    if (!truck) return [];

    return wasteBins.filter(
      bin => truck.assignedBins.includes(bin.id) && bin.wasteType === truck.wasteType
    );
  }

  // Method to reassign bins to trucks based on waste type compatibility
  reassignBinsToTrucks(wasteBins: WasteBin[]): void {
    this.trucks.forEach(truck => {
      // Get all bins that match the truck's waste type
      const compatibleBins = wasteBins.filter(bin => bin.wasteType === truck.wasteType);

      // Assign bins based on proximity and priority (critical first, then needs_collection)
      const priorityBins = compatibleBins
        .filter(bin => bin.status === 'critical' || bin.status === 'needs_collection')
        .sort((a, b) => {
          // Prioritize critical bins first
          if (a.status === 'critical' && b.status !== 'critical') return -1;
          if (b.status === 'critical' && a.status !== 'critical') return 1;

          // Then sort by distance from truck
          const distanceA = Math.sqrt(
            Math.pow(a.coordinates.lat - truck.coordinates.lat, 2) +
              Math.pow(a.coordinates.lng - truck.coordinates.lng, 2)
          );
          const distanceB = Math.sqrt(
            Math.pow(b.coordinates.lat - truck.coordinates.lat, 2) +
              Math.pow(b.coordinates.lng - truck.coordinates.lng, 2)
          );
          return distanceA - distanceB;
        });

      // Assign up to 5 bins per truck (increased from 4 to handle current workload)
      truck.assignedBins = priorityBins.slice(0, 5).map(bin => bin.id);

      // If we don't have enough priority bins, fill with normal bins nearby
      if (truck.assignedBins.length < 4) {
        const normalBins = compatibleBins
          .filter(bin => bin.status === 'normal' && !truck.assignedBins.includes(bin.id))
          .sort((a, b) => {
            const distanceA = Math.sqrt(
              Math.pow(a.coordinates.lat - truck.coordinates.lat, 2) +
                Math.pow(a.coordinates.lng - truck.coordinates.lng, 2)
            );
            const distanceB = Math.sqrt(
              Math.pow(b.coordinates.lat - truck.coordinates.lat, 2) +
                Math.pow(b.coordinates.lng - truck.coordinates.lng, 2)
            );
            return distanceA - distanceB;
          });

        const additionalBins = normalBins.slice(0, 4 - truck.assignedBins.length);
        truck.assignedBins.push(...additionalBins.map(bin => bin.id));
      }
    });
  }

  // Method to validate truck assignments (ensure bins match waste type)
  validateTruckAssignments(wasteBins: WasteBin[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    this.trucks.forEach(truck => {
      truck.assignedBins.forEach(binId => {
        const bin = wasteBins.find(b => b.id === binId);
        if (!bin) {
          errors.push(`Truck ${truck.id} assigned to non-existent bin ${binId}`);
        } else if (bin.wasteType !== truck.wasteType) {
          errors.push(
            `Truck ${truck.id} (${truck.wasteType}) assigned to incompatible bin ${binId} (${bin.wasteType})`
          );
        }
      });
    });

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  // Enhanced method to simulate truck movements with more realistic behavior
  updateTruckPositions(wasteBins: WasteBin[]): void {
    this.trucks.forEach(truck => {
      if (truck.status === 'en_route' || truck.status === 'collecting') {
        // Find the next target bin (prioritize critical bins)
        const assignedBins = wasteBins.filter(bin => truck.assignedBins.includes(bin.id));
        const targetBin = assignedBins.sort((a, b) => {
          // Prioritize by status (critical > needs_collection > normal)
          const statusPriority = { critical: 3, needs_collection: 2, normal: 1 };
          const priorityDiff = (statusPriority[b.status] || 0) - (statusPriority[a.status] || 0);
          if (priorityDiff !== 0) return priorityDiff;

          // Then by distance
          const distanceA = Math.sqrt(
            Math.pow(a.coordinates.lat - truck.coordinates.lat, 2) +
              Math.pow(a.coordinates.lng - truck.coordinates.lng, 2)
          );
          const distanceB = Math.sqrt(
            Math.pow(b.coordinates.lat - truck.coordinates.lat, 2) +
              Math.pow(b.coordinates.lng - truck.coordinates.lng, 2)
          );
          return distanceA - distanceB;
        })[0];

        if (targetBin) {
          // Calculate movement speed based on truck type and status
          const baseSpeed = truck.status === 'collecting' ? 0.05 : 0.1; // Slower when collecting
          const movementFactor = baseSpeed * (truck.fuelLevel / 100); // Affected by fuel level

          // Simple simulation of movement towards target
          const latDiff = (targetBin.coordinates.lat - truck.coordinates.lat) * movementFactor;
          const lngDiff = (targetBin.coordinates.lng - truck.coordinates.lng) * movementFactor;

          truck.coordinates.lat += latDiff;
          truck.coordinates.lng += lngDiff;

          // Update total distance (approximate)
          const distanceMoved = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111000; // Convert to meters
          truck.totalDistance += distanceMoved / 1000; // Convert to km
          truck.totalDistance = Math.round(truck.totalDistance * 10) / 10; // Round to 1 decimal

          // Simulate fuel consumption (very basic)
          if (Math.random() < 0.1) {
            // 10% chance per update
            truck.fuelLevel = Math.max(0, truck.fuelLevel - 1);
          }
        }
      }
    });
  }

  // Method to get truck assignment summary
  getTruckAssignmentSummary(): {
    plasticTrucks: number;
    organicTrucks: number;
    totalAssignedBins: number;
    assignmentsByTruck: Array<{
      truckId: string;
      wasteType: string;
      assignedBinCount: number;
      status: string;
    }>;
  } {
    const plasticTrucks = this.getTrucksByWasteType('Plastic').length;
    const organicTrucks = this.getTrucksByWasteType('Organic').length;
    const totalAssignedBins = this.trucks.reduce(
      (sum, truck) => sum + truck.assignedBins.length,
      0
    );

    const assignmentsByTruck = this.trucks.map(truck => ({
      truckId: truck.id,
      wasteType: truck.wasteType,
      assignedBinCount: truck.assignedBins.length,
      status: truck.status,
    }));

    return {
      plasticTrucks,
      organicTrucks,
      totalAssignedBins,
      assignmentsByTruck,
    };
  }
}
