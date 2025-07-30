import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { TWasteBin } from "@/types";

export const getStatusColor = (status: string) => {
  switch (status) {
    case "critical":
      return "bg-red-100 text-red-800 border-red-200";
    case "needs_collection":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-green-100 text-green-800 border-green-200";
  }
};

export const getTypeColor = (type: string) => {
  switch (type) {
    case "Plastic":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Organic":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getHealthStatusColor = (healthStatus: string) => {
  switch (healthStatus) {
    case "maintenance_required":
      return "bg-red-100 text-red-800 border-red-200";
    case "needs_cleaning":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "good":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getGrinderStatusColor = (grinderStatus?: string) => {
  switch (grinderStatus) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200";
    case "maintenance":
      return "bg-red-100 text-red-800 border-red-200";
    case "inactive":
      return "bg-gray-100 text-gray-800 border-gray-200";
    case "not_applicable":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatHealthStatus = (status: string) => {
  switch (status) {
    case "maintenance_required":
      return "Maintenance";
    case "needs_cleaning":
      return "Cleaning";
    case "good":
      return "Good";
    default:
      return status;
  }
};

export const formatGrinderStatus = (status?: string) => {
  switch (status) {
    case "not_applicable":
      return "N/A";
    case "maintenance":
      return "Maintenance";
    case "active":
      return "Active";
    case "inactive":
      return "Inactive";
    default:
      return status || "Inactive";
  }
};

export const calculatePriority = (bin: TWasteBin) => {
  let priority = 0;

  // Fill level impact (0-40 points)
  priority += Math.floor(bin.fillLevel * 0.4);

  // Status impact (0-30 points)
  switch (bin.status) {
    case "critical":
      priority += 30;
      break;
    case "needs_collection":
      priority += 20;
      break;
    default:
      priority += 5;
  }

  // Health status impact (0-20 points)
  switch (bin.healthStatus) {
    case "maintenance_required":
      priority += 20;
      break;
    case "needs_cleaning":
      priority += 15;
      break;
    default:
      priority += 5;
  }

  // Fill rate impact (0-10 points)
  priority += Math.floor(bin.averageFillRate * 0.2);

  return Math.min(100, priority);
};

export const getPriorityColor = (priority: number) => {
  if (priority >= 80) return "bg-red-100 text-red-800 border-red-200";
  if (priority >= 60) return "bg-orange-100 text-orange-800 border-orange-200";
  if (priority >= 40) return "bg-yellow-100 text-yellow-800 border-yellow-200";
  return "bg-green-100 text-green-800 border-green-200";
};

export const getPriorityText = (priority: number) => {
  if (priority >= 80) return "High";
  if (priority >= 60) return "Medium";
  if (priority >= 40) return "Low";
  return "Normal";
};

export const exportToCSV = (bins: TWasteBin[]) => {
  const headers = [
    "Bin ID",
    "Type",
    "Fill Level (%)",
    "Status",
    "Location",
    "Priority",
    "Health Status",
    "Average Fill Rate (%/day)",
    "Last Collected",
    "Last Maintenance",
    "Grinder Status",
  ];

  const csvData = bins.map((bin) => {
    const priority = calculatePriority(bin);
    return [
      bin.id,
      bin.wasteType,
      bin.fillLevel,
      bin.status === "needs_collection"
        ? "Collection"
        : bin.status === "critical"
        ? "Critical"
        : "Normal",
      bin.location,
      getPriorityText(priority),
      formatHealthStatus(bin.healthStatus),
      bin.averageFillRate,
      formatDate(bin.lastCollection),
      formatDate(bin.lastMaintenance),
      bin.fillLevel >= 70 && bin.fillLevel <= 80
        ? formatGrinderStatus(bin.grinderStatus)
        : "N/A",
    ];
  });

  const csvContent = [headers, ...csvData]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
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
};

export const exportToPDF = (bins: TWasteBin[]) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(18);
  doc.text("Waste Bins Export", 14, 22);

  // Add date
  doc.setFontSize(11);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 32);
  doc.text(`Total Bins: ${bins.length}`, 14, 40);

  // Prepare table data
  const tableHeaders = [
    "Bin ID",
    "Type",
    "Fill %",
    "Status",
    "Location",
    "Priority",
    "Health",
    "Avg Rate",
    "Last Collected",
    "Last Maintenance",
  ];

  const tableData = bins.map((bin) => {
    const priority = calculatePriority(bin);
    return [
      bin.id,
      bin.wasteType,
      `${bin.fillLevel}%`,
      bin.status === "needs_collection"
        ? "Collection"
        : bin.status === "critical"
        ? "Critical"
        : "Normal",
      bin.location,
      getPriorityText(priority),
      formatHealthStatus(bin.healthStatus),
      `${bin.averageFillRate}%/day`,
      formatDate(bin.lastCollection),
      formatDate(bin.lastMaintenance),
    ];
  });

  // Generate table
  autoTable(doc, {
    head: [tableHeaders],
    body: tableData,
    startY: 50,
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [66, 139, 202],
      textColor: 255,
      fontSize: 9,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    margin: { top: 50, left: 14, right: 14 },
  });

  // Save the PDF
  doc.save(`waste-bins-export-${new Date().toISOString().split("T")[0]}.pdf`);
};

export const generateDetailedReport = (bins: TWasteBin[]) => {
  const doc = new jsPDF();

  // Report title
  doc.setFontSize(20);
  doc.text("Waste Management Dashboard", 14, 22);
  doc.setFontSize(16);
  doc.text("Comprehensive Waste Bins Report", 14, 32);

  // Report metadata
  doc.setFontSize(11);
  doc.text(
    `Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
    14,
    45
  );
  doc.text(`Report Period: Current Status`, 14, 52);
  doc.text(`Total Bins Analyzed: ${bins.length}`, 14, 59);

  // Summary statistics
  const criticalBins = bins.filter((bin) => bin.status === "critical").length;
  const collectionNeeded = bins.filter(
    (bin) => bin.status === "needs_collection"
  ).length;
  const normalBins = bins.filter((bin) => bin.status === "normal").length;
  const avgFillLevel = (
    bins.reduce((sum, bin) => sum + bin.fillLevel, 0) / bins.length
  ).toFixed(1);
  const highPriorityBins = bins.filter(
    (bin) => calculatePriority(bin) >= 80
  ).length;

  doc.setFontSize(14);
  doc.text("Executive Summary", 14, 75);
  doc.setFontSize(10);
  doc.text(
    `• Critical Status Bins: ${criticalBins} (${(
      (criticalBins / bins.length) *
      100
    ).toFixed(1)}%)`,
    14,
    85
  );
  doc.text(
    `• Collection Needed: ${collectionNeeded} (${(
      (collectionNeeded / bins.length) *
      100
    ).toFixed(1)}%)`,
    14,
    92
  );
  doc.text(
    `• Normal Status Bins: ${normalBins} (${(
      (normalBins / bins.length) *
      100
    ).toFixed(1)}%)`,
    14,
    99
  );
  doc.text(`• Average Fill Level: ${avgFillLevel}%`, 14, 106);
  doc.text(`• High Priority Bins: ${highPriorityBins}`, 14, 113);

  // Recommendations
  doc.setFontSize(14);
  doc.text("Recommendations", 14, 130);
  doc.setFontSize(10);
  let yPos = 140;

  if (criticalBins > 0) {
    doc.text(
      `• Immediate attention required for ${criticalBins} critical bins`,
      14,
      yPos
    );
    yPos += 7;
  }
  if (collectionNeeded > 0) {
    doc.text(`• Schedule collection for ${collectionNeeded} bins`, 14, yPos);
    yPos += 7;
  }
  if (highPriorityBins > 0) {
    doc.text(
      `• Monitor ${highPriorityBins} high-priority bins closely`,
      14,
      yPos
    );
    yPos += 7;
  }
  if (parseFloat(avgFillLevel) > 75) {
    doc.text(
      `• Consider increasing collection frequency (avg fill: ${avgFillLevel}%)`,
      14,
      yPos
    );
    yPos += 7;
  }

  // Detailed table starts on new page or after recommendations
  const tableStartY = yPos + 20;

  // Prepare detailed table data
  const tableHeaders = [
    "Bin ID",
    "Type",
    "Fill %",
    "Status",
    "Location",
    "Priority",
    "Health Status",
    "Avg Rate (%/day)",
    "Last Collected",
    "Last Maintenance",
  ];

  const tableData = bins.map((bin) => {
    const priority = calculatePriority(bin);
    return [
      bin.id,
      bin.wasteType,
      `${bin.fillLevel}%`,
      bin.status === "needs_collection"
        ? "Collection"
        : bin.status === "critical"
        ? "Critical"
        : "Normal",
      bin.location,
      getPriorityText(priority),
      formatHealthStatus(bin.healthStatus),
      `${bin.averageFillRate}%/day`,
      formatDate(bin.lastCollection),
      formatDate(bin.lastMaintenance),
    ];
  });

  // Add detailed data table
  doc.setFontSize(14);
  doc.text("Detailed Bin Data", 14, tableStartY);

  autoTable(doc, {
    head: [tableHeaders],
    body: tableData,
    startY: tableStartY + 10,
    styles: {
      fontSize: 7,
      cellPadding: 1,
    },
    headStyles: {
      fillColor: [66, 139, 202],
      textColor: 255,
      fontSize: 8,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    margin: { top: 50, left: 14, right: 14 },
    columnStyles: {
      0: { cellWidth: 15 }, // Bin ID
      1: { cellWidth: 15 }, // Type
      2: { cellWidth: 12 }, // Fill %
      3: { cellWidth: 18 }, // Status
      4: { cellWidth: 20 }, // Location
      5: { cellWidth: 15 }, // Priority
      6: { cellWidth: 18 }, // Health
      7: { cellWidth: 15 }, // Avg Rate
      8: { cellWidth: 25 }, // Last Collected
      9: { cellWidth: 25 }, // Last Maintenance
    },
  });

  // Save the report
  doc.save(`waste-bins-report-${new Date().toISOString().split("T")[0]}.pdf`);
};
