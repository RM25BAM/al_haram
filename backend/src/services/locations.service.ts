import { Location } from '../types/index.js';

/**
 * Service for managing locations data
 */
export class LocationsService {
  private locations: Location[] = [
    {
      id: 'LOC001',
      name: 'Kaaba Courtyard',
      coordinates: { lat: 21.4225, lng: 39.8262 },
      type: 'Sacred Area',
      description: 'The holiest area surrounding the Kaaba',
      wasteCapacity: 500,
      currentWasteLevel: 285,
      status: 'operational',
      lastCleaning: '2024-01-16T05:00:00Z',
      accessibilityLevel: 'restricted',
      binCount: 4,
      specialRequirements: ['24/7 monitoring', 'immediate response', 'silent collection'],
    },
    {
      id: 'LOC002',
      name: 'King Abdul Aziz Gate',
      coordinates: { lat: 21.4215, lng: 39.8255 },
      type: 'Entry Point',
      description: 'Main entrance gate for pilgrims',
      wasteCapacity: 200,
      currentWasteLevel: 79,
      status: 'operational',
      lastCleaning: '2024-01-16T08:30:00Z',
      accessibilityLevel: 'public',
      binCount: 2,
      specialRequirements: ['high-capacity bins', 'frequent collection'],
    },
    {
      id: 'LOC003',
      name: 'Safa and Marwa Galleries',
      coordinates: { lat: 21.4235, lng: 39.827 },
      type: 'Pilgrim Area',
      description: "Sa'i ritual corridor between Safa and Marwa",
      wasteCapacity: 300,
      currentWasteLevel: 147,
      status: 'operational',
      lastCleaning: '2024-01-16T06:15:00Z',
      accessibilityLevel: 'public',
      binCount: 2,
      specialRequirements: ['wheelchair accessible', 'multilingual signage'],
    },
    {
      id: 'LOC004',
      name: "Prophet's Gate (Bab al-Nabi)",
      coordinates: { lat: 21.422, lng: 39.825 },
      type: 'Entry Point',
      description: 'Historic gate with high pilgrim traffic',
      wasteCapacity: 250,
      currentWasteLevel: 153,
      status: 'operational',
      lastCleaning: '2024-01-16T07:45:00Z',
      accessibilityLevel: 'public',
      binCount: 2,
      specialRequirements: ['historical preservation compliance'],
    },
    {
      id: 'LOC005',
      name: 'Al-Salam Gate',
      coordinates: { lat: 21.421, lng: 39.8265 },
      type: 'Entry Point',
      description: 'Peace gate - secondary entrance',
      wasteCapacity: 180,
      currentWasteLevel: 128,
      status: 'operational',
      lastCleaning: '2024-01-16T09:20:00Z',
      accessibilityLevel: 'public',
      binCount: 2,
      specialRequirements: ['emergency vehicle access'],
    },
    {
      id: 'LOC006',
      name: 'Maqam Ibrahim Area',
      coordinates: { lat: 21.4227, lng: 39.8263 },
      type: 'Sacred Site',
      description: 'Station of Abraham - prayer area',
      wasteCapacity: 150,
      currentWasteLevel: 110,
      status: 'operational',
      lastCleaning: '2024-01-16T04:30:00Z',
      accessibilityLevel: 'restricted',
      binCount: 2,
      specialRequirements: ['silent operation', 'minimal visual impact'],
    },
    {
      id: 'LOC007',
      name: 'Ajyad Expansion Area',
      coordinates: { lat: 21.4205, lng: 39.8245 },
      type: 'Service Area',
      description: 'Modern expansion with enhanced facilities',
      wasteCapacity: 300,
      currentWasteLevel: 152,
      status: 'operational',
      lastCleaning: '2024-01-16T10:00:00Z',
      accessibilityLevel: 'public',
      binCount: 2,
      specialRequirements: ['modern waste processing', 'recycling facilities'],
    },
    {
      id: 'LOC008',
      name: 'Central Service Hub',
      coordinates: { lat: 21.422, lng: 39.826 },
      type: 'Operations Center',
      description: 'Central coordination point for waste management',
      wasteCapacity: 100,
      currentWasteLevel: 25,
      status: 'operational',
      lastCleaning: '2024-01-16T12:00:00Z',
      accessibilityLevel: 'staff_only',
      binCount: 0,
      specialRequirements: ['command center', 'emergency response'],
    },
  ];

  // Getter methods
  getLocations(): Location[] {
    return this.locations;
  }

  getLocationById(id: string): Location | undefined {
    return this.locations.find(location => location.id === id);
  }

  getLocationsByType(type: string): Location[] {
    return this.locations.filter(location => location.type === type);
  }

  getLocationsByAccessibilityLevel(level: string): Location[] {
    return this.locations.filter(location => location.accessibilityLevel === level);
  }

  getLocationsByStatus(status: string): Location[] {
    return this.locations.filter(location => location.status === status);
  }
}