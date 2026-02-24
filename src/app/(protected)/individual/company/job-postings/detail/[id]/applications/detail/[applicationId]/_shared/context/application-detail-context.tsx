"use client";

import React, { createContext, useContext } from "react";
import { useParams } from "next/navigation";
import { useSnackbar } from "@/contexts";
import {
  useGetApplicationById,
  useGetApplicationNotes,
  useGetApplicationDocuments,
  useUpdateApplicationStatus,
  useAddApplicationNote,
  useAddApplicationDocument,
  useDeleteApplicationDocument,
} from "../../../../_shared/hooks/api";
import { useApplicationsByJobPostingContext } from "../../../../_shared/contexts";
import { useGetTeacherProfileById } from "@/app/(protected)/individual/teacher/teacher-profile/_shared/hooks/api/useTeacherProfileApi";
import type { ApplicationDetailContextValue } from "../types";

/**
 * ================================================================================
 * APPLICATION DETAIL CONTEXT
 * ================================================================================
 * Başvuru detay sayfası için context (Company)
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

  // params.applicationId ile application ID'yi al
  const applicationId = Number(params?.applicationId) || 0;

  // Ana liste context'ine erişim - liste güncelleme için
  const { refetch: refetchApplicationsList } =
    useApplicationsByJobPostingContext();

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

  // API Hooks - Teacher Profile
  const teacherId = data?.data?.teacherId || 0;
  const { data: teacherProfileData, loading: isLoadingTeacherProfile } =
    useGetTeacherProfileById(teacherId, {
      enabled: !!teacherId,
    });

  // API Hooks - Mutations
  const { mutate: updateStatusMutate, loading: isUpdatingStatus } =
    useUpdateApplicationStatus(applicationId);

  const { mutate: addNoteMutate, loading: isAddingNote } =
    useAddApplicationNote(applicationId);

  const { mutate: addDocumentMutate, loading: isAddingDocument } =
    useAddApplicationDocument(applicationId);

  const { mutate: deleteDocumentMutate, loading: isDeletingDocument } =
    useDeleteApplicationDocument(applicationId);

  const application = data?.data || null;
  const notes = notesData?.data || [];
  const documents = documentsData?.data || [];
  const teacherProfile = teacherProfileData?.data || null;

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

    // Teacher Profile
    teacherProfile,
    isLoadingTeacherProfile,
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
