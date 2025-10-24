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
