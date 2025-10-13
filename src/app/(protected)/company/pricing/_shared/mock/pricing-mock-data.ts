import { SchoolPricingDto } from "@/types/dto/pricing/SchoolPricingDto";

export const mockPricings: SchoolPricingDto[] = [
  {
      "id": 1,
      "schoolId": 1,
      "schoolName": "Eğitim Dünyası Maslak Anaokulu",
      "academicYear": "2025-2026",
      "gradeLevel": "Anaokulu",
      "classLevel": "Küçük Yaş",
      "currency": "TRY",
      "registrationFee": 2500.00,
      "applicationFee": 500.00,
      "enrollmentFee": 2500.00,
      "annualTuition": 54000.00,
      "monthlyTuition": 4500.00,
      "semesterTuition": 27000.00,
      "bookFee": 800.00,
      "uniformFee": 1200.00,
      "activityFee": 2500.00,
      "technologyFee": 1500.00,
      "laboratoryFee": 0.00,
      "libraryFee": 400.00,
      "sportsFee": 1800.00,
      "artFee": 1200.00,
      "musicFee": 1500.00,
      "transportationFee": 2200.00,
      "cafeteriaFee": 3600.00,
      "insuranceFee": 600.00,
      "maintenanceFee": 1200.00,
      "securityFee": 800.00,
      "examFee": 0.00,
      "graduationFee": 800.00,
      "extendedDayFee": 2400.00,
      "tutoringFee": 0.00,
      "summerSchoolFee": 3500.00,
      "winterCampFee": 2800.00,
      "languageCourseFee": 1800.00,
      "privateLessonFee": 0.00,
      "totalAnnualCost": 74100.00,
      "totalMonthlyCost": 6175.00,
      "totalOneTimeFees": 5500.00,
      "paymentFrequency": "MONTHLY",
      "installmentCount": 12,
      "installmentAmount": 6175.00,
      "downPaymentPercentage": 25.0,
      "downPaymentAmount": 18525.00,
      "earlyPaymentDiscountPercentage": 5.0,
      "siblingDiscountPercentage": 10.0,
      "multiYearDiscountPercentage": 5.0,
      "loyaltyDiscountPercentage": 3.0,
      "needBasedAidAvailable": true,
      "meritBasedAidAvailable": true,
      "validFrom": "2025-09-01",
      "validUntil": "2026-08-31",
      "status": "ACTIVE",
      "refundPolicy": "Kayıt iptalinde ilk taksit iade edilmez. Akademik yıl başlamadan önce iptal durumunda %50 iade yapılır.",
      "paymentTerms": "Aylık ödemeler ayın 5'ine kadar yapılmalıdır. Geç ödeme %2 faiz uygulanır.",
      "latePaymentPenaltyPercentage": 2.0,
      "cancellationFee": 1000.00,
      "withdrawalRefundPercentage": 50.0,
      "publicDescription": "Montessori eğitim metoduyla çocuklarınızın doğal gelişimini destekliyoruz. Organik beslenme, sanat atölyeleri ve İngilizce programı dahil.",
      "feeBreakdownNotes": "Montessori eğitim programı maliyetleri dahil. Organik beslenme ek ücret.",
      "marketPosition": "Premium",
      "showDetailedBreakdown": true,
      "highlightTotalCost": true,
      "showPaymentOptions": true,
      "showFinancialAidInfo": true,
      "version": 1,
      "isCurrent": true,
      "createdByUserName": "Ahmet Yılmaz",
      "createdAt": "2025-06-10T14:20:00",
      "updatedAt": "2025-06-15T10:30:00",
      "formattedAnnualTuition": "54.000,00 ₺",
      "formattedMonthlyTuition": "4.500,00 ₺",
      "formattedTotalCost": "74.100,00 ₺",
      "ageRange": "2-6 yaş",
      "customFees": [
          {
              "id": 1,
              "schoolPricingId": 1,
              "schoolName": "Eğitim Dünyası Maslak Anaokulu",
              "academicYear": "2025-2026",
              "feeName": "Doğum Günü Kutlama Ücreti",
              "feeDescription": "Sınıf içinde doğum günü kutlaması için dekorasyon, pasta ve oyun aktivitesi dahil özel ücret.",
              "feeAmount": 750.00,
              "feeType": "SPECIAL_EVENT",
              "feeFrequency": "ONE_TIME",
              "isMandatory": false,
              "isRefundable": false,
              "appliesToNewStudents": true,
              "appliesToExistingStudents": true,
              "appliesToGrades": "Tüm sınıflar",
              "minimumAge": 2,
              "maximumAge": 6,
              "validFrom": "2025-09-01",
              "validUntil": "2026-08-31",
              "status": "ACTIVE",
              "dueDateOffsetDays": 0,
              "lateFeePercentage": 0.0,
              "installmentAllowed": false,
              "maxInstallments": 1,
              "discountEligible": false,
              "scholarshipApplicable": false,
              "documentationRequired": false,
              "requiredDocuments": undefined,
              "feePolicy": "Ailelerden 1 hafta önceden bildirim istenir. Sınıf mevcudu max 15 çocuk için uygulanır.",
              "displayOnInvoice": true,
              "displayOrder": 1,
              "parentNotificationRequired": true,
              "advanceNoticeDays": 7,
              "collectionRate": 0.95,
              "totalCollected": 16500.00,
              "studentsCharged": 24,
              "studentsPaid": 22,
              "averagePaymentDelayDays": 3.5,
              "createdByUserName": "Ahmet Yılmaz",
              "createdAt": "2025-08-10T09:20:00",
              "updatedAt": "2025-08-15T14:30:00",
              "formattedFeeAmount": "750,00 ₺",
              "frequencyDisplayName": "One Time",
              "applicabilityDescription": "Yeni öğrenciler, Mevcut öğrenciler, 2-6 yaş"
          }
      ],
      "internalNotes": undefined,
      "competitorAnalysis": undefined,
      "approvalNotes": undefined
  }
];

// Re-export utility functions that work with mock data
import { 
  getActivePricings as getActivePricingsUtil,
  getPendingPricings as getPendingPricingsUtil,
  getDraftPricings as getDraftPricingsUtil,
  getArchivedPricings as getArchivedPricingsUtil,
  getPricingsByGradeLevel as getPricingsByGradeLevelUtil,
  getPricingById as getPricingByIdUtil,
  calculatePricingStats
} from "../utils";

// Convenience functions that use mock data
export const getActivePricings = (): SchoolPricingDto[] => {
  return getActivePricingsUtil(mockPricings);
};

export const getPendingPricings = (): SchoolPricingDto[] => {
  return getPendingPricingsUtil(mockPricings);
};

export const getDraftPricings = (): SchoolPricingDto[] => {
  return getDraftPricingsUtil(mockPricings);
};

export const getArchivedPricings = (): SchoolPricingDto[] => {
  return getArchivedPricingsUtil(mockPricings);
};

export const getPricingsByGradeLevel = (gradeLevel: string): SchoolPricingDto[] => {
  return getPricingsByGradeLevelUtil(mockPricings, gradeLevel);
};

export const getPricingById = (id: number): SchoolPricingDto | undefined => {
  return getPricingByIdUtil(mockPricings, id);
};

export const getPricingStats = () => {
  return calculatePricingStats(mockPricings);
};
