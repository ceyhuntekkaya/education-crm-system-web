/**
 * Hook Type Definitions
 * FileInput component'inin hook'larında kullanılan type ve interface'ler
 */

// ============================================
// useFileUpload Hook Types
// ============================================
export interface UseFileUploadOptions {
  files: File[];
  name?: string;
  onUpload?: (files: File[]) => Promise<void>;
  onUploadSuccess?: (data: any) => void;
  onUploadError?: (error: string) => void;
  onInternalError?: (error: string) => void;
}

// ============================================
// useContextHandlers Hook Types
// ============================================
export interface UseContextHandlersProps {
  files: File[];
  processFiles: (fileList: FileList) => Promise<void>;
  disabled: boolean;
  handleDrop: (e: React.DragEvent) => FileList | null;
  openFileDialog: () => void;
  isLoading: boolean;
  handleUpload: () => Promise<void>;
  isAutoUpload: boolean; // true ise dosya seçildiğinde otomatik yükleme yapar
}
