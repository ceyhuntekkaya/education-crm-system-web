import type { EventDto } from "@/types";
import type { Page } from "@/types/api";

// ==================== EVENTS ====================

export interface ApiResponseEventDto {
  success: boolean;
  message: string;
  data: EventDto;
  errors?: string[] | null;
  timestamp: string;
  path?: string;
}

export interface ApiResponsePageEventDto {
  success: boolean;
  message: string;
  data: Page<EventDto>;
  errors?: string[] | null;
  timestamp: string;
  path?: string;
}

export interface GetEventsParams {
  organizerId?: number;
  categoryId?: number;
  eventType?: string;
  status?: string;
  searchTerm?: string;
  startDateFrom?: string;
  startDateTo?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: "ASC" | "DESC";
}
