import { AppointmentDetailsFilters } from "../types";

/**
 * Appointment details filter form initial values
 * Columns'taki bilgilere göre güncellenmiş
 */
export const initialValues: AppointmentDetailsFilters = {
  title: "",
  appointmentNumber: "",
  parentName: "",
  studentName: "",
  staffUserName: "",
  appointmentType: "",
  status: "",
  outcome: "",
  appointmentDate: "",
  startTime: "",
  endTime: "",
  location: "",
  isOnline: undefined,
  followUpRequired: undefined,
};
