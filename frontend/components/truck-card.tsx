"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { User, MapPin, Clock, Route } from "lucide-react"
import type { TTruck } from "@/types"

interface TruckCardProps {
  truck: TTruck
  onClick: () => void
}

export function TruckCard({ truck, onClick }: TruckCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500 hover:bg-green-600"
      case "collecting":
        return "bg-blue-500 hover:bg-blue-600"
      case "en_route":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "maintenance":
        return "bg-red-500 hover:bg-red-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
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
    <Card className="hover:shadow-lg transition-all cursor-pointer hover:scale-105 transform" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{truck.id}</CardTitle>
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
            className={`h-3 ${truck.capacity > 80 ? "[&>div]:bg-red-500" : "[&>div]:bg-blue-500"}`}
          />
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Route:</span>
          <Badge variant="outline" className="flex items-center gap-1">
            <Route className="h-3 w-3" />
            {truck.route}
          </Badge>
        </div>

        {truck.nextPickup && (
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            Next pickup: {truck.nextPickup}
          </div>
        )}

        {truck.estimatedCompletion && (
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            ETA: {formatTime(truck.estimatedCompletion)}
          </div>
        )}

        <div className="text-xs text-gray-400 text-center pt-2 border-t">Click for route details</div>
      </CardContent>
    </Card>
    
  )
}
