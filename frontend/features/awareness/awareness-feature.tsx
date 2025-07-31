"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  Clock,
  Trophy,
  Instagram,
  Twitter,
  Video,
  Image,
  Heart,
  BookOpen,
  ArrowUpDown,
  Users,
  Eye,
  Share2,
  Loader2,
  AlertCircle,
  Target,
  BarChart3,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { fetchCampaigns, fetchCampaignAnalytics } from "@/lib/api";
import type { TCampaign, TCampaignAnalytics } from "@/types";
import { 
  getTranslatedCampaignTitle, 
  getTranslatedRegion, 
  getTranslatedTimeSlot, 
  getTranslatedPlatform, 
  getTranslatedContentType, 
  getTranslatedMessageType, 
  getTranslatedStatus 
} from "@/lib/utils";

// Helper functions
const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "Instagram":
      return <Instagram className="h-4 w-4" />;
    case "Twitter":
      return <Twitter className="h-4 w-4" />;
    case "TikTok":
      return <Video className="h-4 w-4" />;
    default:
      return <Share2 className="h-4 w-4" />;
  }
};

const getContentTypeIcon = (type: string) =>
  type === "Video" ? <Video className="h-4 w-4" /> : <Image className="h-4 w-4" />;

const getMessageTypeIcon = (type: string) =>
  type === "Educational" ? <BookOpen className="h-4 w-4" /> : <Heart className="h-4 w-4" />;

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-orange-600 text-surface";
    case "completed":
      return "bg-green-600 text-surface border-outline";
    case "draft":
      return "bg-surface border-outline text-primary";
    default:
      return "bg-surface border-outline text-primary";
  }
};

