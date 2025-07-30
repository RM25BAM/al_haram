"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp } from "lucide-react"
import type { TWasteType } from "@/types"

interface WasteTypePanelProps {
  wasteTypes: TWasteType[]
  onTypeClick: (wasteType: TWasteType) => void
}

export function WasteTypePanel({ wasteTypes, onTypeClick }: WasteTypePanelProps) {
  const totalAmount = wasteTypes.reduce((sum, type) => sum + type.amount, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Waste Types Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
          <div className="text-3xl font-bold text-gray-900">{totalAmount.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Total Kg Collected</div>
          <div className="flex items-center justify-center gap-1 mt-1 text-green-600">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">+12% this week</span>
          </div>
        </div>

        <div className="space-y-3">
          {wasteTypes.map((waste, index) => (
            <div
              key={index}
              className="space-y-2 p-3 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onTypeClick(waste)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${waste.color}`} />
                  <span className="text-sm font-medium">{waste.type}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{waste.amount.toLocaleString()} kg</div>
                  <div className="text-xs text-gray-500">{waste.percentage}%</div>
                </div>
              </div>
              <Progress value={waste.percentage} className="h-2" />
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{waste.dailyAverage} kg/day</span>
                <Badge variant="outline" className="text-xs">
                  {waste.binCount} bins
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
