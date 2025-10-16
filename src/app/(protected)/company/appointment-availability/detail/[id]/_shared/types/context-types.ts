import { AppointmentDto } from "@/types";
import { AppointmentNoteCreateDto } from "@/types/dto/appointment/AppointmentNoteCreateDto";

/**
 * Appointment detail context değeri
 */
export interface AppointmentDetailContextValue {
  appointmentId: number;
  appointment: AppointmentDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  allSections: any[];
  // Note işlemleri
  addNote: (
    noteData: Omit<AppointmentNoteCreateDto, "appointmentId" | "authorUserId">
  ) => Promise<boolean>;
  noteLoading: boolean;
  noteError: string | null;
}

/**
 * Appointment detail provider props
 */
export interface AppointmentDetailProviderProps {
  children: React.ReactNode;
  appointmentId: number;
}
