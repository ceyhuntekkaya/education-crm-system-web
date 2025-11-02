import * as Yup from "yup";
import { SurveyQuestionResponseDto } from "@/types";

/**
 * Creates validation schema for survey evaluation form
 * Sadece RATING_STAR tipini destekler
 */
export const createValidationSchema = (
  questionResponses: SurveyQuestionResponseDto[]
) => {
  const schemaFields: { [key: string]: any } = {};

  questionResponses?.forEach((questionResponse) => {
    if (!questionResponse.questionId) return;
    if (questionResponse.questionType !== "RATING_STAR") return;

    const fieldName = `question_${questionResponse.questionId}`;

    // RATING_STAR için validation
    let fieldSchema = Yup.number()
      .min(1, "Bu soru için bir puanlama yapmanız gerekiyor")
      .max(5, "Maksimum 5 puan verebilirsiniz");

    schemaFields[fieldName] = fieldSchema;
  });

  return Yup.object().shape(schemaFields);
};
