import { CancelledByType } from "@/enums";
import { CancelAppointmentFormValues } from "../types";

export const initialValues: CancelAppointmentFormValues = {
  cancellationReason: "",
  canceledByType: CancelledByType.SCHOOL,
};
