import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function generateReportId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SM-${timestamp}-${random}`;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: "status-pending",
    "in-progress": "status-in-progress",
    resolved: "status-resolved",
    rejected: "status-rejected",
  };
  return colors[status] || "status-pending";
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    roads: "🛣️",
    streetlights: "💡",
    drainage: "🌊",
    garbage: "🗑️",
    flooding: "🌧️",
    sidewalks: "🚶",
    bridges: "🌉",
    other: "📋",
  };
  return icons[category] || "📋";
}

export const BARANGAYS_SAN_MATEO = [
  "Ampid I",
  "Ampid II",
  "Banaba",
  "Dulong Bayan I",
  "Dulong Bayan II",
  "Guinayang",
  "Guitnang Bayan I",
  "Guitnang Bayan II",
  "Gulod Malaya",
  "Malanday",
  "Maly",
  "Santa Ana",
  "Santo Niño",
  "Silangan",
];

export const ISSUE_CATEGORIES = [
  { value: "roads", label: "Roads & Potholes", icon: "🛣️" },
  { value: "streetlights", label: "Streetlights", icon: "💡" },
  { value: "drainage", label: "Drainage & Canals", icon: "🌊" },
  { value: "garbage", label: "Garbage Collection", icon: "🗑️" },
  { value: "flooding", label: "Flooding", icon: "🌧️" },
  { value: "sidewalks", label: "Sidewalks", icon: "🚶" },
  { value: "bridges", label: "Bridges", icon: "🌉" },
  { value: "other", label: "Other", icon: "📋" },
];

export const PRIORITY_LEVELS = [
  { value: "low", label: "Low", color: "text-green-600" },
  { value: "medium", label: "Medium", color: "text-yellow-600" },
  { value: "high", label: "High", color: "text-orange-600" },
  { value: "critical", label: "Critical", color: "text-red-600" },
];
