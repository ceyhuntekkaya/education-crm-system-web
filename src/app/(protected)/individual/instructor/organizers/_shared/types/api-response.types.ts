import type { EventOrganizerDto } from "@/types/dto";
import type { Page } from "@/types/api";

// ==================== ORGANIZERS ====================

export interface ApiResponseEventOrganizerDto {
  success: boolean;
  message: string;
  data: EventOrganizerDto;
  errors?: string[] | null;
  timestamp: string;
  path?: string;
}

export interface ApiResponsePageEventOrganizerDto {
  success: boolean;
  message: string;
  data: Page<EventOrganizerDto>;
  errors?: string[] | null;
  timestamp: string;
  path?: string;
}

export interface GetOrganizersParams {
  type?: string;
  searchTerm?: string;
  isActive?: boolean;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: "ASC" | "DESC";
}
