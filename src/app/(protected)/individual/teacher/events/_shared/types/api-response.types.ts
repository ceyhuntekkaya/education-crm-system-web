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

export interface GetPublishedEventsParams {
  page?: number;
  size?: number;
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

export interface ApiResponsePageRegistrationDto {
  success: boolean;
  message: string;
  data: Page<EventRegistrationDto>;
  errors?: string[] | null;
  timestamp: string;
  path?: string;
}
