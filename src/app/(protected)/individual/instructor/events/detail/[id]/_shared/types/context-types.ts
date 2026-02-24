import type { EventDto, EventRegistrationDto } from "@/types";
import type { Page } from "@/types/api";

export interface EventDetailContextValue {
  event: EventDto | null;
  isLoading: boolean;
  error: unknown;
  eventId: number;
  refetch: () => void;
  deleteEvent: () => Promise<boolean>;
  isDeleting: boolean;

  // Registrations
  registrations: Page<EventRegistrationDto> | null;
  isLoadingRegistrations: boolean;
  registrationsPage: number;
  setRegistrationsPage: (page: number) => void;
  refetchRegistrations: () => void;
}
