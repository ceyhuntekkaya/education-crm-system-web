import { AnalyticsDto } from "@/types/dto/analytics/AnalyticsDto";
import { 
  getStatusBadgeVariant,
  getMetricTypeDisplay,
  getTimePeriodDisplay,
  formatAnalyticsValue,
  calculateReportsStats
} from "../utils/reports-utils";

// Mock Analytics Reports Data - Based on AnalyticsDto
export const mockReports: AnalyticsDto[] = [
  {
    id: 1,
    date: "2024-10-08",
    metricType: "TRAFFIC",
    timePeriod: "DAILY",
    pageViews: 15420,
    uniqueVisitors: 8750,
    newVisitors: 3200,
    returningVisitors: 5550,
    bounceRate: 0.32,
    averageSessionDurationSeconds: 245,
    pagesPerSession: 3.2,
    directTraffic: 4500,
    organicSearchTraffic: 6200,
    paidSearchTraffic: 1800,
    socialMediaTraffic: 2100,
    referralTraffic: 820,
    emailTraffic: 0,
    mobileVisitors: 9800,
    desktopVisitors: 4950,
    tabletVisitors: 670,
    localVisitors: 7200,
    nationalVisitors: 1400,
    internationalVisitors: 150,
    isActive: true,
    createdAt: "2024-10-08T09:00:00Z",
    lastCalculatedAt: "2024-10-08T09:00:00Z",
    calculationDurationMs: 1250,
    dataSource: "Google Analytics",
    brand: {
      id: 1,
      name: "Eğitim Plus",
    },
    school: {
      id: 1,
      name: "Merkez Kampüs",
    }
  },
  {
    id: 2,
    date: "2024-10-08",
    metricType: "ENGAGEMENT",
    timePeriod: "DAILY",
    appointmentRequests: 45,
    appointmentConfirmations: 38,
    appointmentCompletions: 32,
    messageInquiries: 67,
    phoneClicks: 89,
    emailClicks: 23,
    directionClicks: 156,
    brochureDownloads: 34,
    galleryViews: 890,
    videoViews: 234,
    socialMediaClicks: 78,
    postViews: 1250,
    postLikes: 145,
    postComments: 23,
    postShares: 67,
    internalSearches: 234,
    zeroResultSearches: 12,
    isActive: true,
    createdAt: "2024-10-08T09:15:00Z",
    lastCalculatedAt: "2024-10-08T09:15:00Z",
    calculationDurationMs: 980,
    dataSource: "Internal Analytics",
    brand: {
      id: 1,
      name: "Eğitim Plus",
    },
    school: {
      id: 1,
      name: "Merkez Kampüs",
    }
  },
  {
    id: 3,
    date: "2024-10-08",
    metricType: "CONVERSION",
    timePeriod: "DAILY",
    conversionRate: 0.085,
    appointmentConversionRate: 0.12,
    inquiryConversionRate: 0.15,
    enrollmentConversionRate: 0.08,
    searchToAppointmentRate: 0.19,
    campaignViews: 2340,
    campaignClicks: 189,
    campaignApplications: 23,
    campaignConversions: 18,
    promoCodeUsage: 12,
    discountAmountUsed: 4500,
    isActive: true,
    createdAt: "2024-10-08T09:30:00Z",
    lastCalculatedAt: "2024-10-08T09:30:00Z",
    calculationDurationMs: 1100,
    dataSource: "CRM System",
    brand: {
      id: 1,
      name: "Eğitim Plus",
    },
    school: {
      id: 1,
      name: "Merkez Kampüs",
    }
  },
  {
    id: 4,
    date: "2024-10-08",
    metricType: "PERFORMANCE",
    timePeriod: "DAILY",
    pageLoadTimeMs: 1250,
    serverResponseTimeMs: 180,
    errorRate: 0.002,
    uptimePercentage: 99.98,
    averageRating: 4.7,
    totalRatings: 234,
    isActive: true,
    createdAt: "2024-10-08T09:45:00Z",
    lastCalculatedAt: "2024-10-08T09:45:00Z",
    calculationDurationMs: 750,
    dataSource: "Server Monitoring",
    brand: {
      id: 1,
      name: "Eğitim Plus",
    },
    school: {
      id: 1,
      name: "Merkez Kampüs",
    }
  },
  {
    id: 5,
    date: "2024-10-08",
    metricType: "FINANCIAL",
    timePeriod: "DAILY",
    revenue: 45600,
    newSubscriptions: 8,
    canceledSubscriptions: 2,
    subscriptionRenewals: 15,
    churnRate: 0.03,
    isActive: true,
    createdAt: "2024-10-08T10:00:00Z",
    lastCalculatedAt: "2024-10-08T10:00:00Z",
    calculationDurationMs: 890,
    dataSource: "Payment Gateway",
    brand: {
      id: 1,
      name: "Eğitim Plus",
    },
    school: {
      id: 1,
      name: "Merkez Kampüs",
    }
  },
  {
    id: 6,
    date: "2024-10-07",
    metricType: "TRAFFIC",
    timePeriod: "DAILY",
    pageViews: 14200,
    uniqueVisitors: 8100,
    newVisitors: 2900,
    returningVisitors: 5200,
    bounceRate: 0.35,
    averageSessionDurationSeconds: 220,
    pagesPerSession: 2.9,
    directTraffic: 4100,
    organicSearchTraffic: 5800,
    paidSearchTraffic: 1600,
    socialMediaTraffic: 1900,
    referralTraffic: 700,
    emailTraffic: 0,
    mobileVisitors: 9100,
    desktopVisitors: 4500,
    tabletVisitors: 600,
    localVisitors: 6800,
    nationalVisitors: 1200,
    internationalVisitors: 100,
    visitorsGrowthRate: 0.08,
    isActive: true,
    createdAt: "2024-10-07T09:00:00Z",
    lastCalculatedAt: "2024-10-07T09:00:00Z",
    calculationDurationMs: 1180,
    dataSource: "Google Analytics",
    brand: {
      id: 1,
      name: "Eğitim Plus",
    },
    school: {
      id: 1,
      name: "Merkez Kampüs",
    }
  },
  {
    id: 7,
    date: "2024-10-01",
    metricType: "TRAFFIC",
    timePeriod: "WEEKLY",
    pageViews: 98500,
    uniqueVisitors: 52000,
    newVisitors: 18200,
    returningVisitors: 33800,
    bounceRate: 0.33,
    averageSessionDurationSeconds: 235,
    pagesPerSession: 3.1,
    directTraffic: 28000,
    organicSearchTraffic: 38500,
    paidSearchTraffic: 12000,
    socialMediaTraffic: 13500,
    referralTraffic: 6500,
    emailTraffic: 0,
    mobileVisitors: 61000,
    desktopVisitors: 30500,
    tabletVisitors: 4000,
    localVisitors: 43000,
    nationalVisitors: 8000,
    internationalVisitors: 1000,
    visitorsGrowthRate: 0.12,
    isActive: true,
    createdAt: "2024-10-01T00:00:00Z",
    lastCalculatedAt: "2024-10-01T00:00:00Z",
    calculationDurationMs: 2340,
    dataSource: "Google Analytics",
    brand: {
      id: 1,
      name: "Eğitim Plus",
    },
    school: {
      id: 1,
      name: "Merkez Kampüs",
    }
  },
  {
    id: 8,
    date: "2024-10-08",
    metricType: "SURVEY",
    timePeriod: "DAILY",
    surveyResponses: 45,
    surveyCompletionRate: 0.78,
    averageRating: 4.3,
    totalRatings: 45,
    isActive: true,
    createdAt: "2024-10-08T11:00:00Z",
    lastCalculatedAt: "2024-10-08T11:00:00Z",
    calculationDurationMs: 650,
    dataSource: "Survey System",
    brand: {
      id: 1,
      name: "Eğitim Plus",
    },
    school: {
      id: 1,
      name: "Merkez Kampüs",
    }
  },
  {
    id: 9,
    date: "2024-10-08",
    metricType: "CONTENT",
    timePeriod: "DAILY",
    postViews: 3400,
    postLikes: 289,
    postComments: 45,
    postShares: 123,
    galleryViews: 1890,
    videoViews: 567,
    brochureDownloads: 78,
    socialMediaClicks: 156,
    isActive: true,
    createdAt: "2024-10-08T11:30:00Z",
    lastCalculatedAt: "2024-10-08T11:30:00Z",
    calculationDurationMs: 820,
    dataSource: "Content Management",
    brand: {
      id: 1,
      name: "Eğitim Plus",
    },
    school: {
      id: 1,
      name: "Merkez Kampüs",
    }
  },
  {
    id: 10,
    date: "2024-10-08",
    metricType: "APPOINTMENT",
    timePeriod: "DAILY",
    appointmentRequests: 67,
    appointmentConfirmations: 54,
    appointmentCompletions: 48,
    appointmentConversionRate: 0.72,
    appointmentsGrowthRate: 0.15,
    messageInquiries: 89,
    phoneClicks: 123,
    emailClicks: 34,
    inquiryConversionRate: 0.18,
    inquiriesGrowthRate: 0.08,
    isActive: true,
    createdAt: "2024-10-08T12:00:00Z",
    lastCalculatedAt: "2024-10-08T12:00:00Z",
    calculationDurationMs: 950,
    dataSource: "Appointment System",
    brand: {
      id: 1,
      name: "Eğitim Plus",
    },
    school: {
      id: 1,
      name: "Merkez Kampüs",
    }
  },
  {
    id: 11,
    date: "2024-09-30",
    metricType: "SYSTEM",
    timePeriod: "MONTHLY",
    pageLoadTimeMs: 1180,
    serverResponseTimeMs: 165,
    errorRate: 0.001,
    uptimePercentage: 99.99,
    calculationDurationMs: 45000,
    customMetrics: JSON.stringify({
      "database_queries": 1250000,
      "cache_hit_rate": 0.95,
      "memory_usage": 0.68,
      "cpu_usage": 0.45
    }),
    isActive: true,
    createdAt: "2024-09-30T23:59:00Z",
    lastCalculatedAt: "2024-09-30T23:59:00Z",
    dataSource: "System Monitoring",
    brand: {
      id: 1,
      name: "Eğitim Plus",
    },
    school: {
      id: 1,
      name: "Merkez Kampüs",
    }
  },
  {
    id: 12,
    date: "2024-10-08",
    metricType: "USER_BEHAVIOR",
    timePeriod: "DAILY",
    internalSearches: 456,
    zeroResultSearches: 23,
    searchToAppointmentRate: 0.21,
    bounceRate: 0.29,
    pagesPerSession: 3.8,
    averageSessionDurationSeconds: 285,
    directTraffic: 5200,
    organicSearchTraffic: 7100,
    socialMediaTraffic: 2800,
    isActive: true,
    createdAt: "2024-10-08T13:00:00Z",
    lastCalculatedAt: "2024-10-08T13:00:00Z",
    calculationDurationMs: 1050,
    dataSource: "Behavior Analytics",
    brand: {
      id: 1,
      name: "Eğitim Plus",
    },
    school: {
      id: 1,
      name: "Merkez Kampüs",
    }
  }
];

