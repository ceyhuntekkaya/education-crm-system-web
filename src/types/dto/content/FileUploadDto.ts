export interface FileUploadDto {
  fileName?: string;
  originalFileName?: string;
  fileUrl?: string;
  thumbnailUrl?: string;
  fileSizeBytes?: number;
  mimeType?: string;
  mediaType?: string;
  width?: number;
  height?: number;
  durationSeconds?: number;
  uploadId?: string;
  isProcessed?: boolean;
  processingError?: string;
}
