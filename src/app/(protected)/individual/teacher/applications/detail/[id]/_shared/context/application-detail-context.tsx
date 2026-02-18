"use client";

import React, { createContext, useContext, useState } from "react";
import { useParams } from "next/navigation";
import { useSnackbar } from "@/contexts";
import {
  useGetApplicationById,
  useGetApplicationNotes,
  useGetApplicationDocuments,
  useUpdateApplicationStatus,
  useWithdrawApplication,
  useAddApplicationNote,
  useAddApplicationDocument,
  useDeleteApplicationDocument,
} from "../../../../_shared/hooks/api";
import { useApplicationsContext } from "../../../../_shared/contexts";
import type { ApplicationDetailContextValue } from "../types";

/**
 * ================================================================================
 * APPLICATION DETAIL CONTEXT
 * ================================================================================
 * Başvuru detay sayfası için context
 */

const ApplicationDetailContext = createContext<
  ApplicationDetailContextValue | undefined
>(undefined);

interface ApplicationDetailProviderProps {
  children: React.ReactNode;
}

export function ApplicationDetailProvider({
  children,
}: ApplicationDetailProviderProps) {
  const params = useParams();
  const { showSnackbar } = useSnackbar();
  const applicationId = Number(params?.id) || 0;

  // Ana liste context'ine erişim - liste güncelleme için
  const { refetch: refetchApplicationsList } = useApplicationsContext();

  // API Hooks - Application
  const {
    data,
    loading: isLoading,
    error,
    refetch,
  } = useGetApplicationById(applicationId);

  // API Hooks - Notes
  const {
    data: notesData,
    loading: isLoadingNotes,
    refetch: refetchNotes,
  } = useGetApplicationNotes(applicationId);

  // API Hooks - Documents
  const {
    data: documentsData,
    loading: isLoadingDocuments,
    refetch: refetchDocuments,
  } = useGetApplicationDocuments(applicationId);

  // API Hooks - Mutations
  const { mutate: updateStatusMutate, loading: isUpdatingStatus } =
    useUpdateApplicationStatus(applicationId);

  const { mutate: withdrawMutate, loading: isWithdrawing } =
    useWithdrawApplication(applicationId);

  const { mutate: addNoteMutate, loading: isAddingNote } =
    useAddApplicationNote(applicationId);

  const { mutate: addDocumentMutate, loading: isAddingDocument } =
    useAddApplicationDocument(applicationId);

  const { mutate: deleteDocumentMutate, loading: isDeletingDocument } =
    useDeleteApplicationDocument(applicationId);

  const application = data?.data || null;
  const notes = notesData?.data || [];
  const documents = documentsData?.data || [];

  // Status Update Handler
  const updateStatus = async (status: string) => {
    const result = await updateStatusMutate({ status });
    if (result) {
      showSnackbar("Başvuru durumu güncellendi", "success");
      refetch();
      // Ana liste sayfasındaki listeyi de güncelle
      refetchApplicationsList();
    }
  };

  // Withdraw Handler
  const withdrawApplication = async () => {
    // usePost hook'u void için undefined gönderilir
    const result = await withdrawMutate(undefined as any);
    if (result) {
      showSnackbar("Başvuru geri çekildi", "success");
      refetch();
      // Ana liste sayfasındaki listeyi de güncelle
      refetchApplicationsList();
    }
  };

  // Add Note Handler
  const addNote = async (noteText: string) => {
    const result = await addNoteMutate({ noteText });
    if (result) {
      showSnackbar("Not eklendi", "success");
      refetchNotes();
    }
  };

  // Add Document Handler
  const addDocument = async (document: {
    documentName: string;
    documentUrl: string;
    documentType?: string;
    fileSize?: number;
  }) => {
    const result = await addDocumentMutate(document);
    if (result) {
      showSnackbar("Belge eklendi", "success");
      refetchDocuments();
    }
  };

  // Delete Document Handler
  const deleteDocument = async (documentId: number) => {
    await deleteDocumentMutate(documentId);
    showSnackbar("Belge silindi", "success");
    refetchDocuments();
  };

  const contextValue: ApplicationDetailContextValue = {
    // Application Data
    application,
    isLoading,
    error,
    applicationId,
    refetch,

    // Status Update
    updateStatus,
    isUpdatingStatus,

    // Withdraw
    withdrawApplication,
    isWithdrawing,

    // Notes
    notes,
    isLoadingNotes,
    addNote,
    isAddingNote,
    refetchNotes,

    // Documents
    documents,
    isLoadingDocuments,
    addDocument,
    deleteDocument,
    isAddingDocument,
    isDeletingDocument,
    refetchDocuments,
  };

  return (
    <ApplicationDetailContext.Provider value={contextValue}>
      {children}
    </ApplicationDetailContext.Provider>
  );
}

// Hook to use ApplicationDetailContext
export function useApplicationDetailContext() {
  const context = useContext(ApplicationDetailContext);
  if (context === undefined) {
    throw new Error(
      "useApplicationDetailContext must be used within ApplicationDetailProvider",
    );
  }
  return context;
}
