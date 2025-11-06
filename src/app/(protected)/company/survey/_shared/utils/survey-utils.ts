import { SurveyDto } from "@/types/dto/survey/SurveyDto";
import { BadgeVariant, SurveyStats } from "../types";

// Status badge variant mapping
export const getStatusBadgeVariant = (isActive: boolean): BadgeVariant => {
  return isActive ? "success" : "secondary";
};

// Survey type display mapping
export const getSurveyTypeDisplay = (surveyType: string): string => {
  const typeMap: Record<string, string> = {
    APPOINTMENT_FEEDBACK: "Randevu Geri Bildirimi",
    SCHOOL_RATING: "Okul Değerlendirmesi",
    SERVICE_QUALITY: "Hizmet Kalitesi",
    ENROLLMENT_FEEDBACK: "Kayıt Geri Bildirimi",
    GENERAL_FEEDBACK: "Genel Geri Bildirim",
    CUSTOM: "Özel Anket",
  };
  return typeMap[surveyType] || surveyType;
};

// Trigger event display mapping
export const getTriggerEventDisplay = (triggerEvent: string): string => {
  const eventMap: Record<string, string> = {
    APPOINTMENT_COMPLETED: "Randevu Tamamlandığında",
    ENROLLMENT_COMPLETED: "Kayıt Tamamlandığında",
    MANUAL_SEND: "Manuel Gönderim",
    PERIODIC: "Periyodik",
    EVENT_BASED: "Etkinlik Bazlı",
  };
  return eventMap[triggerEvent] || triggerEvent;
};

// Format completion rate
export const formatCompletionRate = (rate: number): string => {
  return `%${rate.toFixed(1)}`;
};

// Format numbers with thousand separators
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("tr-TR").format(num);
};

// Calculate survey statistics
export const calculateSurveyStats = (surveys: any[]): SurveyStats => {
  if (!surveys || surveys.length === 0) {
    return {
      totalSurveys: 0,
      activeSurveys: 0,
      totalSent: 0,
      totalCompleted: 0,
      averageCompletionRate: 0,
      averageRating: 0,
      averageStaffRating: 0,
      averageCommunicationRating: 0,
      mandatorySurveys: 0,
      anonymousSurveys: 0,
    };
  }

  // Group surveys by survey ID to get unique surveys
  const surveyMap = new Map<number, any>();
  surveys.forEach((survey) => {
    const surveyId = survey.surveyId || survey.id;
    if (!surveyMap.has(surveyId)) {
      surveyMap.set(surveyId, {
        ...survey,
        responseCount: 1,
        completedCount:
          survey.status === "COMPLETED" || survey.isComplete ? 1 : 0,
      });
    } else {
      const existing = surveyMap.get(surveyId)!;
      existing.responseCount++;
      if (survey.status === "COMPLETED" || survey.isComplete) {
        existing.completedCount++;
      }
    }
  });

  const uniqueSurveys = Array.from(surveyMap.values());

  const stats: SurveyStats = {
    totalSurveys: uniqueSurveys.length,
    activeSurveys: uniqueSurveys.length, // Response olan survey'ler aktif kabul edilir
    totalSent: surveys.length, // Her response bir gönderim sayılır
    totalCompleted: surveys.filter(
      (s) => s.status === "COMPLETED" || s.isComplete
    ).length,
    averageCompletionRate: 0,
    averageRating: 0,
    averageStaffRating: 0,
    averageCommunicationRating: 0,
    mandatorySurveys: uniqueSurveys.filter((s) => s.isMandatory).length,
    anonymousSurveys: uniqueSurveys.filter((s) => s.isAnonymous).length,
  };

  // Calculate average completion rate
  if (stats.totalSent > 0) {
    stats.averageCompletionRate =
      (stats.totalCompleted / stats.totalSent) * 100;
  }

  // Calculate average rating from ALL responses (not just completed)
  // Tüm cevapların puan ortalaması
  const responsesWithRating = surveys.filter((s) => {
    const rating = s.overallRating || s.averageRating;
    return rating && rating > 0;
  });

  if (responsesWithRating.length > 0) {
    const totalRating = responsesWithRating.reduce((sum, s) => {
      return sum + (s.overallRating || s.averageRating || 0);
    }, 0);
    stats.averageRating = totalRating / responsesWithRating.length;
  }

  // Calculate average staff rating (Personel İletişim Puanı)
  const responsesWithStaffRating = surveys.filter((s) => {
    const rating = s.staffRating;
    return rating && rating > 0;
  });

  if (responsesWithStaffRating.length > 0) {
    const totalStaffRating = responsesWithStaffRating.reduce((sum, s) => {
      return sum + (s.staffRating || 0);
    }, 0);
    stats.averageStaffRating =
      totalStaffRating / responsesWithStaffRating.length;
  }

  // Calculate average communication rating (İletişim Puanı)
  const responsesWithCommunicationRating = surveys.filter((s) => {
    const rating = s.communicationRating;
    return rating && rating > 0;
  });

  if (responsesWithCommunicationRating.length > 0) {
    const totalCommunicationRating = responsesWithCommunicationRating.reduce(
      (sum, s) => {
        return sum + (s.communicationRating || 0);
      },
      0
    );
    stats.averageCommunicationRating =
      totalCommunicationRating / responsesWithCommunicationRating.length;
  }

  return stats;
};

