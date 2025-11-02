import { SurveyQuestionResponseDto } from "@/types";
import { SurveyEvaluationFormValues } from "../sections/form-content";

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
    // Eğer daha önce bir rating varsa onu kullan, yoksa 0
    initialValues[fieldName] = questionResponse.ratingResponse || 0;
  });

  return initialValues;
};
