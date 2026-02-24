import type {
  EventOrganizerDto,
  EventOrganizerCreateDto,
  EventOrganizerUpdateDto,
} from "@/types";

export interface OrganizerAddEditContextValue {
  // Current organizer data
  organizer: EventOrganizerDto | null;
  organizerDetailLoading: boolean;
  organizerSubmitLoading: boolean;
  organizerError: string | null;

  // Edit mode state
  isEditMode: boolean;
  organizerId: string | null;

  // Actions
  postOrganizer: (
    data: EventOrganizerCreateDto,
  ) => Promise<EventOrganizerDto | null>;
  putOrganizer: (
    data: EventOrganizerUpdateDto,
  ) => Promise<EventOrganizerDto | null>;
}
