import { FastifyRequest, FastifyReply } from 'fastify';
import { DataService } from '../services/data.service.js';
import { ApiResponse, WasteBin } from '../types/index.js';

/**
 * Controller for simulation operations
 */
export class SimulationController {
  private dataService: DataService;

  constructor() {
    this.dataService = new DataService();
  }

  /**
   * Get simulation bin data
   */
  async getSimulationBins(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const bins = this.dataService.getWasteBins();

      const response: ApiResponse<WasteBin[]> = {
        success: true,
        data: bins,
        count: bins.length,
      };

      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to retrieve simulation bins',
      });
    }
  }

  /**
   * Get carbon filter status
   */
  async getCarbonFilterStatus(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      // Use the simulation service for carbon filter status
      const filterStatus = this.dataService.simulateCarbonFilterStatus();

      const response = {
        success: true,
        data: filterStatus,
      };

      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to retrieve carbon filter status',
      });
    }
  }

  /**
   * Run a complete simulation cycle
   */
  async runSimulationCycle(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      // Run the complete simulation cycle
      this.dataService.simulateCollectionCycle();

      const response = {
        success: true,
        message: 'Simulation cycle completed successfully',
        data: {
          timestamp: new Date().toISOString(),
          actions: [
            'Updated bin fill levels',
            'Reassigned bins to trucks',
            'Updated truck positions',
            'Updated collection records'
          ]
        }
      };

      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to run simulation cycle',
      });
    }
  }

  /**
   * Get system health overview
   */
  async getSystemHealth(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const systemHealth = this.dataService.getSystemHealthOverview();

      const response = {
        success: true,
        data: systemHealth,
      };

      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to retrieve system health',
      });
    }
  }
}
