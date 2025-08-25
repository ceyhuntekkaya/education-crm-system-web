export interface MessageCreateDto {
  schoolId?: number;
  senderName?: string;
  senderEmail?: string;
  senderPhone?: string;
  subject?: string;
  content?: string;
  messageType?: string;
  priority?: string;
  studentName?: string;
  studentAge?: number;
  gradeInterested?: string;
  enrollmentYear?: string;
  preferredContactMethod?: string;
  preferredContactTime?: string;
  requestCallback?: boolean;
  requestAppointment?: boolean;
  ipAddress?: string;
  userAgent?: string;
  sourcePage?: string;
}
