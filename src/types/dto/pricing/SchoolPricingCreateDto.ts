export interface SchoolPricingCreateDto {
  schoolId?: number;
  createdByUserId?: number;
  academicYear?: string;
  gradeLevel?: string;
  classLevel?: string;
  currency?: string;
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
  laboratoryFee?: number;
}
