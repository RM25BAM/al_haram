import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to normalize backend method names for translation lookup
export function normalizeMethodName(methodName: string): string {
  return methodName
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/-/g, '_')
    .replace(/[^a-z0-9_]/g, '');
}

// Helper function to get translated routes
export function getTranslatedRoutes(routeName: string, t: any): string {
  const normalizedName = normalizeMethodName(routeName);
  const translationKey = `${normalizedName}`;
  
  // Try to get translation, fallback to original name if not found
  const translated = t(translationKey);
  return translated !== translationKey ? translated : routeName;
}
// Helper function to get translated method name
export function getTranslatedMethodName(methodName: string, t: any): string {
  const normalizedName = normalizeMethodName(methodName);
  const translationKey = `methodNames.${normalizedName}`;
  
  // Try to get translation, fallback to original name if not found
  const translated = t(translationKey);
  return translated !== translationKey ? translated : methodName;
}

// Helper function to get translated method description
export function getTranslatedMethodDescription(methodName: string, t: any): string {
  const normalizedName = normalizeMethodName(methodName);
  const translationKey = `methodDescriptions.${normalizedName}`;
  
  // Try to get translation, fallback to empty string if not found
  const translated = t(translationKey);
  return translated !== translationKey ? translated : '';
}

// Helper function to get translated campaign title
export function getTranslatedCampaignTitle(title: string, t: any): string {
  const normalizedTitle = normalizeMethodName(title);
  const translationKey = `campaignTitles.${normalizedTitle}`;
  
  // Try to get translation, fallback to original title if not found
  const translated = t(translationKey);
  return translated !== translationKey ? translated : title;
}

// Helper function to get translated region name
export function getTranslatedRegion(region: string, t: any): string {
  const normalizedRegion = normalizeMethodName(region);
  const translationKey = `regions.${normalizedRegion}`;
  
  // Try to get translation, fallback to original region if not found
  const translated = t(translationKey);
  return translated !== translationKey ? translated : region;
}

// Helper function to get translated time slot
export function getTranslatedTimeSlot(timeSlot: string, t: any): string {
  // Extract the first word (time period) and the time portion
  const match = timeSlot.match(/^(\w+)\s*(.*)$/);
  if (!match) return timeSlot;
  
  const [, timePeriod, timeInfo] = match;
  const normalizedTimePeriod = normalizeMethodName(timePeriod);
  const translationKey = `timeSlots.${normalizedTimePeriod}`;
  
  // Try to get translation for the time period, fallback to original if not found
  const translatedPeriod = t(translationKey);
  const finalTimePeriod = translatedPeriod !== translationKey ? translatedPeriod : timePeriod;
  
  // Combine translated period with original time info
  return timeInfo ? `${finalTimePeriod} ${timeInfo}` : finalTimePeriod;
}

// Helper function to get translated platform name
export function getTranslatedPlatform(platform: string, t: any): string {
  const normalizedPlatform = normalizeMethodName(platform);
  const translationKey = `platforms.${normalizedPlatform}`;
  
  // Try to get translation, fallback to original platform if not found
  const translated = t(translationKey);
  return translated !== translationKey ? translated : platform;
}

// Helper function to get translated content type
export function getTranslatedContentType(contentType: string, t: any): string {
  const normalizedContentType = normalizeMethodName(contentType);
  const translationKey = `contentTypes.${normalizedContentType}`;
  
  // Try to get translation, fallback to original content type if not found
  const translated = t(translationKey);
  return translated !== translationKey ? translated : contentType;
}

// Helper function to get translated message type
export function getTranslatedMessageType(messageType: string, t: any): string {
  const normalizedMessageType = normalizeMethodName(messageType);
  const translationKey = `messageTypes.${normalizedMessageType}`;
  
  // Try to get translation, fallback to original message type if not found
  const translated = t(translationKey);
  return translated !== translationKey ? translated : messageType;
}

// Helper function to get translated status
export function getTranslatedStatus(status: string, t: any): string {
  const normalizedStatus = normalizeMethodName(status);
  const translationKey = `statuses.${normalizedStatus}`;
  
  // Try to get translation, fallback to original status if not found
  const translated = t(translationKey);
  return translated !== translationKey ? translated : status;
}