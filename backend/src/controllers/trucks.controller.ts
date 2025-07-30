import { FastifyRequest, FastifyReply } from 'fastify';
import { DataService } from '../services/data.service.js';
import { ApiResponse, Truck } from '../types/index.js';

/**
 * Controller for truck operations
 */
export class TrucksController {
  private dataService: DataService;

  constructor() {
    this.dataService = new DataService();
  }

  /**
   * Get all trucks
   */
  async getAllTrucks(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const trucks = await this.dataService.getTrucks();

      const response: ApiResponse<Truck[]> = {
        success: true,
        data: trucks,
        count: trucks.length,
      };

      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to retrieve trucks',
      });
    }
  }

  /**
   * Get truck by ID
   */
  async getTruckById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const truck = await this.dataService.getTruckById(request.params.id);

      if (!truck) {
        reply.code(404).send({
          success: false,
          error: 'NOT_FOUND',
          message: 'Truck not found',
        });
        return;
      }

      const response: ApiResponse<Truck> = {
        success: true,
        data: truck,
      };

      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to retrieve truck',
      });
    }
  }
}
