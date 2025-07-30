"use client";

import dynamic from "next/dynamic";
import { useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { DEFAULT_MAP_SETTINGS } from "@/lib/map-utils";
import { type TWasteBin, type TTruck } from "@/types";
import { BinDetailModal } from "@/components/bin-detail-modal";
import { useTreatmentMethods } from "@/hooks/use-treatment-methods";
import { Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LatLngTuple, Map } from "leaflet";
import { TruckDetailModal } from "@/components/truck-detail-modal";

// Dynamically import Leaflet components with no SSR
const LeafletMap = dynamic(
  () => import("./leaflet-map").then((mod) => ({ default: mod.LeafletMap })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[600px] w-full bg-surface rounded-lg flex items-center justify-center border border-outline">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-primary font-medium">Loading map...</p>
        </div>
      </div>
    ),
  }
);

const LeafletBinMarker = dynamic(
  () =>
    import("./leaflet-bin-marker").then((mod) => ({
      default: mod.LeafletBinMarker,
    })),
  {
    ssr: false,
  }
);

const LeafletTruckMarker = dynamic(
  () =>
    import("./leaflet-truck-marker").then((mod) => ({
      default: mod.LeafletTruckMarker,
    })),
  {
    ssr: false,
  }
);

interface InteractiveMapProps {
  bins: TWasteBin[];
  trucks: TTruck[];
  className?: string;
  isTruckMap?: boolean;
}

