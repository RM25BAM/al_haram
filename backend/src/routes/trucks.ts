import { FastifyInstance } from 'fastify';
import { TrucksController } from '../controllers/trucks.controller.js';

/**
 * Trucks routes
 */
export async function trucksRoutes(fastify: FastifyInstance): Promise<void> {
  const controller = new TrucksController();

  // GET /trucks - Get all trucks
  fastify.get('/', controller.getAllTrucks.bind(controller));

  // GET /trucks/:id - Get truck by ID
  fastify.get('/:id', controller.getTruckById.bind(controller));
}
