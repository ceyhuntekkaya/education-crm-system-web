import { SelectedAppointment } from "../../../types/appointment.types";
import { CancelAppointmentFormValues } from "./form-values";

export interface CancelAppointmentModalProps {
  open: boolean;
  onClose: () => void;
  selectedAppointment: SelectedAppointment | null;
  onSubmit: (
    appointmentId: number,
    values: CancelAppointmentFormValues
  ) => Promise<void>;
  loading?: boolean;
}

export interface CancelAppointmentFormContentProps {
  onSubmit: (
    appointmentId: number,
    values: CancelAppointmentFormValues
  ) => Promise<void>;
  loading?: boolean;
  onClose: () => void;
}
