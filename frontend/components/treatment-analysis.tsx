import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Zap,
  DollarSign,
  Leaf,
  Factory,
  Recycle,
  FlaskConical,
  BarChart3,
} from "lucide-react";
import type { TTreatmentMethod, TWasteBin } from "@/types";

interface TreatmentAnalysisProps {
  bin: TWasteBin;
  treatmentMethodsData: TTreatmentMethod[];
}

export function TreatmentAnalysis({ bin, treatmentMethodsData = [] }: TreatmentAnalysisProps) {
  const [showTreatmentAnalysis, setShowTreatmentAnalysis] = useState(false);

  // Check if bin type supports treatment analysis
  const supportsTraeatmentAnalysis =
    bin.wasteType === "Plastic" || bin.wasteType === "Organic";

  // Memoize the applicable treatment methods to avoid recalculation
  const applicableTreatmentMethods = useMemo(() => {
    const wasteTypeMap: Record<string, "plastic" | "organic"> = {
      Plastic: "plastic",
      Organic: "organic",
      "Food Waste": "organic",
    };

    const mappedType = wasteTypeMap[bin.wasteType];
    if (!mappedType) return [];

    return treatmentMethodsData
      .filter((method) => method.type === mappedType)
      .sort((a, b) => {
        // Sort by weighted score (efficiency 25%, profitability 25%, environmental impact 35%, energy generation 15%)
        const maxEfficiency = Math.max(...treatmentMethodsData.map(m => m.efficiency));
        const maxFinancial = Math.max(...treatmentMethodsData.map(m => m.financialGain));
        const maxCarbon = Math.max(...treatmentMethodsData.map(m => m.carbonReduction));
        const maxEnergy = Math.max(...treatmentMethodsData.map(m => m.energyOutput));
        
        const scoreA = 
          (a.efficiency / maxEfficiency) * 0.25 +
          (a.financialGain / maxFinancial) * 0.25 +
          (a.carbonReduction / maxCarbon) * 0.35 +
          (a.energyOutput / maxEnergy) * 0.15;
        
        const scoreB = 
          (b.efficiency / maxEfficiency) * 0.25 +
          (b.financialGain / maxFinancial) * 0.25 +
          (b.carbonReduction / maxCarbon) * 0.35 +
          (b.energyOutput / maxEnergy) * 0.15;
        
        return scoreB - scoreA;
      })
      .slice(0, 3); // Top 3 methods
  }, [bin.wasteType, treatmentMethodsData]);

  // Calculate metrics for current bin fill level
  const calculateMetrics = (treatmentMethod: TTreatmentMethod) => {
    // Estimate weight based on fill level (assuming average bin capacity of 50kg)
    const estimatedWeight = (bin.fillLevel / 100) * 50;

    return {
      energyOutput: (treatmentMethod.energyOutput * estimatedWeight).toFixed(1),
      financialGain: (treatmentMethod.financialGain * estimatedWeight).toFixed(2),
      carbonReduction: (treatmentMethod.carbonReduction * estimatedWeight).toFixed(1),
      weight: estimatedWeight.toFixed(1),
    };
  };

  const getMethodIcon = (methodName: string) => {
    switch (methodName.toLowerCase()) {
      case "incineration":
        return <Factory className="h-5 w-5" />;
      case "mechanical recycling":
        return <Recycle className="h-5 w-5" />;
      case "chemical recycling":
        return <FlaskConical className="h-5 w-5" />;
      case "composting":
        return <Leaf className="h-5 w-5" />;
      case "biogas production":
        return <Zap className="h-5 w-5" />;
      case "pyrolysis":
        return <Factory className="h-5 w-5" />;
      default:
        return <Recycle className="h-5 w-5" />;
    }
  };

  if (!supportsTraeatmentAnalysis) {
    return null;
  }

  return (
    <div className="mt-6 bg-primary">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Recycle className="h-5 w-5" />
          Treatment Analysis
        </h3>
        <Button
          variant={showTreatmentAnalysis ? "default" : "outline"}
          size="sm"
          onClick={() => setShowTreatmentAnalysis(!showTreatmentAnalysis)}
        >
          {showTreatmentAnalysis ? "Hide Analysis" : "Show Analysis"}
        </Button>
      </div>

      {/* Quick Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center bg-primary">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">Expected Energy Output</span>
            </div>
            <div className="text-2xl font-bold text-yellow-600">
              {applicableTreatmentMethods.length > 0
                ? `${calculateMetrics(applicableTreatmentMethods[0]).energyOutput} kWh`
                : "N/A"}
            </div>
            <div className="text-sm text-gray-500">From best method</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <span className="font-medium">Estimated Financial Gain</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {applicableTreatmentMethods.length > 0
                ? `${calculateMetrics(applicableTreatmentMethods[0]).financialGain} SAR`
                : "N/A"}
            </div>
            <div className="text-sm text-gray-500">From best method</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Leaf className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Expected Carbon Footprint Reduction</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {applicableTreatmentMethods.length > 0
                ? `${calculateMetrics(applicableTreatmentMethods[0]).carbonReduction} kg CO₂`
                : "N/A"}
            </div>
            <div className="text-sm text-gray-500">From best method</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Treatment Methods */}
      {showTreatmentAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 bg-primary">
              <BarChart3 className="h-5 w-5" />
              Top 3 Treatment Methods for {bin.wasteType} Waste
            </CardTitle>
            <div className="text-sm text-gray-600">
              Estimated weight:{" "}
              {applicableTreatmentMethods.length > 0
                ? `${calculateMetrics(applicableTreatmentMethods[0]).weight} kg`
                : "N/A"}{" "}
              (based on {bin.fillLevel}% fill level)
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {applicableTreatmentMethods.map((method, index) => {
                const metrics = calculateMetrics(method);
                return (
                  <Card
                    key={method.id}
                    className={`${
                      index === 0 ? "ring-2 ring-blue-200 bg-blue-50" : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getMethodIcon(method.name)}
                          <div>
                            <h4 className="font-semibold flex items-center gap-2">
                              {method.name}
                              {index === 0 && (
                                <Badge variant="default" className="text-xs">
                                  Recommended
                                </Badge>
                              )}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {method.description}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {method.efficiency}% Efficiency
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-yellow-50 rounded-lg">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Zap className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">Energy</span>
                          </div>
                          <div className="font-bold text-yellow-600">
                            {metrics.energyOutput} kWh
                          </div>
                          <div className="text-xs text-gray-500">
                            {method.energyOutput} kWh/kg
                          </div>
                        </div>

                        <div className="p-3 bg-primary rounded-lg">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <DollarSign className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium">Financial</span>
                          </div>
                          <div className="font-bold text-green-600">
                            {metrics.financialGain} SAR
                          </div>
                          <div className="text-xs text-gray-500">
                            {method.financialGain} SAR/kg
                          </div>
                        </div>

                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Leaf className="h-4 w-4 text-blue-500" />
                            <span className="text-sm font-medium">Carbon</span>
                          </div>
                          <div className="font-bold text-blue-600">
                            {metrics.carbonReduction} kg CO₂
                          </div>
                          <div className="text-xs text-gray-500">
                            {method.carbonReduction} kg/kg
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {applicableTreatmentMethods.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Recycle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <div className="font-medium mb-1">
                    No Treatment Methods Available
                  </div>
                  <div className="text-sm">
                    Treatment analysis is only available for Plastic and Organic
                    waste types.
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}