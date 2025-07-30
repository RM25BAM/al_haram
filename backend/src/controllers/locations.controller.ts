import { FastifyRequest, FastifyReply } from 'fastify';
import { DataService } from '../services/data.service.js';
import { LocationsResponse } from '../types/index.js';

/**
 * Controller for location operations
 */
export class LocationsController {
  private dataService: DataService;

  constructor() {
    this.dataService = new DataService();
  }

  /**
   * Get combined locations data (bins + trucks)
   */
  async getLocationsData(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const bins = this.dataService.getWasteBins();
      const trucks = this.dataService.getTrucks();
      const locationsData = { bins, trucks };

      const response: LocationsResponse = {
        success: true,
        data: locationsData,
        count: {
          bins: locationsData.bins.length,
          trucks: locationsData.trucks.length,
        },
      };

      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to retrieve locations data',
      });
    }
  }
}
