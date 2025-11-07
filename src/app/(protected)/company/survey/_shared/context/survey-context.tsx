"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";
import { SurveyListContextType } from "../types/survey.types";
import { useSurveys as useSurveysHook } from "../hooks/use-surveys";
import { useSurveyStatistics } from "../hooks/use-survey-statistics";
import { usePost } from "@/hooks";
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

  // Calculate survey statistics
  const surveyStats = useSurveyStatistics(surveys);

  // Modal state
  const [selectedSurvey, setSelectedSurvey] =
    useState<SurveyResponseDto | null>(null);
  const [evaluationModalOpen, setEvaluationModalOpen] = useState(false);

  // Snackbar for notifications
  const { showSnackbar } = useSnackbar();

  // Survey evaluation submission - company endpoint kullanacağız
  const {
    mutate: submitSurveyEvaluation,
    loading: submissionLoading,
    error: submissionError,
  } = usePost<any, any>(API_ENDPOINTS.SURVEYS.EVALUATE);

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

  // Submit evaluation function - Sadece görüntüleme için (evaluation sonuçları)
  const submitEvaluation = async (formData: any) => {
    if (!selectedSurvey) return;

    try {
      const requestData = {
        surveyId: selectedSurvey.id,
        responses: formData,
      };

      // Bu protected tarafta sadece görüntüleme amaçlı olacak
      // Gerçek submission yapmayacağız, sadece modal'ı kapatacağız
      showSnackbar("Anket değerlendirmesi görüntülendi!", "info");

      closeEvaluationModal();
    } catch (error) {
      showSnackbar("Bir hata oluştu. Lütfen tekrar deneyin.", "error");
    }
  };

  const contextValue: SurveyListContextType = {
    // Survey data
    surveys,
    surveyLoading,
    surveyError,
    refetchSurveys,

    // Survey statistics
    surveyStats,

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

// Backwards compatibility
export const SurveyProvider = SurveyListProvider;
export const useSurvey = useSurveyList;
