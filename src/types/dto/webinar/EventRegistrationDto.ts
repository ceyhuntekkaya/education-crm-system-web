export type RegistrationStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED";

export interface EventSummaryDto {
  id: number;
  title: string;
  eventType: string;
  startDateTime: string;
  endDateTime: string;
  status: string;
}

export interface EventRegistrationDto {
  id: number;
  eventId: number;
  event: EventSummaryDto;
  teacherId: number;
  teacherEmail?: string;
  teacherName?: string;
  registrationNote?: string;
  status: RegistrationStatus;
  attended?: boolean;
  attendanceMarkedAt?: string;
  attendanceMarkedByUserId?: number;
  certificateUrl?: string;
  certificateGeneratedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventRegistrationCreateDto {
  eventId: number;
  teacherId: number;
  registrationNote?: string;
}

export interface EventRegistrationStatusUpdateDto {
  status: RegistrationStatus;
}
