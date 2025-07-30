import { FastifyInstance } from 'fastify';
import { CampaignsController } from '../controllers/campaigns.controller.js';

/**
 * Campaigns routes
 */
export async function campaignsRoutes(fastify: FastifyInstance): Promise<void> {
  const controller = new CampaignsController();

  // GET /campaigns - Get all campaigns with optional filtering and sorting
  fastify.get('/', controller.getCampaigns);

  // GET /campaigns/analytics - Get campaign analytics summary
  fastify.get('/analytics', controller.getCampaignAnalytics);

  // GET /campaigns/:id - Get specific campaign by ID
  fastify.get('/:id', controller.getCampaignById);

  // POST /campaigns/update-metrics - Update campaign metrics (simulation)
  fastify.post('/update-metrics', controller.updateCampaignMetrics);
}