import { FastifyInstance } from 'fastify';
import { DataService } from '../services/data.service.js';

const dataService = new DataService();

export async function treatmentMethodsRoutes(fastify: FastifyInstance) {
  // Get all treatment methods
  fastify.get('/', async (_request, reply) => {
    try {
      const treatmentMethods = dataService.getTreatmentMethods();
      reply.code(200).send({
        success: true,
        data: treatmentMethods
      });
    } catch (error) {
      reply.status(500).send({ success: false, error: 'Failed to fetch treatment methods' });
    }
  });

  // Get treatment methods by waste type
  fastify.get('/type/:wasteType', async (request, reply) => {
    try {
      const { wasteType } = request.params as { wasteType: string };
      const treatmentMethods = dataService.getTreatmentMethodsByType(wasteType);
      reply.code(200).send({
        success: true,
        data: treatmentMethods
      });
    } catch (error) {
      reply.status(500).send({ success: false, error: 'Failed to fetch treatment methods by type' });
    }
  });

  // Get treatment method by ID
  fastify.get('/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const treatmentMethod = dataService.getTreatmentMethodById(id);

      if (!treatmentMethod) {
        reply.status(404).send({ success: false, error: 'Treatment method not found' });
        return;
      }

      reply.code(200).send({
        success: true,
        data: treatmentMethod
      });
    } catch (error) {
      reply.status(500).send({ success: false, error: 'Failed to fetch treatment method' });
    }
  });

  // Get treatment recommendations for a waste type
  fastify.get('/recommendations/:wasteType', async (request, reply) => {
    try {
      const { wasteType } = request.params as { wasteType: string };
      const recommendations = dataService.getTreatmentRecommendations(wasteType);
      reply.code(200).send({
        success: true,
        data: recommendations
      });
    } catch (error) {
      reply.status(500).send({ success: false, error: 'Failed to fetch treatment recommendations' });
    }
  });

  // Calculate treatment impact
  fastify.post('/:id/impact', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const { wasteAmount } = request.body as { wasteAmount: number };

      if (!wasteAmount || wasteAmount <= 0) {
        reply.status(400).send({ success: false, error: 'Valid waste amount is required' });
        return;
      }

      const impact = dataService.calculateTreatmentImpact(id, wasteAmount);
      reply.code(200).send({
        success: true,
        data: impact
      });
    } catch (error) {
      reply.status(500).send({ success: false, error: 'Failed to calculate treatment impact' });
    }
  });

  // Get treatment performance simulation
  fastify.get('/:id/performance', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const { days = 30 } = request.query as { days?: number };

      const performance = dataService.simulateTreatmentPerformance(id, days);
      reply.code(200).send({
        success: true,
        data: performance
      });
    } catch (error) {
      reply.status(500).send({ error: 'Failed to simulate treatment performance' });
    }
  });

  // Calculate baseline potential for waste (untreated)
  fastify.post('/baseline-potential', async (request, reply) => {
    try {
      const { wasteType, wasteAmount } = request.body as { wasteType: string; wasteAmount: number };

      if (!wasteType || !wasteAmount || wasteAmount <= 0) {
        reply.status(400).send({ success: false, error: 'Valid waste type and amount are required' });
        return;
      }

      let energyGenerated = 0;
      let financialGain = 0;
      let carbonReduced = 0;

      if (wasteType.toLowerCase() === 'plastic') {
        // Untreated Plastic (Baseline Potential)
        energyGenerated = wasteAmount * 10.0; // 36 MJ/kg × 0.2778
        financialGain = wasteAmount * 0.94; // 0.25 USD × 3.75 SAR/USD
        carbonReduced = wasteAmount * 1.0; // Avoided CO₂ emissions
      } else if (wasteType.toLowerCase() === 'organic') {
        // Organic Waste General Potential
        energyGenerated = wasteAmount * 0.6; // Expected energy output
        financialGain = wasteAmount * 0.75; // 0.2 USD × 3.75 SAR/USD
        carbonReduced = wasteAmount * 1.0; // Estimated CO₂ reduction
      } else {
        reply.status(400).send({ success: false, error: 'Invalid waste type. Must be plastic or organic' });
        return;
      }

      reply.code(200).send({
        success: true,
        data: {
          wasteType,
          wasteAmount,
          energyGenerated: Math.round(energyGenerated * 100) / 100,
          financialGain: Math.round(financialGain * 100) / 100,
          carbonReduced: Math.round(carbonReduced * 100) / 100,
          description: wasteType.toLowerCase() === 'plastic' 
            ? 'Baseline potential if plastic is sold as-is to recycling facilities'
            : 'General estimate for organic waste utilization potential'
        }
      });
    } catch (error) {
      reply.status(500).send({ success: false, error: 'Failed to calculate baseline potential' });
    }
  });
}
