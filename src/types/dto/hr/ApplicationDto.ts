import type { JobPostingSummaryDto } from "./JobPostingSummaryDto";
import type { TeacherProfileSummaryDto } from "./TeacherProfileSummaryDto";

export interface ApplicationDocumentDto {
  id: number;
  applicationId: number;
  documentName: string;
  documentUrl: string;
  documentType: string;
  fileSize: number;
  createdAt: string;
}

export interface ApplicationNoteDto {
  id: number;
  applicationId: number;
  createdByUserId: number;
  createdByUserName: string;
  noteText: string;
  createdAt: string;
}

export interface ApplicationDto {
  id: number;
  jobPostingId: number;
  jobPosting: JobPostingSummaryDto;
  teacherId: number;
  teacher: TeacherProfileSummaryDto;
  coverLetter: string;
  status:
    | "RECEIVED"
    | "UNDER_REVIEW"
    | "INTERVIEW_SCHEDULED"
    | "OFFER_MADE"
    | "ACCEPTED"
    | "REJECTED";
  isWithdrawn: boolean;
  notes: ApplicationNoteDto[];
  documents: ApplicationDocumentDto[];
  createdAt: string;
  updatedAt: string;
}
