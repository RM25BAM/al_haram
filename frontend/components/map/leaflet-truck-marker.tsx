"use client";

import { Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import type { TTruck } from "@/types";
import { getTruckRouteColor } from "@/lib/map-utils";
import { TruckOrganicSvg } from "../icons/truck-organic";
import { TruckPlasticSvg } from "../icons/truck-plastic";

interface LeafletTruckMarkerProps {
  truck: TTruck;
  onClick?: (truck: TTruck) => void;
  showRoute?: boolean;
  showPopup?: boolean; // New prop to control popup display
}

// Create custom truck icon with waste type indicator
function createTruckIcon(status: string, wasteType: string): L.DivIcon {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "collecting":
        return "#F5F5DC";
      case "en_route":
        return "#f8fafc";
      case "maintenance":
        return "#ef4444";
      default:
        return "#f8fafc";
    }
  };

  const getTruckIcon = () => {
    if (wasteType.toLowerCase() === "organic") {
        return TruckOrganicSvg;
      } else {
        return TruckPlasticSvg;
      }
  };

  const color = getStatusColor(status);
  const icon = getTruckIcon();
  const size = 55;

  const html = `
    <style>
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }
    </style>
    <div class="relative flex items-center justify-center">
      <!-- Main marker -->
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
        background-color: ${color};
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        ${status === "collecting" ? "animation: pulse 2s infinite;" : ""}
      ">
        ${icon}
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: "custom-truck-marker",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}

export function LeafletTruckMarker({
  truck,
  onClick,
  showRoute = false,
  showPopup = true, // Default to showing popup for backwards compatibility
}: LeafletTruckMarkerProps) {
  const icon = createTruckIcon(truck.status, truck.wasteType);
  const routeColor = getTruckRouteColor(truck.status);

  const handleClick = () => {
    onClick?.(truck);
  };

  // Sample route path (in a real app, this would come from the truck data)
  const routePath: [number, number][] = [
    [truck.coordinates.lat, truck.coordinates.lng],
    [truck.coordinates.lat + 0.001, truck.coordinates.lng + 0.001],
    [truck.coordinates.lat + 0.002, truck.coordinates.lng - 0.001],
  ];

  return (
    <>
      <Marker
        position={[truck.coordinates.lat, truck.coordinates.lng]}
        icon={icon}
        eventHandlers={{
          click: handleClick,
        }}
      >
        {showPopup && (
          <Popup className="custom-popup" maxWidth={300}>
            <div className="p-3 min-w-[250px]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg text-gray-900">
                  🚛 {truck.id}
                </h3>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    truck.status === "collecting"
                      ? "bg-green-100 text-green-800"
                      : truck.status === "en_route"
                      ? "bg-blue-100 text-blue-800"
                      : truck.status === "available"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {truck.status.replace("_", " ").toUpperCase()}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Driver:</span>
                  <span className="font-medium">{truck.driver}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{truck.location}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Route:</span>
                  <span className="font-medium">{truck.route}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Capacity:</span>
                  <span className="font-medium">{truck.capacity}%</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Fuel Level:</span>
                  <span className="font-medium">{truck.fuelLevel}%</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Collections Today:</span>
                  <span className="font-medium">{truck.collectionsToday}</span>
                </div>

                {truck.estimatedCompletion && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">ETA:</span>
                    <span className="font-medium">
                      {new Date(truck.estimatedCompletion).toLocaleTimeString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Popup>
        )}
      </Marker>

      {/* Show route if enabled */}
      {showRoute && (
        <Polyline
          positions={routePath}
          color={routeColor}
          weight={4}
          opacity={0.7}
          dashArray="10, 10"
        />
      )}
    </>
  );
}