// Get survey status display
export const getSurveyStatusDisplay = (isActive: boolean): string => {
  return isActive ? "Aktif" : "Pasif";
};

// Get survey priority display based on mandatory status
export const getSurveyPriorityDisplay = (isMandatory: boolean): string => {
  return isMandatory ? "Zorunlu" : "İsteğe Bağlı";
};

// Get survey privacy display
export const getSurveyPrivacyDisplay = (isAnonymous: boolean): string => {
  return isAnonymous ? "Anonim" : "Kimlikli";
};

// Calculate response rate
export const calculateResponseRate = (survey: SurveyDto): number => {
  if (!survey.totalSent || survey.totalSent === 0) return 0;
  return ((survey.totalStarted || 0) / survey.totalSent) * 100;
};

// Calculate completion rate from started surveys
export const calculateCompletionRateFromStarted = (
  survey: SurveyDto
): number => {
  if (!survey.totalStarted || survey.totalStarted === 0) return 0;
  return ((survey.totalCompleted || 0) / survey.totalStarted) * 100;
};

// Get estimated duration display
export const getEstimatedDurationDisplay = (survey: SurveyDto): string => {
  if (survey.estimatedDuration) return survey.estimatedDuration;
  if (survey.questionCount) {
    const minutes = Math.ceil(survey.questionCount * 0.5); // 30 seconds per question
    return `~${minutes} dakika`;
  }
  return "-";
};

// Get survey URL slug
export const getSurveyUrl = (survey: SurveyDto): string => {
  return `/survey/${survey.id}`;
};

// Check if survey has expired
export const isSurveyExpired = (survey: SurveyDto): boolean => {
  if (!survey.expiresAfterDays || !survey.createdAt) return false;
  const createdDate = new Date(survey.createdAt);
  const expiryDate = new Date(
    createdDate.getTime() + survey.expiresAfterDays * 24 * 60 * 60 * 1000
  );
  return new Date() > expiryDate;
};

// Get survey performance level based on completion rate
export const getSurveyPerformanceLevel = (
  completionRate: number
): { level: string; variant: BadgeVariant } => {
  if (completionRate >= 80) return { level: "Mükemmel", variant: "success" };
  if (completionRate >= 60) return { level: "İyi", variant: "info" };
  if (completionRate >= 40) return { level: "Orta", variant: "warning" };
  return { level: "Düşük", variant: "danger" };
};

// Sort surveys by different criteria
export const sortSurveys = (
  surveys: SurveyDto[],
  sortBy:
    | "title"
    | "createdAt"
    | "totalSent"
    | "totalCompleted"
    | "completionRate"
    | "averageRating",
  order: "asc" | "desc" = "desc"
): SurveyDto[] => {
  return [...surveys].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortBy) {
      case "title":
        aValue = a.title?.toLowerCase() || "";
        bValue = b.title?.toLowerCase() || "";
        break;
      case "createdAt":
        aValue = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        bValue = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        break;
      case "totalSent":
        aValue = a.totalSent || 0;
        bValue = b.totalSent || 0;
        break;
      case "totalCompleted":
        aValue = a.totalCompleted || 0;
        bValue = b.totalCompleted || 0;
        break;
      case "completionRate":
        aValue = a.completionRate || 0;
        bValue = b.completionRate || 0;
        break;
      case "averageRating":
        aValue = a.averageRating || 0;
        bValue = b.averageRating || 0;
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
  const surveyDate = new Date(date);
  const diffInSeconds = Math.floor(
    (now.getTime() - surveyDate.getTime()) / 1000
  );

  if (diffInSeconds < 60) return "Az önce";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} dakika önce`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} saat önce`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} gün önce`;

  return surveyDate.toLocaleDateString("tr-TR");
};
