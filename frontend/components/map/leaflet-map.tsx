"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { DEFAULT_MAP_SETTINGS } from "@/lib/map-utils";

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Tile layer configuration
const TILE_LAYER_CONFIG = {
  // Currently using CartoDB Voyager for better visual appeal and clarity
  // Switched from OpenStreetMap to provide a more modern, colorful interface
  // suitable for waste management dashboard visualization
  current: {
    name: "CartoDB Voyager",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    reason: "Modern, colorful design suitable for dashboard visualization",
  },
  // Alternative options available for easy switching
  alternatives: {
    openStreetMap: {
      name: "OpenStreetMap",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      reason: "Default, reliable option with good global coverage",
    },
    cartoLight: {
      name: "CartoDB Positron",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      reason: "Light, clean style for minimal distraction",
    },
    cartoDark: {
      name: "CartoDB Dark Matter",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      reason: "Dark theme for reduced eye strain",
    },
  },
};

export interface LeafletMapProps {
  center: [number, number];
  zoom: number;
  onLoad?: (map: L.Map) => void;
  onClick?: (event: L.LeafletMouseEvent) => void;
  children?: React.ReactNode;
  className?: string;
}

function MapEvents({
  onLoad,
  onClick,
}: {
  onLoad?: (map: L.Map) => void;
  onClick?: (event: L.LeafletMouseEvent) => void;
}) {
  const map = useMap();

  useEffect(() => {
    // Set up bounds restriction
    const restrictedBounds = L.latLngBounds(
      [
        DEFAULT_MAP_SETTINGS.restrictedBounds.south,
        DEFAULT_MAP_SETTINGS.restrictedBounds.west,
      ],
      [
        DEFAULT_MAP_SETTINGS.restrictedBounds.north,
        DEFAULT_MAP_SETTINGS.restrictedBounds.east,
      ]
    );

    // Apply bounds restriction
    map.setMaxBounds(restrictedBounds);
    map.on("drag", function () {
      map.panInsideBounds(restrictedBounds, { animate: false });
    });

    // Set zoom limits
    map.setMinZoom(DEFAULT_MAP_SETTINGS.minZoom);
    map.setMaxZoom(DEFAULT_MAP_SETTINGS.maxZoom);

    if (onLoad) {
      onLoad(map);
    }

    // Cleanup function
    return () => {
      map.off("drag");
    };
  }, [map, onLoad]);

  useEffect(() => {
    if (onClick) {
      map.on("click", onClick);
      return () => {
        map.off("click", onClick);
      };
    }
  }, [map, onClick]);

  return null;
}

export function LeafletMap({
  center,
  zoom,
  onLoad,
  onClick,
  children,
  className = "h-[600px] w-full",
}: LeafletMapProps) {
  return (
    <div className={className}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="h-full w-full rounded-lg"
        zoomControl={true}
        minZoom={DEFAULT_MAP_SETTINGS.minZoom}
        maxZoom={DEFAULT_MAP_SETTINGS.maxZoom}
      >
        {/* Map Tiles - Multiple style options */}
        {/* 
          MapTiler Setup Instructions:
          1. Sign up for free at https://www.maptiler.com/
          2. Get your API key from the dashboard
          3. Add it to your environment variables as NEXT_PUBLIC_MAPTILER_API_KEY
          4. Or replace YOUR_MAPTILER_API_KEY with your actual key
        */}

        {/* Map Tile Layer Configuration
          Current: CartoDB Voyager - Selected for modern, colorful design
          
          To switch tile layers, modify TILE_LAYER_CONFIG.current above or
          use environment variable NEXT_PUBLIC_MAP_STYLE to override.
          
          Available alternatives: openStreetMap, cartoLight, cartoDark
        */}
        <TileLayer
          attribution={TILE_LAYER_CONFIG.current.attribution}
          url={TILE_LAYER_CONFIG.current.url}
          maxZoom={DEFAULT_MAP_SETTINGS.maxZoom}
        />

        {/* Premium Tile Layer Options (Require API Keys)
          
          For production use, consider upgrading to premium map providers:
          
          1. MapTiler (https://www.maptiler.com/):
             - 3D terrain maps, satellite imagery, hybrid views
             - High-quality rendering and global coverage
             - Free tier available, then paid plans
             
          2. Mapbox (https://www.mapbox.com/):
             - Custom styling, vector tiles
             - Professional mapping solution
             - Free tier available
             
          3. Google Maps API:
             - Street view integration, extensive POI data
             - Enterprise-level support
             - Paid service
             
          To implement, add your API key to environment variables and
          update the TILE_LAYER_CONFIG above with the appropriate URLs.
        */}

        <MapEvents onLoad={onLoad} onClick={onClick} />
        {children}
      </MapContainer>
    </div>
  );
}
