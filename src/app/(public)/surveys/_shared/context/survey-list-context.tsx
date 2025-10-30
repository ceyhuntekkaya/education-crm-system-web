"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";
import { SurveyListContextType } from "../types/survey.types";
import { useSurveys as useSurveysHook } from "../hooks/use-surveys";
import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { useSnackbar } from "@/contexts/snackbar-context";
import { SurveyDto } from "@/types";

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
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyDto | null>(null);
  const [evaluationModalOpen, setEvaluationModalOpen] = useState(false);

  // Snackbar for notifications
  const { showSnackbar } = useSnackbar();

  // Survey evaluation submission
  const {
    mutate: submitSurveyEvaluation,
    loading: submissionLoading,
    error: submissionError,
  } = usePost<any, any>(API_ENDPOINTS.SURVEYS.EVALUATE);

  // Modal actions
  const openEvaluationModal = (survey: SurveyDto) => {
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
    if (!selectedSurvey) return;

    try {
      const requestData = {
        surveyId: selectedSurvey.id,
        responses: formData,
      };

      await submitSurveyEvaluation(requestData);

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
