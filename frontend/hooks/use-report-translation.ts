import { useLocale } from "next-intl";
import {
  translateText,
  type Locale,
  ZONE_TRANSLATIONS,
  STATUS_TRANSLATIONS,
  LABEL_TRANSLATIONS,
  WEEK_TRANSLATIONS,
  SOURCE_TRANSLATIONS,
} from "@/lib/report-translations";
import type { TMonthlyReportData } from "@/types";

/**
 * Custom hook for translating report data from backend
 * Automatically translates based on current locale
 */
export function useReportTranslation() {
  const locale = useLocale() as Locale;

  /**
   * Translate a single text value
   */
  const t = (
    text: string,
    category: "zones" | "status" | "labels" | "weeks" | "sources" = "labels"
  ): string => {
    return translateText(text, locale, category);
  };

  /**
   * Translate zone names throughout the report
   */
  const translateZone = (zoneName: string): string => {
    return t(zoneName, "zones");
  };

  /**
   * Translate status values
   */
  const translateStatus = (status: string): string => {
    return t(status, "status");
  };

  /**
   * Translate labels (system messages, UI text)
   */
  const translateLabel = (label: string): string => {
    return t(label, "labels");
  };

  /**
   * Translate week names
   */
  const translateWeek = (week: string): string => {
    return t(week, "weeks");
  };

  /**
   * Translate energy/revenue sources
   */
  const translateSource = (source: string): string => {
    return t(source, "sources");
  };

  /**
   * Get translated display text for trend (for UI display only)
   */
  const getTrendDisplayText = (
    trend: "increasing" | "decreasing" | "stable"
  ): string => {
    return translateStatus(trend);
  };

  /**
   * Translate complete monthly report data
   * This function transforms the entire report object
   */
  const translateMonthlyReport = (
    data: TMonthlyReportData
  ): TMonthlyReportData => {
    // Debug: Log what we're translating
    console.log("🔄 Translating report data for locale:", locale);
    console.log(
      "📍 Zone data before translation:",
      data.zonePerformance.map((z) => z.name)
    );

    const translatedData = {
      ...data,
      // Translate summary section
      summary: {
        ...data.summary,
        topWasteZone: translateZone(data.summary.topWasteZone),
        systemPerformance: translateStatus(data.summary.systemPerformance),
      },

      // Translate key metrics
      keyMetrics: {
        ...data.keyMetrics,
        topZone: {
          ...data.keyMetrics.topZone,
          name: translateZone(data.keyMetrics.topZone.name),
        },
      },

      // Translate zone performance data
      zonePerformance: data.zonePerformance.map((zone) => ({
        ...zone,
        name: translateZone(zone.name),
        // Keep trend as original type to maintain type safety
        trend: zone.trend,
      })),

      // Translate system health status
      systemHealth: {
        ...data.systemHealth,
        odorSensorStatus: translateStatus(data.systemHealth.odorSensorStatus),
      },

      // Translate waste trends (week names)
      wasteTrends: {
        ...data.wasteTrends,
        weeklyTotals: data.wasteTrends.weeklyTotals.map((week) => ({
          ...week,
          week: translateWeek(week.week),
        })),
      },

      // Translate treatment impact sources
      treatmentImpact: {
        ...data.treatmentImpact,
        energyGeneration: {
          ...data.treatmentImpact.energyGeneration,
          source: translateSource(data.treatmentImpact.energyGeneration.source),
        },
        revenueGeneration: {
          ...data.treatmentImpact.revenueGeneration,
          source: translateSource(
            data.treatmentImpact.revenueGeneration.source
          ),
        },
      },

      // Translate comparison data
      comparisonToPrevious: {
        ...data.comparisonToPrevious,
        keyChanges: data.comparisonToPrevious.keyChanges.map((change) => ({
          ...change,
          metric: translateLabel(change.metric),
          // Note: We might want to translate reasons too, but they're more complex sentences
        })),
      },

      // Note: Recommendations are full sentences and might need a different approach
      // For now, we'll leave them as-is since they're more complex to translate
      recommendations: data.recommendations,
    };

    // Debug: Log translated zone names
    console.log(
      "✅ Zone data after translation:",
      translatedData.zonePerformance.map((z) => z.name)
    );

    return translatedData;
  };

  return {
    t,
    translateZone,
    translateStatus,
    translateLabel,
    translateWeek,
    translateSource,
    getTrendDisplayText,
    translateMonthlyReport,
    locale,
  };
}
