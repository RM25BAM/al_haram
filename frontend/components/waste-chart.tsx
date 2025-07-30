"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

const chartData = [
  { day: "Mon", collected: 1200, generated: 1400 },
  { day: "Tue", collected: 1100, generated: 1300 },
  { day: "Wed", collected: 1300, generated: 1500 },
  { day: "Thu", collected: 1250, generated: 1350 },
  { day: "Fri", collected: 1400, generated: 1600 },
  { day: "Sat", collected: 1350, generated: 1450 },
  { day: "Sun", collected: 1150, generated: 1250 },
]

export function WasteChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Weekly Waste Collection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip formatter={(value, name) => [`${value} kg`, name === "collected" ? "Collected" : "Generated"]} />
            <Bar dataKey="collected" fill="#10b981" name="collected" />
            <Bar dataKey="generated" fill="#6b7280" name="generated" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
