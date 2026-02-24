export interface ApplicationDocumentCreateDto {
  documentName: string; // Zorunlu, max 200
  documentUrl: string; // Zorunlu, max 500
  documentType?: string; // max 50 (örn: diploma, cv, sertifika)
  fileSize?: number; // bytes
}
