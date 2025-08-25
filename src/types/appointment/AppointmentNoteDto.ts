export interface AppointmentNoteDto {
  id?: number;
  appointmentId?: number;
  authorUserId?: number;
  authorUserName?: string;
  note?: string;
  noteType?: string;
  isPrivate?: boolean;
  isImportant?: boolean;
  noteDate?: string;
  attachmentUrl?: string;
  attachmentName?: string;
  attachmentSize?: number;
  attachmentType?: string;
  noteTypeDisplayName?: string;
  formattedNoteDate?: string;
  canEdit?: boolean;
  canDelete?: boolean;
}
