import { FastifyRequest, FastifyReply } from 'fastify';
import { DataService } from '../services/data.service.js';
import { ApiResponse, WasteType } from '../types/index.js';

/**
 * Controller for waste type operations
 */
export class WasteTypesController {
  private dataService: DataService;

  constructor() {
    this.dataService = new DataService();
  }

  /**
   * Get all waste types
   */
  async getAllWasteTypes(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const wasteTypes = await this.dataService.getWasteTypes();

      const response: ApiResponse<WasteType[]> = {
        success: true,
        data: wasteTypes,
        count: wasteTypes.length,
      };

      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to retrieve waste types',
      });
    }
  }

  /**
   * Get waste type by ID
   */
  async getWasteTypeById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const wasteType = await this.dataService.getWasteTypeById(request.params.id);

      if (!wasteType) {
        reply.code(404).send({
          success: false,
          error: 'NOT_FOUND',
          message: 'Waste type not found',
        });
        return;
      }

      const response: ApiResponse<WasteType> = {
        success: true,
        data: wasteType,
      };

      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to retrieve waste type',
      });
    }
  }
}
