import type { EventDto, EventRegistrationDto } from "@/types";
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

// ==================== REGISTRATIONS ====================

export interface ApiResponseEventRegistrationDto {
  success: boolean;
  message: string;
  data: EventRegistrationDto;
  errors?: string[] | null;
  timestamp: string;
  path?: string;
}

export interface ApiResponsePageEventRegistrationDto {
  success: boolean;
  message: string;
  data: Page<EventRegistrationDto>;
  errors?: string[] | null;
  timestamp: string;
  path?: string;
}

export interface GetRegistrationsByEventParams {
  page?: number;
  size?: number;
  status?: string;
}
