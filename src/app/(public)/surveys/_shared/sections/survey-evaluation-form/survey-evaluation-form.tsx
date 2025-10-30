"use client";

import React from "react";
import { FormProvider } from "@/contexts/form-context";
import { SurveyEvaluationFormContent } from "./sections/form-content";
import { createValidationSchema } from "./schemas/validation-schema";
import { createInitialValues } from "./schemas/initial-values";
import { useSurveyList } from "../../context/survey-list-context";

/**
 * Survey Evaluation form component - Brand pattern'ını takip eder
 * Context'ten survey verilerini alır
 */
export const SurveyEvaluationForm = () => {
  const { selectedSurvey } = useSurveyList();

  if (!selectedSurvey) return null;

  // Form initial values - survey'e göre dinamik olarak oluştur
  const ratingStarQuestions =
    selectedSurvey.questions?.filter(
      (q) => q.isActive !== false && q.questionType === "RATING_STAR"
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
