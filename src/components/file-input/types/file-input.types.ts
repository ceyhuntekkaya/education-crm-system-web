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

// Section component interfaces
export interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFile: FileWithPreview | null;
}

export interface FilePreviewProps {
  files: FileWithPreview[];
  type: FileInputType;
  multiple: boolean;
  disabled: boolean;
  onFilePreview: (file: FileWithPreview) => void;
  onRemoveFile: (index: number) => void;
}

export interface FileUploadAreaProps {
  variant: "inline" | "outline";
  type: FileInputType;
  fullWidth: boolean;
  disabled: boolean;
  isLoading: boolean;
  dragActive: boolean;
  error?: string;
  placeholder?: string;
  multiple: boolean;
  maxSize?: number;
  maxFiles?: number;
  onDragEnter?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  onClick?: () => void;
  children?: React.ReactNode;
}

export interface LoadingStateProps {
  message?: string;
  subMessage?: string;
}

export interface UploadButtonProps {
  onUpload: () => Promise<void>;
  disabled?: boolean;
  loading?: boolean;
  hasFiles?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface UploadStateProps {
  isUploading?: boolean;
  uploadProgress?: number;
  uploadedFiles?: number;
  totalFiles?: number;
  currentFileName?: string;
  className?: string;
}
