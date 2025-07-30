import { FastifyInstance } from 'fastify';
import { LocationsController } from '../controllers/locations.controller.js';

/**
 * Locations routes
 */
export async function locationsRoutes(fastify: FastifyInstance): Promise<void> {
  const controller = new LocationsController();

  // GET /locations - Get combined locations data (bins + trucks)
  fastify.get('/', controller.getLocationsData.bind(controller));
}
