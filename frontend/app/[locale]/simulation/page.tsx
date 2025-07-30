"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Activity } from "lucide-react";
import { SimulationControl } from "@/components/simulation-control";
import { LocationMap } from "@/components/location-map";
import { DashboardStats } from "@/components/dashboard-stats";
import { BinDetailModal } from "@/components/bin-detail-modal";
import { useFormattedTime } from "@/hooks/use-client-time";
import { useTreatmentMethods } from "@/hooks/use-treatment-methods";
import type { TLocation, TWasteBin } from "@/types";
import Link from "next/link";

export default function SimulationPage() {
  const [bins, setBins] = useState<TWasteBin[]>([]);
  const [selectedBinId, setSelectedBinId] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [locationsData, setLocationsData] = useState<TLocation[]>([]);

  // Get treatment methods data
  const { allMethods: treatmentMethods } = useTreatmentMethods();

  // Use client-side time formatting to avoid hydration issues
  const formattedTime = useFormattedTime(lastUpdate);

  // Fetch bins from simulation API
  const fetchBins = async () => {
    try {
      const response = await fetch("/api/simulation/bins");
      const data = await response.json();
      setBins(data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error("Failed to fetch simulation data:", error);
    }
  };

  // Fetch locations from simulation API
  const fetchLocations = async () => {
    try {
      const response = await fetch("/api/locations");
      const data = await response.json();
      setLocationsData(data);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    }
  };

  // Handle data updates from simulation control
  const handleDataUpdate = useCallback((newBins: TWasteBin[]) => {
    setBins(newBins);
    setLastUpdate(new Date());
  }, []);

  useEffect(() => {
    fetchBins();
    fetchLocations();
  }, []);

  const criticalBins = bins.filter((bin) => bin.fillLevel >= 90).length;
  const needsCollectionBins = bins.filter(
    (bin) => bin.status === "needs_collection"
  ).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-serene border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="bg-gradient-makkah p-2 rounded-lg shadow-peaceful">
                <Activity className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground font-arabic">
                  Simulation Control Center
                </h1>
                <p className="text-sm text-muted-foreground">
                  Real-time Waste Management Testing
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="status-info">
                Simulation Mode
              </Badge>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="text-sm font-medium">
                  {formattedTime || "--:--:--"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="mb-8">
          <DashboardStats />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Simulation Control Panel */}
          <div className="lg:col-span-1">
            <SimulationControl onDataUpdate={handleDataUpdate} />
          </div>

          {/* Live Map View */}
          <div className="lg:col-span-2 space-y-6">
            <LocationMap
              locations={locationsData}
              bins={bins}
              onLocationClick={setSelectedLocation}
              onBinClick={(bin) => setSelectedBinId(bin.id)}
              selectedLocation={selectedLocation}
            />

            {/* Real-time Bin Status */}
            <Card>
              <CardHeader>
                <CardTitle>Real-time Bin Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bins.slice(0, 6).map((bin) => (
                    <div
                      key={bin.id}
                      className="flex justify-between items-center p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors card"
                      onClick={() => setSelectedBinId(bin.id)}
                    >
                      <div>
                        <div className="font-medium">{bin.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {bin.location}
                        </div>
                      </div>
                      <Badge
                        className={`${
                          bin.fillLevel >= 90
                            ? "status-error"
                            : bin.status === "needs_collection"
                            ? "status-warning"
                            : "status-success"
                        }`}
                      >
                        {bin.fillLevel}%
                      </Badge>
                    </div>
                  ))}
                </div>
                {bins.length > 6 && (
                  <div className="mt-4 text-center">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedLocation(null)}
                    >
                      View All {bins.length} Bins
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Bin Detail Modal with Treatment Methods */}
      <BinDetailModal
        binId={selectedBinId}
        isOpen={!!selectedBinId}
        onClose={() => setSelectedBinId(null)}
        treatmentMethodsData={treatmentMethods}
      />
    </div>
  );
}