// Utility functions for working with mock data
export const getReportsByMetricType = (metricType: string): AnalyticsDto[] => {
  return mockReports.filter(report => report.metricType === metricType);
};

export const getReportsByTimePeriod = (timePeriod: string): AnalyticsDto[] => {
  return mockReports.filter(report => report.timePeriod === timePeriod);
};

export const getActiveReports = (): AnalyticsDto[] => {
  return mockReports.filter(report => report.isActive);
};

export const getReportsByDateRange = (startDate: string, endDate: string): AnalyticsDto[] => {
  return mockReports.filter(report => {
    if (!report.date) return false;
    const reportDate = new Date(report.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return reportDate >= start && reportDate <= end;
  });
};

export const getReportsByBrand = (brandId: number): AnalyticsDto[] => {
  return mockReports.filter(report => report.brand?.id === brandId);
};

export const getReportsBySchool = (schoolId: number): AnalyticsDto[] => {
  return mockReports.filter(report => report.school?.id === schoolId);
};

export const getReportById = (id: number): AnalyticsDto | undefined => {
  return mockReports.find(report => report.id === id);
};

export const getLatestReports = (limit: number = 5): AnalyticsDto[] => {
  return mockReports
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, limit);
};

export const getReportsByDataSource = (dataSource: string): AnalyticsDto[] => {
  return mockReports.filter(report => report.dataSource === dataSource);
};

export const getTrafficReports = (): AnalyticsDto[] => {
  return getReportsByMetricType("TRAFFIC");
};

export const getEngagementReports = (): AnalyticsDto[] => {
  return getReportsByMetricType("ENGAGEMENT");
};

export const getConversionReports = (): AnalyticsDto[] => {
  return getReportsByMetricType("CONVERSION");
};

export const getPerformanceReports = (): AnalyticsDto[] => {
  return getReportsByMetricType("PERFORMANCE");
};

export const getFinancialReports = (): AnalyticsDto[] => {
  return getReportsByMetricType("FINANCIAL");
};

// Re-export utility functions that work with mock data
export {
  getStatusBadgeVariant,
  getMetricTypeDisplay,
  getTimePeriodDisplay,
  formatAnalyticsValue,
  calculateReportsStats
};
