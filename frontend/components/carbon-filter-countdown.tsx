"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Filter, AlertTriangle, Clock } from "lucide-react";
import { useCommonTranslations } from "@/hooks/use-translations";
import { useCarbonFilterCountdown } from "@/hooks/use-carbon-filter-countdown";

interface CarbonFilterCountdownProps {
  className?: string;
}

export function CarbonFilterCountdown({
  className,
}: CarbonFilterCountdownProps) {
  const tCommon = useCommonTranslations();
  const { daysRemaining, isExpired, isCritical, isNearExpiry, getStatusColor } =
    useCarbonFilterCountdown();

  const getStatusIcon = () => {
    if (isExpired) return <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4" />;
    if (isCritical) return <Clock className="h-3 w-3 sm:h-4 sm:w-4" />;
    return <Filter className="h-3 w-3 sm:h-4 sm:w-4" />;
  };

  const getStatusText = () => {
    if (isExpired) return tCommon("filterExpired");
    if (daysRemaining === 1) return `1 ${tCommon("dayRemaining")}`;
    return `${daysRemaining} ${tCommon("daysRemaining")}`;
  };

  const getTooltipContent = () => {
    if (isExpired) {
      return tCommon("filterExpiredTooltip");
    }
    if (isCritical) {
      return tCommon("filterCritical", {
        days: daysRemaining,
        s: daysRemaining === 1 ? "" : "s",
      });
    }
    if (isNearExpiry) {
      return tCommon("filterNearExpiry", { days: daysRemaining });
    }
    return tCommon("filterGoodCondition", { days: daysRemaining });
  };

  return (
    <TooltipProvider>
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="hidden sm:block text-xs text-muted-foreground">
          {tCommon("carbonFilterCountdown")}:
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant="outline"
              className={`text-xs sm:text-sm px-2 py-1 flex items-center gap-1.5 cursor-help transition-all duration-200 hover:scale-105 ${getStatusColor()}`}
            >
              {getStatusIcon()}
              <span className="font-medium">{getStatusText()}</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">{getTooltipContent()}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
