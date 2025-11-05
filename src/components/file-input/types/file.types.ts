/**
 * File Related Type Definitions
 * Dosya yönetimi ve validasyon type'ları
 */

// ============================================
// File Types
// ============================================
export type FileInputType = "img" | "video" | "file" | "all";

export interface FileWithPreview extends File {
  preview?: string;
  id?: number; // Mevcut item'lar için backend ID'si
  itemType?: string; // MediaType bilgisi
  sortOrder?: number; // Sıralama bilgisi
}

// ============================================
// File Validation Types
// ============================================
export interface FileValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface FileValidationOptions {
  maxSize: number;
  acceptedTypes: string[];
  maxFiles: number;
}
