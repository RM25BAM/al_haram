import { FastifyInstance } from 'fastify';
import { wasteTypesRoutes } from './waste-types.js';
import { trucksRoutes } from './trucks.js';
import { wasteBinsRoutes } from './waste-bins.js';
import { locationsRoutes } from './locations.js';
import { treatmentMethodsRoutes } from './treatment-methods.js';
import { campaignsRoutes } from './campaigns.js';
import { simulationRoutes } from './simulation.js';
import { reportsRoutes } from './reports.js';

export async function registerRoutes(fastify: FastifyInstance): Promise<void> {
  await fastify.register(wasteTypesRoutes, { prefix: '/api/waste-types' });
  await fastify.register(trucksRoutes, { prefix: '/api/trucks' });
  await fastify.register(wasteBinsRoutes, { prefix: '/api/waste-bins' });
  await fastify.register(locationsRoutes, { prefix: '/api/locations' });
  await fastify.register(treatmentMethodsRoutes, { prefix: '/api/treatment-methods' });
  await fastify.register(campaignsRoutes, { prefix: '/api/campaigns' });
  await fastify.register(simulationRoutes, { prefix: '/api/simulation' });
  await fastify.register(reportsRoutes, { prefix: '/api/reports' });
}
