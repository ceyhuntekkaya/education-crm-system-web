import type { EventDto } from "@/types";

export interface EventDetailContextValue {
  event: EventDto | null;
  isLoading: boolean;
  error: unknown;
  eventId: number;
  refetch: () => void;
  deleteEvent: () => Promise<boolean>;
  isDeleting: boolean;
}
