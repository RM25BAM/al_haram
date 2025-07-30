"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search } from "lucide-react";
import { useLocationTranslations } from "@/hooks/use-translations";

interface LocationSearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  clearSearch: () => void;
  totalBins: number;
  totalTrucks: number;
  filteredBinsCount: number;
  filteredTrucksCount: number;
}

export function LocationSearch({
  searchQuery,
  setSearchQuery,
  clearSearch,
  totalBins,
  totalTrucks,
  filteredBinsCount,
  filteredTrucksCount,
}: LocationSearchProps) {
  const t = useLocationTranslations();

  return (
    <Card className="bg-surface border-outline">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">
          {t("locationSearchTitle")}
        </CardTitle>
        <CardDescription className="text-primary/70">
          {t("locationSearchDescription")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-primary mb-2 block">
              {t("searchMapItems")}
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary/50 h-4 w-4 z-10" />
              <Input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 bg-white border-outline text-primary placeholder:text-primary/50 focus:ring-2 focus:ring-secondary"
                style={{ paddingLeft: "2.5rem" }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-primary/70">
              {t("showingResults", {
                filteredBinsCount,
                totalBins,
                filteredTrucksCount,
                totalTrucks,
              })}
            </div>
            {searchQuery && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearSearch}
                className="border-outline text-primary hover:bg-white"
              >
                {t("clearSearch")}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
