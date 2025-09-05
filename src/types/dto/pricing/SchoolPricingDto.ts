export interface SchoolPricingDto {
  id?: number;
  schoolId?: number;
  schoolName?: string;
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
}
