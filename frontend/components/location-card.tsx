import { Badge } from "@/components/ui/badge";
import { MapPin, AlertTriangle } from "lucide-react";

interface Bin {
  id: string;
  location: string;
  fillLevel: number;
  wasteType: string;
  status: "normal" | "needs_collection" | "critical";
}

interface LocationCardProps {
  bin: Bin;
}

export function LocationCard({ bin }: LocationCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "text-red-600 bg-red-50";
      case "needs_collection":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-green-600 bg-green-50";
    }
  };

  return (
    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="font-medium text-sm">{bin.location}</span>
        </div>
        {bin.fillLevel >= 90 && (
          <AlertTriangle className="h-4 w-4 text-red-500" />
        )}
      </div>

      <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
        <span>{bin.id}</span>
        <span>{bin.fillLevel}% full</span>
      </div>

      <div className="flex justify-between items-center">
        <Badge variant="outline" className="text-xs">
          {bin.wasteType}
        </Badge>
        <Badge className={`text-xs ${getStatusColor(bin.status)}`}>
          {bin.status.replace("_", " ")}
        </Badge>
      </div>
    </div>
  );
}
