import type { EventRegistrationDto } from "@/types";

export interface RegistrationDetailContextValue {
  registration: EventRegistrationDto | null;
  isLoading: boolean;
  error: unknown;
  registrationId: number;
  refetch: () => void;

  // Mutations (for action buttons on detail page)
  updateStatus: (
    payload: { status: string },
    callbacks?: { onSuccess?: () => void; onError?: (e: unknown) => void },
  ) => void;
  isUpdatingStatus: boolean;

  markAttendance: (
    payload: { attended: boolean },
    callbacks?: { onSuccess?: () => void; onError?: (e: unknown) => void },
  ) => void;
  isMarkingAttendance: boolean;

  deleteRegistration: () => Promise<boolean>;
  isDeleting: boolean;
}
