export interface SchoolPricingUpdateDto {
  registrationFee?: number;
  applicationFee?: number;
  enrollmentFee?: number;
  annualTuition?: number;
  monthlyTuition?: number;
  semesterTuition?: number;
  bookFee?: number;
  uniformFee?: number;
  activityFee?: number;
  technologyFee?: number;
  transportationFee?: number;
  cafeteriaFee?: number;
  paymentFrequency?: string;
  installmentCount?: number;
}
