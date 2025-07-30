import { TreatmentMethod } from '../types/index.js';

/**
 * Service for managing treatment methods data and calculations
 * Based on real-world waste management formulas and Saudi Arabia market conditions
 */
export class TreatmentMethodsService {
  private treatmentMethods: TreatmentMethod[] = [
    // Plastic Treatment Methods
    {
      id: "plastic_untreated",
      name: "Untreated (Baseline Potential)",
      type: "plastic",
      energyOutput: 10.0, // kWh per kg (36 MJ/kg × 0.2778 conversion factor)
      financialGain: 1.50, // SAR per kg (updated Saudi plastic market rate 2025)
      carbonReduction: 2.5, // kg CO2 per kg waste (avoiding incineration/landfill emissions)
      efficiency: 100,
      description: "Maximum potential value before treatment - theoretical energy content and market sale value",
    },
    {
      id: "plastic_incineration",
      name: "Incineration/Waste-to-Energy",
      type: "plastic",
      energyOutput: 2.8, // kWh per kg (28% conversion efficiency from 36 MJ/kg - realistic WTE plant)
      financialGain: 0.45, // SAR per kg (energy revenue at 0.16 SAR/kWh Saudi rate)
      carbonReduction: 1.2, // kg CO2 per kg waste (net reduction after combustion emissions)
      efficiency: 88, // Real-world WTE plant efficiency
      description: "High-temperature burning in WTE facilities to recover electricity with emission controls",
    },
    {
      id: "plastic_pyrolysis",
      name: "Pyrolysis (Mixed Plastics)",
      type: "plastic",
      energyOutput: 6.8, // kWh per kg (updated for mixed plastics, not just PP)
      financialGain: 2.25, // SAR per kg (oil + char + gas products at current Saudi prices)
      carbonReduction: 3.2, // kg CO2 per kg waste (high reduction due to oil displacement)
      efficiency: 85, // Commercial pyrolysis plant efficiency
      description: "Thermal decomposition of mixed plastic waste to produce synthetic crude oil, char, and gas",
    },
    {
      id: "plastic_mechanical",
      name: "Mechanical Recycling",
      type: "plastic",
      energyOutput: 4.2, // kWh per kg (energy saved from virgin plastic production)
      financialGain: 1.80, // SAR per kg (recycled plastic pellet prices in Saudi market)
      carbonReduction: 2.1, // kg CO2 per kg waste (avoided virgin production emissions)
      efficiency: 78, // Realistic sorting and processing losses
      description: "Physical processing to create new plastic products - sorting, shredding, melting, pelletizing",
    },

    // Organic Treatment Methods
    {
      id: "organic_general",
      name: "General Utilization",
      type: "organic",
      energyOutput: 1.2, // kWh per kg (updated based on Saudi organic waste composition)
      financialGain: 0.95, // SAR per kg (compost + biogas potential in Saudi market)
      carbonReduction: 1.8, // kg CO2 per kg waste (methane avoidance from landfills)
      efficiency: 82,
      description: "General estimate for organic waste utilization potential in Saudi conditions",
    },
    {
      id: "organic_composting",
      name: "Aerobic Composting",
      type: "organic",
      energyOutput: 0.0, // kWh per kg (no direct energy generation)
      financialGain: 0.35, // SAR per kg (compost market value in Saudi Arabia)
      carbonReduction: 0.8, // kg CO2 per kg waste (conservative for aerobic process)
      efficiency: 85, // High efficiency for composting in controlled conditions
      description: "Controlled aerobic decomposition to create high-quality soil amendment and fertilizer",
    },
    {
      id: "organic_anaerobic",
      name: "Anaerobic Digestion",
      type: "organic",
      energyOutput: 1.8, // kWh per kg (biogas energy recovery - optimized for Saudi organic waste)
      financialGain: 0.65, // SAR per kg (energy + digestate sales)
      carbonReduction: 2.5, // kg CO2 per kg waste (high methane capture + avoided emissions)
      efficiency: 88, // Modern AD plant efficiency
      description: "Anaerobic digestion to produce renewable biogas energy and nutrient-rich digestate",
    },
    {
      id: "organic_animal_feed",
      name: "Animal Feed Processing",
      type: "organic",
      energyOutput: 0.0, // kWh per kg (no energy generation)
      financialGain: 0.85, // SAR per kg (processed feed value in Saudi livestock market)
      carbonReduction: 1.5, // kg CO2 per kg waste (displacing conventional feed production)
      efficiency: 75, // Processing losses and quality requirements
      description: "Processing suitable food waste into high-quality animal feed for livestock industry",
    },
    {
      id: "organic_black_soldier_fly",
      name: "Black Soldier Fly Larvae",
      type: "organic",
      energyOutput: 0.0, // kWh per kg (no direct energy)
      financialGain: 1.25, // SAR per kg (larvae protein + frass fertilizer - premium market)
      carbonReduction: 2.0, // kg CO2 per kg waste (protein displacement + rapid processing)
      efficiency: 80, // BSF processing efficiency
      description: "Bioconversion using black soldier fly larvae to produce protein meal and organic fertilizer",
    },
  ];

