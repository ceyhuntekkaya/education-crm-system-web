import { AppointmentDto, AppointmentNoteDto } from "@/types";
import { AppointmentNoteCreateDto } from "@/types/dto/appointment/AppointmentNoteCreateDto";

/**
 * Appointment detail context değeri
 */
export interface AppointmentDetailContextValue {
  appointmentId: number;
  appointment: AppointmentDto | null;
  appointmentDetailLoading: boolean;
  appointmentDetailError: string | null;
  refetchAppointment: () => void;
  allSections: any[];
  // Note işlemleri
  addNote: (
    noteData: Omit<AppointmentNoteCreateDto, "appointmentId" | "authorUserId">
  ) => Promise<boolean>;
  noteAddLoading: boolean;
  noteAddError: string | null;
  // Notes listesi
  notes: AppointmentNoteDto[];
  appointmentNotesLoading: boolean;
  appointmentNotesError: string | null;
  refetchNotes: () => void;
}

/**
 * Appointment detail provider props
 */
export interface AppointmentDetailProviderProps {
  children: React.ReactNode;
  appointmentId: number;
}
