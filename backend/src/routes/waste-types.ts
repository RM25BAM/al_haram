import { FastifyInstance } from 'fastify';
import { WasteTypesController } from '../controllers/waste-types.controller.js';

/**
 * Waste types routes
 */
export async function wasteTypesRoutes(fastify: FastifyInstance): Promise<void> {
  const controller = new WasteTypesController();

  // GET /waste-types - Get all waste types
  fastify.get('/', controller.getAllWasteTypes.bind(controller));

  // GET /waste-types/:id - Get waste type by ID
  fastify.get('/:id', controller.getWasteTypeById.bind(controller));
}
