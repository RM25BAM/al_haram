import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { User, MapPin, Clock } from "lucide-react"
import { TTruck } from "@/types"

interface TruckStatusCardProps {
  truck: TTruck
}

export function TruckStatusCard({ truck }: TruckStatusCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "collecting":
        return "bg-blue-500"
      case "en_route":
        return "bg-yellow-500"
      case "maintenance":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Available"
      case "collecting":
        return "Collecting"
      case "en_route":
        return "En Route"
      case "maintenance":
        return "Maintenance"
      default:
        return "Unknown"
    }
  }

  const formatTime = (dateString: string | null) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {/* Truck icon is removed as it was redeclared */}
              {truck.id}
            </CardTitle>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <User className="h-4 w-4 mr-1" />
              {truck.driver}
            </div>
          </div>
          <Badge className={`${getStatusColor(truck.status)} text-white`}>{getStatusText(truck.status)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center text-sm">
          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
          <span className="text-gray-600">Location:</span>
          <span className="ml-2 font-medium">{truck.location}</span>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Capacity</span>
            <span className="font-medium">{truck.capacity}%</span>
          </div>
          <Progress
            value={truck.capacity}
            className={`h-2 ${truck.capacity > 80 ? "[&>div]:bg-red-500" : "[&>div]:bg-blue-500"}`}
          />
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Route:</span>
          <Badge variant="outline">{truck.route}</Badge>
        </div>

        {truck.estimatedCompletion && (
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            ETA: {formatTime(truck.estimatedCompletion)}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
