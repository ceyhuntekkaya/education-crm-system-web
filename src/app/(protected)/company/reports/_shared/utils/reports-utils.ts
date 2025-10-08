import { AnalyticsDto } from "@/types/dto/analytics/AnalyticsDto";
import { BadgeVariant, ReportsStats } from "../types";

// Status badge variant mapping
export const getStatusBadgeVariant = (isActive: boolean): BadgeVariant => {
  return isActive ? "success" : "secondary";
};

// Metric type display mapping
export const getMetricTypeDisplay = (metricType: string): string => {
  const typeMap: Record<string, string> = {
    TRAFFIC: "Trafik",
    ENGAGEMENT: "Etkileşim",
    CONVERSION: "Dönüşüm",
    PERFORMANCE: "Performans",
    FINANCIAL: "Finansal",
    CONTENT: "İçerik",
    USER_BEHAVIOR: "Kullanıcı Davranışı",
    SEARCH: "Arama",
    APPOINTMENT: "Randevu",
    SURVEY: "Anket",
    SUBSCRIPTION: "Abonelik",
    SYSTEM: "Sistem",
  };
  return typeMap[metricType] || metricType;
};

// Time period display mapping
export const getTimePeriodDisplay = (timePeriod: string): string => {
  const periodMap: Record<string, string> = {
    HOURLY: "Saatlik",
    DAILY: "Günlük",
    WEEKLY: "Haftalık",
    MONTHLY: "Aylık",
    QUARTERLY: "Çeyreklik",
    YEARLY: "Yıllık",
    REAL_TIME: "Gerçek Zamanlı",
  };
  return periodMap[timePeriod] || timePeriod;
};

// Format analytics values
export const formatAnalyticsValue = (value: number | undefined, type: "number" | "percentage" | "currency" | "duration" = "number"): string => {
  if (value === undefined || value === null) return "-";
  
  switch (type) {
    case "percentage":
      return `${(value * 100).toFixed(1)}%`;
    case "currency":
      return new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    case "duration":
      const minutes = Math.floor(value / 60);
      const seconds = value % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    case "number":
    default:
      return new Intl.NumberFormat("tr-TR").format(value);
  }
};

// Format numbers with thousand separators
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("tr-TR").format(num);
};

// Calculate reports statistics
export const calculateReportsStats = (reports: AnalyticsDto[]): ReportsStats => {
  const stats: ReportsStats = {
    totalReports: reports.length,
    activeReports: reports.filter(r => r.isActive).length,
    trafficReports: reports.filter(r => r.metricType === "TRAFFIC").length,
    engagementReports: reports.filter(r => r.metricType === "ENGAGEMENT").length,
    conversionReports: reports.filter(r => r.metricType === "CONVERSION").length,
    performanceReports: reports.filter(r => r.metricType === "PERFORMANCE").length,
    financialReports: reports.filter(r => r.metricType === "FINANCIAL").length,
    averagePageViews: reports.reduce((sum, r) => sum + (r.pageViews || 0), 0) / reports.length,
    averageConversionRate: reports.reduce((sum, r) => sum + (r.conversionRate || 0), 0) / reports.length,
  };
  
  return stats;
};

// Get report status display
export const getReportStatusDisplay = (isActive: boolean): string => {
  return isActive ? "Aktif" : "Pasif";
};

// Get metric type badge variant
export const getMetricTypeBadgeVariant = (metricType: string): BadgeVariant => {
  const variantMap: Record<string, BadgeVariant> = {
    TRAFFIC: "primary",
    ENGAGEMENT: "info",
    CONVERSION: "success",
    PERFORMANCE: "warning",
    FINANCIAL: "danger",
    CONTENT: "secondary",
    USER_BEHAVIOR: "light",
    SEARCH: "dark",
    APPOINTMENT: "primary",
    SURVEY: "info",
    SUBSCRIPTION: "success",
    SYSTEM: "warning",
  };
  return variantMap[metricType] || "secondary";
};

// Get time period badge variant
export const getTimePeriodBadgeVariant = (timePeriod: string): BadgeVariant => {
  const variantMap: Record<string, BadgeVariant> = {
    REAL_TIME: "danger",
    HOURLY: "warning",
    DAILY: "primary",
    WEEKLY: "info",
    MONTHLY: "success",
    QUARTERLY: "secondary",
    YEARLY: "dark",
  };
  return variantMap[timePeriod] || "secondary";
};