  // Getter methods
  getTreatmentMethods(): TreatmentMethod[] {
    return this.treatmentMethods;
  }

  getTreatmentMethodsByType(wasteType: string): TreatmentMethod[] {
    return this.treatmentMethods.filter(method => method.type.toLowerCase() === wasteType.toLowerCase());
  }

  getTreatmentMethodById(id: string): TreatmentMethod | undefined {
    return this.treatmentMethods.find(method => method.id === id);
  }

  // Method to get the most efficient treatment method for a waste type
  getMostEfficientTreatmentMethod(wasteType: string): TreatmentMethod | undefined {
    const methods = this.getTreatmentMethodsByType(wasteType);
    if (methods.length === 0) return undefined;
    return methods.reduce((best, current) => 
      current.efficiency > best.efficiency ? current : best
    );
  }

  // Method to get the most financially beneficial treatment method for a waste type
  getMostProfitableTreatmentMethod(wasteType: string): TreatmentMethod | undefined {
    const methods = this.getTreatmentMethodsByType(wasteType);
    if (methods.length === 0) return undefined;
    return methods.reduce((best, current) => 
      current.financialGain > best.financialGain ? current : best
    );
  }

  // Method to get the most environmentally friendly treatment method for a waste type
  getMostEcoFriendlyTreatmentMethod(wasteType: string): TreatmentMethod | undefined {
    const methods = this.getTreatmentMethodsByType(wasteType);
    if (methods.length === 0) return undefined;
    return methods.reduce((best, current) => 
      current.carbonReduction > best.carbonReduction ? current : best
    );
  }

  // Method to calculate treatment impact for a given amount of waste
  calculateTreatmentImpact(treatmentMethodId: string, wasteAmount: number): {
    energyGenerated: number;
    financialGain: number;
    carbonReduced: number;
    wasteProcessed: number;
  } {
    const method = this.getTreatmentMethodById(treatmentMethodId);
    if (!method) {
      throw new Error(`Treatment method with ID ${treatmentMethodId} not found`);
    }

    // Calculate actual waste processed based on efficiency
    const wasteProcessed = (wasteAmount * method.efficiency) / 100;

    // Calculate based on processed amount using method's base rates
    const energyGenerated = wasteProcessed * method.energyOutput;
    const financialGain = wasteProcessed * method.financialGain;
    const carbonReduced = wasteProcessed * method.carbonReduction;

    return {
      energyGenerated: Math.round(energyGenerated * 100) / 100,
      financialGain: Math.round(financialGain * 100) / 100,
      carbonReduced: Math.round(carbonReduced * 100) / 100,
      wasteProcessed: Math.round(wasteProcessed * 100) / 100,
    };
  }

  // Method to get treatment recommendations for a waste type
  getTreatmentRecommendations(wasteType: string): {
    mostEfficient: TreatmentMethod | undefined;
    mostProfitable: TreatmentMethod | undefined;
    mostEcoFriendly: TreatmentMethod | undefined;
    allMethods: TreatmentMethod[];
  } {
    return {
      mostEfficient: this.getMostEfficientTreatmentMethod(wasteType),
      mostProfitable: this.getMostProfitableTreatmentMethod(wasteType),
      mostEcoFriendly: this.getMostEcoFriendlyTreatmentMethod(wasteType),
      allMethods: this.getTreatmentMethodsByType(wasteType),
    };
  }

  // Method to simulate treatment method performance over time
  simulateTreatmentPerformance(treatmentMethodId: string, days: number = 30): Array<{
    day: number;
    efficiency: number;
    energyOutput: number;
    financialGain: number;
    carbonReduction: number;
  }> {
    const method = this.getTreatmentMethodById(treatmentMethodId);
    if (!method) {
      throw new Error(`Treatment method with ID ${treatmentMethodId} not found`);
    }

    const performance = [];
    for (let day = 1; day <= days; day++) {
      // Simulate slight variations in performance
      const efficiencyVariation = 0.95 + (Math.random() * 0.1); // ±5% variation
      const currentEfficiency = method.efficiency * efficiencyVariation;
      
      performance.push({
        day,
        efficiency: Math.round(currentEfficiency * 100) / 100,
        energyOutput: method.energyOutput * efficiencyVariation,
        financialGain: method.financialGain * efficiencyVariation,
        carbonReduction: method.carbonReduction * efficiencyVariation,
      });
    }

    return performance;
  }
}