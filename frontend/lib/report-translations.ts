/**
 * Client-side translation mappings for report data
 * Maps English backend data to localized versions
 */

// Zone name translations
export const ZONE_TRANSLATIONS = {
  en: {
    "Mataf Area": "Mataf Area",
    "King Abdul Aziz Gate": "King Abdul Aziz Gate",
    "Safa and Marwa Galleries": "Safa and Marwa Galleries",
    "Prophet's Gate": "Prophet's Gate",
    "Al-Salam Gate": "Al-Salam Gate",
    "Maqam Ibrahim Area": "Maqam Ibrahim Area",
    "Safa-Marwa Corridor": "Safa-Marwa Corridor",
    "King Fahd Gate": "King Fahd Gate",
    "Umrah Gate": "Umrah Gate",
    "Prayer Halls": "Prayer Halls",
    Courtyard: "Courtyard",
    "Basement Level": "Basement Level",
    "Upper Floors": "Upper Floors",
    "Service Areas": "Service Areas",
  },
  ar: {
    "Mataf Area": "منطقة المطاف",
    "King Abdul Aziz Gate": "باب الملك عبد العزيز",
    "Safa and Marwa Galleries": "معارض الصفا والمروة",
    "Prophet's Gate": "باب النبي",
    "Al-Salam Gate": "باب السلام",
    "Maqam Ibrahim Area": "منطقة مقام إبراهيم",
    "Safa-Marwa Corridor": "ممر الصفا والمروة",
    "King Fahd Gate": "باب الملك فهد",
    "Umrah Gate": "باب العمرة",
    "Prayer Halls": "قاعات الصلاة",
    Courtyard: "الفناء",
    "Basement Level": "الطابق السفلي",
    "Upper Floors": "الطوابق العلوية",
    "Service Areas": "مناطق الخدمة",
  },
} as const;

// System status translations
export const STATUS_TRANSLATIONS = {
  en: {
    "High Load": "High Load",
    Normal: "Normal",
    Optimal: "Optimal",
    Good: "Good",
    Excellent: "Excellent",
    increasing: "increasing",
    decreasing: "decreasing",
    stable: "stable",
    pending: "pending",
    resolved: "resolved",
    Operational: "Operational",
    Maintenance: "Maintenance",
  },
  ar: {
    "High Load": "حمولة عالية",
    Normal: "عادي",
    Optimal: "أمثل",
    Good: "جيد",
    Excellent: "ممتاز",
    increasing: "متزايد",
    decreasing: "متناقص",
    stable: "مستقر",
    pending: "معلق",
    resolved: "محلول",
    Operational: "تشغيلي",
    Maintenance: "صيانة",
  },
} as const;

// Text labels that appear in reports
export const LABEL_TRANSLATIONS = {
  en: {
    "Total Waste Collected": "Total Waste Collected",
    "Top Performing Zone": "Top Performing Zone",
    "System Performance": "System Performance",
    "Operational Bins": "Operational Bins",
    "Grinder Issues": "Grinder Issues",
    "System Uptime": "System Uptime",
    "Maintenance Completed": "Maintenance Completed",
    "Odor Sensor Status": "Odor Sensor Status",
    "Grinder Issues Breakdown": "Grinder Issues Breakdown",
    "Resolved:": "Resolved:",
    "Pending:": "Pending:",
    "Key Highlights": "Key Highlights",
    "Top Waste Zones": "Top Waste Zones",
    "Total Waste": "Total Waste",
    "Plastic Waste": "Plastic Waste",
    "Organic Waste": "Organic Waste",
    "Top Zone": "Top Zone",
    "kg collected": "kg collected",
    "of total": "of total",
    "from last month": "from last month",
    "System Health": "System Health",
    "Waste Trends": "Waste Trends",
    "Energy Generation": "Energy Generation",
    "Estimated Revenue": "Estimated Revenue",
    "Carbon Footprint Reduction": "Carbon Footprint Reduction",
    "This Month": "This Month",
    "Last Month": "Last Month",
    "Key Changes": "Key Changes",
    "Reasons for Changes": "Reasons for Changes",
    tasks: "tasks",
    "Zone Performance Analysis": "Zone Performance Analysis",
  },
  ar: {
    "Total Waste Collected": "إجمالي النفايات المجمعة",
    "Top Performing Zone": "أفضل منطقة أداءً",
    "System Performance": "أداء النظام",
    "Operational Bins": "الحاويات التشغيلية",
    "Grinder Issues": "مشاكل المطحنة",
    "System Uptime": "وقت تشغيل النظام",
    "Maintenance Completed": "الصيانة المكتملة",
    "Odor Sensor Status": "حالة مستشعر الرائحة",
    "Grinder Issues Breakdown": "تفصيل مشاكل المطحنة",
    "Resolved:": "محلولة:",
    "Pending:": "معلقة:",
    "Key Highlights": "النقاط الرئيسية",
    "Top Waste Zones": "أهم مناطق النفايات",
    "Total Waste": "إجمالي النفايات",
    "Plastic Waste": "النفايات البلاستيكية",
    "Organic Waste": "النفايات العضوية",
    "Top Zone": "المنطقة الأولى",
    "kg collected": "كغ مجمعة",
    "of total": "من الإجمالي",
    "from last month": "من الشهر الماضي",
    "System Health": "صحة النظام",
    "Waste Trends": "اتجاهات النفايات",
    "Energy Generation": "توليد الطاقة",
    "Estimated Revenue": "الإيرادات المقدرة",
    "Carbon Footprint Reduction": "تقليل البصمة الكربونية",
    "This Month": "هذا الشهر",
    "Last Month": "الشهر الماضي",
    "Key Changes": "التغييرات الرئيسية",
    "Reasons for Changes": "أسباب التغييرات",
    tasks: "مهام",
    "Zone Performance Analysis": "تحليل أداء المناطق",
  },
} as const;

// Week names for waste trends
export const WEEK_TRANSLATIONS = {
  en: {
    "Week 1": "Week 1",
    "Week 2": "Week 2",
    "Week 3": "Week 3",
    "Week 4": "Week 4",
    "Week 5": "Week 5",
  },
  ar: {
    "Week 1": "الأسبوع الأول",
    "Week 2": "الأسبوع الثاني",
    "Week 3": "الأسبوع الثالث",
    "Week 4": "الأسبوع الرابع",
    "Week 5": "الأسبوع الخامس",
  },
} as const;

// Energy/revenue source translations
export const SOURCE_TRANSLATIONS = {
  en: {
    "Plastic Recycling": "Plastic Recycling",
    "Biogas from Organic": "Biogas from Organic",
    "Waste-to-Energy": "Waste-to-Energy",
    "Carbon Credits": "Carbon Credits",
  },
  ar: {
    "Plastic Recycling": "إعادة تدوير البلاستيك",
    "Biogas from Organic": "الغاز الحيوي من العضوي",
    "Waste-to-Energy": "النفايات إلى طاقة",
    "Carbon Credits": "أرصدة الكربون",
  },
} as const;

// Get current locale type
export type Locale = "en" | "ar";

// Translation helper function
export function translateText(
  text: string,
  locale: Locale,
  category: "zones" | "status" | "labels" | "weeks" | "sources" = "labels"
): string {
  const mappings = {
    zones: ZONE_TRANSLATIONS,
    status: STATUS_TRANSLATIONS,
    labels: LABEL_TRANSLATIONS,
    weeks: WEEK_TRANSLATIONS,
    sources: SOURCE_TRANSLATIONS,
  };

  const mapping = mappings[category];
  return mapping[locale][text as keyof (typeof mapping)["en"]] || text;
}
