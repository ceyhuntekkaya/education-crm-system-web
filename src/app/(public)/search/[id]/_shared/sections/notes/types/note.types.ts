// Note Data Types - Sadeleştirilmiş
export interface NoteData {
  id?: number;
  noteContent: string;
  studentId?: number;
  schoolId?: number;
  campusId?: number;
  createdBy?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Form Types - Sadeleştirilmiş
export interface NoteFormValues {
  noteContent: string;
}

export interface NoteInitialValues extends NoteFormValues {}