export function AwarenessFeature() {
  const t = useTranslations("awareness");
  const [campaigns, setCampaigns] = useState<TCampaign[]>([]);
  const [analytics, setAnalytics] = useState<TCampaignAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof TCampaign>("engagementRate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const loadCampaignData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [campaignsData, analyticsData] = await Promise.all([
          fetchCampaigns(),
          fetchCampaignAnalytics(),
        ]);
        
        setCampaigns(campaignsData);
        setAnalytics(analyticsData);
      } catch (err) {
        console.error("Failed to load campaign data:", err);
        setError(err instanceof Error ? err.message : "Failed to load campaign data");
      } finally {
        setLoading(false);
      }
    };

    loadCampaignData();
  }, []);

  // Sort campaigns
  const sortedCampaigns = [...campaigns].sort((a, b) => {
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

  const handleSort = (field: keyof TCampaign) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] space-x-2">
        <Loader2 className="h-6 w-6 animate-spin text-secondary" />
        <span className="text-primary">{t("loadingCampaignData")}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] space-x-2">
        <AlertCircle className="h-6 w-6 text-red-500" />
        <span className="text-red-600">{t("errorLoadingData")}: {error}</span>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <span className="text-primary">{t("noCampaignData")}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Overall Awareness Increase */}
        <Card className="border-l-4 border-l-secondary bg-surface border border-outline">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-primary/70 mb-1">
                  {t("overallAwarenessImpact")}
                </p>
                <p className="text-2xl font-bold text-primary mb-2">+{analytics.avgAwarenessIncrease}%</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  <Badge variant="outline" className="text-xs bg-surface-200 text-primary border-outline">
                    {getTranslatedMessageType("Emotional", t)}
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-surface-200 text-primary border-outline">
                    {getTranslatedMessageType("Educational", t)}
                  </Badge>
                </div>
                <Progress 
                  value={analytics.avgAwarenessIncrease} 
                  className="h-2"
                />
              </div>
              <div className="p-3 bg-blue-800 text-blue-100 rounded-full">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Performing Time */}
        <Card className="border-l-4 border-l-secondary bg-surface border border-outline">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-primary/70 mb-1">
                  {t("peakEngagementTime")}
                </p>
                <p className="text-2xl font-bold text-primary mb-1">
                  {getTranslatedTimeSlot(analytics.bestTimeSlot.timeSlot, t)}
                </p>
                <p className="text-sm text-primary/70 mb-3">
                  {t("avgEngagement", { engagement: analytics.bestTimeSlot.avgEngagement.toFixed(1) })}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-primary/70">
                    <span>{t("morning")}</span>
                    <span>{t("evening")}</span>
                  </div>
                  <div className="h-2 bg-surface-200 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-secondary rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-gray-600 text-gray-100 rounded-full">
                <Clock className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Performing Campaign */}
        <Card className="border-l-4 border-l-secondary bg-surface border border-outline">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-primary/70 mb-1">
                  {t("topPerformingCampaign")}
                </p>
                <p className="font-semibold text-primary mb-2 text-sm">
                  {getTranslatedCampaignTitle(analytics.bestPerformingCampaign.title, t)}
                </p>
                <div className="flex items-center gap-2 mb-2">
                  {getPlatformIcon(analytics.bestPerformingCampaign.platform)}
                  <span className="text-sm text-primary">{getTranslatedPlatform(analytics.bestPerformingCampaign.platform, t)}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-primary/70 mb-2">
                  <div className="flex items-center gap-1">
                    {getContentTypeIcon(analytics.bestPerformingCampaign.contentType)}
                    <span>{getTranslatedContentType(analytics.bestPerformingCampaign.contentType, t)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {getMessageTypeIcon(analytics.bestPerformingCampaign.messageType)}
                    <span>{getTranslatedMessageType(analytics.bestPerformingCampaign.messageType, t)}</span>
                  </div>
                </div>
                <Badge className="bg-secondary text-surface text-xs">
                  {analytics.bestPerformingCampaign.engagementRate}% {t("engagement")}
                </Badge>
              </div>
              <div className="p-3 bg-yellow-600 text-yellow-100 rounded-full">
                <Trophy className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance Table */}
      <Card className="bg-surface border border-outline">
        <CardHeader className="border-b border-outline">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-primary">
                <BarChart3 className="h-5 w-5" />
                {t("campaignPerformanceAnalysis")}
              </CardTitle>
              <CardDescription className="text-primary/70">
                {t("detailedBreakdown")}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b bg-secondary hover:bg-secondary">
                  <TableHead className="font-bold text-surface text-sm p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("title")}
                      className="h-auto p-0 font-bold text-surface hover:bg-transparent hover:text-surface"
                    >
                      {t("campaign")} <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead className="font-bold text-surface text-sm p-4">{t("platform")}</TableHead>
                  <TableHead className="font-bold text-surface text-sm p-4">{t("contentType")}</TableHead>
                  <TableHead className="font-bold text-surface text-sm p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("engagementRate")}
                      className="h-auto p-0 font-bold text-surface hover:bg-transparent hover:text-surface"
                    >
                      {t("sortBy.engagementRate")} <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead className="font-bold text-surface text-sm p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("reach")}
                      className="h-auto p-0 font-bold text-surface hover:bg-transparent hover:text-surface"
                    >
                      {t("reach")} <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead className="font-bold text-surface text-sm p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("awarenessIncrease")}
                      className="h-auto p-0 font-bold text-surface hover:bg-transparent hover:text-surface"
                    >
                      {t("impact")} <ArrowUpDown className="ml-1 h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead className="font-bold text-surface text-sm p-4">{t("status")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedCampaigns.map((campaign) => (
                  <TableRow key={campaign.id} className="border-b border-outline hover:bg-surface-200 transition-colors">
                    <TableCell className="p-4">
                      <div>
                        <div className="font-medium text-primary text-sm">{getTranslatedCampaignTitle(campaign.title, t)}</div>
                        <div className="text-xs text-primary/70">
                          {getTranslatedRegion(campaign.region, t)} • {campaign.timePosted}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="flex items-center gap-2">
                        {getPlatformIcon(campaign.platform)}
                        <span className="text-sm text-primary">{getTranslatedPlatform(campaign.platform, t)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          {getContentTypeIcon(campaign.contentType)}
                          <span className="text-xs text-primary">{getTranslatedContentType(campaign.contentType, t)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {getMessageTypeIcon(campaign.messageType)}
                          <span className="text-xs text-primary/70">{getTranslatedMessageType(campaign.messageType, t)}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="font-medium text-primary">{campaign.engagementRate}%</div>
                      <div className="text-xs text-primary/70 flex items-center gap-1">
                        <Share2 className="h-3 w-3" />
                        {campaign.shares.toLocaleString()} {t("shares")}
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3 text-secondary" />
                        <span className="text-sm text-primary">{campaign.reach.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="font-medium text-secondary">
                        +{campaign.awarenessIncrease}%
                      </div>
                    </TableCell>
                    <TableCell className="p-4 hover:text-">
                      <Badge className={`${getStatusColor(campaign.status)} capitalize text-xs`}>
                        {getTranslatedStatus(campaign.status, t)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
