"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Calculator,
  Zap,
  DollarSign,
  Leaf,
  Loader2,
  TrendingUp,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  calculateTreatmentImpact,
  calculateBaselinePotential,
} from "@/lib/api";
import { useTreatmentMethods } from "@/hooks/use-treatment-methods";
import { useDashboardTranslations } from "@/hooks/use-translations";
import { useTranslations } from "next-intl";
import type { TTreatmentMethod } from "@/types";
import { getTranslatedMethodName } from "@/lib/utils";

const formSchema = z.object({
  wasteType: z.enum(["plastic", "organic"]),
  weight: z.string().min(1, "Weight is required"),
  treatmentMethod: z.string().min(1, "Treatment method is required"),
});

type FormData = z.infer<typeof formSchema>;

interface CalculatorResult {
  energyGenerated: number;
  financialGain: number;
  carbonReduced: number;
  wasteProcessed: number;
  method: TTreatmentMethod;
}

interface BaselinePotential {
  energyGenerated: number;
  financialGain: number;
  carbonReduced: number;
  description: string;
}

export function WasteCalculator() {
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [baseline, setBaseline] = useState<BaselinePotential | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { methodsByType, loading: methodsLoading } = useTreatmentMethods();
  const t = useDashboardTranslations();
  const tMethods = useTranslations("treatmentMethods");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wasteType: "plastic",
      weight: "",
      treatmentMethod: "",
    },
  });

  const selectedWasteType = form.watch("wasteType");

  // Get treatment methods for the selected waste type
  const getTreatmentMethods = () => {
    const methods = methodsByType.get(selectedWasteType) || [];
    return methods.map((method) => ({
      value: method.id,
      name: method.name,
      description: method.description,
      efficiency: method.efficiency,
    }));
  };

  // Reset treatment method when waste type changes
  useEffect(() => {
    const methods = methodsByType.get(selectedWasteType) || [];
    if (methods.length > 0) {
      // Set the first available treatment method as default
      form.setValue("treatmentMethod", methods[0].id);
    } else {
      form.setValue("treatmentMethod", "");
    }
    setResult(null);
    setBaseline(null);
  }, [selectedWasteType, form, methodsByType]);

  const onSubmit = async (data: FormData) => {
    setIsCalculating(true);

    try {
      const weight = parseFloat(data.weight);
      if (isNaN(weight) || weight <= 0) {
        form.setError("weight", { message: t("calculator.validWeight") });
        return;
      }

      // Get the selected treatment method details
      const methods = methodsByType.get(data.wasteType) || [];
      const selectedMethod = methods.find((m) => m.id === data.treatmentMethod);

      if (!selectedMethod) {
        form.setError("treatmentMethod", {
          message: t("calculator.invalidTreatmentMethod"),
        });
        return;
      }

      // Calculate baseline potential
      const baselinePotential = await calculateBaselinePotential(
        data.wasteType,
        weight
      );
      setBaseline(baselinePotential);

      // Calculate impact using the correct API with updated formulas
      const impact = await calculateTreatmentImpact(
        data.treatmentMethod,
        weight
      );

      setResult({
        energyGenerated: impact.energyGenerated,
        financialGain: impact.financialGain,
        carbonReduced: impact.carbonReduced,
        wasteProcessed: impact.wasteProcessed,
        method: selectedMethod,
      });
    } catch (error) {
      console.error("Calculation error:", error);
      form.setError("root", {
        message: t("calculator.calculationError"),
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const formatNumber = (num: number, decimals: number = 2) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  };

  return (
    <div className="space-y-6">
      <Card className="border border-outline bg-surface shadow-sm">
        <CardHeader className="bg-surface">
          <CardTitle className="flex items-center gap-2 text-primary">
            <Calculator className="h-5 w-5" />
            {t("calculator.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="wasteType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-medium block mb-2">
                        {t("calculator.wasteType")}
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          form.setValue("treatmentMethod", "");
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-surface-200 border-outline text-primary hover:bg-surface-200/80 cursor-pointer [&>span]:text-primary [&[data-placeholder]>span]:text-primary/50">
                            <SelectValue placeholder={t("calculator.selectWasteType")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="plastic">
                            {t("calculator.plastic")}
                          </SelectItem>
                          <SelectItem value="organic">
                            {t("calculator.organic")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-medium block mb-2">
                        {t("calculator.weight")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          min="0"
                          placeholder={t('calculator.enterWeight')}
                          className="bg-surface-200 border-outline text-primary placeholder:text-primary/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="treatmentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-medium block mb-2">
                      {t("calculator.treatmentMethod")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={methodsLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-surface-200 border-outline text-primary hover:bg-surface-200/80 cursor-pointer [&>span]:text-primary [&[data-placeholder]>span]:text-primary/50">
                          <SelectValue
                            placeholder={
                              methodsLoading
                                ? t("calculator.loadingMethods")
                                : getTreatmentMethods().length === 0
                                  ? t("calculator.noMethodsAvailable")
                                  : t("calculator.selectTreatmentMethod")
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {!methodsLoading &&
                          getTreatmentMethods().length === 0 && (
                            <SelectItem value="no-methods" disabled>
                              {t("calculator.noMethodsAvailable")}
                            </SelectItem>
                          )}
                        {getTreatmentMethods().map((method) => (
                          <SelectItem key={method.value} value={method.value}>
                            {getTranslatedMethodName(method.name, tMethods)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                    {methodsLoading && (
                      <p className="text-sm text-primary/70">
                        {t("calculator.loadingTreatmentMethods")}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-secondary text-surface-200 border-0 hover:bg-secondary/90"
                disabled={isCalculating || methodsLoading}
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("calculator.calculating")}
                  </>
                ) : (
                  t("calculator.calculateImpact")
                )}
              </Button>
            </form>
          </Form>

          {/* Baseline Potential Display */}
          {baseline && (
            <Card className="bg-surface border-outline border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <TrendingUp className="h-5 w-5" />
                  {t("calculator.baselinePotential")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="bg-surface-200 p-3 border border-outline rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-primary">
                          {t("calculator.energyGenerated")}
                        </p>
                        <p className="text-lg font-bold text-primary">
                          {formatNumber(baseline.energyGenerated)}
                        </p>
                        <p className="text-xs text-primary/70">kWh</p>
                      </div>
                      <Zap className="h-6 w-6 text-yellow-500" />
                    </div>
                  </div>
                  <div className="bg-surface-200 p-3 border border-outline rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-primary">
                          {t("calculator.financialGain")}
                        </p>
                        <p className="text-lg font-bold text-primary">
                          {formatNumber(baseline.financialGain)}
                        </p>
                        <p className="text-xs text-primary/70">SAR</p>
                      </div>
                      <DollarSign className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                  <div className="bg-surface-200 p-3 border border-outline rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-primary">
                          {t("calculator.carbonReduction")}
                        </p>
                        <p className="text-lg font-bold text-primary">
                          {formatNumber(baseline.carbonReduced)}
                        </p>
                        <p className="text-xs text-primary/70">kg CO₂</p>
                      </div>
                      <Leaf className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Treatment Results */}
          {result && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-primary">
                  {t("calculator.treatmentResults")}
                </h3>
                <div className="text-sm text-primary">
                  {t("calculator.using")} {getTranslatedMethodName(result.method.name, tMethods)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <Card className="border border-outline bg-surface-200 rounded-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-primary">
                          {t("calculator.energyGenerated")}
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          {formatNumber(result.energyGenerated)}
                        </p>
                        <p className="text-sm text-primary/70">kWh</p>
                        {baseline && (
                          <p className="text-xs text-primary/70">
                            {(
                              (result.energyGenerated /
                                baseline.energyGenerated) *
                              100
                            ).toFixed(1)}
                            {t("calculator.ofBaseline")}
                          </p>
                        )}
                      </div>
                      <Zap className="h-8 w-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-outline bg-surface-200 rounded-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-primary">
                          {t("calculator.financialGain")}
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          {formatNumber(result.financialGain)}
                        </p>
                        <p className="text-sm text-primary/70">SAR</p>
                        {baseline && (
                          <p className="text-xs text-primary/70">
                            {(
                              (result.financialGain / baseline.financialGain) *
                              100
                            ).toFixed(1)}
                            {t("calculator.ofBaseline")}
                          </p>
                        )}
                      </div>
                      <DollarSign className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-outline bg-surface-200 rounded-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-primary">
                          {t("calculator.carbonReduction")}
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          {formatNumber(result.carbonReduced)}
                        </p>
                        <p className="text-sm text-primary/70">kg CO₂</p>
                        {baseline && (
                          <p className="text-xs text-primary/70">
                            {(
                              (result.carbonReduced / baseline.carbonReduced) *
                              100
                            ).toFixed(1)}
                            {t("calculator.ofBaseline")}
                          </p>
                        )}
                      </div>
                      <Leaf className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border border-outline bg-surface">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2 text-primary">
                    {t("calculator.processingDetails")}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-primary">
                        {t("calculator.methodEfficiency")}
                      </span>
                      <span className="font-medium text-primary">
                        {result.method.efficiency}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary">
                        {t("calculator.wasteProcessed")}
                      </span>
                      <span className="font-medium text-primary">
                        {formatNumber(result.wasteProcessed)} kg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary">
                        {t("calculator.energyPerKg")}
                      </span>
                      <span className="font-medium text-primary">
                        {formatNumber(
                          result.energyGenerated / result.wasteProcessed
                        )}{" "}
                        kWh/kg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary">
                        {t("calculator.revenuePerKg")}
                      </span>
                      <span className="font-medium text-primary">
                        {formatNumber(
                          result.financialGain / result.wasteProcessed
                        )}{" "}
                        SAR/kg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary">
                        {t("calculator.carbonPerKg")}
                      </span>
                      <span className="font-medium text-primary">
                        {formatNumber(
                          result.carbonReduced / result.wasteProcessed
                        )}{" "}
                        kg CO₂/kg
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comparison with Baseline */}
              {baseline && (
                <Card className="bg-surface border-outline">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2 text-primary">
                      {t("calculator.comparisonBaseline")}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-primary">
                          {t("calculator.energyEfficiency")}
                        </span>
                        <span
                          className={`font-medium ${
                            result.energyGenerated >= baseline.energyGenerated
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {result.energyGenerated >= baseline.energyGenerated
                            ? "+"
                            : ""}
                          {formatNumber(
                            result.energyGenerated - baseline.energyGenerated
                          )}{" "}
                          kWh
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary">
                          {t("calculator.financialImpact")}
                        </span>
                        <span
                          className={`font-medium ${
                            result.financialGain >= baseline.financialGain
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {result.financialGain >= baseline.financialGain
                            ? "+"
                            : ""}
                          {formatNumber(
                            result.financialGain - baseline.financialGain
                          )}{" "}
                          SAR
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary">
                          {t("calculator.carbonImpact")}
                        </span>
                        <span
                          className={`font-medium ${
                            result.carbonReduced >= baseline.carbonReduced
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {result.carbonReduced >= baseline.carbonReduced
                            ? "+"
                            : ""}
                          {formatNumber(
                            result.carbonReduced - baseline.carbonReduced
                          )}{" "}
                          kg CO₂
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
