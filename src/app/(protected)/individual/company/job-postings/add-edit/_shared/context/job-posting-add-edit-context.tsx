"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useParams, useRouter } from "next/navigation";
import { useSnackbar } from "@/contexts";
import {
  useAddJobPosting,
  useEditJobPosting,
  useJobPostingById,
} from "../hooks";
import type { JobPostingAddEditContextValue } from "../types";
import type {
  JobPostingCreateDto,
  JobPostingUpdateDto,
  JobPostingDto,
} from "@/types";
import { useJobPostingsContext } from "../../../_shared/contexts";

const JobPostingAddEditContext = createContext<
  JobPostingAddEditContextValue | undefined
>(undefined);

interface JobPostingAddEditProviderProps {
  children: React.ReactNode;
  schoolId: number;
}

export function JobPostingAddEditProvider({
  children,
  schoolId,
}: JobPostingAddEditProviderProps) {
  const params = useParams();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const { selectedJobPosting, setSelectedJobPosting } = useJobPostingsContext();

  // URL'den id'yi al
  const jobPostingId = params?.id === "new" ? 0 : Number(params?.id) || 0;
  const isEditMode = jobPostingId > 0;

  // State
  const [isSaving, setIsSaving] = useState(false);
  const [cachedJobPosting, setCachedJobPosting] =
    useState<JobPostingDto | null>(null);

  // selectedJobPosting varsa onu kullan, yoksa API'den çek
  const shouldFetchFromApi =
    isEditMode && !cachedJobPosting && !selectedJobPosting;

  // API Hooks - Sadece gerektiğinde çağır
  const {
    jobPosting: apiJobPosting,
    isLoading: apiLoading,
    error: apiError,
  } = useJobPostingById(shouldFetchFromApi ? jobPostingId : 0);
  const { createJobPosting, isCreating } = useAddJobPosting();
  const { updateJobPosting, isUpdating } = useEditJobPosting(jobPostingId);

  // selectedJobPosting veya apiJobPosting değiştiğinde cachedJobPosting'i güncelle
  useEffect(() => {
    if (selectedJobPosting && selectedJobPosting.id === jobPostingId) {
      setCachedJobPosting(selectedJobPosting);
      // Context'i temizle (bir kez kullanıldıktan sonra)
      setSelectedJobPosting(null);
    } else if (apiJobPosting && apiJobPosting.id === jobPostingId) {
      setCachedJobPosting(apiJobPosting);
    }
  }, [selectedJobPosting, apiJobPosting, jobPostingId, setSelectedJobPosting]);

  // Kullanılacak jobPosting
  const jobPosting = cachedJobPosting;
  const isLoading = shouldFetchFromApi && apiLoading;
  const error = shouldFetchFromApi ? apiError : null;

  // Submit handler
  const handleSubmit = useCallback(async () => {
    setIsSaving(true);
    try {
      // Form verilerini al (formRef üzerinden)
      // Bu kısım JobPostingForm'dan gelecek
      const formData = {}; // Placeholder

      if (isEditMode) {
        // Güncelleme
        const updateData: JobPostingUpdateDto = formData as any;
        const response = await updateJobPosting(updateData);

        if (response?.id) {
          showSnackbar("İlan başarıyla güncellendi", "success");
          router.push("/individual/company/job-postings");
        } else {
          showSnackbar("İlan güncellenirken bir hata oluştu", "error");
        }
      } else {
        // Oluşturma
        const createData: JobPostingCreateDto = {
          ...formData,
          schoolId,
        } as any;
        const response = await createJobPosting(createData);

        if (response?.id) {
          showSnackbar("İlan başarıyla oluşturuldu", "success");
          router.push("/individual/company/job-postings");
        } else {
          showSnackbar("İlan oluşturulurken bir hata oluştu", "error");
        }
      }
    } catch (err) {
      console.error("Submit error:", err);
      showSnackbar("Bir hata oluştu", "error");
    } finally {
      setIsSaving(false);
    }
  }, [
    isEditMode,
    schoolId,
    createJobPosting,
    updateJobPosting,
    router,
    showSnackbar,
  ]);

  const contextValue: JobPostingAddEditContextValue = {
    isEditMode,
    jobPostingId,
    schoolId,
    jobPosting,
    isLoading,
    error,
    isSaving: isSaving || isCreating || isUpdating,
    handleSubmit,
    postJobPosting: createJobPosting,
    putJobPosting: updateJobPosting,
  };

  return (
    <JobPostingAddEditContext.Provider value={contextValue}>
      {children}
    </JobPostingAddEditContext.Provider>
  );
}

export function useJobPostingAddEdit() {
  const context = useContext(JobPostingAddEditContext);
  if (context === undefined) {
    throw new Error(
      "useJobPostingAddEdit must be used within a JobPostingAddEditProvider",
    );
  }
  return context;
}
