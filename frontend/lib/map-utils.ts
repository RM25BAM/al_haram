import {
  BinFillStatus,
  WasteFilter,
  type TWasteBin,
  type TMapCoordinates,
} from "@/types";

// Enhanced color mapping for different fill levels with gradients and visual states
export const FILL_LEVEL_COLORS = {
  [BinFillStatus.LOW]: {
    primary: "#6B7C59", // Soft olive green (0-74%)
    secondary: "#5A6B47", // Deeper olive
    bg: "#E8EDE0", // Light olive background
    text: "#3A4A2F", // Dark olive text
    intensity: 0.8,
  },
  [BinFillStatus.MEDIUM]: {
    primary: "#B8956A", // Warm beige-brown (75-89%)
    secondary: "#A0834F", // Deeper warm beige
    bg: "#F3EFE7", // Light beige background
    text: "#6B5B3F", // Dark beige text
    intensity: 0.85,
  },
  [BinFillStatus.HIGH]: {
    primary: "#C17B63", // Muted terracotta (90-100%)
    secondary: "#A66651", // Deeper terracotta
    bg: "#F0E6E2", // Light terracotta background
    text: "#7A4A3C", // Dark terracotta text
    intensity: 0.9,
  },
  [BinFillStatus.CRITICAL]: {
    primary: "#C17B63", // Muted terracotta (90-100%)
    secondary: "#A66651", // Deeper terracotta
    bg: "#F0E6E2", // Light terracotta background
    text: "#7A4A3C", // Dark terracotta text
    intensity: 1.0,
  },
} as const;

// Enhanced waste type colors with complete color schemes and updated icons
export const WASTE_TYPE_COLORS = {
  Plastic: {
    primary: "#7B8F99", // Soft blue-gray
    secondary: "#6B7F89", // Deeper blue-gray
    accent: "#9BADB7", // Light blue-gray
    icon: "♻️", // Recycling symbol for plastic
    gradient: "from-slate-400 to-blue-400",
  },
  Organic: {
    primary: "#6B7C59", // Soft olive green
    secondary: "#5A6B47", // Deeper olive
    accent: "#8B9C79", // Light olive
    icon: "🌿", // Leaf symbol for organic
    gradient: "from-emerald-400 to-green-500",
  },
} as const;

// Simple color mapping for backward compatibility
export const SIMPLE_FILL_LEVEL_COLORS = {
  [BinFillStatus.LOW]: "#6B7C59", // Soft olive green (0-74%)
  [BinFillStatus.MEDIUM]: "#B8956A", // Warm beige-brown (75-89%)
  [BinFillStatus.HIGH]: "#C17B63", // Muted terracotta (90-100%)
  [BinFillStatus.CRITICAL]: "#C17B63", // Muted terracotta (90-100%)
} as const;

// Simple waste type colors for backward compatibility
export const SIMPLE_WASTE_TYPE_COLORS = {
  Plastic: "#7B8F99", // Soft blue-gray
  Organic: "#6B7C59", // Soft olive green
} as const;

// Map filter options - Matching Al-Haram waste management specifications
export const MAP_FILTER_OPTIONS = [
  {
    value: WasteFilter.ALL,
    label: "All Waste",
    icon: "✅",
    color: "#6b7280",
    description: "Show all bins regardless of waste type",
  },
  {
    value: WasteFilter.ORGANIC,
    label: "Organic Waste",
    icon: "🟢",
    color: "#22c55e",
    description: "Biodegradable organic materials",
  },
  {
    value: WasteFilter.PLASTIC,
    label: "Plastic Waste",
    icon: "🔵",
    color: "#3b82f6",
    description: "Plastic containers and packaging",
  },
];

// Default map settings for Al-Haram area (adjusted view further south)
export const DEFAULT_MAP_SETTINGS = {
  center: { lat: 21.4200, lng: 39.8262 }, // Moved further south for better view
  zoom: 16, // Increased zoom for closer view
  bounds: {
    north: 21.4235,
    south: 21.4200,
    east: 39.8275,
    west: 39.825,
  },
  // Restricted bounds for zoom and drag limits
  restrictedBounds: {
    north: 21.428602069409596, // Top
    south: 21.41825497422262,  // Bottom
    east: 39.831211566925056,  // Right
    west: 39.818465709686286,  // Left
  },
  minZoom: 16,
  maxZoom: 19,
} as const;

