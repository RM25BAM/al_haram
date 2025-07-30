import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

interface WasteTypeSearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  clearSearch: () => void;
  totalTypes: number;
  filteredCount: number;
}

export function WasteTypeSearch({
  searchQuery,
  setSearchQuery,
  clearSearch,
  totalTypes,
  filteredCount,
}: WasteTypeSearchProps) {
  const t = useTranslations("wasteTypes");

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900">
          {t("searchAndFilter")}
        </CardTitle>
        <CardDescription>{t("searchAndFilterDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              {t("searchCategories")}
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 z-10" />
              <Input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                style={{ paddingLeft: "2.5rem" }}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="text-sm text-gray-600">
              {searchQuery ? (
                <span>
                  <span className="font-medium text-blue-600">
                    {filteredCount}
                  </span>{" "}
                  {t("ofCategoriesFound", { total: totalTypes })}
                </span>
              ) : (
                <span>{t("categoriesAvailable", { total: totalTypes })}</span>
              )}
            </div>

            {searchQuery && (
              <Badge
                variant="secondary"
                className="bg-blue-50 text-blue-700 border-blue-200"
              >
                {t("filtered")}: {searchQuery}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
