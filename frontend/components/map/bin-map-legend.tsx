import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Leaf, AlertTriangle } from "lucide-react";

interface BinMapLegendProps {
  className?: string;
}

export function BinMapLegend({ className }: BinMapLegendProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Bin Legend</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Bin Fill Levels */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-600">Fill Level</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500 border border-white shadow-sm flex items-center justify-center">
                <span className="text-xs font-bold text-white">L</span>
              </div>
              <span className="text-xs">Low (0-50%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500 border border-white shadow-sm flex items-center justify-center">
                <span className="text-xs font-bold text-white">M</span>
              </div>
              <span className="text-xs">Medium (50-80%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-500 border border-white shadow-sm flex items-center justify-center">
                <span className="text-xs font-bold text-white">H</span>
              </div>
              <span className="text-xs">High (80-90%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 border border-white shadow-sm flex items-center justify-center">
                <span className="text-xs font-bold text-white">!</span>
              </div>
              <span className="text-xs">Critical (90%+)</span>
            </div>
          </div>
        </div>

        {/* Waste Type */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-600">Waste Type</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-teal-600 border border-white shadow-sm flex items-center justify-center">
                  <Trash2 className="w-2 h-2 text-white" />
                </div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-teal-600 border border-white flex items-center justify-center">
                  <span className="text-xs">🍃</span>
                </div>
              </div>
              <span className="text-xs">Organic Waste</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-amber-500 border border-white shadow-sm flex items-center justify-center">
                <Trash2 className="w-2 h-2 text-white" />
              </div>
              <span className="text-xs">Plastic Waste</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500 border border-white shadow-sm flex items-center justify-center">
                <Trash2 className="w-2 h-2 text-white" />
              </div>
              <span className="text-xs">Shredding</span>
            </div>
          </div>
        </div>

        {/* Special States */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-600">Special States</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500 border border-white shadow-sm flex items-center justify-center animate-pulse">
                <Trash2 className="w-2 h-2 text-white" />
              </div>
              <span className="text-xs">Grinding Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 border-4 border-white shadow-sm flex items-center justify-center">
                <AlertTriangle className="w-2 h-2 text-white" />
              </div>
              <span className="text-xs">Selected Bin</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
