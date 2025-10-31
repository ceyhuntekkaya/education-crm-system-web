import * as Yup from "yup";
import { SurveyQuestionResponseDto } from "@/types";

/**
 * Creates validation schema for survey evaluation form
 * Sadece RATING_STAR tipini destekler - Protected alanda sadece görüntüleme
 */
export const createValidationSchema = (
  questionResponses: SurveyQuestionResponseDto[]
) => {
  const schemaFields: { [key: string]: any } = {};

  questionResponses?.forEach((questionResponse) => {
    if (!questionResponse.questionId) return;
    if (questionResponse.questionType !== "RATING_STAR") return;

    const fieldName = `question_${questionResponse.questionId}`;

    // RATING_STAR için validation - Protected alanda daha esnek
    let fieldSchema = Yup.number()
      .min(0, "Geçersiz puanlama")
      .max(5, "Maksimum 5 puan");

    schemaFields[fieldName] = fieldSchema;
  });

  return Yup.object().shape(schemaFields);
};