// Calculate growth rate display
export const getGrowthRateDisplay = (growthRate: number | undefined): { display: string; variant: BadgeVariant } => {
  if (growthRate === undefined || growthRate === null) {
    return { display: "-", variant: "secondary" };
  }
  
  const percentage = (growthRate * 100).toFixed(1);
  const display = growthRate >= 0 ? `+${percentage}%` : `${percentage}%`;
  const variant: BadgeVariant = growthRate >= 0 ? "success" : "danger";
  
  return { display, variant };
};

// Get data source display
export const getDataSourceDisplay = (dataSource: string | undefined): string => {
  if (!dataSource) return "Bilinmiyor";
  
  const sourceMap: Record<string, string> = {
    "Google Analytics": "Google Analytics",
    "Internal Analytics": "İç Analitik",
    "CRM System": "CRM Sistemi",
    "Server Monitoring": "Sunucu İzleme",
    "Payment Gateway": "Ödeme Sistemi",
    "Survey System": "Anket Sistemi",
    "Content Management": "İçerik Yönetimi",
    "Appointment System": "Randevu Sistemi",
    "System Monitoring": "Sistem İzleme",
    "Behavior Analytics": "Davranış Analizi",
  };
  
  return sourceMap[dataSource] || dataSource;
};

// Format calculation duration
export const formatCalculationDuration = (durationMs: number | undefined): string => {
  if (!durationMs) return "-";
  
  if (durationMs < 1000) {
    return `${durationMs}ms`;
  } else if (durationMs < 60000) {
    return `${(durationMs / 1000).toFixed(1)}s`;
  } else {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  }
};

// Get performance indicator
export const getPerformanceIndicator = (report: AnalyticsDto): { label: string; variant: BadgeVariant } => {
  if (report.metricType === "PERFORMANCE") {
    const loadTime = report.pageLoadTimeMs || 0;
    if (loadTime < 1000) return { label: "Mükemmel", variant: "success" };
    if (loadTime < 2000) return { label: "İyi", variant: "primary" };
    if (loadTime < 3000) return { label: "Orta", variant: "warning" };
    return { label: "Yavaş", variant: "danger" };
  }
  
  if (report.metricType === "CONVERSION") {
    const conversionRate = report.conversionRate || 0;
    if (conversionRate > 0.1) return { label: "Yüksek", variant: "success" };
    if (conversionRate > 0.05) return { label: "Orta", variant: "primary" };
    if (conversionRate > 0.02) return { label: "Düşük", variant: "warning" };
    return { label: "Çok Düşük", variant: "danger" };
  }
  
  if (report.metricType === "ENGAGEMENT") {
    const bounceRate = report.bounceRate || 0;
    if (bounceRate < 0.3) return { label: "Mükemmel", variant: "success" };
    if (bounceRate < 0.5) return { label: "İyi", variant: "primary" };
    if (bounceRate < 0.7) return { label: "Orta", variant: "warning" };
    return { label: "Kötü", variant: "danger" };
  }
  
  return { label: "Normal", variant: "secondary" };
};

// Sort reports by different criteria
export const sortReports = (
  reports: AnalyticsDto[],
  sortBy: "date" | "metricType" | "createdAt" | "pageViews" | "conversionRate",
  order: "asc" | "desc" = "desc"
): AnalyticsDto[] => {
  return [...reports].sort((a, b) => {
    let aValue: any;
    let bValue: any;
    
    switch (sortBy) {
      case "date":
        aValue = a.date ? new Date(a.date).getTime() : 0;
        bValue = b.date ? new Date(b.date).getTime() : 0;
        break;
      case "metricType":
        aValue = a.metricType?.toLowerCase() || "";
        bValue = b.metricType?.toLowerCase() || "";
        break;
      case "createdAt":
        aValue = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        bValue = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        break;
      case "pageViews":
        aValue = a.pageViews || 0;
        bValue = b.pageViews || 0;
        break;
      case "conversionRate":
        aValue = a.conversionRate || 0;
        bValue = b.conversionRate || 0;
        break;
      default:
        return 0;
    }
    
    if (order === "asc") {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });
};

// Get time ago display
export const getTimeAgo = (date: string): string => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);
  
  if (diffInSeconds < 60) return "Az önce";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} dakika önce`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} saat önce`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} gün önce`;
  
  return targetDate.toLocaleDateString("tr-TR");
};

// Get report summary
export const getReportSummary = (report: AnalyticsDto): string => {
  const metricType = getMetricTypeDisplay(report.metricType || "");
  const timePeriod = getTimePeriodDisplay(report.timePeriod || "");
  const date = report.date ? new Date(report.date).toLocaleDateString("tr-TR") : "Tarih yok";
  
  return `${metricType} - ${timePeriod} (${date})`;
};
