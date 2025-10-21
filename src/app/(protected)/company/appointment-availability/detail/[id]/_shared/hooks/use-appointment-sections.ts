import { useMemo } from "react";
import { AppointmentDto } from "@/types";
import { createSections } from "../utils/config-processor";
import { APPOINTMENT_SECTIONS } from "../config";

/**
 * Appointment sections hook
 */
export const useAppointmentSections = (appointment: AppointmentDto | null) => {
  return useMemo(() => {
    if (!appointment) return [];
    const appointmentSections = createSections(
      APPOINTMENT_SECTIONS,
      appointment
    );
    return appointmentSections;
  }, [appointment]);
};
