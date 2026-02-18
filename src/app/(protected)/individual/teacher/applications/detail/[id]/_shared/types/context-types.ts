import type {
  ApplicationDto,
  ApplicationNoteDto,
  ApplicationDocumentDto,
} from "../../../../_shared/types";

/**
 * ================================================================================
 * APPLICATION DETAIL CONTEXT TYPES
 * ================================================================================
 */

export interface ApplicationDetailContextValue {
  // Application Data
  application: ApplicationDto | null;
  isLoading: boolean;
  error: any;
  applicationId: number;
  refetch: () => void;

  // Status Update
  updateStatus: (status: string) => Promise<void>;
  isUpdatingStatus: boolean;

  // Withdraw
  withdrawApplication: () => Promise<void>;
  isWithdrawing: boolean;

  // Notes
  notes: ApplicationNoteDto[];
  isLoadingNotes: boolean;
  addNote: (noteText: string) => Promise<void>;
  isAddingNote: boolean;
  refetchNotes: () => void;

  // Documents
  documents: ApplicationDocumentDto[];
  isLoadingDocuments: boolean;
  addDocument: (document: {
    documentName: string;
    documentUrl: string;
    documentType?: string;
    fileSize?: number;
  }) => Promise<void>;
  deleteDocument: (documentId: number) => Promise<void>;
  isAddingDocument: boolean;
  isDeletingDocument: boolean;
  refetchDocuments: () => void;
}
