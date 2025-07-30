import type { TTruck } from "@/types";

export function exportTrucksToCSV(trucks: TTruck[]) {
  const headers = [
    "Vehicle ID",
    "Driver",
    "Status",
    "Route",
    "Capacity (%)",
    "Fuel Level (%)",
    "Collections Today",
    "ETA",
  ];
  const csvData = [
    headers.join(","),
    ...trucks.map((truck) =>
      [
        truck.id,
        `"${truck.driver}"`,
        truck.status,
        truck.route,
        truck.capacity,
        truck.fuelLevel,
        truck.collectionsToday,
        truck.estimatedCompletion
          ? `"${new Date(truck.estimatedCompletion).toLocaleTimeString()}"`
          : "--:--",
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `fleet-vehicles-${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function generateTrucksReport(trucks: TTruck[]) {
  const reportData = {
    reportDate: new Date().toISOString().split("T")[0],
    totalVehicles: trucks.length,
    statusBreakdown: {
      available: trucks.filter((truck) => truck.status === "available").length,
      enRoute: trucks.filter((truck) => truck.status === "en_route").length,
      collecting: trucks.filter((truck) => truck.status === "collecting")
        .length,
      maintenance: trucks.filter((truck) => truck.status === "maintenance")
        .length,
    },
    totalCollections: trucks.reduce(
      (sum, truck) => sum + truck.collectionsToday,
      0
    ),
    averageCapacity:
      trucks.length > 0
        ? Math.round(
            trucks.reduce((sum, truck) => sum + truck.capacity, 0) /
              trucks.length
          )
        : 0,
    averageFuelLevel:
      trucks.length > 0
        ? Math.round(
            trucks.reduce((sum, truck) => sum + truck.fuelLevel, 0) /
              trucks.length
          )
        : 0,
    lowFuelVehicles: trucks.filter((truck) => truck.fuelLevel < 25),
    highCapacityVehicles: trucks.filter((truck) => truck.capacity > 80),
  };

  const reportContent = `
FLEET MANAGEMENT REPORT
Generated: ${reportData.reportDate}
=====================================

FLEET SUMMARY:
- Total Vehicles: ${reportData.totalVehicles}
- Total Collections Today: ${reportData.totalCollections}
- Average Capacity: ${reportData.averageCapacity}%
- Average Fuel Level: ${reportData.averageFuelLevel}%

VEHICLE STATUS:
- Available: ${reportData.statusBreakdown.available}
- En Route: ${reportData.statusBreakdown.enRoute}
- Collecting: ${reportData.statusBreakdown.collecting}
- Maintenance: ${reportData.statusBreakdown.maintenance}

OPERATIONAL EFFICIENCY:
- Fleet Utilization: ${Math.round(
    ((reportData.totalVehicles - reportData.statusBreakdown.available) /
      reportData.totalVehicles) *
      100
  )}%
- Collections per Vehicle: ${Math.round(
    reportData.totalCollections / reportData.totalVehicles
  )}

ALERTS & RECOMMENDATIONS:
${
  reportData.lowFuelVehicles.length > 0
    ? `- LOW FUEL ALERT: ${
        reportData.lowFuelVehicles.length
      } vehicle(s) need refueling:\n${reportData.lowFuelVehicles
        .map((truck) => `  • ${truck.id} (${truck.fuelLevel}%)`)
        .join("\n")}`
    : "- All vehicles have adequate fuel levels"
}

${
  reportData.highCapacityVehicles.length > 0
    ? `\n- HIGH CAPACITY: ${
        reportData.highCapacityVehicles.length
      } vehicle(s) approaching capacity:\n${reportData.highCapacityVehicles
        .map((truck) => `  • ${truck.id} (${truck.capacity}%)`)
        .join("\n")}`
    : "\n- All vehicles have normal capacity levels"
}

${
  reportData.statusBreakdown.maintenance > 0
    ? `\n- MAINTENANCE: ${reportData.statusBreakdown.maintenance} vehicle(s) currently in maintenance`
    : "\n- No vehicles currently in maintenance"
}

OPTIMIZATION SUGGESTIONS:
${
  reportData.statusBreakdown.available > reportData.totalVehicles * 0.3
    ? "- Consider redistributing routes to increase fleet utilization"
    : "- Current fleet utilization appears optimal"
}
${
  reportData.averageCapacity > 70
    ? "\n- Consider increasing disposal frequency or expanding fleet"
    : "\n- Current capacity management is effective"
}
`;

  const blob = new Blob([reportContent], {
    type: "text/plain;charset=utf-8;",
  });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `fleet-report-${reportData.reportDate}.txt`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
