import { SurveyQuestionResponseDto } from "@/types";

// Form data types
export interface SurveyEvaluationFormValues {
  [questionId: string]: number; // Question ID to rating (1-5) mapping
}

/**
 * Creates initial values for survey evaluation form
 * Sadece RATING_STAR tipini destekler
 */
export const createInitialValues = (
  questionResponses: SurveyQuestionResponseDto[]
): SurveyEvaluationFormValues => {
  const initialValues: SurveyEvaluationFormValues = {};

  questionResponses?.forEach((questionResponse) => {
    if (!questionResponse.questionId) return;
    if (questionResponse.questionType !== "RATING_STAR") return;

    const fieldName = `question_${questionResponse.questionId}`;
    // Protected alanda gerçek response değerlerini göstereceğiz
    initialValues[fieldName] = questionResponse.ratingResponse || 0;
  });

  return initialValues;
};
