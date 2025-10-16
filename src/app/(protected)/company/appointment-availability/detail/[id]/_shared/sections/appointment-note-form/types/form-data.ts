import { AppointmentNoteCreateDto } from "@/types/dto/appointment/AppointmentNoteCreateDto";

export interface AppointmentNoteFormData
  extends Omit<AppointmentNoteCreateDto, "appointmentId" | "authorUserId"> {
  // Form için ek alanlar eklenebilir
}
