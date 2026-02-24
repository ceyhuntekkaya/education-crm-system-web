import type { EventDto, EventCreateDto, EventUpdateDto } from "@/types";

export interface EventAddEditContextValue {
  // Current event data
  event: EventDto | null;
  eventDetailLoading: boolean;
  eventSubmitLoading: boolean;
  eventError: string | null;

  // Edit mode state
  isEditMode: boolean;
  eventId: string | null;

  // Actions
  postEvent: (data: EventCreateDto) => Promise<EventDto | null>;
  putEvent: (data: EventUpdateDto) => Promise<EventDto | null>;
}
