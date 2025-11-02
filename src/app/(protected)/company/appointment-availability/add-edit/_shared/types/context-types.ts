import { AppointmentSlotDto, AppointmentSlotCreateDto } from "@/types";

interface AutocompleteOption {
  label: string;
  value: string;
}

export interface SlotAddEditContextType {
  // Current slot data
  slot: AppointmentSlotDto | null;
  slotLoading: boolean;
  slotError: Error | string | null;

  // Edit mode state
  isEditing: boolean;
  slotId: string | null;

  // Actions
  fetchSlot: () => void;
  postSlot: (
    data: AppointmentSlotCreateDto
  ) => Promise<AppointmentSlotDto | null>;
  putSlot: (
    data: AppointmentSlotCreateDto
  ) => Promise<AppointmentSlotDto | null>;

  // Form Options
  staffUserOptions: AutocompleteOption[];
  staffLoading: boolean;
  durationOptions: AutocompleteOption[];
  appointmentTypeOptions: AutocompleteOption[];

  // School & Campus info
  campusId: number | null;
  selectedSchoolId: number | null;
  selectedSchoolName: string | null;
}
