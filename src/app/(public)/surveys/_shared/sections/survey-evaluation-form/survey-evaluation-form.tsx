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

  // Form initial values - questionResponses'dan RATING_STAR tipindekini al
  const ratingStarQuestionResponses =
    selectedSurvey.questionResponses?.filter(
      (qr) => qr.questionType === "RATING_STAR"
    ) || [];

  const formInitialValues = createInitialValues(ratingStarQuestionResponses);
  const formValidationSchema = createValidationSchema(
    ratingStarQuestionResponses
  );

  return (
    <FormProvider
      initialValues={formInitialValues}
      validationSchema={formValidationSchema}
    >
      <SurveyEvaluationFormContent />
    </FormProvider>
  );
};