/**
 * Determine bin fill status based on fill level percentage
 *
 * Color-coded fill levels as per Al-Haram specifications:
 * 🟢 Green: 0–74% (Normal operation)
 * 🟡 Yellow: 75–89% (Shredding starts here)
 * 🔴 Red: 90–100% (Needs pickup)
 */
export function getBinFillStatus(fillLevel: number): BinFillStatus {
  if (fillLevel >= 95) return BinFillStatus.CRITICAL;
  if (fillLevel >= 90) return BinFillStatus.HIGH;
  if (fillLevel >= 75) return BinFillStatus.MEDIUM;
  return BinFillStatus.LOW;
}

/**
 * Get enhanced color scheme for bin marker based on fill level
 */
export function getBinColorScheme(fillLevel: number) {
  const status = getBinFillStatus(fillLevel);
  return FILL_LEVEL_COLORS[status];
}

/**
 * Get simple color for bin marker based on fill level (backward compatibility)
 */
export function getBinMarkerColor(fillLevel: number): string {
  const status = getBinFillStatus(fillLevel);
  return SIMPLE_FILL_LEVEL_COLORS[status];
}

/**
 * Get enhanced color scheme for waste type
 */
export function getWasteTypeColorScheme(wasteType: string) {
  return (
    WASTE_TYPE_COLORS[wasteType as keyof typeof WASTE_TYPE_COLORS] ||
    WASTE_TYPE_COLORS.Plastic
  );
}

/**
 * Get simple color for waste type (backward compatibility)
 */
export function getWasteTypeColor(wasteType: string): string {
  return (
    SIMPLE_WASTE_TYPE_COLORS[
      wasteType as keyof typeof SIMPLE_WASTE_TYPE_COLORS
    ] || "#6b7280"
  );
}

/**
 * Filter bins based on selected waste filter
 */
export function filterBinsByType(
  bins: TWasteBin[],
  filter: WasteFilter
): TWasteBin[] {
  if (filter === WasteFilter.ALL) return bins;

  const filterMap = {
    [WasteFilter.ORGANIC]: ["Organic"],
    [WasteFilter.PLASTIC]: ["Plastic"],
  };

  const allowedTypes = filterMap[filter] || [];
  return bins.filter((bin) => allowedTypes.includes(bin.wasteType));
}

/**
 * Calculate distance between two coordinates (in kilometers)
 */
