import {
  CalculatorInput,
  CalculatorResult,
  PlasticTreatmentMethod,
  OrganicTreatmentMethod,
} from "@/types";

export class WasteCalculatorService {
  // Plastic treatment methods
  static calculatePlasticUntreated(wasteKg: number): CalculatorResult {
    return {
      energyOutput: wasteKg * 10.0, // 36 MJ/kg × 0.2778
      financialGain: wasteKg * 0.94, // 0.25 USD × 3.75 SAR/USD
      carbonReduction: wasteKg * 1.0,
      unit: "kWh",
    };
  }

  static calculatePlasticIncineration(wasteKg: number): CalculatorResult {
    const energyOutput = wasteKg * 2.5; // 25% conversion efficiency
    return {
      energyOutput,
      financialGain: energyOutput * 0.048, // 0.18 SAR/kWh converted to USD rate
      carbonReduction: wasteKg * 1.0,
      unit: "kWh",
    };
  }

  static calculatePlasticPyrolysis(wasteKg: number): CalculatorResult {
    const oilWeight = wasteKg * 0.6; // 60% oil yield
    const litersOfOil = oilWeight / 0.85; // density 0.85 kg/L
    const energyOutput = oilWeight * (44 / 3.6); // 44 MJ/kg oil converted to kWh
    return {
      energyOutput,
      financialGain: litersOfOil * 0.60 * 3.75, // 0.60 USD/L × 3.75 SAR/USD
      carbonReduction: wasteKg * 2.8,
      unit: "kWh",
      additionalData: {
        litersOfOil,
      },
    };
  }

  static calculatePlasticMechanicalRecycling(wasteKg: number): CalculatorResult {
    const energySaved = wasteKg * 5.0; // Energy saved from virgin production
    return {
      energyOutput: energySaved,
      financialGain: wasteKg * 0.30 * 3.75, // 0.30 USD/kg × 3.75 SAR/USD
      carbonReduction: wasteKg * 1.8,
      unit: "kWh",
      additionalData: {
        energySaved,
      },
    };
  }

  // Organic treatment methods
  static calculateOrganicGeneral(wasteKg: number): CalculatorResult {
    return {
      energyOutput: wasteKg * 0.6,
      financialGain: wasteKg * 0.2 * 3.75, // 0.2 USD/kg × 3.75 SAR/USD
      carbonReduction: wasteKg * 1.0,
      unit: "kWh",
    };
  }

  static calculateOrganicComposting(wasteKg: number): CalculatorResult {
    return {
      energyOutput: 0, // No energy generation
      financialGain: wasteKg * 0.05 * 3.75, // 0.05 USD/kg × 3.75 SAR/USD
      carbonReduction: wasteKg * 0.2, // Conservative estimate
      unit: "kWh",
    };
  }

  static calculateOrganicAnaerobicDigestion(wasteKg: number): CalculatorResult {
    return {
      energyOutput: wasteKg * 0.8, // Biogas energy recovery
      financialGain: wasteKg * 0.10 * 3.75, // 0.10 USD/kg × 3.75 SAR/USD
      carbonReduction: wasteKg * 1.0,
      unit: "kWh",
    };
  }

  static calculateOrganicAnimalFeed(wasteKg: number): CalculatorResult {
    return {
      energyOutput: 0, // No energy generation
      financialGain: wasteKg * 0.15 * 3.75, // 0.15 USD/kg × 3.75 SAR/USD
      carbonReduction: wasteKg * 1.2,
      unit: "kWh",
    };
  }

  // Main calculation method
  static calculate(input: CalculatorInput): CalculatorResult {
    const { wasteType, weight, treatmentMethod } = input;

    if (wasteType === "plastic") {
      switch (treatmentMethod as PlasticTreatmentMethod) {
        case PlasticTreatmentMethod.UNTREATED:
          return this.calculatePlasticUntreated(weight);
        case PlasticTreatmentMethod.INCINERATION:
          return this.calculatePlasticIncineration(weight);
        case PlasticTreatmentMethod.PYROLYSIS:
          return this.calculatePlasticPyrolysis(weight);
        case PlasticTreatmentMethod.MECHANICAL_RECYCLING:
          return this.calculatePlasticMechanicalRecycling(weight);
        default:
          return this.calculatePlasticUntreated(weight);
      }
    } else {
      switch (treatmentMethod as OrganicTreatmentMethod) {
        case OrganicTreatmentMethod.GENERAL:
          return this.calculateOrganicGeneral(weight);
        case OrganicTreatmentMethod.COMPOSTING:
          return this.calculateOrganicComposting(weight);
        case OrganicTreatmentMethod.ANAEROBIC_DIGESTION:
          return this.calculateOrganicAnaerobicDigestion(weight);
        case OrganicTreatmentMethod.ANIMAL_FEED:
          return this.calculateOrganicAnimalFeed(weight);
        default:
          return this.calculateOrganicGeneral(weight);
      }
    }
  }

  // Helper methods for treatment method options
  static getPlasticTreatmentMethods() {
    return [
      {
        name: "Untreated (Baseline Potential)",
        description: "Maximum potential value before treatment - theoretical energy content",
        value: PlasticTreatmentMethod.UNTREATED,
      },
      {
        name: "Incineration/Waste-to-Energy",
        description: "High-temperature burning in WTE facilities to recover electricity",
        value: PlasticTreatmentMethod.INCINERATION,
      },
      {
        name: "Pyrolysis",
        description: "Thermal decomposition to produce oil with 60% yield from polypropylene",
        value: PlasticTreatmentMethod.PYROLYSIS,
      },
      {
        name: "Mechanical Recycling",
        description: "Physical processing to create new plastic products without chemical changes",
        value: PlasticTreatmentMethod.MECHANICAL_RECYCLING,
      },
    ];
  }

  static getOrganicTreatmentMethods() {
    return [
      {
        name: "General Utilization",
        description: "General estimate for organic waste utilization potential",
        value: OrganicTreatmentMethod.GENERAL,
      },
      {
        name: "Composting",
        description: "Natural decomposition process to create nutrient-rich soil amendment",
        value: OrganicTreatmentMethod.COMPOSTING,
      },
      {
        name: "Anaerobic Digestion",
        description: "Anaerobic digestion to produce renewable biogas energy and digestate",
        value: OrganicTreatmentMethod.ANAEROBIC_DIGESTION,
      },
      {
        name: "Animal Feed Processing",
        description: "Processing food waste into animal feed to displace traditional feed production",
        value: OrganicTreatmentMethod.ANIMAL_FEED,
      },
    ];
  }
}