export function InteractiveMap({ bins, trucks, isTruckMap }: InteractiveMapProps) {
  const t = useTranslations("interactiveMap");

  const [selectedBinIdForDetails, setSelectedBinIdForDetails] = useState<
    string | null
  >(null);
  const [isBinModalOpen, setIsBinModalOpen] = useState(false);
  const [map, setMap] = useState<Map | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedTruckForDetails, setSelectedTruckForDetails] =
    useState<TTruck | null>(null);
  const [isTruckModalOpen, setIsTruckModalOpen] = useState(false);

  // Get treatment methods data
  const { allMethods: treatmentMethods } = useTreatmentMethods();

  const handleBinClick = useCallback((bin: TWasteBin) => {
    setSelectedBinIdForDetails(bin.id);
    setIsBinModalOpen(true);
  }, []);

  const handleTruckClick = useCallback((truck: TTruck) => {
    setSelectedTruckForDetails(truck);
    setIsTruckModalOpen(true);
  }, []);

  const handleMapLoad = useCallback((mapInstance: Map) => {
    if (bins.length > 0 || trucks.length > 0) {
      const allPoints: LatLngTuple[] = [];

      bins.forEach((bin) => {
        allPoints.push([bin.coordinates.lat, bin.coordinates.lng]);
      });

      trucks.forEach((truck) => {
        allPoints.push([truck.coordinates.lat, truck.coordinates.lng]);
      });

      if (allPoints.length > 0 && mapInstance.fitBounds) {
        import("leaflet").then((L) => {
          const bounds = L.latLngBounds(allPoints);
          mapInstance.fitBounds(bounds, { padding: [20, 20] });

          if (mapInstance.getZoom() > 18) {
            mapInstance.setZoom(18);
          }
        });
      }
    }
    setMap(mapInstance);
  }, []);

  const handleBinModalClose = useCallback(() => {
    setIsBinModalOpen(false);
    setSelectedBinIdForDetails(null);
  }, []);

  const handleTruckModalClose = useCallback(() => {
    setIsTruckModalOpen(false);
    setSelectedTruckForDetails(null);
  }, []);


  const handleScheduleCollection = useCallback(
    (binId: string) => {
      console.log("Scheduling collection for bin:", binId);
      alert(`${t("collectionScheduled")} ${binId}`);
    },
    [t]
  );

  const handleReportIssue = useCallback(
    (binId: string) => {
      console.log("Reporting issue for bin:", binId);
      alert(`${t("issueReported")} ${binId}`);
    },
    [t]
  );

  const handleNavigate = useCallback(
    (coordinates: { lat: number; lng: number }) => {
      if (map) {
        map.setView([coordinates.lat, coordinates.lng], 18);
      }
      console.log("Navigating to:", coordinates);
    },
    [map]
  );

  const handleFullscreenToggle = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    },
    [isFullscreen]
  );

  useEffect(() => {
    if (isFullscreen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isFullscreen, handleKeyDown]);

  return (
    <>
      {/* Single Container with Conditional Styling */}
      <div
        className={`
        space-y-4 
        ${isFullscreen ? "fixed inset-0 z-[9999] bg-black flex flex-col" : ""}
      `}
      >
        {/* Filter Controls */}
        <div
          className={`
          ${
            isFullscreen
              ? "absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000]"
              : "space-y-4"
          }
        `}
        ></div>

        {/* Single Map Container */}
        <div
          className={`
          relative rounded-lg overflow-hidden
          ${isFullscreen ? "flex-1 h-full w-full" : "h-[85vh]"}
        `}
        >
          <LeafletMap
            center={[
              DEFAULT_MAP_SETTINGS.center.lat,
              DEFAULT_MAP_SETTINGS.center.lng,
            ]}
            zoom={DEFAULT_MAP_SETTINGS.zoom}
            onLoad={handleMapLoad}
            className="h-full w-full"
          >
            {/* Render bin markers */}
            {bins.map((bin) => (
              <LeafletBinMarker
                key={bin.id}
                bin={bin}
                onClick={handleBinClick}
              />
            ))}

            {/* Render truck markers */}
            {trucks.map((truck) => (
              <LeafletTruckMarker
                key={truck.id}
                truck={truck}
                onClick={handleTruckClick}
                showPopup={false}
              />
            ))}
          </LeafletMap>

          {/* Fullscreen Toggle Button */}
          <div className="absolute bottom-4 right-4 z-[1000]">
            <Button
              variant="outline"
              size="sm"
              onClick={handleFullscreenToggle}
              className="bg-surface/95 backdrop-blur-sm border border-outline hover:bg-surface-200 shadow-lg text-primary"
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Exit Fullscreen Controls (Only in fullscreen) */}
          {isFullscreen && (
            <div className="absolute bottom-4 right-4 z-[1000] flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleFullscreenToggle}
                className="bg-surface/95 backdrop-blur-sm border border-outline hover:bg-surface-200 shadow-lg text-primary"
                title="Exit fullscreen (Esc)"
              >
                <Minimize className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Map Stats Overlay */}
          {!isTruckMap && (
            <div className="absolute top-4 right-4 z-[1000] pointer-events-none">
              <div
                className={`
                bg-surface/95 backdrop-blur-sm rounded-lg shadow-lg border border-outline pointer-events-auto
                ${isFullscreen ? "p-4" : "p-3"}
              `}
              >
                <div
                  className={`space-y-1 ${isFullscreen ? "text-sm space-y-2" : "text-sm"}`}
                >
                  <div
                    className={`flex justify-between ${isFullscreen ? "gap-6" : "gap-4"}`}
                  >
                    <span className="text-primary/70">{t("visibleBins")}:</span>
                    <span
                      className={`font-medium text-primary ${isFullscreen ? "text-lg" : ""}`}
                    >
                      {bins.length}
                    </span>
                  </div>
                  <div
                    className={`flex justify-between ${isFullscreen ? "gap-6" : "gap-4"}`}
                  >
                    <span className="text-primary/70">{t("criticalBins")}:</span>
                    <span
                      className={`font-medium text-red-600 ${isFullscreen ? "text-lg" : ""}`}
                    >
                      {bins.filter((b) => b.fillLevel >= 90).length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modals */}
      <BinDetailModal
        binId={selectedBinIdForDetails}
        isOpen={isBinModalOpen}
        onClose={handleBinModalClose}
        onScheduleCollection={handleScheduleCollection}
        onReportIssue={handleReportIssue}
        onNavigate={handleNavigate}
        treatmentMethodsData={treatmentMethods}
      />

      <TruckDetailModal
        truck={selectedTruckForDetails}
        isOpen={isTruckModalOpen}
        onClose={handleTruckModalClose}
      />

    </>
  );
}
