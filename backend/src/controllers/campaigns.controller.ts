import { FastifyRequest, FastifyReply } from 'fastify';
import { DataService } from '../services/data.service.js';
import { Campaign } from '../types/index.js';

/**
 * Controller for handling campaigns endpoints
 */
export class CampaignsController {
  private dataService: DataService;

  constructor() {
    this.dataService = new DataService();
  }

  /**
   * GET /api/campaigns
   * Get all campaigns with optional filtering and sorting
   */
  getCampaigns = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const query = request.query as {
        platform?: string;
        status?: string;
        region?: string;
        contentType?: string;
        messageType?: string;
        sortField?: keyof Campaign;
        sortDirection?: 'asc' | 'desc';
      };

      const { platform, status, region, contentType, messageType, sortField, sortDirection } = query;
      
      let campaigns = this.dataService.getCampaigns();

      // Apply filters
      if (platform) {
        campaigns = campaigns.filter(campaign => 
          campaign.platform.toLowerCase() === platform.toLowerCase()
        );
      }

      if (status) {
        campaigns = campaigns.filter(campaign => 
          campaign.status.toLowerCase() === status.toLowerCase()
        );
      }

      if (region) {
        campaigns = campaigns.filter(campaign => 
          campaign.region.toLowerCase() === region.toLowerCase()
        );
      }

      if (contentType) {
        campaigns = campaigns.filter(campaign => 
          campaign.contentType.toLowerCase() === contentType.toLowerCase()
        );
      }

      if (messageType) {
        campaigns = campaigns.filter(campaign => 
          campaign.messageType.toLowerCase() === messageType.toLowerCase()
        );
      }

      // Apply sorting
      if (sortField) {
        const direction = sortDirection || 'desc';
        campaigns = this.sortCampaigns(campaigns, sortField, direction);
      }

      reply.send({
        success: true,
        data: campaigns,
        count: campaigns.length,
      });
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      reply.status(500).send({
        success: false,
        error: 'Failed to fetch campaigns',
      });
    }
  };

  /**
   * GET /api/campaigns/analytics
   * Get campaign analytics summary
   */
  getCampaignAnalytics = async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      const analytics = this.dataService.getCampaignAnalytics();

      reply.send({
        success: true,
        data: analytics,
      });
    } catch (error) {
      reply.status(500).send({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get campaign analytics',
      });
    }
  };

  /**
   * GET /api/campaigns/:id
   * Get specific campaign by ID
   */
  getCampaignById = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string };
      const campaign = this.dataService.getCampaignById(id);

      if (!campaign) {
        reply.status(404).send({
          success: false,
          error: 'Campaign not found',
        });
        return;
      }

      reply.send({
        success: true,
        data: campaign,
      });
    } catch (error) {
      console.error('Error fetching campaign:', error);
      reply.status(500).send({
        success: false,
        error: 'Failed to fetch campaign',
      });
    }
  };

  /**
   * POST /api/campaigns/update-metrics
   * Update campaign metrics (simulation)
   */
  updateCampaignMetrics = async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      this.dataService.updateCampaignMetrics();

      reply.send({
        success: true,
        message: 'Campaign metrics updated successfully',
      });
    } catch (error) {
      reply.status(500).send({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update campaign metrics',
      });
    }
  };

  /**
   * Helper method to sort campaigns
   */
  private sortCampaigns(campaigns: Campaign[], sortField: keyof Campaign, sortDirection: 'asc' | 'desc'): Campaign[] {
    return [...campaigns].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }
      
      return 0;
    });
  }
}