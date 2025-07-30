import { FastifyRequest, FastifyReply } from 'fastify';
import { DataService } from '../services/data.service.js';
import { ApiResponse, WasteBin } from '../types/index.js';

/**
 * Controller for waste bin operations
 */
export class WasteBinsController {
  private dataService: DataService;

  constructor() {
    this.dataService = new DataService();
  }

  /**
   * Get all waste bins
   */
  async getAllWasteBins(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const wasteBins = await this.dataService.getWasteBins();

      const response: ApiResponse<WasteBin[]> = {
        success: true,
        data: wasteBins,
        count: wasteBins.length,
      };

      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to retrieve waste bins',
      });
    }
  }

  /**
   * Get waste bin by ID
   */
  async getWasteBinById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const wasteBin = await this.dataService.getWasteBinById(request.params.id);

      if (!wasteBin) {
        reply.code(404).send({
          success: false,
          error: 'NOT_FOUND',
          message: 'Waste bin not found',
        });
        return;
      }

      const response: ApiResponse<WasteBin> = {
        success: true,
        data: wasteBin,
      };

      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to retrieve waste bin',
      });
    }
  }
}
