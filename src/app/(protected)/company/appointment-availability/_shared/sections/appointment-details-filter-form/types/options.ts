import { AppointmentStatus } from "@/enums/AppointmentStatus";
import { AppointmentType } from "@/enums/AppointmentType";
import { AppointmentOutcome } from "@/enums/AppointmentOutcome";

// Option interfaces for form selections
export interface StatusOption {
  value: AppointmentStatus;
  label: string;
}

export interface AppointmentTypeOption {
  value: AppointmentType;
  label: string;
}

export interface OutcomeOption {
  value: AppointmentOutcome;
  label: string;
}

export interface BooleanOption {
  value: string;
  label: string;
}
