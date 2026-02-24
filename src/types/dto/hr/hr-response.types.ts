import type { JobPostingDto } from "./JobPostingDto";
import type {
  ApplicationDto,
  ApplicationNoteDto,
  ApplicationDocumentDto,
} from "./ApplicationDto";
import type { TeacherProfileDto } from "./TeacherProfileDto";
import type { Page } from "../../api/api-general.types";

// ==================== JOB POSTINGS ====================

export interface ApiResponseJobPostingDto {
  success: boolean;
  message: string;
  data: JobPostingDto;
  errors?: string[] | null;
  timestamp: string;
  path?: string;
}

export interface ApiResponsePageJobPostingDto {
  success: boolean;
  message: string;
  data: Page<JobPostingDto>;
  errors?: string[] | null;
  timestamp: string;
  path?: string;
}

export interface GetJobPostingsParams {
  schoolId?: number;
  branch?: string;
  status?: "DRAFT" | "PUBLISHED" | "CLOSED" | "COMPLETED";
  searchTerm?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: "ASC" | "DESC";
}

// ==================== APPLICATIONS ====================

export interface ApiResponseApplicationDto {
  success: boolean;
  message: string;
  data: ApplicationDto;
  errors?: string[] | null;
  timestamp: string;
  path?: string;
}

export interface ApiResponsePageApplicationDto {
  success: boolean;
  message: string;
  data: Page<ApplicationDto>;
  errors?: string[] | null;
  timestamp: string;
  path?: string;
}

export interface GetApplicationsParams {
  jobPostingId?: number;
  teacherId?: number;
  status?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: "ASC" | "DESC";
}

// Application Notes & Documents Response Types
export interface ApiResponseApplicationNoteDto {
  success: boolean;
  message: string;
  data: ApplicationNoteDto;
  errors?: string[] | null;
  timestamp: string;
  path?: string;
}

export interface ApiResponseApplicationNotesArray {
  success: boolean;
  message: string;
  data: ApplicationNoteDto[];
  errors?: string[] | null;
  timestamp: string;
  path?: string;
}

export interface ApiResponseApplicationDocumentDto {
  success: boolean;
  message: string;
  data: ApplicationDocumentDto;
  errors?: string[] | null;
  timestamp: string;
  path?: string;
}

export interface ApiResponseApplicationDocumentsArray {
  success: boolean;
  message: string;
  data: ApplicationDocumentDto[];
  errors?: string[] | null;
  timestamp: string;
  path?: string;
}

// ==================== TEACHER PROFILES ====================

export interface ApiResponseTeacherProfileDto {
  success: boolean;
  message: string;
  data: TeacherProfileDto;
  errors?: string[] | null;
  timestamp: string;
  path?: string;
}

export interface ApiResponsePageTeacherProfileDto {
  success: boolean;
  message: string;
  data: Page<TeacherProfileDto>;
  errors?: string[] | null;
  timestamp: string;
  path?: string;
}

export interface GetTeacherProfilesParams {
  branch?: string;
  searchTerm?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: "ASC" | "DESC";
}
