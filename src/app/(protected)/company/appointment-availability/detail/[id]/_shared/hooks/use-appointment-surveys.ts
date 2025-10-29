import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, SurveyTemplateDto } from "@/types";
import { SurveyType } from "@/enums";

interface UseAppointmentSurveysReturn {
  surveys: SurveyTemplateDto[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Randevuya ait anketleri getiren hook
 * Şu an mock data kullanıyor, API hazır olduğunda uncomment edilecek
 */
export const useAppointmentSurveys = (
  appointmentId: string
): UseAppointmentSurveysReturn => {
  // API kullanımı için hazır yapı
  // const {
  //   data: surveysResponse,
  //   loading: isLoading,
  //   error,
  //   refetch,
  // } = useGet<ApiResponseDto<SurveyTemplateDto[]>>(
  //   appointmentId ? API_ENDPOINTS.SURVEYS.BY_APPOINTMENT_ID(appointmentId) : null
  // );

  // Mock data - geliştirme aşamasında kullanılıyor
  const mockSurveys: SurveyTemplateDto[] = [
    {
      id: 1,
      templateName: "Müşteri Memnuniyet Anketi",
      templateDescription:
        "Randevu sonrası müşteri memnuniyetini ölçmek için hazırlanmış standart anket",
      surveyType: SurveyType.APPOINTMENT_FEEDBACK,
      industry: "Eğitim",
      category: "Memnuniyet",
      isPublic: true,
      isRecommended: true,
      usageCount: 156,
      averageRating: 4.5,
      previewUrl: "",
      questions: [
        {
          id: 1,
          questionText: "Randevudan ne kadar memnun kaldınız?",
          questionType: "RATING_STAR",
          isRequired: true,
          sortOrder: 1,
          isActive: true,
        },
        {
          id: 2,
          questionText: "Personelimizin yaklaşımını nasıl değerlendirirsiniz?",
          questionType: "RATING_SCALE",
          isRequired: true,
          sortOrder: 2,
          isActive: true,
          ratingScaleMin: 1,
          ratingScaleMax: 5,
          ratingScaleStep: 1,
        },
      ],
      createdByUserName: "Sistem",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      templateName: "Okul Tanıtım Geri Bildirimi",
      templateDescription:
        "Okul gezisi ve tanıtım sunumu sonrası veli geri bildirimlerini toplamak için",
      surveyType: SurveyType.SCHOOL_RATING,
      industry: "Eğitim",
      category: "Geri Bildirim",
      isPublic: true,
      isRecommended: true,
      usageCount: 89,
      averageRating: 4.7,
      previewUrl: "",
      questions: [
        {
          id: 3,
          questionText: "Okul gezisi hakkında genel görüşünüz nedir?",
          questionType: "TEXT_LONG",
          isRequired: true,
          sortOrder: 1,
          isActive: true,
        },
        {
          id: 4,
          questionText: "Hangi bölümler ilginizi çekti?",
          questionType: "MULTIPLE_CHOICE",
          isRequired: false,
          sortOrder: 2,
          isActive: true,
          options: JSON.stringify([
            "Sınıflar",
            "Laboratuvarlar",
            "Spor Alanları",
            "Kütüphane",
            "Kafeterya",
          ]),
        },
      ],
      createdByUserName: "Admin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 3,
      templateName: "Akademik Değerlendirme Anketi",
      templateDescription:
        "Öğrenci ve veli akademik beklentilerini değerlendirmek için kullanılan anket",
      surveyType: SurveyType.ENROLLMENT_FEEDBACK,
      industry: "Eğitim",
      category: "Akademik",
      isPublic: false,
      isRecommended: false,
      usageCount: 42,
      averageRating: 4.2,
      previewUrl: "",
      questions: [
        {
          id: 5,
          questionText: "Öğrencinizin akademik hedefleri nelerdir?",
          questionType: "TEXT_LONG",
          isRequired: true,
          sortOrder: 1,
          isActive: true,
        },
      ],
      createdByUserName: "Eğitim Koordinatörü",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 4,
      templateName: "Hizmet Kalitesi Değerlendirmesi",
      templateDescription:
        "Genel hizmet kalitesi ve işlem sürecini değerlendirmek için",
      surveyType: SurveyType.SERVICE_QUALITY,
      industry: "Eğitim",
      category: "Hizmet Kalitesi",
      isPublic: true,
      isRecommended: false,
      usageCount: 73,
      averageRating: 4.3,
      previewUrl: "",
      questions: [
        {
          id: 6,
          questionText: "Randevu alma sürecini nasıl buldunuz?",
          questionType: "LIKERT_SCALE",
          isRequired: true,
          sortOrder: 1,
          isActive: true,
        },
      ],
      createdByUserName: "Kalite Yöneticisi",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // Mock state - API kullanımı için comment edilecek
  const isLoading = false;
  const error = null;
  const refetch = () => {
    console.log("Refetching surveys for appointment:", appointmentId);
  };

  return {
    surveys: mockSurveys,
    // surveys: surveysResponse?.data || [], // API kullanımında bu satır aktif edilecek
    isLoading,
    error,
    refetch,
  };
};
