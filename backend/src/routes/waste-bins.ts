import { FastifyInstance } from 'fastify';
import { WasteBinsController } from '../controllers/waste-bins.controller.js';

/**
 * Waste bins routes
 */
export async function wasteBinsRoutes(fastify: FastifyInstance): Promise<void> {
  const controller = new WasteBinsController();

  // GET /waste-bins - Get all waste bins
  fastify.get('/', controller.getAllWasteBins.bind(controller));

  // GET /waste-bins/:id - Get waste bin by ID
  fastify.get('/:id', controller.getWasteBinById.bind(controller));
}
