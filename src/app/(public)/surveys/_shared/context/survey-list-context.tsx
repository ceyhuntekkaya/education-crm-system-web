"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";
import { SurveyListContextType } from "../types/survey.types";
import { useSurveys as useSurveysHook } from "../hooks/use-surveys";
import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { useSnackbar } from "@/contexts/snackbar-context";
import { SurveyResponseDto } from "@/types";

const SurveyListContext = createContext<SurveyListContextType | undefined>(
  undefined
);

interface SurveyListProviderProps {
  children: ReactNode;
}

export const SurveyListProvider: React.FC<SurveyListProviderProps> = ({
  children,
}) => {
  // Use the surveys hook
  const {
    surveys,
    loading: surveyLoading,
    error: surveyError,
    refetch: refetchSurveys,
  } = useSurveysHook();

  // Modal state
  const [selectedSurvey, setSelectedSurvey] =
    useState<SurveyResponseDto | null>(null);
  const [evaluationModalOpen, setEvaluationModalOpen] = useState(false);

  // Snackbar for notifications
  const { showSnackbar } = useSnackbar();

  // Survey evaluation submission - usePut kullanıyoruz
  // Endpoint'i dinamik olarak oluşturacağız
  const {
    mutate: updateSurveyAssignment,
    loading: submissionLoading,
    error: submissionError,
  } = usePut<SurveyResponseDto, SurveyResponseDto>(
    (data: SurveyResponseDto) => {
      if (!data.id) {
        throw new Error("Survey response ID is required");
      }
      return API_ENDPOINTS.SURVEYS.UPDATE_USER_ASSIGNMENT(data.id);
    }
  );

  // Modal actions
  const openEvaluationModal = (survey: SurveyResponseDto) => {
    setSelectedSurvey(survey);
    setEvaluationModalOpen(true);
  };

  const closeEvaluationModal = () => {
    setSelectedSurvey(null);
    setEvaluationModalOpen(false);
  };

  // Row click handler
  const handleRowClick = (params: any) => {
    openEvaluationModal(params.row);
  };

  // Submit evaluation function
  const submitEvaluation = async (formData: any) => {
    if (!selectedSurvey || !selectedSurvey.id) return;

    try {
      // selectedSurvey objesini kopyala
      const updatedSurvey: SurveyResponseDto = {
        ...selectedSurvey,
      };

      // questionResponses'daki ratingResponse'ları güncelle
      if (updatedSurvey.questionResponses) {
        updatedSurvey.questionResponses = updatedSurvey.questionResponses.map(
          (qr) => {
            // FormData'dan ilgili question'ın yeni ratingResponse değerini al
            const fieldName = `question_${qr.questionId}`;
            const newRating = formData[fieldName];

            // Eğer bu question için yeni bir rating varsa güncelle
            if (newRating !== undefined && qr.questionType === "RATING_STAR") {
              return {
                ...qr,
                ratingResponse: newRating,
              };
            }

            // Değilse olduğu gibi bırak
            return qr;
          }
        );
      }

      // API'ye PUT request at
      await updateSurveyAssignment(updatedSurvey);

      showSnackbar("Anket değerlendirmeniz başarıyla kaydedildi!", "success");

      closeEvaluationModal();
      refetchSurveys(); // Refresh survey list
    } catch (error) {
      showSnackbar(
        "Anket değerlendirmesi kaydedilemedi. Lütfen tekrar deneyin.",
        "error"
      );
    }
  };

  const contextValue: SurveyListContextType = {
    // Survey data
    surveys,
    surveyLoading,
    surveyError,
    refetchSurveys,

    // Modal state
    selectedSurvey,
    evaluationModalOpen,

    // Modal actions
    openEvaluationModal,
    closeEvaluationModal,
    handleRowClick,

    // Evaluation submission
    submitEvaluation,
    submissionLoading,
    submissionError,
  };

  return (
    <SurveyListContext.Provider value={contextValue}>
      {children}
    </SurveyListContext.Provider>
  );
};

export const useSurveyList = (): SurveyListContextType => {
  const context = useContext(SurveyListContext);
  if (context === undefined) {
    throw new Error("useSurveyList must be used within a SurveyListProvider");
  }
  return context;
};
