import { Campaign, CampaignAnalytics } from '../types/index.js';

/**
 * Service for managing campaigns data
 */
export class CampaignsService {
  private campaigns: Campaign[] = [
    {
      id: "CAM001",
      title: "Think Green – Arabic",
      platform: "Instagram",
      contentType: "Video",
      messageType: "Educational",
      region: "GCC",
      engagementRate: 8.5,
      reach: 125000,
      shares: 3420,
      timePosted: "8:00 PM",
      awarenessIncrease: 85,
      status: "completed",
    },
    {
      id: "CAM002", 
      title: "Clean Masjid Initiative",
      platform: "TikTok",
      contentType: "Video",
      messageType: "Emotional",
      region: "North America",
      engagementRate: 12.3,
      reach: 89000,
      shares: 5680,
      timePosted: "7:30 PM",
      awarenessIncrease: 92,
      status: "active",
    },
    {
      id: "CAM003",
      title: "Waste Reduction Tips",
      platform: "Twitter",
      contentType: "Image",
      messageType: "Educational",
      region: "Europe",
      engagementRate: 6.2,
      reach: 67000,
      shares: 1890,
      timePosted: "12:00 PM",
      awarenessIncrease: 45,
      status: "completed",
    },
    {
      id: "CAM004",
      title: "Sacred Space Stewardship",
      platform: "Instagram",
      contentType: "Image",
      messageType: "Emotional",
      region: "Asia",
      engagementRate: 9.8,
      reach: 156000,
      shares: 4230,
      timePosted: "6:00 PM",
      awarenessIncrease: 78,
      status: "active",
    },
    {
      id: "CAM005",
      title: "Sustainability in Islam",
      platform: "TikTok",
      contentType: "Video",
      messageType: "Educational",
      region: "GCC",
      engagementRate: 11.7,
      reach: 203000,
      shares: 6750,
      timePosted: "9:00 PM",
      awarenessIncrease: 94,
      status: "completed",
    },
  ];

  // Getter methods
  getCampaigns(): Campaign[] {
    return this.campaigns;
  }

  getCampaignById(id: string): Campaign | undefined {
    return this.campaigns.find(campaign => campaign.id === id);
  }

  getCampaignsByPlatform(platform: string): Campaign[] {
    return this.campaigns.filter(campaign => 
      campaign.platform.toLowerCase() === platform.toLowerCase()
    );
  }

  getCampaignsByStatus(status: string): Campaign[] {
    return this.campaigns.filter(campaign => 
      campaign.status.toLowerCase() === status.toLowerCase()
    );
  }

  getCampaignsByRegion(region: string): Campaign[] {
    return this.campaigns.filter(campaign => 
      campaign.region.toLowerCase() === region.toLowerCase()
    );
  }

  getCampaignsByContentType(contentType: string): Campaign[] {
    return this.campaigns.filter(campaign => 
      campaign.contentType.toLowerCase() === contentType.toLowerCase()
    );
  }

  getCampaignsByMessageType(messageType: string): Campaign[] {
    return this.campaigns.filter(campaign => 
      campaign.messageType.toLowerCase() === messageType.toLowerCase()
    );
  }

  getCampaignsSorted(sortField?: keyof Campaign, sortDirection: 'asc' | 'desc' = 'desc'): Campaign[] {
    if (!sortField) {
      return this.campaigns;
    }

    return [...this.campaigns].sort((a, b) => {
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

  getCampaignAnalytics(): CampaignAnalytics {
    const totalCampaigns = this.campaigns.length;
    
    // Calculate average awareness increase
    const avgAwarenessIncrease = Math.round(
      this.campaigns.reduce((sum, campaign) => sum + campaign.awarenessIncrease, 0) / totalCampaigns
    );

    // Find best performing campaign
    const bestPerformingCampaign = this.campaigns.reduce((best, current) =>
      current.engagementRate > best.engagementRate ? current : best
    );

    // Calculate best time slot
    const timeSlots = this.campaigns.reduce((acc, campaign) => {
      const hour = parseInt(campaign.timePosted.split(":")[0]);
      const timeSlot = hour >= 18 ? "Evening (6-10 PM)" : 
                     hour >= 12 ? "Afternoon (12-6 PM)" : "Morning (6-12 PM)";
      
      if (!acc[timeSlot]) {
        acc[timeSlot] = { total: 0, count: 0 };
      }
      acc[timeSlot].total += campaign.engagementRate;
      acc[timeSlot].count += 1;
      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    const bestTimeSlot = Object.entries(timeSlots).reduce((best, [time, data]) => {
      const avgEngagement = data.total / data.count;
      return avgEngagement > best.avgEngagement ? { timeSlot: time, avgEngagement } : best;
    }, { timeSlot: "", avgEngagement: 0 });

    // Calculate platform stats
    const platformStats = this.campaigns.reduce((acc, campaign) => {
      const existing = acc.find(p => p.platform === campaign.platform);
      if (existing) {
        existing.count += 1;
        existing.avgEngagement = (existing.avgEngagement + campaign.engagementRate) / 2;
      } else {
        acc.push({
          platform: campaign.platform,
          count: 1,
          avgEngagement: campaign.engagementRate
        });
      }
      return acc;
    }, [] as { platform: string; count: number; avgEngagement: number }[]);

    // Calculate region stats
    const regionStats = this.campaigns.reduce((acc, campaign) => {
      const existing = acc.find(r => r.region === campaign.region);
      if (existing) {
        existing.count += 1;
        existing.avgEngagement = (existing.avgEngagement + campaign.engagementRate) / 2;
      } else {
        acc.push({
          region: campaign.region,
          count: 1,
          avgEngagement: campaign.engagementRate
        });
      }
      return acc;
    }, [] as { region: string; count: number; avgEngagement: number }[]);

    return {
      totalCampaigns,
      avgAwarenessIncrease,
      bestPerformingCampaign,
      bestTimeSlot,
      platformStats,
      regionStats,
    };
  }

  // Simulation method to update campaign metrics
  updateCampaignMetrics(): void {
    this.campaigns.forEach(campaign => {
      // Simulate slight changes in engagement and reach for active campaigns
      if (campaign.status === 'active') {
        // Small random changes for engagement rate (+/- 0.5%)
        const engagementChange = (Math.random() - 0.5) * 1.0;
        campaign.engagementRate = Math.max(0.1, Math.round((campaign.engagementRate + engagementChange) * 10) / 10);

        // Small changes in reach (+/- 5%)
        const reachChange = Math.round(campaign.reach * (Math.random() - 0.5) * 0.1);
        campaign.reach = Math.max(1000, campaign.reach + reachChange);

        // Small changes in shares
        const sharesChange = Math.round(campaign.shares * (Math.random() - 0.5) * 0.15);
        campaign.shares = Math.max(10, campaign.shares + sharesChange);

        // Update awareness increase based on new engagement rate
        campaign.awarenessIncrease = Math.min(100, Math.max(10, 
          Math.round(campaign.engagementRate * 8 + (Math.random() - 0.5) * 10)
        ));
      }
    });
  }
}