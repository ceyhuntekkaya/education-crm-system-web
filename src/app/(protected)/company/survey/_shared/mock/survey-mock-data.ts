import { SurveyDto } from "@/types/dto/survey/SurveyDto";
import { SurveyQuestionDto } from "@/types/dto/survey/SurveyQuestionDto";
import { SurveyResponseDto } from "@/types/dto/survey/SurveyResponseDto";
import {
  getStatusBadgeVariant,
  getSurveyTypeDisplay,
  getTriggerEventDisplay,
  formatCompletionRate,
  calculateSurveyStats,
} from "../utils/survey-utils";

// Mock Survey Questions Data
const mockSurveyQuestions: SurveyQuestionDto[] = [
  {
    id: 1,
    surveyId: 1,
    questionText:
      "Randevu deneyiminizi genel olarak nasıl değerlendiriyorsunuz?",
    description: "Randevu sürecinin tamamını değerlendirin",
    questionType: "RATING_STAR",
    ratingCategory: "OVERALL_SATISFACTION",
    isRequired: true,
    sortOrder: 1,
    isActive: true,
    ratingScaleMin: 1,
    ratingScaleMax: 5,
    ratingScaleStep: 1,
    totalResponses: 145,
    averageRating: 4.2,
    skipCount: 3,
    responseRate: 97.9,
    skipRate: 2.1,
  },
  {
    id: 2,
    surveyId: 1,
    questionText: "Personelimizin davranışını nasıl buldunuz?",
    questionType: "SINGLE_CHOICE",
    ratingCategory: "STAFF_FRIENDLINESS",
    isRequired: true,
    sortOrder: 2,
    isActive: true,
    options: JSON.stringify(["Çok İyi", "İyi", "Orta", "Kötü", "Çok Kötü"]),
    allowOtherOption: true,
    otherOptionLabel: "Diğer (belirtiniz)",
    totalResponses: 142,
    skipCount: 6,
    responseRate: 95.9,
    skipRate: 4.1,
  },
  {
    id: 3,
    surveyId: 2,
    questionText: "Okulumuzun genel temizliğini nasıl değerlendiriyorsunuz?",
    questionType: "RATING_SCALE",
    ratingCategory: "CLEANLINESS",
    isRequired: true,
    sortOrder: 1,
    isActive: true,
    ratingScaleMin: 1,
    ratingScaleMax: 10,
    ratingScaleStep: 1,
    ratingLabels: JSON.stringify({
      "1": "Çok Kötü",
      "5": "Orta",
      "10": "Mükemmel",
    }),
    totalResponses: 89,
    averageRating: 7.8,
    skipCount: 2,
    responseRate: 97.8,
    skipRate: 2.2,
  },
];

