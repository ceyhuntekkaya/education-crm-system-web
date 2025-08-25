export interface AppointmentCreateDto {
  appointmentSlotId?: number;
  schoolId?: number;
  parentUserId?: number;
  appointmentDate?: string;
  startTime?: string;
  endTime?: string;
  appointmentType?: string;
  title?: string;
  description?: string;
  location?: string;
  isOnline?: boolean;
  parentName?: string;
  parentEmail?: string;
  parentPhone?: string;
  studentName?: string;
  studentAge?: number;
  studentBirthDate?: string;
  studentGender?: string;
  currentSchool?: string;
  gradeInterested?: string;
  specialRequests?: string;
  notes?: string;
  participants?: import('./AppointmentParticipantCreateDto').AppointmentParticipantCreateDto[];
}
