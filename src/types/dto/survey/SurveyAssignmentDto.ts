/**
 * Survey assignment DTO - Anketi kullanıcıya atamak için
 */
export interface SurveyAssignmentDto {
  surveyId: number;
  attendId?: number;
  schoolId?: number;
  appointmentId: number;
}
