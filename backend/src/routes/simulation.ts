import { FastifyInstance } from 'fastify';
import { SimulationController } from '../controllers/simulation.controller.js';

/**
 * Simulation routes
 */
export async function simulationRoutes(fastify: FastifyInstance): Promise<void> {
  const controller = new SimulationController();

  // GET /simulation/bins - Get simulation bin data
  fastify.get('/bins', controller.getSimulationBins.bind(controller));

  // GET /simulation/carbon-filter - Get carbon filter status
  fastify.get('/carbon-filter', controller.getCarbonFilterStatus.bind(controller));
}
