"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Zap, DollarSign, Leaf, LucideIcon } from "lucide-react";
import { useDashboardTranslations } from "@/hooks/use-translations";

interface WasteCardProps {
  title: string;
  icon: LucideIcon;
  amount: number;
  badgeText: string;
  energyValue: number;
  financialValue: number;
  carbonValue: number;
  description?: string;
  treatmentOptions?: string[];
  onClick?: () => void;
  showEnvironmentalImpact?: boolean;
  variant?: "default" | "plastic" | "organic" | "total";
}

export function WasteCard({
  title,
  icon: Icon,
  amount,
  badgeText,
  energyValue,
  financialValue,
  carbonValue,
  description,
  treatmentOptions,
  onClick,
  showEnvironmentalImpact = false,
  variant = "default",
}: WasteCardProps) {
  const isClickable = !!onClick;
  const t = useDashboardTranslations();

  // Color variants using our new professional color palette
  const getVariantClasses = (variant: string) => {
    switch (variant) {
      case "total":
        return {
          border: "",
          borderColor: "",
          title: "text-primary",
          body: "text-primary",
          badge: "bg-orange-200/90 text-primary",
          treatment: "bg-surface-200/50 text-primary",
          card: "bg-surface-50/90", // Lightest beige
        };
      case "plastic":
        return {
          border: "",
          borderColor: "",
          title: "text-amber-900",
          body: "text-amber-800",
          badge: "bg-orange-200/90 text-primary",
          treatment: "bg-surface-300/60 text-primary",
          card: "bg-amber-50/90", // Medium beige
        };
      case "organic":
        return {
          border: "",
          borderColor: "",
          title: "text-green-900",
          body: "text-green-800",
          badge: "bg-orange-200/90 text-primary ",
          treatment: "bg-surface-400/70 text-primary",
          card: "bg-green-50/80", // Deepest beige
        };
      default:
        return {
          border: "",
          borderColor: "border-outline",
          title: "text-primary",
          badge: "bg-orange-200/90 text-primary",
          treatment: "bg-surface text-primary",
          card: "bg-surface",
        };
    }
  };

  const variantClasses = getVariantClasses(variant);
  const descriptionText = description;

  return (
    <Card 
      className={`
        flex-1 flex flex-col transition-all duration-200 shadow-sm ${variantClasses.border} ${variantClasses.borderColor} ${variantClasses.card}
        ${
          isClickable ? "cursor-pointer hover:shadow-lg hover:scale-[1.02]" : ""
        }
      `}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <CardTitle
          className={`flex items-center gap-2 ${variantClasses.title}`}
        >
          <Icon className={`h-5 w-5 ${variantClasses.title}`} />
          {title}
        </CardTitle>
        {descriptionText && (
          <p className={`text-sm ${variantClasses.body} leading-relaxed`}>
            {descriptionText}
          </p>
        )}
        {isClickable && (
          <p className={`text-sm font-bold ${variantClasses.title} leading-relaxed`}>
            {t("wasteDashboard.tapToExploreTreatmentStrategy")}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-0 flex-1 flex flex-col">
        <div className="flex-1"></div>

        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-primary mb-1 min-h-[3rem] flex items-center justify-center">
            {amount.toLocaleString()} kg
          </div>
          <Badge variant="outline" className={variantClasses.badge}>
            {badgeText}
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-0 text-sm">
          <div className="text-center p-2 bg-amber-100 border border-outline rounded-l-lg border-r-0">
            <div className="flex items-center justify-center gap-1 text-yellow-600 mb-1">
              <Zap className="h-3 w-3" />
            </div>
            <div className="font-semibold text-primary">
              {energyValue.toLocaleString()}
            </div>
            <div className="text-xs text-secondary">kWh</div>
          </div>
          <div className="text-center p-2 bg-lime-200/80 border border-outline border-r-0">
            <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
              <DollarSign className="h-3 w-3" />
            </div>
            <div className="font-semibold text-primary">
              {financialValue.toLocaleString()}
            </div>
            <div className="text-xs text-secondary">SAR</div>
          </div>
          <div className="text-center p-2 bg-green-200/80 border border-outline rounded-r-lg">
            <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
              <Leaf className="h-3 w-3" />
            </div>
            <div className="font-semibold text-primary">
              {carbonValue.toLocaleString()}
            </div>
            <div className="text-xs text-secondary">kg CO₂</div>
          </div>
        </div>

        {showEnvironmentalImpact && (
          <div className="flex items-center justify-center gap-1 text-primary bg-surface border border-outline px-3 py-1 rounded-full mt-4">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">Environmental Impact</span>
          </div>
        )}

        {treatmentOptions && (
          <div className="text-center mt-4">
            <div className="text-xs text-secondary mb-1">Treatment Options</div>
            <div className="flex flex-wrap gap-1 justify-center">
              {treatmentOptions.map((option, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 ${variantClasses.treatment} rounded text-xs`}
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
