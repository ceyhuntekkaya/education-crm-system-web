import type { EventDto, EventRegistrationDto } from "@/types";
import type { Page } from "@/types/api";

// ==================== EVENTS ====================

export interface ApiResponseCompanyEventDto {
  success: boolean;
  message: string;
  data: EventDto;
  errors?: string[] | null;
  timestamp: string;
  path?: string;
}

export interface ApiResponsePageCompanyEventDto {
  success: boolean;
  message: string;
  data: Page<EventDto>;
  errors?: string[] | null;
  timestamp: string;
  path?: string;
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
