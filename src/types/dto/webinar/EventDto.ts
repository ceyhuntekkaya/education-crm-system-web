import type { OrganizerType } from "./EventOrganizerDto";

export interface EventOrganizerSummaryDto {
  id: number;
  name: string;
  slug: string;
  type: OrganizerType;
  logoUrl?: string;
}

export interface EventCategorySummaryDto {
  id: number;
  name: string;
  slug: string;
  icon?: string;
}

export type EventType = "WEBINAR" | "SEMINAR" | "TRAINING" | "WORKSHOP";
export type DeliveryFormat = "ONLINE" | "IN_PERSON" | "HYBRID";
export type EventStatus = "DRAFT" | "PUBLISHED" | "COMPLETED" | "CANCELLED";

export interface EventDto {
  id: number;
  organizerId: number;
  organizer: EventOrganizerSummaryDto;
  createdByUserId?: number;
  createdByUserEmail?: string;
  title: string;
  description?: string;
  eventType: EventType;
  deliveryFormat: DeliveryFormat;
  startDateTime: string; // ISO 8601
  endDateTime: string; // ISO 8601
  maxCapacity?: number;
  remainingCapacity?: number;
  location?: string;
  onlineLink?: string;
  targetAudience?: string;
  speakerName?: string;
  speakerBio?: string;
  coverImageUrl?: string;
  registrationDeadline?: string;
  status: EventStatus;
  autoApproveRegistration: boolean;
  certificateEnabled: boolean;
  certificateTemplateUrl?: string;
  categoryId?: number;
  category?: EventCategorySummaryDto;
  registrationCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface EventCreateDto {
  organizerId: number;
  title: string;
  description?: string;
  eventType: EventType;
  deliveryFormat: DeliveryFormat;
  startDateTime: string;
  endDateTime: string;
  maxCapacity?: number;
  location?: string;
  onlineLink?: string;
  targetAudience?: string;
  speakerName?: string;
  speakerBio?: string;
  coverImageUrl?: string;
  registrationDeadline?: string;
  categoryId?: number;
  autoApproveRegistration?: boolean;
  certificateEnabled?: boolean;
  certificateTemplateUrl?: string;
  status?: EventStatus;
}

export interface EventUpdateDto {
  organizerId?: number;
  title?: string;
  description?: string;
  eventType?: EventType;
  deliveryFormat?: DeliveryFormat;
  startDateTime?: string;
  endDateTime?: string;
  maxCapacity?: number;
  location?: string;
  onlineLink?: string;
  targetAudience?: string;
  speakerName?: string;
  speakerBio?: string;
  coverImageUrl?: string;
  registrationDeadline?: string;
  categoryId?: number;
  autoApproveRegistration?: boolean;
  certificateEnabled?: boolean;
  certificateTemplateUrl?: string;
  status?: EventStatus;
}
