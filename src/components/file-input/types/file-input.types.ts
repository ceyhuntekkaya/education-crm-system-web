export type FileInputType = "img" | "video" | "file" | "all";
export type FileInputVariant = "inline" | "outline";

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

export interface FileWithPreview extends File {
  preview?: string;
}

export interface FileValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface FileValidationOptions {
  maxSize: number;
  acceptedTypes: string[];
  maxFiles: number;
}

// Simple FileInput Props - Modern API
export interface SimpleFileInputProps {
  // Temel props
  label?: string;
  type?: "img" | "video" | "file" | "all";
  variant?: "inline" | "outline";
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
}

// Section component interfaces
// FilePreviewModalProps ve FilePreviewProps artık kullanılmıyor - context'ten alınıyor

// FileUploadAreaProps artık kullanılmıyor - context'ten alınıyor

export interface LoadingStateProps {
  message?: string;
  subMessage?: string;
}

// UploadButtonProps artık kullanılmıyor - context'ten alınıyor

export interface UploadStateProps {
  isUploading?: boolean;
  uploadProgress?: number;
  uploadedFiles?: number;
  totalFiles?: number;
  currentFileName?: string;
  className?: string;
}
