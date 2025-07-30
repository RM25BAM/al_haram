import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Leaf } from "lucide-react";

interface TruckMapLegendProps {
  className?: string;
}

export function TruckMapLegend({ className }: TruckMapLegendProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Truck Legend</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Truck Status */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-600">Status</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500 border border-white shadow-sm flex items-center justify-center">
                <span className="text-xs">🚛</span>
              </div>
              <span className="text-xs">Collecting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500 border border-white shadow-sm flex items-center justify-center">
                <span className="text-xs">🚚</span>
              </div>
              <span className="text-xs">En Route</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-500 border border-white shadow-sm flex items-center justify-center">
                <span className="text-xs">🚐</span>
              </div>
              <span className="text-xs">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 border border-white shadow-sm flex items-center justify-center">
                <span className="text-xs">🔧</span>
              </div>
              <span className="text-xs">Maintenance</span>
            </div>
          </div>
        </div>

        {/* Waste Type */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-600">Waste Type</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-gray-500 border border-white shadow-sm flex items-center justify-center">
                  <Truck className="w-2 h-2 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 rounded-full bg-green-600 border border-white flex items-center justify-center">
                  <span className="text-xs">🍃</span>
                </div>
              </div>
              <span className="text-xs">Organic Waste</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-500 border border-white shadow-sm flex items-center justify-center">
                <Truck className="w-2 h-2 text-white" />
              </div>
              <span className="text-xs">Plastic Waste</span>
            </div>
          </div>
        </div>

        {/* Route Lines */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-600">Route Lines</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-green-500 rounded-full"></div>
              <span className="text-xs">Collecting Route</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-blue-500 rounded-full"></div>
              <span className="text-xs">En Route</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-gray-500 rounded-full"></div>
              <span className="text-xs">Available Route</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-red-500 rounded-full"></div>
              <span className="text-xs">Maintenance</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
