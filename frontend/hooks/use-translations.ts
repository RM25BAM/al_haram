import { useTranslations } from "next-intl";

export function useAppTranslations() {
  return {
    common: useTranslations("common"),
    navigation: useTranslations("navigation"),
    dashboard: useTranslations("dashboard"),
    footer: useTranslations("footer"),
    locations: useTranslations("locations"),
    trucks: useTranslations("trucks"),
    wasteBins: useTranslations("wasteBins"),
    wasteTypes: useTranslations("wasteTypes"),
    simulation: useTranslations("simulation"),
    forms: useTranslations("forms"),
    errors: useTranslations("errors"),
    success: useTranslations("success"),
  };
}

// Individual translation hooks for specific sections
export const useCommonTranslations = () => useTranslations("common");
export const useNavigationTranslations = () => useTranslations("navigation");
export const useDashboardTranslations = () => useTranslations("dashboard");
export const useFooterTranslations = () => useTranslations("footer");
export const useLocationTranslations = () => useTranslations("locations");
export const useTruckTranslations = () => useTranslations("trucks");
export const useWasteBinTranslations = () => useTranslations("wasteBins");
export const useWasteTypeTranslations = () => useTranslations("wasteTypes");
export const useSimulationTranslations = () => useTranslations("simulation");
export const useFormTranslations = () => useTranslations("forms");
export const useErrorTranslations = () => useTranslations("errors");
export const useSuccessTranslations = () => useTranslations("success");
