export interface ApplicationDocumentCreateDto {
  documentName: string; // Zorunlu, max 200
  documentUrl: string; // Zorunlu, max 500
  documentType?: string; // max 50 (örn: diploma, cv, sertifika)
  fileSize?: number; // bytes
}

export interface ApplicationCreateDto {
  jobPostingId: number; // Zorunlu
  teacherProfileId: number; // Zorunlu - Başvuran öğretmenin profil ID'si
  coverLetter?: string; // Ön yazı
  documents?: ApplicationDocumentCreateDto[]; // İsteğe bağlı belgeler
}

export interface ApplicationStatusUpdateDto {
  status: string; // Zorunlu: RECEIVED | UNDER_REVIEW | INTERVIEW_SCHEDULED | OFFER_MADE | ACCEPTED | REJECTED
}
