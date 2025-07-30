"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Zap,
  DollarSign,
  Leaf,
  Star,
  CheckCircle2,
  Flame,
  Recycle,
  Beaker,
  Sprout,
  Factory,
  Wheat,
  Loader2,
  AlertTriangle,
  Award,
  TreePine,
  TrendingUp,
  Target,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  fetchTreatmentRecommendations,
  calculateTreatmentImpact,
} from "@/lib/api";
import type { TTreatmentMethod } from "@/types";
import { getTranslatedMethodDescription, getTranslatedMethodName } from "@/lib/utils";

interface TreatmentMethodsDialogProps {
  isOpen: boolean;
  wasteType: "plastic" | "organic" | null;
  amount: number;
  onClose: () => void;
}

interface TreatmentMethodWithImpact extends TTreatmentMethod {
  energyGenerated: number;
  financialGain: number;
  carbonReduced: number;
  wasteProcessed: number;
  isBest?: boolean;
}

export function TreatmentMethodsDialog({
  isOpen,
  wasteType,
  amount,
  onClose,
}: TreatmentMethodsDialogProps) {
  const t = useTranslations("treatmentMethods");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [methods, setMethods] = useState<TreatmentMethodWithImpact[]>([]);
  const [recommendations, setRecommendations] = useState<{
    mostEfficient: TTreatmentMethod | null;
    mostProfitable: TTreatmentMethod | null;
    mostEcoFriendly: TTreatmentMethod | null;
    bestOverall: TTreatmentMethod | null;
  } | null>(null);

  // Fetch treatment methods and calculate impacts
  useEffect(() => {
    if (!isOpen || !wasteType || amount <= 0) return;

    const fetchTreatmentData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch recommendations from API
        const recs = await fetchTreatmentRecommendations(wasteType);
        setRecommendations(recs);

        // Calculate impact for each method using the correct API with updated formulas
        const methodsWithImpact = await Promise.all(
          recs.allMethods.map(async (method) => {
            try {
              const impact = await calculateTreatmentImpact(method.id, amount);
              return {
                ...method,
                energyGenerated: impact.energyGenerated,
                financialGain: impact.financialGain,
                carbonReduced: impact.carbonReduced,
                wasteProcessed: impact.wasteProcessed,
                isBest: recs.bestOverall?.id === method.id, // Use best overall method (weighted scoring)
              };
            } catch (err) {
              console.error(
                `Error calculating impact for method ${method.id}:`,
                err
              );
              // Return null for failed calculations to filter them out
              return null;
            }
          })
        );

        // Filter out failed calculations and sort by weighted score (best first)
        const validMethods = methodsWithImpact.filter(
          (method) => method !== null
        ) as TreatmentMethodWithImpact[];

        // Sort by best overall method first, then by weighted score
        validMethods.sort((a, b) => {
          if (a.isBest && !b.isBest) return -1;
          if (!a.isBest && b.isBest) return 1;

          // If neither is best or both are best, sort by weighted score
          const scoreA =
            a.efficiency * 0.25 +
            a.financialGain * 0.25 +
            a.carbonReduced * 0.35 +
            a.energyGenerated * 0.15;
          const scoreB =
            b.efficiency * 0.25 +
            b.financialGain * 0.25 +
            b.carbonReduced * 0.35 +
            b.energyGenerated * 0.15;
          return scoreB - scoreA;
        });

        setMethods(validMethods);
      } catch (err) {
        console.error("Error fetching treatment data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch treatment data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTreatmentData();
  }, [isOpen, wasteType, amount]);

  const getMethodIcon = (methodName: string) => {
    const name = methodName.toLowerCase();
    if (name.includes("incineration") || name.includes("pyrolysis"))
      return Flame;
    if (name.includes("mechanical") || name.includes("recycling"))
      return Recycle;
    if (name.includes("chemical")) return Beaker;
    if (name.includes("composting")) return Sprout;
    if (name.includes("biogas") || name.includes("anaerobic")) return Factory;
    if (name.includes("feed")) return Wheat;
    return Recycle;
  };

  // Calculate max values for progress bars
  const maxEnergy = Math.max(...methods.map((m) => m.energyGenerated));
  const maxFinancial = Math.max(...methods.map((m) => m.financialGain));
  const maxCarbon = Math.max(...methods.map((m) => m.carbonReduced));

  if (!isOpen || !wasteType) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-y-auto border-0 shadow-xl"
        style={{ backgroundColor: "var(--dark-green-primary)" }}
      >
        <DialogHeader className="border-b border-white/20 pb-6">
          <DialogTitle className="flex items-center gap-3 text-white text-xl font-semibold">
            <div
              className="p-3 rounded-lg"
              style={{ backgroundColor: "var(--light-cream)" }}
            >
              {wasteType === "plastic" ? (
                <Recycle className="h-6 w-6 text-[var(--dark-green-primary)]" />
              ) : (
                <TreePine className="h-6 w-6 text-[var(--dark-green-primary)]" />
              )}
            </div>
            {t("title")} -{" "}
            {t(`wasteTypes.${wasteType || "plastic"}`)} {t("subtitle")}
          </DialogTitle>
          <DialogDescription className="text-[var(--light-cream)] opacity-90">
            {t("description", {
              amount: amount.toLocaleString(),
              wasteType: t(`wasteTypes.${wasteType || "plastic"}`),
            })}
            {recommendations?.bestOverall && (
              <span className="text-white font-medium">
                {" "}
                • {t("recommended")}: {recommendations.bestOverall.name}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-6 pb-2">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-gray-300" />
              <span className="ml-2 text-gray-300">
                {t("loadingAnalysis")}
              </span>
            </div>
          )}

          {error && (
            <div
              className="flex items-center gap-2 p-4 border border-beige-border rounded-lg"
              style={{ backgroundColor: "var(--light-cream)" }}
            >
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <p className="font-medium text-red-800">
                  {t("errorLoadingData")}
                </p>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && methods.length === 0 && (
            <div className="text-center py-8 text-gray-300">
              {t("noMethodsAvailable", {
                wasteType: t(`wasteTypes.${wasteType || "plastic"}`),
              })}
            </div>
          )}

          {!loading &&
            !error &&
            methods.map((method) => {
              const IconComponent = getMethodIcon(method.name);

              return (
                <Card
                  key={method.id}
                  className="relative bg-[var(--light-cream)] border-[var(--beige-border)] shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                >
                  {method.isBest && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <Badge className="bg-[var(--dark-green-primary)] text-white flex items-center gap-1 shadow-md px-3 py-1 rounded-full">
                        <Award className="h-3 w-3" />
                        {t("recommended")}
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pb-4 border-b border-[var(--beige-border)]">
                    <CardTitle className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-[var(--dark-green-primary)] shadow-md">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[var(--dark-green-primary)] mb-1">
                          {getTranslatedMethodName(method.name, t)}
                        </h3>
                        <p className="text-sm text-[var(--dark-green-secondary)] opacity-80 leading-relaxed">
                          {getTranslatedMethodDescription(method.name, t) || method.description}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <Badge
                            variant="outline"
                            className="text-xs border-[var(--dark-green-primary)] text-[var(--dark-green-primary)] bg-white/70 px-2 py-1"
                          >
                            <Target className="h-3 w-3 mr-1" />
                            {t("efficiencyLabel", { efficiency: method.efficiency })}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs border-[var(--dark-green-secondary)] text-[var(--dark-green-secondary)] bg-white/70 px-2 py-1"
                          >
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {method.wasteProcessed?.toFixed(1)} {t("processed")}
                          </Badge>
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Energy Output */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-amber-100 rounded-lg">
                            <Zap className="h-4 w-4 text-amber-600" />
                          </div>
                          <span className="text-sm font-semibold text-[var(--dark-green-primary)]">
                            {t("energyGenerated")}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-bold text-[var(--dark-green-primary)]">
                              {method.energyGenerated.toFixed(1)} kWh
                            </span>
                            <span className="text-[var(--dark-green-secondary)]">
                              {method.energyOutput?.toFixed(1)} kWh/kg
                            </span>
                          </div>
                          <Progress
                            value={
                              maxEnergy > 0
                                ? (method.energyGenerated / maxEnergy) * 100
                                : 0
                            }
                            className="h-3 bg-[var(--medium-cream)]"
                          />
                        </div>
                      </div>

                      {/* Financial Gain */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-green-100 rounded-lg">
                            <DollarSign className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="text-sm font-semibold text-[var(--dark-green-primary)]">
                            {t("financialGain")}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-bold text-[var(--dark-green-primary)]">
                              {method.financialGain.toFixed(0)} SAR
                            </span>
                            <span className="text-[var(--dark-green-secondary)]">
                              {method.financialGain > 0
                                ? (
                                    method.financialGain / method.wasteProcessed
                                  ).toFixed(2)
                                : "0.00"}{" "}
                              SAR/kg
                            </span>
                          </div>
                          <Progress
                            value={
                              maxFinancial > 0
                                ? (method.financialGain / maxFinancial) * 100
                                : 0
                            }
                            className="h-3 bg-[var(--medium-cream)]"
                          />
                        </div>
                      </div>

                      {/* Carbon Footprint Reduction */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-emerald-100 rounded-lg">
                            <Leaf className="h-4 w-4 text-emerald-600" />
                          </div>
                          <span className="text-sm font-semibold text-[var(--dark-green-primary)]">
                            {t("carbonFootprintReduction")}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-bold text-[var(--dark-green-primary)]">
                              {method.carbonReduced.toFixed(1)} kg CO₂
                            </span>
                            <span className="text-[var(--dark-green-secondary)]">
                              {method.carbonReduction.toFixed(1)} kg CO₂/kg
                            </span>
                          </div>
                          <Progress
                            value={
                              maxCarbon > 0
                                ? (method.carbonReduced / maxCarbon) * 100
                                : 0
                            }
                            className="h-3 bg-[var(--medium-cream)]"
                          />
                        </div>
                      </div>
                    </div>

                    {method.isBest && (
                      <div className="mt-6 p-4 bg-gradient-to-r from-[var(--dark-green-primary)] to-[var(--dark-green-secondary)] rounded-xl shadow-md">
                        <div className="flex items-center gap-3 text-white">
                          <div className="p-1.5 bg-white/20 rounded-lg">
                            <Award className="h-4 w-4" />
                          </div>
                          <span className="font-bold">{t("recommendedChoice")}</span>
                        </div>
                        <p className="text-sm text-white/90 mt-2 leading-relaxed">
                          {t("recommendedDescription", {
                            amount: method.wasteProcessed.toFixed(1),
                            wasteType: t(`wasteTypes.${wasteType || "plastic"}`),
                          })}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
