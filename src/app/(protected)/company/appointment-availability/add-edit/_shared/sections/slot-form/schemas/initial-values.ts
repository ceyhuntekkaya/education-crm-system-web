import { AppointmentType } from "@/enums";
import { SlotFormData } from "../types/form-data";

export const initialValues: SlotFormData = {
  schoolId: 0,
  staffUserId: "",
  durationMinutes: "30",
  appointmentType: AppointmentType.INFORMATION_MEETING,
  onlineMeetingAvailable: false,
  slotDate: "",
};
