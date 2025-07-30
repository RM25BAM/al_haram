import type { TWasteBin } from "@/types";

export function exportBinsToCSV(bins: TWasteBin[]) {
  const headers = [
    "Bin ID",
    "Location",
    "Waste Type",
    "Fill Level (%)",
    "Status",
    "Last Collection",
  ];
  const csvData = [
    headers.join(","),
    ...bins.map((bin) =>
      [
        bin.id,
        `"${bin.location}"`,
        bin.wasteType,
        bin.fillLevel,
        bin.status,
        `"${bin.lastCollection}"`,
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `waste-bins-${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function generateBinsReport(bins: TWasteBin[]) {
  const reportData = {
    reportDate: new Date().toISOString().split("T")[0],
    totalBins: bins.length,
    statusBreakdown: {
      normal: bins.filter((bin) => bin.status === "normal").length,
      needsCollection: bins.filter((bin) => bin.status === "needs_collection")
        .length,
      critical: bins.filter((bin) => bin.fillLevel >= 90).length,
    },
    averageFillLevel:
      bins.length > 0
        ? Math.round(
            bins.reduce((sum, bin) => sum + bin.fillLevel, 0) / bins.length
          )
        : 0,
    wasteTypeBreakdown: {
      General: bins.filter((bin) => bin.wasteType === "General").length,
      Plastic: bins.filter((bin) => bin.wasteType === "Plastic").length,
      Paper: bins.filter((bin) => bin.wasteType === "Paper").length,
      Food: bins.filter((bin) => bin.wasteType === "Food").length,
    },
    criticalBins: bins
      .filter((bin) => bin.fillLevel >= 90)
      .map((bin) => ({
        id: bin.id,
        location: bin.location,
        fillLevel: bin.fillLevel,
        wasteType: bin.wasteType,
      })),
  };

  const reportContent = `
WASTE BIN MANAGEMENT REPORT
Generated: ${reportData.reportDate}
=====================================

SUMMARY STATISTICS:
- Total Bins: ${reportData.totalBins}
- Average Fill Level: ${reportData.averageFillLevel}%

STATUS BREAKDOWN:
- Normal Operation: ${reportData.statusBreakdown.normal}
- Needs Collection: ${reportData.statusBreakdown.needsCollection}
- Critical Status: ${reportData.statusBreakdown.critical}

WASTE TYPE DISTRIBUTION:
- General Waste: ${reportData.wasteTypeBreakdown.General} bins
- Plastic Waste: ${reportData.wasteTypeBreakdown.Plastic} bins
- Paper Waste: ${reportData.wasteTypeBreakdown.Paper} bins
- Food Waste: ${reportData.wasteTypeBreakdown.Food} bins

CRITICAL ALERTS:
${
  reportData.criticalBins.length > 0
    ? reportData.criticalBins
        .map(
          (bin) =>
            `- ${bin.id} (${bin.location}): ${bin.fillLevel}% - ${bin.wasteType}`
        )
        .join("\n")
    : "- No critical bins requiring immediate attention"
}

RECOMMENDATIONS:
${
  reportData.statusBreakdown.critical > 0
    ? `- URGENT: ${reportData.statusBreakdown.critical} bin(s) require immediate collection`
    : "- No urgent actions required"
}
${
  reportData.statusBreakdown.needsCollection > 0
    ? `\n- Schedule collection for ${reportData.statusBreakdown.needsCollection} bin(s)`
    : ""
}
${
  reportData.averageFillLevel > 75
    ? "\n- Consider increasing collection frequency"
    : reportData.averageFillLevel < 25
    ? "\n- Current collection frequency appears optimal"
    : "\n- Monitor fill levels for optimization opportunities"
}
`;

  const blob = new Blob([reportContent], {
    type: "text/plain;charset=utf-8;",
  });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `waste-bins-report-${reportData.reportDate}.txt`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
