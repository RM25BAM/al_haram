"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, AlertTriangle, Clock } from "lucide-react";
import type { TWasteBin } from "@/types";

interface BinCardProps {
  bin: TWasteBin;
  onClick: () => void;
}

export function BinCard({ bin, onClick }: BinCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-500 hover:bg-red-600";
      case "needs_collection":
        return "bg-yellow-500 hover:bg-yellow-600";
      default:
        return "bg-green-500 hover:bg-green-600";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "critical":
        return "Critical";
      case "needs_collection":
        return "Needs Collection";
      default:
        return "Normal";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card
      className="hover:shadow-lg transition-all cursor-pointer hover:scale-105 transform"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{bin.id}</CardTitle>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {bin.location}
            </div>
          </div>
          <Badge className={`${getStatusColor(bin.status)} text-white`}>
            {getStatusText(bin.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Fill Level</span>
            <span className="font-medium">{bin.fillLevel}%</span>
          </div>
          <Progress
            value={bin.fillLevel}
            className={`h-3 ${
              bin.fillLevel > 80
                ? "[&>div]:bg-red-500"
                : bin.fillLevel > 60
                ? "[&>div]:bg-yellow-500"
                : "[&>div]:bg-green-500"
            }`}
          />
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Waste Type:</span>
          <Badge variant="outline">{bin.wasteType}</Badge>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          Last: {formatDate(bin.lastCollection)}
        </div>

        {bin.fillLevel >= 90 && (
          <div className="flex items-center text-sm text-red-600 bg-red-50 p-2 rounded">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Immediate attention required
          </div>
        )}

        <div className="text-xs text-gray-400 text-center pt-2 border-t">
          Click for detailed view
        </div>
      </CardContent>
    </Card>
  );
}
