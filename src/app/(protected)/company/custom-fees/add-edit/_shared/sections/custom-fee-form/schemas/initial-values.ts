import { CustomFeeFormData } from "../types/form-data";

/**
 * Custom fee form initial values
 */
export const initialValues: CustomFeeFormData = {
  schoolPricingId: 1, // Şimdilik sabit
  createdByUserId: undefined, // Submit sırasında auth context'ten alınacak
  feeName: "",
  feeDescription: "", // Backend boş string kabul ediyor
  feeAmount: undefined,
  feeType: undefined,
  feeFrequency: undefined,
  isMandatory: false,
  isRefundable: false,
  appliesToNewStudents: true,
  appliesToExistingStudents: true,
  appliesToGrades: "", // Backend boş string kabul ediyor
  minimumAge: null, // Number alanlar null olmalı
  maximumAge: null, // Number alanlar null olmalı
  validFrom: null, // Tarih alanları null olmalı
  validUntil: null, // Tarih alanları null olmalı
  status: undefined,
  dueDateOffsetDays: null, // Number alanlar null olmalı
  lateFeePercentage: null, // Number alanlar null olmalı
  installmentAllowed: false,
  maxInstallments: null, // Number alanlar null olmalı
  discountEligible: false,
  scholarshipApplicable: false,
  documentationRequired: false,
  requiredDocuments: "", // Backend boş string kabul ediyor
  feePolicy: "", // Backend boş string kabul ediyor
  displayOnInvoice: true,
  displayOrder: null, // Number alanlar null olmalı
  parentNotificationRequired: false,
  advanceNoticeDays: null, // Number alanlar null olmalı
  requiresApproval: false,
};
