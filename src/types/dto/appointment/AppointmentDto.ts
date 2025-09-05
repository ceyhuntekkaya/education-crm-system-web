export interface AppointmentDto {
  id?: number;
  appointmentNumber?: string;
  appointmentSlotId?: number;
  schoolId?: number;
  schoolName?: string;
  campusName?: string;
  parentUserId?: number;
  parentUserName?: string;
  staffUserId?: number;
  staffUserName?: string;
  appointmentDate?: string;
  startTime?: string;
  endTime?: string;
  actualStartTime?: string;
  actualEndTime?: string;
  durationMinutes?: number;
  status?: string;
  appointmentType?: string;
  title?: string;
  description?: string;
  location?: string;
  isOnline?: boolean;
  meetingUrl?: string;
  meetingId?: string;
}