export function calculateDistance(
  coord1: TMapCoordinates,
  coord2: TMapCoordinates
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const dLng = ((coord2.lng - coord1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.lat * Math.PI) / 180) *
      Math.cos((coord2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Get icon for bin status
 */
export function getBinStatusIcon(fillLevel: number): string {
  const status = getBinFillStatus(fillLevel);
  switch (status) {
    case BinFillStatus.LOW:
      return "🟢";
    case BinFillStatus.MEDIUM:
      return "🟡";
    case BinFillStatus.HIGH:
      return "🔴";
    case BinFillStatus.CRITICAL:
      return "🆘";
    default:
      return "🗑️";
  }
}

/**
 * Format fill level for display
 */
export function formatFillLevel(fillLevel: number): string {
  return `${Math.round(fillLevel)}%`;
}

/**
 * Create SVG bin marker (placeholder for future implementation)
 */
export function createSVGBinMarker(
  fillLevel: number,
  wasteType: string,
  size: number = 32
): string {
  const colorScheme = getBinColorScheme(fillLevel);
  const wasteTypeScheme = getWasteTypeColorScheme(wasteType);

  return `<svg width="${size}" height="${size}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="15" fill="${colorScheme.primary}" stroke="white" stroke-width="2"/>
    <text x="16" y="20" text-anchor="middle" font-size="14" fill="white">${wasteTypeScheme.icon}</text>
  </svg>`;
}

/**
 * Get bins within a specific radius of coordinates
 */
export function getBinsWithinRadius(
  bins: TWasteBin[],
  center: TMapCoordinates,
  radiusKm: number
): TWasteBin[] {
  return bins.filter((bin) => {
    const distance = calculateDistance(center, bin.coordinates);
    return distance <= radiusKm;
  });
}

/**
 * Group bins by status
 */
export function groupBinsByStatus(bins: TWasteBin[]) {
  return bins.reduce((groups, bin) => {
    const status = getBinFillStatus(bin.fillLevel);
    if (!groups[status]) {
      groups[status] = [];
    }
    groups[status].push(bin);
    return groups;
  }, {} as Record<BinFillStatus, TWasteBin[]>);
}

/**
 * Get map bounds that contain all bins
 */
export function getBinsBounds(bins: TWasteBin[]) {
  if (bins.length === 0) return DEFAULT_MAP_SETTINGS.bounds;

  const lats = bins.map((bin) => bin.coordinates.lat);
  const lngs = bins.map((bin) => bin.coordinates.lng);

  const padding = 0.001; // Add some padding around the bounds

  return {
    north: Math.max(...lats) + padding,
    south: Math.min(...lats) - padding,
    east: Math.max(...lngs) + padding,
    west: Math.min(...lngs) - padding,
  };
}

/**
 * Get route color for truck based on status
 */
export function getTruckRouteColor(status: string): string {
  switch (status) {
    case "collecting":
      return "#22c55e"; // Green
    case "en_route":
      return "#3b82f6"; // Blue
    case "available":
      return "#6b7280"; // Gray
    case "maintenance":
      return "#ef4444"; // Red
    default:
      return "#6b7280"; // Default gray
  }
}

// Enhanced bin status based on fill level with grinding logic
export function getEnhancedBinStatus(
  fillLevel: number
): "normal" | "grinding" | "warning" | "critical" {
  if (fillLevel >= 90) return "critical";
  if (fillLevel >= 80) return "warning";
  if (fillLevel >= 70) return "grinding";
  return "normal";
}

// Get status-based colors for new color scheme
export function getEnhancedStatusColor(
  fillLevel: number,
  isGrinding: boolean = false
): string {
  const status = getEnhancedBinStatus(fillLevel);

  switch (status) {
    case "critical":
      // Muted terracotta that intensifies as it approaches 95%
      const intensity = Math.min(255, 150 + (fillLevel - 90) * 10);
      return `hsl(15, 35%, ${Math.max(50, 70 - (fillLevel - 90) * 2)}%)`;
    case "warning":
      return "#B8956A"; // Warm beige-brown
    case "grinding":
      return isGrinding ? "#6B7C59" : "#8B9C79"; // Olive (darker when grinding)
    case "normal":
    default:
      return "#6B7C59"; // Soft olive green
  }
}

// Get border style for status indication
export function getEnhancedStatusBorder(
  fillLevel: number,
  isGrinding: boolean = false
) {
  const status = getEnhancedBinStatus(fillLevel);
  const color = getEnhancedStatusColor(fillLevel, isGrinding);

  // Only show grinding animation if bin is between 70-80% AND is grinding
  if (
    status === "grinding" &&
    isGrinding &&
    fillLevel >= 70 &&
    fillLevel <= 80
  ) {
    return {
      color,
      width: "3px",
      style: "solid",
      animation: "blink 1s infinite",
    };
  }

  return {
    color,
    width: "2px",
    style: "solid",
  };
}

// Check if bin should be grinding based on fill level
export function shouldBinBeGrinding(fillLevel: number): boolean {
  return fillLevel >= 70 && fillLevel <= 80;
}

// Check if grinding animation should be shown
export function shouldShowGrindingAnimation(
  fillLevel: number,
  isGrinding: boolean
): boolean {
  return isGrinding && fillLevel >= 70 && fillLevel <= 80;
}

// Determine if grinding should stop
export function shouldStopGrinding(
  fillLevel: number,
  grindingStartTime: string | undefined
): boolean {
  if (!grindingStartTime) return false;

  const now = new Date();
  const startTime = new Date(grindingStartTime);
  const timeDiff = now.getTime() - startTime.getTime();
  const twoMinutes = 2 * 60 * 1000; // 2 minutes in milliseconds

  // Stop if fill level drops below 70% or 2 minutes have passed
  return fillLevel < 70 || timeDiff >= twoMinutes;
}

// Get status message for display
export function getBinStatusMessage(
  fillLevel: number,
  isGrinding: boolean = false
): string {
  const status = getEnhancedBinStatus(fillLevel);

  switch (status) {
    case "critical":
      return "Immediate emptying required";
    case "warning":
      return "Needs attention soon - almost full";
    case "grinding":
      return isGrinding ? "Grinding in progress" : "Ready for grinding";
    case "normal":
    default:
      return "Safe zone - no grinding needed";
  }
}
