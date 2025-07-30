"use client";

import { Marker } from "react-leaflet";
import L from "leaflet";
import type { TWasteBin } from "@/types";
import {
  getEnhancedBinStatus,
  shouldShowGrindingAnimation,
} from "@/lib/map-utils";
import { BinPlasticSvg } from "../icons/bin-plastic";
import { BinOrganicSvg } from "../icons/bin-organic";

interface LeafletBinMarkerProps {
  bin: TWasteBin;
  onClick?: (bin: TWasteBin) => void;
  isSelected?: boolean;
}

// Enhanced bin status based on fill level
function getBinStatus(fillLevel: number) {
  return getEnhancedBinStatus(fillLevel);
}

// Get status-based colors
function getStatusColor(fillLevel: number, isGrinding: boolean = false) {
  if (fillLevel >= 90) return "#ef4444"; // Red for critical
  if (fillLevel >= 80) return "#f59e0b"; // Orange for warning
  return "#f8fafc"; // Off-white for normal status
}

// Get custom icon SVG based on waste type
function getCustomBinSVG(wasteType: string) {
  if (wasteType.toLowerCase() === "organic") {
    return BinOrganicSvg;
  } else {
    return BinPlasticSvg;
  }
}

// Create custom Leaflet icon
function createLeafletBinIcon(
  fillLevel: number,
  wasteType: string,
  isSelected: boolean = false,
  isGrinding: boolean = false
): L.DivIcon {
  const statusColor = getStatusColor(fillLevel, isGrinding);
  const size = 38;
  const binSVG = getCustomBinSVG(wasteType);
  const status = getBinStatus(fillLevel);
  const showGrindingAnimation = shouldShowGrindingAnimation(
    fillLevel,
    isGrinding
  );

  // Create blinking animation for grinding mode (only for 70-80% fill level)
  const blinkingStyle = showGrindingAnimation
    ? `
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0.3; }
    }
  `
    : "";

  const html = `
    <style>
      ${blinkingStyle}
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }
    </style>
    <div style="
      position: relative;
      width: ${size}px;
      height: ${size}px;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <!-- Custom bin icon with status background color -->
      <div style="
        width: ${size}px;
        height: ${size}px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: ${statusColor};
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        ${showGrindingAnimation ? "animation: blink 1s infinite;" : ""}
        ${status === "critical" ? "animation: pulse 2s infinite;" : ""}
      ">
        ${binSVG}
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: "custom-bin-marker",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2)],
  });
}

export function LeafletBinMarker({
  bin,
  onClick,
  isSelected = false,
}: LeafletBinMarkerProps) {
  const isGrinding = bin.isGrinding || false;
  const icon = createLeafletBinIcon(
    bin.fillLevel,
    bin.wasteType,
    isSelected,
    isGrinding
  );

  const handleClick = () => {
    onClick?.(bin);
  };

  return (
    <Marker
      position={[bin.coordinates.lat, bin.coordinates.lng]}
      icon={icon}
      eventHandlers={{
        click: handleClick,
      }}
    />
  );
}
