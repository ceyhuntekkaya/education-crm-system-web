export interface AppointmentNoteCreateDto {
  appointmentId?: number;
  authorUserId?: number;
  note?: string;
  noteType?: string;
  isPrivate?: boolean;
  isImportant?: boolean;
  attachmentUrl?: string;
  attachmentName?: string;
  attachmentSize?: number;
  attachmentType?: string;
}
