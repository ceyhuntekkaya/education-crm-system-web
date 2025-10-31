"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { SurveyEvaluationFormContent } from "./sections";
import { createValidationSchema, createInitialValues } from "./schemas";
import { useSurveyList } from "../../context/survey-context";

/**
 * Survey Evaluation form component - Protected area için
 * Context'ten survey verilerini alır - Sadece görüntüleme amaçlı
 */
export const SurveyEvaluationForm = () => {
  const { selectedSurvey } = useSurveyList();

  if (!selectedSurvey) return null;

  // Form initial values - questionResponses'dan RATING_STAR tipindekini al
  const ratingStarQuestions =
    selectedSurvey.questionResponses?.filter(
      (qr) => qr.questionType === "RATING_STAR"
    ) || [];

  const formInitialValues = createInitialValues(ratingStarQuestions);
  const formValidationSchema = createValidationSchema(ratingStarQuestions);

  return (
    <FormProvider
      initialValues={formInitialValues}
      validationSchema={formValidationSchema}
    >
      <SurveyEvaluationFormContent />
    </FormProvider>
  );
};
