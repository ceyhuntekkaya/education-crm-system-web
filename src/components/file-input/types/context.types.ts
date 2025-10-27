/**
 * Context Type Definitions
 * FileInput context'inde kullanılan type ve interface'ler
 */

import type { FileWithPreview } from "./file.types";

// ============================================
// FileInput Context Props
// ============================================
export interface FileInputContextProps {
  // Konfigürasyon
  type?: "img" | "video" | "file" | "all";
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  loading?: boolean;
  isAutoUpload?: boolean; // true ise dosya seçildiğinde otomatik yükleme yapar

  // Upload API props
  name?: string;
  onUpload?: (files: File[]) => Promise<void>;
  onUploadSuccess?: (data: any) => void;
  onUploadError?: (error: string) => void;

  // Children
  children: React.ReactNode;
}

// ============================================
// Context Value Interface
// ============================================
export interface FileInputContextValue {
  // File Management
  files: FileWithPreview[];
  processFiles: (fileList: FileList) => Promise<void>;
  removeFile: (index: number) => void;
  hasNewFiles: boolean; // Yeni dosya var mı (placeholder olmayan)

  // Loading States
  loading: boolean;
  internalLoading: boolean;
  isLoading: boolean;

  // Error Management
  internalError: string;
  handleInternalError: (error: string) => void;
  clearError: () => void;

  // Upload Management
  handleInternalUpload: (files: FileWithPreview[]) => Promise<void>;
  handleUpload: () => Promise<void>;

  // Drag & Drop
  dragActive: boolean;
  handleDrag: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => FileList | null;
  onDrop: (e: React.DragEvent) => Promise<void>;

  // File Preview
  selectedFile: FileWithPreview | null;
  isModalOpen: boolean;
  openPreview: (file: FileWithPreview) => void;
  closePreview: () => void;

  // File Input Ref
  fileInputRef: React.RefObject<HTMLInputElement>;
  openFileDialog: () => void;

  // Event Handlers
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleUploadAreaClick: () => void;

  // Configuration
  acceptAttribute: string;
  type: "img" | "video" | "file" | "all";
  multiple: boolean;
  maxFiles?: number;
  maxSize?: number;
  disabled: boolean;
  isAutoUpload: boolean; // true ise dosya seçildiğinde otomatik yükleme yapar

  // Upload API
  name?: string;
  onUploadSuccess?: (data: any) => void;
  onUploadError?: (error: string) => void;
}