// Mock Survey Data - Based on SurveyDto
export const mockSurveys: SurveyDto[] = [
  {
    id: 1,
    title: "Randevu Memnuniyet Anketi",
    description:
      "Randevu sürecinden sonra gelen otomatik memnuniyet anketi. Hizmet kalitemizi artırmak için görüşleriniz bizim için çok değerli.",
    surveyType: "APPOINTMENT_FEEDBACK",
    triggerEvent: "APPOINTMENT_COMPLETED",
    isActive: true,
    isAnonymous: false,
    isMandatory: false,
    showResultsToPublic: false,
    sendDelayHours: 2,
    reminderDelayHours: 24,
    maxReminders: 2,
    expiresAfterDays: 7,
    primaryColor: "#007bff",
    logoUrl: "https://picsum.photos/200/80?random=1",
    headerImageUrl: "https://picsum.photos/800/200?random=1",
    welcomeMessage:
      "Merhaba! Randevu deneyiminiz hakkında görüşlerinizi almak istiyoruz.",
    thankYouMessage: "Teşekkürler! Görüşleriniz bizim için çok değerli.",
    completionRedirectUrl: "/tesekkurler",
    emailSubject: "Randevu Deneyiminizi Değerlendirin",
    emailBody:
      "Merhaba, randevu deneyiminiz hakkında kısa bir anket hazırladık...",
    totalSent: 245,
    totalStarted: 198,
    totalCompleted: 148,
    averageCompletionTimeSeconds: 180,
    averageRating: 4.2,
    startRate: 80.8,
    completionRate: 74.7,
    questionCount: 8,
    estimatedDuration: "3-4 dakika",
    hasRatingQuestions: true,
    questions: mockSurveyQuestions.filter((q) => q.surveyId === 1),
    createdAt: "2024-03-15T10:30:00Z",
    updatedAt: "2024-03-20T14:15:00Z",
  },
  {
    id: 2,
    title: "Okul Değerlendirme Anketi",
    description:
      "Okulumuzun genel hizmet kalitesi, temizlik, personel davranışları ve tesisler hakkında değerlendirme anketi.",
    surveyType: "SCHOOL_RATING",
    triggerEvent: "PERIODIC",
    isActive: true,
    isAnonymous: true,
    isMandatory: false,
    showResultsToPublic: true,
    sendDelayHours: 0,
    reminderDelayHours: 72,
    maxReminders: 1,
    expiresAfterDays: 14,
    primaryColor: "#28a745",
    logoUrl: "https://picsum.photos/200/80?random=2",
    headerImageUrl: "https://picsum.photos/800/200?random=2",
    welcomeMessage: "Okulumuz hakkındaki görüşleriniz bizim için çok önemli!",
    thankYouMessage: "Değerli görüşleriniz için teşekkür ederiz!",
    emailSubject: "Okul Değerlendirme Anketi",
    emailBody:
      "Okulumuzun hizmet kalitesini artırmak için görüşlerinize ihtiyacımız var...",
    totalSent: 156,
    totalStarted: 134,
    totalCompleted: 91,
    averageCompletionTimeSeconds: 420,
    averageRating: 4.1,
    startRate: 85.9,
    completionRate: 67.9,
    questionCount: 12,
    estimatedDuration: "6-8 dakika",
    hasRatingQuestions: true,
    questions: mockSurveyQuestions.filter((q) => q.surveyId === 2),
    createdAt: "2024-03-10T09:00:00Z",
    updatedAt: "2024-03-18T16:30:00Z",
  },
  {
    id: 3,
    title: "Hizmet Kalitesi Değerlendirmesi",
    description:
      "Genel hizmet kalitemizi değerlendirmek ve iyileştirme alanlarını belirlemek için hazırlanmış kapsamlı anket.",
    surveyType: "SERVICE_QUALITY",
    triggerEvent: "MANUAL_SEND",
    isActive: true,
    isAnonymous: false,
    isMandatory: true,
    showResultsToPublic: false,
    sendDelayHours: 0,
    reminderDelayHours: 48,
    maxReminders: 3,
    expiresAfterDays: 10,
    primaryColor: "#ffc107",
    logoUrl: "https://picsum.photos/200/80?random=3",
    welcomeMessage:
      "Hizmet kalitemizi artırmak için görüşlerinize ihtiyacımız var.",
    thankYouMessage: "Katılımınız için teşekkürler!",
    emailSubject: "Zorunlu Hizmet Kalitesi Anketi",
    emailBody: "Bu anket zorunludur ve tamamlanması gerekmektedir...",
    totalSent: 89,
    totalStarted: 89,
    totalCompleted: 76,
    averageCompletionTimeSeconds: 300,
    averageRating: 3.8,
    startRate: 100.0,
    completionRate: 85.4,
    questionCount: 6,
    estimatedDuration: "4-5 dakika",
    hasRatingQuestions: true,
    createdAt: "2024-03-12T14:20:00Z",
    updatedAt: "2024-03-19T11:45:00Z",
  },
  {
    id: 4,
    title: "Kayıt Süreci Geri Bildirimi",
    description:
      "Kayıt sürecini tamamlayan ailelerden gelen otomatik geri bildirim anketi. Süreçteki deneyimlerini öğrenmek istiyoruz.",
    surveyType: "ENROLLMENT_FEEDBACK",
    triggerEvent: "ENROLLMENT_COMPLETED",
    isActive: true,
    isAnonymous: false,
    isMandatory: false,
    showResultsToPublic: false,
    sendDelayHours: 6,
    reminderDelayHours: 24,
    maxReminders: 1,
    expiresAfterDays: 5,
    primaryColor: "#17a2b8",
    logoUrl: "https://picsum.photos/200/80?random=4",
    headerImageUrl: "https://picsum.photos/800/200?random=4",
    welcomeMessage:
      "Kayıt süreciniz tamamlandı! Deneyiminizi paylaşır mısınız?",
    thankYouMessage: "Geri bildiriminiz için teşekkürler!",
    completionRedirectUrl: "/kayit-tamamlandi",
    emailSubject: "Kayıt Sürecini Değerlendirin",
    emailBody:
      "Kayıt süreciniz başarıyla tamamlandı. Deneyiminizi değerlendirmek ister misiniz?",
    totalSent: 67,
    totalStarted: 52,
    totalCompleted: 41,
    averageCompletionTimeSeconds: 240,
    averageRating: 4.5,
    startRate: 77.6,
    completionRate: 78.8,
    questionCount: 5,
    estimatedDuration: "3-4 dakika",
    hasRatingQuestions: true,
    createdAt: "2024-03-08T16:15:00Z",
    updatedAt: "2024-03-16T10:20:00Z",
  },
  {
    id: 5,
    title: "Genel Memnuniyet Anketi",
    description:
      "Tüm hizmetlerimiz hakkında genel bir memnuniyet anketi. Yıllık değerlendirme için kullanılmaktadır.",
    surveyType: "GENERAL_FEEDBACK",
    triggerEvent: "PERIODIC",
    isActive: false,
    isAnonymous: true,
    isMandatory: false,
    showResultsToPublic: true,
    sendDelayHours: 0,
    reminderDelayHours: 168, // 1 hafta
    maxReminders: 2,
    expiresAfterDays: 21,
    primaryColor: "#6f42c1",
    logoUrl: "https://picsum.photos/200/80?random=5",
    welcomeMessage: "Yıllık genel memnuniyet anketimize hoş geldiniz!",
    thankYouMessage: "Değerli zamanınız için teşekkürler!",
    emailSubject: "Yıllık Memnuniyet Anketi",
    emailBody: "Yıllık değerlendirme anketimize katılmanızı rica ediyoruz...",
    totalSent: 234,
    totalStarted: 178,
    totalCompleted: 123,
    averageCompletionTimeSeconds: 600,
    averageRating: 4.0,
    startRate: 76.1,
    completionRate: 69.1,
    questionCount: 15,
    estimatedDuration: "8-10 dakika",
    hasRatingQuestions: true,
    createdAt: "2024-02-28T12:00:00Z",
    updatedAt: "2024-03-05T09:30:00Z",
  },
  {
    id: 6,
    title: "Özel Etkinlik Değerlendirmesi",
    description:
      "Düzenlenen özel etkinlikler sonrası katılımcı memnuniyetini ölçmek için hazırlanmış anket.",
    surveyType: "CUSTOM",
    triggerEvent: "EVENT_BASED",
    isActive: true,
    isAnonymous: false,
    isMandatory: false,
    showResultsToPublic: false,
    sendDelayHours: 1,
    reminderDelayHours: 12,
    maxReminders: 1,
    expiresAfterDays: 3,
    primaryColor: "#e83e8c",
    logoUrl: "https://picsum.photos/200/80?random=6",
    headerImageUrl: "https://picsum.photos/800/200?random=6",
    welcomeMessage:
      "Etkinliğimize katıldığınız için teşekkürler! Görüşlerinizi merak ediyoruz.",
    thankYouMessage:
      "Geri bildiriminiz gelecek etkinliklerimizi şekillendiriyor!",
    emailSubject: "Etkinlik Değerlendirme Anketi",
    emailBody:
      "Katıldığınız etkinlik hakkında görüşlerinizi almak istiyoruz...",
    totalSent: 45,
    totalStarted: 38,
    totalCompleted: 32,
    averageCompletionTimeSeconds: 150,
    averageRating: 4.7,
    startRate: 84.4,
    completionRate: 84.2,
    questionCount: 4,
    estimatedDuration: "2-3 dakika",
    hasRatingQuestions: true,
    createdAt: "2024-03-14T18:45:00Z",
    updatedAt: "2024-03-17T13:10:00Z",
  },
  {
    id: 7,
    title: "Teknoloji Kullanım Anketi",
    description:
      "Dijital platformlarımız ve teknoloji hizmetlerimiz hakkında kullanıcı deneyimi anketi.",
    surveyType: "CUSTOM",
    triggerEvent: "MANUAL_SEND",
    isActive: true,
    isAnonymous: true,
    isMandatory: false,
    showResultsToPublic: false,
    sendDelayHours: 0,
    reminderDelayHours: 48,
    maxReminders: 2,
    expiresAfterDays: 14,
    primaryColor: "#20c997",
    logoUrl: "https://picsum.photos/200/80?random=7",
    welcomeMessage: "Teknoloji hizletlerimizi nasıl buluyorsunuz?",
    thankYouMessage: "Teknoloji deneyiminizi paylaştığınız için teşekkürler!",
    emailSubject: "Teknoloji Hizmetleri Anketi",
    emailBody:
      "Dijital hizmetlerimizi geliştirmek için görüşlerinize ihtiyacımız var...",
    totalSent: 112,
    totalStarted: 87,
    totalCompleted: 64,
    averageCompletionTimeSeconds: 360,
    averageRating: 3.9,
    startRate: 77.7,
    completionRate: 73.6,
    questionCount: 9,
    estimatedDuration: "5-6 dakika",
    hasRatingQuestions: true,
    createdAt: "2024-03-11T11:30:00Z",
    updatedAt: "2024-03-21T15:45:00Z",
  },
  {
    id: 8,
    title: "Kafeterya Hizmetleri Anketi",
    description:
      "Kafeterya hizmetleri, yemek kalitesi ve menü çeşitliliği hakkında değerlendirme anketi.",
    surveyType: "SERVICE_QUALITY",
    triggerEvent: "PERIODIC",
    isActive: true,
    isAnonymous: false,
    isMandatory: false,
    showResultsToPublic: true,
    sendDelayHours: 0,
    reminderDelayHours: 24,
    maxReminders: 1,
    expiresAfterDays: 7,
    primaryColor: "#fd7e14",
    logoUrl: "https://picsum.photos/200/80?random=8",
    welcomeMessage: "Kafeterya hizmetlerimizi değerlendirin!",
    thankYouMessage: "Lezzetli geri bildirimleriniz için teşekkürler!",
    emailSubject: "Kafeterya Değerlendirme Anketi",
    emailBody:
      "Kafeterya hizmetlerimizi nasıl buluyorsunuz? Görüşlerinizi paylaşın...",
    totalSent: 78,
    totalStarted: 65,
    totalCompleted: 49,
    averageCompletionTimeSeconds: 200,
    averageRating: 3.6,
    startRate: 83.3,
    completionRate: 75.4,
    questionCount: 7,
    estimatedDuration: "3-4 dakika",
    hasRatingQuestions: true,
    createdAt: "2024-03-09T13:20:00Z",
    updatedAt: "2024-03-15T17:00:00Z",
  },
];

