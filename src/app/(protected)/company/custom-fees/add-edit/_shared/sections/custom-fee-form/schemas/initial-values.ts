import { CustomFeeFormData } from "../types/form-data";

/**
 * Custom fee form initial values
 */
export const initialValues: CustomFeeFormData = {
  schoolPricingId: 1, // Şimdilik sabit
  createdByUserId: undefined,
  feeName: "",
  feeDescription: "",
  feeAmount: undefined,
  feeType: undefined,
  feeFrequency: undefined,
  isMandatory: false,
  isRefundable: false,
  appliesToNewStudents: true,
  appliesToExistingStudents: true,
  appliesToGrades: "",
  minimumAge: undefined,
  maximumAge: undefined,
  validFrom: "",
  validUntil: "",
  status: undefined,
  dueDateOffsetDays: undefined,
  lateFeePercentage: undefined,
  installmentAllowed: false,
  maxInstallments: undefined,
  discountEligible: false,
  scholarshipApplicable: false,
  documentationRequired: false,
  requiredDocuments: "",
  feePolicy: "",
  displayOnInvoice: true,
  displayOrder: undefined,
  parentNotificationRequired: false,
  advanceNoticeDays: undefined,
  requiresApproval: false,
};
