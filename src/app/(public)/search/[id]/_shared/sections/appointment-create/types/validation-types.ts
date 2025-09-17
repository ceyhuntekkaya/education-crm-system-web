/**
 * Form validation errors interface
 */
export interface FormErrors extends Record<string, string | undefined> {
  // Appointment details
  appointmentType?: string;
  appointmentDate?: string;
  startTime?: string;
  endTime?: string;
  appointmentSlotId?: string;
  title?: string;
  description?: string;
  location?: string;

  // Parent information
  parentName?: string;
  parentEmail?: string;
  parentPhone?: string;

  // Student information
  studentName?: string;
  studentAge?: string;
  studentBirthDate?: string;
  studentGender?: string;
  currentSchool?: string;
  gradeInterested?: string;

  // Additional information
  specialRequests?: string;
  notes?: string;

  // Form specific
  agreedToTerms?: string;
  communicationPreference?: string;
}
