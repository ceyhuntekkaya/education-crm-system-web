export interface CustomFeeDto {
  /** Format: int64 */
  id?: number;
  /** Format: int64 */
  schoolId?: number;
  /** Format: int64 */
  schoolPricingId?: number;
  schoolName?: string;
  academicYear?: string;
  feeName?: string;
  feeDescription?: string;
  feeAmount?: number;
  /** @enum {string} */
  feeType?:
    | "ACADEMIC"
    | "ADMINISTRATIVE"
    | "FACILITY"
    | "TECHNOLOGY"
    | "EQUIPMENT"
    | "SERVICE"
    | "ACTIVITY"
    | "TRANSPORTATION"
    | "MEAL"
    | "ACCOMMODATION"
    | "INSURANCE"
    | "SECURITY"
    | "MAINTENANCE"
    | "UTILITIES"
    | "MATERIALS"
    | "EXAMINATION"
    | "CERTIFICATION"
    | "GRADUATION"
    | "PENALTY"
    | "DEPOSIT"
    | "REFUNDABLE_DEPOSIT"
    | "MEMBERSHIP"
    | "REGISTRATION"
    | "PROCESSING"
    | "LATE_FEE"
    | "CANCELLATION"
    | "REPLACEMENT"
    | "DAMAGE"
    | "LOST_ITEM"
    | "SPECIAL_EVENT"
    | "FIELD_TRIP"
    | "SUMMER_PROGRAM"
    | "WINTER_PROGRAM"
    | "TUTORING"
    | "COUNSELING"
    | "HEALTH_SERVICE"
    | "LIBRARY"
    | "LABORATORY"
    | "WORKSHOP"
    | "CLUB"
    | "SPORTS"
    | "ART"
    | "MUSIC"
    | "DRAMA"
    | "LANGUAGE"
    | "COMPETITION"
    | "AWARD_CEREMONY"
    | "PARENT_MEETING"
    | "CONFERENCE"
    | "WORKSHOP_MATERIAL"
    | "SUBSCRIPTION"
    | "LICENSE"
    | "SOFTWARE"
    | "PLATFORM_ACCESS"
    | "ONLINE_CONTENT"
    | "DIGITAL_RESOURCE"
    | "PRINTING"
    | "SCANNING"
    | "PHOTOCOPYING"
    | "BINDING"
    | "LAMINATION"
    | "ID_CARD"
    | "UNIFORM"
    | "SHOES"
    | "BAG"
    | "STATIONERY"
    | "TEXTBOOK"
    | "WORKBOOK"
    | "NOTEBOOK"
    | "CALCULATOR"
    | "TABLET"
    | "LAPTOP"
    | "SOFTWARE_LICENSE"
    | "CLOUD_STORAGE"
    | "INTERNET_ACCESS"
    | "WIFI_ACCESS"
    | "PARKING"
    | "LOCKER"
    | "KEY_REPLACEMENT"
    | "CARD_REPLACEMENT"
    | "TRANSCRIPT"
    | "DIPLOMA"
    | "REFERENCE_LETTER"
    | "DOCUMENT_TRANSLATION"
    | "NOTARIZATION"
    | "APOSTILLE"
    | "VISA_SUPPORT"
    | "IMMIGRATION_SUPPORT"
    | "LEGAL_CONSULTATION"
    | "FINANCIAL_AID_PROCESSING"
    | "SCHOLARSHIP_PROCESSING"
    | "LOAN_PROCESSING"
    | "PAYMENT_PROCESSING"
    | "BANK_TRANSFER"
    | "CREDIT_CARD_FEE"
    | "INSTALLMENT_FEE"
    | "INTEREST"
    | "CURRENCY_EXCHANGE"
    | "TAX"
    | "GOVERNMENT_FEE"
    | "REGULATORY_FEE"
    | "COMPLIANCE_FEE"
    | "AUDIT_FEE"
    | "ACCREDITATION_FEE"
    | "CERTIFICATION_MAINTENANCE"
    | "QUALITY_ASSURANCE"
    | "RISK_MANAGEMENT"
    | "EMERGENCY_FUND"
    | "DISASTER_RECOVERY"
    | "BUSINESS_CONTINUITY"
    | "OTHER";
  /** @enum {string} */
  feeFrequency?:
    | "ONE_TIME"
    | "MONTHLY"
    | "QUARTERLY"
    | "SEMESTER"
    | "ANNUAL"
    | "BIANNUAL"
    | "CUSTOM";
  isMandatory?: boolean;
  isRefundable?: boolean;
  appliesToNewStudents?: boolean;
  appliesToExistingStudents?: boolean;
  appliesToGrades?: string;
  /** Format: int32 */
  minimumAge?: number;
  /** Format: int32 */
  maximumAge?: number;
  /** Format: date */
  validFrom?: string;
  /** Format: date */
  validUntil?: string;
  /** @enum {string} */
  status?:
    | "DRAFT"
    | "PENDING_APPROVAL"
    | "APPROVED"
    | "ACTIVE"
    | "INACTIVE"
    | "SUSPENDED"
    | "CANCELLED"
    | "EXPIRED"
    | "ARCHIVED";
  /** Format: int32 */
  dueDateOffsetDays?: number;
  /** Format: double */
  lateFeePercentage?: number;
  installmentAllowed?: boolean;
  /** Format: int32 */
  maxInstallments?: number;
  discountEligible?: boolean;
  scholarshipApplicable?: boolean;
  documentationRequired?: boolean;
  requiredDocuments?: string;
  feePolicy?: string;
  displayOnInvoice?: boolean;
  /** Format: int32 */
  displayOrder?: number;
  parentNotificationRequired?: boolean;
  /** Format: int32 */
  advanceNoticeDays?: number;
  /** Format: double */
  collectionRate?: number;
  totalCollected?: number;
  /** Format: int32 */
  studentsCharged?: number;
  /** Format: int32 */
  studentsPaid?: number;
  /** Format: double */
  averagePaymentDelayDays?: number;
  createdByUserName?: string;
  /** Format: date-time */
  createdAt?: string;
  /** Format: date-time */
  updatedAt?: string;
  formattedFeeAmount?: string;
  frequencyDisplayName?: string;
  applicabilityDescription?: string;
}
