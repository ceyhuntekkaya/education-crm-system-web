import type { EventOrganizerDto } from "@/types";

export interface OrganizerDetailContextValue {
  // Data
  organizer: EventOrganizerDto | null;
  isLoading: boolean;
  error: string | null;
  organizerId: number;

  // Actions
  refetch: () => void;

  // Delete
  deleteOrganizer: () => Promise<boolean>;
  isDeleting: boolean;
}
