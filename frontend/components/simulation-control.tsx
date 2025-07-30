"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Settings,
  Play,
  Pause,
  RotateCcw,
  Trash2,
  AlertTriangle,
  Zap,
  Clock,
} from "lucide-react";
import type { TWasteBin } from "@/types";

interface SimulationControlProps {
  onDataUpdate?: (bins: TWasteBin[]) => void;
}

export function SimulationControl({ onDataUpdate }: SimulationControlProps) {
  const [bins, setBins] = useState<TWasteBin[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);

  // Fetch current bin data
  const fetchBins = async () => {
    try {
      const response = await fetch("/api/simulation/bins?config=true");
      const data = await response.json();

      if (data.bins) {
        setBins(data.bins);
        if (data.config && data.config.speed) {
          setSimulationSpeed(data.config.speed);
          setIsSimulationRunning(data.config.isRunning);
        }
        if (onDataUpdate) onDataUpdate(data.bins);
      } else {
        setBins(data);
        if (onDataUpdate) onDataUpdate(data);
      }
    } catch (error) {
      console.error("Failed to fetch bins:", error);
    }
  };

  // Update simulation speed
  const updateSimulationSpeed = useCallback(async (speed: number) => {
    try {
      const response = await fetch("/api/simulation/bins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "updateConfig",
          config: { speed },
        }),
      });

      if (response.ok) {
        setSimulationSpeed(speed);
      }
    } catch (error) {
      console.error("Failed to update simulation speed:", error);
    }
  }, []);

  // Stable handler for speed change
  const handleSpeedChange = useCallback(
    (value: string) => {
      updateSimulationSpeed(parseFloat(value));
    },
    [updateSimulationSpeed]
  );
  // Update individual bin
  const updateBin = useCallback(
    async (binId: string, fillLevel: number) => {
      try {
        const response = await fetch("/api/simulation/bins", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ binId, fillLevel }),
        });

        if (response.ok) {
          const updatedBin = await response.json();
          // Update local state
          setBins((prevBins) => {
            const updatedBins = prevBins.map((bin) =>
              bin.id === binId ? updatedBin : bin
            );

            // Call onDataUpdate with the updated bins array
            if (onDataUpdate) {
              onDataUpdate(updatedBins);
            }
            return updatedBins;
          });
        }
      } catch (error) {
        console.error("Failed to update bin:", error);
      }
    },
    [onDataUpdate]
  );

  // Bulk actions
  const performBulkAction = async (action: string, value?: number) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/simulation/bins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, value }),
      });

      if (response.ok) {
        await fetchBins();
      }
    } catch (error) {
      console.error("Failed to perform bulk action:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto simulation with speed control and crushing feature
  useEffect(() => {
    if (!isSimulationRunning) return;

    const baseInterval = 2000; // Base interval of 2 seconds
    const interval = Math.max(500, baseInterval / simulationSpeed); // Minimum 500ms

    const simulationInterval = setInterval(async () => {
      // Use ref to get current bins state to avoid stale closure
      setBins((currentBins) => {
        // Get a random bin that's not already at 100%
        const availableBins = currentBins.filter((bin) => bin.fillLevel < 100);
        if (availableBins.length === 0) return currentBins;

        const randomBin =
          availableBins[Math.floor(Math.random() * availableBins.length)];
        if (randomBin) {
          let change;

          // Crushing feature: If bin is >= 85%, it starts "crushing" and fills faster
          if (randomBin.fillLevel >= 85) {
            // Bin is crushing - fills much faster due to compaction
            change = Math.random() * 8 * simulationSpeed * 0.8; // Faster fill rate when crushing
            console.log(
              `🗜️ Bin ${randomBin.id} is crushing! Fill rate increased.`
            );
          } else {
            // Normal fill behavior
            change =
              Math.random() > 0.5
                ? Math.random() * 5 * simulationSpeed * 0.5 // Normal fill rate
                : -Math.random() * 2; // Occasional decrease (waste removed)
          }

          const newLevel = Math.max(
            0,
            Math.min(100, randomBin.fillLevel + change)
          );

          // Only update if there's a meaningful change
          if (Math.abs(newLevel - randomBin.fillLevel) > 0.5) {
            const roundedLevel = Math.round(newLevel);
            // Update the bin state immediately with proper status types
            const getStatusFromFillLevel = (
              level: number
            ): "normal" | "needs_collection" | "critical" => {
              if (level >= 90) return "critical";
              if (level >= 70) return "needs_collection";
              return "normal";
            };

            const updatedBins = currentBins.map((bin) =>
              bin.id === randomBin.id
                ? {
                    ...bin,
                    fillLevel: roundedLevel,
                    status: getStatusFromFillLevel(roundedLevel),
                  }
                : bin
            );

            return updatedBins;
          }
        }
        return currentBins;
      });
    }, interval);

    return () => clearInterval(simulationInterval);
  }, [isSimulationRunning, simulationSpeed]); // Only depend on simulation state, not bins

  useEffect(() => {
    fetchBins();
  }, []);

  // Propagate bin updates to parent component
  useEffect(() => {
    if (onDataUpdate && bins.length > 0) {
      onDataUpdate(bins);
    }
  }, [bins]); // Remove onDataUpdate from dependencies to prevent infinite loop

  const getBinStatusColor = (status: string, fillLevel?: number) => {
    // Special color for crushing bins (85%+ fill level)
    if (fillLevel && fillLevel >= 85 && fillLevel < 100) {
      return "bg-orange-600"; // Orange for crushing
    }

    switch (status) {
      case "critical":
        return "bg-red-500";
      case "needs_collection":
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  const criticalCount = bins.filter((bin) => bin.fillLevel >= 90).length;
  const needsCollectionCount = bins.filter(
    (bin) => bin.status === "needs_collection"
  ).length;
  const crushingCount = bins.filter(
    (bin) => bin.fillLevel >= 85 && bin.fillLevel < 100
  ).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Simulation Control Panel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Overview */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {criticalCount}
            </div>
            <div className="text-sm text-gray-500">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {crushingCount}
            </div>
            <div className="text-sm text-gray-500">🗜️ Crushing</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {needsCollectionCount}
            </div>
            <div className="text-sm text-gray-500">Needs Collection</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {bins.length -
                criticalCount -
                needsCollectionCount -
                crushingCount}
            </div>
            <div className="text-sm text-gray-500">Normal</div>
          </div>
        </div>

        <Separator />

        {/* Simulation Speed Controls */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Simulation Speed
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <Label
                htmlFor="speed-select"
                className="text-sm font-medium min-w-0"
              >
                Speed:
              </Label>
              <Select
                value={simulationSpeed.toString()}
                onValueChange={handleSpeedChange}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">🐌 0.5x (Slow)</SelectItem>
                  <SelectItem value="1">🚶 1x (Normal)</SelectItem>
                  <SelectItem value="2">🏃 2x (Fast)</SelectItem>
                  <SelectItem value="5">⚡ 5x (Very Fast)</SelectItem>
                  <SelectItem value="10">🚀 10x (Ultra Fast)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-xs text-gray-500">
              Update interval: {Math.max(500, 2000 / simulationSpeed)}ms
            </div>
            <div className="text-xs text-blue-600 mt-2">
              💡 Bins at 85%+ enter "crushing mode" and fill faster due to waste
              compaction
            </div>
          </div>
        </div>

        <Separator />

        {/* Auto Simulation Controls */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Auto Simulation
          </h3>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsSimulationRunning(!isSimulationRunning)}
              variant={isSimulationRunning ? "destructive" : "default"}
              className="flex items-center gap-2"
            >
              {isSimulationRunning ? (
                <>
                  <Pause className="h-4 w-4" />
                  Stop Simulation
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Start Simulation
                </>
              )}
            </Button>
            <Badge variant={isSimulationRunning ? "destructive" : "secondary"}>
              {isSimulationRunning
                ? `Running at ${simulationSpeed}x`
                : "Stopped"}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Bulk Actions */}
        <div className="space-y-4">
          <h3 className="font-semibold">Bulk Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => performBulkAction("fillAll", 95)}
              disabled={isLoading}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <AlertTriangle className="h-4 w-4" />
              Fill All (95%)
            </Button>
            <Button
              onClick={() => performBulkAction("emptyAll", 15)}
              disabled={isLoading}
              variant="default"
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Empty All (15%)
            </Button>
            <Button
              onClick={() => performBulkAction("fillAll", 75)}
              disabled={isLoading}
              variant="outline"
              className="flex items-center gap-2"
            >
              Moderate Fill (75%)
            </Button>
            <Button
              onClick={() => performBulkAction("reset")}
              disabled={isLoading}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset to Default
            </Button>
          </div>
        </div>

        <Separator />

        {/* Individual Bin Controls */}
        <div className="space-y-4">
          <h3 className="font-semibold">Individual Bin Controls</h3>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {bins.map((bin) => (
              <div key={bin.id} className="space-y-2 p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{bin.id}</div>
                    <div className="text-sm text-gray-500">{bin.location}</div>
                  </div>
                  <Badge
                    className={`${getBinStatusColor(
                      bin.status,
                      bin.fillLevel
                    )} text-white`}
                  >
                    {bin.fillLevel >= 85 && bin.fillLevel < 100 ? "🗜️ " : ""}
                    {bin.fillLevel}%
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Slider
                    value={[bin.fillLevel]}
                    onValueChange={(value) => {
                      updateBin(bin.id, value[0]);
                    }}
                    max={100}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0%</span>
                    <span>{bin.wasteType}</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
