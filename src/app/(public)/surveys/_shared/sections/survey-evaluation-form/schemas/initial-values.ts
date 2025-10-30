import { SurveyQuestionDto } from "@/types";
import { SurveyEvaluationFormValues } from "../sections/form-content";

/**
 * Creates initial values for survey evaluation form
 * Sadece RATING_STAR tipini destekler
 */
export const createInitialValues = (
  questions: SurveyQuestionDto[]
): SurveyEvaluationFormValues => {
  const initialValues: SurveyEvaluationFormValues = {};

  questions?.forEach((question) => {
    if (!question.id) return;
    if (question.questionType !== "RATING_STAR") return;

    const fieldName = `question_${question.id}`;
    initialValues[fieldName] = 0; // 0 = henüz puanlanmadı
  });

  return initialValues;
};
