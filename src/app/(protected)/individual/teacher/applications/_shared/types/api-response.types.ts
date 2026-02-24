/**
 * ================================================================================
 * APPLICATIONS API RESPONSE TYPES
 * ================================================================================
 * Teacher başvuru modülü için API response type'ları
 * API Dokümantasyonu: HR_API_FRONTEND.md - Section 3 (Applications)
 */

// ============ NESTED DTOs ============

export interface JobPostingSummaryDto {
  id: number;
  positionTitle: string;
  branch: string;
  employmentType: string;
  applicationDeadline: string; // "YYYY-MM-DD"
  status: string;
  campus: CampusSummaryDto;
}

export interface CampusSummaryDto {
  id: number;
  name: string;
  slug: string;
  email: string;
}

export interface TeacherProfileSummaryDto {
  id: number;
  fullName: string;
  email: string;
  branch: string;
  profilePhotoUrl: string;
}

export interface ApplicationNoteDto {
  id: number;
  applicationId: number;
  createdByUserId: number;
  createdByUserName: string;
  noteText: string;
  createdAt: string;
}

export interface ApplicationDocumentDto {
  id: number;
  applicationId: number;
  documentName: string;
  documentUrl: string;
  documentType: string;
  fileSize: number;
  createdAt: string;
}

// ============ MAIN DTOs ============

/**
 * Başvuru objesi (ApplicationDto)
 * API: GET /hr/applications/{id}
 */
export interface ApplicationDto {
  id: number;
  jobPostingId: number;
  jobPosting: JobPostingSummaryDto;
  teacherId: number;
  teacher: TeacherProfileSummaryDto;
  coverLetter: string;
  status: string; // RECEIVED | UNDER_REVIEW | INTERVIEW_SCHEDULED | OFFER_MADE | ACCEPTED | REJECTED
  isWithdrawn: boolean;
  notes: ApplicationNoteDto[];
  documents: ApplicationDocumentDto[];
  createdAt: string;
  updatedAt: string;
}

// ============ CREATE / UPDATE DTOs ============

export interface ApplicationDocumentCreateDto {
  documentName: string; // Zorunlu, max 200
  documentUrl: string; // Zorunlu, max 500
  documentType?: string; // max 50 (örn: diploma, cv, sertifika)
  fileSize?: number; // bytes
}

/**
 * Yeni başvuru oluşturma
 * API: POST /hr/applications
 */
export interface ApplicationCreateDto {
  jobPostingId: number; // Zorunlu
  teacherProfileId: number; // Zorunlu - Başvuran öğretmenin profil ID'si
  coverLetter?: string; // Ön yazı
  documents?: ApplicationDocumentCreateDto[]; // İsteğe bağlı belgeler
}

/**
 * Başvuru durumu güncelleme
 * API: PATCH /hr/applications/{id}/status
 */
export interface ApplicationStatusUpdateDto {
  status: string; // RECEIVED | UNDER_REVIEW | INTERVIEW_SCHEDULED | OFFER_MADE | ACCEPTED | REJECTED
}

// ============ API RESPONSE WRAPPERS ============

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: string[] | null;
  timestamp: string; // ISO 8601
  path?: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // 0-based sayfa numarası
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export type ApiResponseApplicationDto = ApiResponse<ApplicationDto>;
export type ApiResponsePageApplicationDto = ApiResponse<Page<ApplicationDto>>;
export type ApiResponseApplicationNoteDto = ApiResponse<ApplicationNoteDto>;
export type ApiResponseApplicationNotesArray = ApiResponse<
  ApplicationNoteDto[]
>;
export type ApiResponseApplicationDocumentDto =
  ApiResponse<ApplicationDocumentDto>;
export type ApiResponseApplicationDocumentsArray = ApiResponse<
  ApplicationDocumentDto[]
>;

// ============ QUERY PARAMS ============

/**
 * Başvuru listesi filtreleme parametreleri
 * API: GET /hr/applications
 */
export interface GetApplicationsParams {
  jobPostingId?: number;
  teacherId?: number;
  status?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: "ASC" | "DESC";
}
