import * as Yup from "yup";
import { SurveyQuestionDto } from "@/types";

/**
 * Creates validation schema for survey evaluation form
 * Sadece RATING_STAR tipini destekler
 */
export const createValidationSchema = (questions: SurveyQuestionDto[]) => {
  const schemaFields: { [key: string]: any } = {};

  questions?.forEach((question) => {
    if (!question.id) return;
    if (question.questionType !== "RATING_STAR") return;

    const fieldName = `question_${question.id}`;
    
    // RATING_STAR için validation
    let fieldSchema = Yup.number()
      .min(1, "Bu soru için bir puanlama yapmanız gerekiyor")
      .max(5, "Maksimum 5 puan verebilirsiniz");

    // Required kontrolü
    if (question.isRequired) {
      // Rating için zaten min(1) kontrolü var, ek required kontrolü gerekmiyor
    }

    schemaFields[fieldName] = fieldSchema;
  });

  return Yup.object().shape(schemaFields);
};