// Utility functions for working with mock data
export const getSurveysByType = (surveyType: string): SurveyDto[] => {
  return mockSurveys.filter((survey) => survey.surveyType === surveyType);
};

export const getSurveysByTriggerEvent = (triggerEvent: string): SurveyDto[] => {
  return mockSurveys.filter((survey) => survey.triggerEvent === triggerEvent);
};

export const getActiveSurveys = (): SurveyDto[] => {
  return mockSurveys.filter((survey) => survey.isActive);
};

export const getMandatorySurveys = (): SurveyDto[] => {
  return mockSurveys.filter((survey) => survey.isMandatory);
};

export const getAnonymousSurveys = (): SurveyDto[] => {
  return mockSurveys.filter((survey) => survey.isAnonymous);
};

export const getHighestRatedSurveys = (limit: number = 5): SurveyDto[] => {
  return mockSurveys
    .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
    .slice(0, limit);
};

export const getMostCompletedSurveys = (limit: number = 5): SurveyDto[] => {
  return mockSurveys
    .sort((a, b) => (b.totalCompleted || 0) - (a.totalCompleted || 0))
    .slice(0, limit);
};

export const getSurveyById = (id: number): SurveyDto | undefined => {
  return mockSurveys.find((survey) => survey.id === id);
};

// Mock Survey Response Data - Tamamlanmış anket cevapları
export const mockSurveyResponses: SurveyResponseDto[] = [
  {
    id: 1,
    surveyId: 1,
    surveyTitle: "Randevu Memnuniyet Anketi",
    respondentUserId: 101,
    respondentUserName: "Ahmet Yılmaz",
    schoolId: 1,
    schoolName: "Bahçeşehir Koleji",
    appointmentId: 1001,
    responseToken: "resp_abc123",
    status: "COMPLETED",
    startedAt: "2024-10-20T09:15:00Z",
    completedAt: "2024-10-20T09:22:30Z",
    submittedAt: "2024-10-20T09:22:30Z",
    completionTimeSeconds: 450,
    respondentName: "Ahmet Yılmaz",
    respondentEmail: "ahmet.yilmaz@email.com",
    respondentPhone: "+90 555 123 4567",
    overallRating: 4.5,
    cleanlinessRating: 4.0,
    staffRating: 5.0,
    facilitiesRating: 4.2,
    communicationRating: 4.8,
    generalFeedback: "Çok memnun kaldım, personel ilgili ve güler yüzlüydü.",
    wouldRecommend: true,
    likelihoodToEnroll: 9,
    formattedCompletionTime: "7 dakika 30 saniye",
    statusDisplayName: "Tamamlandı",
    progressPercentage: 100,
    isComplete: true,
    isExpired: false,
    createdAt: "2024-10-20T09:15:00Z",
    updatedAt: "2024-10-20T09:22:30Z",
  },
  {
    id: 2,
    surveyId: 1,
    surveyTitle: "Randevu Memnuniyet Anketi",
    respondentUserId: 102,
    respondentUserName: "Fatma Demir",
    schoolId: 1,
    schoolName: "Bahçeşehir Koleji",
    appointmentId: 1002,
    responseToken: "resp_def456",
    status: "COMPLETED",
    startedAt: "2024-10-21T14:30:00Z",
    completedAt: "2024-10-21T14:35:15Z",
    submittedAt: "2024-10-21T14:35:15Z",
    completionTimeSeconds: 315,
    respondentName: "Fatma Demir",
    respondentEmail: "fatma.demir@email.com",
    respondentPhone: "+90 555 987 6543",
    overallRating: 3.8,
    cleanlinessRating: 3.5,
    staffRating: 4.2,
    facilitiesRating: 3.8,
    communicationRating: 4.0,
    generalFeedback: "Genel olarak iyi ama bekleme süresi uzundu.",
    wouldRecommend: true,
    likelihoodToEnroll: 7,
    formattedCompletionTime: "5 dakika 15 saniye",
    statusDisplayName: "Tamamlandı",
    progressPercentage: 100,
    isComplete: true,
    isExpired: false,
    createdAt: "2024-10-21T14:30:00Z",
    updatedAt: "2024-10-21T14:35:15Z",
  },
  {
    id: 3,
    surveyId: 2,
    surveyTitle: "Okul Kalite Değerlendirmesi",
    respondentUserId: 103,
    respondentUserName: "Mehmet Kaya",
    schoolId: 2,
    schoolName: "TED Koleji",
    responseToken: "resp_ghi789",
    status: "COMPLETED",
    startedAt: "2024-10-22T10:45:00Z",
    completedAt: "2024-10-22T10:52:20Z",
    submittedAt: "2024-10-22T10:52:20Z",
    completionTimeSeconds: 440,
    respondentName: "Mehmet Kaya",
    respondentEmail: "mehmet.kaya@email.com",
    respondentPhone: "+90 555 246 8135",
    overallRating: 4.8,
    cleanlinessRating: 4.9,
    staffRating: 4.7,
    facilitiesRating: 4.8,
    communicationRating: 4.6,
    generalFeedback: "Mükemmel bir deneyimdi, kesinlikle tavsiye ederim.",
    wouldRecommend: true,
    likelihoodToEnroll: 10,
    formattedCompletionTime: "7 dakika 20 saniye",
    statusDisplayName: "Tamamlandı",
    progressPercentage: 100,
    isComplete: true,
    isExpired: false,
    createdAt: "2024-10-22T10:45:00Z",
    updatedAt: "2024-10-22T10:52:20Z",
  },
  {
    id: 4,
    surveyId: 1,
    surveyTitle: "Randevu Memnuniyet Anketi",
    respondentUserId: 104,
    respondentUserName: "Ayşe Özkan",
    schoolId: 1,
    schoolName: "Bahçeşehir Koleji",
    appointmentId: 1003,
    responseToken: "resp_jkl012",
    status: "IN_PROGRESS",
    startedAt: "2024-10-23T16:20:00Z",
    completionTimeSeconds: 180,
    respondentName: "Ayşe Özkan",
    respondentEmail: "ayse.ozkan@email.com",
    respondentPhone: "+90 555 369 2580",
    overallRating: 4.0,
    statusDisplayName: "Devam Ediyor",
    progressPercentage: 60,
    isComplete: false,
    isExpired: false,
    createdAt: "2024-10-23T16:20:00Z",
    updatedAt: "2024-10-23T16:23:00Z",
  },
  {
    id: 5,
    surveyId: 3,
    surveyTitle: "Hizmet Kalitesi Değerlendirmesi",
    respondentUserId: 105,
    respondentUserName: "Emre Çelik",
    schoolId: 3,
    schoolName: "Özel Doğa Koleji",
    responseToken: "resp_mno345",
    status: "COMPLETED",
    startedAt: "2024-10-24T11:10:00Z",
    completedAt: "2024-10-24T11:16:45Z",
    submittedAt: "2024-10-24T11:16:45Z",
    completionTimeSeconds: 405,
    respondentName: "Emre Çelik",
    respondentEmail: "emre.celik@email.com",
    respondentPhone: "+90 555 147 8520",
    overallRating: 4.3,
    cleanlinessRating: 4.1,
    staffRating: 4.5,
    facilitiesRating: 4.0,
    communicationRating: 4.4,
    generalFeedback: "Hizmet kalitesi yüksek, çok memnun kaldım.",
    wouldRecommend: true,
    likelihoodToEnroll: 8,
    formattedCompletionTime: "6 dakika 45 saniye",
    statusDisplayName: "Tamamlandı",
    progressPercentage: 100,
    isComplete: true,
    isExpired: false,
    createdAt: "2024-10-24T11:10:00Z",
    updatedAt: "2024-10-24T11:16:45Z",
  },
];

// Survey Response utility functions
export const getResponsesBySurveyId = (
  surveyId: number
): SurveyResponseDto[] => {
  return mockSurveyResponses.filter(
    (response) => response.surveyId === surveyId
  );
};

export const getResponsesBySchoolId = (
  schoolId: number
): SurveyResponseDto[] => {
  return mockSurveyResponses.filter(
    (response) => response.schoolId === schoolId
  );
};

export const getCompletedResponses = (): SurveyResponseDto[] => {
  return mockSurveyResponses.filter(
    (response) => response.status === "COMPLETED"
  );
};

export const getInProgressResponses = (): SurveyResponseDto[] => {
  return mockSurveyResponses.filter(
    (response) => response.status === "IN_PROGRESS"
  );
};

// Re-export utility functions that work with mock data
export {
  getStatusBadgeVariant,
  getSurveyTypeDisplay,
  getTriggerEventDisplay,
  formatCompletionRate,
  calculateSurveyStats,
};
