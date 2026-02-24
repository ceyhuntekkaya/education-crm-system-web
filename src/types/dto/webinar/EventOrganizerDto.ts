export interface EventOrganizerDto {
  id: number;
  name: string;
  slug: string;
  type: OrganizerType;
  description?: string;
  logoUrl?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  socialMediaLinks?: string;
  isVerified: boolean;
  isActive: boolean;
  createdByUserId?: number;
  createdByUserEmail?: string;
  eventCount: number;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export interface EventOrganizerCreateDto {
  name: string;
  type: OrganizerType;
  description?: string;
  logoUrl?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  socialMediaLinks?: string;
  isVerified?: boolean;
  isActive?: boolean;
  slug?: string;
}

export interface EventOrganizerUpdateDto {
  name?: string;
  type?: OrganizerType;
  description?: string;
  logoUrl?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  socialMediaLinks?: string;
  isVerified?: boolean;
  isActive?: boolean;
  slug?: string;
}

export type OrganizerType =
  | "UNIVERSITY"
  | "EDUCATION_COMPANY"
  | "ASSOCIATION"
  | "GOVERNMENT"
  | "INDIVIDUAL_TRAINER"
  | "PLATFORM"
  | "OTHER";
