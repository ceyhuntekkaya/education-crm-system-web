/**
 * Component Type Definitions
 * FileInput component ve section component'lerinin prop type'ları
 */

import { FileInputType } from "./file.types";

// ============================================
// FileInput Variant
// ============================================
export type FileInputVariant = "inline" | "outline";

// ============================================
// FileInput Props (Legacy - Backward Compatibility)
// ============================================
export interface FileInputProps {
  value?: File[] | File | null;
  onChange?: (files: File[] | File | null) => void;
  onError?: (error: string) => void;
  onLoadingChange?: (loading: boolean) => void;
  onUpload?: (files: File[]) => Promise<void>;
  onUploadProgress?: (progress: number) => void;
  onUploadComplete?: (uploadedFiles: File[]) => void;
  label?: string;
  variant?: FileInputVariant;
  type?: FileInputType;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // MB cinsinden
  maxFiles?: number;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  placeholder?: string;
  error?: string;
  loading?: boolean;
  showUploadButton?: boolean;
  uploadButtonText?: string;
}

// ============================================
// Simple FileInput Props - Modern API
// ============================================
export interface SimpleFileInputProps {
  // Temel props
  label?: string;
  type?: FileInputType;
  variant?: FileInputVariant;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // MB cinsinden
  placeholder?: string;

  // Opsiyonel props
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  error?: string;
  loading?: boolean;
  uploadButtonText?: string; // Bu varsa upload button gösterilir
  isAutoUpload?: boolean; // true ise dosya seçildiğinde otomatik yükleme yapar

  // Initial Value
  initialValue?: string | any[]; // Form'dan gelen URL değeri veya array

  // Crop props - Resim kırpma özellikleri
  isCropPreview?: boolean; // true ise resim önizlemede crop yapılabilir
  cropWidth?: number; // Kırpma alanı genişliği (px)
  cropHeight?: number; // Kırpma alanı yüksekliği (px)
  cropAspectRatio?: number; // Aspect ratio (örn: 16/9, 4/3) - cropWidth/cropHeight'tan otomatik hesaplanabilir
  onCropComplete?: (croppedFile: File) => void; // Crop işlemi tamamlandığında çağrılır

  // Upload API props - HEPSİ OPSİYONEL
  name?: string; // Form field name - FormInput gibi çalışır, uploadType ile aynı işlevi görür
  onUpload?: (files: File[]) => Promise<void>; // Custom upload handler
  onUploadSuccess?: (data: any) => void; // Upload başarılı olduğunda çağrılır
  onUploadError?: (error: string) => void; // Upload hata olduğunda çağrılır
}

// ============================================
// Section Component Props
// ============================================
export interface FileInputLoadingStateProps {
  message?: string;
  subMessage?: string;
}

export interface UploadStateProps {
  isUploading?: boolean;
  uploadProgress?: number;
  uploadedFiles?: number;
  totalFiles?: number;
  currentFileName?: string;
  className?: string;
}
