import React from "react";
import { useTranslations } from "next-intl";

export interface ColorMapKeyProps {
  className?: string;
}

export function ColorMapKey({ className = "" }: ColorMapKeyProps) {
  const t = useTranslations("mapLegend");
  const wasteBinsT = useTranslations("wasteBins");

  const legendItems = [
    {
      color: "#6B7C59", // Soft olive green
      label: t("normalMode"),
      description: t("normalDescription"),
      icon: "🟢",
    },
    {
      color: "#8B9C79", // Light olive for grinding
      label: t("grindingMode"),
      description: t("grindingDescription"),
      icon: "🔄",
      isBlinking: true,
    },
    {
      color: "#B8956A", // Warm beige-brown
      label: t("warningMode"),
      description: t("warningDescription"),
      icon: "🟡",
    },
    {
      color: "#C17B63", // Muted terracotta
      label: t("criticalMode"),
      description: t("criticalDescription"),
      icon: "🔴",
      isPulsing: true,
    },
  ];

  return (
    <div
      className={`bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-serene border ${className}`}
    >
      <h4 className="font-medium text-sm mb-2 text-foreground">
        {t("binStatusLegend")}
      </h4>
      <div className="space-y-2">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div
                className={`w-3 h-3 rounded-full border border-border ${
                  item.isBlinking ? "animate-pulse" : ""
                } ${item.isPulsing ? "animate-ping" : ""}`}
                style={{ backgroundColor: item.color }}
              />
              <span className="text-lg">{item.icon}</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-foreground">{item.label}</div>
              <div className="text-muted-foreground text-xs">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-2 border-t border-border">
        <div className="text-xs text-muted-foreground">
          <div className="font-medium mb-1">{t("wasteTypeIcons")}:</div>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: "#6B7C59" }} // Soft olive green
              ></div>
              <span>{wasteBinsT("organic")}</span>
            </div>
            <div className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: "#7B8F99" }} // Soft blue-gray
              ></div>
              <span>{wasteBinsT("plastic")}</span>
            </div>
            <div className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: "#B8956A" }} // Warm beige-brown
              ></div>
              <span>{t("shredding")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Compact version for mobile
export function CompactColorMapKey({ className = "" }: ColorMapKeyProps) {
  const t = useTranslations("mapLegend");

  return (
    <div
      className={`bg-card/95 backdrop-blur-sm rounded-lg p-2 shadow-serene border ${className}`}
    >
      <div className="flex items-center gap-3 text-xs">
        <div className="flex items-center gap-1">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "#6B7C59" }}
          ></div>
          <span>{t("normal")}</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: "#8B9C79" }}
          ></div>
          <span>{t("grinding")}</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "#B8956A" }}
          ></div>
          <span>{t("warning")}</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: "#C17B63" }}
          ></div>
          <span>{t("critical")}</span>
        </div>
      </div>
    </div>
  );
}
